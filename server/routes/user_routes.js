/*
 * Copyright (c) 2017 Bonnie Schulkin. All Rights Reserved.
 *
 * This file is part of BoxCharter.
 *
 * BoxCharter is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * BoxCharter is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
 * for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with BoxCharter. If not, see <http://www.gnu.org/licenses/>.
 *
 */

var express = require('express');
var passUtils = require('../utilities/password_utils');
var user = require('../model/user')
var statusStrings = require('../model/status').statusStrings
var Status = require('../model/status').Status
var logger = require('../utilities/log').logger
var procError = require('../utilities/err')
var checkPass = require('../utilities/password_utils').checkPass

// create the router
var router = express.Router();

/***********************/
/* POST authorize user */
/***********************/
router.post('/auth', function(req, res, next) {
  const email = req.body.email
  const password = req.body.password
  const status = new Status()

  user.User.find({where: {email: email}})
    // can't use findByEmail here because we need hash and salt
    .then(foundUser => {
      if (foundUser === null || !checkPass(foundUser, password)) {
        // user not in db or password doesn't match
        status.alertType = statusStrings.danger
        status.text = "Invalid email and/or password"

        response = { status: status }
        logger.warn(`${email} loggedin with invalid password`)
        res.status(200).json(response)
        return
      }

      // otherwise, all's rosy
      msg = `Successful login for ${email}`
      status.alertType = statusStrings.success
      status.text = msg
      logger.debug(msg)

      user.User.getByEmail(foundUser.email).then(cleanUser => {
        const response = {
          status: status,
          user: cleanUser
        }
        res.status(200).json(response)
      })
    })
    .catch(error => {
      console.log(error)
      msg = `Unable to authenticate user ${email}`
      response = procError(error, msg)
      res.status(200).json(response)
    })

})

/***********************/
/* POST new user.      */
/***********************/

router.post('/add', function(req, res, next) {
  const userInfo = req.body

/* { email: 'bonnie@bonnie',
  fname: 'bonnie',
  lname: 'bonnie',
  password: 'bonnie',
  password2: 'bonnie' } */

  // create salted password hash
  // general web consensus seems to be: hash on server side, and use
  // https to protect password in transit
  const passData = passUtils.saltHashPassword(userInfo.password)

  // massage userInfo obj to contain salted pass hash
  userInfo.passwordHash = passData.passwordHash
  userInfo.passwordSalt = passData.salt
  delete userInfo.password

  // create user
  user.User
    .create(userInfo)
    .then(newUser => {
      const email = newUser.email
      const msg = `New user ${email} successfully added.`
      logger.info(msg)

      const response = {}
      response.status = new Status(statusStrings.success, msg)
      user.User.getByEmail(email)
        .then(newUserJSON => {
          response.user = newUserJSON
          res.status(200).json(response);
        })
    })
    .catch(error => {
      msg = `Unable to add user ${userInfo.email}`
      const response = procError(error, msg)
      res.status(200).json(response)
    })
});

/***********************/
/* GET user existence. */
/***********************/

router.get('/check', function(req, res, next) {

  const email = req.query.email

  user.User.findOne({ where: {email: email} })
    .then(foundUser => {
      inDB = foundUser ? true : false
      const result = { status: {type: statusStrings.success}, inDB: inDB }
      res.status(200).json(result)
    })
    .catch(error => {
      msg = `Unable to check user ${email}`
      response = procError(error, msg)
      res.status(200).json(response)
    })
});

module.exports = router;