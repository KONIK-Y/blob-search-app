from fastapi import APIRouter, Response
from schemas.responses import ContainerListResponse, BlobListResponse, BlobResponseClass, BlobTextResponse
from lib.blobs import list_containers, get_blob_stream, download_blob_to_string, list_blob_names

router = APIRouter()


@router.get("/list", response_model=ContainerListResponse)
async def get_container_list():
    result = list_containers()
    return ContainerListResponse(containers=result)


@router.get("/list/{container}", response_model=BlobListResponse)
async def get_blob_list(container: str):
    result = list_blob_names(container)
    print(result)
    return BlobListResponse(blobs=result)


@router.get("/file/{container}/{filename:path}", response_class=BlobResponseClass)
async def get_file(container: str, filename: str):
    return Response(content=get_blob_stream(filename, container), media_type="application/octet-stream")


@router.get("/file_contents/{container}/{filename:path}", response_model=BlobTextResponse)
async def get_file_contents(container: str, filename: str):
    return BlobTextResponse(text=download_blob_to_string(container, filename))
