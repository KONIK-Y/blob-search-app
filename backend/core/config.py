import os
from dotenv import load_dotenv

load_dotenv()

CONNECTION_STRING = os.environ.get("AZURE_STORAGE_CONNECTION_STRING")
CONTAINER_NAME = os.environ.get("AZURE_STORAGE_CONTAINER_NAME")

SEARCH_SERVICE = os.environ.get("AZURE_SEARCH_SERVICE")
AZURE_SEARCH_KEY = os.environ.get("AZURE_SEARCH_KEY")
SEARCH_SERVICE_ENDPOIINT = f"https://{SEARCH_SERVICE}.search.windows.net"
SEARCH_INDEX = os.environ.get("AZURE_SEARCH_INDEX")

HIGH_LIGHT_PRE_TAG = "`"
HIGH_LIGHT_POST_TAG = "`"
