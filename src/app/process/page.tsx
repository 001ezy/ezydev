import { sitePath } from "@/lib/site-path";
import { PageFrame } from "@/components/site-chrome";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const stages=[["01","Discover","Understand the business, people and problem before we draw a screen."],["02","Define","Agree on a direction, scope, priorities and a practical plan."],["03","Design & build","Shape, prototype and engineer the experience with one close team."],["04","Launch & learn","Ship with care, learn from real use and keep improving."]];
export const metadata: Metadata = createPageMetadata('Our Website Design & Development Process', 'A clear, collaborative process from discovery and product strategy through design, engineering and launch.', "process");

export default function ProcessPage(){return <PageFrame eyebrow="A CLEAR WAY FORWARD" title="Good work, built together" intro="A collaborative process with clear decisions at every stage. You know what we’re solving, what’s next and why it matters."><div className="process-grid process-expanded">{stages.map(([n,t,d])=><article className="process-card" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div><section className="page-cta"><span className="eyebrow">YOUR TURN</span><h2>What are you looking to make happen?</h2><a className="button button-lime" href={sitePath("/contact/")}>TELL US ABOUT IT ↗</a></section></PageFrame>}
