'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      // price in cents
      table.integer('total_price').unsigned().notNullable()
      table.date('date').notNullable()
      // fk insertion
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id')

      table.integer('product_id').unsigned().notNullable()
      table.foreign('product_id').references('products.id')

      table.integer('address_id').unsigned().notNullable()
      table.foreign('address_id').references('addresses.id')

      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
