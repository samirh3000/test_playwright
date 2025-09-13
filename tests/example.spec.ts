import { test, expect } from '@playwright/test';

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
test.describe('Navegación Seguros Bolívar', () => {
  test('TC-02: Navegación completa hasta Pagos en línea', async ({ page, context }) => {
    
    // Configurar navegador maximizado
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    console.log('🚀 Iniciando navegación en Seguros Bolívar...');
    
    // Paso 1: Ir a https://www.segurosbolivar.com/
    await page.goto('https://www.segurosbolivar.com/');
    await expect(page).toHaveTitle('Seguros para carros, salud, vida y hogar | Seguros Bolívar');
    console.log('✅ Página principal cargada');
    
    // Paso 2: Click en "Empresas"
    await page.getByRole('tab', { name: 'Empresas' }).locator('a').click();
    await expect(page).toHaveURL(/.*empresas/);
    await expect(page).toHaveTitle('Seguros para empresas, de cumplimiento, empleados y más | Seguros Bolívar');
    console.log('✅ Sección Empresas cargada');
    
    // Paso 3: Click en "Productos"
    await page.getByRole('button', { name: 'Productos ', exact: true }).click();
    
    // Esperar a que aparezca el menú desplegado
    await page.waitForSelector('text=A favor de entidades estatales', { state: 'visible' });
    console.log('✅ Menú Productos desplegado');
    
    // Paso 4: Click en "A favor de entidades estatales"
    await page.getByText('A favor de entidades estatales').click();
    await expect(page).toHaveURL(/.*a-favor-entidades-estatales/);
    await expect(page).toHaveTitle('Seguro de cumplimiento a favor de Entidad Estatal | Seguros Bolívar');
    console.log('✅ Página A favor de entidades estatales cargada');
    
    // Paso 5: Click en "Pagar en línea"
    await page.getByRole('link', { name: 'Pagar en línea' }).click();
    
    // Esperar a que aparezca la nueva tab
    await page.waitForTimeout(2000);
    
    // Paso 6: Cambiar a la nueva tab
    const pages = context.pages();
    const newTab = pages[pages.length - 1]; // Obtener la tab más reciente
    
    // Paso 7: Validar el título en la nueva tab
    await expect(newTab).toHaveTitle('Pagos en linea');
    
    // Validar que contiene el texto específico esperado
    await expect(newTab.getByRole('heading', { name: '¡Bienvenido a Pagos en línea!' })).toBeVisible();
    
    console.log('✅ Nueva tab abierta y título validado: "¡Bienvenido a Pagos en línea!"');
    
    // Verificación adicional: validar URL de la nueva tab
    expect(newTab.url()).toContain('recaudos.segurosbolivar.com');
    
    console.log('🎯 Test completado exitosamente!');
    
    // Tomar screenshot de evidencia
    await newTab.screenshot({ 
      path: 'screenshots/pagos-en-linea-final.png',
      fullPage: true 
    });
    
    console.log('📸 Screenshot guardado como evidencia');
  });
  
  // Configuración del test
  test.beforeEach(async () => {
    // Crear directorio de screenshots si no existe
    const fs = require('fs');
    if (!fs.existsSync('screenshots')) {
      fs.mkdirSync('screenshots');
    }
  });
});

test('Navegación a Pagos en línea - Seguros Bolívar', async ({ page, context }) => {
  
  // Configurar navegador maximizado
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  // 1. Ingresar a https://www.segurosbolivar.com/
  await page.goto('https://www.segurosbolivar.com/');
  
  // 2. Click en empresas
  await page.getByRole('tab', { name: 'Empresas' }).locator('a').click();
  
  // 3. Click en productos
  await page.getByRole('button', { name: 'Productos ' }).click();
  
  // 4. Click a favor de entidades estatales
  await page.waitForSelector('text=A favor de entidades estatales', { state: 'visible' });
  await page.getByText('A favor de entidades estatales').click();
  
  // 5. Click en pagar en línea
  await page.getByRole('link', { name: 'Pagar en línea' }).click();
  
  // 6. Cambiar a la nueva tab y validar el título
  await page.waitForTimeout(3000); // Esperar que se abra la nueva tab
  
  const pages = context.pages();
  const newTab = pages[pages.length - 1]; // Obtener la última tab abierta
  
  // Validar el título ¡Bienvenido a Pagos en línea!
  await expect(newTab.getByRole('heading', { name: '¡Bienvenido a Pagos en línea!' })).toBeVisible();
  
  console.log('✅ Test completado: Título validado exitosamente');
});
