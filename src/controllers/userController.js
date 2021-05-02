/*  ------------------------------------------------- REQUIRES -------------------------------------------------- */

const db = require("../../database/models");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

/*  ----------------------------------------- METODOS DEL CONTROLADOR -------------------------------------------- */
module.exports = {
  login: (req, res) => {
    res.render("login");
  },
  auth: (req, res) => {
    // Utilizo express validator para cargar los errores
    let errors = validationResult(req);
    db.users
      .findOne({ where: { email: req.body.email } })
      .then((user) => {
        let comparePsw = bcryptjs.compareSync(req.body.password, user.password);
        if (comparePsw) {
          delete user.password;
          delete user.terms;
          req.session.user = user;
        } else {
          return res.render("login", {
            errors: {
              password: {
                msg: "La contraseña es incorrecta",
              },
            },
            old: req.body,
          });
        }
        // Si el usuario marca la casilla de Recuerdame, guardo su información en una cookie
        if (req.body.remember_user) {
          res.cookie("userEmail", user.email, {
            maxAge: 1000 * 60 * 60 * 24,
          });
        }
        return res.redirect("/user/profile");
      })
      .catch((err) =>
        res.render("login", {
          errors: {
            email: {
              msg: "No te encuentras registrado",
            },
          },
          old: req.body,
        })
      );
  },
  profile: (req, res) => {
    res.render("profile", {
      user: req.session.user,
    });
  },
  logout: (req, res) => {
    // Limpio la Cookie de remember_user
    res.clearCookie("userEmail");
    req.session.destroy();
    res.redirect("/");
  },
  register: (req, res) => {
    res.render("register");
  },
  create: (req, res) => {
    // Utilizo express validator para cargar los errores
    let errors = validationResult(req);
    //  Reviso que no se encuentre el correo electronico ya registrado
    db.users
      .findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (user) {
          return res.render("register", {
            errors: {
              email: { msg: "Este correo ya se encuentra registrado" },
            },
          });
        }
        // Pregunto si hay errores. Si los hay los devuelvo.
        if (!errors.isEmpty()) {
          res.render("register", {
            errors: errors.mapped(),
            old: req.body,
          });
        }

        const { user_name, first_name, last_name, email, address } = req.body;
        let password = bcryptjs.hashSync(req.body.password, 10);
        let avatar = req.file;
        db.users
          .create({
            user_name,
            first_name,
            last_name,
            email,
            address,
            password,
            avatar: avatar ? req.file.filename : "default.png",
          })
          .then((user) => {
            res.redirect("/user/login");
          });
      })
      .catch((err) => {
        console.log(err)
        // res.render("register", {
        //   errors: errors.mapped(),
        //   old: req.body,
        // });
      });
  },

  adminAll: (req, res) => {
    db.users
      .findAll()
      .then((users) => {
        return res.render("adminView", { users });
      })
      .catch((err) => res.send("Tu DB no está andando por: " + err));
  },
  detail: async (req, res) => {
    let id = req.params.id;
    let userWanted = await db.users.findByPk(id);
    return res.render("userDetail", { userWanted });
  },
  delete: (req, res) => {
    let id = req.params.id;
    db.users
      .destroy({ where: { id } })
      .then(() => {
        return res.redirect("/user/admin/all");
      })
      .catch((err) => {
        res.send("something went wrong " + err);
      });
  },
  userEdit: (req, res) => {
    let id = req.params.id;
    db.users
      .findByPk(id)
      .then((user) => {
        return res.render("userEdit", { user });
      })
      .catch((err) => {
        res.send("something went wrong " + err);
      });
  },
  adminEdit: (req, res) => {
    let id = req.params.id;
    db.users
      .findByPk(id)
      .then((user) => {
        return res.render("adminEdit", { user });
      })
      .catch((err) => {
        res.send("something went wrong " + err);
      });
  },
  adminUpdate: (req, res) => {
    // Utilizo express validator para cargar los errores
    // TODO revisar validaciones en UPDATE USUARIOS
    console.log(req.params.id)
    let errors = validationResult(req);
    let id = req.params.id;
    const { user_name, email, first_name, last_name, address } = req.body;
    db.users
      .findByPk(id)
      .then((old) => {
        db.users
          .update(
            {
              user_name,
              email,
              first_name,
              last_name,
              address,
              avatar: req.file ? req.file.filename : old.avatar,
            },
            {
              where: { id },
            }
          )
          .then(() => res.redirect(`/user/admin/all`));
      })
      .catch((err) => {
        return res.render("adminEdit", {
          errors: errors.mapped(),
          old: req.body,
        });
      });
  },
  userUpdate: (req, res) => {
    // Utilizo express validator para cargar los errores
    let errors = validationResult(req);
    let id = req.params.id;
    const { first_name, last_name, address } = req.body;
    let avatar = req.file;
    db.users
      .findByPk(id)
      .then((old) => {
        db.users
          .update(
            {
              first_name,
              last_name,
              address,
              avatar: avatar ? req.file.filename : old.avatar,
            },
            {
              where: { id },
            }
          )
          .then(() => res.redirect(`/user/profile`));
      })
      .catch((err) => {
        return res.render("adminEdit", {
          errors: errors.mapped(),
          old: req.body,
        });
      });
  },
};
