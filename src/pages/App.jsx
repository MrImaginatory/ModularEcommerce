import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../layout/Layout'
import LandingPage from './LandingPage';
import CollectionPage from './CollectionPage';
import ProductDetails from './ProductDetailsPage';
import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<NotFound/>} />
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/collections/:dynamicCollectionName" element={<CollectionPage />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          {/* Add more routes here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
