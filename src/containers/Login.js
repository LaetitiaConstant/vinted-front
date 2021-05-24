import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const history = useHistory();
	const location = useLocation();
	const fromPublish = location.state?.fromPublish ? true : null;

	const handleSubmit = async (event) => {
		try {
			event.preventDefault();
			setIsLoading(true);
			const response = await axios.post(
				"https://vinted-laetitia-constant.herokuapp.com/user/login",
				{
					email: email,
					password: password,
				}
			);
			if (response.data.token) {
				setUser(response.data.token);
				setIsLoading(false);
				history.push(fromPublish ? "/publish" : "/");
			} else {
				alert("Une erreur est survenue, veuillez réssayer.");
			}
		} catch (error) {
			if (error.response.status === 400) {
				setErrorMessage("Mauvais email et/ou mot de passe");
				setIsLoading(false);
			}
			console.log(error.message);
		}
	};

	return (
		<div className="signup">
			<h1>Se connecter</h1>
			<form onSubmit={handleSubmit}>
				<input
					onChange={(event) => {
						setEmail(event.target.value);
						setErrorMessage("");
					}}
					placeholder="Adresse email"
					type="email"
				/>
				<input
					onChange={(event) => {
						setPassword(event.target.value);
					}}
					placeholder="Mot de passe"
					type="password"
				/>
				<span>{errorMessage}</span>
				<button type="submit">Se connecter</button>
			</form>
			<Link className="signup-redirect" to="/signup">
				Pas encore de compte ? Inscris-toi !
			</Link>
		</div>
	);
};

export default Login;
