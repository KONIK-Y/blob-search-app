from os import getenv
import io
from typing import IO, BinaryIO
from fastapi import HTTPException
from core import CONNECTION_STRING
from azure.storage.blob import BlobServiceClient


def init_blob_client():
    return BlobServiceClient.from_connection_string(CONNECTION_STRING)


def list_containers() -> list[str]:
    try:
        blob_service_client = init_blob_client()
        containers = blob_service_client.list_containers()

        return [container.name for container in containers]
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)


def list_blob_names(container: str) -> list[str]:
    try:
        blob_service_client = init_blob_client()
        container_client = blob_service_client.get_container_client(container)
        blobs = container_client.list_blobs()
        print(blobs)

        return [blob.name for blob in blobs]
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)


def get_blob_stream(filename: str, container: str) -> IO[bytes]:
    try:
        blob_service_client = init_blob_client()
        blob_client = blob_service_client.get_blob_client(container=container, blob=filename)
        stream = io.BytesIO()
        num_bytes = blob_client.download_blob().readinto(stream)
        print(f"Downloaded {num_bytes} bytes from {filename}")
        return num_bytes
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)
    finally:
        if stream:
            stream.close()


def download_blob_to_string(container_name: str, filename: str) -> str:
    try:
        blob_service_client = init_blob_client()
        blob_client = blob_service_client.get_blob_client(container=container_name, blob=filename)

        downloader = blob_client.download_blob(max_concurrency=1, encoding="UTF-8")
        blob_text = downloader.readall()
        return blob_text
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)
