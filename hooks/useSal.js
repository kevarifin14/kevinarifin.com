import { useEffect } from 'react';
import sal from 'sal.js';

export default function useSal() {
  useEffect(() => {
    sal();
  }, []);
}
