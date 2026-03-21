import requests

print("=" * 50)
print("        🎓 Study Chatbot - EVS Assistant")
print("=" * 50)
print("Type 'quit' to exit | 'reset' to start fresh")
print("=" * 50 + "\n")

while True:
    question = input("You: ").strip()
    
    if question.lower() == "quit":
        print("\nBot: Goodbye! Keep studying! 👋")
        break
    
    if question.lower() == "reset":
        requests.post("http://127.0.0.1:5000/reset")
        print("\nBot: Conversation reset! Ask me anything.\n")
        continue
    
    if question == "":
        continue

    try:
        response = requests.post(
            "http://127.0.0.1:5000/chat",
            json={"message": question}
        )
        answer = response.json()["response"]
        
        print("\n" + "-" * 50)
        print(f"Bot: {answer}")
        print("-" * 50 + "\n")

    except Exception as e:
        print(f"\nError: Make sure app.py is running!\n")