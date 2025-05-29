import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import {
  BrowserRouter,
  Route,
  Routes,
  useParams,
  Navigate,
} from "react-router-dom";

import { Analytics } from '@vercel/analytics/react';

import Auth from "./components/Auth";
import Authlog from "./components/Authlog";
import EmailVerify from "./components/Email/EmailVerify";
import Main from "./components/Main";
import Profile from "./components/Profile";
import EsewaF from "./components/esewa/EsewaFailure";
import EsewaS from "./components/esewa/EsewaSuccess";
import ResetPass from "./components/ResetPassword";
import Loader from "./components/Loader";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/AdminPaneel";
import Payment from "./components/Payment";
import { use } from "react";

const App = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  const ProtectedRoute = ({ user, children }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const url = "https://pustak-point-backend.vercel.app/api/getdata";
        const { data } = await axios.post(url, { token });
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Main token={user} />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/log" element={<Authlog />} />
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
        <Route path="/reset-password/:token" element={<ResetPass />} />
        <Route path="/:category" element={<CategoryPage />} />
    <Route path="/payment" element={<Payment />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={token}>
              <Profile user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/esewa-success"
          element={
            <ProtectedRoute user={user}>
              <EsewaS />
            </ProtectedRoute>
          }
        />
        <Route
          path="/esewa-failure"
          element={
            <ProtectedRoute user={user}>
              <EsewaF />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Analytics />
      <Footer />
    </BrowserRouter>
  );
};

const CategoryPage = () => {
  const { category } = useParams(); // Fetch category from the URL
  return <Main category={category || "all"} />; // Default to 'all' if no category is set
};

export default App;
