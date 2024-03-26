import React, { useEffect, useState } from 'react';
import { useAuthContext } from './hooks/useAuthContext';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Spinner from './common/Spinner.jsx';
import { lazy, Suspense } from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const Home1 = lazy(() => import('./pages/Home2'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Products = lazy(() => import('./pages/Products.jsx'));
const Accessories = lazy(() => import('./pages/Accessories'));
const GetStarted = lazy(() => import('./pages/GetStarted'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Notyfy = lazy(() => import('./pages/Notyfy'));
const Otp = lazy(() => import('./pages/Otp'));
const NewPassword = lazy(() => import('./pages/NewPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const LogOut = lazy(() => import('./pages/Logout'));
const Cart = lazy(() => import('./pages/Cart'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const NewProducts = lazy(() => import('./pages/NewProducts'));
const OrderConfirmed = lazy(() => import('./pages/OrderConfirmed'));
const PaymentInformation = lazy(() => import('./pages/PaymentInformation'));
const PaymentProcess = lazy(() => import('./pages/PaymentProcess'));
const Cancel = lazy(() => import('./pages/cancel'));
const FrequencyAskedQuestion = lazy(() => import('./pages/FrequencyAskedQuestion'));
const OrderList = lazy(() => import('./pages/OrderList.jsx'));
const OrderDetail = lazy(() => import('./pages/OrderDetail.jsx'));
const ExchangItem = lazy(() => import('./pages/ExchangItem.jsx'));
const ReturnRequest = lazy(() => import('./pages/ReturnRequest.jsx'));
const CancelOrder = lazy(() => import('./pages/CancelOrder.jsx'));
const CancellationReq = lazy(() => import('./pages/CancellationReq.jsx'));
const ReturnReq = lazy(() => import('./pages/ReturnReq.jsx'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'));
const ReturnPolicy = lazy(() => import('./pages/ReturnPolicy.jsx'));
const CookieSettings = lazy(() => import('./pages/CookieSettings.jsx'));
const ClientServices = lazy(() => import('./pages/ClientServices.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));
const AppliedSuccessfully = lazy(() => import('./pages/AppliedSuccessfully.jsx'));
const AboutUs = lazy(() => import('./pages/AboutUs.jsx'));
const ContacUs = lazy(() => import('./pages/ContactUs.jsx'));
const Profile = lazy(() => import('./pages/Profile.jsx'));
const ProfileEdit = lazy(() => import('./pages/ProfileEdit.jsx'));
const DeactivateAccount = lazy(() => import('./pages/DeactivateAccount.jsx'));
const Career = lazy(() => import('./pages/Career.jsx'));
const CareerDetails = lazy(() => import('./pages/CareerDetails.jsx'));
const CareerApply = lazy(() => import('./pages/CareerApply.jsx'));


const queryClient = new QueryClient()

function App() {
  const { user, loading } = useAuthContext()
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    // Set authLoaded to true once the user context is loaded
    if (!loading) {
      setAuthLoaded(true);
    }
  }, [loading]);

  // Wait for authentication context to load before rendering
  if (!authLoaded) {
    return <div className='fixed overflow-hidden h-screen w-screen top-0 left-0 z-50 bg-white text-black'><div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[15vmin] animate-pulse'>Saint Rosario</div></div>;
  }

  return (
    <Router>
      <MainLayout>
        <Suspense fallback={<Spinner />}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home1 />} />
              <Route path="/product/:productID" element={<ProductDetails />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:categoryId/:productType" element={<Products />} />
              <Route path="/products/:searchQuery" element={<Products />} />
              <Route path="/accessories" element={<Accessories />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/" replace />} />
              <Route path="/forgot-password" element={!user ? <ForgotPassword /> : <Navigate to="/" replace />} />
              <Route path="/notify" element={<Notyfy />} />
              <Route path="/otp-confirmation" element={!user ? <Otp /> : <Navigate to="/" replace />} />
              <Route path="/new-password" element={!user ? <NewPassword /> : <Navigate to="/" replace />} />
              <Route path="/password-reset-success" element={!user ? <ResetPassword /> : <Navigate to="/" replace />} />
              <Route path="/logout" element={user ? <LogOut /> : <Navigate to="/" replace />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/new-products" element={<NewProducts />} />
              <Route path="/payment-information" element={user ? <PaymentInformation /> : <Navigate to="/login" replace />} />
              <Route path="/payment-process" element={user ? <PaymentProcess /> : <Navigate to="/login" replace />} />
              <Route path="/frequency-asked-question" element={<FrequencyAskedQuestion />} />

              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/return-policy" element={<ReturnPolicy />} />
              <Route path="/cancel" element={<Cancel />} />
              <Route path="/cookie-settings" element={<CookieSettings />} />
              <Route path="/client-services" element={<ClientServices />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContacUs />} />

              {/* order  */}
              <Route path="/orders" element={user ? <OrderList /> : <Navigate to="/login" replace />} />
              <Route path="/orders/:orderId" element={user ? <OrderDetail /> : <Navigate to="/login" replace />} />
              <Route path="/orders/cancel-order/" element={user ? <CancelOrder /> : <Navigate to="/login" replace />} />
              <Route path="/orders/exchange-item" element={user ? <ExchangItem /> : <Navigate to="/login" replace />} />
              <Route path="/orders/return-request" element={user ? <ReturnRequest /> : <Navigate to="/login" replace />} />
              <Route path="/orders/cancellation-request-success" element={user ? <CancellationReq /> : <Navigate to="/login" replace />} />
              <Route path="/orders/return-request-success" element={user ? <ReturnReq /> : <Navigate to="/login" replace />} />
              <Route path="/order-confirmed" element={user ? <OrderConfirmed /> : <Navigate to="/login" replace />} />

              {/* profile  */}
              <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" replace />} />
              <Route path="/profile/edit" element={user ? <ProfileEdit /> : <Navigate to="/login" replace />} />
              <Route path="/profile/deactivate-account" element={user ? <DeactivateAccount /> : <Navigate to="/login" replace />} />

              {/* career */}
              <Route path="/Career" element={<Career />} />
              <Route path="/Career/:jobId/:jobTitle" element={<CareerDetails />} />
              <Route path="/Career/Apply/:jobId/:jobTitle" element={<CareerApply />} />
              <Route path="/career/applied-successfully" element={<AppliedSuccessfully />} />

              {/* Fallback route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </QueryClientProvider>
        </Suspense>
      </MainLayout>
    </Router>
  );
}

export default App;