import React, { Component } from 'react';
import fire from './config/Fire';
import './App.css'
import MovieRow from './movieRow.js'
import $ from 'jquery'

class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {}
        // console.log("This is my initializer")

    //Landing page, random movie so landing page is not empty
    this.performSearch("Disney")
    }

    //signout
    logout() {
        fire.auth().signOut();
    }

    //API key from movieDB and  call to the movie DB API
    performSearch(searchTerm) {
        console.log("Perform search using moviedb")
        const urlString = "https://api.themoviedb.org/3/search/movie?api_key=2b00ca824af6a6215b7c632520adcbd5&query=" + searchTerm
        $.ajax({
          url: urlString,
          success: (searchResults) => {
            console.log("Fetched data successfully")
            // console.log(searchResults)
            const results = searchResults.results
            // console.log(results[0])
    
            var movieRows = []
    
            //poster for each title
            results.forEach((movie) => {
              movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
              // console.log(movie.poster_path)
              const movieRow = <MovieRow key={movie.id} movie={movie}/>
              movieRows.push(movieRow)
            })
    
            this.setState({rows: movieRows})
          },
          error: (xhr, status, err) => {
            console.error("Failed to fetch data")
          }
        })
      }

      //search bar
    searchChangeHandler(event) {
        console.log(event.target.value)
        const boundObject = this
        const searchTerm = event.target.value
        boundObject.performSearch(searchTerm)
      }


    render() {
        return (
            <div>
            <table className="titleBar">
              <tbody>
                <tr>
                  <td>
                    <img alt="app icon" width="50" src="green_app_icon.svg"/>
                  </td>
                  <td width="8"/>
                  <td>
                    <h1>LookUP</h1>
                  </td>
                  <td>
                  <button onClick={this.logout}style={{marginLeft: '900px'}} className="btn btn-danger">Logout</button>
                  </td>
                </tr>
              </tbody>
            </table>

          
            <input style={{
              fontSize: 24,
              display: 'block',
              width: "100%",
              paddingTop: 8,
              paddingBottom: 8,
              paddingLeft: 16
            }} onChange={this.searchChangeHandler.bind(this)} placeholder="Enter search term"/>
    
            {this.state.rows}
    
            </div>
        );

    }

}

export default Home;

