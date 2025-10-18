import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./context/AuthContext";
import ProjectRoutes from "./Routes";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <ProjectRoutes />
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
