import os
import shutil
import uuid

from typing import List
from fastapi import (APIRouter,UploadFile,File,Form,HTTPException,)

from services.doc_loader import load_multiple_documents
from services.vector_store import add_documents


router = APIRouter()

TEMP_DIR = "./temp"

os.makedirs(TEMP_DIR, exist_ok=True)


@router.post("/upload")
async def upload_documents(sessionId: str = Form(...),files: List[UploadFile] = File(...),):
    
    temp_files = []
    try:
        for uploaded_file in files:

            # Save uploaded file temporarily
            temp_path = os.path.join(
                TEMP_DIR,
                f"{uuid.uuid4()}_{uploaded_file.filename}",
            )
            with open(temp_path, "wb") as buffer:
                shutil.copyfileobj(
                    uploaded_file.file,
                    buffer,
                )
            temp_files.append(
                (
                    temp_path,
                    uploaded_file.filename,
                )
            )

        # Process every uploaded file
        for temp_path, original_name in temp_files:
            documents = load_multiple_documents( [temp_path])
            document_id = str(uuid.uuid4())
            add_documents(documents=documents, session_id=sessionId,user_id=None, document_id=document_id,file_name=original_name,)

        return {
            "success": True,
            "sessionId": sessionId,
            "documentsUploaded": len(files),
            "message": "Documents indexed successfully.",
        }

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=str(error),
        )

    finally:
        for temp_path, _ in temp_files:
            if os.path.exists(temp_path):
                os.remove(temp_path)