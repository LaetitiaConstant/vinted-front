import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Header from "./components/Header";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Payment from "./containers/Payment";
import Signup from "./containers/Signup";
import Login from "./containers/Login";

// Stripe
const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");

function App() {
	return (
		<Router>
			<Header />
			<Switch>
				<Route path="/signup">
					<Signup />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/offer/:id">
					<Offer />
				</Route>
				<Route path="/payment">
					<Elements stripe={stripePromise}>
						<Payment />
					</Elements>
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
