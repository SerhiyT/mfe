import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMemoryHistory, createBrowserHistory } from 'history';

// Mount function to start up the app
const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
  // createMemoryHistory - creates an in-memory history object that does not interact with the browser URL.
  //           This is useful when you need to customize the history used for server-side rendering
  //           When we click on link, memory history will be updated and automaticaly call onNavigate
  // defaultHistory - If we are in development and in isolation using navigations inside "auth" for ex.
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath]
  });

  if (onNavigate) {
    history.listen(onNavigate); // whenever URL changes automaticaly call onNavigate 
  }

  ReactDOM.render(<App onSignIn={onSignIn} history={history}/>, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    }
  }
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth-dev-root');

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// We are running through container
// and we should export the mount function
export { mount };
