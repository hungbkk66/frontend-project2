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

export const getProductDetail = async (id) => {
  const res = await axiosInstance.get(`/products/${id}`);
  return res.data.product;
};

export const createReview = async (data) => {
  // data = { productId, orderId, rating }
  const res = await axiosInstance.post('/products/rate', {
    productId: data.productId,
    orderId: data.orderId,
    star: data.rating, // Truyền số sao (1-5)
  });
  return res.data;
};

// 20 sản phẩm giá CAO nhất
export const getTopExpensiveProducts = async () => {
  const res = await axiosInstance.get('/products/sort/top-expensive');
  return res.data.products;
};

// 20 sản phẩm giá THẤP nhất
export const getTopCheapestProducts = async () => {
  const res = await axiosInstance.get('/products/sort/top-cheapest');
  return res.data.products;
};

export const getTopRatedProducts = async () => {
  const res = await axiosInstance.get('/products/sort/top-rated');
  return res.data.products;
};

// search api

export const searchProducts = async ({ keyword = '', category = '' }) => {
  const res = await axiosInstance.get('/products/search', {
    params: {
      keyword,
      category,
    },
  });

  return res.data.products;
};

export const getProductsByCategoryName = async (categoryName) => {
  const res = await axiosInstance.get(`/products/category/${categoryName}`);
  return res.data;
};

// cart api

export const addToCartApi = async ({ productId, quantity = 1 }) => {
  const res = await axiosInstance.post('/cart/add', {
    productId,
    quantity,
  });

  return res.data;
};

export const getMyCart = async () => {
  const res = await axiosInstance.get('/cart/me');
  return res.data;
};

export const getCartGroupedByShop = async () => {
  const res = await axiosInstance.get('/cart/group-by-shop');
  return res.data;
};

export const removeCartItem = async (cartItemId) => {
  const res = await axiosInstance.delete(`/cart/item/${cartItemId}`);
  return res.data;
};

// order api

export const createOrdersFromCart = async (itemIds) => {
  const res = await axiosInstance.post('/orders/from-cart', {
    itemIds,
  });
  return res.data;
};

export const getMyOrders = async () => {
  const res = await axiosInstance.get('/orders/my-orders');
  return res.data.orders;
};

export const getShopOrders = async () => {
  const res = await axiosInstance.get('/orders/shop-orders');
  return res.data.orders;
};

export const updateOrderStatus = async ({ orderId, status }) => {
  // Gọi API: PUT /api/orders/:id/status
  const res = await axiosInstance.put(`/orders/${orderId}/status`, { status });
  return res.data;
};

// category api

export const getAllCategoryNames = async () => {
  const res = await axiosInstance.get('/categories/names');
  return res.data.data;
};

export const getCategoryIdByName = async (categoryName) => {
  const res = await axiosInstance.get(`/categories/id/${categoryName}`);
  return res.data.data;
};
