import { StorageKeys } from 'constants/global';
import { useRouter } from 'next/router';

function usePrivateRoute(): void {
  const router = useRouter();

  if (!localStorage.getItem(StorageKeys.accessToken)) {
    router.push('/dashboard');
  }
}

export default usePrivateRoute;
