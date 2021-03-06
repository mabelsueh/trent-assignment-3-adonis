'use strict'

const { validateAll } = use('Validator')
const Product = use('App/Models/Product')
const Config = use('Config')

class ProductController {
  // for R in api
  async indexAPI({response}){
    let products = await Product.all()
    response.json(products)
  }

  async index({ view }) {
    const products = await Product.all()

    return view.render('product/products', {
      products: products.toJSON()
    })
  }
  createProduct({ view }) {
    return view.render('product/createproduct', {
      cloudinaryName:Config.get('cloudinary.name'),
      cloudinaryApiKey:Config.get('cloudinary.api_key'),
      cloudinaryPreset:Config.get('cloudinary.preset'),
      signUrl:'/cloudinary/sign',
    })
  }

  async processCreateProduct({response, request, session}){
    const rules = {
      product_name:'required|unique:products,product_name',
      sku:'required|unique:products:sku',
      description:'required',
      price:'required',
      imgurl:'required'
    }

    const messages = {
     'product_name.required':'Please enter Name',
     'product_name.unique':'Product name already exists',
     'sku.required':'Please enter SKU',
     'sku.unique':'SKU already exists. Please enter a unique SKU',
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

  async update({params, view}){
    let product = await Product.find(params.id)
    return view.render('product/updateproduct', {
      'product':product.toJSON(),
      'cloudinaryName':Config.get('cloudinary.name'),
      'cloudinaryApiKey':Config.get('cloudinary.api_key'),
      'cloudinaryPreset':Config.get('cloudinary.preset'),
      'sign_url':'/cloudinary/sign',
    })
  }

  async processUpdate({params, request, response, session}){

    let product = await Product.find(params.id)
    let formData = request.post()

    product.product_name = formData.product_name
    product.sku = formData.sku
    product.category = formData.category
    product.description = formData.description
    product.price = formData.price
    product.imgurl = formData.imgurl
    await product.save()
    session.flash({ notification: `${product.product_name} has been updated!` })
    await product.save()
    response.route('productshome')
  }

  async deleteProduct({params, response, session}){
    let product = await Product.find(params.id)
    session.flash({ warning: `${product.product_name} has been deleted!` });
    await product.delete()
    response.route('productshome')
  }
}

module.exports = ProductController
