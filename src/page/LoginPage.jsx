import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import useLogin from '../hooks/useLogin';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // hook để redirect
  const { loginMutation, isPending, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Gọi mutation login
    loginMutation(
      { email, password },
      {
        onSuccess: () => {
          // Login thành công → chuyển về homepage
          navigate('/');
        },
        onError: (err) => {
          console.error('Login failed:', err);
        },
      },
    );
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <header className="w-full px-4 sm:px-8 md:px-10 py-3 bg-white dark:bg-background-dark border-b border-solid border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4">
            <Zap className="size-6 text-primary" />
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
              E-Commerce
            </h2>
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-[#111318] dark:text-white">
              Welcome Back!
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Sign in to continue your shopping.
            </p>
          </div>

          {/* Form Login */}
          <form
            className="bg-white dark:bg-gray-900/40 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="flex flex-col">
                <p className="text-sm font-medium leading-normal pb-2 dark:text-gray-200">
                  Email Address
                </p>
                <Input
                  placeholder="john.doe@example.com"
                  type="email"
                  className="h-12 px-4 text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
            </div>

            <div>
              <label className="flex flex-col">
                <p className="text-sm font-medium leading-normal pb-2 dark:text-gray-200">
                  Password
                </p>
                <div className="relative flex w-full flex-1 items-stretch">
                  <Input
                    placeholder="Enter your password"
                    type={showPassword ? 'text' : 'password'}
                    className="h-12 px-4 text-sm pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#616f89] dark:text-gray-400"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <Eye className="size-5" />
                    ) : (
                      <EyeOff className="size-5" />
                    )}
                  </button>
                </div>
              </label>
            </div>

            {error && (
              <p className="text-red-500 text-sm">
                {error.response?.data?.message || 'Login failed'}
              </p>
            )}

            <Button
              type="submit"
              className="w-full h-12 px-4 text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90"
              disabled={isPending}
            >
              {isPending ? 'Logging in...' : 'Log In'}
            </Button>

            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              <p>
                Don't have an account?
                <Link
                  className="font-medium text-primary hover:underline ml-1"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
