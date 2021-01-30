'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserAddressSchema extends Schema {
  up () {
    this.create('user_addresses', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id')

      table.integer('address_id').unsigned().notNullable()
      table.foreign('address_id').references('addresses.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_addresses')
  }
}

module.exports = UserAddressSchema
