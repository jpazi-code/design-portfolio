import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
          <img src="/logo-portfolio.png" alt="Jasmine Martha" className="logo-image" />
        </Link>
      </div>
      <nav className="navigation">
        <ul>
          <li><Link to="/works">Works</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header; 