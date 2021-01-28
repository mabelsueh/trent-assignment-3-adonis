'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddToUserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      // alter table
      table.string('first_name', 45).notNullable()
      table.string('last_name', 45).notNullable()
      table.integer('contact').notNullable().unsigned()
      table.dropColumn('username')
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddToUserSchema
