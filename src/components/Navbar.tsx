import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Navbar() {
  return (
    <nav className="bg-gray-950 border-b border-gray-800 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="éssika eat" className="h-9 w-auto" />
        </Link>

        <div className="flex gap-6 text-gray-300">
          <Link to="/restaurants" className="hover:text-orange-400 transition-colors">
            Accueil
          </Link>
          <Link to="/about" className="hover:text-orange-400 transition-colors">
            À propos
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;