FROM python:3.12-alpine
LABEL org.opencontainers.image.title="DeployVault"
LABEL org.opencontainers.image.description="Zero-dependency Kubernetes incident and interview trainer"
LABEL org.opencontainers.image.source="https://github.com/iamrichmack111/deploy-vault"
WORKDIR /app
COPY app.py ./
COPY data ./data
COPY static ./static
EXPOSE 8080
USER nobody
CMD ["python3", "app.py", "--host", "0.0.0.0", "--port", "8080", "--no-browser"]

