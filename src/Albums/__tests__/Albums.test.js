import { render, waitFor } from '@testing-library/react';
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
    const { getByText } = render(<Albums />);

    await waitFor(() => expect(fetchPhotos).toHaveBeenCalled());

    expect(getByText(albums[0].title)).toBeInTheDocument();
    expect(getByText(albums[1].title)).toBeInTheDocument();
  });

  it('should show the first three photos of the first album', async () => {
    const { getByText, getAllByAltText } = render(<Albums />);

    await waitFor(() => expect(fetchPhotos).toHaveBeenCalled());

    expect(getByText(photos[0].title)).toBeInTheDocument();
    expect(getByText(photos[1].title)).toBeInTheDocument();
    expect(getByText(photos[2].title)).toBeInTheDocument();

    expect(getAllByAltText(/Photo \d/)).toHaveLength(3);
  });
});
