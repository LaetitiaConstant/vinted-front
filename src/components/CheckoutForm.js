import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ title, price }) => {
	const elements = useElements();
	const stripe = useStripe();

	const [succeededMessage, setSucceededMessage] = useState("");
	const [disabled, setDisabled] = useState(false);

	let newPrice = Number(price);
	console.log(newPrice);
	console.log(price);

	const handleSubmit = async (event) => {
		try {
			event.preventDefault();
			setDisabled(true);
			// Get data from CarElement
			const cardElements = elements.getElement(CardElement);

			// Request to Stripe to retrieve a token
			const stripeResponse = await stripe.createToken(cardElements, {
				name: "4903493095035390",
			});

			const stripeToken = stripeResponse.token.id;

			const response = await axios.post(
				"https://vinted-laetitia-constant.herokuapp.com/payment",
				{
					token: stripeToken,
					title: title,
					amount: newPrice,
				}
			);
			if (response.data.status === "succeeded") {
				setSucceededMessage("Paiement validé !");
			}
		} catch (error) {
			console.log(error.response);
		}
	};
	return (
		<form onSubmit={handleSubmit}>
			<CardElement />
			<button disabled={disabled} type="submit">
				Acheter
			</button>
			<span>{succeededMessage}</span>
		</form>
	);
};

export default CheckoutForm;
