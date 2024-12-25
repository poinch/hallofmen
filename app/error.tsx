'use client';

import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className='flex min-h-[400px] flex-col items-center justify-center gap-4'>
      <AlertCircle className='h-8 w-8 text-destructive' />
      <h2 className='text-xl font-semibold'>Qualcosa è andato storto!</h2>
      <Button onClick={() => reset()}>Riprova</Button>
    </div>
  );
}
