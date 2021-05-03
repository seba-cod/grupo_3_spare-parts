const db = require("../../database/models");
const { STATUS_SUCCESS, STATUS_ERROR, STATUS_NOT_FOUND } = require("./status");
const bcryptjs = require('bcryptjs');

const userApiMethods = {
  allUsers: (req, res) => {
    // Deberá devolver un objeto literal con la cantidad de usuarios en la base, y un array con el id, name, email y url de cada uno
    db.users
      .findAll()
      .then((users) => {
        let user = [];
        let count = 0;

        users.forEach(data => {
          count += 1;
          let userObject = {
            id: data.id,
            user_name: data.user_name,
            name: data.first_name + ' ' + data.last_name,
            email: data.email,
            detail: `http://localhost:3010/admin/detail/${data.id}`
          }
          user.push(userObject)
        })

        const usersData = {
          count, 
          user,
        }

        res.json(usersData);
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
        const userData = {
          ...user.dataValues
        }
        delete userData.password,
        delete userData.admin,
        delete userData.createdAt,
        delete userData.updatedAt,
        delete userData.deletedAt,
        userData.avatar = `http://localhost:3010/images/avatars/${userData.avatar}`
                
        res.json(userData);
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
