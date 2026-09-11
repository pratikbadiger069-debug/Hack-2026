# SkillBridge AI — Production Deployment Guide

## 1. Local Development Setup

### Prerequisites
- Node.js >= 20.x
- Python >= 3.10
- PostgreSQL >= 15 with pgvector extension (or Neon PostgreSQL cloud instance)

### Frontend Launch
```bash
cd skillbridge-ai
npm install
npm run dev
```
Visit `http://localhost:3000`

### Backend Launch
```bash
cd skillbridge-ai/backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
API Documentation: `http://localhost:8000/docs`

---

## 2. Docker Compose Deployment (1-Click)

```bash
docker-compose up -d --build
```
This boots:
- Next.js 15 Frontend on port `3000`
- FastAPI Backend on port `8000`
- PostgreSQL with pgvector on port `5432`

---

## 3. Cloud Deployment (Vercel + Neon + Railway)

1. **Database:** Create a PostgreSQL instance on [Neon](https://neon.tech) and enable `pgvector`. Copy `DATABASE_URL`.
2. **Frontend on Vercel:**
   - Import the repository to Vercel.
   - Set environment variables: `DATABASE_URL`, `NEXT_PUBLIC_APP_URL`.
3. **Backend on Railway / Render:**
   - Deploy `backend/` directory as a Python web service.
   - Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
