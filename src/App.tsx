import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import RestaurantDetails from './pages/RestaurantDetails';
import About from './pages/About';
import Restaurants from './pages/Restaurants';
import Partners from './pages/Partners';
import DashboardLogin from './pages/DashboardLogin';
import DashboardHome from './pages/DashboardHome';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import PartnerRules from './pages/PartnerRules';

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
          <Route path="/dashboard/login" element={<DashboardLogin />} />
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/partner-rules" element={<PartnerRules />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;