import { SCButton } from '@uhgenie7/ui';
import { useRouter } from 'next/router';

export default function Docs() {
  const router = useRouter();
  return (
    <div>
      <h1>Docs</h1>
      <SCButton onClick={() => router.push('/recoil')}>?</SCButton>
    </div>
  );
}
