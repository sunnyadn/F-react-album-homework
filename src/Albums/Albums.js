import React, { Component } from 'react';
import { fetchAlbums } from '../apiUtil';
import './Albums.scss';

class Albums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
    };
  }

  async componentDidMount() {
    const albums = await fetchAlbums();
    this.setState({ albums });
  }

  render() {
    const { albums } = this.state;
    return (
      <section className="Albums">
        {albums.map((album) => (
          <div className="album" key={album.id}>
            <h1 className="title">{album.title}</h1>
          </div>
        ))}
      </section>
    );
  }
}

export default Albums;
