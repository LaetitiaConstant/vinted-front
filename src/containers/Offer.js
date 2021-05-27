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

	return isLoading ? (
		<div className="loaders">
			<div className="lds-roller">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	) : (
		<div className="offer-page">
			<img src={data.product_image.secure_url} alt={data.product_name} />
			<div className="offer-page-description">
				<p className="offer-price">{data.product_price} €</p>

				{data.product_details.map((detail, index) => {
					return (
						<div key={index} className="offer-products-description">
							<div className="offer-title-description">
								<p>{Object.keys(detail)}</p>
							</div>
							<div className="offer-detail-description">
								<p>{detail[Object.keys(detail)]}</p>
							</div>
						</div>
					);
				})}

				<div className="hr-sect" />

				<p className="offer-product-name">{data.product_name}</p>
				<p className="offer-product-description">{data.product_description}</p>

				<div className="profil-offer">
					<img
						src={data.owner.avatar.secure_url}
						alt={data.owner.account.username}
					/>
					<p>{data.owner.account.username}</p>
				</div>

				<Link
					to={{
						pathname: "/payment",
						state: { title: data.product_name, price: data.product_price },
					}}
				>
					<button>Acheter</button>
				</Link>
			</div>
		</div>
	);
};

export default Offer;
