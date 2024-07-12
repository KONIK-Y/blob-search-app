FROM python:3.12-slim

WORKDIR /app/backend
COPY requirements.txt .
RUN pip install --no-cache-dir -r /app/backend/requirements.txt gunicorn==21.2.0

CMD ["gunicorn", "-w", "1", "-k", "uvicorn_worker.UvicornWorker", "--log-level", "debug", "--bind", "0.0.0.0:8000", "main:app"]