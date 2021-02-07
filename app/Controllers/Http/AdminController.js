'use strict'
// changed all 'user' to admin
const Admin = use('App/Models/Admin')

// bring in validator
const { validateAll } = use('Validator')

class AdminController {
  register({ view }) {
    return view.render('admin/register')
  }
  async processRegister({ request, response, session }) {

    const rules = {
      email: 'required|email|unique:admins,email',
      password: 'required|min:6'
    }

    const messages = {
      'email.required': 'Email cannot be empty',
      'email.email': 'Check email format',
      'email.unique': 'Email has been registered',
      'password.required': 'Password cannot be empty',
      'password.min': 'Password must be 6 or more characters'
    }

    const validation = await validateAll(request.all(), rules, messages)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept([''])

      return response.redirect('back')
    }

    let formData = request.post()
    let admin = new Admin()
    admin.email = formData.email
    admin.password = formData.password
    await admin.save()
    // add flash message here before redirect to login page
    // session.flash({ notification: 'Account Created!' })
    // setTimeout(function(){ session.flash({ notification: 'Account Created!' }); }, 3000);
    return response.redirect('login')

  }
  login({ view, session }) {
    return view.render('admin/login')
  }
  async processLogin({ request, auth, response, session }) {
    let formData = request.post()
    // auth.authenticator('user').attempt
    // need to do the check with database thingy to authenticate user, not the current one as it does not use db

    // Login
    await auth.authenticator('admin').attempt(formData.email, formData.password);
    return response.redirect('/users')
  }
  async show({ auth, response }) {
    let admin = await admin.find(auth.admin.id)
    return response.json(admin)
  }

}

module.exports = AdminController
