import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CartPage from './components/CartPage';
import PaymentPage from './components/PaymentPage';
import LandingPage from './components/LandingPage'; 
import ProductDetails from './components/ProductDetail';
import OrderSuccess from './components/OrderSuccess';
import MyOrders from './components/MyOrders';
import OrderDetails from './components/OrderDetails';
import UserProfile from './components/UserProfile';
import ProductList from './components/ProductList';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/cart" element={<CartPage />} /> 
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route path="/order-success" element={<OrderSuccess/>}/>
        <Route path="/orders" element={<MyOrders />} />
        <Route path='/order-details' element={<OrderDetails/>}/>
        <Route path='/profile' element={<UserProfile/>}/>
        <Route path='/product' element={<ProductList/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
