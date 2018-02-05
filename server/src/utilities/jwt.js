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

/**
 * Written with help from Stephen Grider's Advanced React and Redux Udemy Course
 * @module
 * jwt
 */

const jwt = require('jwt-simple')
const User = require('../model/db_user')
const config = require('../../config')

// resource: http://jwt.io

/**
 * Generate JSON web token for user
 * @param {User} user 
 */
function generateToken(userId) {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: userId, iat: timestamp }, config.secret)
}

module.exports = {
  generateToken
}