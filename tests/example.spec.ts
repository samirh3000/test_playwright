import { test, expect } from '@playwright/test';
import { getCaseById } from '../utils/testData';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
test.use({
  locale: 'es-ES',
  timezoneId: 'America/Bogota',
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('TC-01: Login con contraseña incorrecta', async ({ page }) => {
  
  // Ir a Facebook
  await page.goto('https://www.facebook.com/');
  
  // Llenar campos usando los selectores reales
  await page.getByTestId('royal-email').fill('validUser@example.com');
  await page.getByTestId('royal-pass').fill('WrongPassword123!');
  
  // Click en login
  await page.getByTestId('royal-login-button').click();
  
  // Verificar mensaje de error específico
  await expect(page.getByText('El correo electrónico que has introducido no está conectado a una cuenta.')).toBeVisible();
  
});

test("2056 - Test automatizado - Caso 2056", async ({ page }) => {
  const tc = await getCaseById("2056");
  if (!tc?.Active) test.skip();

  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("https://www.facebook.com/");
  await page.getByTestId("royal-email").fill(tc.TestData.user);
  await page.getByTestId("royal-pass").fill(tc.TestData.password);
  await page.getByTestId("royal-login-button").click();
  await expect(page.getByText(tc.TestData.messageError)).toBeVisible();
});