import React, { Component } from 'react';
import { fetchAlbums, fetchPhotos } from '../apiUtil';
import './Albums.scss';

class Albums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      photos: [],
      currentAlbumId: 0,
    };
  }

  async componentDidMount() {
    const albums = await fetchAlbums();
    const currentAlbumId = albums[0].id;

    albums.forEach(async (album) => {
      const photos = await this.fetchPhotosOfAlbum(album.id);
      photos.forEach((photo) => {
        const image = new Image();
        image.src = photo.thumbnailUrl;
      });
    });

    this.setState({ albums, currentAlbumId });
  }

  albumClicked = (albumId) => {
    this.setState({ currentAlbumId: albumId });
  };

  async fetchPhotosOfAlbum(albumId) {
    const photos = (await fetchPhotos(albumId)).slice(0, 3);
    this.setState((prevState) => ({ photos: [...prevState.photos, ...photos] }));
    return photos;
  }

  renderPhotosOfAlbum(albumId) {
    const photos = this.state.photos.filter((photo) => photo.albumId === albumId).slice(0, 3);

    return (
      <div className="photos">
        {photos.map((p) => (
          <figure className="figure" key={p.id}>
            <img className="photo" src={p.thumbnailUrl} alt={`Photo ${p.id}`} />
            <figcaption>{p.title}</figcaption>
          </figure>
        ))}
      </div>
    );
  }

  render() {
    const { albums } = this.state;
    return (
      <section className="Albums">
        {albums.map((album) => (
          <div
            className="album"
            key={album.id}
            data-testid="album"
            onClick={() => this.albumClicked(album.id)}
          >
            <h1 className="title">{album.title}</h1>
            {album.id === this.state.currentAlbumId && this.renderPhotosOfAlbum(album.id)}
          </div>
        ))}
      </section>
    );
  }
}

export default Albums;
