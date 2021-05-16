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

        let totalPages = []

        const pagesToDisplay = Math.ceil(count / limit); // divido la cantidad de números que tengo por el límite que es 10, si me da con decimal devuelvo el entero inmediato mayor para tener una página más

        for (let i = 1; i <= pagesToDisplay; i++) { totalPages.push(i) } // recorro las páginas que tengo y las empujo a un array

        const pageHardCoded = parseInt(req.params.offset) + 1; // como mi offset tiene que arrancar en cero le sumo uno a lo que me venga

        const forNextAndLast = pageHardCoded >= pagesToDisplay; // pregunto si donde estoy parado es menor o igual a la cantidad de páginas que tengo *REF (1)

        const currentPage = offset / 10 + 1;

        const meta = {
          totalProductsInDb: count,
          totalPages,
          currentPage,
          hasPrevious: offset != 0, // si mi offset que me indica el número de página por req params no es cero significa que no estoy en la primera página entonces tengo páginas anteriores
          hasNext: !forNextAndLast, // si donde estoy parado es distinto a la cantidad de páginas que tengo (porque es menor *Ver REF(1)) significa que tengo una página siguiente
          isLast: forNextAndLast, // si donde estoy parado es igual a la cantidad de páginas que tengo significa que estoy en la última
        };
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
