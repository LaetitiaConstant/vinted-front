import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import home from "../assets/image/home.jpeg";
import tear from "../assets/image/tear.svg";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const euro = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });

  return isLoading ? (
    <p>En cours de chargement...</p>
  ) : (
    <div>
      <img className="imgHome" src={home} alt="Vinted" />
      <img className="tear" src={tear} alt="tear" />
      <div className="offer container">
        {data.offers.map((offer, index) => {
          return (
            <Link key={offer._id} to={`/offer/${offer._id}`}>
              <div className="offerAd">
                <div className="seller">
                  <img
                    className="avatar"
                    src={offer.owner.account.avatar}
                    alt=""
                  />

                  <p>{offer.owner.account.username}</p>
                </div>

                <img
                  className="article"
                  src={offer.product_image.secure_url}
                  alt=""
                />

                <p className="price">{euro.format(offer.product_price)}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
