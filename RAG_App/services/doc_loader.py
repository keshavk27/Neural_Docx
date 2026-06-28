import os

from langchain_community.document_loaders import (
    PyPDFLoader,
    Docx2txtLoader,
    TextLoader,
    CSVLoader,
    UnstructuredPowerPointLoader,
    UnstructuredExcelLoader,
)


def load_document(file_path: str):
    

    extension = os.path.splitext(file_path)[1].lower()

    try:

        if extension == ".pdf":
            loader = PyPDFLoader(file_path)

        elif extension == ".docx":
            loader = Docx2txtLoader(file_path)

        elif extension == ".txt":
            loader = TextLoader(
                file_path,
                encoding="utf-8",
            )

        elif extension == ".csv":
            loader = CSVLoader(file_path)

        elif extension == ".pptx":
            loader = UnstructuredPowerPointLoader(file_path)

        elif extension == ".xlsx":
            loader = UnstructuredExcelLoader(file_path)

        else:
            raise Exception(
                f"Unsupported file type: {extension}"
            )

        documents = loader.load()

        return documents

    except Exception as error:
        raise Exception(
            f"Failed to load document '{file_path}': {str(error)}"
        )


def load_multiple_documents(file_paths: list[str]):
    

    documents = []

    try:

        for file_path in file_paths:

            docs = load_document(file_path)

            documents.extend(docs)

        return documents

    except Exception as error:
        raise Exception(
            f"Failed to load uploaded documents: {str(error)}"
        )