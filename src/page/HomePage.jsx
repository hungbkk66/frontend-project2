// pages/HomePage.jsx
import React from 'react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { ShoppingCart } from 'lucide-react'; // Icon cho nút giỏ hàng

// Dữ liệu giả định
const featuredProducts = [
  {
    name: 'Running Shoe Pro',
    price: '$120.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDnjXhL90Kh7PiyXPT6WUEHol71MNhSLjaBlTQMzlfGl3_TsL1jyemb6o77AQJSWIaHzVXq8tEBeWnfa4vGcRC7PlY3E5mqK29mZ5zEH5seYJcksCXdBLz49yza8ZF4ePbOBR7iPb5hVbdRPeECd5mUb5SF-OP4oFeIr9fk2DpkTIMmqhV3_xIq5lfaueqJ_aVzM6EA4eAecuD_9vjC1qHtcZhLnvXw5hPZRHd0VkKtt5ntMh9JHgY8qLZc7J94He7FS6ULTKcLylA',
  },
  {
    name: 'Classic Chronograph',
    price: '$250.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDXAGE5L0zbRqG6oKILFmsd6Clc1cGR9CbYmCygJFNsZmRgDri2EIWEWWFR8wp98MEl2-9UW5yyLcE4bvzWKZ-eVn3ZoZTiMOj0eyqpBSVNZW_9Aoa2KiZ2M0fJh09NbCSiCHPmkfXp3KbKLJVRkL1LH9xvZmauTaAvLaOJS22Z2FMOQJl9VG2FuQ8k5pd6t5uExxH0U32pdlz_iUTUXCT_pRPXag6KU8jL_moBjMss0y6U8IPGQj2wbKGhADtB9EIA9oQRVHxogR0',
  },
  {
    name: 'AudioMax Headphones',
    price: '$199.99',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBdD8w0Xf9QnH1m-s70vl24hV2GNRiAGqTvtYnzDdEON0AQNDDmHO0VbSwtbAHJOh27sCVlH2fOLxN1tdusm1HcPs1DkH-omwFlzHeex3Q9dbXgABwjPKnFg954KK0x7B2TILA8ABpO13eLZFyOg4D7jOK9pH0ujWhEXqyKyWX30wawBkmi4jGOxTyNOdQVIsKlmcTgbX4WA4cX7-6AkfVf7C1YsFJCfwVayaAYyB_ZGNcvGKtd8aiekRb0FDxF5xHjrRwmHUqk8Io',
  },
  {
    name: 'Wayfarer Sunglasses',
    price: '$85.50',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBentE04qAxNFzMBrep03aOGAcJT_7zKrr_iIIxnZHHmARGFQzbhRs3nmKVopi5uFMsS44hIzFJUn_UfprbgM0JGyMRCYlKByxtIrsPE4DjIJ_1Hx4BrjWfjiczlVI8L5YyI9-qAtgC3qa003mglVJA8vgJEofIYps7v7NVj0iRFBk35oGq95I6wxgd7hfVHCg8qsjmdud7mIXzUfu5kse2mmWaeBZWzsAXw6emglVU_ILBoN-I5vInRlgK4TcGiXaRcMqocN_-koM',
  },
];

const newArrivals = [
  {
    name: 'Urban Backpack',
    price: '$95.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCmyo34EVimyJ4qZxaQqjFJy8-P0vFoa6Q-lK7YEdOVdYULnPCGMUvI-9UPupSnf07rnhfhmJ9vbjj067e9KMMNl5qqo7vCE9IqVgVFfqFCAwJTTJ3Na3srj7VoMPh_14fAKqlXm_UHe2MpPiClxth-aX-N17CeIAvKnmAOEFA5dJmfZzZ3qL7ZlSBXF3B_1xPix-KVfFIB2M-7mvQk1m4RRvqmfWQ5FdpkVtIga7Oh4sRTqy68Ww6JBqLG81XBaYoBmAChR3F4uSs',
  },
  {
    name: 'Hydro Smart Bottle',
    price: '$55.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAX__91PWYR8JSVHDT9QvRLC4RqLo6q5XChPe5yhcoIUPkxgyu1DZY0r-qIRJbqtyz9bAIP7RG834d7jsCMZM76zFz0XpqivsxsV1g0WnDVKqAeD6yDCjkbHLR9GuAqk1l97V-i9cXkqIwO0v8EkSff71NPsE9UayMMFYbnTdK9wXPHu4sjdmo5Y3V9YNFsIv8pjc8JoOMTgoh_YmVI6Sbioid2vMTQ2IylAs833-6VGZSfSapjdCKmsh2KhPQVcIHLD1xLj9OHZLc',
  },
  {
    name: 'LED Desk Lamp',
    price: '$79.99',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDhAcIZuSQx1vE2KLHjGlR5-_4tKkzWKZkv3g1UIIxP_0lKI2kEPEo2Yhp-z3jwWGmHij2bdsrgSdi6kEdzbfjecqz1YoOjvY8DRxjn86U3K8PiCc1tcmPrcTM4IbgzenotQ-0Mc7dxA3OWO1Fj6XaOQe_TWeF_8anJO0rTHv_VxpmXWf7f4Ngv4ia9Raxliz6ajdJiPucy6bVgBKcxMP31tVrh6afJ9Den94MVq2XCtnM2gZVaiG0fFf99FVLqyUYDlixDo3A-CsA',
  },
  {
    name: 'Retro Casual Sneakers',
    price: '$110.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB8gGnPTR-EA1KnBc8EZhxQlCYgqwl17bPw0Xn8v5go6wWnl4Iv59MLJZVuoS12y0gsI4AKg5XlbFCIvgheK-68mY4Dp0mAHOhUfkzlcIpU5bdr0nS-5B8a6DMWQgSaZgXWbxRf-qFNx3tt2yLFy8a_O7QQthoPf6PydfhWkNurn4zKPQPGcSR4Jn_Y-di45D3UN-DzgLnBeb6wE8BecQ-fz8mXpGsSlg2B7b9JbepLKFmjltVa1kILPi6_-YWxNHOvLJv-Ubp0wpQ',
  },
];

// Component Card Sản phẩm lặp lại nhiều lần
const ProductCard = ({ product }) => (
  <div className="group flex flex-col gap-2">
    <div className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
      <img
        className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
        alt={product.name}
        src={product.image}
      />
      {/* Nút Thêm giỏ hàng */}
      <Button
        variant="default"
        size="icon"
        className="absolute bottom-3 right-3 size-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <ShoppingCart className="size-5" />
      </Button>
    </div>
    <h3 className="font-semibold text-charcoal dark:text-light-gray">
      {product.name}
    </h3>
    <p className="text-primary font-bold">{product.price}</p>
  </div>
);

const HomePage = () => {
  return (
    <main className="flex-1">
      {/* HeroSection */}
      <section className="w-full @container">
        <div className="@[480px]:p-4 lg:p-6">
          <div
            className="flex min-h-[60vh] max-h-[720px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4 text-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAGAi260WpM2MPCvTwIpNWMIwYv5iuYgYrbcB21_5cYXTY23TSftBoe3W2GI4pDWSErDaZGVzeF98j6MsWUZyZIiuewdyUuRRDmQyKys6fMsCWvB4GS5D0ycphNcCl8dKPdiP-M-LtvfFdUalFKfHBVYOL_PDyQKj7nMdTZuBPAbFTVY-v_rIu4yQX8oscEO0Vn5G9rAe3diz-kl32rm74y4Fk5nWi1UM1aEpCMlQwjCUa1u1luKd0pynrgL2pRwMLlJD_VjmLFY-A")`,
            }}
          >
            <div className="flex flex-col gap-4 max-w-2xl">
              <h1 className="text-white text-4xl font-black leading-tight tracking-tighter @[480px]:text-6xl">
                Effortless Style, Delivered
              </h1>
              <p className="text-white/90 text-base font-normal leading-normal @[480px]:text-lg">
                Discover our new collection of timeless pieces, crafted with
                quality and designed for the modern wardrobe.
              </p>
            </div>
            <Button size="lg">
              <span>Shop Now</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Category Showcase Section */}
      <section className="py-10 sm:py-16">
        <div className="px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
          <h2 className="text-charcoal dark:text-light-gray text-2xl sm:text-3xl font-bold leading-tight tracking-tight px-4 pb-6">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
            {/* Các ô Category (giữ nguyên cấu trúc HTML/CSS gốc để giữ hiệu ứng hình ảnh) */}
            <div className="group relative overflow-hidden rounded-lg aspect-[3/4]">
              <div
                className="bg-cover bg-center flex flex-col justify-end p-4 h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 60%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBdgFFHeyxkwCTqF56a0rBZCGMkqL5jXtuNQiiOaZnMcLPWJEkF-UvpFSIqfql5_oR8PP8ZBA-ql9TvhzWeLOiSy8CVhCyjSffmofDRLR1pnJIaihUZyJutMpmQnN_5TFadX3AwjP4wlzPAU_gu-sYOL_brfEnEUBToJw573WZWgGaCCDWvYv8qhzaPAEgRz9XESa8NJ9yYGqbVLqEW8Tr936ojJnn_A9VKUwznYtacuNYxzTef5WXPQSJCjhh2I7F8ABsq56vIbaE")`,
                }}
              >
                <p className="text-white text-lg font-bold">Men's Wear</p>
              </div>
              <Link className="absolute inset-0" to="#"></Link>
            </div>
            <div className="group relative overflow-hidden rounded-lg aspect-[3/4]">
              <div
                className="bg-cover bg-center flex flex-col justify-end p-4 h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 60%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuC2qNTOmL-xFGGyPorxlSr2QjfpgEnU40i1X9leOQitJnqdwN4tdW2GRdKU8qUSIyBiyT_elLa7mIKziHYc7ZMRo5JiwW9m8oDdDHaxU6KXRzaHNJE7sspTe0fAz4ZUC-VjWfdoGsNKsZPzIBStIFH4o8uBYTGXC-k-cvXohzYWMbVOMj381j9navyPcTdzTqA3RemuVd4sSZ20i3uIpvfrxXVIwbKTHOwrq0MQInwyIxMiAeY0ua1TV5i92Vv542n3eKZLqkg2EoE")`,
                }}
              >
                <p className="text-white text-lg font-bold">Women's Fashion</p>
              </div>
              <Link className="absolute inset-0" to="#"></Link>
            </div>
            <div className="group relative overflow-hidden rounded-lg aspect-[3/4]">
              <div
                className="bg-cover bg-center flex flex-col justify-end p-4 h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 60%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCrDN97oJkvXKMzdXSFWOCLshfFXDkFB786OzlYDYMsWLUP0Hu65gbWhKayznABELEuMosrMZGgxANtEVVLG2rsWLgs82_slE5gkavCZvjcm-WFkxqPeDsO46erYHnzyznUkK7TQEk7wiGVoa4e9TI4nKnn2w29KdYE5LlwNwTwxQxn0MmFA6jKMcaPCN-U3utgsjZNAaVyc9J9GbQLY3Qc7s3xPN_bRg2jVwWsjKAnWD_6WOwTxh-CrVX0wNfWMnrrlAkQ9uXNh4M")`,
                }}
              >
                <p className="text-white text-lg font-bold">Electronics</p>
              </div>
              <Link className="absolute inset-0" to="#"></Link>
            </div>
            <div className="group relative overflow-hidden rounded-lg aspect-[3/4]">
              <div
                className="bg-cover bg-center flex flex-col justify-end p-4 h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 60%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBfCbssId2ISd_zzyHYA3ZciYq-atNWjbwon6r_pCU5dlvYH7PFB1scq9B8Sdx3vVGE-4BpTYVq3ds5pw8PgpSfSgCyyXZ9zCt0Bs2byKwrLvKMVoawgit73mJci37-PEG8fU6Rf2tqaXtX_PPprES-aDYAIpvwJScwWEUrG9gjKIye5WDoDc6BhOEjIK7h4_ZwbORmNFaBoNgac7VfzqYmQmwm2CkfrmTwUD4xdYhKnvNaYZQ0_EBbcv46TPZHg2FZM7q0jD6YLDs")`,
                }}
              >
                <p className="text-white text-lg font-bold">Home & Decor</p>
              </div>
              <Link className="absolute inset-0" to="#"></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-10 sm:py-16">
        <div className="px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
          <h2 className="text-charcoal dark:text-light-gray text-2xl sm:text-3xl font-bold leading-tight tracking-tight px-4 pb-6">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {featuredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-10 sm:py-16 bg-gray-100 dark:bg-charcoal/50">
        <div className="px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
          <h2 className="text-charcoal dark:text-light-gray text-2xl sm:text-3xl font-bold leading-tight tracking-tight px-4 pb-6">
            New Arrivals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {newArrivals.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
