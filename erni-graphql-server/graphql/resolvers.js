const r = require('rethinkdb');
var Twitter = require('twitter');
const { PubSub } = require('graphql-subscriptions');
const uuid = require('uuid');

const pubSub = new PubSub();
const POST_ADDED_TOPIC = 'postAdded';
const TWEET_ADDED_TOPIC = 'postAdded';

module.exports = {

  Query: {

    async users(obj, args, context, info) {
      const users = await r.table('users')
      .orderBy('name')
      .run(context.dbConnection);

      return users.toArray();
    },

    async posts(root, args, context) {
      let posts = await r.table('posts')
        .orderBy(r.desc('createdAt'))
        .merge(post => ({
          user: r.table('users').get(post('userId'))
        }))
        .run(context.dbConnection);

      return posts.toArray();
    },

    async getUser(root, args, context) {
      const user = await r.table('users')
        .get(args.id)
        .run(context.dbConnection);

      const posts = await r.table('posts')
        .orderBy(r.desc('createdAt'))
        .filter({ userId: args.id })
        .run(context.dbConnection);

        return { ...user, posts: posts.toArray() };
    },

    async getPost(root, args, context) {
      const post = await r.table('posts')
        .get(args.id)
        .run(context.dbConnection);
      return post;
    },

    async tweets(root, args, context) {

      const twtr = new Twitter({
        consumer_key: 'VqIzKByz38VDwCSqQ9T2I71To',
        consumer_secret: 'sttSiAbQwDy2W6chIjzPp91plIDXuKVqAa7FHihpa1wNXzBbJR',
        access_token_key: '115462445-lhJNetLQnWidkxismNTVFhljcTLmk7yJfY95X82L',
        access_token_secret: 'JObiRMYeThHRiX6Fumbgm7JQi5QhsgHLva5P87s7UgVkC'
      });

      const params = {
        q: 'graphql',
        count: 10,
        result_type: 'recent',
        lang: 'en'
      };

      const data = await twtr.get('search/tweets', params);

      const tweets = data.statuses.map(t => ({
        ...t,
        uuid: uuid.v4(),
        authorName: t.user.name,
        authorAvatarUrl: t.user.profile_image_url,
      }));

      const stream = twtr.stream('statuses/filter', { track: 'graphql' });
      stream.on('data', t => {
        const tweet = {
          ...t,
          uuid: uuid.v4(),
          authorName: t.user.name,
          authorAvatarUrl: t.user.profile_image_url
        };
        pubSub.publish(TWEET_ADDED_TOPIC, { tweetAdded: tweet });
      });

      return tweets;
    },

  },

  Mutation: {

    async createUser(root, args, context) {
      const result = await r.table('users')
        .insert({
          name: args.name,
        }, {
          returnChanges: true,
        })
        .run(context.dbConnection);

      return result.changes[0].new_val;
    },

    async createPost(root, args, context) {
      const result = await r.table('posts')
        .insert({
          body: args.body,
          userId: args.userId,
          createdAt: r.now()
        }, {
          returnChanges: true,
        })
        .run(context.dbConnection);

      const newPost = result.changes[0].new_val;
      const user = await r.table('users')
        .get(args.userId)
        .run(context.dbConnection);

      newPost.user = user;

      pubSub.publish(POST_ADDED_TOPIC, { postAdded: newPost });

      return newPost;
    },

    async deleteUser(root, args, context) {
      const result = await r.table('users')
        .get(args.id)
        .delete({
          returnChanges: true,
        })
        .run(context.dbConnection);

      return result.changes[0].old_val;
    },

    async deletePost(root, args, context) {
      const result = await r.table('posts')
        .get(args.id)
        .delete({
          returnChanges: true,
        })
        .run(context.dbConnection);

      return result.changes[0].old_val;
    },

  },

  Subscription: {

    postAdded: {
      subscribe: () => pubSub.asyncIterator(POST_ADDED_TOPIC),
    },

    tweetAdded: {
      subscribe: () => pubSub.asyncIterator(TWEET_ADDED_TOPIC),
    },

  },

};
