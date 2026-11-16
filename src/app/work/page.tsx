import { sitePath } from "@/lib/site-path";
import { PageFrame } from "@/components/site-chrome";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const work = [
  ["vertex","VERTEX","REAL ESTATE","A clearer way to find a place to call home.","vertex"],
  ["noir","NOIR","HOSPITALITY","A restaurant experience for the hours after.","noir"],
  ["orbit","ORBIT","EDUCATION","A learning platform that moves at your pace.","orbit"],
  ["motion","MOTION","AUTOMOTIVE","Expert care for every mile ahead.","motion"],
  ["forma","FORMA","CONSTRUCTION","Architecture shaped around the way you live.","f1"],
  ["vitalis","VITALIS","HEALTHCARE","A more human kind of healthcare.","f2"],
  ["atelier","ATELIER","FURNITURE","Considered furniture for everyday rituals.","f3"],
  ["alterra","ALTERRA","HOSPITALITY","A quieter kind of somewhere.","f4"],
  ["elan","ÉLAN","BEAUTY & WELLNESS","A little space to come back to yourself.","noir"],
  ["nexus","NEXUS","LOGISTICS","Cross-border delivery with a human touch.","orbit"],
];

export const metadata: Metadata = createPageMetadata('Selected Website & Product Work', 'Explore ten independent concept projects across real estate, hospitality, education, automotive and more.', "work");

export default function WorkPage() {
  return <PageFrame eyebrow="SELECTED WORK / CONCEPTS" title="Ideas made tangible" intro="Independent concept projects. Each one explores how a thoughtful digital product can make a business experience clearer and more useful."><div className="portfolio-grid">{work.map(([slug,name,kind,desc,style],i)=><article className={`project-card ${style}`} key={slug}><a href={sitePath(`/work/${slug}/`)} className="project-art"><span className="concept-stamp">CONCEPT<br/>PROJECT</span><span className="project-art-word">{name}</span><span className="project-art-note">{desc}</span></a><div className="project-caption"><span>0{i+1} / {kind}</span><a href={sitePath(`/work/${slug}/`)}>VIEW PROJECT ↗</a></div></article>)}</div></PageFrame>;
}
