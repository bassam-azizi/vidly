import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortedColumn: {path: 'title', order: 'asc'}    
  };
  componentDidMount() {
    //  This is the best place to communicate and get your data from the server
    // this is how to add a new element to a dataBase but just on the end part
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres });
  }

  render() {
    const { length: count } = this.state.movies;

    const {
      selectedGenre,
      currentPage,
      pageSize,
      movies: allMovies,
      genres
    } = this.state;

    if (count === 0) return <h3>There are no movies showing on the list .</h3>;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3 m-2">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onGenreSelected={this.handelGenreSelected}
          />
        </div>
        <div className="col">
          <p>Showing {filtered.length} movies on the list .</p>
          <MoviesTable
            movies={movies}
            onLike={this.handelLike}
            onDelete={this.handelDelete}
            onSort={this.handelSort}
          />
          <Pagination
            itemCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            pageSelect={this.handelPageSelected}
          />
        </div>
      </div>
    );
  }
  handelDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };
  handelLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handelPageSelected = page => {
    this.setState({ currentPage: page });
  };

  handelGenreSelected = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handelSort = path => {
    this.setState({ sortColumn: { path, order: "asc" } });
  };
}

export default Movies;
