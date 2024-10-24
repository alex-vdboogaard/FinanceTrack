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
import Sidebar from "./components/navigation/sidebar";

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
            {location.pathname !== "/login" && <Sidebar />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/overview" element={<Home />} />
                <Route path="/budget" element={<Budget />} />
                <Route path="/assets" element={<Assets />} />
                <Route path="/bank-accounts" element={<BankAccounts />} />
                <Route path="/investments" element={<Investments />} />
                <Route path="/savings" element={<Savings />} />
                <Route path="/statements" element={<Statements />} />
                {/* Catch not existent routes */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
