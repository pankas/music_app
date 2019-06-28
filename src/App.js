import React from 'react';
import './App.css';
import Playlist from './Playlist';
import Timestamp from './Timestamp';
import Controls from './Control';
import {albumList,artist} from './AlbumList';

class App extends React.Component {
  constructor(props, defaultProps) {
    super(props, defaultProps);
    
    this.state = {
      playStatus: 0,
      currentTrack: 0,
      nextTrack: 1,
      prevTrack: 0,
      currentTime: 0,
      sliding: 0,
      likedTracks: [],
      viewMode: "player",
      tracks:albumList[0].track,
      albumTitle:''
    }
    
    this.togglePlay = this.togglePlay.bind(this);
    this.toggleViewMode = this.toggleViewMode.bind(this);
    this.nextTrack = this.nextTrack.bind(this);
    this.prevTrack = this.prevTrack.bind(this);
    this.likeTrack = this.likeTrack.bind(this);
    this.changeTrack = this.changeTrack.bind(this);
  }

  toggleViewMode() {
    let viewMode = "";
    switch(this.state.viewMode) {
      case "player":
        viewMode = "playlist";
        break;
      case "playlist":
        viewMode = "player"
        break;
    }
    
    this.setState({
      viewMode: viewMode
    });
  }
  
  togglePlay() {
    let status = this.state.playStatus;
    if (status == 0) {
      // Play
      status = 1;
      this.timer = setInterval(() => {
        this.setTime(this.state.currentTime + 1);
      }, 1000);
    } else {
      // Pause
      status = 0;
      clearInterval(this.timer);
    }
    this.setState({ playStatus: status });
  }
  
  changeTrack(track, dir) {
    if (this.state.sliding == 0) {
      let this_track = track;
      let next_track = track + 1;
      let prev_track = track - 1;

      if (next_track >= this.state.tracks.length) next_track = 0;   
      if (prev_track < 0) prev_track = this.state.tracks.length - 1;

      this.setState({
        sliding: dir
      });

      setTimeout(() => {
        this.setState({
          sliding: 0,
          currentTrack: this_track,
          nextTrack: next_track,
          prevTrack: prev_track,
          currentTime: 0
        });
      }, 500);
    }
  }
  
  nextTrack() {
    this.changeTrack(this.state.nextTrack, 1);
  }
  
  prevTrack() {
    if (this.state.currentTime < 2) {
      this.changeTrack(this.state.prevTrack, -1);
    } else {
      this.setState({
        currentTime: 0
      });
    }
  }
  
  likeTrack() {
    let likedTracks = this.state.likedTracks;
    let found = false;
    for (let i = 0; i < this.state.likedTracks.length; i++) {
      if (this.state.likedTracks[i] == this.state.currentTrack) {
        found = true;
        likedTracks.splice(i, 1);
        break;
      }
    }
    
    if (!found) {
      likedTracks.push(this.state.currentTrack);
    }
    
    this.setState({
      likedTracks: likedTracks
    });
  }
  
  setTime(time) {
    time = Math.floor(time);
    if (time > this.state.tracks[this.state.currentTrack].duration) {
      this.nextTrack();
    } else {
      this.setState({ currentTime: time });
    }
  }

    componentDidMount(){
      // this.setState({tracks:albumList})
      console.log('hghg',this.state.tracks[this.state.currentTrack])
    }

  render(){

    const prevTrack = this.state.tracks[this.state.prevTrack];
    const currentTrack = this.state.tracks[this.state.currentTrack];
    const nextTrack = this.state.tracks[this.state.nextTrack];
    
    let sliding = "";
    switch (this.state.sliding) {
      case -1:
        sliding = "is-sliding-prev";
        break;
      case 1:
        sliding = "is-sliding-next";
        break;
    }
    
    let playlistIcon = "fa fa-fw ";
    if (this.state.viewMode == "playlist") {
      playlistIcon += "fa-times";
    } else {
      playlistIcon += "fa-bars";
    }
    
    let isLiked = false;
    for (let i = 0; i < this.state.likedTracks.length; i++) {
      if (this.state.likedTracks[i] == this.state.currentTrack) {
        isLiked = true;
      }
    }
  return (
    <div className="container-fluid">
      <section className="banner">
      <div >
        <div className="row">
        <div className="col-sm-6 hero">
            <h1 style={{marginTop:"80%",marginLeft:"60%"}}>CURT<br/>SHEPHERD
            </h1>
            <h1>
            </h1>
          </div>
          <div className="col-sm-6" style={{paddingTop:"15%"}}>
          <table className="table table-hover table-borderless rotate" style={{marginLeft:"20%",marginBottom:"15%"}} cellPadding="20">
                      <tbody>
                        {artist.map((list,i)=>{
                          return(
                            <tr>
                            <td>{list.name}</td>
                            <td><i class="fa fa-circle"></i></td>
                            <td>{list.skills}</td>
                          </tr>
                        )})}
                      </tbody>
                    </table> 
            <h2 style={{marginTop:"8%",textAlign:"center"}}>Meet Our Band
            </h2>
            <p style={{marginBottom:"25%",textAlign:"center"}}>
            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
            </p>
          </div>
        </div>
      </div>
      </section>
      <section>'
        <div >
        <div className="row">
          <div className="col-sm-6 cd">
    
              
          </div>
          <div className="col-sm-6">
          <div className="wrapper">
        <article className={["player", sliding].join(' ')}>
          {/* <section className="player__art">
            <button className="button toggle-playlist" onClick={this.toggleViewMode}>
              <span className="icon">
                <i className={playlistIcon}></i>
              </span>
            </button>
          </section> */}
          <section className="player__body">
          <h2>Now Playing</h2>
            {/* <p className="title">{currentTrack}</p> */}
            {/* <p className="subtitle">{currentTrack}</p> */}
            <Controls isPlaying={this.state.playStatus} isLiked={isLiked} togglePlay={this.togglePlay} nextTrack={this.nextTrack} prevTrack={this.prevTrack} likeTrack={this.likeTrack} />
            <Timestamp duration={currentTrack.duration} current={this.state.currentTime} />
          </section>
          
        </article>
      </div>
            </div>
        </div>
        </div>
      </section>
      <section>
        <div >
          <div className="row">
            <div className="col-sm-6">
            <div className="container container-fixed-lg bg-white">
                  <div className="card card-transparent"  style={{border:"none"}}>
                 <h2> DISCOGRAHY</h2>
                    <div className="card-block p-0">
                     <table className="table table-hover table-borderless" cellpadding="20">
                      <tbody>
                        {albumList.map((list,i)=>{
                          return(
                            <tr>
                            <td>{list.name}</td>
                            <td><i class="fa fa-circle"></i></td>
                            <td>{list.year}</td>
                            <td>
                            <button className="styled-button" onClick={()=>{this.setState({albumTitle:list.name,tracks:list.track,prevTrack:list.track.length-1})}}>Listen</button>
                            </td>
                            <td>
                            <button className="styled-button2">Buy</button>
                            </td>
                          </tr>
                          )
                        })}
                      </tbody>
                    </table> 
                    </div>
                    </div>
                    </div>
            </div>
            <div className="col-sm-6">
            <Playlist tracks={this.state.tracks} isVisible={this.state.viewMode == "playlist"} changeTrack={this.changeTrack} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  }
}

export default App;
