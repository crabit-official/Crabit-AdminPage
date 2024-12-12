import { useMutation } from '@tanstack/react-query';

import { UseMutationCustomOptions } from '../../types/common';
import { requestPresignedURL } from '../../apis/image';

function useRequestPresignedURL(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: requestPresignedURL,
    ...mutationOptions,
  });
}

export default useRequestPresignedURL;
