import { sitePath } from "@/lib/site-path";
import { PageFrame } from "@/components/site-chrome";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata('About EZY DEV.', 'Meet EZY DEV, an independent digital studio combining strategy, design and engineering for ambitious businesses.', "about");

export default function AboutPage(){return <PageFrame eyebrow="INDEPENDENT DIGITAL STUDIO / GLOBAL" title="Small team. Full picture" intro="EZY DEV is an independent digital studio partnering with ambitious businesses to make their next digital move count."><section className="manifesto about-manifesto"><span className="eyebrow">HOW WE THINK</span><p>Good digital work is <span>clear in its purpose,</span> considered in its details, and made to do more than just look the part.</p><div className="manifesto-foot"><span>STRATEGY — DESIGN — ENGINEERING</span><a href={sitePath("/process/")} className="text-link">HOW WE WORK ↗</a></div></section><section className="page-cta"><span className="eyebrow">A CLOSE, SENIOR TEAM</span><h2>Thoughtful by design. Practical by nature.</h2><a className="button button-lime" href={sitePath("/contact/")}>MEET US ON YOUR PROJECT ↗</a></section></PageFrame>}
