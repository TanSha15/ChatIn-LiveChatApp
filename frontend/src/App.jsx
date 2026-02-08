import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import NotificationPage from "./pages/NotificationPage";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import OnboardingPage from "./pages/OnboardingPage";

import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";


const App = () => {
  const { isLoading, authUser } = useAuthUser();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />;

  return (
    <>
      <Routes>
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            !isAuthenticated ? (
              <Navigate to="/login" replace />
            ) : !isOnboarded ? (
              <Navigate to="/onboarding" replace />
            ) : (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            )
          }
        />

        <Route
          path="/notifications"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <NotificationPage/>
              </Layout>
            ) : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnboarded ? <CallPage /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded  ? (
              <Layout showSidebar={false}>
                <ChatPage/>
              </Layout>
            ): <Navigate to="/login" replace />
          }
        />

        {/* Onboarding */}
        <Route
          path="/onboarding"
          element={
            !isAuthenticated ? (
              <Navigate to="/login" replace />
            ) : isOnboarded ? (
              <Navigate to="/" replace />
            ) : (
              <OnboardingPage />
            )
          }
        />

        {/* Public Routes */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
          }
        />

        <Route
          path="/signup"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <SignUpPage />
          }
        />
      </Routes>

      <Toaster />
    </>
  );
};

export default App;