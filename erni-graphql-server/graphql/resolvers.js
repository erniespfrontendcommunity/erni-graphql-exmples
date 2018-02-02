const r = require('rethinkdb');

module.exports = {

  async users(args, context) {
    const users = await r.table('users').run(context.dbConnection);
    return users.toArray();
  },

  async posts(args, context) {
    const posts = await r.table('posts').run(context.dbConnection);
    return posts.toArray();
  },

  async getUser(args, context) {
    const user = await r.table('users')
      .get(args.id)
      .run(context.dbConnection);
    return user;
  },

  async getPost(args, context) {
    const post = await r.table('posts')
      .get(args.id)
      .run(context.dbConnection);
    return post;
  },

  async createUser(args, context) {
    const result = await r.table('users')
      .insert({
        name: args.name,
      }, {
        returnChanges: true,
      })
      .run(context.dbConnection);

    return result.changes[0].new_val;
  },

  async createPost(args, context) {
    const result = await r.table('posts')
      .insert({
        body: args.body,
        userId: args.userId,
      }, {
        returnChanges: true,
      })
      .run(context.dbConnection);

    return result.changes[0].new_val;
  },

  async deleteUser(args, context) {
    const result = await r.table('users')
      .get(args.id)
      .delete({
        returnChanges: true,
      })
      .run(context.dbConnection);

    return result.changes[0].old_val;
  },

  async deletePost(args, context) {
    const result = await r.table('posts')
      .get(args.id)
      .delete({
        returnChanges: true,
      })
      .run(context.dbConnection);

    return result.changes[0].old_val;
  },

  async likePost(args, context) {
    const result = await r.table('likes')
      .insert({
        userId: args.userId,
        postId: args.postId,
      }, {
        returnChanges: true,
      })
      .run(context.dbConnection);

    return result.changes[0].new_val;
  },

};
