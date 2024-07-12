from logging import config, getLogger
import logging
from traceback import format_exception

LOGGING_CONFIG = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "default": {
            "format": "%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        },
        "access": {
            "format": "%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        },
    },
    "handlers": {
        "default": {
            "formatter": "default",
            "class": logging.StreamHandler,
            "stream": "ext://sys.stderr",
        },
        "access": {
            "formatter": "access",
            "class": logging.StreamHandler,
            "stream": "ext://sys.stdout",
        },
    },
    "loggers": {
        "uvicorn.error": {
            "level": logging.INFO,
            "handlers": ["default"],
            "propagate": False,
        },
        "uvicorn.access": {
            "level": logging.INFO,
            "handlers": ["access"],
            "propagate": False,
        },
    },
    "root": {
        "level": logging.DEBUG,
        "handlers": ["default"],
        "propagate": False,
    },
}

config.dictConfig(LOGGING_CONFIG)


def log_error(e: Exception) -> None:
    error_logger = getLogger("app.exception")
    detailed_tb = get_error_message(e)
    error_logger.error(f"[API] An error occurred: {e}\n{detailed_tb}")


def get_error_message(e: Exception) -> str:
    tb = format_exception(type(e), e, e.__traceback__)
    return "".join(tb[::-1])
