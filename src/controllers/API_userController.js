const db = require("../../database/models");
const { STATUS_SUCCESS, STATUS_ERROR, STATUS_NOT_FOUND } = require("./status");
const bcryptjs = require('bcryptjs');

const userApiMethods = {
  allUsers: (req, res) => {
    db.users
      .findAll()
      .then((users) => {
        res.json(users);
      })
      .catch((error) => {
        res.status(500).json({
          status: STATUS_ERROR,
          error,
        });
      });
  },
  userByPk: (req, res) => {
    db.users
      .findByPk(req.params.id)
      .then((user) => {
        res.json(user);
      })
      .catch((error) => {
        res.status(500).json({
          status: STATUS_ERROR,
          error,
        });
      });
  },
  createUser: (req, res) => {
    const password = bcryptjs.hashSync(req.body.password, 10);
    let body = req.body;
    body.password = password;
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
  updateUser: (req, res) => {
    const body = req.body;
    db.users
      .update(body, {
        where: {
          id: req.params.id,
        },
      })
      .then(() => {
        db.users.findByPk(req.params.id).then((product) => {
          res.status(201).json({
            data: product,
            status: STATUS_SUCCESS,
          });
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: STATUS_ERROR,
          error,
        })
      })
  },
  deleteUser: (req, res) => {
    db.users
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then(() => {
        res.status(200).json({
          status: STATUS_SUCCESS,
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: STATUS_ERROR,
          error,
        })
      })
  },
};



module.exports = userApiMethods;
