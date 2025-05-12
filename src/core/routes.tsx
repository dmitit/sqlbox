import DefaultLayout from '@/layouts/DefaultLayout';
import SandboxLayout from '@/layouts/sandbox/SandboxLayout';
import ContactPage from '@/pages/contact/ContactPage';
import HomePage from '@/pages/home/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';
import SandboxEditorPage from '@/pages/sandbox/editor/SandboxEditorPage';
import SandboxFlowPage from '@/pages/sandbox/flow/SandboxFlowPage';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter(
   [
      {
         path: '/',
         element: <DefaultLayout />,
         children: [
            { index: true, element: <HomePage /> },
            { path: 'contact', element: <ContactPage /> },
            { path: '*', element: <NotFoundPage /> },
         ],
      },
      {
         path: '/sandbox',
         element: <SandboxLayout />,
         children: [
            { path: 'editor', element: <SandboxEditorPage /> },
            { path: 'flow', element: <SandboxFlowPage /> },
         ],
      },
   ],
   { basename: '/' },
);
