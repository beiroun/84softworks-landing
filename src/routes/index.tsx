// Copyright (c) 2026 Andrei Baranov (84softworks). All rights reserved. Published for reference only - see LICENSE.
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  Outlet,
  ScrollRestoration
} from 'react-router-dom';
import Home from '../pages/Home/Home';
import Products from '../pages/Products/Products';

/** Shared shell: a new page opens at its top, back/forward returns to where the reader was. */
const SiteLayout = () => (
  <>
    <Outlet />
    <ScrollRestoration />
  </>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<SiteLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  )
);

export default router;
