import { shallow } from 'enzyme';
import React from 'react';
import { fetchAlbums } from '../apiUtil';
import Albums from './Albums';

jest.mock('../apiUtil');

const flushPromises = () => new Promise(setImmediate);

describe('<Albums />', () => {
  it('should display album titles', async () => {
    const data = [
      {
        title: 'quidem molestiae enim',
      },
      {
        title: 'sunt qui excepturi placeat culpa',
      },
    ];

    fetchAlbums.mockResolvedValue(data);

    const wrapper = shallow(<Albums />);
    await flushPromises();
    wrapper.update();

    const text = wrapper.text();

    expect(text).toContain(data[0].title);
    expect(text).toContain(data[1].title);
  });
});
