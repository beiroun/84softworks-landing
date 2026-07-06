import { RouterProvider } from 'react-router-dom';
import router from './routes';

/**
 * Root application component wiring the router.
 * Auth/context providers are intentionally omitted — this is a public
 * static landing with no backend yet.
 */
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
