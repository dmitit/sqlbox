import DefaultLayout from '@/DefaultLayout';
import HomePage from '@/pages/home/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter(
   [
      {
         path: '/',
         element: <DefaultLayout />,
         children: [
            { path: '/', element: <HomePage /> },
            { path: '*', element: <NotFoundPage /> },
         ],
      },
   ],
   { basename: '/' },
);
