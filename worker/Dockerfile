# Stage 1 — install deps
FROM python:3.11-slim AS deps
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Stage 2 — runtime
FROM python:3.11-slim
WORKDIR /app

# non-root user
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

COPY --from=deps /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY worker.py processor.py ./

USER appuser
CMD ["python", "worker.py"]