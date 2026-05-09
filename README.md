# AI Task Platform

A full-stack AI task processing platform built with MERN stack, Python worker, Docker, and Kubernetes.

## Tech Stack
- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Worker**: Python
- **Database**: MongoDB Atlas
- **Queue**: Redis (Upstash)
- **Container**: Docker
- **Orchestration**: Kubernetes
- **GitOps**: ArgoCD
- **CI/CD**: GitHub Actions

## Local Development

### Prerequisites
- Node.js 20+
- Python 3.11+
- Docker Desktop

### Run with Docker Compose
```bash
# Create .env file with your credentials
cp .env.example .env

# Start all services
docker-compose up --build
```
Open `http://localhost:3000`

### Run without Docker

Terminal 1 — Backend:
```bash
cd backend
npm install
npm run dev
```

Terminal 2 — Frontend:
```bash
cd frontend
npm install
npm run dev
```

Terminal 3 — Worker:
```bash
cd worker
pip install -r requirements.txt
python worker.py
```

## Environment Variables
```env
MONGO_URI=your_mongodb_connection_string
REDIS_HOST=your_redis_host
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Kubernetes Deployment
```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/frontend/
kubectl apply -f k8s/backend/
kubectl apply -f k8s/worker/
kubectl apply -f k8s/ingress.yaml
```

## CI/CD Pipeline
GitHub Actions automatically:
1. Runs lint checks
2. Builds Docker images
3. Pushes to Docker Hub
4. Updates image tags in infra repo
5. ArgoCD auto-syncs to Kubernetes

## Architecture
See [docs/architecture.md](docs/architecture.md)