import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '../../lib/api';
import { toast } from 'react-hot-toast';

const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success('Profile updated successfully 🎉');
      // reload authUser sau khi update
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Update profile failed');
    },
  });
};

export default useUpdateProfile;
