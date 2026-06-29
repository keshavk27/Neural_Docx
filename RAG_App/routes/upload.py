import os
import shutil
from typing import List
from fastapi import (APIRouter,UploadFile,File,Form,HTTPException,)
from services.doc_loader import load_multiple_documents
from services.vector_store import create_vector_store
import uuid

router = APIRouter()

TEMP_DIR = "./temp"

os.makedirs(TEMP_DIR, exist_ok=True)


@router.post("/upload")
async def upload_documents(
    sessionId: str = Form(...),
    files: List[UploadFile] = File(...),
):

    temp_file_paths = []

    try:

        #save files into temp
        for uploaded_file in files:

            temp_path = os.path.join(TEMP_DIR,f"{uuid.uuid4()}_{uploaded_file.filename}",)

            with open(temp_path, "wb") as buffer:
                shutil.copyfileobj(
                    uploaded_file.file,
                    buffer,
                )

            temp_file_paths.append(temp_path)

        # Load documents
        documents = load_multiple_documents(temp_file_paths)

        # Create vector store
        create_vector_store(documents,sessionId,)

        return {
            "success": True,
            "sessionId": sessionId,
            "message": "Vector database created successfully.",
        }

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=str(error),
        )

    finally:

        # Delete temp files
        for file_path in temp_file_paths:

            if os.path.exists(file_path):
                os.remove(file_path)