const { v4: uuid } = require('uuid');

class Cart {
  constructor() {
    this.id = uuid();
    this.items = [];
    this.total = 0;
  }

  /**
   * Add a new item to the cart or increase the qty
   * If the item already exists (by name)
   * @param {name, price}  
   */
  addItem({ name, price }) {

  }

  /**
   * Deletes an item from the cart
   */
  deleteItem({ name }) {

  }
  
  /**
   * Helper - Rounds a number to two decimal places
   * @param dec 
   * 
   * @returns number
   */
  round(dec) {

  } 
}

module.exports = {
  Cart
}