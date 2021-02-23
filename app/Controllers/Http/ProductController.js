'use strict'

const { validateAll } = use('Validator')
const Product = use('App/Models/Product')
const Config = use('Config')

class ProductController {
  async index({ view }) {
    const products = await Product.all()

    return view.render('products', {
      products: products.toJSON()
    })
  }
  createProduct({ view }) {
    return view.render('createproduct', {
      cloudinaryName:Config.get('cloudinary.name'),
      cloudinaryApiKey:Config.get('cloudinary.api_key'),
      cloudinaryPreset:Config.get('cloudinary.preset'),
      signUrl:'/cloudinary/sign',
    })
  }

  async processCreateProduct({response, request, session}){
    const rules = {
      product_name:'required',
      sku:'required',
      description:'required',
      price:'required',
      imgurl:'required'
    }

    const messages = {
     'product_name.required':'Please enter Name',
     'sku.required':'Please enter SKU',
     'description.required':'Description cannot be empty',
     'price.required':'Please enter a price',
     'imgurl.required':'Please provide image'
    }
    let formData = request.post()
    const validation = await validateAll(formData, rules, messages)
    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()
      return response.redirect('back')
    }
    let newProduct = new Product()

    newProduct.product_name = formData.product_name
    newProduct.sku = formData.sku
    newProduct.category = formData.category
    newProduct.description = formData.description
    newProduct.price = formData.price
    newProduct.imgurl = formData.imgurl

    session.flash({ notification: `${newProduct.product_name} has been created!` })
    await newProduct.save()
    response.route('productshome')
  }
}

module.exports = ProductController
