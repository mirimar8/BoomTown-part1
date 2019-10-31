const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const typeDefs = require("../api/schema");
let resolvers = require("../api/resolvers");

module.exports = ({ app, pgResource }) => {
  resolvers = resolvers(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const apolloServer = new ApolloServer({
    context: ({ req }) => {
      const tokenName = app.get("JWT_COOKIE_NAME")
      const token = req ? req.cookies[tokenName] : undefined
      let user = null
      try {
        // TODO:
        // If there is a token, verify that token to get user info and assign it to user variable
        // return req, token, user, pgResources
        return {
          pgResource,
          req,
          token,
          user
        }
      } catch (e) {
        // throw error
      }
    },
    schema
  });

  apolloServer.applyMiddleware({
    app,
    cors: app.get('CORS_CONFIG')
  });
};
