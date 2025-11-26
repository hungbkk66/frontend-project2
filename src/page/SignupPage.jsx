import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import useSignUp from '../hooks/useSignUp'; // giả sử bạn đã có hook này

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { signupMutation, error, isPending } = useSignUp();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn reload page
    signupMutation(formData, {
      onSuccess: () => {
        // Chuyển về homepage sau khi signup thành công
        navigate('/');
      },
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-background-light dark:bg-background-dark overflow-x-hidden">
      <div className="flex flex-1 w-full items-center justify-center">
        <form
          className="flex w-full max-w-md flex-col gap-8 p-6 sm:p-8 lg:p-12 bg-white dark:bg-gray-900/40 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800"
          onSubmit={handleSubmit}
        >
          {/* Tiêu đề */}
          <div className="flex flex-col gap-3 text-center">
            <div className="flex items-center gap-2 justify-center text-[#111318] dark:text-white">
              <Zap className="size-8 text-primary" />
              <p className="text-4xl font-black leading-tight tracking-[-0.033em]">
                Create Your Account
              </p>
            </div>
            <p className="text-[#616f89] dark:text-gray-400 text-base font-normal leading-normal">
              Join us to discover and shop the latest trends.
            </p>
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-4">
            <Input
              name="name"
              placeholder="Full Name / Username"
              value={formData.name}
              onChange={handleChange}
              className="h-14 p-[15px]"
            />
            <Input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="h-14 p-[15px]"
            />
            <div className="relative flex items-stretch">
              <Input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className="h-14 p-[15px] rounded-r-none border-r-0 pr-2"
              />
              <Button
                type="button"
                variant="ghost"
                className="text-[#616f89] dark:text-gray-400 border border-[#dbdfe6] dark:border-gray-700 bg-white dark:bg-background-dark px-4 rounded-r-lg h-14"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Eye className="size-5" />
                ) : (
                  <EyeOff className="size-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="h-14 px-6 text-base font-medium text-white bg-primary hover:bg-primary/90 transition-colors duration-200"
            disabled={isPending}
          >
            {isPending ? 'Signing Up...' : 'Sign Up'}
          </Button>

          {/* Link Login */}
          <p className="text-center text-base font-normal text-[#616f89] dark:text-gray-400">
            Already have an account?
            <Link
              className="font-medium text-primary hover:underline ml-1"
              to="/login"
            >
              Login
            </Link>
          </p>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error.message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
