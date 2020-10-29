import React from 'react';
import { shallow } from 'enzyme';

import UserInfo from './UserInfo';

describe('<UserInfo />', () => {
  it('should display information', () => {
    const info = {
      name: 'Sunny Yang',
      email: 'guang.yang@thoughtworks.com',
      phone: '1234567890',
      website: 'guang.yang.thoughtworks.com',
      company: { name: 'ThoughtWorks' },
    };

    const userInfo = shallow(<UserInfo info={info} />);

    const text = userInfo.text();

    expect(text).toContain(info.name);
    expect(text).toContain('Contact Me @');
    expect(text).toContain(`Email${  info.email}`);
    expect(text).toContain(`Phone${  info.phone}`);
    expect(text).toContain(`Website${  info.website}`);
    expect(text).toContain(`Company${  info.company.name}`);
  });
});
