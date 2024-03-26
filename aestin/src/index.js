import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './services/i18n';
import { AuthContextProvider } from './context/AuthContext'
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import { CurrencyProvider } from './context/currencyContext';
import { ProductsProvider } from './context/ProductsContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe("pk_test_51OvYqXSC9p9zTKDtNKgPzr37xuwtpsBOVRPXlARmp320TMX7u9nGuSOmv5iJ8BTY8WOUSPpyvJnLAiIcy3aw8ADO00nn7Xk0Gb")
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CurrencyProvider>
      <ProductsProvider>
        <AuthContextProvider>
          <WishlistProvider>
            <CartProvider>
              <Elements stripe={stripePromise}>
                <App />
              </Elements>
            </CartProvider>
          </WishlistProvider>
        </AuthContextProvider>
      </ProductsProvider>
    </CurrencyProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
