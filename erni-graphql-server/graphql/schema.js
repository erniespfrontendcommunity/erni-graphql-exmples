const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers.js');

const typeDefs = `

type User {
  id: String!
  name: String!
  avatarUrl: String
  posts: [Post]
}

type Post {
  id: String!
  body: String!
  user: User
}

type Like {
  id: String!
  userId: String!
  postId: String!
}

type Tweet {
  id: String,
  text: String
  authorName: String
  authorAvatarUrl: String
}

type Query {
  users: [User]
  posts: [Post]
  getUser(id: String!): User
  getPost(id: String!): Post
  getFeed: [Tweet]
}

type Mutation {
  createUser(name: String!): User
  deleteUser(id: String!): User!

  createPost(body: String!, userId: String!): Post!
  deletePost(id: String!): Post!
}

type Subscription {
  postAdded: Post
}

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
