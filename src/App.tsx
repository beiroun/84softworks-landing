import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { LangProvider } from './i18n/LangContext';

/**
 * Root application component wiring the router.
 * Auth/context providers are intentionally omitted — this is a public
 * static landing with no backend yet. Only the language context wraps the tree.
 */
const App = () => {
  return (
    <LangProvider>
      <RouterProvider router={router} />
    </LangProvider>
  );
};

export default App;
