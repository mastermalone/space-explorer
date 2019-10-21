import Profile from './profile';
import { pipe, mapProps } from '@synvox/rehook';
import { useQuery } from '@apollo/react-hooks';
import { GET_MY_TRIPS } from './profileQuery';

const profileHOC = mapProps(props => {
  console.log('Profile props', props);
  // network only policy means that this will not come from the cached values from apollo
  return {
    profileQuery: useQuery(GET_MY_TRIPS, {
      fetchPolicy: 'network-only',
    }),
  };
});

const enhance = pipe(
  profileHOC,
  Profile
);

export default enhance;
