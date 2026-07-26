import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import RestaurantDetails from './pages/RestaurantDetails';
import About from './pages/About';
import Restaurants from './pages/Restaurants';
import Partners from './pages/Partners';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/partners" element={<Partners />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;