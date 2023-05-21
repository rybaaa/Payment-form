import React, {useState} from 'react';
import s from './Form.module.scss'

export const Form = () => {
    let [cardNumberError, setCardNumberError] = useState('')
    let [dateError, setDateError] = useState('')
    let [cvvError, setCvvError] = useState('')

    let [cardNumber, setCardNumber] = useState('')
    let [month, setMonth] = useState('')
    let [year, setYear] = useState('')
    let [cvv, setCvv] = useState('')

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

    return (
        <form className={s.form}>
            <div className={s.card_number}>
                <label htmlFor={'cardNumber'} className={s.card_number__label}>Card number</label>
                <input value={cardNumber} onChange={changeCardNumber} id={'cardNumber'} type={'text'} required
                       className={s.card_number__input}/>
                {cardNumberError ? <span className={s.card_number__error}>{cardNumberError}</span> : null}
            </div>
            <div className={s.card_info}>
                <div className={s.card_info__expiry_date}>
                    <div className={s.expiry_date__items}>
                        <label htmlFor="cardMonth" className={s.expiry_date__label}>Month(MM)</label>
                        <input value={month} onChange={changeMonth} type="text" id={'cardMonth'} maxLength={2} required
                               className={s.expiry_date__input}/>
                        {dateError ? <span className={s.expiry_date__error}>{dateError}</span> : null}
                    </div>
                    <div className={s.expiry_date__items}>
                        <label htmlFor="cardYear" className={s.expiry_date__label}>Year(YYYY)</label>
                        <input value={year} onChange={changeYear} type="text" id={'cardYear'} maxLength={4} required
                               className={s.expiry_date__input}/>
                    </div>
                </div>
                <div className={s.card_info__cvv}>
                    <label htmlFor="cvv" className={s.cvv__label}>CVV </label>
                    <input value={cvv} onChange={changeCvv} type="text" id={'cvv'} maxLength={4} required
                           className={s.cvv__input}/>
                    {cvvError ? <span className={s.cvv__error}>{cvvError}</span> : null}
                </div>
            </div>
            <button type={'submit'} className={s.btn}>SUBMIT</button>
        </form>
    );
};

