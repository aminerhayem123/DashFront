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
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './pages/ForgotPassword';

const AppLayout = () => {
  const location = useLocation();
  const isDashManager = location.pathname.toLowerCase() === '/dashmanager';

  return (
    <div className="min-h-screen flex flex-col">
      {!isDashManager && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />  {/* Add route for Forgot Password */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/:id"
            element={
              <ProtectedRoute>
                <DashboardDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashmanager"
            element={
              <ProtectedRoute allowedRoles={['super_user']}>
                <DashManager />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!isDashManager && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppLayout />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;