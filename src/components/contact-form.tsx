"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export function ContactForm() {
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = encodeURIComponent(`Project enquiry — ${String(data.get("company") || data.get("name"))}`);
    const body = encodeURIComponent([
      `Name: ${data.get("name")}`,
      `Company: ${data.get("company") || "Not provided"}`,
      `Email: ${data.get("email")}`,
      `Project type: ${data.get("type")}`,
      `Budget range: ${data.get("budget") || "Not provided"}`,
      "",
      String(data.get("details")),
    ].join("\n"));
    setNotice("Your email app should open with the enquiry ready to send. Nothing is submitted or stored on this website.");
    window.location.href = `mailto:hello@ezydev.studio?subject=${subject}&body=${body}`;
  }

  return <form className="contact-form" onSubmit={handleSubmit}>
    <label>Name <span>*</span><input name="name" autoComplete="name" required placeholder="Your name" /></label>
    <label>Company <input name="company" autoComplete="organization" placeholder="Your company" /></label>
    <label>Email <span>*</span><input name="email" type="email" autoComplete="email" required placeholder="you@company.com" /></label>
    <div className="form-pair"><label>Project type <span>*</span><select name="type" required defaultValue=""><option value="" disabled>Select one</option><option>Business website</option><option>E-commerce</option><option>Web application</option><option>Redesign</option><option>Something else</option></select></label>
    <label>Budget range <select name="budget" defaultValue=""><option value="">Select a range</option><option>Under $5k</option><option>$5k–$15k</option><option>$15k–$40k</option><option>$40k+</option><option>Let’s discuss</option></select></label></div>
    <label>Tell us about the project <span>*</span><textarea name="details" required minLength={20} rows={3} placeholder="What are you looking to make happen?" /></label>
    <button className="button button-lime form-submit" type="submit">PREPARE ENQUIRY <span aria-hidden="true">↗</span></button>
    <p className="form-note" aria-live="polite">{notice || "Required fields marked with *. Your details stay in your email app until you choose to send."}</p>
  </form>;
}
