import Cookies from "js-cookie";
import { Redirect, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Publish = () => {
	const history = useHistory();
	const token = Cookies.get("token");

	const [file, setFile] = useState();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [brand, setBrand] = useState("");
	const [size, setSize] = useState("");
	const [color, setColor] = useState("");
	const [condition, setCondition] = useState("");
	const [city, setCity] = useState("");
	const [price, setPrice] = useState("");
	const [preview, setPreview] = useState("");

	const formData = new FormData();
	formData.append("title", title);
	formData.append("description", description);
	formData.append("brand", brand);
	formData.append("size", size);
	formData.append("color", color);
	formData.append("condition", condition);
	formData.append("city", city);
	formData.append("price", price);
	formData.append("picture", file);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				"https://vinted-laetitia-constant.herokuapp.com/offer/publish",
				formData,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			if (response.data._id) {
				history.push(`/offer/${response.data._id}`);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return token ? (
		<div className="publish-bg">
			<div className="container">
				<h1 className="publish-title">Vends ton article</h1>
				<form onSubmit={handleSubmit}>
					<div className="file-publish">
						{preview ? (
							<div className="dashed-preview-image">
								<img src={preview} alt="pré-visualisation" />
								<div
									className="remove-img-button"
									onClick={() => {
										setPreview("");
									}}
								>
									x
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
											setFile(event.target.files[0]);
											setPreview(URL.createObjectURL(event.target.files[0]));
										}}
									/>
								</div>
							</div>
						)}
					</div>

					<div className="input-element">
						<div className="each-element">
							<p>Titre</p>
							<input
								type="text"
								placeholder="ex: Chemise Sézane verte"
								value={title}
								onChange={(event) => setTitle(event.target.value)}
							/>
						</div>

						<div className="each-element">
							<p>Décris ton article</p>
							<textarea
								placeholder="ex: Porté quelquefois, taille correctement"
								value={description}
								onChange={(event) => setDescription(event.target.value)}
							/>
						</div>
					</div>

					<div className="input-element">
						<div className="each-element">
							<p>Marque</p>
							<input
								type="text"
								value={brand}
								placeholder="ex: Zara"
								onChange={(event) => setBrand(event.target.value)}
							/>
						</div>

						<div className="each-element">
							<p>Taille</p>
							<input
								type="text"
								value={size}
								placeholder="ex: L / 40 / 12"
								onChange={(event) => setSize(event.target.value)}
							/>
						</div>

						<div className="each-element">
							<p>Couleur</p>
							<input
								type="text"
								value={color}
								placeholder="ex: Fushia"
								onChange={(event) => setColor(event.target.value)}
							/>
						</div>

						<div className="each-element">
							<p>Etat</p>
							<input
								type="text"
								value={condition}
								placeholder="Neuf avec étiquette"
								onChange={(event) => setCondition(event.target.value)}
							/>
						</div>

						<div className="each-element">
							<p>Lieu</p>
							<input
								type="text"
								value={city}
								placeholder="ex: Paris"
								onChange={(event) => setCity(event.target.value)}
							/>
						</div>
					</div>

					<div className="input-element">
						<div className="each-element">
							<p>Prix</p>
							<input
								type="number"
								value={price}
								placeholder="0,00 €"
								onChange={(event) => setPrice(event.target.value)}
							/>
						</div>
					</div>
					<div className="button-container">
						<button className="publish-button" type="submit">
							Ajouter
						</button>
					</div>
				</form>
			</div>
		</div>
	) : (
		<Redirect to={{ pathname: "/login", state: { fromPublish: true } }} />
	);
};

export default Publish;
