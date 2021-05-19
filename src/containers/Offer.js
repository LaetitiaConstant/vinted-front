import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Offer = () => {
	const { id } = useParams();
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://vinted-laetitia-constant.herokuapp.com/offer/${id}`
				);

				setData(response.data);
				setIsLoading(false);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchData();
	}, [id]);

	const euro = new Intl.NumberFormat("fr-FR", {
		style: "currency",
		currency: "EUR",
		minimumFractionDigits: 2,
	});

	return isLoading ? (
		<p>En cours de chargement...</p>
	) : (
		<div className="offer-page">
			<div>
				<img src={data.product_image.secure_url} alt={data.product_name} />
			</div>
			<div className="offer-page-description">
				<p className="offer-price">{euro.format(data.product_price)}</p>

				{data.product_details.map((elem) => {
					const keys = Object.keys(elem);

					return (
						<div className="array-description">
							<div className="offer-key">{keys[0]}</div>
							<div className="offer-elem">{elem[keys[0]]}</div>
						</div>
					);
				})}

				<div className="hr-sect"></div>

				<p className="offer-article">{data.product_name}</p>

				<p>{data.product_description}</p>

				<img src={data.owner.account.avatar.secure_url} alt="" />

				<p>{data.owner.account.username}</p>

				<Link
					to={{
						pathname: "/payment",
						search: "?name=" + data.product_name + "&price=" + data.product_price,
					}}
				>
					<button>Acheter</button>
				</Link>
			</div>
		</div>
	);
};

export default Offer;
