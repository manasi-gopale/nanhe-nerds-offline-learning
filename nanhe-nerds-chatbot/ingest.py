import chromadb
from sentence_transformers import SentenceTransformer
import os, PyPDF2

client = chromadb.PersistentClient(path="./vectorstore")
collection = client.get_or_create_collection("study_material")
model = SentenceTransformer('all-MiniLM-L6-v2')  # small, fast, offline

def load_file(filepath):
    if filepath.endswith(".pdf"):
        text = ""
        with open(filepath, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            for page in reader.pages:
                text += page.extract_text()
        return text
    else:
        with open(filepath, "r", encoding="utf-8") as f:
            return f.read()

def chunk_text(text, size=500):
    words = text.split()
    return [" ".join(words[i:i+size]) for i in range(0, len(words), size)]

# Load everything from your data folder
all_chunks, all_ids = [], []
for i, filename in enumerate(os.listdir("./data")):
    text = load_file(f"./data/{filename}")
    chunks = chunk_text(text)
    for j, chunk in enumerate(chunks):
        all_chunks.append(chunk)
        all_ids.append(f"{filename}_{j}")

embeddings = model.encode(all_chunks).tolist()
collection.add(documents=all_chunks, embeddings=embeddings, ids=all_ids)
print("✅ Data loaded!")