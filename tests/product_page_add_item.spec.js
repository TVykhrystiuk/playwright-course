import {test, expect} from "@playwright/test"

// // example function:
// const addTwoNumbers = (a, b) => {
//     console.log("Adding up two numbers")
//     return a + b
// }

test.skip("Product Page Add To Basket", async ({page})=>{
    await page.goto("/"); // to use baseUrl from playwright.config.js
    // await page.pause();

    // const addToBasketButton = page.locator('div').filter({ hasText: /^499\$Add to Basket$/ }).getByRole('button')
    // const addToBasketButton = page.getByRole('button', {name: 'Add to Basket'}).first()
    const addToBasketButton = page.locator('[data-qa="product-button"]').first()
    const basketCounter = page.locator('[data-qa="header-basket-count"]')

    await basketCounter.waitFor();
    await addToBasketButton.waitFor();

    await expect(addToBasketButton).toHaveText("Add to Basket");
    await expect(basketCounter).toHaveText("0");

    await addToBasketButton.click();

    await expect(addToBasketButton).toHaveText("Remove from Basket");
    await expect(basketCounter).toHaveText("1");

    const checkoutLink = page.getByRole('link', { name: 'Checkout' })
    await checkoutLink.waitFor();
    await checkoutLink.click();
    await page.waitForURL("/basket")
})
