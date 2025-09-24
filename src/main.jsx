import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import ScrollToTop from './components/ScrollToTop';
import MoodTracker from './components/MoodTracker';
import Quote from './components/Quote';
import MeditationModule from './components/MeditationModule';
import Emergency from './pages/Emergency';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import LoadingSkeleton from './components/LoadingSkeleton';

// Lazy-loaded pages
const ChatBot = lazy(() => import('./pages/ChatBot'));
const Journal = lazy(() => import('./pages/Journal'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <ScrollToTop />
        <App />
      </>
    ),
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'chat',
        element: (
          <Suspense fallback={<LoadingSkeleton />}>
            <ChatBot />
          </Suspense>
        )
      },
      {
        path: 'journal',
        element: (
          <Suspense fallback={<LoadingSkeleton />}>
            <Journal />
          </Suspense>
        )
      },
      { path: 'mood', element: <MoodTracker /> },
      { path: 'quote', element: <Quote /> },
      { path: 'meditation', element: <MeditationModule /> },
      { path: 'emergency', element: <Emergency /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
