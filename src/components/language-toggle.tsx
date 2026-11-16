"use client";

import { useState } from "react";

const translations: Record<string, string> = {
  "Work": "Работы", "Services": "Услуги", "Studio": "Студия", "Let’s talk": "Обсудим проект",
  "INDEPENDENT DIGITAL STUDIO": "НЕЗАВИСИМАЯ DIGITAL-СТУДИЯ", "GLOBAL / EST. 2024": "МИРОВОЙ РЫНОК / С 2024",
  "WE BUILD": "МЫ СОЗДАЁМ", "DIGITAL EXPERIENCES": "ЦИФРОВЫЕ ПРОДУКТЫ", "THAT MOVE BUSINESS": "КОТОРЫЕ ДВИГАЮТ БИЗНЕС", "FORWARD": "ВПЕРЁД",
  "Digital experiences.": "Цифровые продукты.", "Engineered to perform.": "Созданные для результата.",
  "START A PROJECT": "НАЧАТЬ ПРОЕКТ", "EXPLORE OUR WORK": "НАШИ РАБОТЫ", "STRATEGY — DESIGN — ENGINEERING": "СТРАТЕГИЯ — ДИЗАЙН — РАЗРАБОТКА",
  "A FEW THINGS WE’VE MADE": "НЕКОТОРЫЕ НАШИ ПРОЕКТЫ", "Selected work": "Избранные проекты", "Independent concepts.": "Независимые концепции.", "Built to feel like the real thing.": "Продуманы как настоящие продукты.",
  "CONCEPT": "КОНЦЕПТ", "PROJECT": "ПРОЕКТ", "A better way to find your place.": "Найдите место, которое вам подходит.", "Made for the hours after.": "Вечер начинается здесь.", "Make room for what’s next.": "Откройте пространство для нового.",
  "REAL ESTATE / DIGITAL FLAGSHIP": "НЕДВИЖИМОСТЬ / ЦИФРОВОЙ ПРОДУКТ", "HOSPITALITY / COMMERCE": "РЕСТОРАН / ЭЛЕКТРОННАЯ ТОРГОВЛЯ", "EDUCATION / PLATFORM": "ОБРАЗОВАНИЕ / ПЛАТФОРМА",
  "More considered work, coming into focus.": "Скоро здесь появятся новые проекты.", "HAVE SOMETHING IN MIND?": "ЕСТЬ ИДЕЯ?", "WHAT WE BRING TO THE TABLE": "ЧЕМ МЫ МОЖЕМ ПОМОЧЬ", "Small team.": "Небольшая команда.", "Full picture": "Полный цикл",
  "Good work starts with understanding what success looks like for you.": "Хороший результат начинается с понимания ваших целей.", "Digital strategy": "Цифровая стратегия", "Websites & commerce": "Сайты и e-commerce", "Digital products": "Цифровые продукты", "Redesign & growth": "Редизайн и развитие",
  "Clear direction, informed by your audience, your market and what the business needs next.": "Понятный вектор на основе вашей аудитории, рынка и задач бизнеса.", "Distinctive digital storefronts that make the value obvious and the next step effortless.": "Выразительные сайты, которые ясно показывают ценность и ведут к действию.", "Useful, thoughtful web applications built around the people who depend on them.": "Продуманные веб-приложения для людей, которые ими пользуются.", "A sharper experience, a stronger foundation and a practical path to what comes after launch.": "Удобный опыт, надёжная основа и понятный план развития после запуска.",
  "A LITTLE ABOUT US": "НЕМНОГО О НАС", "We believe the best digital work is ": "Мы верим, что лучшие цифровые продукты ", "clear in its purpose,": "понятны своей целью,", " considered in its details, and made to do more than just look the part.": " продуманы в деталях и умеют больше, чем просто красиво выглядеть.",
  "INDEPENDENT BY DESIGN. COLLABORATIVE BY NATURE.": "НЕЗАВИСИМЫ ПО ФОРМАТУ. ОТКРЫТЫ К СОТРУДНИЧЕСТВУ.", "MEET YOUR NEW PARTNER": "ДАВАЙТЕ ЗНАКОМИТЬСЯ", "GOOD WORK, BUILT TOGETHER": "ХОРОШАЯ РАБОТА СОЗДАЁТСЯ ВМЕСТЕ", "From first thought": "От первой идеи", "to next chapter": "к следующему этапу",
  "Clear steps. Close collaboration.": "Понятные этапы. Тесное сотрудничество.", "No surprises along the way.": "Без неприятных сюрпризов.", "Discover": "Исследование", "Define": "Планирование", "Design & build": "Дизайн и разработка", "Launch & learn": "Запуск и развитие",
  "We get close to the business, the people and the problem before drawing a single screen.": "Изучаем бизнес, аудиторию и задачу до того, как нарисуем первый экран.", "We turn what we learn into a focused direction, a clear scope and a plan you can trust.": "На основе исследований определяем направление, объём работ и понятный план.", "One close team takes the work from first sketch through the details that make it real.": "Одна команда ведёт проект от первых эскизов до готового продукта.", "We ship with care, share what we’ve learned and help the product keep moving.": "Запускаем продукт, делимся выводами и помогаем ему развиваться дальше.",
  "HAVE A GOOD ONE IN MIND?": "У ВАС ЕСТЬ ИДЕЯ?", "Let’s make": "Давайте создадим", "it matter": "то, что важно", "Tell us a little about what you’re working on. We’ll take it from there.": "Расскажите о своей задаче — мы предложим, с чего начать.", "Name *": "Имя *", "Your name": "Ваше имя", "Company": "Компания", "Your company": "Ваша компания", "Email *": "Электронная почта *", "you@company.com": "you@company.com", "Project type *": "Тип проекта *", "Select one": "Выберите вариант", "Business website": "Сайт для бизнеса", "E-commerce": "Интернет-магазин", "Web application": "Веб-приложение", "Redesign": "Редизайн", "Something else": "Другое", "Budget range": "Бюджет", "Select a range": "Выберите диапазон", "Under $5k": "До $5 тыс.", "$5k–$15k": "$5–15 тыс.", "$15k–$40k": "$15–40 тыс.", "$40k+": "$40 тыс. и выше", "Let’s discuss": "Обсудим", "Tell us about the project *": "Расскажите о проекте *", "What are you looking to make happen?": "Какую задачу нужно решить?", "PREPARE ENQUIRY": "ПОДГОТОВИТЬ ПИСЬМО", "Required fields marked with *. Your details stay in your email app until you choose to send.": "Поля со звёздочкой обязательны. Данные останутся в вашей почте, пока вы сами не отправите письмо.", "BACK TO TOP ↑": "НАВЕРХ ↑", "DIGITAL EXPERIENCES. ENGINEERED TO PERFORM.": "ЦИФРОВЫЕ ПРОДУКТЫ. СОЗДАНЫ ДЛЯ РЕЗУЛЬТАТА.",
};

export function LanguageToggle() {
  const [language, setLanguage] = useState<"en" | "ru">("en");

  function switchLanguage(next: "en" | "ru") {
    if (next === language) return;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node: Node | null;
    while ((node = walker.nextNode())) {
      let value = node.nodeValue;
      if (!value) continue;
      const entries = Object.entries(translations).sort((a, b) => b[0].length - a[0].length);
      for (const [en, ru] of entries) {
        const source = next === "ru" ? en : ru;
        const replacement = next === "ru" ? ru : en;
        if (value.includes(source)) value = value.replaceAll(source, replacement);
      }
      node.nodeValue = value;
    }
    for (const element of document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input[placeholder], textarea[placeholder]")) {
      const value = element.placeholder;
      if (next === "ru") element.placeholder = translations[value] ?? value;
      else element.placeholder = Object.entries(translations).find(([, ru]) => ru === value)?.[0] ?? value;
    }
    document.documentElement.lang = next;
    setLanguage(next);
  }

  return <div className="language-toggle" aria-label="Language"><button type="button" aria-pressed={language === "en"} onClick={() => switchLanguage("en")}>EN</button><span>/</span><button type="button" aria-pressed={language === "ru"} onClick={() => switchLanguage("ru")}>RU</button></div>;
}
