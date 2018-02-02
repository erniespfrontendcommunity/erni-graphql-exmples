module.exports = `

type User {
  id: String!
  name: String!
  posts: [Post]
}

type Post {
  id: String!
  body: String!
  userId: String!
}

type Like {
  id: String!
  userId: String!
  postId: String!
}

type Query {
  users: [User]
  posts: [Post]
  getUser(id: String): User
  getPost(id: String): Post
}

type Mutation {
  createUser(name: String!): User
  deleteUser(id: String!): User!

  createPost(body: String!, userId: String!): Post
  deletePost(id: String!): Post!
}

type Subscription {
  createPost(title: String!): String
}

`;
