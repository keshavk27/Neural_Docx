import os
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security.api_key import APIKeyHeader
from starlette.status import HTTP_403_FORBIDDEN
from fastapi.middleware.cors import CORSMiddleware

from routes.upload import router as upload_router
from routes.query import router as query_router
from routes.session import router as session_router

app = FastAPI(title="Neural Docx Server",description="AI Backend for Neural Docx",version="1.0.0",)

API_KEY_NAME = "X-API-Key"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

FASTAPI_SECRET_KEY = os.getenv("FASTAPI_INTERNAL_SECRET", "local_dev_secret_123")

async def validate_api_key(api_key: str = Depends(api_key_header)):
    if api_key == FASTAPI_SECRET_KEY:
        return api_key
    raise HTTPException(
        status_code=HTTP_403_FORBIDDEN, 
        detail="Unauthorized: Invalid Internal API Key"
    )


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def health_check():
    return {
        "success": True,
        "message": "Neural Docx AI Server is running and secure."
    }



app.include_router(
    upload_router,
    prefix="/api/v1/documents",
    tags=["Documents"],
    dependencies=[Depends(validate_api_key)]
)

app.include_router(
    query_router,
    prefix="/api/v1/chat",
    tags=["Chat"],
    dependencies=[Depends(validate_api_key)]
)

app.include_router(
    session_router,
    prefix="/api/v1/vector-store",
    tags=["Vector Store"],
    dependencies=[Depends(validate_api_key)]
)