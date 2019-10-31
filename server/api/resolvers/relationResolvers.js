const { ApolloError } = require("apollo-server");

const relationResolvers = {
  User: {
    async items(parent, args, { pgResource }) {
      try {
        const itemsLentForUser = await pgResource.getItemsForUser(parent.id);
        return itemsLentForUser;
      } catch (e) {
        throw new ApolloError(e);
      }
    },
    async borrowed(parent, args, { pgResource }) {
      try {
        const itemsBorrowedForUser = await pgResource.getBorrowedItemsForUser(parent.id);
        return itemsBorrowedForUser;
      } catch (e) {
        throw new ApolloError(e);
      }
    },
  },

  Item: {
    async itemowner(parent, args, { pgResource }) {
      try {
        const itemOwner = await pgResource.getUserById(parent.ownerId);
        return itemOwner;
      } catch (e) {
        throw new ApolloError(e);
      }
    },

    async tags(parent, args, { pgResource }) {
      try {
        const getTagsForItem = await pgResource.getTagsForItem(parent.id);
        return getTagsForItem;
      } catch (e) {
        throw new ApolloError(e);
      }
    },

    async borrower(parent, args, { pgResource }) {
      try {
        if (parent.id) {
          const getborrower = await pgResource.getUserById(parent.id);
          return getborrower;
        } else {
          return null;
        }
      } catch (e) {
        throw new ApolloError(e);
      }
    },
  }
};

module.exports = relationResolvers;
