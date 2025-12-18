# Realtime AI Backend (WebSockets Demo)

This project is a simple FastAPI backend with a WebSocket endpoint and a very basic HTML frontend that simulates a realtime chat session. It is the starting point for the Realtime AI Backend assignment.

## Tech Stack

- Python 3
- FastAPI
- Uvicorn
- WebSockets
- Simple static HTML/JavaScript frontend

## Setup (Windows)

1. Open **PowerShell**.
2. Go to the project folder:

cd $HOME\Documents\realtime-backend

3. Create and activate a virtual environment:

python -m venv .venv
.venv\Scripts\Activate.ps1

4. Install dependencies:

pip install "fastapi[standard]" "uvicorn[standard]"
 
## Running the backend

From the same PowerShell window (with `(.venv)` active and inside `realtime-backend`):

python main.py

The FastAPI server will start on:

http://127.0.0.1:8000
 
## Testing the WebSocket + frontend

1. In VS Code or File Explorer, open the `static` folder.
2. Double‑click `index.html` to open it in your browser.
3. On the page:
   - Click **Connect**.
   - Type a message in the input box.
   - Click **Send**.
4. You should see a response like:

[test-session-1] Echo: your message
 
This shows that the browser is connected via WebSocket to the FastAPI backend and messages are being sent and received in realtime.

## Repository

All project files are stored in this GitHub repository:

- `main.py` – FastAPI app with the WebSocket endpoint.
- `static/index.html` – Minimal frontend to connect to the WebSocket.
- `README.md` – Setup and run instructions.

This repo can be extended with Supabase integration, LLM streaming, and post‑session processing as required by the full assignment.
