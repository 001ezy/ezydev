import { notFound } from "next/navigation";
import { PageFrame } from "@/components/site-chrome";

const projects: Record<string,{name:string;kind:string;title:string;desc:string;features:string[]}> = {
  vertex:{name:"VERTEX",kind:"REAL ESTATE / CONCEPT PROJECT",title:"Find your place, with more clarity.",desc:"A concept sales experience for a residential development. Explore available homes, compare layouts and understand the numbers before booking a consultation.",features:["Interactive apartment selection","Floor and room filters","Floor plans and home cards","Price estimate calculator"]},
  noir:{name:"NOIR",kind:"HOSPITALITY / CONCEPT PROJECT",title:"A little more atmosphere, all the way through.",desc:"A restaurant concept that carries the feeling of an evening from the menu to the table. Browse dishes, build a demo basket and explore reservations.",features:["Filterable menu","Working demo basket","Quantity controls","Table reservation interface"]},
  orbit:{name:"ORBIT",kind:"EDUCATION / CONCEPT PROJECT",title:"Make room for what’s next.",desc:"A learning platform concept designed to turn curiosity into progress, with a clear path from course discovery to completed lessons.",features:["Course catalogue","Lesson experience","Knowledge checks","Progress tracking"]},
};

export function generateStaticParams(){return Object.keys(projects).map(slug=>({slug}));}
export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const project=projects[slug];if(!project)notFound();return <PageFrame eyebrow={project.kind} title={project.name} intro={project.desc}><section className={`project-art detail-art ${slug}`}><span className="concept-stamp">CONCEPT<br/>PROJECT</span><span className="project-art-word">{project.name}</span></section><section className="project-detail-copy"><div><span className="eyebrow">THE IDEA</span><h2>{project.title}</h2></div><ul>{project.features.map(x=><li key={x}>{x}<span>↗</span></li>)}</ul></section><div className="page-cta"><a className="button button-lime" href="/ezydev/contact/">BUILD SOMETHING LIKE THIS ↗</a></div></PageFrame>}
