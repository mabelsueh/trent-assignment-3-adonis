'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AmendProductsSchema extends Schema {
  up () {
    this.table('products', (table) => {
      // alter table
      table.dropColumn('category')

    })
  }

  down () {
    this.table('products', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AmendProductsSchema
