import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createEditCabin } from '../../services/apiCabin';

export function UseEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('cabin is successfully edited'),
        queryClient.invalidateQueries({
          queryKey: ['cabins'],
        });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editCabin, isEditing };
}
