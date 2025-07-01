import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useLogin() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueriesData(['user'], user); // not necessary
      navigate('/dashboard', { replace: true });
    },
    onError: (err) => {
      console.log('ERROR :', err);
      toast.error('Email or password or MAYBE BOTH are incorrect, sorry');
    },
  });
  return { login, isLoading };
}
