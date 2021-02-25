'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Address extends Model {
  // fn name is plural for m:n rs
  users(){
    return this.belongsToMany('App/Models/User').pivotTable('user_addresses')
  }
  orders(){
    return this.hasMany('App/Models/Order')
  }
}

module.exports = Address
