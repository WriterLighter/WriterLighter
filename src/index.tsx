import { injectGlobal } from 'emotion';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'regenerator-runtime';
import App from './views/App';

injectGlobal`
  html, body, #app {
    width: 100%;
    height: 100%;
    margin: 0;
  }
`;

ReactDOM.render(<App />, document.getElementById('app'));
