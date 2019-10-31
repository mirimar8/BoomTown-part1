function tagsQueryString(tags, itemid, result) {
  for (i = tags.length; i > 0; i--) {
    result += `($${i}, ${itemid}),`;
  }
  return result.slice(0, -1) + ";";
}

module.exports = postgres => {
  return {
    async createUser({ fullname, email, password }) {
      const newUserInsert = {
        text: "INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3) RETURNING *",
        values: [fullname, email, password],
      };
      try {
        const user = await postgres.query(newUserInsert);
        return user.rows[0];
      } catch (e) {
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw "An account with this username already exists.";
          case /users_email_key/.test(e.message):
            throw "An account with this email already exists.";
          default:
            throw "There was a problem creating your account.";
        }
      }
    },
    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text: "SELECT * FROM users WHERE email=$1",
        values: [email],
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw "User was not found.";
        return user.rows[0];
      } catch (e) {
        throw "User was not found.";
      }
    },
    async getUserById(id) {
      /**
       *  @TODO: Handling Server Errors
       *
       *  Inside of our resource methods we get to determine when and how errors are returned
       *  to our resolvers using try / catch / throw semantics.
       *
       *  Ideally, the errors that we'll throw from our resource should be able to be used by the client
       *  to display user feedback. This means we'll be catching errors and throwing new ones.
       *
       *  Errors thrown from our resource will be captured and returned from our resolvers.
       *
       *  This will be the basic logic for this resource method:
       *  1) Query for the user using the given id. If no user is found throw an error.
       *  2) If there is an error with the query (500) throw an error.
       *  3) If the user is found and there are no errors, return only the id, email, fullname, bio fields.
       *     -- this is important, don't return the password!
       *
       *  You'll need to complete the query first before attempting this exercise.
       */

      const findUserQuery = {
        text: "SELECT * FROM users WHERE id=$1",
        values: [id],
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw "User was not found.";
        return user.rows[0];
      } catch (e) {
        throw "User was not found.";
      }
    },

    async getItems(idToOmit) {
      // console.log(idToOmit);
      const items = await postgres.query({
        text: idToOmit ? 'SELECT * FROM items WHERE "ownerId" != $1' : 'SELECT * FROM items',
        values: idToOmit ? [idToOmit] : [],
      });

      return items.rows;
    },

    async getItemsForUser(id) {
      const items = await postgres.query({
        text: 'SELECT * FROM items WHERE "ownerId" = $1',
        values: [id],
      });
      return items.rows;
    },

    async getBorrowedItemsForUser(id) {
      const items = await postgres.query({
        text: `SELECT * FROM items WHERE "borrowerId" = $1`,
        values: [id],
      });
      return items.rows;
    },

    async getTags() {
      const tags = await postgres.query({ text: `SELECT * FROM tags` });
      return tags.rows;
    },

    async getTagsForItem(id) {
      const tagsQuery = {
        text: `SELECT * FROM tags INNER JOIN itemtags ON itemtags."tagId" = tags.id WHERE itemtags."itemId" = $1`,
        values: [id],
      };
      // console.log('get tags for items', tagsQuery);
      const tags = await postgres.query(tagsQuery);
      // console.log('tags query result', tags);
      return tags.rows;

    },

    async saveNewItem({ item, user }) {
      /**
       *  @TODO: Adding a New Item
       *
       *  Adding a new Item requires 2 separate INSERT statements.
       *
       *  All of the INSERT statements must:
       *  1) Proceed in a specific order.
       *  2) Succeed for the new Item to be considered added
       *  3) If any of the INSERT queries fail, any successful INSERT
       *     queries should be 'rolled back' to avoid 'orphan' data in the database.
       *
       *  To achieve #3 we'll ue something called a Postgres Transaction!
       *  The code for the transaction has been provided for you, along with
       *  helpful comments to help you get started.
       *
       *  Read the method and the comments carefully before you begin.
       */

      return new Promise((resolve, reject) => {
        /**
         * Begin transaction by opening a long-lived connection
         * to a client from the client pool.
         * - Read about transactions here: https://node-postgres.com/features/transactions
         */
        postgres.connect((err, client, done) => {
          try {
            // Begin postgres transaction
            client.query("BEGIN", async err => {
              const { title, description, tags } = item;

              const itemQuery = {
                text: "INSERT INTO items (title, description, imageUrl, ownerId, borrowerId) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                values: [title, description, imageUrl, ownerId, borrowerId]
              };
              const newItem = await postgres.query(itemQuery);

              const tagItemQuery = {
                text: `INSERT INTO itemtags (tagId, itemId) VALUES ${tagsQueryString(tags, itemid, result)}) `,
                values: [tagId, itemId]
              };
              const newItemTag = await postgres.query(tagItemQuery);

              // Commit the entire transaction!
              client.query("COMMIT", err => {
                if (err) {
                  throw err;
                }
                // release the client back to the pool
                done();
                // Uncomment this resolve statement when you're ready!
                resolve(newItem.rows[0])
                // -------------------------------
              });
            });
          } catch (e) {
            // Something went wrong
            client.query("ROLLBACK", err => {
              if (err) {
                throw err;
              }
              // release the client back to the pool
              done();
            });
            switch (true) {
              default:
                throw e;
            }
          }
        });
      });
    },
  };
};
