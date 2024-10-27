import { acceptAcademy, rejectAcademy } from '@apis/academy.ts';
import { queryKeys } from '@constants/keys.ts';
import { useMutation } from '@tanstack/react-query';

import type { UseMutationCustomOptions } from '@/types/query/common';

import { client } from '@/main';

function useAcceptAcademy(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: acceptAcademy,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [queryKeys.GET_ACADEMY_LIST],
      });
    },
    onError: (error) => {
      alert(error.message);
    },
    ...mutationOptions,
  });
}

function useRejectAcademy(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: rejectAcademy,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [queryKeys.GET_ACADEMY_LIST],
      });
    },
    onError: (error) => {
      alert(error.message);
    },
    ...mutationOptions,
  });
}

function useAcademy() {
  const acceptAcademyMutation = useAcceptAcademy();
  const rejectAcademyMutation = useRejectAcademy();

  return { acceptAcademyMutation, rejectAcademyMutation };
}

export default useAcademy;
