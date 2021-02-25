'use strict'

// require Model
const { validateAll } = use('Validator')
const User = use('App/Models/User')
const Address = use('App/Models/Address')
// const Order = use('App/Models/Order')

class UserController {
  // async index({response}){
  // always use async in front of fn name, & await before get post fetch etc stuff


  // render a view
  // adminIndex

    // create variable that gets all the users
    // const users = await User.all()

    // use foldername.filename if edge file is in subfolder
    // return view.render('user/userlist', {
      // title is data to be passed into view
      // use {}(parameter which is an object) to represent data in controller
      // & {{}} in edge file
      // title: 'List of all Users',
      // need toJSON else everything is undefined
      // users: users.toJSON()
    // })

  // }
  // for R in api
  async indexAPI({response}){
    let user = await User.query().with('addresses').fetch()
    response.json(user)
  }

  // for R in admin
  async index({view}){
    let user = await User.query().with('addresses').fetch()
    return view.render('user/userlist', {
      'user':user.toJSON()
    })
  }


  createUser({ view }) {
    return view.render('user/createuser')
  }

  async processCreate({response, request, session}){
    const rules = {
      first_name:'required',
      last_name:'required',
      email:'required|unique:users',
      contact:'required',
      password:'required|min:5',
      street:'required',
      postal_code:'required'
    }
    const messages = {
      'first_name.required':'Please provide your first name',
     'last_name.required':'Please provide your last name',
     'email.required':'Please provide your valid email',
     'email.unique':'Email has been registered before',
     'contact.required':'Please provide your contact',
     'password.required':'Please enter your password',
     'password.min':'Password should contain at least 5 characters',
     'street.required':'Please enter a street name',
     'postal_code.required':'Please enter a postal code'
    }
    let formData = request.post()
    const validation = await validateAll(formData, rules, messages)
    if(validation.fails()){
      session
        .withErrors(validation.messages())
        .flashAll()
      return response.redirect('back')
    }
    let newUser = new Users()
    newUser.first_name = formData.first_name
    newUser.last_name = formData.last_name
    newUser.email = formData.email
    newUser.contact = formData.contact
    newUser.password = formData.password

    await newUser.save()

    let newAddress = new Addresses()
    if(formData.block === null){
      newAddress.block = ""
    }
    else{
      newAddress.block = formData.block
    }

    newAddress.street = formData.street

    if(formData.floor === null){
      newAddress.floor = ""
    }
    else{
      newAddress.floor = formData.floor
    }

    if(formData.unit === null){
      newAddress.unit = ""
    }
    else{
      newAddress.unit = formData.unit
    }

    if(formData.building === null){
      newAddress.building = ""
    }
    else{
      newAddress.building = formData.building
    }

    newAddress.postal_code = formData.postal_code

    session.flash({ notification: `Account for ${newUser.email} has been created!` })
    await newAddress.save()
    await newUser.addresses().attach(newAddress.id)
    return response.route('UsersList')
  }
}

module.exports = UserController
