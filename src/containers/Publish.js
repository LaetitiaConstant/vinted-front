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
	const [price, setPrice] = useState(0);
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
		<div>
			<h1>Vends ton article</h1>
			<form onSubmit={handleSubmit}>
				<div>
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

				<br />
				<input
					type="text"
					placeholder="title"
					value={title}
					onChange={(event) => setTitle(event.target.value)}
				/>
				<br />
				<textarea
					placeholder="description"
					value={description}
					onChange={(event) => setDescription(event.target.value)}
				></textarea>
				<br />
				<input
					type="text"
					value={brand}
					placeholder="marque"
					onChange={(event) => setBrand(event.target.value)}
				/>
				<br />
				<input
					type="text"
					value={size}
					placeholder="taille"
					onChange={(event) => setSize(event.target.value)}
				/>
				<br />
				<input
					type="text"
					value={color}
					placeholder="couleur"
					onChange={(event) => setColor(event.target.value)}
				/>
				<br />
				<input
					type="text"
					value={condition}
					placeholder="état"
					onChange={(event) => setCondition(event.target.value)}
				/>
				<br />
				<input
					type="text"
					value={city}
					placeholder="lieu"
					onChange={(event) => setCity(event.target.value)}
				/>
				<br />
				<input
					type="number"
					value={price}
					placeholder="prix"
					onChange={(event) => setPrice(event.target.value)}
				/>
				<button type="submit">Valider</button>
			</form>
		</div>
	) : (
		<Redirect to={{ pathname: "/login", state: { fromPublish: true } }} />
	);
};

export default Publish;
