import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { LangProvider } from './i18n/LangContext';
import { startSmoothScroll } from './smoothScroll';

/**
 * Root application component wiring the router.
 * Auth/context providers are intentionally omitted — this is a public
 * static landing with no backend yet. Only the language context wraps the tree.
 */
const App = () => {
  // Global smooth scroll so the scroll-linked header morph doesn't jank on Safari.
  useEffect(() => startSmoothScroll(), []);

  return (
    <LangProvider>
      <RouterProvider router={router} />
    </LangProvider>
  );
};

export default App;
