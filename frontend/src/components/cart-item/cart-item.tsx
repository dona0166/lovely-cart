import { FC, ReactElement } from 'react';

import './cart-item.styles.css';

const CartItemComponent: FC<ICartItemComponentProps> = ({
  cartItem,
  updateItem,
  removeItem,
  redableChoices,
  newQuantity,
  setNewQuantity,
}): ReactElement => {
  const { choice, name, imageSrc, quantity, price } = cartItem;
  return (
    <div className="card-item-wrapper">
      <div className="cart-item-container">
        <img src={imageSrc} />
        <div className="cart-item-details">
          <span>{name} </span>
          <span> Quantity: {quantity} </span>
          <span> price: ${price} </span>
        </div>
      </div>
      {redableChoices}
      <div className="cart-item-operations">
        <button onClick={() => removeItem(choice)} className="cart-item-button">
          Remove
        </button>
        <input
          className="cart-item-input"
          onChange={(e) => setNewQuantity(e)}
          type="text"
          value={newQuantity}
        />
        <button
          onClick={() => updateItem(choice, newQuantity ? newQuantity : quantity)}
          className="cart-item-button"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default CartItemComponent;
