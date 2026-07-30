import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 px-6 py-8 mt-16">
      <div className="max-w-6xl mx-auto text-center text-gray-400 text-sm">
        <img src={logo} alt="éssika eat" className="h-8 w-auto mx-auto mb-3" />
        <p>Le guide numérique des restaurants de Brazzaville.</p>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 text-xs">
          <Link to="/terms" className="hover:text-orange-400 transition-colors">
            Conditions d'utilisation
          </Link>
          <Link to="/privacy" className="hover:text-orange-400 transition-colors">
            Confidentialité
          </Link>
          <Link to="/partner-rules" className="hover:text-orange-400 transition-colors">
            Règles partenaires
          </Link>
        </div>

        <p className="mt-4">
          © {new Date().getFullYear()} éssika eat — Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

export default Footer;