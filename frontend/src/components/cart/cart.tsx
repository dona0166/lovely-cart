import { FC } from 'react';

const CartComponent: FC<ICartComponentProps> = ({ renderedItems, closeCart, totalPrice }) => {
  return (
    <div className="cart-modal">
      <div className="cart-container">
        <button className="close-button" onClick={closeCart}>
          →
        </button>
        <div className="cart-items-container">{renderedItems}</div>
        {
          <div className="total-container">
            <span>Total: ${totalPrice}</span>
          </div>
        }
      </div>
    </div>
  );
};

export default CartComponent;
