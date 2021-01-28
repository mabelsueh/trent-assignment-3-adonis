'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.string('product_name',100).notNullable().unique()
      table.string('description',200).notNullable()
      table.string('sku',45).notNullable().unique()
      // price in cents
      table.integer('price').notNullable().unsigned()
      table.integer('quantity').notNullable().unsigned()
      table.string('imgurl',200).notNullable().unique()
      table.string('category',45).notNullable().unique()

      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
