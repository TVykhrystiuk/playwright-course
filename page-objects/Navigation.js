import { isDesktopViewport } from "../utils/isDesktopViewport"

export class Navigation{
    constructor(page) {    
        this.page = page

        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
        this.checkoutLink = page.getByRole('link', { name: 'Checkout' })
        this.mobileBurgerButton = page.locator('[data-qa="burger-button"]')
    }  

    getBasketCount = async () => {
        // we nead to return a number
        await this.basketCounter.waitFor()
        const text = await this.basketCounter.innerText()
        // "0" - 0
        // const asNumber = parseInt(text, 10) // 10 means decimal system
        // return asNumber
        return parseInt (text, 10)
    }
    
    goToCheckout = async () =>{
        // if mobile viewport, first open the burger menu
        if (!isDesktopViewport(this.page)) { // (isDesktopViewport(this.page) = false) // !false === true
            await this.mobileBurgerButton.waitFor()
            await this.mobileBurgerButton.click()
        }
        await this.checkoutLink.waitFor();
        await this.checkoutLink.click();
        await this.page.waitForURL("/basket")

        // await this.page.goto("/basket")
    }
}


