// controllers/usersController.js
const usersStorage = require("../storages/usersStorage");
const db = require('../db/queries');


// This just shows the new stuff we're adding to the existing contents
const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const validateUser = [
  body("firstName").trim()
    .isAlpha().withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr}`),
  body("lastName").trim()
    .isAlpha().withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),
  body('email').trim()
    .isEmail().withMessage('Must be a valid email')
    .isLength({min: 1, max: 30}).withMessage(`Email must be between 1 and 30 characters`),
  body('age').trim()
    .optional({checkFalsy: true})
    .isNumeric().withMessage('Age must be a number')
    .isFloat({min: 18, max: 120}).withMessage('Age must be between 18 and 120'),
  body('bio').trim()
    .optional({checkFalsy: true})
    .isLength({max: 200}).withMessage('Bio must be 200 characters or less')
    
];







exports.usersListGet = async (req, res) => {

  const users = await db.getUsers();

  res.render("index", {
    title: "User list",
    users: users,
  });
};

exports.usersCreateGet = (req, res) => {
  res.render("createUser", {
    title: "Create user",
  });
};






  exports.usersUpdateGet = async (req, res) => {
    const user = await db.getUser(req.params.id);
    res.render("updateUser", {
      title: "Update user",
      user: user[0],
    });
  };

  // We can pass an entire array of middleware validations to our controller.
exports.usersCreatePost = [
    validateUser,
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("createUser", {
          title: "Create user",
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          age: req.body.age,
          bio: req.body.bio,
          errors: errors.array(),
        });
      }
      const { firstName, lastName, email, age, bio } = req.body;
      db.insertUserInfo([ firstName, lastName, email, age, bio ]);
      res.redirect("/");
    }
  ];
  
  exports.usersUpdatePost = [
    validateUser,
    (req, res) => {
      const user = usersStorage.getUser(req.params.id);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("updateUser", {
          title: "Update user",
          user: user,
          errors: errors.array(),
        });
      }
      const { firstName, lastName, email, age, bio } = req.body;
      db.updateUserInfo([ req.params.id, firstName, lastName, email, age, bio ]);
      res.redirect("/");
    }
  ];

  // Tell the server to delete a matching user, if any. Otherwise, respond with an error.
exports.usersDeletePost = (req, res) => {
    db.deleteUser(req.params.id);
    res.redirect("/");
  };

  exports.usersSearchGet = async (req, res, next) => {
    
    if(req.query.name) {
        const searchRes = await db.getSearch(req.query.name);

        res.render('searchResults', {name: req.query.name, title: 'Search Results', matches: searchRes})
    } else {
        res.render('search', {
            title: 'User Search',
        })
    }


  }


  