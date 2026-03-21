from flask import Flask, request, jsonify
from flask_cors import CORS
import chromadb
import ollama
from sentence_transformers import SentenceTransformer

app = Flask(__name__)
CORS(app)

client = chromadb.PersistentClient(path="./vectorstore")
collection = client.get_or_create_collection("study_material")
model = SentenceTransformer('all-MiniLM-L6-v2')

# Stores conversation history per session
conversation_history = []

@app.route("/chat", methods=["POST"])
def chat():
    global conversation_history
    
    question = request.json.get("message")
    
    # Search study material
    embedding = model.encode([question]).tolist()
    results = collection.query(query_embeddings=embedding, n_results=5)
    context = "\n\n".join(results["documents"][0])
    
    # System prompt
    system_prompt = f"""You are a friendly and helpful study assistant for students.
Answer clearly and completely using the context below.
Always give full, detailed answers. Never cut short.
If the answer isn't in the context, say "This topic isn't in the available material."

Study Material Context:
{context}"""

    # Build messages with history for conversation
    messages = [{"role": "system", "content": system_prompt}]
    messages += conversation_history
    messages.append({"role": "user", "content": question})

    # Ask Gemma
    response = ollama.chat(model="gemma3:4b", messages=messages)
    answer = response["message"]["content"]

    # Save to history
    conversation_history.append({"role": "user", "content": question})
    conversation_history.append({"role": "assistant", "content": answer})

    # Keep history to last 10 messages only (avoid memory overflow)
    if len(conversation_history) > 10:
        conversation_history = conversation_history[-10:]

    return jsonify({"response": answer})

@app.route("/reset", methods=["POST"])
def reset():
    global conversation_history
    conversation_history = []
    return jsonify({"status": "conversation reset"})

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "running"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)