import { LanguageToggle } from "@/components/language-toggle";
import { sitePath } from "@/lib/site-path";

export function SiteHeader() {
  return <header className="site-header"><a className="wordmark" href={sitePath()} aria-label="EZY DEV home">EZY DEV<span>.</span></a><nav className="main-nav" aria-label="Main navigation"><a href={sitePath("/work/")}>Work</a><a href={sitePath("/services/")}>Services</a><a href={sitePath("/about/")}>Studio</a><a href={sitePath("/process/")}>Process</a></nav><div className="header-actions"><LanguageToggle /><a className="header-cta" href={sitePath("/contact/")}>Let’s talk <span aria-hidden="true">↗</span></a></div></header>;
}

export function SiteFooter() {
  return <footer className="site-footer section-shell"><a className="wordmark" href={sitePath()}>EZY DEV<span>.</span></a><span>DIGITAL EXPERIENCES. ENGINEERED TO PERFORM.</span><div><a href={sitePath("/privacy/")}>PRIVACY</a><a href="#top">BACK TO TOP ↑</a><span>© {new Date().getFullYear()} EZY DEV.</span></div></footer>;
}

export function PageFrame({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: React.ReactNode }) {
  return <><SiteHeader/><main id="top" className="inner-page section-shell"><div className="inner-hero"><span className="eyebrow">{eyebrow}</span><h1>{title}<span className="lime">.</span></h1><p>{intro}</p></div>{children}</main><SiteFooter/></>;
}
