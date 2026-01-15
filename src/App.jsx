import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Layout from './layout/layout.jsx';
import HomePage from './page/HomePage.jsx';
import LoginPage from './page/LoginPage.jsx';
import RegisterPage from './page/SignupPage.jsx';
import UserProfilePage from './page/UserProfilePage.jsx';
import ShopManage from './page/ShopManage.jsx';
import SearchPage from './page/SearchPage.jsx';
import DetailPage from './page/DetailPage.jsx';
import MyCartPage from './page/MyCartPage.jsx';
import MyOrdersPage from './page/MyOrdersPage.jsx';
import ManageOrders from './page/ManageOrders.jsx';
import AboutPage from './page/AboutPage';

function App() {
  return (
    <div>
      {/*  Toast toàn app */}
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
        <Route
          path="/user-shop"
          element={
            <Layout>
              <ShopManage />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <SearchPage />
            </Layout>
          }
        />
        <Route
          path="/products/:id"
          element={
            <Layout>
              <DetailPage />
            </Layout>
          }
        />
        <Route
          path="/my-cart"
          element={
            <Layout>
              <MyCartPage />
            </Layout>
          }
        />
        <Route
          path="/my-orders"
          element={
            <Layout>
              <MyOrdersPage />
            </Layout>
          }
        />
        <Route
          path="/manage-orders" // Đường dẫn tuỳ bạn chọn
          element={
            <Layout>
              <ManageOrders />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <AboutPage />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
