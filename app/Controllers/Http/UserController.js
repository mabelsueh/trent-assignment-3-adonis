'use strict'

// require Model
const User = use('App/Models/User')

class UserController {
  // always use async in front of fn name, & await before get post fetch etc stuff

  // render a view
  async index({view}) {
    // create variable that gets all the users
    const users = await User.all()

    // use foldername.filename if edge file is in subfolder
    return view.render('userlist', {
      // title is data to be passed into view
      // use {}(parameter which is an object) to represent data in controller
      // & {{}} in edge file
      title: 'List of all Users',
      // need toJSON else everything is undefined
      users: users.toJSON()
    })

  }
}

module.exports = UserController
