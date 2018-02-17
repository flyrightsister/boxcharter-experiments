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
 * User detail component
 * @module
 * user_detail
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserCharts from './user_charts'
import { USER_PROFILE } from './header/tab_names'
import * as actions from '../actions'

class UserPage extends Component {
  componentDidMount() {
    this.props.setActiveNavTab(USER_PROFILE)
  }
  render() {
    return (
      <div className="user-page">
        <h3>Charts</h3>
        <UserCharts />
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps, actions)(UserPage)