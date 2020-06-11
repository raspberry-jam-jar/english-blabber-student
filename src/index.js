import 'core-js/features/map';
import 'core-js/features/set';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import bridge from '@vkontakte/vk-bridge';
import App from './App';

// Init VK  Mini App
bridge.send('VKWebAppInit');

ReactDOM.render(
  <Router>
    <Route exact path="/"><App /></Route>
  </Router>,
  document.getElementById('root'),
);
if (process.env.NODE_ENV === 'development') {
  import('./eruda').then(() => {});
}
