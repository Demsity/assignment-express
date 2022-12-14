const { GraphQLString, GraphQLObjectType, GraphQLList } = require('graphql')
const productSchema = require('../schemas/productSchema')
const { productType } = require('./graphQLTypes')
 
// Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        // Get all Products
        products: {
            type: new GraphQLList(productType),
            resolve: (parent, args) => {
                
                return products =  productSchema.find({})
            }
        },
        // get single product
        product: {
            type: productType,
            args: {articleNumber: {type: GraphQLString}},
            resolve: (parent, args) => {
                return product =  productSchema.findById(args.articleNumber)
            }
        },
        productsTag: {
            type: new GraphQLList(productType),
            args: {tag: {type: GraphQLString}},
            resolve: (parent, args) => {
                return product =  productSchema.find({tag: args.tag})
            }
        },
        productsPrice: {
            type: new GraphQLList(productType),
            args: {price: {type: GraphQLString}},
            resolve: (parent, args) => {
                return product =  productSchema.find({price: args.price})
            }
        },
    }
})


// Mutations
const RootMutation = new GraphQLObjectType({
    name: 'RootMutation', 
    fields: {
        addProduct: {
            type: productType,
            args: {
                name: {type: GraphQLString},
                category: {type: GraphQLString},
                description: {type: GraphQLString},
                tag: {type: GraphQLString},
                price: {type: GraphQLString},
                rating: {type: GraphQLString},
                imageName: {type: GraphQLString},
            },
            resolve(parent, args){
                let product = {
                    name: args.name,
                    category: args.category,
                    description: args.description,
                    tag: args.tag,
                    price: args.price,
                    imageName: args.imageName
                }
        
                return result = productSchema.create(product)
            }
        },
        updateProduct: {
            type: productType,
            args: {
                articleNumber: {type: GraphQLString},
                name: {type: GraphQLString},
                category: {type: GraphQLString},
                description: {type: GraphQLString},
                tag: {type: GraphQLString},
                price: {type: GraphQLString},
                rating: {type: GraphQLString},
                imageName: {type: GraphQLString},
            },
            resolve(parent, args){
                return productSchema.findByIdAndUpdate({_id: args.articleNumber}, {
                    name: args.name,
                    description: args.description, 
                    price: args.price,
                    category: args.category,
                    tag: args.tag,
                    imageName: args.imageName,
                    rating: args.rating
                },{new: true})
            }
        },
        removeProduct: {
            type: productType,
            args: {
                articleNumber: {type: GraphQLString},
            },
            resolve(parent, args){
                return productSchema.findByIdAndDelete(args.articleNumber)
            }
        },
    }
})



module.exports = { RootQuery, RootMutation }