import { useMutation } from '@tanstack/react-query';
import { rejectAcademyRegister } from '../../apis/admin';
import { UseMutationCustomOptions } from '../../types/common';

function useRejectAcademyRegister(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: rejectAcademyRegister,
    throwOnError: true,
    ...mutationOptions,
  });
}

export default useRejectAcademyRegister;
