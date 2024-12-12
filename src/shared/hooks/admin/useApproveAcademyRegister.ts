import { useMutation } from '@tanstack/react-query';
import { approveAcademyRegister } from '../../apis/admin';
import { UseMutationCustomOptions } from '../../types/common';

function useApproveAcademyRegister(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: approveAcademyRegister,
    throwOnError: true,
    ...mutationOptions,
  });
}

export default useApproveAcademyRegister;
