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
 * ANY WARRANTY without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
 * for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with BoxCharter. If not, see <http://www.gnu.org/licenses/>.
 *
 */

/**
 * Component for error.
 * @module Error
 */

import React from 'react';
import PropTypes from 'prop-types';

const Error = props => (
  <div data-test="error-component">
    <h3><clr-icon shape="error-standard" size="36" /> An error occurred.</h3>
    <br />
    <details>
      {props.error && props.error.toString()}
      <br />
      <pre>{props.errorInfo.componentStack}</pre>
    </details>
    <h4>The site administrator has been alerted. In the meantime, enjoy this picture of a kitten.</h4>
    <img alt="kitten" src="/public/images/kitten.jpg" />
  </div>
);


Error.defaultProps = {
  error: null,
  errorInfo: { componentStack: '' },
};

Error.propTypes = {
  error: PropTypes.instanceOf(Error),
  errorInfo: PropTypes.shape({
    componentStack: PropTypes.string,
  }),
};

export default Error;
