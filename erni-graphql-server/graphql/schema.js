module.exports = `

type Query {
  users: [User],
  posts: [Post]
}

type Mutation {
  createPost(title: String!): String
}

type Subscription {
  createPost(title: String!): String
}

type User {
  id: String!
  name: String
  posts: [Post]
}

type Post {
  id: String!,
  body: String,
  author_id: String!
}

`;
