const { GraphQLString, GraphQLObjectType, GraphQLList } = require('graphql')
const productSchema = require('../schemas/productSchema')
const userSchema = require('../schemas/userSchema')
const commentSchema = require('../schemas/commentSchema')
const { productType, commentType, userType } = require('./graphQLTypes')
 
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
            args: {_id: {type: GraphQLString}},
            resolve: (parent, args) => {
                return product =  productSchema.findById(args._id)
            }
        },
        // Get products by tag
        productsTag: {
            type: new GraphQLList(productType),
            args: {tag: {type: GraphQLString}},
            resolve: (parent, args) => {
                return product =  productSchema.find({tag: args.tag})
            }
        },
        // Get products by Price
        productsPrice: {
            type: new GraphQLList(productType),
            args: {price: {type: GraphQLString}},
            resolve: (parent, args) => {
                return product =  productSchema.find({price: args.price})
            }
        },
        // Get all comments
        comments: {
            type: new GraphQLList(commentType),
            resolve: (parent, args) => {
                return commentSchema.find()
            }
        }, 
        // Get all Users
        users: {
            type: new GraphQLList(userType),
            resolve: (parent, args) => {
                return userSchema.find()
            }
        }
    }
})


// Mutations
// Add product mutation
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
                    rating: args.rating,
                    imageName: args.imageName
                }
        
                console.log('product created')
                return result = productSchema.create(product)
            }
        },
        // Update product mutation
        updateProduct: {
            type: productType,
            args: {
                _id: {type: GraphQLString},
                name: {type: GraphQLString},
                category: {type: GraphQLString},
                description: {type: GraphQLString},
                tag: {type: GraphQLString},
                price: {type: GraphQLString},
                rating: {type: GraphQLString},
                imageName: {type: GraphQLString},
            },
            resolve(parent, args){
                console.log('Product Updated')
                return productSchema.findByIdAndUpdate({_id: args._id}, {
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
        // Remove Product Mutation
        removeProduct: {
            type: productType,
            args: {
                _id: {type: GraphQLString},
            },
            resolve(parent, args){
                console.log('product removed')
                return productSchema.findByIdAndDelete(args._id)
            }
        },
        // Remove Comments
        removeComment: {
            type: commentType,
            args: {
                _id: {type: GraphQLString},
            },
            resolve(parent, args){
                return commentSchema.findByIdAndDelete(args._id)
            }
        },
        // Remove user, uses REST
        removeUser: {
            type: userType,
            args: {
                _id: {type: GraphQLString},
            },
            resolve(parent, args){
                return userSchema.findByIdAndDelete(args._id)
            }
        },
        // Add Comment
        addComment: {
            type: commentType,
            args: {
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                comment: {type: GraphQLString},
            },
            resolve(parent, args){
                let comment = {
                    name: args.name,
                    email: args.email,
                    comment: args.comment,
                }
                console.log('comment posted')
                return result = commentSchema.create(comment)
            }
        },
    }
})



module.exports = { RootQuery, RootMutation }