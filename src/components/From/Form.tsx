import React, {useState} from 'react';
import s from './Form.module.scss'
import {validationApi} from "../../api/validation-api";
import circleTick from '../../assets/images/circle-tick.svg'
import stopSign from '../../assets/images/stop-sign.svg'

export const Form = () => {
    let [cardNumberError, setCardNumberError] = useState('')
    let [dateError, setDateError] = useState('')
    let [cvvError, setCvvError] = useState('')

    let [cardNumber, setCardNumber] = useState('')
    let [month, setMonth] = useState('')
    let [year, setYear] = useState('')
    let [cvv, setCvv] = useState('')

    let [isSubmittedYet, setIsSubmittedYet] = useState(false)

    const changeCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCardNumber(e.currentTarget.value)
    }
    const changeMonth = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMonth(e.currentTarget.value)
    }
    const changeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
        setYear(e.currentTarget.value)
    }
    const changeCvv = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCvv(e.currentTarget.value)
    }

    async function onSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        try {
            const response = await validationApi.addProductToCart(cardNumber.trim(), month.trim(), year.trim(), cvv.trim())
            validateCardNumber(response.data.errors.cardNumberError)
            validateDate(response.data.errors.dateError)
            validateCvv(response.data.errors.cvvError)
            if (!isSubmittedYet) {
                setIsSubmittedYet(true)
            }
        }
        catch (e){
            alert((e as Error).message)
        }
    }

    const validateCardNumber = (error: string) => {
        setCardNumberError(error)
    }
    const validateDate = (error: string) => {
        setDateError(error)
    }
    const validateCvv = (error: string) => {
        setCvvError(error)
    }

    const img_classname = isSubmittedYet ? `${s.showImage}` : `${s.notToShowImage}`
    const card_number__input = isSubmittedYet ? cardNumberError ? `${s.card_number__input__error}` : `${s.card_number__input__success}` : `${s.card_number__input}`
    const expiry_date__input = isSubmittedYet ? dateError ? `${s.expiry_date__input__error}` : `${s.expiry_date__input__success}` : `${s.expiry_date__input}`
    const cvv__input = isSubmittedYet ? cvvError ? `${s.cvv__input__error}` : `${s.cvv__input__success}` : `${s.cvv__input}`


    return (
        <form className={s.form}>
            <div className={s.card_number}>
                <label htmlFor={'cardNumber'} className={s.card_number__label}>Card number <img
                    src={cardNumberError ? stopSign : circleTick} alt="result" className={img_classname}/></label>
                <input value={cardNumber} onChange={changeCardNumber} id={'cardNumber'} type={'text'} required
                       className={card_number__input}/>
                {cardNumberError ? <span className={s.card_number__error}>{cardNumberError}</span> : null}
            </div>
            <div className={s.card_info}>
                <div className={s.card_info__expiry_date}>
                    <div className={s.expiry_date__items}>
                        <label htmlFor="cardMonth" className={s.expiry_date__label}>Month(MM) <img
                            src={dateError ? stopSign : circleTick} alt="result" className={img_classname}/></label>
                        <input value={month} onChange={changeMonth} type="text" id={'cardMonth'} maxLength={2} required
                               className={expiry_date__input}/>
                        {dateError ? <span className={s.expiry_date__error}>{dateError}</span> : null}
                    </div>
                    <div className={s.expiry_date__items}>
                        <label htmlFor="cardYear" className={s.expiry_date__label}>Year(YYYY) <img
                            src={dateError ? stopSign : circleTick} alt="result" className={img_classname}/></label>
                        <input value={year} onChange={changeYear} type="text" id={'cardYear'} maxLength={4} required
                               className={expiry_date__input}/>
                    </div>
                </div>
                <div className={s.card_info__cvv}>
                    <label htmlFor="cvv" className={s.cvv__label}>CVV <img src={cvvError ? stopSign : circleTick}
                                                                           alt="result"
                                                                           className={img_classname}/></label>
                    <input value={cvv} onChange={changeCvv} type="text" id={'cvv'} maxLength={4} required
                           className={cvv__input}/>
                    {cvvError ? <span className={s.cvv__error}>{cvvError}</span> : null}
                </div>
            </div>
            <button onClick={onSubmit} type={'submit'} className={s.btn}>SUBMIT</button>
        </form>
    );
};

