import { Outlet } from 'react-router';

import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';

export function App() {
  return (
    <div className="app-shell">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
