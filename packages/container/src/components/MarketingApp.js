import React, { useEffect, useRef } from 'react';
import { mount } from 'marketing/MarketingApp'
import { useHistory } from 'react-router-dom';


export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
   const { onParentNavigate } = mount(ref.current, { // onParentNavigate - path from the mount child App
     initialPath: history.location.pathname, // application current pathname / Adding Initial State to Memory History
     onNavigate: ({ pathname: nextPathname }) => { // onNavigate - Container navigation in Marketing
      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
     }
   });

   history.listen(onParentNavigate); // any time any change of browser history we call onParentNavigate
  }, []);

  return <div ref={ref}></div>
}