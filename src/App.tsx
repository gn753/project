import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignupPage from "@/pages/SignupPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
