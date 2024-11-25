import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignupPage from "@/pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "@/pages/HomePage";
import PostDetailPage from "@/pages/PostDetailPage";
import PostEditPage from "@/pages/PostEditPage";
import PostCreatePage from "./pages/PostCreatePage";
import { AuthProvider } from "@/context/AuthProvider";
import { CategoriesProvider } from "@/context/CategoriesContext";

const AppContent = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/posts/:id" element={<PostDetailPage />} />
      <Route path="/posts/edit/:id" element={<PostEditPage />} />
      <Route path="/posts/create" element={<PostCreatePage />} />
    </Routes>
  );
};

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <CategoriesProvider>
            <AppContent />
          </CategoriesProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
