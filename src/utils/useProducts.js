import { useQuery } from 'react-query';
import { fetchProducts } from '../services/api';

export const useProducts = () => {
  return useQuery(['products'], fetchProducts, {
    suspense: true, 
    staleTime: 5 * 60 * 1000, 
  });
};
