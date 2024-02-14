const util = require("./util");

const collections = [];

module.exports = {
  findBy(fields, value) {
    let findUser = null;
    for (const user of collections) {
      if (user[fields] === value) {
        findUser = user;
        break;
      }
    }
    return Promise.resolve(findUser);
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

  create({ email, name, password }) {
    const user = { email, name, id: util.generateRandomId(), password };
    collections.push(user);
    console.log(collections);
    const cloneUser = { ...user };
    delete cloneUser.password;
    return Promise.resolve(cloneUser);
  },

  update(id, updateUser) {
    const user = collections.find((p) => p.id === id);
    if (user) {
      for (let key of ["name", "email"]) {
        if (updateUser[key]) {
          user[key] = updateUser[key];
        }
      }
      return Promise.resolve(user);
    }
    return Promise.resolve(null);
  },

  delete(id) {
    let findUser = null;
    let index = 0;
    for (; index < collections.length; index++) {
      findUser = collections[index];

      if (findUser.id === id) {
        break;
      }
      findUser = null;
    }

    if (findUser) {
      collections.splice(index, 1);
    }

    return Promise.resolve(findUser);
  },
};
