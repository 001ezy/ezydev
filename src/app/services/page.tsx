import { PageFrame } from "@/components/site-chrome";

const items = [
  ["01", "Strategy & direction", "Find the right problem, the clearest story and the most useful next move.", "Discovery · Positioning · Product strategy · Content structure"],
  ["02", "Websites & commerce", "A distinctive digital home that makes your value clear and action effortless.", "Business websites · Landing pages · E-commerce · Real estate"],
  ["03", "Digital products", "Useful web applications shaped around the people who rely on them.", "Product design · UX/UI · Prototyping · Web applications"],
  ["04", "Redesign & growth", "Make an existing experience easier to use, easier to manage and ready for what comes next.", "Experience audit · Redesign · Performance · Ongoing improvement"],
];

export default function ServicesPage() {
  return <PageFrame eyebrow="WHAT WE DO" title="Built around your next move" intro="From the first useful question to the final detail before launch, we bring strategy, design and engineering together."><section className="detail-list">{items.map(([n,t,d,tags])=><article className="detail-row" key={n}><span className="service-number">{n}</span><div><h2>{t}</h2><p>{d}</p><small>{tags}</small></div><span className="service-plus">↗</span></article>)}</section><section className="page-cta"><span className="eyebrow">READY WHEN YOU ARE</span><h2>Let’s make something useful<span className="lime">.</span></h2><a className="button button-lime" href="/ezydev/contact/">START A PROJECT ↗</a></section></PageFrame>;
}
