import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import home from "../assets/image/home.jpeg";
import tear from "../assets/image/tear.svg";

const Home = () => {
	const [offersData, setOffersData] = useState();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"https://vinted-laetitia-constant.herokuapp.com/offers"
				);
				setOffersData(response.data);
				setIsLoading(false);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchData();
	}, []);

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
		<div>
			<img className="imgHome" src={home} alt="Vinted" />
			<img className="tear" src={tear} alt="tear" />
			<div className="offer container">
				{offersData.offers.map((offer, index) => {
					return (
						<Link key={offer._id} to={`/offer/${offer._id}`}>
							<div className="seller">
								<img
									className="avatar"
									src={offer.owner.avatar.secure_url}
									alt={offer.owner.account.username}
								/>
								<p>{offer.owner.account.username}</p>
							</div>

							<img
								className="article-picture"
								src={offer.product_image.secure_url}
								alt={offer.product_name}
							/>

							<div className="product-description">
								<p className="price">{offer.product_price} €</p>
								<p className="product-size">{offer.product_details[1].TAILLE}</p>
								<p className="product-brand">{offer.product_details[0].MARQUE}</p>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default Home;
