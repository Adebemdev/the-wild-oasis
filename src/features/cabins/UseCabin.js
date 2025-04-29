import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabin';

// custom hoook for the cabins data.
export function UseCabin() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });

  return { isLoading, error, cabins };
}
