const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// Create user
router.post("/", async (req, res) => {
    const { username, password } = req.body;

    if(password.length < 6) {
        res.status(500).json({msg: "La contraseña debe tener más de 6 caracteres."})
        return;
    }

    let newUser = new User({
        username,
        passwordHash: bcrypt.hashSync(password, 10),
        numNotes: 0
    });

    newUser
        .save()
        .then(user => {
            jwt.sign({
                username: newUser.username
            }, 'secret', (err, token) => {
                if(err) throw err;
                res.send({
                    token,
                    user: {
                        username: user.username
                    }
                });
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({msg: `El usuario ${err.keyValue['username']} ya existe. Intenta iniciar sesión.`})
        });
})

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username })
        .then(user => {
            if(!user) {
                res.status(500).json({msg: "No existe un usuario registrado con este username: ", username });
                return;
            } else if (!bcrypt.compareSync(password, user.passwordHash)) {
                res.status(500).json({msg: "Contraseña incorrecta"});
            }

            jwt.sign({
                username: user.username
            }, 'secret', (err, token) => {
                if(err) throw err;
                res.send({
                    token,
                    user: {
                        username: user.username
                    }
                });
            });
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
})

module.exports = router;