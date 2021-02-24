'use strict'

// require Model
const User = use('App/Models/User')
// const Address = use('App/Models/Address')
// const Order = use('App/Models/Order')

class UserController {
  // always use async in front of fn name, & await before get post fetch etc stuff

  // render a view
  async index({ view }) {
    // create variable that gets all the users
    const users = await User.all()

    // use foldername.filename if edge file is in subfolder
    return view.render('user/userlist', {
      // title is data to be passed into view
      // use {}(parameter which is an object) to represent data in controller
      // & {{}} in edge file
      // title: 'List of all Users',
      // need toJSON else everything is undefined
      users: users.toJSON()
    })

  }

  createUser({ view }) {
    return view.render('user/createuser')
  }

  async processCreate({response, request}){
    let formData = request.post()
    let newUser = new User()

    newUser.first_name = formData.first_name
    newUser.last_name = formData.last_name
    newUser.email = formData.email
    newUser.contact = formData.contact
    newUser.password = formData.password
    await newUser.save()
    // need to add address part
    response.route('users')
  }

}

module.exports = UserController
