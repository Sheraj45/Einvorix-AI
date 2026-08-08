import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Chat = () => {
  const location = useLocation();
  const character = location.state?.character;

  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: `Hello! I am ${character?.name}. How can I help you today?`,
    },
  ]);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = async () => {
    if (message.trim() === "") return;

    const prompt = message;

    const userMessage = {
      sender: "user",
      text: prompt,
    };

    // Show user message immediately
    setMessages((prev) => [...prev, userMessage]);

    // Clear input
    setMessage("");

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/chat",
        {
          prompt,
          character: character?.name,
          history: messages,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      const aiMessage = {
        sender: "ai",
        text: response.data.response,
      };

      // Add AI response
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      console.error("Server response:", error.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      {" "}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          padding: "15px 20px",
          marginBottom: "20px",
          background: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            width: "55px",
            height: "55px",
            borderRadius: "50%",
            background: "#f1f5f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
          }}
        >
          {character?.emoji}
        </div>

        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "20px",
            }}
          >
            {character?.name}
          </h2>
          <p
            style={{
              margin: "4px 0 0",
              color: "#666",
              fontSize: "14px",
            }}
          >
            Intelligent Virtual Expert
          </p>
        </div>
      </div>
      <div
        style={{
          height: "400px",
          overflowY: "auto",
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "20px",
          background: "#fff",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: "15px",
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "12px 16px",
                borderRadius: "15px",
                background: msg.sender === "user" ? "#2563eb" : "#f1f1f1",
                color: msg.sender === "user" ? "white" : "#222",
              }}
            >
              <strong>{msg.sender === "ai" ? character?.name : "You"}</strong>
              <p
                style={{
                  margin: "6px 0 0 0",
                  lineHeight: "1.5",
                }}
              >
                {msg.text}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div
            style={{
              marginBottom: "15px",
              color: "#666",
              fontStyle: "italic",
            }}
          >
            {character?.name} is thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          padding: "10px",
          background: "#ffffff",
          border: "1px solid #ddd",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        }}
      >
        <input
          type="text"
          placeholder={`Talk with ${character?.name}...`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          style={{
            flex: 1,
            padding: "12px",
            border: "none",
            outline: "none",
            fontSize: "15px",
          }}
        />

        <button
          onClick={handleSend}
          style={{
            padding: "10px 20px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
