import { FC } from 'react';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CartItem from '../cart-item';
import { CartContext } from '../../cart-context';
import CartComponent from './cart';

import './cart.styles.css';
import { remove, update } from '../../store/actionCreators';
import { useTypedSelector } from '../../hooks/useTypeSelector';

const Cart: FC<ICartProps> = (props) => {
  const { items } = props;
  const dispatch = useDispatch();
  const { setIsOpen } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState('0');
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    setTotalPrice(getTotalPrice());
  }, [items]);

  const removeItem = (choice: any) => {
    dispatch(remove(choice));
  };

  const updateItem = (choice: any, quantity: number) => {
    dispatch(update(choice, quantity));
  };

  const renderItems = () => {
    if (items)
      return items.map((item) => (
        <CartItem key={item.id} updateItem={updateItem} removeItem={removeItem} cartItem={item} />
      ));
  };

  const getTotalPrice = () => {
    if (items) {
      //correct total price
      return items.reduce((total, { price, quantity }) => total + price * quantity, 0).toFixed(2);
    } else {
      return '0';
    }
  };

  return (
    <CartComponent
      {...props}
      renderedItems={renderItems()}
      closeCart={closeCart}
      totalPrice={totalPrice}
    />
  );
};

export default Cart;
