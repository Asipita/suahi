import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
  Outlet,
  HeadContent,
} from '@tanstack/react-router';
import Home from './page';
import './globals.css';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <HeadContent />
      <Outlet />
    </>
  ),
});
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  head: () => ({
    meta: [
      { title: 'Suahi — Keep their stories close' },
      {
        name: 'description',
        content:
          'Every family has stories worth keeping. Write the lives of your loved ones, one memory at a time.',
      },
    ],
  }),
  component: Home,
});
const router = createRouter({
  routeTree: rootRoute.addChildren([indexRoute]),
  defaultNotFoundComponent: () => (
    <main className="not-found">
      <h1>This chapter hasn’t been written.</h1>
      <a href="/">Return to Suahi →</a>
    </main>
  ),
});
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
