import { LanguageToggle } from "@/components/language-toggle";

export function SiteHeader() {
  return <header className="site-header"><a className="wordmark" href="/ezydev/" aria-label="EZY DEV home">EZY DEV<span>.</span></a><nav className="main-nav" aria-label="Main navigation"><a href="/ezydev/work/">Work</a><a href="/ezydev/services/">Services</a><a href="/ezydev/about/">Studio</a><a href="/ezydev/process/">Process</a></nav><div className="header-actions"><LanguageToggle /><a className="header-cta" href="/ezydev/contact/">Let’s talk <span aria-hidden="true">↗</span></a></div></header>;
}

export function SiteFooter() {
  return <footer className="site-footer section-shell"><a className="wordmark" href="/ezydev/">EZY DEV<span>.</span></a><span>DIGITAL EXPERIENCES. ENGINEERED TO PERFORM.</span><div><a href="/ezydev/privacy/">PRIVACY</a><a href="#top">BACK TO TOP ↑</a><span>© {new Date().getFullYear()} EZY DEV.</span></div></footer>;
}

export function PageFrame({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: React.ReactNode }) {
  return <><SiteHeader/><main id="top" className="inner-page section-shell"><div className="inner-hero"><span className="eyebrow">{eyebrow}</span><h1>{title}<span className="lime">.</span></h1><p>{intro}</p></div>{children}</main><SiteFooter/></>;
}
