import React, { Component } from 'react'

export default class Playlist extends Component {

    componentDidMount(){
        console.log("asdlk",this.props.tracks)
    }
    render() {
        const tracks = this.props.tracks;
    
    let isHidden = "";
    if (!this.props.isVisible) {
      isHidden = "is-hidden";
    }
        return (
      <div className="container container-fixed-lg bg-white">
                  <div className="card card-transparent" style={{border:"none"}}>
              <h3>    Surprise Without Flaws</h3>
                    <div className="card-block p-0">
                     <table className="table table-hover table-borderless">
                      <tbody>
                      {this.props.tracks.map((track, i) => {
                          return(
                            <tr key={i} onClick={() => this.props.changeTrack(i)}>
                          <td><i class="fa fa-caret-right"></i></td>
                          <td>0{track.sno}.</td>
                          <td>{track.name}</td>
                          <td>
                         ............................
                          </td>
                          <td>
                          {Math.floor(track.duration / 60)+':'+Math.floor(track.duration % 60)}
                          </td>
                        </tr>                  )}      )}
                      </tbody>
                    </table> 
                    </div>
                    </div>
                    </div>
            
        )
    }
}
