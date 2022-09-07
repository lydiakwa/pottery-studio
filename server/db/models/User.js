const Sequelize = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { STRING, VIRTUAL, BOOLEAN } = Sequelize;

const User = db.define('user', {
  firstName: {
    type: STRING,
    allowNull: false,
  },
  lastName: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: STRING,
    validate: {
      notEmpty: true,
    },
  },
  address: {
    type: STRING,
  },
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false,
  },
  token: {
    type: VIRTUAL,
    get() {
      const token = jwt.sign({ userId: this.id }, process.env.JWT);
      return token;
    },
  },
});

//searches by token and returns the whole user object -- class method
User.byToken = async (token) => {
  try {
    const parsedToken = jwt.verify(token, process.env.JWT);
    if (parsedToken) {
      const user = await User.findByPk(parsedToken.userId);
      return user;
    }
  } catch (err) {
    const error = Error('bad credentials');
    error.status = 401;
    throw err;
  }
};

//checks if the user exists via email (should be unique) and returns the whole
//user object back
User.authenticate = async ({ email, password }) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      return user;
    }
  }
  const error = Error('bad credentials');
  error.status(401);
  throw error;
};

//hook - before user is created, password is hashed
User.beforeCreate(async (user) => {
  if (user.password) {
    const SALT_COUNT = 5;
    const hashedPw = await bcrypt.hash(user.password, SALT_COUNT);
    user.password = hashedPw;
  }
});

//instance method -- returns a json object
User.prototype.toJSON = function () {
  return {
    token: this.token,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    isAdmin: this.isAdmin,
    address: this.address,
  };
};

//-- old code
// /**
//  * instanceMethods
//  */
// User.prototype.correctPassword = function (candidatePwd) {
//   //we need to compare the plain version to an encrypted version of the password
//   return bcrypt.compare(candidatePwd, this.password);
// };

// User.prototype.generateToken = function () {
//   return jwt.sign({ id: this.id }, process.env.JWT);
// };

// /**
//  * classMethods
//  */
// User.authenticate = async function ({ email, password }) {
//   const user = await this.findOne({ where: { email } });
//   if (!user || !(await user.correctPassword(password))) {
//     const error = Error('Incorrect email/password');
//     error.status = 401;
//     throw error;
//   }
//   return user.generateToken();
// };

// User.findByToken = async function (token) {
//   try {
//     const { id } = await jwt.verify(token, process.env.JWT);
//     const user = User.findByPk(id);
//     if (!user) {
//       throw 'nooo';
//     }
//     return user;
//   } catch (ex) {
//     const error = Error('bad token');
//     error.status = 401;
//     throw error;
//   }
// };

// /**
//  * hooks
//  */
// const hashPassword = async (user) => {
//   //in case the password has been changed, we want to encrypt it with bcrypt
//   if (user.changed('password')) {
//     user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
//   }
// };

// User.beforeCreate(hashPassword);
// User.beforeUpdate(hashPassword);
// User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));

module.exports = User;
