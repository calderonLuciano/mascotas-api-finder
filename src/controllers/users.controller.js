const Users = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

create = async (req, res) => {
  const body = req.body;

  const passwordEncrypted = await bcrypt.hashSync(body.password, 10);

  let user = new Users({
    name: body.name,
    email: body.email,
    password: passwordEncrypted,
    role: body.role
  });

  user.save((err, userDB) => {
    if(err) return res.status(400).send({
      ok: false,
      err
    });

    res.send({
      ok: true,
      user: userDB
    })
  });
}

login = async (req, res) => {
  const body = req.body;

  Users.findOne({email: body.email}, (err, userDB) => {
    if(err) return res.status(500).send({ok: false, err});

    if(!userDB) {
      return res.status(400).send({ok: false, err: {message: 'Usuario o contraseña incorrectos'}})
    }

    if( !bcrypt.compareSync(body.password, userDB.password) ) {
      return res.status(400).send({ok: false, err: {message: 'Usuario o contraseña incorrectos'}})
    }

    let token = jwt.sign({
      user: userDB
    }, 'secret', {expiresIn: 60 * 60});

    return res.send({
      ok: true, 
      user: userDB,
      token
    });
  })
}

update = async (req, res) => {
  const idUser = req.params.id;
  const body = req.body;

  Users.findByIdAndUpdate( idUser, body, { new: true }, (err, userDB) => {
    if(err) return res.status(400).send({
      ok: false,
      err
    });

    res.send({
      ok: true,
      user: userDB
    });
  });
}

module.exports = {
  create,
  login,
  update
}