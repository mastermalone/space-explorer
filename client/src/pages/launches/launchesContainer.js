import LaunchesPage from './launchesPage';
import { GET_LAUNCHES } from './launchesQuery';
import { useQuery } from '@apollo/react-hooks';
import { pipe, mapProps } from '@synvox/rehook';
import useContainer from '../../services/container';

const launchesHOC = mapProps(props => {
  console.log('Base props', props);

  return {
    launchesQuery: useQuery(GET_LAUNCHES),
  };
});

const container = useContainer({
  launchesQuery: {
    hook: useQuery,
    params: GET_LAUNCHES,
  },
  launchesQuery2: {
    hook: useQuery,
    params: GET_LAUNCHES,
  },
})(LaunchesPage);

const enhance = pipe(
  launchesHOC,
  LaunchesPage
);

export default container;
// export default enhance;
