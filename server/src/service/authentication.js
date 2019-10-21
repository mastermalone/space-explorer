const isEmail = require('isemail');
const store = require('../store');

const AuthenticateUser = async ({ req }) => {
  const auth = (req.headers && req.headers.authorization) || '';
  const email = Buffer.from(auth, 'base64').toString('ascii');

  if (!isEmail.validate(email)) {
    return {
      user: null,
    };
  }

  // Find user by email
  const users = await store.users.findOrCreate({ where: { email } });
  const user = (users && users[0]) || null;

  return {
    user: {
      ...user.dataValues,
    },
  };
};

module.exports = AuthenticateUser;
