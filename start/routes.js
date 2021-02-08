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

Route.on('/').render('admin/login')

// register and login admin

// group /admin routes
Route.group( () => {
  Route.get('/register', 'AdminController.register')
  Route.post('/register', 'AdminController.processRegister').as('register')
  Route.get('/login', 'AdminController.login').as('loginpage')
  Route.post('/login', 'AdminController.processLogin').as('login')
  Route.get('/logout', 'AdminController.logout').as('logout')
}).prefix('/admin')


// on successful admin login
// pls group with .middleware('auth:admin')
Route.get('/users', 'UserController.index').as('users').middleware('auth:admin')


// product routes
Route.get('products', 'ProductController.index').as('productshome').middleware('auth:admin')

// render edge file on route
// Route.on('/home').render('home')

// render message on :id
// Route.get('/user/:id', ({params}) => {
//   return `The ID number is: ${params.id}`
// })
