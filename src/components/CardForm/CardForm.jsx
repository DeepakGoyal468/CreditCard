import "./CardForm.css";
import { getCardType } from "../../utils/cardTypes";
import { useState } from "react";
import Select from "../Select/Select";
import Card from "../card/Card";

const CardForm = () => {
    const [cardNumber, setCardNumber] = useState();
    const [holderName, setHolderName] = useState();
    const [expiryMonth, setExpiryMonth] = useState();
    const [expiryYear, setExpiryYear] = useState();
    const [cvv, setCvv] = useState('');
    const [cardType, setCardType] = useState('');
    const [cardFlip, setCardFlip] = useState(false);
    const [errors, setErrors] = useState({});


    const year = (new Date()).getFullYear().toString().substr(-2);
    const years = Array.from(new Array(12), (val, index) => index + Number(year));
    const months = Array.from(new Array(12), (val, index) => 
    {
        val = index+1;
        return val<10 ? "0" + val : val
    });

    const checkCardType = (cardNumber) => {
        let error = {};
        let cardValid = true;
        setCardNumber('');
        if(!cardNumber || !Number(cardNumber) || cardNumber.length!==16){
            error.cardNumber = "Card not valid"; 
            cardValid = false;  
        }
        const cardType = getCardType(cardNumber);
        if(!cardType){
            error.cardNumber = "Card not valid";
            cardValid = false;
        }
        setErrors(error);
        if(cardValid){
            setCardType(cardType);
        
            var matches = cardNumber.match(/\d{4,16}/g);
            var match = matches && matches[0];
            var numbers = []
            for (let i=0; i<match.length; i+=4) {
                numbers.push(match.substring(i, i+4))
            }
            if (numbers.length) {
                cardNumber =  numbers.join(' ')
            } 
            setCardNumber(cardNumber);
        }
    }

    const flipCard = (value) => {
        setCardFlip(true);
        setCvv(value);
    }

    const handleValidation = () => {
        let validForm = true;
        let error = {};

        if(!cardNumber){
            validForm = false;
            error.cardNumber = "Card not valid";   
        }

        if(!holderName){
            validForm = false;
            error.holderName = "Cannot be empty";
         }
   
         if(typeof holderName !== "undefined"){
            if(!holderName.match(/^[a-zA-Z]+$/)){
               validForm = false;
               error.holderName = "Only letters are allowed";
            }        
         }

         if(!expiryMonth){
            validForm = false;
            error.month = "Select Month";
         }

         if(!expiryYear){
            validForm = false;
            error.year = "Select year";
         }

         if(!cvv){
            validForm = false;
            error.cvv = "Enter cvv";
         }
         if(cvv.length!==3){
            validForm = false;
            error.cvv = "Length should be 3";
        }
        setErrors(error);
        return validForm;
    }

    const cardSubmit = (e) => {
        e.preventDefault();
        setCardFlip(false);
        handleValidation() ;
    }

    
    return(
        <div className="mainContainer">
            <Card number={cardNumber} holderName={holderName} expiryMonth= {expiryMonth} 
            expiryYear={expiryYear} cvv={cvv} cardType={cardType} cardFlip={cardFlip}/>
            
            <div className="form-control">
                <label>Card Number</label>
                <input name="name" type="text"
                onBlur={(e) => checkCardType(e.target.value)}
                />
                <span>{errors.cardNumber}</span>
            </div>

            <div className="form-control">
                <label>Card Holder</label>
                <input name="name" type="text" value={holderName}
                onChange={(event) => setHolderName(event.target.value)}/>
                <span>{errors.holderName}</span>
            </div>

            <div className="card-expiry-wrapper">
                <div className="form-control">
                    <label>Expiration Date</label>
                    <Select name="months" default="Month" error={errors.month} values={months} setExpiry={setExpiryMonth} />
                    <span>{errors.month}</span>
                </div>
                <div className="form-control">
                    <Select name="years" default="Year" error={errors.year} values={years} setExpiry={setExpiryYear} />
                    <span>{errors.year}</span>
                </div>
                <div className="form-control">
                    <label>CVV</label>
                    <input name="name" type="text" value={cvv}
                    style={errors.cvv && {borderColor:"red"}}
                    onChange={(event) => flipCard(event.target.value)}
                    onBlur={() => {setCardFlip(false)}}/>
                    <span>{errors.cvv}</span>
                </div>
            </div>

            <button type="submit" className="submit" onClick={(e) => cardSubmit(e)}>Submit</button>
        </div>
    )
}

export default CardForm;