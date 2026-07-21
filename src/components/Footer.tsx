function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 px-6 py-8 mt-16">
      <div className="max-w-6xl mx-auto text-center text-gray-400 text-sm">
        <p className="text-orange-500 font-bold text-lg mb-2">Food</p>
        <p>Le guide numérique des restaurants de Brazzaville.</p>
        <p className="mt-4">
          © {new Date().getFullYear()} Food — Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

export default Footer;