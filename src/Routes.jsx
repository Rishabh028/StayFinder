import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "pages/NotFound";
import ProtectedRoute from "components/ProtectedRoute";
import HomePage from "pages/homepage";

// Lazy load all other pages
const AboutPage = React.lazy(() => import("pages/about-page"));
const UserDashboard = React.lazy(() => import("pages/user-dashboard"));
const SignInPage = React.lazy(() => import("pages/sign-in"));
const SignUpPage = React.lazy(() => import("pages/sign-up"));
const SearchResults = React.lazy(() => import("pages/search-results"));
const BookingFlow = React.lazy(() => import("pages/booking-flow"));
const HotelDetails = React.lazy(() => import("pages/hotel-details"));
const OwnerPortal = React.lazy(() => import("pages/owner-portal"));
const AdminDashboard = React.lazy(() => import("pages/admin-dashboard"));
const ContactSupportCenter = React.lazy(() => import("pages/contact-support-center"));
const WishlistPage = React.lazy(() => import("pages/wishlist"));
const SettingsPage = React.lazy(() => import("pages/settings"));

const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<div className="w-full h-screen flex items-center justify-center font-bold text-lg">Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/booking-flow" element={<BookingFlow />} />
        
        {/* FIX: Changed to a dynamic route to accept a hotel ID */}
        <Route path="/hotel-details/:id" element={<HotelDetails />} />
        
        <Route path="/contact-support-center" element={<ContactSupportCenter />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/user-dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        <Route path="/owner-portal" element={<ProtectedRoute><OwnerPortal /></ProtectedRoute>} />
        <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        
        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
  );
};

export default ProjectRoutes;
