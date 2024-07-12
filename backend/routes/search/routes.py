from fastapi import APIRouter
from schemas.responses import SearchRequest, SearchResponse
from lib.search import search_documents

router = APIRouter()


@router.post("/simple", response_model=SearchResponse)
async def get_blob_list(request: SearchRequest):
    print(request)
    result = search_documents(request.query)
    return SearchResponse(results=result)
