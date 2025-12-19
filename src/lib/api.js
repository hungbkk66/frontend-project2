import { axiosInstance } from './axios';

export const signup = async (signupData) => {
  const res = await axiosInstance.post('/users/register', signupData);
  return res.data;
};

export const login = async (logindata) => {
  const res = await axiosInstance.post('/auth/login', logindata);
  return res.data;
};

export const logout = async () => {
  const response = await axiosInstance.post('/auth/logout');
  return response.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get('/auth/me');
    return res.data;
  } catch (error) {
    console.log('Error in getAuthUser:', error);
    return null;
  }
};

export const completeOnboarding = async (onboardingData) => {
  const res = await axiosInstance.post('/auth/onboarding', onboardingData);
  return res.data;
};

export const updateUser = async ({ userId, data }) => {
  const res = await axiosInstance.put(`/users/${userId}`, data);
  return res.data;
};

//shop api

export const createShop = async (formData) => {
  const res = await axiosInstance.post('/shops', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const updateShop = async ({ shopId, formData }) => {
  const res = await axiosInstance.put(`/shops/${shopId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const getMyShop = async () => {
  const res = await axiosInstance.get('/shops/me');
  return res.data.data; // ✅ chỉ trả shop object
};

export const searchShops = async ({
  address = '',
  country = '',
  searchQuery = '',
  sortOption = 'updatedAt',
  page = 1,
}) => {
  const res = await axiosInstance.get('/shops/search', {
    params: { address, country, searchQuery, sortOption, page },
  });
  return res.data;
};

// product api

export const createProduct = async (formData) => {
  const res = await axiosInstance.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const updateProduct = async ({ productId, formData }) => {
  const res = await axiosInstance.put(`/products/${productId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const getMyProducts = async () => {
  const res = await axiosInstance.get('/products/me');
  return res.data.products; // chỉ lấy mảng products
};

export const deleteProduct = async (productId) => {
  const res = await axiosInstance.delete(`/products/${productId}`);
  return res.data; // { message: 'Sản phẩm đã được xóa thành công' }
};
