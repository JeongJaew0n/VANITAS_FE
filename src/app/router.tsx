import { createBrowserRouter } from 'react-router';

import { App } from '@/app/App';
import { HomePage } from '@/pages/home/HomePage';
import { PlaceholderPage } from '@/pages/PlaceholderPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <PlaceholderPage title="ROUTE ERROR" />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <PlaceholderPage title="PRODUCTS" /> },
      { path: 'products/:id', element: <PlaceholderPage title="PRODUCT DETAIL" /> },
      { path: 'category/:slug', element: <PlaceholderPage title="CATEGORY" /> },
      { path: 'cart', element: <PlaceholderPage title="CART" /> },
      { path: 'wishlist', element: <PlaceholderPage title="WISHLIST" /> },
      { path: 'login', element: <PlaceholderPage title="LOGIN" /> },
    ],
  },
]);
