import { PageFrame } from "@/components/site-chrome";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = createPageMetadata('Start a Website or Digital Product Project', 'Tell EZY DEV about your website, e-commerce or digital product project and start a conversation.', "contact");

export default function ContactPage(){return <PageFrame eyebrow="START A PROJECT" title="Let’s make it matter" intro="Tell us what you have in mind. Share as much or as little as you like; we’ll take it from there."><section className="contact-section contact-standalone"><div className="contact-intro"><span className="eyebrow">PROJECT ENQUIRIES</span><a className="contact-email" href="mailto:mr.eshmambetov@gmail.com">mr.eshmambetov@gmail.com ↗</a></div><ContactForm/></section></PageFrame>}
