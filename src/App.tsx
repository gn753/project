import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignupPage from "@/pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "@/pages/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
