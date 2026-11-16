import { PageFrame } from "@/components/site-chrome";

const work = [
  ["vertex","VERTEX","REAL ESTATE","A clearer way to find a place to call home.","vertex"],
  ["noir","NOIR","HOSPITALITY","A restaurant experience for the hours after.","noir"],
  ["orbit","ORBIT","EDUCATION","A learning platform that moves at your pace.","orbit"],
  ["motion","MOTION","AUTOMOTIVE","Expert care for every mile ahead.","motion"],
];

export default function WorkPage() {
  return <PageFrame eyebrow="SELECTED WORK / CONCEPTS" title="Ideas made tangible" intro="Independent concept projects. Each one explores how a thoughtful digital product can make a business experience clearer and more useful."><div className="portfolio-grid">{work.map(([slug,name,kind,desc,style],i)=><article className={`project-card ${style}`} key={slug}><a href={`/ezydev/work/${slug}/`} className="project-art"><span className="concept-stamp">CONCEPT<br/>PROJECT</span><span className="project-art-word">{name}</span><span className="project-art-note">{desc}</span><span className="project-open">↗</span></a><div className="project-caption"><span>0{i+1} / {kind}</span><a href={`/ezydev/work/${slug}/`}>VIEW PROJECT ↗</a></div></article>)}</div></PageFrame>;
}
