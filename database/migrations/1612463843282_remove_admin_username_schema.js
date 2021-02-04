'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RemoveAdminUsernameSchema extends Schema {
  up () {
    this.table('admins', (table) => {
      // alter table
      table.dropColumn('username')
    })
  }

  down () {
    this.table('admins', (table) => {
      // reverse alternations
    })
  }
}

module.exports = RemoveAdminUsernameSchema
