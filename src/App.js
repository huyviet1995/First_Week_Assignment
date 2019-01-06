import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

// This is used to download and use some information about the card
class Color extends Component {
  render() {
    return (
      <div>
        <h1> This is a new color {this.props.color} </h1>
      </div>
    )
  } 
}

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

  async componentDidMount = () => {
    const response = await fetch();
    const movieData = await response.json();
  }

  constructor() {
    super();
    this.state = {
      color: "red",
      car: "Toyota"
    }
  }
  render() {
    const listMovies = fakeData.results;
    return (
      <div className="App">
        {
          listMovies.map((movie) => {
            return (
              <div>
                <Movie 
                  title = {movie.title}
                  overview = {movie.overview}
                  poster_path = {movie.poster_path}
               />
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default App;