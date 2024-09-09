import { expect } from "@playwright/test"

export class PaymentPage{
    constructor(page){
        this.page = page

        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]')
                                .locator('[data-qa="discount-code"]')
        this.discountInput = page.locator('[data-qa="discount-code-input"]')
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.discountMessage = page.locator('[data-qa="discount-active-message"]')
        this.totalPrice = page.locator('[data-qa="total-value"]')
        this.priceWithDiscount = page.locator('[data-qa="total-with-discount-value"]')
        this.cardOwnerInput = page.locator('[data-qa="credit-card-owner"]')
        this.cardNumberInput = page.locator('[data-qa="credit-card-number"]')
        this.validUntilInput = page.locator('[data-qa="valid-until"]')
        this.cvcCodeInput = page.locator('[data-qa="credit-card-cvc"]')
        this.payButton = page.locator('[data-qa="pay-button"]')
    }

    activateDiscount = async () => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        await this.discountInput.waitFor()

        // Option 1 for laggy input: using .fill() with await expect()
        await this.discountInput.fill(code)
        await expect(this.discountInput).toHaveValue(code)

        // Option 2 for laggy inputs: slow typing
        // await this.discountInput.focus()
        // await this.page.keyboard.type(code, {delay: 1000})
        // expect (await this.discountInput.inputValue()).toBe(code)

        // Check that discount message isn't visible before click Discount button
        // 1 Option
        // const discountMessageCount = await this.discountMessage.count() // 0
        // expect (discountMessageCount).toBe(0)
        // 2 Option
        await expect(this.discountMessage).toHaveCount(0)
        // 3 Option
        expect(await this.discountMessage.isVisible()).toBe(false)
        expect(await this.priceWithDiscount.isVisible()).toBe(false)

        await this.activateDiscountButton.waitFor()
        await this.activateDiscountButton.click()

        await this.discountMessage.waitFor()
        expect(await this.discountMessage).toHaveText("Discount activated!")
        // console.warn({this.discountMessage})
        await this.priceWithDiscount.waitFor()
        const priceWithDiscountText = await this.priceWithDiscount.innerText() // "345$"
        const priceWithDiscountNumber = priceWithDiscountText.replace("$", "") // "345"
        const priceWithDiscountValue = parseInt(priceWithDiscountNumber)       // 345
        const totalPriceText = await this.totalPrice.innerText()
        const totalPriceStringNumber = totalPriceText.replace("$", "")
        const totalPriceValue = parseInt(totalPriceStringNumber)
        // check new price smaller then previous
        expect(priceWithDiscountValue).toBeLessThan(totalPriceValue)
    }  

    fillPaymentDetails = async (payDetails) =>{
        await this.cardOwnerInput.waitFor()
        await this.cardOwnerInput.fill(payDetails.owner)
        await this.cardNumberInput.waitFor()
        await this.cardNumberInput.fill(payDetails.number)
        await this.validUntilInput.waitFor()
        await this.validUntilInput.fill(payDetails.expDate)
        await this.cvcCodeInput.waitFor()
        await this.cvcCodeInput.fill(payDetails.cvc)
        // await this.page.pause()
    }
    completePayment = async () =>{
        await this.payButton.waitFor()
        await this.payButton.click()
        await this.page.waitForURL(/\/thank-you/, {timeout: 3000})
    }
}