import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router"
import "./index.css"
import App from "./App.tsx"
import { AuthContextProvider } from "./context/AuthContext.tsx"
import { SignIn } from "./Views/SignIn.tsx"
import { SignUp } from "./Views/SignUp.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<SignUp />} />
          <Route path="/" element={<App />} />
          <Route path="dashboard" element={<App />} />
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>
)
