import { FC, useContext, useEffect, useState } from 'react';

import { CartContext } from '../../cart-context';

import Cart from '../cart';
import ProductCard from '../product-card';
import Navigation from '../navigation/navigation';
import { getProducts } from '../../../src/store/actionCreators';
import { useTypedSelector } from '../../../src/hooks/useTypeSelector';
import AppComponent from './app';

import './app.css';
import { useDispatch } from 'react-redux';

const App: FC<IAppProps> = (props) => {
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

  const renderProductsListing = () => {
    return (
      <div className="products-listing">
        {products.map((productItem) => (
          <ProductCard key={productItem.id} product={productItem} />
        ))}
      </div>
    );
  };

  return (
    <AppComponent
      {...props}
      items={items}
      isOpen={isOpen}
      productsListing={renderProductsListing}
    />
  );
};

export default App;
