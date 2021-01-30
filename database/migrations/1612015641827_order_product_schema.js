'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderProductSchema extends Schema {
  up () {
    this.create('order_products', (table) => {
      table.increments()
      table.integer('order_id').unsigned().notNullable()
      table.foreign('order_id').references('orders.id')

      table.integer('product_id').unsigned().notNullable()
      table.foreign('product_id').references('products.id')


      table.timestamps()
    })
  }

  down () {
    this.drop('order_products')
  }
}

module.exports = OrderProductSchema
