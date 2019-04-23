const express = require('express')
const api = express.Router()
const Model = require('../models/puppy.js')
const LOG = require('../utils/logger.js')
const find = require('lodash.find')
const remove = require('lodash.remove')
const notfoundstring = 'puppy not found'

// RESPOND WITH JSON DATA  --------------------------------------------

// GET all JSON
api.get('/findall', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const data = req.app.locals.puppies.query
  res.send(JSON.stringify(data))
})

// GET one JSON by ID
api.get('/findone/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const id = parseInt(req.params.id)
  const data = req.app.locals.puppies.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring) }
  res.send(JSON.stringify(item))
})

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
api.get('/', (req, res) => {
  res.render('puppy/index.ejs')
})

// GET create
api.get('/create', (req, res) => {
  LOG.info(`Handling GET /create${req}`)
  const item = new Model()
  LOG.debug(JSON.stringify(item))
  res.render('puppy/create',
    {
      title: 'Create puppy',
      layout: 'layout.ejs',
      puppy: item
    })
})

// GET /delete/:id
api.get('/delete/:id', (req, res) => {
  LOG.info(`Handling GET /delete/:id ${req}`)
  const id = parseInt(req.params.id)
  const data = req.app.locals.puppies.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring) }
  LOG.info(`RETURNING VIEW FOR ${JSON.stringify(item)}`)
  return res.render('puppy/delete.ejs',
    {
      title: 'Delete puppy',
      layout: 'layout.ejs',
      puppy: item
    })
})

// GET /details/:id
api.get('/details/:id', (req, res) => {
  LOG.info(`Handling GET /details/:id ${req}`)
  const id = parseInt(req.params.id)
  const data = req.app.locals.puppies.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring) }
  LOG.info(`RETURNING VIEW FOR ${JSON.stringify(item)}`)
  return res.render('puppy/details.ejs',
    {
      title: 'puppy Details',
      layout: 'layout.ejs',
      puppy: item
    })
})

// GET one
api.get('/edit/:id', (req, res) => {
  LOG.info(`Handling GET /edit/:id ${req}`)
  const id = parseInt(req.params.id)
  const data = req.app.locals.puppies.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring) }
  LOG.info(`RETURNING VIEW FOR${JSON.stringify(item)}`)
  return res.render('puppy/edit.ejs',
    {
      title: 'puppies',
      layout: 'layout.ejs',
      puppy: item
    })
})

// HANDLE EXECUTE DATA MODIFICATION REQUESTS --------------------------------------------

// POST new
api.post('/save', (req, res) => {
  LOG.info(`Handling POST ${req}`)
  LOG.debug(JSON.stringify(req.body))
  const data = req.app.locals.puppies.query
  const item = new Model()
  LOG.info(`NEW ID ${req.body._id}`)
  item._id = parseInt(req.body._id)
  item.name = req.body.name
  item.breed = req.body.breed
  item.age = parseInt(req.body.age, 10)
  item.parents = []
  item.parents.length = 0
  if (req.body.parentName.length > 0) {
    for (let count = 0; count < req.body.parentName.length; count++) {
      item.parents.push(
        {
          parentName: req.body.parentName[count],
          parentBreed: req.body.parentBreed,
          parentAge: parseInt(req.body.parentAge[count], 10)
        }
      )
    }
    data.push(item)
    LOG.info(`SAVING NEW puppy ${JSON.stringify(item)}`)
    return res.redirect('/puppy')
  }
})

// POST update
api.post('/save/:id', (req, res) => {
  LOG.info(`Handling SAVE request ${req}`)
  const id = parseInt(req.params.id)
  LOG.info(`Handling SAVING ID=${id}`)
  const data = req.app.locals.puppies.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring) }
  LOG.info(`ORIGINAL VALUES ${JSON.stringify(item)}`)
  LOG.info(`UPDATED VALUES: ${JSON.stringify(req.body)}`)
  item.name = req.body.name
  item.breed = req.body.breed
  item.age = parseInt(req.body.age, 10)
  item.parents = []
  item.parents.length = 0
  if (req.body.parentName.length > 0) {
    for (let count = 0; count < req.body.parentName.length; count++) {
      item.parents.push(
        {
          parentName: req.body.parentName[count],
          parentBreed: req.body.parentBreed[count],
          parentAge: parseInt(req.body.parentAge[count], 10)
        }
      )
    }
  }
  LOG.info(`SAVING UPDATED puppy ${JSON.stringify(item)}`)
  return res.redirect('/puppy')
})

// DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', (req, res) => {
  LOG.info(`Handling DELETE request ${req}`)
  const id = parseInt(req.params.id)
  LOG.info(`Handling REMOVING ID=${id}`)
  const data = req.app.locals.puppies.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring) }
  if (item.isActive) {
    item.isActive = false
    console.log(`Deacctivated item ${JSON.stringify(item)}`)
  } else {
    const item = remove(data, { _id: id })
    console.log(`Permanently deleted item ${JSON.stringify(item)}`)
  }
  return res.redirect('/puppy')
})

module.exports = api
