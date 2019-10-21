import Launches from './launches';
import { GET_LAUNCHES } from './launchesQuery';
import { useQuery } from '@apollo/react-hooks';
import { pipe, mapProps } from '@synvox/rehook';

const launchesHOC = mapProps(props => {
  console.log('Base props', props);

  return {
    launchesQuery: useQuery(GET_LAUNCHES),
  };
});

const enhance = pipe(
  launchesHOC,
  Launches
);

export default enhance;
