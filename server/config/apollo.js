const { ApolloServer } = require("apollo-server-express");
const { ApolloError } = require("apollo-server-express");
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
        if (token) {
          user = jwt.verify(token, app.get("JWT_SECRET"));
        }
        return {
          pgResource,
          req,
          token,
          user
        }
      } catch (e) {
        throw new ApolloError(e);
      }
    },
    schema
  });

  apolloServer.applyMiddleware({
    app,
    cors: app.get('CORS_CONFIG')
  });
};
