import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DocumentUpload from './components/DocumentUpload';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import DocumentStorage from './components/DocumentStorage';
import TaxCalculator from './components/TaxCalculator';
import HowItWorks from './components/HowItWorks';
import ITRGuide from './components/ITRGuide';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/documentUpload' element={<DocumentUpload />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/documentStorage' element={<DocumentStorage />} />
        <Route path='/taxCalculator' element={<TaxCalculator />} />
        <Route path='/how' element={<HowItWorks />} />
        <Route path='/itr-guide' element={<ITRGuide />} />
      </Routes>
    </Router>
  );
}

export default App;