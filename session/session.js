const session = {};
module.exports = {
  putUserId(token, userId) {
    session[token] = userId;
  },
  getUserId(token) {
    return session[token];
  },
  destroy(token) {
    delete session[token];
  },
};
