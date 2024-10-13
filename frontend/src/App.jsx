//global css styles
import './App.css'

//routes
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//components
import Sidebar from './components/navigation/sidebar'

//pages
import Home from './pages/home/Home';
import Transactions from './pages/transactions/Transactions';
import NotFound from './pages/utility/NotFound';
import Assets from './pages/assets/Assets';

function App() {
  return (
    <Router>
      <>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/overview" element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/assets" element={<Assets />} />
          {/*Catch not existent routes:*/}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </Router>
  )
}

export default App
