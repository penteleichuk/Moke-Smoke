import { useMutation } from '@tanstack/react-query';
import { forgotApi } from './../../../api/forgotApi';

export const useForgot = () => {
  const { mutate, isPending, error, reset } = useMutation({
    mutationFn: forgotApi.sendToken,
  });

  return { mutate, isLoading: isPending, isError: !!error, reset };
};
