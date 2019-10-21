import Cart from './cart';
import { pipe, mapProps } from '@synvox/rehook';
import { useQuery } from '@apollo/react-hooks';
import { GET_CART_ITEMS } from './cartQuery';

const cartHOC = mapProps(props => {
  console.log('Cart Props', props);

  return {
    cartQuery: useQuery(GET_CART_ITEMS),
  };
});

const enhance = pipe(
  cartHOC,
  Cart
);

export default enhance;
