import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CartPage from './components/CartPage';
import PaymentPage from './components/PaymentPage';
import LandingPage from './components/LandingPage'; 
import ProductDetails from './components/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/cart" element={<CartPage />} /> 
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/product/:id" element={<ProductDetails/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
