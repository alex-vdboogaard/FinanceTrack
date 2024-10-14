//global css styles
import './App.css'

//routes
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//components
import Sidebar from './components/navigation/sidebar'

//pages
import Home from './pages/home/Home';
import NotFound from './pages/utility/NotFound';
import Assets from './pages/assets/Assets';
import BankAccounts from './pages/bank-accounts/BankAccounts'

function App() {
  return (
    <Router>
      <>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/overview" element={<Home />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/bank-accounts" element={<BankAccounts />} />
          {/*Catch not existent routes:*/}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </Router>
  )
}

export default App
