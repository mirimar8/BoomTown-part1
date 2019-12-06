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
      const tags = await postgres.query(tagsQuery);
      return tags.rows;
    },

    async saveNewItem({ item, user }) {
      return new Promise((resolve, reject) => {
        postgres.connect((err, client, done) => {
          try {
            // Begin postgres transaction
            client.query("BEGIN", async err => {
              const { title, description, tags, imageurl } = item;

              const newItemQuery = {
                text: `INSERT INTO items (title, description, "ownerId", imageurl) VALUES ($1, $2, $3, $4) RETURNING *`,
                values: [title, description, user.id, imageurl]
              };
              const newItem = await client.query(newItemQuery);
              const newItemId = newItem.rows[0].id;

              console.log("newItemId", newItemId);

              const newItemTagQuery = {
                text: `INSERT INTO itemtags ("tagId", "itemId") VALUES ${tagsQueryString(tags, newItemId, "")}`,
                values: tags.map(tag => tag.id)
              };

              await client.query(newItemTagQuery);

              // Commit the entire transaction!
              client.query("COMMIT", err => {
                if (err) {
                  throw err;
                }
                // release the client back to the pool
                done();
                resolve(newItem.rows[0])
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
