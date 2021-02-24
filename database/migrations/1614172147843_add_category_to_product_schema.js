'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddCategoryToProductSchema extends Schema {
  up () {
    this.table('products', (table) => {
      // alter table
      table.string('category',45).notNullable()
    })
  }

  down () {
    this.table('products', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddCategoryToProductSchema
