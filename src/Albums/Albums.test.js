import { shallow } from 'enzyme';
import React from 'react';
import { fetchAlbums } from '../apiUtil';
import Albums from './Albums';

jest.mock('../apiUtil');

describe('<Albums />', () => {
  it('should display album titles', () => {
    const data = [
      {
        title: 'quidem molestiae enim',
      },
      {
        title: 'sunt qui excepturi placeat culpa',
      },
    ];

    fetchAlbums.mockResolvedValue(data);

    const albums = shallow(<Albums />);
    const text = albums.text();

    expect(text).toContain(data[0].title);
    expect(text).toContain(data[1].title);
  });
});
