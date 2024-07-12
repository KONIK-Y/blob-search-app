from pydantic import BaseModel
from fastapi import File


class FilePath(BaseModel):
    container: str
    directory: str
    filename: str


class SearchResult(BaseModel):
    score: float
    filepath: FilePath
    chunk: str
