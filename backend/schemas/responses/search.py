from typing import List
from pydantic import BaseModel
from models import SearchResult


class SearchRequest(BaseModel):
    query: str


class SearchResponse(BaseModel):
    results: List[SearchResult]
