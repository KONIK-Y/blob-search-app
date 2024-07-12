from typing import List
from pydantic import BaseModel
from fastapi import Response, File


class ContainerListResponse(BaseModel):
    containers: List[str]


class BlobListResponse(BaseModel):
    blobs: List[str]


class BlobRequest(BaseModel):
    filepath: str


class BlobResponseClass(Response):
    media_type = "application/octet-stream"


class BlobTextRequest(BaseModel):
    filepath: str


class BlobTextResponse(BaseModel):
    text: str
