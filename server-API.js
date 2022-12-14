require('dotenv').config()

const port = process.env.API_PORT || 6000
const express = require('express')
const mongodb = require('./server-MongoDB')
const cors = require('cors')
const bodeParser = require('body-parser')
const app = express()
const { graphqlHTTP } = require('express-graphql');
const { RootQuery, RootMutation } = require('./graphQL/graphQLRootQuery')
const { GraphQLSchema } = require('graphql')


//  Middleware
app.use(cors())
app.use(bodeParser.json())

// Routes REST
const formController = require('./controllers/formController')
app.use('/api/comments', formController)

const userController = require('./controllers/userController')
app.use('/api/users', userController)

const productController = require('./controllers/productController')

app.use('/api/products', productController)


const schema = new GraphQLSchema({query: RootQuery, mutation: RootMutation})

// GraphQL Route
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
  }));




// Init
mongodb()
app.listen(port)
console.log(`API running on port http://localhost:${port}`)
