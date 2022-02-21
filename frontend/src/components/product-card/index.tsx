import { ChangeEvent, FC, ReactElement, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/actionCreators';
import ProductCardComponent from './product-card';

import './product-card.styles.css';

const OPTIONS = ['color', 'material', 'size'];

const ProductCard: FC<IProductCardProps> = (props): ReactElement => {
  const { product } = props;
  const dispatch = useDispatch();
  const [targetVariants, setTargetVariants] = useState<ITargetVariant[] | []>([]);

  const handleSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    //track selected boxes
    const inputValue = JSON.parse(e.target.value);

    if (inputValue) {
      setTargetVariants((prevValue: SetStateAction<ITargetVariant[] | []>) => {
        if (prevValue && prevValue.length > 0) {
          const found = (prevValue as ITargetVariant[]).find(
            (v: ITargetVariant) => v.id === inputValue.id,
          );
          if (found) {
            found[inputValue.type] = inputValue.value;
            const newValue = (prevValue as ITargetVariant[]).filter((v) => v.id !== inputValue.id);
            return [...newValue, found];
          } else {
            return [
              ...(prevValue as ITargetVariant[]),
              {
                parentId: inputValue.parentId,
                id: inputValue.id,
                [inputValue.type]: inputValue.value,
              },
            ];
          }
        }
        return [
          {
            parentId: inputValue.parentId,
            id: inputValue.id,
            [inputValue.type]: inputValue.value,
          },
        ];
      });
    }
  };

  const handleClick = (v: IVariant) => {
    //use tracking to update cart
    const lastTarget = targetVariants.find((tv) => tv.id === v.id);
    if (lastTarget) dispatch(addToCart(lastTarget));
  };

  const disableButton = (selected: any) => {
    //use tracking to disabled button when
    // 1) not all the options are selected
    // 2) it's parent `Product` is  discontinued
    // 3) it's quantity is =< than 0
    // 4) variant is discontinued
    let buttonDisabled = true;
    const disableTarget = targetVariants.find((tv) => tv.id === selected.id);
    const selectedVariant = product.variants.find((v) => v.id === selected.id);
    if (disableTarget && selectedVariant && selected.id === selectedVariant.id) {
      const types = selectedVariant.selectableOptions.map((so) => so.type);
      let typesCount = 0;
      for (let type of types) {
        if (disableTarget.hasOwnProperty(type)) typesCount++;
      }

      if (
        typesCount === types.length &&
        !product.isDiscontinued &&
        selectedVariant.quantity > 0 &&
        !selectedVariant.isDiscontinued
      )
        buttonDisabled = false;
    }

    return buttonDisabled;
  };

  //show oos if discontinued
  const buttonContent = (variant: any) => {
    const v = product.variants.find((v) => v.id === variant.id);

    if (product.isDiscontinued) return 'Product out of stock';
    if (v && (v?.isDiscontinued || v.quantity === 0)) return 'Variant out of stock';

    return 'Add to cart';
  };

  const getSelectables = () => {
    let result: any = [];

    for (let v of product.variants) {
      result.push(
        <div key={v.id} className="product-variant">
          Variant {v.id}
        </div>,
      );
      for (let option of OPTIONS) {
        let selectablesByType = v.selectableOptions.filter((so: ISelectable) => so.type === option);

        if (selectablesByType.length > 0) {
          result.push(
            <div key={`${v.id}-${option}`} className="product-selector">
              <select onChange={handleSelection}>
                <option
                  value={JSON.stringify({
                    parentId: product.id,
                    id: v.id,
                    type: selectablesByType[0].type,
                    value: selectablesByType[0].value,
                  })}
                >
                  Select {option}:
                </option>
                {selectablesByType.map((sbt: ISelectable) => (
                  <option
                    key={`${v.id}-${sbt.type}-${sbt.value}`}
                    value={JSON.stringify({
                      parentId: product.id,
                      id: v.id,
                      type: sbt.type,
                      value: sbt.value,
                    })}
                  >
                    {sbt.value}
                  </option>
                ))}
              </select>
            </div>,
          );
        }
      }
      result.push(
        <button
          disabled={disableButton(v)}
          onClick={() => handleClick(v)}
          className="product-button"
        >
          {buttonContent(v)}
        </button>,
      );
    }
    return <>{result}</>;
  };

  return <ProductCardComponent {...props} selectables={getSelectables()} />;
};

export default ProductCard;
