/** 
*  Product controller
*  Handles requests related to products (see routes)
*
* @author Denise Case <dcase@nwmissouri.edu>
*
*/
const express = require('express')
const api = express.Router()
const LOG = require('../utils/logger.js')
const find = require('lodash.find')
const remove = require('lodash.remove')
const Model = require('../models/product.js')
const notfoundstring = 'product not found'

// RESPOND WITH JSON DATA  --------------------------------------------

// GET all JSON
api.get('/findall', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const data = req.app.locals.products.query
  res.send(JSON.stringify(data))
})

// GET one JSON by ID
api.get('/findone/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const id = parseInt(req.params.id)
  const data = req.app.locals.products.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring) }
  res.send(JSON.stringify(item))
})

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
api.get('/', (req, res) => {
  res.render('product/index.ejs')
})

// GET create
api.get('/create', (req, res) => {
  LOG.info(`Handling GET /create${req}`)
  const item = new Model()
  LOG.debug(JSON.stringify(item))
  res.render('product/create',
    {
      title: 'Create product',
      layout: 'layout.ejs',
      product: item
    })
})

// GET /delete/:id
api.get('/delete/:id', (req, res) => {
  LOG.info(`Handling GET /delete/:id ${req}`)
  const id = parseInt(req.params.id)
  const data = req.app.locals.products.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring) }
  LOG.info(`RETURNING VIEW FOR ${JSON.stringify(item)}`)
  return res.render('product/delete.ejs',
    {
      title: 'Delete product',
      layout: 'layout.ejs',
      product: item
    })
})

// GET /details/:id
api.get('/details/:id', (req, res) => {
  LOG.info(`Handling GET /details/:id ${req}`)
  const id = parseInt(req.params.id)
  const data = req.app.locals.products.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring) }
  LOG.info(`RETURNING VIEW FOR ${JSON.stringify(item)}`)
  return res.render('product/details.ejs',
    {
      title: 'product Details',
      layout: 'layout.ejs',
      product: item
    })
})

// GET one
api.get('/edit/:id', (req, res) => {
  LOG.info(`Handling GET /edit/:id ${req}`)
  const id = parseInt(req.params.id)
  const data = req.app.locals.products.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring) }
  LOG.info(`RETURNING VIEW FOR${JSON.stringify(item)}`)
  return res.render('product/edit.ejs',
    {
      title: 'products',
      layout: 'layout.ejs',
      product: item
    })
})

// HANDLE EXECUTE DATA MODIFICATION REQUESTS --------------------------------------------

// POST new
api.post('/save', (req, res) => {
  LOG.info(`Handling POST ${req}`)
  LOG.debug(JSON.stringify(req.body))
  const data = req.app.locals.products.query
  const item = new Model()
  LOG.info(`NEW ID ${req.body._id}`)
  item._id = parseInt(req.body._id)
  item.productKey = req.body.productKey
  item.description = req.body.description
  item.unitPrice = parseInt(req.body.unitPrice)
  data.push(item)
  LOG.info(`SAVING NEW product ${JSON.stringify(item)}`)
  return res.redirect('/product')
})

// POST update
api.post('/save/:id', (req, res) => {
  LOG.info(`Handling SAVE request ${req}`)
  const id = parseInt(req.params.id)
  LOG.info(`Handling SAVING ID=${id}`)
  const data = req.app.locals.products.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring) }
  LOG.info(`ORIGINAL VALUES ${JSON.stringify(item)}`)
  LOG.info(`UPDATED VALUES: ${JSON.stringify(req.body)}`)
  item.productKey = req.body.productKey
  item.description = req.body.description
  item.unitPrice = parseInt(req.body.unitPrice)
  LOG.info(`SAVING UPDATED product ${JSON.stringify(item)}`)
  return res.redirect('/product')
})

// DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', (req, res) => {
  LOG.info(`Handling DELETE request ${req}`)
  const id = parseInt(req.params.id)
  LOG.info(`Handling REMOVING ID=${id}`)
  const data = req.app.locals.products.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring) }
  if (item.isActive) {
    item.isActive = false
    console.log(`Deacctivated item ${JSON.stringify(item)}`)
  } else {
    const item = remove(data, { _id: id })
    console.log(`Permanently deleted item ${JSON.stringify(item)}`)
  }
  return res.redirect('/product')
})

module.exports = api
