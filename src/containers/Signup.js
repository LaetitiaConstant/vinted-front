import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = ({ setUser }) => {
	const [username, setUserName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [avatar, setAvatar] = useState();
	const [preview, setPreview] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);

	const history = useHistory();

	const handleSubmit = async (event) => {
		try {
			event.preventDefault();
			const formData = new FormData();
			formData.append("avatar", avatar);
			formData.append("username", username);
			formData.append("email", email);
			formData.append("phone", phone);
			formData.append("password", password);

			const response = await axios.post(
				"https://vinted-laetitia-constant.herokuapp.com/user/signup",
				formData
			);
			console.log(response.data.token);
			if (response.data.token) {
				setUser(response.data.token);
				history.push("/");
			} else {
				alert("Une erreur est survenue, veuillez réssayer.");
			}
		} catch (error) {
			if (error.response.status === 400) {
				setErrorMessage("Cet email a déjà un compte chez nous !");
			}
			console.log(error.message);
		}
	};

	return (
		<div className="signup">
			<h1>S'inscrire</h1>
			<form onSubmit={handleSubmit}>
				<div className="file-select">
					{preview ? (
						<div className="dashed-preview-image">
							<img src={preview} alt="pré-visualisation" />
							<div
								className="remove-img-button"
								onClick={() => {
									setPreview("");
								}}
							>
								X
							</div>
						</div>
					) : (
						<div className="dashed-preview-without">
							<div className="input-design-default">
								<label htmlFor="file" className="label-file">
									<span className="input-sign">+</span>
									<span>Ajoute une photo</span>
								</label>
								<input
									id="file"
									type="file"
									className="input-file"
									onChange={(event) => {
										setAvatar(event.target.files[0]);
										setPreview(URL.createObjectURL(event.target.files[0]));
									}}
								/>
							</div>
						</div>
					)}
				</div>
				<input
					type="text"
					placeholder="Nom d'utilisateur"
					value={username}
					onChange={(event) => setUserName(event.target.value)}
				/>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
				/>
				<input
					type="number"
					placeholder="Portable"
					value={phone}
					onChange={(event) => setPhone(event.target.value)}
				/>
				<input
					type="password"
					placeholder="Mot de passe"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>

				<button type="submit">S'inscrire</button>
			</form>
			<Link className="signup-redirect" to={"/login"}>
				Tu as déjà un compte ? Connecte-toi !
			</Link>
			{errorMessage && <div>{errorMessage}</div>}
		</div>
	);
};

export default Signup;
