// Copyright (c) 2026 Andrei Baranov (84softworks). All rights reserved. Published for reference only - see LICENSE.
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate
} from 'react-router-dom';
import Home from '../pages/Home/Home';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </>
  )
);

export default router;
