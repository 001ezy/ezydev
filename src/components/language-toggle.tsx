"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

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
    ["Small team. Full picture", "Небольшая команда. Полный цикл"],
    ["EZY DEV is an independent digital studio partnering with ambitious businesses to make their next digital move count.", "EZY DEV — независимая цифровая студия. Помогаем амбициозным компаниям уверенно делать следующий цифровой шаг."],
    ["HOW WE THINK", "НАШ ПОДХОД"],
    ["HOW WE WORK ↗", "КАК МЫ РАБОТАЕМ ↗"],
    ["Good digital work is ", "Качественные цифровые решения "],
    [" considered in its details, and made to do more than just look the part.", " продуманы в деталях и ценны не только своим внешним видом."],
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
    ["We believe the best digital work is ", "Мы верим, что лучшие цифровые решения "],
    ["clear in its purpose,", "ясны по смыслу,"],
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
    ["DIGITAL EXPERIENCES. ENGINEERED TO PERFORM.", "ЦИФРОВЫЕ ПРОДУКТЫ. СОЗДАНЫ ДЛЯ РЕЗУЛЬТАТА."],
    ["Main navigation", "Главная навигация"],
    ["EZY DEV home", "На главную EZY DEV"],
    ["Language", "Язык"],
    ["START A PROJECT", "НАЧАТЬ ПРОЕКТ"],
    ["EXPLORE OUR WORK", "СМОТРЕТЬ ПРОЕКТЫ"],
    ["A FEW THINGS WE’VE MADE", "НЕКОТОРЫЕ НАШИ ПРОЕКТЫ"],
    ["Selected work", "Избранные проекты"],
    ["Independent concepts.", "Независимые концепции."],
    ["Built to feel like the real thing.", "Продуманы как настоящие продукты."],
    ["A better way to find your place.", "Найдите место, которое вам подходит."],
    ["Made for the hours after.", "Вечер начинается здесь."],
    ["Make room for what’s next.", "Откройте пространство для нового."],
    ["REAL ESTATE / DIGITAL FLAGSHIP", "НЕДВИЖИМОСТЬ / ЦИФРОВОЙ ПРОДУКТ"],
    ["HOSPITALITY / COMMERCE", "РЕСТОРАН / ЭЛЕКТРОННАЯ ТОРГОВЛЯ"],
    ["EDUCATION / PLATFORM", "ОБРАЗОВАНИЕ / ПЛАТФОРМА"],
    ["More considered work, coming into focus.", "Скоро здесь появятся новые проекты."],
    ["Good work starts with understanding what success looks like for you.", "Хороший результат начинается с понимания ваших целей."],
    ["Clear direction, informed by your audience, your market and what the business needs next.", "Понятный вектор на основе вашей аудитории, рынка и задач бизнеса."],
    ["Distinctive digital storefronts that make the value obvious and the next step effortless.", "Выразительные сайты, которые ясно показывают ценность и ведут к действию."],
    ["Useful, thoughtful web applications built around the people who depend on them.", "Продуманные веб-приложения для людей, которые ими пользуются."],
    ["A sharper experience, a stronger foundation and a practical path to what comes after launch.", "Удобный опыт, надёжная основа и понятный план развития после запуска."],
    ["Small team.", "Небольшая команда."],
    ["Full picture", "Полный цикл"],
    ["Digital strategy", "Цифровая стратегия"],
    ["Clear steps. Close collaboration.", "Понятные этапы. Тесное сотрудничество."],
    ["No surprises along the way.", "Без неприятных сюрпризов."],
    ["From first thought", "От первой идеи"],
    ["to next chapter", "к следующему этапу"],
    ["We get close to the business, the people and the problem before drawing a single screen.", "Изучаем бизнес, аудиторию и задачу до того, как нарисуем первый экран."],
    ["We turn what we learn into a focused direction, a clear scope and a plan you can trust.", "На основе исследований определяем направление, объём работ и понятный план."],
    ["One close team takes the work from first sketch through the details that make it real.", "Одна команда ведёт проект от первых эскизов до готового продукта."],
    ["We ship with care, share what we’ve learned and help the product keep moving.", "Запускаем продукт, делимся выводами и помогаем ему развиваться дальше."],
    ["Discover", "Исследование"],
    ["Define", "Планирование"],
    ["Design & build", "Дизайн и разработка"],
    ["Launch & learn", "Запуск и развитие"],
    ["GOOD WORK, BUILT TOGETHER", "ХОРОШАЯ РАБОТА СОЗДАЁТСЯ ВМЕСТЕ"],
    ["INDEPENDENT BY DESIGN. COLLABORATIVE BY NATURE.", "НЕЗАВИСИМЫ ПО ФОРМАТУ. ОТКРЫТЫ К СОТРУДНИЧЕСТВУ."],
    ["MEET YOUR NEW PARTNER", "ДАВАЙТЕ ЗНАКОМИТЬСЯ"],
    ["Explore VERTEX concept project", "Открыть концепт VERTEX"],
    ["Explore NOIR concept project", "Открыть концепт NOIR"],
    ["Explore ORBIT concept project", "Открыть концепт ORBIT"],
    ["Explore MOTION concept project", "Открыть концепт MOTION"],
    ["Explore FORMA concept project", "Открыть концепт FORMA"],
    ["Explore VITALIS concept project", "Открыть концепт VITALIS"],
    ["Explore ATELIER concept project", "Открыть концепт ATELIER"],
    ["Explore ALTERRA concept project", "Открыть концепт ALTERRA"],
    ["Explore ÉLAN concept project", "Открыть концепт ÉLAN"],
    ["Explore NEXUS concept project", "Открыть концепт NEXUS"],
    ["THE FULL COLLECTION", "ВСЕ ПРОЕКТЫ"],
    ["For more", "ЕЩЁ БОЛЬШЕ"],
    ["to explore.", "ИНТЕРЕСНОГО."],
    ["Explore ten concept projects across real estate, hospitality, education and more.", "Смотрите десять концепт-проектов в недвижимости, ресторанах, образовании и других сферах."],
    ["VIEW ALL WORK", "СМОТРЕТЬ ВСЕ РАБОТЫ"],
    ["See all ten concept projects", "Посмотреть все 10 концепт-проектов"],
    ["Ten concepts. More to explore.", "Десять концептов. Есть что посмотреть."],
    ["VIEW PROJECT ↗", "СМОТРЕТЬ ПРОЕКТ ↗"],
    ["LIVE DEMO ↗", "ОТКРЫТЬ ДЕМО ↗"],
    ["REAL ESTATE", "НЕДВИЖИМОСТЬ"], ["HOSPITALITY", "ГОСТЕПРИИМСТВО"],
    ["EDUCATION", "ОБРАЗОВАНИЕ"], ["AUTOMOTIVE", "АВТОСЕРВИС"],
    ["CONSTRUCTION", "СТРОИТЕЛЬСТВО"], ["HEALTHCARE", "МЕДИЦИНА"],
    ["FURNITURE", "МЕБЕЛЬ"], ["BEAUTY & WELLNESS", "КРАСОТА И ЗДОРОВЬЕ"], ["LOGISTICS", "ЛОГИСТИКА"],
    ["A clearer way to find a place to call home.", "Понятный путь к дому, который вам подходит."],
    ["A restaurant experience for the hours after.", "Ресторан, где вечер хочется продлить."],
    ["A learning platform that moves at your pace.", "Обучение в удобном для вас темпе."],
    ["Expert care for every mile ahead.", "Профессиональный уход на каждом километре."],
    ["Architecture shaped around the way you live.", "Архитектура, созданная для вашего образа жизни."],
    ["A more human kind of healthcare.", "Медицина с вниманием к человеку."],
    ["Considered furniture for everyday rituals.", "Продуманная мебель для повседневной жизни."],
    ["A quieter kind of somewhere.", "Место, где можно замедлиться."],
    ["A little space to come back to yourself.", "Место, чтобы вернуться к себе."],
    ["Cross-border delivery with a human touch.", "Международная доставка с человеческим отношением."],
    ["REAL ESTATE / CONCEPT PROJECT", "НЕДВИЖИМОСТЬ / КОНЦЕПТ-ПРОЕКТ"],
    ["HOSPITALITY / CONCEPT PROJECT", "ГОСТЕПРИИМСТВО / КОНЦЕПТ-ПРОЕКТ"],
    ["EDUCATION / CONCEPT PROJECT", "ОБРАЗОВАНИЕ / КОНЦЕПТ-ПРОЕКТ"],
    ["AUTOMOTIVE / CONCEPT PROJECT", "АВТОСЕРВИС / КОНЦЕПТ-ПРОЕКТ"],
    ["CONSTRUCTION / CONCEPT PROJECT", "СТРОИТЕЛЬСТВО / КОНЦЕПТ-ПРОЕКТ"],
    ["HEALTHCARE / CONCEPT PROJECT", "МЕДИЦИНА / КОНЦЕПТ-ПРОЕКТ"],
    ["FURNITURE / CONCEPT PROJECT", "МЕБЕЛЬ / КОНЦЕПТ-ПРОЕКТ"],
    ["BEAUTY / CONCEPT PROJECT", "КРАСОТА / КОНЦЕПТ-ПРОЕКТ"],
    ["LOGISTICS / CONCEPT PROJECT", "ЛОГИСТИКА / КОНЦЕПТ-ПРОЕКТ"],
    ["Find your place, with more clarity.", "Найдите подходящую квартиру — просто и понятно."],
    ["A concept sales experience for a residential development. Explore available homes, compare layouts and understand the numbers before booking a consultation.", "Концепция сайта жилого комплекса: смотрите доступные квартиры, сравнивайте планировки и оценивайте стоимость до консультации."],
    ["A little more atmosphere, all the way through.", "Атмосфера уютного вечера — от меню до бронирования."],
    ["A restaurant concept that carries the feeling of an evening from the menu to the table. Browse dishes, build a demo basket and explore reservations.", "Концепция ресторана, которая передаёт настроение вечера от меню до столика. Выбирайте блюда, соберите корзину и попробуйте оформить бронь."],
    ["A learning platform concept designed to turn curiosity into progress, with a clear path from course discovery to completed lessons.", "Концепция учебной платформы с понятным путём от выбора курса до завершённых уроков."],
    ["A service studio concept for thoughtful automotive care, clear estimates and simple appointment requests.", "Концепция автосервиса с понятным расчётом стоимости и простой записью на обслуживание."],
    ["An architecture and construction studio concept with selected projects, type filters and an early-stage build estimate.", "Концепция архитектурной студии с каталогом проектов, фильтрами и предварительным расчётом строительства."],
    ["A healthcare concept that helps visitors explore specialists and request a demonstration visit without sharing medical information.", "Концепция медицинского центра: выбор специалиста и запрос на визит без передачи медицинских данных."],
    ["A considered furniture shop concept with a filterable collection, product details, favorites and a demonstration basket.", "Концепция магазина мебели с фильтрами, карточками товаров, избранным и демонстрационной корзиной."],
    ["A mountain retreat concept with room filters, date selection, guest capacity checks and an indicative stay estimate.", "Концепция горного отеля с фильтрами номеров, выбором дат, проверкой вместимости и расчётом проживания."],
    ["A beauty and wellness studio concept with service selection, artist choices, date and time selection and a demo appointment request.", "Концепция студии красоты и wellness: выбор услуги, специалиста, даты и времени для демонстрационной записи."],
    ["A regional logistics concept with route, parcel and service estimates plus demonstration shipment tracking.", "Концепция региональной логистики с расчётом маршрута, посылки и тарифа, а также демо-отслеживанием."],
    ["Find your place, with more clarity.", "Найдите подходящую квартиру — просто и понятно."],
    ["A little more atmosphere, all the way through.", "Атмосфера уютного вечера — от меню до бронирования."],
    ["Care for the drive.", "Забота о вашем автомобиле."],
    ["Built with intention.", "Создано с продуманным подходом."],
    ["Care that sees you.", "Забота с вниманием к вам."],
    ["Make room for living.", "Пространство для жизни."],
    ["Find your elsewhere.", "Найдите место для отдыха."],
    ["Come back to yourself.", "Вернитесь к себе."],
    ["Closer, by design.", "Ближе — благодаря продуманной логистике."],
    ["Interactive apartment selection", "Интерактивный выбор квартиры"], ["Floor and room filters", "Фильтры по этажу и комнатам"], ["Floor plans and home cards", "Планировки и карточки квартир"], ["Price estimate calculator", "Калькулятор стоимости"],
    ["Filterable menu", "Меню с фильтрами"], ["Working demo basket", "Рабочая демо-корзина"], ["Quantity controls", "Изменение количества"], ["Table reservation interface", "Форма бронирования столика"],
    ["Course catalogue", "Каталог курсов"], ["Lesson experience", "Интерфейс урока"], ["Knowledge checks", "Проверка знаний"], ["Progress tracking", "Отслеживание прогресса"],
    ["Choose make and model", "Выбор марки и модели"], ["Service catalogue", "Каталог услуг"], ["Live estimate calculator", "Калькулятор стоимости"], ["Demo booking flow", "Демо-запись на услугу"],
    ["Filterable project catalogue", "Каталог проектов с фильтрами"], ["Residential and commercial work", "Жилые и коммерческие проекты"], ["Area and finish calculator", "Расчёт площади и отделки"], ["Demo quote request", "Демо-запрос расчёта"],
    ["Specialty filters", "Фильтры по специализации"], ["Specialist profiles", "Профили специалистов"], ["Available time selection", "Выбор свободного времени"], ["Demo visit request", "Демо-запрос на визит"],
    ["Filterable furniture collection", "Каталог мебели с фильтрами"], ["Product detail view", "Карточка товара"], ["Favorites", "Избранное"], ["Demo checkout", "Демо-оформление заказа"],
    ["Room catalogue", "Каталог номеров"], ["Stay-type and guest filters", "Фильтры по типу проживания и гостям"], ["Nightly price calculator", "Расчёт стоимости проживания"], ["Artist selection", "Выбор специалиста"], ["Date and time selection", "Выбор даты и времени"], ["Demo appointment", "Демо-запись"],
    ["Route calculator", "Калькулятор маршрута"], ["Weight and service-level pricing", "Расчёт по весу и тарифу"], ["Sample tracking timeline", "Пример отслеживания отправления"], ["Choose what you have in mind", "Расскажите, что вы задумали"]
]);

const translationEntries = Object.entries(translations);

type Language = "en" | "ru";

function readSavedLanguage(): Language {
  try {
    if (localStorage.getItem("ezydev-language") === "ru") return "ru";
  } catch {
    // Cookie fallback supports browsers that restrict local storage.
  }
  const cookie = document.cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith("ezydev-language="));
  return cookie?.split("=")[1] === "ru" ? "ru" : "en";
}

function syncInternalLinks(language: Language, root: Element = document.body) {
  const anchors: HTMLAnchorElement[] = [
    ...(root instanceof HTMLAnchorElement ? [root] : []),
    ...root.querySelectorAll<HTMLAnchorElement>("a[href]"),
  ];
  for (const anchor of anchors) {
    const destination = new URL(anchor.href, window.location.href);
    if (destination.origin !== window.location.origin || !(destination.pathname === "/ezydev" || destination.pathname.startsWith("/ezydev/"))) continue;
    if (language === "ru") destination.searchParams.set("lang", "ru");
    else destination.searchParams.delete("lang");
    anchor.href = destination.toString();
  }
}

function syncLanguageUrl(language: Language) {
  const current = new URL(window.location.href);
  if (language === "ru") current.searchParams.set("lang", "ru");
  else current.searchParams.delete("lang");
  window.history.replaceState(window.history.state, "", `${current.pathname}${current.search}${current.hash}`);
}

function saveLanguage(language: Language) {
  try {
    localStorage.setItem("ezydev-language", language);
  } catch {
    // The first-party cookie below is the fallback.
  }
  try {
    document.cookie = `ezydev-language=${language}; Path=/ezydev; Max-Age=31536000; SameSite=Lax; Secure`;
  } catch {
    // Language still applies for the current page if persistent storage is blocked.
  }
}

function translateValue(value: string, language: Language) {
  let translated = value;
  const entries = [...translationEntries].sort((a, b) =>
    language === "ru" ? b[0].length - a[0].length : b[1].length - a[1].length
  );
  for (const [english, russian] of entries) {
    const source = language === "ru" ? english : russian;
    const replacement = language === "ru" ? russian : english;
    if (source && translated.includes(source)) translated = translated.replaceAll(source, replacement);
  }
  return translated;
}

function translateElement(element: Element, language: Language) {
  const elements = [element, ...element.querySelectorAll("[aria-label], [title], [placeholder]")];
  for (const target of elements) {
    for (const attribute of ["aria-label", "title", "placeholder"]) {
      const value = target.getAttribute(attribute);
      if (value) target.setAttribute(attribute, translateValue(value, language));
    }
  }
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    if (node.nodeValue) node.nodeValue = translateValue(node.nodeValue, language);
  }
}

export function LanguageToggle() {
  const [language, setLanguage] = useState<Language>("en");
  const pathname = usePathname();

  useEffect(() => {
    const urlLanguage = new URLSearchParams(window.location.search).get("lang");
    const savedLanguage: Language = urlLanguage === "ru" ? "ru" : urlLanguage === "en" ? "en" : readSavedLanguage();
    if (savedLanguage !== language) window.setTimeout(() => setLanguage(savedLanguage), 0);
    document.documentElement.lang = savedLanguage;
    if (savedLanguage === "ru") syncLanguageUrl("ru");
    translateElement(document.body, savedLanguage);
    syncInternalLinks(savedLanguage);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const added of mutation.addedNodes) {
          if (added instanceof Element) {
            translateElement(added, savedLanguage);
            syncInternalLinks(savedLanguage, added);
          } else if (added.nodeType === Node.TEXT_NODE && added.nodeValue) {
            added.nodeValue = translateValue(added.nodeValue, savedLanguage);
          }
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    const preserveLanguageOnLink = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;
      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin || !(destination.pathname === "/ezydev" || destination.pathname.startsWith("/ezydev/"))) return;
      if (document.documentElement.lang === "ru") destination.searchParams.set("lang", "ru");
      else destination.searchParams.delete("lang");
      anchor.href = destination.toString();
    };
    document.addEventListener("click", preserveLanguageOnLink, true);
    return () => {
      observer.disconnect();
      document.removeEventListener("click", preserveLanguageOnLink, true);
    };
  }, [pathname, language]);

  function switchLanguage(next: Language) {
    if (next === language) return;
    translateElement(document.body, next);
    document.documentElement.lang = next;
    saveLanguage(next);
    syncLanguageUrl(next);
    syncInternalLinks(next);
    setLanguage(next);
  }

  return <div className="language-toggle" aria-label="Language"><button type="button" aria-pressed={language === "en"} onClick={() => switchLanguage("en")}>EN</button><span>/</span><button type="button" aria-pressed={language === "ru"} onClick={() => switchLanguage("ru")}>RU</button></div>;
}
