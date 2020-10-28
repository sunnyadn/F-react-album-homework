import React from 'react';
import { shallow } from 'enzyme';

import UserInfo from './UserInfo';

describe('<UserInfo />', () => {
  it('should display name', () => {
    const userInfo = shallow(<UserInfo />);

    expect(userInfo.text()).toContain('Leanne Graham');
  });
});
