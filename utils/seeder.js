// set up a temporary (in memory) database
const Datastore = require('nedb')
const LOG = require('../utils/logger.js')

// require each data file

const customers = require('../data/customers.json')
const products = require('../data/products.json')
const orders = require('../data/orders.json')
const orderLineItems = require('../data/orderLineItems.json')
const puppies = require('../data/puppies.json')
const Transactions = require('../data/Transactions.json')
const Users= require('../data/Users.json')
const accounts= require('../data/accounts.json')
const categorys= require('../data/Categorys.json')
// inject the app to seed the data

module.exports = (app) => {
  LOG.info('START seeder.')
  const db = {}

  // Customers don't depend on anything else...................

  db.customers = new Datastore()
  db.customers.loadDatabase()

  // insert the sample data into our data store
  db.customers.insert(customers)

  // initialize app.locals (these objects will be available to our controllers)
  app.locals.customers = db.customers.find(customers)
  LOG.debug(`${app.locals.customers.query.length} customers seeded`)

  // Products don't depend on anything else .....................

  db.products = new Datastore()
  db.products.loadDatabase()

  // insert the sample data into our data store
  db.products.insert(products)

  // initialize app.locals (these objects will be available to our controllers)
  app.locals.products = db.products.find(products)
  LOG.debug(`${app.locals.products.query.length} products seeded`)

  // Orders need a customer beforehand .................................

  db.accounts = new Datastore()
  db.accounts.loadDatabase()

  // insert the sample data into our data store
  db.accounts.insert(accounts)

  app.locals.accounts = db.accounts.find(accounts)
  LOG.debug(`${app.locals.accounts.query.length} accounts seeded`)

  db.categorys = new Datastore()
  db.categorys.loadDatabase()

  // insert the sample data into our data store
  db.categorys.insert(categorys)

  // initialize app.locals (these objects will be available to our controllers)
  app.locals.categorys = db.categorys.find(categorys)
  LOG.debug(`${app.locals.categorys.query.length} categorys seeded`)

  // Each Order Line Item needs a product and an order beforehand ...................

  db.orderLineItems = new Datastore()
  db.orderLineItems.loadDatabase()

  // insert the sample data into our data store
  db.orderLineItems.insert(orderLineItems)

  // initialize app.locals (these objects will be available to our controllers)
  app.locals.orderLineItems = db.orderLineItems.find(orderLineItems)
  LOG.debug(`${app.locals.orderLineItems.query.length} orderLineItems seeded`)

  // extra...

  db.puppies = new Datastore()
  db.puppies.loadDatabase()

  // insert the sample data into our data store
  db.puppies.insert(puppies)

  // initialize app.locals (these objects will be available to our controllers)
  app.locals.puppies = db.puppies.find(puppies)
  LOG.debug(`${app.locals.puppies.query.length} puppies seeded`)

  db.Users = new Datastore()
  db.Users.loadDatabase()

  // insert the sample data into our data store
  db.Users.insert(Users)

  // initialize app.locals (these objects will be available to our controllers)
  app.locals.Users = db.Users.find(Users)
  LOG.debug(`${app.locals.Users.query.length} Users seeded`)


  db.Transactions = new Datastore()
  db.Transactions.loadDatabase()

  // insert the sample data into our data store
  db.Transactions.insert(Transactions)

  // initialize app.locals (these objects will be available to our controllers)
  app.locals.Transactions = db.Transactions.find(Transactions)
  LOG.debug(`${app.locals.Transactions.query.length} Transactions seeded`)


  LOG.info('END Seeder. Sample data read and verified.')
}
