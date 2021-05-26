import "./App.css";
import { useState } from "react";

import Cookies from "js-cookie";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Payment from "./containers/Payment";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Publish from "./containers/Publish";

function App() {
	const [token, setToken] = useState(Cookies.get("token") || null);

	const setUser = (token) => {
		if (token) {
			setToken(token);
			Cookies.set("token", token);
		} else {
			setToken(null);
			Cookies.remove("token");
		}
	};

	return (
		<Router>
			<Header setUser={setUser} token={token} />
			<Switch>
				<Route path="/signup">
					<Signup setUser={setUser} />
				</Route>
				<Route path="/login">
					<Login setUser={setUser} />
				</Route>
				<Route path="/publish">
					<Publish token={token} />
				</Route>
				<Route path="/offer/:id">
					<Offer />
				</Route>
				<Route path="/payment">
					<Payment />
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
