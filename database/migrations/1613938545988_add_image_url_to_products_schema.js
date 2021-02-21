'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddImageUrlToProductsSchema extends Schema {
  up () {
    this.table('products', (table) => {
      // alter table
      table.string('imgurl',200).notNullable().unique()
    })
  }

  down () {
    this.table('products', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddImageUrlToProductsSchema
