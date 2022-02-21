import { FC } from 'react';

const ProductCardComponent: FC<IProductCardComponentProps> = ({
  product: { name, defaultImage, description },
  selectables,
}) => {
  //fixed image src
  return (
    <div className="product-card-container">
      <div className="product-card-details-container">
        <img src={defaultImage} />
        <div className="product-card-details">
          <span className="product-name">{name} </span>
          <span className="product-description"> {description} </span>
        </div>
      </div>
      <div className="product-card-selectables-container">{selectables}</div>
    </div>
  );
};

export default ProductCardComponent;
