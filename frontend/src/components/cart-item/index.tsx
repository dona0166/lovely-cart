import { ChangeEvent, FC, useEffect, useState } from 'react';
import CartItemComponent from './cart-item';

const OPTIONS = ['size', 'color', 'material'];

const CartItem: FC<ICartItemProps> = (props) => {
  const { cartItem } = props;
  const [newQuantity, setNewQuantity] = useState(cartItem.quantity);

  //update input value to be up to date with last quantity
  useEffect(() => {
    setNewQuantity(cartItem.quantity);
  }, [cartItem.quantity]);

  const getRedableChoices = () => {
    const choice = cartItem.choice;
    let redableChoices = [];
    for (let option of OPTIONS) {
      if (choice && choice.hasOwnProperty(option)) {
        redableChoices.push(
          <div className="cart-item-choice">
            {option}: {choice[option]}
          </div>,
        );
      }
    }
    return <div className="cart-item-choices">{redableChoices}</div>;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewQuantity(Number(e.target.value));
  };

  return (
    <CartItemComponent
      {...props}
      newQuantity={newQuantity}
      setNewQuantity={handleChange}
      redableChoices={getRedableChoices()}
      cartItem={{ ...cartItem, price: Number(cartItem.price.toFixed(2)) }}
    />
  );
};

export default CartItem;
