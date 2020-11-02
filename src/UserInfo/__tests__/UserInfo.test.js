import React from 'react';
import { render } from '@testing-library/react';

import UserInfo from '../UserInfo';

describe('<UserInfo />', () => {
  it('should display information', () => {
    const info = {
      name: 'Sunny Yang',
      email: 'guang.yang@thoughtworks.com',
      phone: '1234567890',
      website: 'guang.yang.thoughtworks.com',
      company: { name: 'ThoughtWorks' },
    };

    const { getByText } = render(<UserInfo info={info} />);

    expect(getByText(info.name)).toBeInTheDocument();
    expect(getByText('Contact Me @')).toBeInTheDocument();
    expect(getByText(info.email)).toBeInTheDocument();
    expect(getByText(info.phone)).toBeInTheDocument();
    expect(getByText(info.website)).toBeInTheDocument();
    expect(getByText(info.company.name)).toBeInTheDocument();
  });
});
