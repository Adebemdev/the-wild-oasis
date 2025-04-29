import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabin';
import toast from 'react-hot-toast';

// Custom hook for creating a new cabin
export function UseCreateCabin() {
  // Cache by Tanstack
  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('cabin is successfully created!'),
        queryClient.invalidateQueries({
          queryKey: ['cabins'],
        });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCabin };
}
