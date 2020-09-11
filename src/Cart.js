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
      let alreadyInCart = false;

      this.items = this.items.map(item => {
        if (item.name === name) {
          alreadyInCart = true;
          return {
            ...item,
            qty: item.qty + 1
          }
        }
        return item;
      });

      if (!alreadyInCart) {
        this.items.push({
          name,
          price,
          qty: 1
        });
        this.total = this.round(this.total + price);
        return this;
      }

    this.updateTotal();
    return this;
  }

  /**
   * Deletes an item from the cart by name
   */
  deleteItem({ name }) {
    const found = this.items.find(item => item.name === name);

    if (!found) {
      return false;
    }

    this.items = this.items.filter(item => {
      return item.name !== name;
    });
    this.updateTotal();
    return this;
  }

  /**
   * Calculates the cart total
   * 
   * @returns void
   */
  updateTotal() {
    const total = this.items.reduce((sum, item) => {
      return sum + (item.price * item.qty);
    }, 0);

    this.total = this.round(total)
  }
  
  /**
   * Helper - Rounds a number to two decimal places
   * https://stackoverflow.com/a/15762794
   * @param dec 
   * 
   * @returns number
   */
  round(dec) {
    return Number(dec.toFixed(2));
  } 
}

module.exports = {
  Cart
}