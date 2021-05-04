const db = require("../../database/models");
const { STATUS_SUCCESS, STATUS_ERROR, STATUS_NOT_FOUND } = require("./status");
const bcryptjs = require('bcryptjs');

const userApiMethods = {
  paginatedUsers: (req, res) => {
    const limit = 10;
    let offset = ( parseInt(req.params.offset) * limit )
    db.users
      .findAndCountAll({limit, offset})
      .then((users) => {
        const count = users.count;
        const usersData = users.rows.map(data => {
          let userObject = {
            id: data.id,
            user_name: data.user_name,
            name: data.first_name + ' ' + data.last_name,
            email: data.email,
            detail: `http://localhost:3010/admin/detail/${data.id}`
          }
          return userObject
        })

        const totalPages = Math.ceil( (count/limit) );
        const pageHardCoded = (parseInt(req.params.offset)+1)
        const forNextAndLast = (pageHardCoded >= totalPages)
        const currentPage = (offset/10 + 1)
        const meta = {
          totalUsersInDb: count,
          totalPages,
          currentPage,
          hasPrevious: offset != 0, 
          hasNext: !forNextAndLast, 
          isLast: forNextAndLast ,
        }
        res.status(200).json({meta, usersData});
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
