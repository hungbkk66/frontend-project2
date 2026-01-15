import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';

// ===== SHOP HOOKS =====
import useMyShop from '@/hooks/userShopHook/useMyShop';
import useCreateShop from '@/hooks/userShopHook/useCreateShop';
import useUpdateShop from '@/hooks/userShopHook/userUpdateShop';

// ===== PRODUCT HOOKS =====
import useCreateProduct from '@/hooks/productHook/useCreateProduct';
import useMyProducts from '@/hooks/productHook/useMyProducts';
import useDeleteProduct from '@/hooks/productHook/useDeleteProduct';
import useUpdateProduct from '@/hooks/productHook/useUpdateProduct';

// ===== CATEGORY HOOK (MỚI) =====
import useCategoryNames from '@/hooks/categoryHook/useCategoryNames'; // Giả sử bạn lưu hook ở đây

const ShopManage = () => {
  /* ================= SHOP ================= */
  const { data: shop, isLoading } = useMyShop();
  const createShopMutation = useCreateShop();
  const updateShopMutation = useUpdateShop();

  const hasShop = !!shop;

  const [shopForm, setShopForm] = useState({
    name: '',
    address: '',
    country: '',
    phone: '',
    description: '',
    image: null,
  });

  const [shopImagePreview, setShopImagePreview] = useState(null);

  useEffect(() => {
    if (shop) {
      setShopForm({
        name: shop.name,
        address: shop.address,
        country: shop.country,
        phone: shop.phone,
        description: shop.description || '',
        image: null,
      });
      setShopImagePreview(shop.logo);
    }
  }, [shop]);

  const handleShopSubmit = () => {
    const formData = new FormData();
    formData.append('name', shopForm.name);
    formData.append('address', shopForm.address);
    formData.append('country', shopForm.country);
    formData.append('phone', shopForm.phone);
    formData.append('description', shopForm.description);

    if (shopForm.image) {
      formData.append('image', shopForm.image);
    }

    if (hasShop) {
      updateShopMutation.mutate(
        { shopId: shop._id, formData },
        {
          onSuccess: () => toast.success('Update shop successfully 🎉'),
          onError: () => toast.error('Update shop failed'),
        },
      );
    } else {
      createShopMutation.mutate(formData, {
        onSuccess: () => toast.success('Create shop successfully 🎉'),
        onError: () => toast.error('Create shop failed'),
      });
    }
  };

  /* ================= PRODUCT ================= */
  // 1. Lấy danh sách Category để hiển thị Dropdown
  const { data: categories, isLoading: isCategoriesLoading } =
    useCategoryNames();

  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();
  const { data: productData, isLoading: productLoading } = useMyProducts();

  const products = productData || [];

  const [editingProduct, setEditingProduct] = useState(null);

  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    description: '',
    image: null,
  });

  const handleCreateProduct = () => {
    if (!shop) return;
    // Validate category
    if (!productForm.category) {
      toast.error('Please select a category');
      return;
    }

    const formData = new FormData();
    formData.append('name', productForm.name);
    formData.append('price', productForm.price);
    formData.append('stock', productForm.stock);
    formData.append('category', productForm.category);
    formData.append('shop', shop._id);
    formData.append('description', productForm.description);

    if (productForm.image) {
      formData.append('image', productForm.image);
    }

    createProductMutation.mutate(formData, {
      onSuccess: () => {
        toast.success('Create product successfully 🎉');
        setProductForm({
          name: '',
          price: '',
          stock: '',
          category: '',
          description: '',
          image: null,
        });
      },
      onError: () => toast.error('Create product failed'),
    });
  };

  const handleUpdateProduct = () => {
    if (!editingProduct) return;

    const formData = new FormData();
    formData.append('name', productForm.name);
    formData.append('price', productForm.price);
    formData.append('stock', productForm.stock);
    formData.append('category', productForm.category);
    formData.append('description', productForm.description);

    if (productForm.image) {
      formData.append('image', productForm.image);
    }

    updateProductMutation.mutate(
      { productId: editingProduct._id, formData },
      {
        onSuccess: () => {
          toast.success('Update product successfully 🎉');
          setEditingProduct(null);
          setProductForm({
            name: '',
            price: '',
            stock: '',
            category: '',
            description: '',
            image: null,
          });
        },
        onError: () => toast.error('Update product failed'),
      },
    );
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      {/* ================= SHOP ================= */}
      <div className="border rounded-xl p-6 space-y-4">
        <h2 className="text-2xl font-bold">
          {hasShop ? 'Shop Information' : 'Create Shop'}
        </h2>

        {shopImagePreview && (
          <img
            src={shopImagePreview}
            className="w-32 h-32 object-cover rounded border"
            alt="Shop Logo"
          />
        )}

        <Input
          placeholder="Shop name"
          value={shopForm.name}
          onChange={(e) => setShopForm({ ...shopForm, name: e.target.value })}
        />

        <Input
          placeholder="Address"
          value={shopForm.address}
          onChange={(e) =>
            setShopForm({ ...shopForm, address: e.target.value })
          }
        />

        <Input
          placeholder="Country"
          value={shopForm.country}
          onChange={(e) =>
            setShopForm({ ...shopForm, country: e.target.value })
          }
        />

        <Input
          placeholder="Phone"
          value={shopForm.phone}
          onChange={(e) => setShopForm({ ...shopForm, phone: e.target.value })}
        />

        <textarea
          className="w-full border rounded p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="Shop description..."
          value={shopForm.description}
          onChange={(e) =>
            setShopForm({ ...shopForm, description: e.target.value })
          }
        />

        <div className="space-y-2">
          <label className="text-sm font-medium">Shop Logo</label>
          <Input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setShopForm({ ...shopForm, image: file });
                setShopImagePreview(URL.createObjectURL(file));
              }
            }}
          />
        </div>

        <Button onClick={handleShopSubmit}>
          {hasShop ? 'Update Shop' : 'Create Shop'}
        </Button>
      </div>

      {/* ================= PRODUCT FORM ================= */}
      {hasShop && (
        <div className="border rounded-xl p-6 space-y-4">
          <h2 className="text-2xl font-bold">
            {editingProduct ? 'Update Product' : 'Add Product'}
          </h2>

          <Input
            placeholder="Product name"
            value={productForm.name}
            onChange={(e) =>
              setProductForm({ ...productForm, name: e.target.value })
            }
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="Price"
              value={productForm.price}
              onChange={(e) =>
                setProductForm({ ...productForm, price: e.target.value })
              }
            />

            <Input
              type="number"
              placeholder="Stock"
              value={productForm.stock}
              onChange={(e) =>
                setProductForm({ ...productForm, stock: e.target.value })
              }
            />
          </div>

          {/* --- THAY THẾ INPUT BẰNG SELECT DROPDOWN --- */}
          <div>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={productForm.category}
              onChange={(e) =>
                setProductForm({ ...productForm, category: e.target.value })
              }
              disabled={isCategoriesLoading}
            >
              <option value="">Select Category</option>
              {categories &&
                categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>

          <textarea
            className="w-full border rounded p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Product description..."
            value={productForm.description}
            onChange={(e) =>
              setProductForm({
                ...productForm,
                description: e.target.value,
              })
            }
          />

          <div className="space-y-2">
            <label className="text-sm font-medium">Product Image</label>
            <Input
              type="file"
              onChange={(e) =>
                setProductForm({ ...productForm, image: e.target.files[0] })
              }
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={
                editingProduct ? handleUpdateProduct : handleCreateProduct
              }
            >
              {editingProduct ? 'Update Product' : 'Add Product'}
            </Button>

            {editingProduct && (
              <Button
                variant="outline"
                onClick={() => {
                  setEditingProduct(null);
                  setProductForm({
                    name: '',
                    price: '',
                    stock: '',
                    category: '',
                    description: '',
                    image: null,
                  });
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      )}

      {/* ================= PRODUCT LIST ================= */}
      {hasShop && (
        <div className="border rounded-xl p-6 space-y-4">
          <h2 className="text-2xl font-bold">My Products</h2>

          {productLoading && <p>Loading products...</p>}

          {products.map((product) => (
            <div
              key={product._id}
              className="flex justify-between items-center border p-4 rounded hover:bg-gray-50 transition"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={product.imageUrl}
                  className="w-16 h-16 object-cover rounded border"
                  alt={product.name}
                />
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-gray-500">
                    Price: {product.price}đ | Stock: {product.stock}
                  </p>
                  {/* Hiển thị tên Category nếu đã populate */}
                  <p className="text-xs text-gray-400">
                    Cat: {product.category?.name || 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  className="!bg-black !text-white"
                  onClick={() => {
                    setEditingProduct(product);
                    // LOGIC QUAN TRỌNG: Kiểm tra xem category là object hay string
                    const categoryId = product.category?._id
                      ? product.category._id
                      : product.category;

                    setProductForm({
                      name: product.name,
                      price: product.price,
                      stock: product.stock,
                      category: categoryId || '',
                      description: product.description || '',
                      image: null,
                    });

                    // Cuộn lên form
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                >
                  Update
                </Button>

                <Button
                  variant="destructive"
                  onClick={() =>
                    deleteProductMutation.mutate(product._id, {
                      onSuccess: () =>
                        toast.success('Delete product successfully'),
                    })
                  }
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopManage;
