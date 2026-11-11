import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { chromium } from '@playwright/test';
import { portfolioDataText } from '../src/data/portfolioDataText.js';

const baseURL = new URL(process.argv[2] || 'http://127.0.0.1:4173');
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome' });
const widths = [320, 375, 390, 414, 430, 768, 896, 1440];
const url = (path) => new URL(path, baseURL).href;

function watch(page) {
  const errors = [];
  const requests = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('request', (request) => requests.push(request.url()));
  page.on('requestfailed', (request) => {
    if (request.failure()?.errorText !== 'net::ERR_ABORTED') errors.push(`${request.url()}: ${request.failure()?.errorText}`);
  });
  page.on('response', (response) => {
    if (response.status() >= 400) errors.push(`${response.status()}: ${response.url()}`);
  });
  return { errors, requests };
}

async function checkBrowserTint(page, theme) {
  const background = theme === 'dark' ? 'rgb(9, 9, 11)' : 'rgb(255, 255, 255)';
  await page.waitForFunction((color) => getComputedStyle(document.body).backgroundColor === color, background);
  assert.equal(await page.locator('html').evaluate((element) => getComputedStyle(element).backgroundColor), background);
  assert.equal(await page.locator('html').evaluate((element) => getComputedStyle(element).colorScheme), theme);
  assert.equal(await page.locator('meta[name="theme-color"]').getAttribute('content'), theme === 'dark' ? '#09090b' : '#ffffff');
}

async function checkWidths(page, checkTapTargets = false) {
  for (const width of widths) {
    await page.setViewportSize({ width, height: 844 });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Horizontal overflow at ${width}px`);
    if (checkTapTargets) {
      for (const link of await page.locator('a').all()) {
        assert.ok((await link.boundingBox()).height >= 44, `Small tap target at ${width}px: ${await link.innerText()}`);
      }
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
}

try {
  assert.equal(portfolioDataText.experience[0].period, '5 months');
  assert.equal(portfolioDataText.experience[0].current, false);
  assert.match(readFileSync(new URL('../resume/Anthony_Mendoza_Resume.md', import.meta.url), 'utf8'), /Founding Team \| 5 months/);

  const home = await browser.newPage({ viewport: { width: 390, height: 844 } });
  home.setDefaultTimeout(15000);
  const homeTrace = watch(home);
  await home.goto(url('/'), { waitUntil: 'networkidle' });
  assert.ok(await home.getByText('Open to new opportunities', { exact: true }).isVisible());
  await checkBrowserTint(home, 'light');
  assert.equal(await home.locator('#home h1').evaluate((element) => getComputedStyle(element).opacity), '1');
  assert.ok(!homeTrace.requests.some((request) => request.includes('ProjectPage-')));
  await checkWidths(home);
  assert.equal(await home.locator('a[href="/card"]').count(), 0);

  await home.getByRole('button', { name: 'Switch to dark mode' }).click();
  assert.equal(await home.locator('html').getAttribute('data-theme'), null);
  assert.ok(await home.locator('html').evaluate((element) => element.classList.contains('dark')));
  await checkBrowserTint(home, 'dark');
  await home.getByRole('button', { name: 'Switch to light mode' }).click();
  assert.ok(await home.locator('html').evaluate((element) => element.classList.contains('light')));
  await checkBrowserTint(home, 'light');

  await home.locator('a[href="/work/zalio-marketing"]').first().click();
  await home.getByText('Private repository', { exact: true }).waitFor();
  assert.ok(homeTrace.requests.some((request) => request.includes('ProjectPage-')));
  await home.getByRole('link', { name: 'All work', exact: true }).click();
  await home.locator('#work').waitFor();

  for (const project of portfolioDataText.projects) {
    const title = project.name.split(' — ')[0];
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    await home.goto(url(`/work/${slug}`), { waitUntil: 'networkidle' });
    assert.match(await home.locator('h1').innerText(), new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    if (slug === 'zalio-marketing') {
      const preview = home.getByRole('button', { name: 'Show Discover preview', exact: true });
      await preview.click();
      assert.equal(await preview.getAttribute('aria-pressed'), 'true');
    }
  }
  const resume = await home.request.get(url('/Resume.pdf'));
  assert.equal(resume.status(), 200);
  assert.equal((await resume.body()).subarray(0, 5).toString(), '%PDF-');
  assert.deepEqual(homeTrace.errors, []);
  console.log('PASS portfolio: themes, responsive layout, six direct project routes, gallery, navigation, résumé.');
  await home.close();

  for (const theme of ['light', 'dark']) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: theme });
    const page = await context.newPage();
    const trace = watch(page);
    await page.goto(url('/card'), { waitUntil: 'networkidle' });
    assert.equal(await page.locator('html').getAttribute('data-theme'), theme);
    await checkBrowserTint(page, theme);
    assert.equal(await page.locator('body').evaluate((element) => getComputedStyle(element).backgroundImage), 'none');
    assert.equal(await page.locator('header, button, .profile-location, .background-heatmap').count(), 0);
    assert.equal(await page.locator('.project-arrow').count(), 6);
    assert.equal(await page.locator('.socials svg').count(), 7);
    assert.match(await page.locator('.about-copy').innerText(), /five months/);
    assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex, nofollow');
    assert.match(await page.locator('meta[name="viewport"]').getAttribute('content'), /viewport-fit=cover/);
    assert.ok(await page.locator('.identity').isVisible());
    assert.equal(await page.locator('.portrait').evaluate((image) => image.complete && image.naturalWidth > 0), true);
    for (const href of ['sms:+639284785737', 'tel:+639284785737', 'mailto:mendozaony27@gmail.com', 'https://wa.me/639284785737', 'https://www.facebook.com/onyqt', 'https://www.linkedin.com/in/anthony-mendoza-6a4736367', 'https://github.com/hakdogins27', '/Resume.pdf']) {
      assert.ok(await page.locator(`a[href="${href}"]`).count(), `Missing contact: ${href}`);
    }
    await checkWidths(page, true);
    const next = theme === 'dark' ? 'light' : 'dark';
    await page.emulateMedia({ colorScheme: next });
    await page.waitForFunction((value) => document.documentElement.dataset.theme === value, next);
    await checkBrowserTint(page, next);
    assert.ok(trace.requests.every((request) => new URL(request).origin === baseURL.origin), 'Unexpected external card request');
    assert.ok(!trace.requests.some((request) => /\.js(?:\?|$)/.test(request)), 'The static card loaded a JavaScript bundle');
    assert.deepEqual(trace.errors, []);
    await context.close();
    console.log(`PASS card: ${theme} theme, eight widths, 44px tap targets, contacts, system theme changes, no external requests.`);
  }

  const staticContext = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await staticContext.newPage();
  await staticPage.goto(url('/card'));
  assert.ok(await staticPage.locator('h1').isVisible());
  assert.equal(await staticPage.locator('.socials a').count(), 7);
  await staticContext.close();
  console.log('PASS card: content and contact links work with JavaScript disabled.');
  console.log(`Regression passed: ${baseURL.origin}`);
} finally {
  await browser.close();
}
