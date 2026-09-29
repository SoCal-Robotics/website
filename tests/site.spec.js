import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const routes = ['/', '/programs/', '/programs/apply/', '/get-involved/', '/about/', '/donate/', '/stories/team-apex/', '/privacy/', '/404.html'];
for (const width of [1440, 390, 320]) {
  test(`pages have no accessibility violations or overflow at ${width}px`, async ({page}) => {
    await page.setViewportSize({width,height:900});
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator('h1')).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
      expect(results.violations, `${route} at ${width}: ${JSON.stringify(results.violations.map(v => ({id:v.id, nodes:v.nodes.map(n=>n.target)})))}`).toEqual([]);
    }
  });
}
test('mobile navigation supports keyboard, escape, links, and resize', async ({page}) => {
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');
  const toggle = page.getByRole('button',{name:'Menu'});
  const nav = page.getByRole('navigation',{name:'Main navigation'});
  await expect(nav).toBeHidden();
  await toggle.focus(); await page.keyboard.press('Enter');
  await expect(nav).toBeVisible(); await expect(toggle).toHaveAttribute('aria-expanded','true');
  await page.keyboard.press('Tab'); await expect(nav.getByRole('link',{name:'Programs',exact:true})).toBeFocused();
  await page.keyboard.press('Escape'); await expect(nav).toBeHidden(); await expect(toggle).toBeFocused();
  await toggle.click(); await nav.getByRole('link',{name:'Get Updates'}).click();
  await expect(nav).toBeHidden(); await expect(page.locator('#updates')).toBeFocused();
  await page.setViewportSize({width:1440,height:900}); await expect(nav).toBeVisible(); await expect(toggle).toBeHidden();
});
test('navigation remains usable without JavaScript', async ({browser}) => {
  const context = await browser.newContext({javaScriptEnabled:false, viewport:{width:390,height:844}});
  const page=await context.newPage(); await page.goto('http://127.0.0.1:8080/');
  await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Programs',exact:true}).click();
  await expect(page).toHaveURL(/\/programs\/$/); await context.close();
});
test('active story and interim donation action resolve', async ({page}) => {
  await page.goto('/programs/'); await page.getByRole('link',{name:'Meet Team APEX'}).click();
  await expect(page).toHaveURL(/\/stories\/team-apex\/$/);
  await page.goto('/donate/'); await expect(page.getByRole('link',{name:'Ask how to donate'})).toHaveAttribute('href',/^mailto:socalrobotics@gmail.com/);
});
