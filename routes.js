/* eslint-disable-next-line */
const routes = require("next-routes");
module.exports = routes()
  /* list of static pages */
  // .add('about', '/about', 'static/about')
  // .add('plus', '/plus', '/plus')
  // .add('premium', '/premium', '/premium')
  .add('redeem', '/redeem', '/redeem')
  .add('redeemitem', '/redeem/:id', '/redeemitem')
  .add('shipping', '/redeem/:id/confirm', '/shipping')
  .add('login', '/login', '/login')
  .add('quiz', '/quiz', '/quiz')
  .add('history', '/history', '/history')
  .add('verify', '/verify', '/verify')
  .add('index', '/');
