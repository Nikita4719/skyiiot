import React, { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Bot, AlertCircle, Plus, RotateCw, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./ChatBot.css";

const API_URL = "https://smebuzz.com/chatbots/api/skyiiot/chat";

const QUICK_QUESTIONS = [
  "What is SkyIIoT?",
  "Smart Sensor Nodes",
  "IoT Gateway & Connectivity",
  "Real-Time Monitoring Features"
];

const getTimestamp = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const createWelcomeMessage = () => ({
  id: "welcome",
  sender: "bot",
  text: "Hello! Welcome to SkyIIoT. How can I assist you with our Industrial IoT platform today?",
  timestamp: getTimestamp()
});

// Strip outer punctuation while preserving balanced parentheses
function trimPunctuation(str) {
  let leading = "";
  let trailing = "";
  let core = str;

  while (core.length > 0 && /[([{"'<]/.test(core[0])) {
    leading += core[0];
    core = core.slice(1);
  }

  while (core.length > 0) {
    const lastChar = core.slice(-1);
    if (/[.,;:!?"'>\]]/.test(lastChar)) {
      trailing = lastChar + trailing;
      core = core.slice(0, -1);
    } else if (lastChar === ")") {
      const openCount = (core.match(/\(/g) || []).length;
      const closeCount = (core.match(/\)/g) || []).length;
      if (closeCount > openCount) {
        trailing = lastChar + trailing;
        core = core.slice(0, -1);
      } else {
        break;
      }
    } else {
      break;
    }
  }

  return { leading, core, trailing };
}

// Validate safe HTTP/HTTPS URL
function parseSafeUrl(rawCandidate) {
  const { leading, core: url, trailing } = trimPunctuation(rawCandidate);
  if (!url) return null;

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
    if (!parsed.hostname || (!parsed.hostname.includes(".") && parsed.hostname !== "localhost")) return null;
    return { leading, cleanUrl: url, safeHref: parsed.href, trailing };
  } catch {
    return null;
  }
}

// Validate email address
function parseSafeEmail(rawCandidate) {
  const { leading, core: email, trailing } = trimPunctuation(rawCandidate);
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (emailRegex.test(email) && !email.includes("..")) {
    return { leading, email, trailing };
  }
  return null;
}

// Parse **bold** markdown
function renderTextWithBold(text) {
  if (!text || typeof text !== "string" || !text.includes("**")) return text;
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={idx} style={{ fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function renderFormattedMessage(text, isUser) {
  if (!text || typeof text !== "string") return null;

  const tokenRegex = /(https?:\/\/[^\s<>"'{}|\\^`]+|[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, index) => {
    if (!part) return null;

    if (/^https?:\/\//i.test(part)) {
      const result = parseSafeUrl(part);
      if (!result) return <span key={index}>{renderTextWithBold(part)}</span>;

      return (
        <span key={index}>
          {result.leading}
          <a
            href={result.safeHref}
            target="_blank"
            rel="noopener noreferrer nofollow"
            title={`External link: ${result.safeHref}`}
            aria-label={`Visit link ${result.cleanUrl} (opens in a new tab)`}
            className={`sky-chatbot-link ${isUser ? "user" : "bot"}`}
          >
            <span>{result.cleanUrl}</span>
            <ExternalLink size={10} style={{ display: "inline", opacity: 0.7 }} aria-hidden="true" />
          </a>
          {result.trailing}
        </span>
      );
    }

    if (/@/i.test(part)) {
      const emailResult = parseSafeEmail(part);
      if (emailResult) {
        return (
          <span key={index}>
            {emailResult.leading}
            <a
              href={`mailto:${emailResult.email}`}
              title={`Send email to ${emailResult.email}`}
              aria-label={`Send email to ${emailResult.email}`}
              className={`sky-chatbot-link ${isUser ? "user" : "bot"}`}
            >
              {emailResult.email}
            </a>
            {emailResult.trailing}
          </span>
        );
      }
    }

    return <span key={index}>{renderTextWithBold(part)}</span>;
  });
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([createWelcomeMessage()]);

  const messagesContainerRef = useRef(null);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const launcherButtonRef = useRef(null);
  const abortControllerRef = useRef(null);

  const handleCloseChat = useCallback(() => {
    setIsOpen(false);
    launcherButtonRef.current?.focus();
  }, []);

  const scrollToMessage = useCallback((smooth = true) => {
    if (!messagesContainerRef.current) return;
    const container = messagesContainerRef.current;
    const lastMsg = messages[messages.length - 1];

    if (lastMsg && lastMsg.sender === "bot" && lastMsg.id !== "welcome") {
      const el = container.querySelector(`[data-msg-id="${lastMsg.id}"]`);
      if (el) {
        const targetTop = container.scrollTop + (el.getBoundingClientRect().top - container.getBoundingClientRect().top) - 10;
        container.scrollTo({ top: Math.max(0, targetTop), behavior: smooth ? "smooth" : "auto" });
        return;
      }
    }

    container.scrollTo({ top: container.scrollHeight, behavior: smooth ? "smooth" : "auto" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      const rafId = requestAnimationFrame(() => scrollToMessage());
      return () => cancelAnimationFrame(rafId);
    }
  }, [messages, isTyping, isOpen, scrollToMessage]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => abortControllerRef.current?.abort("UNMOUNT");
  }, []);

  // Combined Escape key and click-outside listeners
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleCloseChat();
    };

    const handleClickOutside = (e) => {
      if (chatContainerRef.current && !chatContainerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, handleCloseChat]);

  const handleSendMessage = useCallback(async (textToSend, isRetry = false) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isTyping) return;

    if (isRetry) {
      setMessages((prev) => prev.filter((m) => !(m.isError && m.retryText === text)));
    } else {
      setMessages((prev) => [
        ...prev,
        { id: "user_" + Date.now(), sender: "user", text, timestamp: getTimestamp() }
      ]);
    }

    setInputMessage("");
    setIsTyping(true);

    abortControllerRef.current?.abort("NEW_REQUEST");
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const timeoutId = setTimeout(() => controller.abort("TIMEOUT"), 30000);

    try {
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        throw new Error("OFFLINE");
      }

      const payload = { message: text };
      if (sessionId) payload.session_id = sessionId;

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 429) throw new Error("RATE_LIMIT");
        if (response.status >= 500) throw new Error("SERVER_UNAVAILABLE");
        throw new Error(`HTTP_${response.status}`);
      }

      const data = await response.json();
      if (data?.session_id) setSessionId(data.session_id);

      const botReply = (typeof data?.reply === "string" ? data.reply.trim() : "") || "I could not find an answer for that.";
      if (controller.signal.aborted) return;

      setMessages((prev) => [
        ...prev,
        { id: "bot_" + Date.now(), sender: "bot", text: botReply, timestamp: getTimestamp() }
      ]);
    } catch (err) {
      clearTimeout(timeoutId);
      if (controller.signal.aborted && controller.signal.reason !== "TIMEOUT") return;

      const ERROR_MAP = {
        OFFLINE: "You appear to be offline. Please check your internet connection.",
        RATE_LIMIT: "Too many requests. Please wait a moment before sending another message.",
        SERVER_UNAVAILABLE: "The SkyIIoT AI service is temporarily unavailable. Please try again shortly."
      };

      let errorMessage = "Unable to connect to the assistant server. Please try again.";
      if (err instanceof Error) {
        if (ERROR_MAP[err.message]) {
          errorMessage = ERROR_MAP[err.message];
        } else if (controller.signal.reason === "TIMEOUT" || err.name === "TimeoutError" || err.name === "AbortError") {
          errorMessage = "Connection timed out. The server took too long to reply.";
        } else if (err.message.startsWith("HTTP_")) {
          errorMessage = `Service returned an error (${err.message.replace("HTTP_", "status ")}). Please try again.`;
        }
      }

      setMessages((prev) => [
        ...prev,
        { id: "err_" + Date.now(), sender: "bot", text: errorMessage, timestamp: getTimestamp(), isError: true, retryText: text }
      ]);
    } finally {
      if (!controller.signal.aborted || controller.signal.reason === "TIMEOUT") {
        setIsTyping(false);
      }
    }
  }, [inputMessage, isTyping, sessionId]);

  const handleResetChat = useCallback(() => {
    abortControllerRef.current?.abort("RESET");
    abortControllerRef.current = null;
    setIsTyping(false);
    setSessionId(null);
    setMessages([createWelcomeMessage()]);
    setInputMessage("");
    inputRef.current?.focus();
  }, []);

  return (
    <div ref={chatContainerRef} className="sky-chatbot-container">
      {/* Launcher */}
      <div className="sky-chatbot-launcher">
        <motion.button
          ref={launcherButtonRef}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => (isOpen ? handleCloseChat() : setIsOpen(true))}
          aria-expanded={isOpen}
          aria-controls="skyiiot-chatbot-window"
          aria-haspopup="dialog"
          aria-label={isOpen ? "Close SkyIIoT AI Chatbot" : "Open SkyIIoT AI Chatbot"}
          className="sky-chatbot-toggle-btn"
        >
          {isOpen ? (
            <div className="sky-chatbot-close-circle">
              <X size={20} aria-hidden="true" />
            </div>
          ) : (
            <motion.div
              animate={{ y: [0, -7, 0], rotate: [0, 1.2, -1.2, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <img
                src="/assets/img/chatbot-icon.png"
                alt="AI Assistant"
                className="sky-chatbot-avatar-img"
              />
            </motion.div>
          )}
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="skyiiot-chatbot-window"
            role="dialog"
            aria-modal="false"
            aria-label="SkyIIoT AI Assistant"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="sky-chatbot-window"
          >
            {/* Header */}
            <div className="sky-chatbot-header">
              <div className="sky-chatbot-brand">
                <div className="sky-chatbot-logo-box">
                  <img
                    src="/assets/img/skyiiot-logo.png"
                    alt="SkyIIoT Logo"
                    className="sky-chatbot-logo-img"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                </div>
                <div>
                  <h3 className="sky-chatbot-title">SkyIIoT Assistant</h3>
                  <p className="sky-chatbot-subtitle">AI Support Desk</p>
                </div>
              </div>

              <div className="sky-chatbot-header-actions">
                {messages.length > 1 && (
                  <button
                    type="button"
                    onClick={handleResetChat}
                    title="Start a new chat conversation"
                    aria-label="Start a new chat conversation"
                    className="sky-chatbot-new-chat-btn"
                  >
                    <Plus size={11} aria-hidden="true" />
                    <span>New Chat</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleCloseChat}
                  title="Close chat window"
                  aria-label="Close chat window"
                  className="sky-chatbot-close-btn"
                >
                  <X size={15} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={messagesContainerRef}
              role="log"
              aria-live="polite"
              aria-label="Chat messages history"
              className="sky-chatbot-body"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  data-msg-id={msg.id}
                  className={`sky-chatbot-msg-row ${msg.sender === "user" ? "user" : "bot"}`}
                >
                  {msg.sender === "bot" && (
                    <div
                      aria-hidden="true"
                      className={`sky-chatbot-bot-avatar ${msg.isError ? "error" : ""}`}
                    >
                      {msg.isError ? <AlertCircle size={13} /> : <Bot size={13} />}
                    </div>
                  )}

                  <div
                    className={`sky-chatbot-bubble ${
                      msg.sender === "user" ? "user" : msg.isError ? "error" : "bot"
                    }`}
                  >
                    <p>{renderFormattedMessage(msg.text, msg.sender === "user")}</p>

                    {/* Retry */}
                    {msg.isError && msg.retryText && (
                      <div className="sky-chatbot-retry-wrap">
                        <button
                          type="button"
                          onClick={() => handleSendMessage(msg.retryText, true)}
                          disabled={isTyping}
                          aria-label={`Retry sending: ${msg.retryText}`}
                          className="sky-chatbot-retry-btn"
                        >
                          <RotateCw size={11} aria-hidden="true" />
                          <span>Retry</span>
                        </button>
                      </div>
                    )}

                    <span className="sky-chatbot-timestamp">{msg.timestamp}</span>
                  </div>
                </div>
              ))}

              {/* Typing */}
              {isTyping && (
                <div className="sky-chatbot-typing-row">
                  <div aria-hidden="true" className="sky-chatbot-bot-avatar">
                    <Bot size={13} />
                  </div>
                  <div className="sky-chatbot-typing-box">
                    <span className="sky-chatbot-dot" />
                    <span className="sky-chatbot-dot" />
                    <span className="sky-chatbot-dot" />
                  </div>
                </div>
              )}

              {/* Quick Questions */}
              {messages.length <= 2 && !isTyping && (
                <div role="group" aria-label="Suggested quick questions" className="sky-chatbot-quick-group">
                  {QUICK_QUESTIONS.map((query) => (
                    <button
                      key={query}
                      type="button"
                      disabled={isTyping}
                      onClick={() => handleSendMessage(query)}
                      className="sky-chatbot-quick-btn"
                    >
                      {query}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input Footer */}
            <div className="sky-chatbot-footer">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="sky-chatbot-input-form"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about SkyIIoT products, sensors..."
                  maxLength={1000}
                  autoComplete="off"
                  aria-label="Type your message"
                  className="sky-chatbot-input"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isTyping}
                  className="sky-chatbot-send-btn"
                  aria-label="Send message"
                >
                  <Send size={12} aria-hidden="true" />
                </button>
              </form>
              <div className="sky-chatbot-powered">
                Powered by <span>SkyLabs</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
