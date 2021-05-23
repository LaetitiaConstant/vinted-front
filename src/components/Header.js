import logo from "../assets/image/logo-vinted-large.png";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div className="header">
			<div className="container nav">
				<Link to="/">
					<img className="logo" src={logo} alt="" />
				</Link>
				<nav className="header-button">
					<Link to="/signup">
						<button>S'incrire</button>
					</Link>
					<Link to="/login">
						<button>Se connecter</button>
					</Link>
				</nav>
			</div>
		</div>
	);
};

export default Header;
