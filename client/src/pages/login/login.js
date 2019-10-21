import React, { Fragment } from 'react';
import { LoginForm, LoadingOrError } from '../../components';

const Login = ({ loginQuery }) => {
  const [login, { loading, error }] = loginQuery;

  return (
    <Fragment>
      <LoadingOrError loading={loading} error={error} />
      {!loading && <LoginForm login={login} />}
    </Fragment>
  );
};

export default Login;
