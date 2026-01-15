// components/Footer.jsx
import React from 'react';
import { Mail, Zap } from 'lucide-react'; // Icons
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';

const Footer = () => {
  return (
    <footer className="w-full bg-charcoal text-light-gray/70">
      <Separator />
      <div className="w-full max-w-full px-6 sm:px-10 lg:px-20 py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Column 1: Logo & Socials */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center mb-4">
              <Zap className="size-6 text-primary mr-2" />
              <h3 className="text-lg font-bold text-white">StyleSphere</h3>
            </div>
            <p className="text-sm mb-4">
              Điểm đến của bạn cho sản phẩm và phong cách sống hiện đại, chất
              lượng cao. Khám phá phong cách của bạn cùng chúng tôi.
            </p>
            <div className="flex space-x-4">
              <a className="hover:text-primary transition-colors" href="#">
                insta
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                face
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                tiktok
              </a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  About Us
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Careers
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  FAQ
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Returns
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Contact Us: hung9aytt@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
          <p>© 2024 StyleSphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
