import {registerApplication, start} from 'single-spa'

registerApplication(
  // Name of our single-spa application
  'home',
  // Our loading function
  () => import('./src/home.app.js'),  // Our activity function
  () =>
    location.pathname.startsWith('/home')
);

start()