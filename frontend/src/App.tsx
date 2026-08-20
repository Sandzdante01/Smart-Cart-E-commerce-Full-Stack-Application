import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { StoreProvider } from './contexts/StoreContext';
import { CustomerLayout } from './components/layout/CustomerLayout';
import { AccountLayout } from './components/layout/AccountLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Categories } from './pages/Categories';
import { Deals } from './pages/Deals';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { Wishlist } from './pages/Wishlist';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { NotFound } from './pages/NotFound';

import { AccountOverview } from './pages/account/Overview';
import { AccountProfile } from './pages/account/Profile';
import { AccountOrders } from './pages/account/Orders';
import { OrderDetails } from './pages/account/OrderDetails';
import { AccountReviews } from './pages/account/Reviews';
import { AccountAddresses } from './pages/account/Addresses';
import { AccountSettings } from './pages/account/Settings';

import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminProducts } from './pages/admin/Products';
import { AdminProductForm } from './pages/admin/ProductForm';
import { AdminCategories } from './pages/admin/Categories';
import { AdminOrders } from './pages/admin/Orders';
import { AdminCustomers } from './pages/admin/Customers';
import { AdminReviews } from './pages/admin/Reviews';
import { AdminAnalytics } from './pages/admin/Analytics';
import { AdminSettings } from './pages/admin/Settings';

export function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<CustomerLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:slug" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute role="customer" />}>
              <Route path="/account" element={<AccountLayout />}>
                <Route index element={<AccountOverview />} />
                <Route path="profile" element={<AccountProfile />} />
                <Route path="orders" element={<AccountOrders />} />
                <Route path="orders/:orderId" element={<OrderDetails />} />
                <Route path="reviews" element={<AccountReviews />} />
                <Route path="addresses" element={<AccountAddresses />} />
                <Route path="settings" element={<AccountSettings />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>

          <Route element={<ProtectedRoute role="admin" />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/new" element={<AdminProductForm />} />
              <Route path="products/:productId/edit" element={<AdminProductForm />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="reviews" element={<AdminReviews />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Route>
          </Route>
        </Routes>

        <Toaster
          position="bottom-right"
          richColors
          toastOptions={{
            style: {
              borderRadius: '12px',
              fontFamily: 'Inter, system-ui, sans-serif'
            }
          }} />
        
      </BrowserRouter>
    </StoreProvider>);

}