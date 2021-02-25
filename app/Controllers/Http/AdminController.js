'use strict'
// changed all 'user' to admin
const Admin = use('App/Models/Admin')

// bring in validator
const { validateAll } = use('Validator')

// use hash
const Hash = use('Hash')


class AdminController {
  register({ view }) {
    return view.render('admin/register')
  }
  async processRegister({ request, response, session }) {

    const rules = {
      email: 'required|email|unique:admins,email',
      password: 'required|confirmed|min:6'
    }

    const messages = {
      'email.required': 'Email cannot be empty',
      'email.email': 'Check email format',
      'email.unique': 'Email has been registered',
      'password.required': 'Password cannot be empty',
      'password.confirmed': 'Passwords do not match',
      'password.min': 'Password must be 6 or more characters'
    }

    const validation = await validateAll(request.all(), rules, messages)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        // .flashExcept([''])
        .flashAll()

      return response.redirect('back')
    }

    let formData = request.post()
    let admin = new Admin()
    admin.email = formData.email
    admin.password = formData.password
    await admin.save()
    session.flash({ notification: `Account for ${admin.email} has been created!` })
    return response.route('loginpage')

  }
  login({ view, session }) {
    return view.render('admin/login')
  }
  async processLogin({ request, auth, response, session }) {
    let formData = request.post()
    // auth.authenticator('user').attempt
    // need to do the check with database thingy to authenticate user,
    // not the current one as it does not use db
    // need hash pasword thingy also
    let adminInput = await Admin.findBy('email', formData.email)
    // const isSame = await Hash.verify(formData.password, 'password')
    if (!adminInput) {
      session.withErrors({ email: 'Email does not match records' }).flashAll()
      return response.redirect('back')
    }
    else {
      let adminInputPassword = adminInput.toJSON()
      const isSame = await Hash.verify(formData.password, adminInputPassword.password)
      if (!isSame) {
      session.withErrors({ password: 'Password does not match records' }).flashAll()
      return response.redirect('back')
      }
      else {
      await auth.authenticator('admin').attempt(formData.email, formData.password);
      return response.route('users')
      }
    }
  }
  route({ response }) {
    return response.route('loginpage')
  }
  async logout({auth, response}){
    await auth.logout()
    response.route('loginpage')
  }

}

module.exports = AdminController
