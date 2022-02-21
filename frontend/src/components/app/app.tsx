import { FC, useContext, useEffect, useState } from 'react';

import { CartContext } from '../../cart-context';

import Cart from '../cart';
import ProductCard from '../product-card';
import Navigation from '../navigation/navigation';
import { getProducts } from '../../../src/store/actionCreators';

const AppComponent: FC<IAppComponentProps> = ({ items, isOpen, productsListing }) => {
  return (
    <div className="App">
      <Navigation />
      {isOpen ? <Cart items={items} /> : null}
      {productsListing}
    </div>
  );
};

export default AppComponent;
