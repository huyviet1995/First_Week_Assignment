import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import logo from './logo.svg';
import './App.css';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import {SearchBar} from "react-elements";

// This is used to download and use some information about the card
class Movie extends Component {
  render() {
    const realPosterPath = "https://image.tmdb.org/t/p/w342" + this.props.poster_path;
    return (
      <Card id = {this.props.id}>
        <CardImg
          top
          width = {200} 
          height = {300}
          src = {realPosterPath} 
          alt = "Card Image Cap"
        />
        <CardBody>
          <CardTitle> {this.props.title} </CardTitle>
          <CardSubtitle> {this.props.overview} </CardSubtitle>
        </CardBody>
      </Card>
    )
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      listMovies : [],  
      isVisibleLoading: true 
    }
  }

  sleep = function(time){new Promise(r => setTimeout(r, time));}

  async componentDidMount() {
    const response = await fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=99846e28fc271111f758a8e9c8486d0b");
    const movieData = await response.json();
    await this.sleep(4000);
    this.setState({
      listMovies: movieData.results,
      isVisibleLoading: false
    });
  }

  handleChange = (event) => {
    this.setState({query: event.target.value});
  }

  render() {
    return (
      <div className ="App">
      <form>
        <input 
          placeholder = "Search for ..."
          value = {this.state.query}
          onChange = {(event) => {this.handleChange(event)}}
        />
      </form>
      {
        this.state.isVisibleLoading === true ? (
          <ReactLoading type = 'spin' color = 'red' width = {100} height = {100}/>
        )
        :(this.state.listMovies.map((movie) => {
          if (this.state.query.length == 0)
            return (
              <div>
                {
                  <Movie title = {movie.title}
                  overview = {movie.overview}
                  poster_path = {movie.poster_path}/>
                }
              </div>
            )
          else if (movie.title.toLowerCase().includes(this.state.query)) {
            return (
              <div>
                {
                  <Movie title = {movie.title}
                  overview = {movie.overview}
                  poster_path = {movie.poster_path}/>
                }
              </div>
            )
          }
          }))
      }
      </div>
    );
  }
}

export default App;