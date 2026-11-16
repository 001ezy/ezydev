"use client";

import { useEffect, useRef, useState } from "react";

export function Experience() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let targetX = -80;
    let targetY = -80;
    let trailX = targetX;
    let trailY = targetY;
    let frame = 0;

    const animateTrail = () => {
      trailX += (targetX - trailX) * 0.2;
      trailY += (targetY - trailY) * 0.2;
      if (trailRef.current) trailRef.current.style.transform = `translate3d(${trailX}px, ${trailY}px, 0) translate(-50%, -50%)`;
      if (Math.abs(targetX - trailX) > 0.35 || Math.abs(targetY - trailY) > 0.35) frame = window.requestAnimationFrame(animateTrail);
      else frame = 0;
    };
    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "1";
        cursorRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }
      if (trailRef.current) trailRef.current.style.opacity = "1";
      if (!frame) frame = window.requestAnimationFrame(animateTrail);
      const target = event.target instanceof Element ? event.target : null;
      document.body.classList.toggle("cursor-link", Boolean(target?.closest("a, button, select")));
      document.body.classList.toggle("cursor-project", Boolean(target?.closest(".project-art, .project-more-link")));
    };
    const hide = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
      if (trailRef.current) trailRef.current.style.opacity = "0";
      document.body.classList.remove("cursor-link", "cursor-project");
    };
    const scroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    if (finePointer) {
      window.addEventListener("pointermove", move, { passive: true });
      window.addEventListener("blur", hide);
      document.documentElement.addEventListener("pointerleave", hide);
    }
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
      if (finePointer) {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("blur", hide);
        document.documentElement.removeEventListener("pointerleave", hide);
      }
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scroll);
      observer.disconnect();
      document.body.classList.remove("cursor-link", "cursor-project");
    };
  }, []);

  return <>
    <div className="scroll-progress" style={{ transform: `scaleX(${progress / 100})` }} aria-hidden="true" />
    <div ref={trailRef} className="cursor-trail" aria-hidden="true" />
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />
  </>;
}
