import React, { Component } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import AlbumDetails from './AlbumDetails';

//MARK: Functional Component:-
// const AlbumList = (props) => (
//     <View>
//     <Text>{props.name}</Text>
//     </View>
//   );

//MARK: Class Components:-


class AlbumList extends Component {
state = { albums: [] };


  componentWillMount() {
    console.log('componentWillMount call');
    //debugger;
    axios.get('https://rallycoding.herokuapp.com/api/music_albums')
          .then(response => this.setState({ albums: response.data }));
  }

reanderAlbums() {
   return this.state.albums.map(album =>
     <AlbumDetails key={album.title} data={album} />
   );
}

render() {
  console.log(this.state);
  return (
      <View>

          {this.reanderAlbums()}
      </View>
  );
}


}

export default AlbumList;
