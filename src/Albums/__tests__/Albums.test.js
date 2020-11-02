import {
  fireEvent,
  getAllByAltText,
  getByText,
  queryByAltText,
  render,
  waitFor,
} from '@testing-library/react';
import React from 'react';
import { fetchAlbums, fetchPhotos } from '../../apiUtil';
import Albums from '../Albums';

jest.mock('../../apiUtil');

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

  it('should display album titles', async () => {
    const { getByText: text } = render(<Albums />);

    await waitFor(() => expect(fetchPhotos).toHaveBeenCalled());

    expect(text(albums[0].title)).toBeInTheDocument();
    expect(text(albums[1].title)).toBeInTheDocument();
  });

  it('should show the first three photos of the first album', async () => {
    const wrapper = render(<Albums />);

    await waitFor(() => expect(fetchPhotos).toHaveBeenCalled());

    const firstAlbum = wrapper.getAllByTestId('album')[0];

    expect(getByText(firstAlbum, photos[0].title)).toBeInTheDocument();
    expect(getByText(firstAlbum, photos[1].title)).toBeInTheDocument();
    expect(getByText(firstAlbum, photos[2].title)).toBeInTheDocument();

    expect(getAllByAltText(firstAlbum, /Photo \d/)).toHaveLength(3);
  });

  it('should expand the clicked album and collapse the previous one', async () => {
    const wrapper = render(<Albums />);

    await waitFor(() => expect(fetchPhotos).toHaveBeenCalled());

    fetchPhotos.mockResolvedValueOnce([
      {
        albumId: 2,
        id: 51,
        title: 'non sunt voluptatem placeat consequuntur rem incidunt',
        url: 'https://via.placeholder.com/600/8e973b',
        thumbnailUrl: 'https://via.placeholder.com/150/8e973b',
      },
      {
        albumId: 2,
        id: 52,
        title: 'eveniet pariatur quia nobis reiciendis laboriosam ea',
        url: 'https://via.placeholder.com/600/121fa4',
        thumbnailUrl: 'https://via.placeholder.com/150/121fa4',
      },
      {
        albumId: 2,
        id: 53,
        title: 'soluta et harum aliquid officiis ab omnis consequatur',
        url: 'https://via.placeholder.com/600/6efc5f',
        thumbnailUrl: 'https://via.placeholder.com/150/6efc5f',
      },
    ]);

    const secondAlbum = wrapper.getAllByTestId('album')[1];
    fireEvent.click(secondAlbum);

    await waitFor(() => expect(fetchPhotos).toHaveBeenCalled());

    expect(getAllByAltText(secondAlbum, /Photo \d/)).toHaveLength(3);

    const firstAlbum = wrapper.getAllByTestId('album')[0];
    expect(queryByAltText(firstAlbum, /Photo \d/)).not.toBeInTheDocument();
  });
});
