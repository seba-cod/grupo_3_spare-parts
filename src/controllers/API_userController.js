const db = require("../../database/models");
const { STATUS_SUCCESS, STATUS_ERROR , STATUS_NOT_FOUND } = require('./status')

const userApiMethods = {
  allUsers: (req, res) => {
    db.users
      .findAll()
      .then((users) => {
        req.json(users);
      })
      .catch((error) => {
        res.status(500).json({
          status: STATUS_ERROR,
          error,
        });
      });
  },
  userByUsername: (req, res) => {
    db.users
      .findByPk(req.params.id)
      .then((user) => {
        req.json(user);
      })
      .catch((error) => {
        res.status(500).json({
          status: STATUS_ERROR,
          error,
        });
      });
  },
  createUser: (req, res) => {
    const body = req.body;
    db.users
      .create(body)
      .then((user) => {
        res.status(201).json({
          data: user,
          status: STATUS_SUCCESS,
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: STATUS_ERROR,
          error,
        });
      });
  },
};

module.exports = userApiMethods;
