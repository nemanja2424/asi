"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ContactButton.module.css";

export default function ContactButton({ children, className, onClick, ...props }) {
  const dialogRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const sendingRef = useRef(false);
  const id = useId();

  useEffect(() => {
    if (!isOpen) return;
    dialogRef.current.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isOpen]);

  function open(event) {
    onClick?.(event);
    setIsOpen(true);
  }

  async function sendMessage(event) {
    event.preventDefault();
    if (sendingRef.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = data.get("name").trim();
    const email = data.get("email").trim();
    const message = data.get("message").trim();
    if (!name || !message) return;
    sendingRef.current = true;
    setStatus("sending");
    setFeedback("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Your message could not be sent. Please try again.");
      form.reset();
      setStatus("success");
      setFeedback("Thank you! Your message has been sent. We’ll be in touch soon.");
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof TypeError ? "Connection error. Please try again." : error.message);
    } finally {
      sendingRef.current = false;
    }
  }

  return (
    <>
      <button {...props} type="button" className={`${styles.trigger} ${className || ""}`} onClick={open} aria-haspopup="dialog">
        {children}
      </button>
      {isOpen && createPortal(<dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-description`}
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
            dialogRef.current.close();
          }
        }}
      >
        <button type="button" className={styles.close} onClick={() => dialogRef.current.close()} aria-label="Close contact form">
          <span aria-hidden="true">×</span>
        </button>
        <span className={styles.eyebrow}>LET’S CREATE SOMETHING REMARKABLE</span>
        <h2 id={`${id}-title`} className={styles.title}>Let’s talk<span>.</span></h2>
        <p id={`${id}-description`} className={styles.description}>Have a project in mind? Tell us a little about it.</p>
        <form className={styles.form} onSubmit={sendMessage}>
          <div className={styles.row}>
            <label htmlFor={`${id}-name`}>Name
              <input id={`${id}-name`} name="name" autoComplete="name" placeholder="Your name" required maxLength={120} pattern=".*\S.*" />
            </label>
            <label htmlFor={`${id}-email`}>Email
              <input id={`${id}-email`} name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} />
            </label>
          </div>
          <label htmlFor={`${id}-message`}>Message
            <textarea id={`${id}-message`} name="message" rows={5} placeholder="Tell us about your idea, goals or next big project…" required maxLength={5000} onChange={(event) => event.target.setCustomValidity(event.target.value.trim() ? "" : "Please enter a message.")} />
          </label>
          <p className={styles.note} role="status" aria-live="polite">{feedback}</p>
          <button type="submit" className={styles.submit} disabled={status === "sending"} aria-busy={status === "sending"}>{status === "sending" ? "Sending…" : "Send a message"} <span aria-hidden="true">→</span></button>
        </form>
      </dialog>, document.body)}
    </>
  );
}
