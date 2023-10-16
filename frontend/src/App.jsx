import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePage from './pages/home-page/HomePage';
import LoginPage from './pages/login-page/LoginPage';
import SearchPage from './pages/search-page/SeacrhPage';
import RegisterPage from './pages/register-page/RegisterPage';
import NotFoundPage from './pages/notFound-page/NotFoundPage';
import ProductPage from './pages/product-page/ProductPage';
import UserProfilePage from './pages/userProfile-page/UserProfilePage';
import AddProductPage from './pages/addProduct-page/AddProductPage';
import OrderManagementPage from './pages/orderManagement-page/OrderManagementPage';
import EditUserPage from './pages/editUser-page/EditUserPage';
import SeeOrdersPage from './pages/see-orders-page/SeeOrdersPage';
import ExchangeSetPage from './pages/exchangeSet-page/ExchangeSetPage';
import SeeAcceptedProductOrder from './pages/see-accepted-product-order/SeeAcceptedProductOrder';
import AddReviewPage from './pages/addReview-page/AddReviewPage';

function App () {
    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Routes>
                <Route path='/product/addProduct' element={<AddProductPage/>} />
                <Route path='/order/exchangeSet/:idOrder' element={<ExchangeSetPage/>} />
                <Route path='/order/addReview/:idOrder' element={<AddReviewPage/>} />
                <Route path='/order/accepted/:idOrder' element={<SeeAcceptedProductOrder/>}/>
                <Route path='/user/edit' element={<EditUserPage/>} />
                <Route path='/user/orders' element={<SeeOrdersPage/>}/>
                <Route path='/user/orders/:sellerUser' element={<OrderManagementPage/>} />
                <Route path='/user/profile/:idUser' element={<UserProfilePage/>}/>
                <Route path='search?/product/:idProduct' element={<ProductPage/>}/>
                <Route path='/user/login' element={<LoginPage/>} />
                <Route path='/user/create' element={<RegisterPage/>} />
                <Route path='/search/:category?:price?:name?:location?' element={<SearchPage/>}/>
                <Route path='/' element={<HomePage/>} />
                <Route path='/*' element={<NotFoundPage/>} />
            </Routes>
        </>
    );
}

export default App;
