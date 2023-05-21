import { instance } from './instance'

export const validationApi = {
    addProductToCart(cardNumber: string, month: string, year: string, cvv:string) {
        return instance.post<ResponseType>('validation', { cardNumber, month, year, cvv })
    },
}

type ErrorTypes = {
    cardNumberError: string,
    dateError: string,
    cvvError: string
}

type ResponseType = {
    errors:ErrorTypes
}