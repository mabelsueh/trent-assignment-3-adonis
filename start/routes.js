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

Route.get('/', 'AdminController.route')

// register and login admin

// group /admin routes
Route.group( () => {
  Route.get('/register', 'AdminController.register').as('registerpage')
  Route.post('/register', 'AdminController.processRegister').as('register')
  Route.get('/login', 'AdminController.login').as('loginpage')
  Route.post('/login', 'AdminController.processLogin').as('login')
  Route.get('/logout', 'AdminController.logout').as('logout')
}).prefix('/admin')


// on successful admin login
// pls group with .middleware('auth:admin')
Route.get('/users', 'UserController.index').as('users').middleware('auth:admin')

//create user
Route.get('/users/create', 'UserController.createUser').as('userscreateview').middleware('auth:admin')
Route.post('/users/create', 'UserController.processCreate').as('processCreate').middleware('auth:admin')

// product routes
Route.get('products', 'ProductController.index').as('productshome').middleware('auth:admin')
Route.get('/products/create', 'ProductController.createProduct').as('productscreateview').middleware('auth:admin')
Route.post('/products/create', 'ProductController.processCreateProduct').as('processCreateProduct').middleware('auth:admin')
Route.get('/products/update/:id', 'ProductController.update').as('updateProduct').middleware('auth:admin')
Route.post('/products/update/:id', 'ProductController.processUpdate').as('processUpdateProduct').middleware('auth:admin')
// render edge file on route
// Route.on('/home').render('home')

// render message on :id
// Route.get('/user/:id', ({params}) => {
//   return `The ID number is: ${params.id}`
// })

Route.get('cloudinary/sign', 'CloudinaryController.sign').as('cloudinary_sign')
