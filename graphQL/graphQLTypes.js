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

module.exports = { productType }