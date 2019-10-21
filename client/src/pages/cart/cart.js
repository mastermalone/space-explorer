import React, { Fragment } from 'react';

import { Header, LoadingOrError } from '../../components';
import { CartItem, BookTrips } from '../../containers';

export default function Cart({ cartQuery }) {
  const { data, loading, error } = cartQuery;

  return (
    <Fragment>
      {!loading && <Header>My Cart</Header>}
      <LoadingOrError loading={loading} error={error} />
      {!data.cartItems || !data.cartItems.length ? (
        <p data-testid='empty-message'>No items in your cart</p>
      ) : (
        <Fragment>
          {data.cartItems.map(launchId => (
            <CartItem key={launchId} launchId={launchId} />
          ))}
        </Fragment>
      )}
    </Fragment>
  );
}
