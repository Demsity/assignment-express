const { GraphQLID, GraphQLString, GraphQLObjectType, GraphQLList } = require('graphql')
const productSchema = require('../schemas/productSchema')
 

// types

const productType = new GraphQLObjectType({
    name: 'Product', 
    fields: {
        _id: {type: GraphQLID},
        name: {type: GraphQLString},
        category: {type: GraphQLString},
        description: {type: GraphQLString},
        tag: {type: GraphQLString},
        price: {type: GraphQLString},
        rating: {type: GraphQLString},
    }
})


// Query
const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        products: {
            type: new GraphQLList(productType),
            resolve: (parent, args) => {
                
                return products =  productSchema.find({})
            }
        },
        product: {
            type: productType,
            args: {articleNumber: {type: GraphQLString}},
            resolve: (parent, args) => {
                return product =  productSchema.findById(args.articleNumber)
            }
        }
    }
})


// Mutations

// Routes/root 

const root = {
    products: () => {
        
    }
}


module.exports = { productType, root, queryType }