import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function UseDeleteBooking() {
  const queryClient = useQueryClient();
  const { isLoading: isDeletingBooking, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success('Booking is successfully deleted!');
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
    },

    onError: (err) => {
      toast.err(err.message);
    },
  });

  return { isDeletingBooking, deleteBooking };
}
