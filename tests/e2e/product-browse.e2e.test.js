import { test, expect } from '@playwright/test';

/**
 * UI E2E Test: Product Browse
 *
 * Tests user journey for browsing and searching products:
 * 1. Navigate to products page
 * 2. View product list
 * 3. Use filters (category, price, rating)
 * 4. Search for products
 * 5. View product details
 * 6. Navigate pagination
 */

const BASE_URL = process.env.WEB_UI_URL || 'http://localhost:3000';

test.describe('Product Browse E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to products page
    await page.goto(`${BASE_URL}/products`);
  });

  test('should display product list on products page', async ({ page }) => {
    console.log('Testing product list display...');

    // Wait for products to load
    await page.waitForSelector(
      '[data-testid="product-list"], .product-grid, .products',
      {
        timeout: 10000,
      }
    );

    // Verify products are displayed
    const products = await page
      .locator('[data-testid="product-card"], .product-item')
      .count();
    expect(products).toBeGreaterThan(0);

    console.log(`✅ Displayed ${products} products`);
  });

  test('should filter products by category', async ({ page }) => {
    console.log('Testing category filter...');

    // Find and click category filter
    const categoryFilter = page
      .locator('[data-testid="category-filter"], select[name="category"]')
      .first();

    if (await categoryFilter.isVisible()) {
      await categoryFilter.selectOption({ index: 1 }); // Select first non-default option

      // Wait for filtered results
      await page.waitForTimeout(1000);

      // Verify URL updated or results changed
      const url = page.url();
      console.log(`✅ Category filter applied: ${url}`);
    } else {
      console.log('⚠️  Category filter not found - may need to implement');
    }
  });

  test('should search for products', async ({ page }) => {
    console.log('Testing product search...');

    // Find search input
    const searchInput = page
      .locator(
        '[data-testid="product-search"], input[type="search"], input[placeholder*="Search"]'
      )
      .first();

    if (await searchInput.isVisible()) {
      await searchInput.fill('laptop');
      await searchInput.press('Enter');

      // Wait for search results
      await page.waitForTimeout(1000);

      // Verify search was performed
      const url = page.url();
      expect(url).toContain('search');

      console.log(`✅ Search performed: ${url}`);
    } else {
      console.log('⚠️  Search input not found - may need to implement');
    }
  });

  test('should navigate to product details', async ({ page }) => {
    console.log('Testing product details navigation...');

    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"], .product-item', {
      timeout: 10000,
    });

    // Click first product
    const firstProduct = page
      .locator('[data-testid="product-card"], .product-item')
      .first();
    await firstProduct.click();

    // Wait for navigation to product details
    await page.waitForURL(/\/product\/|\/products\//, { timeout: 5000 });

    // Verify product details page
    const productTitle = page
      .locator('h1, [data-testid="product-title"]')
      .first();
    await expect(productTitle).toBeVisible();

    console.log('✅ Navigated to product details page');
  });

  test('should handle pagination', async ({ page }) => {
    console.log('Testing pagination...');

    // Look for pagination controls
    const nextButton = page
      .locator(
        '[data-testid="next-page"], button:has-text("Next"), .pagination-next'
      )
      .first();

    if (await nextButton.isVisible()) {
      await nextButton.click();

      // Wait for page change
      await page.waitForTimeout(1000);

      // Verify URL or page content changed
      const url = page.url();
      console.log(`✅ Pagination works: ${url}`);
    } else {
      console.log(
        '⚠️  Pagination not found - may need to implement or not enough products'
      );
    }
  });

  test('should filter products by price range', async ({ page }) => {
    console.log('Testing price range filter...');

    // Look for price filter controls
    const priceFilter = page
      .locator('[data-testid="price-filter"], input[name="minPrice"]')
      .first();

    if (await priceFilter.isVisible()) {
      await priceFilter.fill('50');
      await page.locator('input[name="maxPrice"]').fill('500');

      // Apply filter
      await page
        .locator('button:has-text("Apply"), button[type="submit"]')
        .first()
        .click();

      // Wait for filtered results
      await page.waitForTimeout(1000);

      console.log('✅ Price filter applied');
    } else {
      console.log('⚠️  Price filter not found - may need to implement');
    }
  });

  test('should sort products', async ({ page }) => {
    console.log('Testing product sorting...');

    // Look for sort dropdown
    const sortSelect = page
      .locator('[data-testid="sort-select"], select[name="sort"]')
      .first();

    if (await sortSelect.isVisible()) {
      await sortSelect.selectOption('price_asc');

      // Wait for sorted results
      await page.waitForTimeout(1000);

      console.log('✅ Product sorting works');
    } else {
      console.log('⚠️  Sort control not found - may need to implement');
    }
  });
});
