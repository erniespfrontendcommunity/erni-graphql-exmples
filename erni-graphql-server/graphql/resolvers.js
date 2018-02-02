const users = require('../data/users');
const posts = require('../data/posts');

module.exports = {
  users: () => users.map(user => {
    const userPosts = posts.filter(post => post.author_id === user.id);
    return {
      ...user,
      posts: userPosts,
    };
  }),
  posts: () => posts,
};
