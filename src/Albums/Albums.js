import React, { Component } from 'react';
import { fetchAlbums, fetchPhotos } from '../apiUtil';
import './Albums.scss';

class Albums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      photos: [],
    };
  }

  async componentDidMount() {
    const albums = await fetchAlbums();
    await this.fetchPhotosOfAlbum(albums[0].id);

    this.setState({ albums });
  }

  async fetchPhotosOfAlbum(albumId) {
    const photos = await fetchPhotos(albumId);
    this.setState((prevState) => ({ photos: [...prevState.photos, ...photos] }));
  }

  renderPhotosOfAlbum(albumId) {
    const photos = this.state.photos.filter((photo) => photo.albumId === albumId).slice(0, 3);

    return photos.map((p) => <img src={p.thumbnailUrl} alt={`Photo ${  p.id}`} />);
  }

  render() {
    const { albums } = this.state;
    return (
      <section className="Albums">
        {albums.map((album) => (
          <div className="album" key={album.id}>
            <h1 className="title">{album.title}</h1>
            {this.renderPhotosOfAlbum(album.id)}
          </div>
        ))}
      </section>
    );
  }
}

export default Albums;
