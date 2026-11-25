import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [form, languages, css] = await Promise.all([
  readFile("src/components/contact-form.tsx", "utf8"),
  readFile("src/components/language-toggle.tsx", "utf8"),
  readFile("src/app/globals.css", "utf8"),
]);

assert.match(form, /name="package"/);
assert.match(form, /EZY START · \$100 · one-page website/);
assert.match(form, /Extra pages · priced separately/);
assert.match(form, /Custom features · priced separately/);
assert.match(form, /Integrations · priced separately/);
assert.match(form, /Domain, hosting or maintenance · priced separately/);
assert.match(form, /Not sure yet — help me scope it/);
assert.match(form, /Package or add-ons: \$\{data\.get\("package"\)/);
assert.match(form, /window\.location\.href = `mailto:/);
assert.doesNotMatch(form, /Under \$5k|\$5k–\$15k|\$15k–\$40k|\$40k\+/);

for (const [english, russian] of [
  ["Package or add-ons", "Пакет или дополнения"],
  ["EZY START · $100 · one-page website", "EZY START · $100 · одностраничный сайт"],
  ["Extra pages · priced separately", "Дополнительные страницы · цена отдельно"],
  ["Custom features · priced separately", "Индивидуальные функции · цена отдельно"],
  ["Integrations · priced separately", "Интеграции · цена отдельно"],
  ["Domain, hosting or maintenance · priced separately", "Домен, хостинг или поддержка · цена отдельно"],
  ["Not sure yet — help me scope it", "Пока не знаю — помогите определить объём"],
]) {
  assert.ok(languages.includes(`["${english}", "${russian}"]`), `RU/EN translation exists for ${english}`);
}

assert.match(languages, /EZY START — адаптивный одностраничный сайт за \$100\./);
assert.match(css, /@media\(max-width:390px\)/);
assert.match(css, /\.form-pair\{grid-template-columns:1fr\}/);
assert.match(css, /\.contact-form input,\.contact-form select\{min-height:44px\}/);
assert.match(css, /html\{scroll-padding-top:116px\}/);
assert.match(css, /\.site-header \.main-nav a\{flex:none;white-space:nowrap;border-color:/);
assert.match(css, /\.contact-standalone \.contact-intro>\.eyebrow\{display:block\}/);
assert.match(css, /\.contact-standalone \.contact-intro>\.contact-email\{display:block;width:fit-content;margin-top:16px\}/);
console.log("PASS public contact package: USD 100 EZY START, separately priced add-ons, RU/EN labels, mobile stacking and user-controlled email handoff");
