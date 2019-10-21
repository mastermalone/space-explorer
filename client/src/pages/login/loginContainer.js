import Login from './login';
import { pipe, mapProps } from '@synvox/rehook';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from './loginQuery';

const loginHOC = mapProps(props => {
  const client = useApolloClient();
  console.log('Login Props', props);

  return {
    loginQuery: useMutation(LOGIN_USER, {
      onCompleted({ login }) {
        localStorage.setItem('token', login);
        client.writeData({ data: { isLoggedIn: true } });
      },
    }),
  };
});

const enhance = pipe(
  loginHOC,
  Login
);

export default enhance;
