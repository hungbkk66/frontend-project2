import React from 'react';
import {
  Truck,
  ShieldCheck,
  Headset,
  Heart,
  Users,
  Target,
} from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative bg-white border-b overflow-hidden">
        <div className="container mx-auto px-4 py-20 lg:py-32 text-center max-w-4xl relative z-10">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
            Câu chuyện của chúng tôi
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Mang trải nghiệm mua sắm <br />{' '}
            <span className="text-primary">Tuyệt vời nhất</span> đến bạn
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Shop Online không chỉ là một nơi để mua sắm, đó là nơi chúng tôi kết
            nối những sản phẩm chất lượng nhất từ các nhà bán hàng uy tín đến
            tay người tiêu dùng thông thái.
          </p>
          {/* Đã xóa các nút bấm điều hướng ở đây */}
        </div>

        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-50"></div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <h3 className="text-4xl font-bold text-gray-900 mb-2">10k+</h3>
              <p className="text-gray-500 font-medium">Sản phẩm đa dạng</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl font-bold text-gray-900 mb-2">50k+</h3>
              <p className="text-gray-500 font-medium">Khách hàng tin dùng</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl font-bold text-gray-900 mb-2">99%</h3>
              <p className="text-gray-500 font-medium">Phản hồi tích cực</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl font-bold text-gray-900 mb-2">24/7</h3>
              <p className="text-gray-500 font-medium">Hỗ trợ khách hàng</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative">
              {/* Placeholder Image */}
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Our Team"
                className="rounded-2xl shadow-2xl z-10 relative"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full -z-0"></div>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <div className="flex items-center gap-2 text-primary font-bold">
                <Target className="w-5 h-5" />
                <span>Sứ mệnh của chúng tôi</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Kết nối giá trị thực đến cuộc sống hiện đại
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Chúng tôi tin rằng mua sắm trực tuyến không chỉ là giao dịch, mà
                là sự tin tưởng. Sứ mệnh của Shop Online là xây dựng một nền
                tảng thương mại điện tử minh bạch, nơi người mua dễ dàng tìm
                thấy sản phẩm ưng ý và người bán có thể phát triển thương hiệu
                bền vững.
              </p>
              <ul className="space-y-3 mt-4">
                {[
                  'Cam kết hàng chính hãng 100%',
                  'Hoàn tiền nếu phát hiện hàng giả',
                  'Giao hàng nhanh chóng toàn quốc',
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tại sao chọn Shop Online?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Chúng tôi không ngừng nỗ lực để mang lại những trải nghiệm tốt
              nhất cho bạn thông qua công nghệ và dịch vụ tận tâm.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gray-50 text-center">
              <div className="w-14 h-14 mx-auto bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
                <Truck className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Giao Hàng Siêu Tốc</h3>
              <p className="text-gray-500">
                Hệ thống logistics thông minh giúp đơn hàng đến tay bạn nhanh
                chóng trong 2-4 ngày làm việc.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gray-50 text-center">
              <div className="w-14 h-14 mx-auto bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Thanh Toán An Toàn</h3>
              <p className="text-gray-500">
                Tích hợp cổng thanh toán MoMo bảo mật tuyệt đối. Thông tin của
                bạn luôn được mã hóa an toàn.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gray-50 text-center">
              <div className="w-14 h-14 mx-auto bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
                <Headset className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Hỗ Trợ 24/7</h3>
              <p className="text-gray-500">
                Đội ngũ chăm sóc khách hàng luôn sẵn sàng lắng nghe và giải
                quyết mọi thắc mắc của bạn bất cứ lúc nào.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TEAM SECTION */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <div className="flex items-center justify-center gap-2 text-primary font-bold mb-4">
            <Users className="w-5 h-5" />
            <span>Đội ngũ</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Gặp gỡ những người sáng lập
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 mb-4 overflow-hidden">
                  <img
                    src={`data:image/jpeg;base64,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`}
                    alt="Team Member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-bold">
                  Nguyễn Văn {String.fromCharCode(64 + item)}
                </h4>
                <p className="text-primary text-sm mb-3">
                  Co-Founder & Developer
                </p>
                <p className="text-gray-500 text-sm">
                  Đam mê công nghệ và mong muốn xây dựng một hệ sinh thái thương
                  mại điện tử hiện đại.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FOOTER DECORATION (Thay thế cho CTA) */}
      <section className="py-20 bg-primary/5 text-center">
        <div className="container mx-auto px-4">
          <Heart className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Cảm ơn bạn đã ghé thăm
          </h2>
          <p className="text-gray-600">
            Chúng tôi hy vọng bạn sẽ tìm thấy những sản phẩm ưng ý tại Shop
            Online.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
