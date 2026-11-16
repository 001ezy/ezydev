"use client";

import { useEffect, useState } from "react";

const translations: Record<string, string> = Object.fromEntries([
    ["WHAT WE DO", "ЧЕМ МЫ ЗАНИМАЕМСЯ"],
    ["Built around your next move", "Создаём основу для вашего следующего шага"],
    ["From the first useful question to the final detail before launch, we bring strategy, design and engineering together.", "От первого важного вопроса до финальной детали перед запуском — объединяем стратегию, дизайн и разработку."],
    ["Strategy & direction", "Стратегия и направление"],
    ["Find the right problem, the clearest story and the most useful next move.", "Находим верную задачу, ясную историю и полезный следующий шаг."],
    ["Discovery · Positioning · Product strategy · Content structure", "Исследование · Позиционирование · Продуктовая стратегия · Структура контента"],
    ["Websites & commerce", "Сайты и электронная торговля"],
    ["A distinctive digital home that makes your value clear and action effortless.", "Выразительный цифровой образ, который ясно показывает вашу ценность и ведёт к действию."],
    ["Business websites · Landing pages · E-commerce · Real estate", "Сайты компаний · Лендинги · Интернет-магазины · Недвижимость"],
    ["Useful web applications shaped around the people who rely on them.", "Полезные веб-приложения, созданные для людей, которые ими пользуются."],
    ["Product design · UX/UI · Prototyping · Web applications", "Продуктовый дизайн · UX/UI · Прототипы · Веб-приложения"],
    ["Redesign & growth", "Редизайн и развитие"],
    ["Make an existing experience easier to use, easier to manage and ready for what comes next.", "Сделаем ваш продукт удобнее для клиентов и команды и подготовим его к дальнейшему росту."],
    ["Experience audit · Redesign · Performance · Ongoing improvement", "Аудит опыта · Редизайн · Производительность · Постоянное улучшение"],
    ["READY WHEN YOU ARE", "КОГДА БУДЕТЕ ГОТОВЫ"],
    ["Let’s make something useful", "Давайте создадим что-то полезное"],
    ["START A PROJECT", "НАЧАТЬ ПРОЕКТ"],
    ["SELECTED WORK / CONCEPTS", "ИЗБРАННЫЕ РАБОТЫ / КОНЦЕПТЫ"],
    ["Ideas made tangible", "Идеи, воплощённые в цифровых продуктах"],
    ["Independent concept projects. Each one explores how a thoughtful digital product can make a business experience clearer and more useful.", "Самостоятельные концепт-проекты. Каждый показывает, как продуманный цифровой продукт делает взаимодействие с бизнесом понятнее и удобнее."],
    ["THE IDEA", "ИДЕЯ"],
    ["BUILD SOMETHING LIKE THIS ↗", "СОЗДАТЬ ПОХОЖИЙ ПРОДУКТ ↗"],
    ["INDEPENDENT DIGITAL STUDIO / GLOBAL", "НЕЗАВИСИМАЯ DIGITAL-СТУДИЯ / ВЕСЬ МИР"],
    ["Small team. Full picture.", "Небольшая команда. Полный цикл."],
    ["EZY DEV is an independent digital studio partnering with ambitious businesses to make their next digital move count.", "EZY DEV — независимая цифровая студия. Помогаем амбициозным компаниям уверенно делать следующий цифровой шаг."],
    ["HOW WE THINK", "НАШ ПОДХОД"],
    ["Good digital work is ", "Хороший цифровой продукт "],
    [" considered in its details, and made to do more than just look the part.", " продуман в деталях и умеет больше, чем просто хорошо выглядеть."],
    ["A CLOSE, SENIOR TEAM", "ОПЫТНАЯ КОМАНДА"],
    ["Thoughtful by design. Practical by nature.", "Продуманный дизайн. Практичный подход."],
    ["MEET US ON YOUR PROJECT ↗", "ПОЗНАКОМИМСЯ НА ВАШЕМ ПРОЕКТЕ ↗"],
    ["A CLEAR WAY FORWARD", "ПОНЯТНЫЙ ПУТЬ ВПЕРЁД"],
    ["Good work, built together", "Хорошая работа создаётся вместе"],
    ["A collaborative process with clear decisions at every stage. You know what we’re solving, what’s next and why it matters.", "Совместная работа с понятными решениями на каждом этапе. Вы знаете, что мы решаем, что дальше и почему это важно."],
    ["Understand the business, people and problem before we draw a screen.", "Изучаем бизнес, людей и задачу до того, как нарисуем экран."],
    ["Agree on a direction, scope, priorities and a practical plan.", "Согласуем направление, объём, приоритеты и практичный план."],
    ["Shape, prototype and engineer the experience with one close team.", "Создаём концепцию, прототип и продукт одной командой."],
    ["Ship with care, learn from real use and keep improving.", "Бережно запускаем, изучаем реальное использование и улучшаем продукт."],
    ["YOUR TURN", "ВАШ ХОД"],
    ["What are you looking to make happen?", "Чего вы хотите достичь?"],
    ["TELL US ABOUT IT ↗", "РАССКАЖИТЕ НАМ ↗"],
    ["Tell us what you have in mind. Share as much or as little as you like; we’ll take it from there.", "Расскажите о своей задумке. Поделитесь тем, чем готовы, — мы поможем с дальнейшими шагами."],
    ["PROJECT ENQUIRIES", "ЗАПРОСЫ ПО ПРОЕКТАМ"],
    ["PRIVACY", "КОНФИДЕНЦИАЛЬНОСТЬ"],
    ["Your information stays yours", "Ваши данные остаются вашими"],
    ["Last updated: November 2026", "Обновлено: ноябрь 2026"],
    ["Contact form", "Форма связи"],
    ["This website does not send or store information entered in the project enquiry form. When you submit it, your device opens your email application and prepares a message addressed to mr.eshmambetov@gmail.com. You choose whether to send it.", "Сайт не отправляет и не сохраняет сведения, введённые в форму. При отправке устройство открывает почтовое приложение и готовит письмо для mr.eshmambetov@gmail.com. Решение отправлять письмо остаётся за вами."],
    ["Hosting and analytics", "Хостинг и аналитика"],
    ["The site is hosted by GitHub Pages. GitHub may process basic technical information required to deliver and secure the site. This project does not intentionally use advertising cookies or analytics trackers.", "Сайт размещён на GitHub Pages. GitHub может обрабатывать базовые технические данные, необходимые для работы и защиты сайта. Проект не использует рекламные cookies и системы аналитического отслеживания."],
    ["Questions", "Вопросы"],
    ["For questions about privacy or a message you sent, contact ", "По вопросам конфиденциальности или отправленного вами письма свяжитесь с нами: "],
    ["Work", "Работы"],
    ["Services", "Услуги"],
    ["Studio", "Студия"],
    ["Process", "Процесс"],
    ["Privacy", "Конфиденциальность"],
    ["Explore VERTEX concept project", "Открыть концепт VERTEX"],
    ["Explore NOIR concept project", "Открыть концепт NOIR"],
    ["Explore ORBIT concept project", "Открыть концепт ORBIT"],
    ["Let’s talk", "Обсудим проект"],
    ["INDEPENDENT DIGITAL STUDIO", "НЕЗАВИСИМАЯ DIGITAL-СТУДИЯ"],
    ["GLOBAL / EST. 2024", "МИРОВОЙ РЫНОК / С 2024"],
    ["WE BUILD", "МЫ СОЗДАЁМ"],
    ["DIGITAL EXPERIENCES", "ЦИФРОВЫЕ ПРОДУКТЫ"],
    ["THAT MOVE BUSINESS", "КОТОРЫЕ ДВИГАЮТ БИЗНЕС"],
    ["FORWARD", "ВПЕРЁД"],
    ["Digital experiences.", "Цифровые продукты."],
    ["Engineered to perform.", "Созданные для результата."],
    ["EXPLORE OUR WORK", "НАШИ РАБОТЫ"],
    ["STRATEGY — DESIGN — ENGINEERING", "СТРАТЕГИЯ — ДИЗАЙН — РАЗРАБОТКА"],
    ["A FEW THINGS WE’VE MADE", "НЕКОТОРЫЕ НАШИ ПРОЕКТЫ"],
    ["Selected work", "Избранные проекты"],
    ["Independent concepts.", "Независимые концепции."],
    ["Built to feel like the real thing.", "Продуманы как настоящие продукты."],
    ["CONCEPT", "КОНЦЕПТ"],
    ["PROJECT", "ПРОЕКТ"],
    ["A better way to find your place.", "Найдите место, которое вам подходит."],
    ["Made for the hours after.", "Вечер начинается здесь."],
    ["Make room for what’s next.", "Откройте пространство для нового."],
    ["REAL ESTATE / DIGITAL FLAGSHIP", "НЕДВИЖИМОСТЬ / ЦИФРОВОЙ ПРОДУКТ"],
    ["HOSPITALITY / COMMERCE", "РЕСТОРАН / ЭЛЕКТРОННАЯ ТОРГОВЛЯ"],
    ["EDUCATION / PLATFORM", "ОБРАЗОВАНИЕ / ПЛАТФОРМА"],
    ["More considered work, coming into focus.", "Скоро здесь появятся новые проекты."],
    ["HAVE SOMETHING IN MIND?", "ЕСТЬ ИДЕЯ?"],
    ["WHAT WE BRING TO THE TABLE", "ЧЕМ МЫ МОЖЕМ ПОМОЧЬ"],
    ["Small team.", "Небольшая команда."],
    ["Full picture", "Полный цикл"],
    ["Good work starts with understanding what success looks like for you.", "Хороший результат начинается с понимания ваших целей."],
    ["Digital strategy", "Цифровая стратегия"],
    ["Digital products", "Цифровые продукты"],
    ["Clear direction, informed by your audience, your market and what the business needs next.", "Понятный вектор на основе вашей аудитории, рынка и задач бизнеса."],
    ["Distinctive digital storefronts that make the value obvious and the next step effortless.", "Выразительные сайты, которые ясно показывают ценность и ведут к действию."],
    ["Useful, thoughtful web applications built around the people who depend on them.", "Продуманные веб-приложения для людей, которые ими пользуются."],
    ["A sharper experience, a stronger foundation and a practical path to what comes after launch.", "Удобный опыт, надёжная основа и понятный план развития после запуска."],
    ["A LITTLE ABOUT US", "НЕМНОГО О НАС"],
    ["We believe the best digital work is ", "Мы верим, что лучшие цифровые продукты "],
    ["clear in its purpose,", "понятны своей целью,"],
    ["INDEPENDENT BY DESIGN. COLLABORATIVE BY NATURE.", "НЕЗАВИСИМЫ ПО ФОРМАТУ. ОТКРЫТЫ К СОТРУДНИЧЕСТВУ."],
    ["MEET YOUR NEW PARTNER", "ДАВАЙТЕ ЗНАКОМИТЬСЯ"],
    ["GOOD WORK, BUILT TOGETHER", "ХОРОШАЯ РАБОТА СОЗДАЁТСЯ ВМЕСТЕ"],
    ["From first thought", "От первой идеи"],
    ["to next chapter", "к следующему этапу"],
    ["Clear steps. Close collaboration.", "Понятные этапы. Тесное сотрудничество."],
    ["No surprises along the way.", "Без неприятных сюрпризов."],
    ["Discover", "Исследование"],
    ["Define", "Планирование"],
    ["Design & build", "Дизайн и разработка"],
    ["Launch & learn", "Запуск и развитие"],
    ["We get close to the business, the people and the problem before drawing a single screen.", "Изучаем бизнес, аудиторию и задачу до того, как нарисуем первый экран."],
    ["We turn what we learn into a focused direction, a clear scope and a plan you can trust.", "На основе исследований определяем направление, объём работ и понятный план."],
    ["One close team takes the work from first sketch through the details that make it real.", "Одна команда ведёт проект от первых эскизов до готового продукта."],
    ["We ship with care, share what we’ve learned and help the product keep moving.", "Запускаем продукт, делимся выводами и помогаем ему развиваться дальше."],
    ["HAVE A GOOD ONE IN MIND?", "У ВАС ЕСТЬ ИДЕЯ?"],
    ["Let’s make", "Давайте создадим"],
    ["it matter", "то, что важно"],
    ["Tell us a little about what you’re working on. We’ll take it from there.", "Расскажите о своей задаче — мы предложим, с чего начать."],
    ["Name", "Имя"],
    ["Name *", "Имя *"],
    ["Your name", "Ваше имя"],
    ["Company", "Компания"],
    ["Your company", "Ваша компания"],
    ["Email", "Электронная почта"],
    ["Email *", "Электронная почта *"],
    ["you@company.com", "you@company.com"],
    ["Project type", "Тип проекта"],
    ["Project type *", "Тип проекта *"],
    ["Select one", "Выберите вариант"],
    ["Business website", "Сайт для бизнеса"],
    ["E-commerce", "Интернет-магазин"],
    ["Web application", "Веб-приложение"],
    ["Redesign", "Редизайн"],
    ["Something else", "Другое"],
    ["Budget range", "Бюджет"],
    ["Select a range", "Выберите диапазон"],
    ["Under $5k", "До $5 тыс."],
    ["$5k–$15k", "$5–15 тыс."],
    ["$15k–$40k", "$15–40 тыс."],
    ["$40k+", "$40 тыс. и выше"],
    ["Let’s discuss", "Обсудим"],
    ["Tell us about the project", "Расскажите о проекте"],
    ["Tell us about the project *", "Расскажите о проекте *"],
    ["PREPARE ENQUIRY", "ПОДГОТОВИТЬ ПИСЬМО"],
    ["Required fields marked with *. Your details stay in your email app until you choose to send.", "Поля со звёздочкой обязательны. Данные останутся в вашей почте, пока вы сами не отправите письмо."],
    ["BACK TO TOP ↑", "НАВЕРХ ↑"],
    ["DIGITAL EXPERIENCES. ENGINEERED TO PERFORM.", "ЦИФРОВЫЕ ПРОДУКТЫ. СОЗДАНЫ ДЛЯ РЕЗУЛЬТАТА."]
]);

export function LanguageToggle() {
  const [language, setLanguage] = useState<"en" | "ru">("en");

  useEffect(() => {
    if (localStorage.getItem("ezydev-language") === "ru") {
      const button = document.querySelector<HTMLButtonElement>(".language-toggle button:last-child");
      button?.click();
    }
  }, []);

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
    localStorage.setItem("ezydev-language", next);
    setLanguage(next);
  }

  return <div className="language-toggle" aria-label="Language"><button type="button" aria-pressed={language === "en"} onClick={() => switchLanguage("en")}>EN</button><span>/</span><button type="button" aria-pressed={language === "ru"} onClick={() => switchLanguage("ru")}>RU</button></div>;
}
