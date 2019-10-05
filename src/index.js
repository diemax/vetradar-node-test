'use strict';

const Hapi = require('@hapi/hapi');
const {Store} = require('./store');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Unicorn Vet Group LLC. store API';
    }
  });

  server.route({
    method: 'GET',
    path: '/store',
    handler: (request, h) => {
      return Store;
    }
  });

  /*
  GET: return cart contents
  should contain items in cart, qty of each item and total price formatted to 2 decimal points

  {id} is optional, if no id is passed-in you need to create a new cart with unique id
  if id is passed-in find the cart with that id, handle when cart is not found
  */
  server.route({
    method: 'GET',
    path: '/cart/{id?}',
    handler: (request, h) => {
      const id = request.params.id || null;


      return `implement cart GET on id: ${id}`;
    }
  });

  /*
  POST/PUT: add item to cart and return the entire cart
  */
  server.route({
    method: ['PUT', 'POST'],
    path: '/cart/{id}',
    handler: (request, h) => {
      const {id} = request.params;

      return `implement cart POST/PUT on id: ${id}`;
    }
  });

  /*
  DELETE: remove an item from the cart
  */
  server.route({
    method: 'DELETE',
    path: '/cart/{id}',
    handler: (request, h) => {
      const {id} = request.params;

      return `implement cart DELETE on id: ${id}`;
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

init();
