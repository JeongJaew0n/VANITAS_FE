import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import { AppProviders } from '@/app/providers';
import { router } from '@/app/router';
import '@/shared/styles/globals.css';

async function enableMocking() {
  if (import.meta.env.VITE_USE_MOCK !== 'true') {
    return;
  }

  const { worker } = await import('@/shared/api/mock/browser');
  await worker.start({
    onUnhandledRequest: 'bypass',
  });
}

await enableMocking();

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>,
);
