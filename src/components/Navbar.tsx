import { Link } from 'react-router-dom';
import logoLight from '../assets/logo-light.png';
import logoDark from '../assets/logo.png';
import ThemeToggle from './ThemeToggle';

function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-3 sm:px-6 py-3 sm:py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/">
          <img src={logoLight} alt="éssika eat" className="h-7 sm:h-9 w-auto dark:hidden" />
          <img src={logoDark} alt="éssika eat" className="h-7 sm:h-9 w-auto hidden dark:block" />
        </Link>

        <div className="flex items-center gap-2 sm:gap-6 text-xs sm:text-base text-gray-600 dark:text-gray-300">
          <Link to="/restaurants" className="hover:text-orange-400 transition-colors">
            Accueil
          </Link>
          <Link to="/about" className="hover:text-orange-400 transition-colors">
            À propos
          </Link>
          <Link to="/partners" className="hover:text-orange-400 transition-colors whitespace-nowrap">
            <span className="sm:hidden">Rejoindre</span>
            <span className="hidden sm:inline">Rejoindre la plateforme</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;