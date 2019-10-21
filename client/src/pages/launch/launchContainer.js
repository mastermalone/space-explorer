import Launch from './launch';
import { useQuery } from '@apollo/react-hooks';
import { pipe, mapProps } from '@synvox/rehook';
import { GET_LAUNCH_DETAILS } from './launchQuery';

const launchHOC = mapProps(props => {
  const { launchId } = props;
  console.log('Mapping Launch', launchId);

  return {
    launchQuery: useQuery(GET_LAUNCH_DETAILS, {
      variables: { launchId },
    }),
  };
});

const enhance = pipe(
  launchHOC,
  Launch
);

export default enhance;
