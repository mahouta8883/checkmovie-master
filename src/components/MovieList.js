// MovieList component to display a list of movies
import MovieCard from "./MovieCard";
const MovieList = ({ movies }) => {
    return (
      <div className="movie-list">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
    );
  };
  



  export default MovieList