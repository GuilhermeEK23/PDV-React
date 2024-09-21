import './App.css';
import ModaisProvider from './contexts/ModaisContext.js';
import ProductsProvider from './contexts/ProductsContext.js';
import Pdv from './pages/Pdv.js';

function App() {
  return (
    <div className="app">
      <div className='content'>
        <ProductsProvider>
          <ModaisProvider>
            <Pdv />
          </ModaisProvider>
        </ProductsProvider>
      </div>
    </div>
  );
}

export default App;