'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddAdminFkToProductsSchema extends Schema {
  up () {
    this.table('products', (table) => {
      // alter table
      table.integer('admin_id').unsigned().notNullable()
      table.foreign('admin_id').references('admins.id')
    })
  }

  down () {
    this.table('products', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddAdminFkToProductsSchema
