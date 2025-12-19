import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, Save, X, Loader2 } from 'lucide-react';

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { userProfileSchema } from '../lib/schema';
import useAuthUser from '../hooks/useAuthUser';
import useUpdateProfile from '../hooks/userHook/useUpdateProfile';

const UserProfilePage = () => {
  // 🔹 Lấy user từ backend
  const { authUser, isLoading } = useAuthUser();
  // update user
  const updateProfileMutation = useUpdateProfile();
  // 🔹 React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(userProfileSchema),
  });

  // 🔹 Đổ data từ backend vào form
  useEffect(() => {
    if (authUser) {
      reset({
        name: authUser.name || '',
        email: authUser.email || '',
        location: authUser.location || '',
        language: authUser.language || '', // ✅ lấy đúng từ backend
        description: authUser.description || '',
      });
    }
  }, [authUser, reset]);

  // 🔹 Submit form
  const onSubmit = async (data) => {
    if (!authUser?._id) return;

    await updateProfileMutation.mutateAsync({
      userId: authUser._id,
      data,
    });

    reset(data);
  };

  // 🔹 Cancel form
  const handleCancel = () => {
    if (authUser) {
      reset({
        name: authUser.name || '',
        email: authUser.email || '',
        location: authUser.location || '',
        language: authUser.language || '',
        description: authUser.description || '',
      });
    }
  };

  // 🔹 Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-background-light dark:bg-background-dark min-h-screen">
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col items-center gap-8 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          {/* ===== Avatar + Name ===== */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              {/* ✅ Avatar lấy từ profilePic */}
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-32"
                style={{
                  backgroundImage: `url("${
                    authUser?.profilePic || '/avatar-placeholder.png'
                  }")`,
                }}
              />

              <label
                className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
                htmlFor="photo-upload"
              >
                <Camera className="text-white size-8" />
                <input className="sr-only" id="photo-upload" type="file" />
              </label>
            </div>

            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-bold text-[#111318] dark:text-white">
                {authUser?.name}
              </h1>
              <p className="text-[#616f89] dark:text-slate-400">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* ===== Form ===== */}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Name */}
              <div className="sm:col-span-2">
                <label className="flex flex-col">
                  <p className="text-sm font-medium pb-2">Name</p>
                  <Input {...register('name')} />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </label>
              </div>

              {/* Email */}
              <div className="sm:col-span-2">
                <label className="flex flex-col">
                  <p className="text-sm font-medium pb-2">Email</p>
                  <Input {...register('email')} disabled />
                </label>
              </div>

              {/* Location */}
              <label className="flex flex-col">
                <p className="text-sm font-medium pb-2">Location</p>
                <Input {...register('location')} />
              </label>

              {/* ✅ Language hiển thị đúng từ backend */}
              <label className="flex flex-col">
                <p className="text-sm font-medium pb-2">Language</p>
                <select
                  {...register('language')}
                  className="h-12 rounded-lg border p-3 dark:bg-slate-800"
                >
                  <option value="english">English</option>
                  <option value="vietnamese">Vietnamese</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                </select>
              </label>

              {/* Description */}
              <div className="sm:col-span-2">
                <label className="flex flex-col">
                  <p className="text-sm font-medium pb-2">Description</p>
                  <textarea
                    {...register('description')}
                    rows="4"
                    className="rounded-lg border p-3 dark:bg-slate-800"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </label>
              </div>
            </div>

            {/* ===== Actions ===== */}
            <div className="flex justify-end gap-3 border-t pt-6 mt-6">
              {isDirty && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleCancel}
                >
                  <X className="size-4 mr-2" />
                  Cancel
                </Button>
              )}

              <Button
                type="submit"
                disabled={
                  isSubmitting || !isDirty || updateProfileMutation.isPending
                }
              >
                {updateProfileMutation.isPending ? (
                  <Loader2 className="size-4 mr-2 animate-spin" />
                ) : (
                  <Save className="size-4 mr-2" />
                )}
                {updateProfileMutation.isPending
                  ? 'Updating...'
                  : 'Update Profile'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default UserProfilePage;
