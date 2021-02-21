'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DropAdminFromProductSchema extends Schema {
  up () {
    this.table('products', (table) => {
      // alter table
      table.dropColumn('quantity')
      table.dropForeign('admin_id')
      table.dropColumn('admin_id')
    })
  }

  down () {
    this.table('products', (table) => {
      // reverse alternations
    })
  }
}

module.exports = DropAdminFromProductSchema
