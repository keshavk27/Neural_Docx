from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.upload import router as upload_router
from routes.query import router as query_router
from routes.session import router as session_router

app = FastAPI(title="Neural Docx Server",description="AI Backend for Neural Docx",version="1.0.0",)


# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"http://localhost:\d+|http://127\.0\.0\.1:\d+",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health Check
@app.get("/")
async def health_check():

    return {
        "success": True,
        "message": "Neural Docx AI Server is running."
    }


#  Routers
app.include_router(upload_router,prefix="/api/v1/documents",tags=["Documents"],)

app.include_router(query_router,prefix="/api/v1/chat",tags=["Chat"],)

app.include_router(session_router,prefix="/api/v1/vector-store",tags=["Vector Store"],)