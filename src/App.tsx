import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import DashboardDetails from './pages/DashboardDetails';
import Checkout from './pages/Checkout';
import DashManager from './pages/DashManager';
import { CartProvider } from './contexts/CartContext';

const AppLayout = () => {
  const location = useLocation();
  // Check if the current route is "/dashmanager" (case-sensitive path)
  const isDashManager = location.pathname.toLowerCase() === '/dashmanager';

  return (
    <div className="min-h-screen flex flex-col">
      {/* Only show Navbar and Footer if not on /dashmanager */}
      {!isDashManager && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard/:id" element={<DashboardDetails />} />
          <Route path="/dashmanager" element={<DashManager />} />
        </Routes>
      </main>
      {!isDashManager && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <CartProvider>
      <Router>
        <AppLayout />
      </Router>
    </CartProvider>
  );
};

export default App;
