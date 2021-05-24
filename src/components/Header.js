import logo from "../assets/image/logo-vinted-large.png";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Header = ({ token, setUser }) => {
	const history = useHistory();

	return (
		<div className="header">
			<div className="container nav">
				<Link to="/">
					<img className="logo" src={logo} alt="" />
				</Link>
				{!token ? (
					<nav className="header-button">
						<Link to="/signup">
							<button>S'incrire</button>
						</Link>
						<Link to="/login">
							<button>Se connecter</button>
						</Link>
					</nav>
				) : (
					<div className="header-button">
						<button
							onClick={() => {
								history.push("/publish");
							}}
						>
							Vends tes articles
						</button>
						<button
							onClick={() => {
								setUser(null);
							}}
						>
							Se déconnecter
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Header;
