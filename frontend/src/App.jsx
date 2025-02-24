// Global CSS styles
import "./App.css";

// Routes
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

// Components
import Sidebar from "./components/navigation/Sidebar";
import CornerWidget from "./components/navigation/CornerWidget";

// Pages
import Login from "./pages/utility/Login";
import Home from "./pages/home/Home";
import Budget from "./pages/budget/Budget";
import BankAccounts from "./pages/bank-accounts/BankAccounts";
import Assets from "./pages/assets/Assets";
import Investments from "./pages/investments/Investments";
import Savings from "./pages/savings/Savings";
import NotFound from "./pages/utility/NotFound";
import Statements from "./pages/statements/Statements";
import CreateAccount from "./pages/utility/CreateAccount";
import FolderPage from "./pages/statements/folders/FolderPage";
import Loans from "./pages/loans/Loans";
import LoanPage from "./pages/loans/LoanPage";
import Tax from "./pages/tax/Tax";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" &&
        location.pathname !== "/create-account" && <Sidebar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/overview" element={<Home />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/loans/:id" element={<LoanPage />} />
        <Route path="/bank-accounts" element={<BankAccounts />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/savings" element={<Savings />} />
        <Route path="/statements" element={<Statements />} />
        <Route path="/statements/folder/:id" element={<FolderPage />} />
        <Route path="/tax" element={<Tax />} />
        {/* Catch not existent routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {location.pathname !== "/login" &&
        location.pathname !== "/create-account" && <CornerWidget />}
    </>
  );
}

export default App;
