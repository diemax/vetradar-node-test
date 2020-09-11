'use strict';

const Hapi = require('@hapi/hapi');
const { Store } = require('./store');
const { Cart } = require('./Cart');
const {
  HTTP_OK,
  HTTP_CREATED,
  HTTP_NOT_FOUND,
  HTTP_BAD_REQUEST,
  HTTP_NO_CONTENT
} = require('./HttpStatuses');
const carts = [];

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
      if (!id) {
        // keep just one cart
        if (!carts.length) {
          carts.push(new Cart());
          return h
            .response(carts)
            .code(HTTP_OK);
        }
      }

      const cart = carts.find(cart => cart.id === id);

      if (!cart) {
        return h
          .response({
            message: 'Cart not found'
          })
          .code(HTTP_NOT_FOUND);
      }

      return h
        .response(cart)
        .code(HTTP_OK); 
    }
  });

  /*
  POST/PUT: add item to cart and return the entire cart
  */
  server.route({
    method: ['PUT', 'POST'],
    path: '/cart/{id}',
    handler: (request, h) => {
      const { id } = request.params;

      if (!id) {
        return h
          .response({
            message: 'Bad Request',
          })
          .code(HTTP_BAD_REQUEST);
      }

      const cart = carts.find(cart => cart.id === id);

      if (!cart) {
        return h
          .response({
            message: 'Cart not found'
          })
          .code(HTTP_NOT_FOUND);
      }

      const result = cart.addItem(request.payload);
      
      return h
        .response(result)
        .code(HTTP_CREATED);
    }
  });

  /*
  DELETE: remove an item from the cart
  */
  server.route({
    method: 'DELETE',
    path: '/cart/{id}/item/{name}',
    handler: (request, h) => {
      const { id, name } = request.params;

      if (!id || !name) {
        return h
          .response({
            message: 'Bad Request',
          })
          .code(HTTP_BAD_REQUEST);
      }

      const cart = carts.find(cart => cart.id === id);

      if (!cart) {
        return h
          .response({
            message: 'Cart not found'
          })
          .code(HTTP_NOT_FOUND);
      }

      const result = cart.deleteItem(name);

      if (!result) {
        return h
          .response({
            message: "Item not found in cart"
          })
          .code(HTTP_NOT_FOUND);
      }

      return h
        .response({
          message: 'Item deleted successfully'
        })
        .code(HTTP_NO_CONTENT)
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

init();
