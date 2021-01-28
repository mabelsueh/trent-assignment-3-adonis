'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddressSchema extends Schema {
  up() {
    this.create('addresses', (table) => {
      table.increments()
      table.string('block', 10).nullable()
      table.string('street', 120).notNullable()
      table.string('floor', 10).nullable()
      table.string('unit', 10).nullable()
      table.string('building', 100).nullable()
      table.integer('postal_code').notNullable().unsigned()


      table.timestamps()
    })
  }

  down() {
    this.drop('addresses')
  }
}

module.exports = AddressSchema
