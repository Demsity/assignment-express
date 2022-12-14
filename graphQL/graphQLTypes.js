const { GraphQLID, GraphQLString, GraphQLObjectType } = require('graphql')
 

// types

const productType = new GraphQLObjectType({
    name: 'Product', 
    fields: () =>  ({
        _id: {type: GraphQLID},
        name: {type: GraphQLString},
        category: {type: GraphQLString},
        description: {type: GraphQLString},
        tag: {type: GraphQLString},
        price: {type: GraphQLString},
        rating: {type: GraphQLString},
        imageName: {type: GraphQLString}
    })
})

const commentType = new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
        _id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        comment: {type: GraphQLString}
    })
})

const userType = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        _id: {type: GraphQLID},
        name: {type: GraphQLString}, 
        email: {type: GraphQLString}, 
        password: {type: GraphQLString}, 
    })
})

module.exports = { productType, commentType, userType }