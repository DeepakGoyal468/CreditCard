import React, { useState, useEffect } from 'react';
import "./Card.css";
import chip from "../../assets/images/chip.png";
import { BACKGROUND_IMAGES, CARD_IMAGES } from '../../Constants';
const Card = (props) => {
    const [randomNumber, setRandomNumber] = useState();
    
    useEffect(()=>{
        setRandomNumber(Math.floor(Math.random() * 10));
    },[]);
    return(
        <div className="debit-card" style={{backgroundImage: `url(${BACKGROUND_IMAGES[randomNumber]})`}}>
            {props.cardFlip ? 
                <>
                    <div className="black-strip"></div>
                    <div className="cvv-text">CVV</div>
                    <div className="cvv">{"*".repeat(props.cvv.length)}</div>
                    <div className="back-card-type">
                        <img src={CARD_IMAGES[props.cardType]} alt={props.cardType} height="36" width="65" />
                    </div>
                </> 
                :
                <>
                    <div className="card-type">
                        <img src={chip} alt="chip" height="40" width="50" />
                        {props.cardType && <img src={CARD_IMAGES[props.cardType]} alt={props.cardType} height="40" width="70" />}
                    </div>
                    <span className="debit-card-number">{props.number ?? "#### #### #### ####"}</span>

                    <div className="card-info-wrapper">
                        <div className="card-info">
                            <div className="card-key">Card Holder</div>
                            <div className="card-value">{props.holderName ?? "Full Name"}</div>
                        </div>
                        <div className="card-info">
                            <div className="card-key">Expiry</div>
                            <div className="card-value">{props.expiryMonth ?? "MM"}/{props.expiryYear ?? "YY"}</div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default Card;