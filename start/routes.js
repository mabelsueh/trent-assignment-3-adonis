'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const User = use('App/Models/User')

Route.on('/').render('welcome')

// user routes
// test controller
Route.get('/users', 'UserController.index')





// render edge file on route
Route.on('/home').render('home')

// render message on :id
Route.get('/user/:id', ({params}) => {
  return `The ID number is: ${params.id}`
})
