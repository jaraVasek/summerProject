import React from 'react'

class MovieRow extends React.Component {
  //loads the movie
  viewMovie() {
    // console.log("Trying to view movie")
    // console.log(this.props.movie.title)
    const url = "https://www.themoviedb.org/movie/" + this.props.movie.id
    window.location.href = url
  }

  //loads poster movie details, hyperlink button for more info and popularity vote
  render() {
    return <table key={this.props.movie.id}>
    <tbody>
      <tr>
        <td>
          <img id= "img" alt="poster" width="120" src={this.props.movie.poster_src}/>
        </td>
        <td>
          <h3>{this.props.movie.title}</h3>
          <p>{this.props.movie.overview}</p>
          <h3 style={{textAlign:"right"}}>Release date {this.props.movie.release_date}</h3>
          <input id="button" type="button" onClick={this.viewMovie.bind(this)} value="View more info"/>
          <p>Popularity: {this.props.movie.popularity}</p>

        </td>
      </tr>
    </tbody>
  </table>
  }
}

export default MovieRow