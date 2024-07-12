import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Index() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  } else {
    redirect('/blobs');
  }
}
