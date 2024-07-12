from typing import List
from pydantic import BaseModel
from fastapi import HTTPException
from urllib.parse import urlparse, unquote
from core import (
    SEARCH_SERVICE_ENDPOIINT,
    SEARCH_INDEX,
    AZURE_SEARCH_KEY,
    HIGH_LIGHT_POST_TAG,
    HIGH_LIGHT_PRE_TAG,
)
from models import FilePath, SearchResult
from azure.search.documents import SearchClient
from azure.core.credentials import AzureKeyCredential


def init_search_client() -> SearchClient:
    search_client = SearchClient(
        endpoint=SEARCH_SERVICE_ENDPOIINT, index_name=SEARCH_INDEX, credential=AzureKeyCredential(AZURE_SEARCH_KEY)
    )
    return search_client


def url_parser(url: str, filename: str) -> FilePath:
    parsed_url = urlparse(url)
    path_parts = parsed_url.path.strip("/").split("/", 1)
    container_name = path_parts[0]
    directory_path = unquote(path_parts[1])
    return FilePath(container=container_name, directory=directory_path, filename=filename)


def format_highlight_fields(texts: List[str]) -> str:
    processed = []
    for text in texts:
        if HIGH_LIGHT_POST_TAG + HIGH_LIGHT_PRE_TAG in text:
            processed.append(text.replace(HIGH_LIGHT_POST_TAG + HIGH_LIGHT_PRE_TAG, ""))
        else:
            processed.append(text)
    joined = "...".join(processed)
    return joined


def search_documents(query: str) -> List[SearchResult]:
    try:
        search_client = init_search_client()
        search_results_for_full_text = search_client.search(
            search_text=query,
            top=10,
            highlight_fields="chunk",
            highlight_post_tag=HIGH_LIGHT_POST_TAG,
            highlight_pre_tag=HIGH_LIGHT_PRE_TAG,
        )
        results = []
        for document in search_results_for_full_text:
            content = ""
            if document["@search.highlights"] is not None and "chunk" in document["@search.highlights"]:
                content = format_highlight_fields(document["@search.highlights"]["chunk"])
            else:
                content = document["chunk"]
            filepath = url_parser(document["url"], document["title"])
            results.append(SearchResult(score=document["@search.score"], filepath=filepath, chunk=content))
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)
