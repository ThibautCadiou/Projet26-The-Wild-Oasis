import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { UpdateCurrentUser } from '../../services/apiAuth';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: UpdateCurrentUser,
    onSuccess: () => {
      toast.success('User account successfully updated');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (err) => {
      toast.success('New Cabin NOT successfully created');
    },
  });

  return { updateUser, isUpdating };
}
