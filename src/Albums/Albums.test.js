import { shallow } from 'enzyme';
import React from 'react';
import { fetchAlbums, fetchPhotos } from '../apiUtil';
import Albums from './Albums';

jest.mock('../apiUtil');

const flushPromises = () => new Promise(setImmediate);

describe('<Albums />', () => {
  const albums = [
    {
      id: 1,
      title: 'quidem molestiae enim',
    },
    {
      id: 2,
      title: 'sunt qui excepturi placeat culpa',
    },
  ];

  const photos = [
    {
      albumId: 1,
      id: 1,
      title: 'accusamus beatae ad facilis cum similique qui sunt',
      url: 'https://via.placeholder.com/600/92c952',
      thumbnailUrl: 'https://via.placeholder.com/150/92c952',
    },
    {
      albumId: 1,
      id: 2,
      title: 'reprehenderit est deserunt velit ipsam',
      url: 'https://via.placeholder.com/600/771796',
      thumbnailUrl: 'https://via.placeholder.com/150/771796',
    },
    {
      albumId: 1,
      id: 3,
      title: 'officia porro iure quia iusto qui ipsa ut modi',
      url: 'https://via.placeholder.com/600/24f355',
      thumbnailUrl: 'https://via.placeholder.com/150/24f355',
    },
    {
      albumId: 1,
      id: 4,
      title: 'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
      url: 'https://via.placeholder.com/600/d32776',
      thumbnailUrl: 'https://via.placeholder.com/150/d32776',
    },
    {
      albumId: 1,
      id: 5,
      title: 'natus nisi omnis corporis facere molestiae rerum in',
      url: 'https://via.placeholder.com/600/f66b97',
      thumbnailUrl: 'https://via.placeholder.com/150/f66b97',
    },
  ];

  fetchAlbums.mockResolvedValue(albums);
  fetchPhotos.mockResolvedValue(photos);

  let wrapper;

  beforeAll(async () => {
    wrapper = shallow(<Albums />);
    await flushPromises();
    wrapper.update();
  });

  it('should display album titles', () => {
    const text = wrapper.text();
    expect(text).toContain(albums[0].title);
    expect(text).toContain(albums[1].title);
  });

  it('should show the first three photos of the first album', async () => {
    const album = wrapper.find('.album:first-child');
    expect(album.find('img')).toHaveLength(3);

    const text = album.text();

    expect(text).toContain(photos[0].title);
    expect(text).toContain(photos[1].title);
    expect(text).toContain(photos[2].title);
  });
});
