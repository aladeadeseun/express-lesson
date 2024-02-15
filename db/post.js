const util = require("./util");

const collections = [];

module.exports = {
  findBy(fields, value) {
    let findPost = null;
    for (const post of collections) {
      if (post[fields] === value) {
        findPost = post;
        break;
      }
    }
    return Promise.resolve(findPost);
  },

  read(after = 0, limit = undefined) {
    const index = collections.findIndex((p) => p.id === after);

    const start = index + 1;

    let end = collections.length;

    if (Number.isInteger(limit)) {
      end = start + limit;
    }

    return Promise.resolve(collections.slice(start, end));
  },

  create({ title, body, posterId }) {
    const post = { title, body, id: util.generateRandomId(), posterId };
    collections.push(post);
    console.log(collections);
    return Promise.resolve(post);
  },

  update(id, updatePost) {
    const post = collections.find((p) => p.id === id);
    if (post) {
      for (let key of ["title", "body"]) {
        if (updatePost[key]) {
          post[key] = updatePost[key];
        }
      }
      return Promise.resolve(post);
    }
    return Promise.resolve(null);
  },

  delete(id) {
    let findPost = null;
    let index = 0;
    for (; index < collections.length; index++) {
      findPost = collections[index];

      if (findPost.id === id) {
        break;
      }
      findPost = null;
    }

    if (findPost) {
      collections.splice(index, 1);
    }

    return Promise.resolve(findPost);
  },
};
