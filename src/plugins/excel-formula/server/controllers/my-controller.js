'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('excel-formula')
      .service('myService')
      .getWelcomeMessage();
  },

  
});
