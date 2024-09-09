import { expect } from "@playwright/test"

export class Checkout{
    constructor(page){
        this.page = page

        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]')
        this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]')
        
    }

    removeCheapestProduct = async () =>{
        await this.basketCards.first().waitFor()
        const itemsBeforeRemoval = await this.basketCards.count()
        await this.basketItemPrice.first().waitFor()
        const allPricesText = await this.basketItemPrice.allInnerTexts()
        // console.warn({allPricesText}) // => { allPricesText: [ '499$', '599$', '320$' ] }
        // ['449$', '599$', '320$'] -> [ 499, 599, 320 ]
        const justNumbers = allPricesText.map((element) => {
            const withoutDollarSigh = element.replace("$", "") // =>'499$' -> '499' 
            return parseInt(withoutDollarSigh, 10)
        })
        // console.warn({justNumbers}) // => { justNumbers: [ 499, 599, 320 ] }  
        const smallerPrice = Math.min(...justNumbers) // spred syntax
        const smallerPriceInx = justNumbers.indexOf(smallerPrice)
        const specificRemoveButton = this.basketItemRemoveButton.nth(smallerPriceInx)
        await specificRemoveButton.waitFor()
        await specificRemoveButton.click()
        await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1)
    }

    continueToCheckout = async ()=>{
        await this.continueToCheckoutButton.waitFor()
        await this.continueToCheckoutButton.click()
        await this.page.waitForURL(/\/login/, {timeout: 3000})
    }

    

    // await this.page.pause() 

}