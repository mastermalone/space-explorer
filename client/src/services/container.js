import React from 'react';
import { Location } from '@reach/router';

const useContainer = hooks => PresentationalComponent => {
  let containedComponent;

  if (!hooks) {
    containedComponent = () => <PresentationalComponent />;
    return containedComponent;
  }
  const hooksArray = Object.entries(hooks);
  const combinedHooks = hooksArray.reduce((acc, [hookKey, queryObject]) => {
    if (!acc[hookKey]) {
      const { hook, params } = queryObject;
      acc[hookKey] = hook;
      if (params) {
        acc[`${hookKey}Params`] = queryObject.params;
      }
    }
    console.log('ACC', acc);
    return acc;
  }, {});

  console.log('comb', combinedHooks);
  containedComponent = () => <PresentationalComponent {...combinedHooks} />;
  return containedComponent;
};

export default useContainer;
