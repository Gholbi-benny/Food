import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

function DashboardLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError('Email ou mot de passe incorrect.');
      return;
    }

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-sm bg-gray-100 dark:bg-gray-800 rounded-xl p-6 sm:p-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">
          Espace restaurateur
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-center text-sm mb-6 sm:mb-8">
          Connectez-vous pour gérer votre restaurant sur éssika eat.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-700 dark:text-gray-300 block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-transparent rounded-lg px-4 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 dark:text-gray-300 block mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-transparent rounded-lg px-4 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="text-gray-500 text-xs text-center mt-6">
          Vous n'avez pas encore de compte ? Nos équipes créent votre accès
          après une première prise de contact avec votre établissement.
        </p>
      </div>
    </div>
  );
}

export default DashboardLogin;