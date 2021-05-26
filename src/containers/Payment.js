import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";

const Payment = () => {
	// Check if user is authenticated
	const token = Cookies.get("token");
	console.log(token);

	const location = useLocation();
	// Stripe public key
	const stripePromise = loadStripe(
		"pk_test_51ILTtiLHk7wKXcCjTJYKU7fodo1fGS2bvicJfYdIH3dP2AcZDgqGpYqSOee7Q3RwF34w953rjmKsMFTMjT4oraZn007PEZYl1S"
	);

	const { title, price } = location.state;

	return token ? (
		<div>
			<p>Nom du produit : {title}</p>
			<p>Prix : {price} €</p>
			<Elements stripe={stripePromise}>
				<CheckoutForm title={title} price={price} />
			</Elements>
		</div>
	) : (
		<Redirect to={{ pathname: "/login", state: { fromPublish: true } }} />
	);
};

export default Payment;
