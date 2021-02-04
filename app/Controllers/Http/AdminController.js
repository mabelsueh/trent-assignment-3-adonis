'use strict'
// changed all 'user' to admin
const Admin = use('App/Models/Admin')
class AdminController {
  register({ view }) {
    return view.render('admin/register')
  }
  async processRegister({ request, response }) {
    let formData = request.post();
    let admin = new Admin();
    // removed username as i don't need it
    admin.email = formData.email;
    admin.password = formData.password;
    await admin.save();
    // add flash message here before redirect to login page
    return response.redirect('login')

  }
  login({ view }) {
    return view.render('admin/login')
  }
  async processLogin({ request, auth }) {
    let formData = request.post();
    await auth.attempt(formData.email, formData.password);
    return "Login success"
  }
  async show({ auth, response }) {
    let admin = await admin.find(auth.admin.id);
    return response.json(admin);
  }

}

module.exports = AdminController
