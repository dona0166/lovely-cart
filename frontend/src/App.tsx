import { useContext, useEffect, useState } from 'react';

import { CartContext } from './cart-context';

import Cart from './components/cart';
import ProductCard from './components/product-card';
import Navigation from './components/navigation/navigation';
import { getProducts } from '../src/store/actionCreators';
import { useTypedSelector } from '../src/hooks/useTypeSelector';

import './App.css';
import { useDispatch } from 'react-redux';

/* const TEMPORARY_ITEMS = [
  {
    id: 1,
    name: 'Hat',
    description:
      'Fashion moves so quickly that, unless you have a strong point of view, you can lose integrity.',
    imageSrc:
      'https://media.istockphoto.com/photos/hat-on-white-background-picture-id526131500?b=1&k=20&m=526131500&s=170667a&w=0&h=TVhckgzmxLZ6b1V74eel7XbFy73tldESzBcH0ZG6g0c=',
  },
  {
    id: 2,
    name: 'Shirt',
    description: 'Fashion never stops. There is always the new project, the new opportunity.',
    imageSrc:
      'https://media.istockphoto.com/photos/blank-white-tshirt-front-with-clipping-path-picture-id482948743?b=1&k=20&m=482948743&s=170667a&w=0&h=DetzN8rTsgQDTyBDSWvc7gUNz0gae0CUQecM-KNN3WY=',
  },
]; */

const App = () => {
  const dispatch = useDispatch();
  const { isOpen } = useContext(CartContext);
  const { products } = useTypedSelector((state) => state.inventory);
  const { items } = useTypedSelector((state) => state.cart);

  //replaced hard coded with fetched products
  useEffect(() => {
    async function fetchItems() {
      await dispatch(getProducts());
    }
    fetchItems();
  }, []);

  return (
    <div className="App">
      <Navigation />
      {isOpen ? <Cart items={items} /> : null}
      <div className="products-listing">
        {products.map((productItem) => (
          <ProductCard key={productItem.id} product={productItem} />
        ))}
      </div>
    </div>
  );
};

export default App;
