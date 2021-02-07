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
// should be can delete the line below
// const User = use('App/Models/User')

Route.on('/').render('admin/login')

// paul routes
Route.get('/admin/register', 'AdminController.register')
Route.post('/admin/register', 'AdminController.processRegister')
Route.get('/admin/login', 'AdminController.login');
Route.post('/admin/login', 'AdminController.processLogin')
Route.get('/admin/show', 'AdminController.show')


// login routes;
// Route.post('/home', 'UserController.home')
// .middleware('auth:admin')

// user routes
// test controller
Route.get('/users', 'UserController.index').as('users').middleware('auth:admin')


// product routes
Route.get('products', 'ProductController.index').middleware('auth:admin')

// render edge file on route
// Route.on('/home').render('home')

// render message on :id
// Route.get('/user/:id', ({params}) => {
//   return `The ID number is: ${params.id}`
// })
