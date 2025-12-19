import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Layout from './layout/layout.jsx';
import HomePage from './page/HomePage.jsx';
import LoginPage from './page/LoginPage.jsx';
import RegisterPage from './page/SignupPage.jsx';
import UserProfilePage from './page/UserProfilePage.jsx';
import ShopManage from './page/ShopManage.jsx';

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
      </Routes>
    </div>
  );
}

export default App;
