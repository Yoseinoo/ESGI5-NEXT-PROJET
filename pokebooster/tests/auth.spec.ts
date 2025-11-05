import { test, expect } from "@playwright/test";

test.describe("Authentification", () => {
    test("Doit pouvoir s'authentifier avec des credentials valides", async ({
        page,
    }) => {
        await page.goto("/login");

        await page.fill('input[name="email"]', "test@test.fr");
        await page.fill('input[name="password"]', "test");

        page.click('button[type="submit"]');

        await expect(page).toHaveURL("/");
    });

    test("Doit afficher un message d'erreur pour des credentials invalides", async ({
        page,
    }) => {
        await page.goto("/login");

        await page.fill('input[name="email"]', "wrong@example.com");
        await page.fill('input[name="password"]', "wrongpass");

        await page.click('button[type="submit"]');

        const error = page.locator("p.text-red-500");
        await expect(error).toBeVisible();
        await expect(error).toContainText(/invalid|incorrect|error/i);
    });

    test("Doit pouvoir se déconnecter", async ({ page }) => {
        await page.goto("/login");
        await page.fill('input[name="email"]', "test@test.fr");
        await page.fill('input[name="password"]', "test");
        await page.click('button[type="submit"]');

        await page.goto("/");

        const logoutButton = page.locator("#btn-logout");
        await expect(logoutButton).toBeVisible();

        await logoutButton.click();

        await expect(page.locator("#btn-login")).toBeVisible({
            timeout: 15000,
        });
    });
});
