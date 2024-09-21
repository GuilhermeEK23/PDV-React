import './App.css';
import ProductsProvider from './contexts/ProductsContext.js';
import Pdv from './pages/Pdv.js';

function App() {
  return (
    <div className="app">
      <div className='content'>
        <ProductsProvider>
          <Pdv />
        </ProductsProvider>
      </div>
    </div>
  );
}

export default App;