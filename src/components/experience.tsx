"use client";

import { useEffect, useState } from "react";

export function Experience() {
  const [point, setPoint] = useState({ x: -80, y: -80 });
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const move = (event: PointerEvent) => {
      setPoint({ x: event.clientX, y: event.clientY });
      setActive(true);
      const target = event.target as HTMLElement | null;
      document.body.classList.toggle("cursor-link", Boolean(target?.closest("a, button, select")));
      document.body.classList.toggle("cursor-project", Boolean(target?.closest(".project-art")));
    };
    const scroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    if (finePointer) window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    scroll();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    document.querySelectorAll(".project-card, .service-row, .process-card, .manifesto, .contact-intro, .contact-form").forEach((element) => {
      element.classList.add("reveal-ready");
      observer.observe(element);
    });

    return () => {
      if (finePointer) window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
      observer.disconnect();
      document.body.classList.remove("cursor-link", "cursor-project");
    };
  }, []);

  return <>
    <div className="scroll-progress" style={{ transform: `scaleX(${progress / 100})` }} aria-hidden="true" />
    <div className={`custom-cursor${active ? " is-active" : ""}`} style={{ left: point.x, top: point.y }} aria-hidden="true"><span>VIEW</span></div>
  </>;
}
