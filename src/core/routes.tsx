import DefaultLayout from '@/layouts/DefaultLayout';
import SandboxLayout from '@/layouts/SandboxLayout';
import ContactPage from '@/pages/contact/ContactPage';
import HomePage from '@/pages/home/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';
import SandboxDefaultPage from '@/pages/sandbox/SandboxDefaultPage';
import SandboxFlowPage from '@/pages/sandbox/SandboxFlowPage';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter(
   [
      {
         path: '/',
         element: <DefaultLayout />,
         children: [
            { index: true, element: <HomePage /> },
            { path: 'contact', element: <ContactPage /> },
            {
               path: 'sandbox',
               element: <SandboxLayout />,
               children: [
                  { index: true, element: <SandboxDefaultPage /> },
                  { path: 'flow', element: <SandboxFlowPage /> },
               ],
            },
            { path: '*', element: <NotFoundPage /> },
         ],
      },
   ],
   { basename: '/' },
);
