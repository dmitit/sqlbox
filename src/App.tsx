import { RootProviders } from './app/RootProviders';
import Home from './pages/Home';

export default function App() {
   return (
      <RootProviders>
         <Home />
         <h1 className="text-custom-blue">hello world</h1>
      </RootProviders>
   );
}
