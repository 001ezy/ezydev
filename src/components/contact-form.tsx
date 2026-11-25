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
      `Package or add-ons: ${data.get("package") || "Not provided"}`,
      "",
      String(data.get("details")),
    ].join("\n"));
    setNotice("Your email app should open with the enquiry ready to send. Nothing is submitted or stored on this website.");
    window.location.href = `mailto:mr.eshmambetov@gmail.com?subject=${subject}&body=${body}`;
  }

  return <form className="contact-form" onSubmit={handleSubmit}>
    <label>Name <span>*</span><input name="name" autoComplete="name" required placeholder="Your name" /></label>
    <label>Company <input name="company" autoComplete="organization" placeholder="Your company" /></label>
    <label>Email <span>*</span><input name="email" type="email" autoComplete="email" required placeholder="you@company.com" /></label>
    <div className="form-pair"><label>Project type <span>*</span><select name="type" required defaultValue=""><option value="" disabled>Select one</option><option>Business website</option><option>E-commerce</option><option>Web application</option><option>Redesign</option><option>Something else</option></select></label>
    <label>Package or add-ons <select name="package" defaultValue=""><option value="">Choose a starting point</option><option value="EZY START — USD 100 — one-page website">EZY START · $100 · one-page website</option><option value="EZY START + extra pages — priced separately">Extra pages · priced separately</option><option value="EZY START + custom functionality — scoped and priced separately">Custom features · priced separately</option><option value="EZY START + integrations — scoped and priced separately">Integrations · priced separately</option><option value="Paid domain, hosting or ongoing maintenance — priced separately">Domain, hosting or maintenance · priced separately</option><option value="Not sure — help me scope it">Not sure yet — help me scope it</option></select></label></div>
    <p className="form-note form-scope-note">EZY START is one responsive page for $100. Extra pages, custom features, integrations, paid domain or hosting, and ongoing support are scoped and priced separately. This form only prepares an email; you choose whether to send it.</p>
    <label>Tell us about the project <span>*</span><textarea name="details" required minLength={20} rows={3} placeholder="What are you looking to make happen?" /></label>
    <button className="button button-lime form-submit" type="submit">PREPARE ENQUIRY <span aria-hidden="true">↗</span></button>
    <p className="form-note" aria-live="polite">{notice || "Required fields marked with *. Your details stay in your email app until you choose to send."}</p>
  </form>;
}
