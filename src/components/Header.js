import logo from "../assets/image/logo-vinted-large.png";

const Header = () => {
  return (
    <div className="header">
      <div className="container nav">
        <div>
          <img className="logo" src={logo} alt="" />
        </div>
        <nav className="header-button">
          <button>S'incrire</button>
          <button>Se connecter</button>
          <button>Vends tes articles</button>
        </nav>
      </div>
    </div>
  );
};

export default Header;
