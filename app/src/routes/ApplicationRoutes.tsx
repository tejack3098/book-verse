// src/routes/ApplicationRoutes.tsx

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { Books } from '../pages/Books';
import { Search } from '../pages/Search';
import NotFound from '../pages/NotFound';
import { Details } from '../pages/Books/Details';
import { CreateBook } from '../pages/Books/Create';
import Home from '../pages/Home';
import SignIn from '../pages/signin';
import SignUp from '../pages/signup';
import Checkout from '../pages/Checkout';
import ProtectedRoute from '../components/Auth/ProtectedRoute';
import { Cart } from '../components/Cart';
import LandingPage from '../pages/LandingPage';
import OrderConfirmation from '../pages/OrderConfirmation';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import { NavBarAdmin} from '../components/NavBarAdmin';
import UserProfile from '../pages/UserProfile';
import AdminBooksPage from '../pages/Admin/AdminBooksPage';
import OrderHistory from '../pages/OrderHistory';
import ChatComponent from '../components/Chat';

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const hideNavBarRoutes = ['/signin', '/signup', '/'];
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!hideNavBarRoutes.includes(location.pathname) && (isAdminRoute ? <NavBarAdmin /> : <NavBar />)}
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/books" element={<ProtectedRoute element={<Books />} />} />
        <Route path="/books/:id" element={<ProtectedRoute element={<Details />} />} />
        <Route path="/user-profile/:id" element={<ProtectedRoute element={<UserProfile />} />} />
        <Route path="/order-history" element={<ProtectedRoute element={<OrderHistory />} />} />
        <Route path="/search" element={<ProtectedRoute element={<Search />} />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
        <Route path="/order-confirmation" element={<ProtectedRoute element={<OrderConfirmation />} />} />
        <Route path="/checkout" element={<ProtectedRoute element={<Checkout />} />} />
        <Route path="/chat" element={<ProtectedRoute element={<ChatComponent />} />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/admin/create-book" element={<ProtectedRoute element={<CreateBook />} requiredRole="admin" />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute element={<AdminDashboard />} requiredRole="admin" />} />
        <Route path="/admin/books" element={<ProtectedRoute element={<AdminBooksPage />} requiredRole="admin" />} />
      </Routes>
    </>
  );
};

const ApplicationRoutes: React.FC = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default ApplicationRoutes;