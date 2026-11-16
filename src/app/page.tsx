import { ContactForm } from "@/components/contact-form";
import { LanguageToggle } from "@/components/language-toggle";

const projects = [
  { number: "01", name: "VERTEX", kind: "REAL ESTATE / DIGITAL FLAGSHIP", className: "vertex", label: "A better way to find your place." },
  { number: "02", name: "NOIR", kind: "HOSPITALITY / COMMERCE", className: "noir", label: "Made for the hours after." },
  { number: "03", name: "ORBIT", kind: "EDUCATION / PLATFORM", className: "orbit", label: "Make room for what’s next." },
];

const services = [
  ["01", "Digital strategy", "Clear direction, informed by your audience, your market and what the business needs next."],
  ["02", "Websites & commerce", "Distinctive digital storefronts that make the value obvious and the next step effortless."],
  ["03", "Digital products", "Useful, thoughtful web applications built around the people who depend on them."],
  ["04", "Redesign & growth", "A sharper experience, a stronger foundation and a practical path to what comes after launch."],
];

const steps = [
  ["01", "Discover", "We get close to the business, the people and the problem before drawing a single screen."],
  ["02", "Define", "We turn what we learn into a focused direction, a clear scope and a plan you can trust."],
  ["03", "Design & build", "One close team takes the work from first sketch through the details that make it real."],
  ["04", "Launch & learn", "We ship with care, share what we’ve learned and help the product keep moving."],
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? "↗" : "→"}</span>;
}

export default function Home() {
  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="EZY DEV home">EZY DEV<span>.</span></a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#work">Work</a><a href="#services">Services</a><a href="#studio">Studio</a>
        </nav>
        <div className="header-actions"><LanguageToggle /><a className="header-cta" href="#contact">Let’s talk <Arrow diagonal /></a></div>
      </header>

      <main id="top">
        <section className="hero section-shell">
          <div className="hero-meta"><span>INDEPENDENT DIGITAL STUDIO</span><span>GLOBAL / EST. 2024</span></div>
          <h1>WE BUILD<br />DIGITAL EXPERIENCES<br /><span>THAT MOVE BUSINESS<br className="desktop-break" /> FORWARD<span className="lime">.</span></span></h1>
          <div className="hero-bottom">
            <p>Digital experiences.<br />Engineered to perform.</p>
            <div className="hero-actions"><a className="button button-lime" href="#contact">START A PROJECT <Arrow diagonal /></a><a className="text-link" href="#work">EXPLORE OUR WORK <Arrow /></a></div>
          </div>
          <div className="hero-index"><span>STRATEGY — DESIGN — ENGINEERING</span><span>01 / 04</span></div>
        </section>

        <section className="work-section section-shell" id="work">
          <div className="section-heading"><div><span className="eyebrow">A FEW THINGS WE’VE MADE</span><h2>Selected work<span className="lime">.</span></h2></div><p>Independent concepts.<br />Built to feel like the real thing.</p></div>
          <div className="work-grid">{projects.map((project) => <article className={`project-card ${project.className}`} key={project.number}>
            <a className="project-art" href="#contact" aria-label={`Discuss a project like ${project.name}`}>
              <span className="concept-stamp">CONCEPT<br />PROJECT</span><span className="project-art-word">{project.name}</span><span className="project-art-note">{project.label}</span><span className="project-open"><Arrow diagonal /></span>
            </a>
            <div className="project-caption"><span>{project.number} / {project.kind}</span><span>{project.name}</span></div>
          </article>)}</div>
          <div className="work-foot"><span>More considered work, coming into focus.</span><a href="#contact" className="text-link">HAVE SOMETHING IN MIND? <Arrow /></a></div>
        </section>

        <section className="services-section section-shell" id="services">
          <div className="section-heading"><div><span className="eyebrow">WHAT WE BRING TO THE TABLE</span><h2>Small team.<br />Full picture<span className="lime">.</span></h2></div><p>Good work starts with understanding what success looks like for you.</p></div>
          <div className="service-list">{services.map(([number, title, description]) => <article className="service-row" key={number}><span className="service-number">{number}</span><h3>{title}</h3><p>{description}</p><span className="service-plus" aria-hidden="true">↗</span></article>)}</div>
        </section>

        <section className="manifesto section-shell" id="studio">
          <span className="eyebrow">A LITTLE ABOUT US</span><p>We believe the best digital work is <span>clear in its purpose,</span> considered in its details, and made to do more than just look the part.</p>
          <div className="manifesto-foot"><span>INDEPENDENT BY DESIGN. COLLABORATIVE BY NATURE.</span><a href="#contact" className="text-link">MEET YOUR NEW PARTNER <Arrow /></a></div>
        </section>

        <section className="process-section section-shell" id="process">
          <div className="section-heading"><div><span className="eyebrow">GOOD WORK, BUILT TOGETHER</span><h2>From first thought<br />to next chapter<span className="lime">.</span></h2></div><p>Clear steps. Close collaboration.<br />No surprises along the way.</p></div>
          <div className="process-grid">{steps.map(([number, title, description]) => <article className="process-card" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
        </section>

        <section className="contact-section section-shell" id="contact">
          <div className="contact-intro"><span className="eyebrow">HAVE A GOOD ONE IN MIND?</span><h2>Let’s make<br />it matter<span className="lime">.</span></h2><p>Tell us a little about what you’re working on. We’ll take it from there.</p><a href="mailto:hello@ezydev.studio" className="contact-email">hello@ezydev.studio <Arrow diagonal /></a></div>
          <ContactForm />
        </section>
      </main>

      <footer className="site-footer section-shell"><a className="wordmark" href="#top">EZY DEV<span>.</span></a><span>DIGITAL EXPERIENCES. ENGINEERED TO PERFORM.</span><div><a href="#top">BACK TO TOP ↑</a><span>© {new Date().getFullYear()} EZY DEV.</span></div></footer>
    </>
  );
}
