interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="max-w-xl mx-auto mb-10">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Rechercher un restaurant, un quartier, une cuisine..."
        className="w-full bg-gray-800 text-white placeholder-gray-500 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
      />
    </div>
  );
}

export default SearchBar;