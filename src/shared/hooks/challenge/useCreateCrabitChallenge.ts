import { useMutation } from '@tanstack/react-query';
import { UseMutationCustomOptions } from '../../types/common';
import { createCrabitChallenge } from '../../apis/challenge';

function useCreateCrabitChallenge(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createCrabitChallenge,
    ...mutationOptions,
  });
}

export default useCreateCrabitChallenge;
