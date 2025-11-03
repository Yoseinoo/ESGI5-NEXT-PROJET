import { test, expect } from "@playwright/test";

test("is accessible", async ({ page }) => {
    await page.goto("/");

    // Expect a title "to contain" a substring.
    await expect(page.locator('h1')).toContainText('Bienvenue');
});
