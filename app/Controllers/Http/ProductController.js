'use strict'

const { validateAll } = use('Validator')
const Product = use('App/Models/Product')

class ProductController {
  async index({ view }) {
    const products = await Product.all()

    return view.render('products', {
      products: products.toJSON()
    })
  }
  createProduct({ view }) {
    return view.render('createproduct')
  }

  async processCreateProduct({response, request}){
    let formData = request.post()
    let newProduct = new Product()

    newProduct.name = formData.name
    newProduct.sku = formData.sku
    newProduct.category = formData.category
    newProduct.description = formData.description
    newProduct.price = formData.price

    newProduct.password = formData.password
    newProduct.password = formData.password
    await newProduct.save()
    // need to add address part
    response.route('products')
  }
}

module.exports = ProductController
