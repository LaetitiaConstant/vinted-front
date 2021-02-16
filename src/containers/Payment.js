import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [succeeded, setSucceeded] = useState(false);
  const [click, setClick] = useState(false);

  let query = new URLSearchParams(useLocation().search);

  let result = (Number(query.get("price")) + 1.2) * 100;

  const euro = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const cardElements = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElements, {
        name: "xxxxx",
      });

      const stripeToken = stripeResponse.token.id;
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeToken,
          title: query.get("name"),
          amount: result,
        }
      );
      console.log(response.status);
      setClick(true);
      if (response.status === 200) {
        setSucceeded("Merci pour votre achat !");
      }
    } catch (error) {
      setSucceeded("Erreur");
      console.log(error.message);
    }
  };
  return (
    <div className="bgc-payment">
      {!click ? (
        <div className="payment-container">
          <h1>Résumé de la commande</h1>
          <div>
            <span>nom de l'article</span>
            <span>{query.get("name")}</span>
          </div>
          <div>
            <span>Commande</span>
            <span>{euro.format(query.get("price"))}</span>
          </div>
          <div>
            <span>Frais de protection acheteurs</span>
            <span>0,40 €</span>
          </div>
          <div>
            <span>Frais de port</span>
            <span>0,80 €</span>
          </div>
          <div>
            <span>Total</span>
            <span>{euro.format(result)}</span>
          </div>

          <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit">Payer</button>
          </form>
        </div>
      ) : (
        <div>{succeeded}</div>
      )}
    </div>
  );
};

export default Payment;
