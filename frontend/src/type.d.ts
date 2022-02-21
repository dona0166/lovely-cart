interface ISelectable {
  type: string;
  value: string;
}

interface IVariant {
  id: string;
  quantity: number;
  image: string;
  isDiscontinued: boolean;
  priceCents: number;
  selectableOptions: ISelectable[];
}

interface IProduct {
  id: string;
  name: string;
  isDiscontinued: boolean;
  description: string;
  defaultImage: string;
  variants: IVariant[];
}

//replaced IProduct with the real one from type.d.ts
interface IProductCardProps {
  product: IProduct;
}

interface IProductCardComponentProps extends IProductCardProps {
  selectables: Element<any, any>;
}

interface ITargetVariant {
  parentId?: string;
  id: string;
  color?: string;
  material?: string;
  size?: string;
  [key: string]: string;
}

interface ICartItem {
  id?: string | number;
  name: string;
  imageSrc: string;
  quantity: number;
  price: number;
  choice?: ITargetVariant;
}

interface ICartItemComponentProps {
  cartItem: ICartItem;
  newQuantity?: number;
  setNewQuantity?: Dispatch<SetStateAction<number>>;
  removeItem: (choice: ICartItem.choice) => void;
  updateItem: (choice: ICartItem.choice, quantity: number) => void;
  redableChoices?: Element<any, any>;
}

interface ICartItemProps extends ICartItemComponentProps {}

interface ICartComponentProps {
  items?: ICartItem[];
  renderedItems?: any;
  totalPrice?: string;
  closeCart?: () => void;
}

interface ICartProps extends ICartComponentProps {}

interface IAppComponentProps {
  items?: ICart;
  isOpen?: boolean;
  productsListing?: Element<any, any>;
}

interface IAppProps extends IAppComponentProps {}
