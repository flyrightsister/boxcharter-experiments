/*
 * Copyright (c) 2018 Bonnie Schulkin. All Rights Reserved.
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
 * Tests for the SignOut component
 * @module
 * SignOut-spec
 */

import React from 'react';
import { shallow } from 'enzyme';

import { checkProps } from '../../jest/utils';
import { findWrapperNodeByTestId } from '../../jest/clientTestUtils';
import { SignOutComponent } from './SignOut';
import { ClarityAlert } from '../clarity';

const defaultProps = {
  signOutUser: () => {},
};

describe('SignOut', () => {
  const signOutUserMock = jest.fn();
  let wrapper;
  beforeEach(() => {
    signOutUserMock.mockClear();
    const props = {
      ...defaultProps,
      signOutUser: signOutUserMock,
    };
    wrapper = shallow(<SignOutComponent {...props} />);
  });
  describe('renders', () => {
    test('renders component', () => {
      expect(findWrapperNodeByTestId(wrapper, 'sign-out-component').length).toBe(1);
    });
    test('renders sign out alert', () => {
      expect(wrapper.find(ClarityAlert).length).toBe(1);
    });
    test('renders sign in component', () => {
      // TODO: go down the https://github.com/airbnb/enzyme/issues/1002 rabbit hole with connected components / dive
      // expect(findWrapperNodeByTestId(wrapper, 'sign-in-component').length).toBe(1);
    });
  });
  test('signs user out', () => {
    expect(signOutUserMock).toHaveBeenCalledTimes(1);
  });
  describe('prop-types', () => {
    test('no error with correct props', () => {
      const propError = checkProps(SignOutComponent, defaultProps);
      expect(propError).toBeUndefined();
    });
  });
});
