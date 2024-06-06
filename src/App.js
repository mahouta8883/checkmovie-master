import React,{useState} from "react";
import Filter from "./components/Filter";
import MovieList from "./components/MovieList";
import"./App.css"

const App = () => {
  const [movies, setMovies] = useState([
    {
      title: 'Inception',
      description: 'A thief who enters the dreams of others to steal secrets from their subconscious.',
      posterURL: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
      rating: 8.8,
    },
    {
      title: 'The Shawshank Redemption',
      description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      posterURL: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
      rating: 9.3,
    },
    // Add more movies as needed
  ]);

  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [titleFilter, setTitleFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  // Function to add a new movie
  const addMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  // Function to handle title filter change
  const handleTitleChange = (e) => {
    const { value } = e.target;
    setTitleFilter(value);
    filterMovies(value, ratingFilter);
  };

  // Function to handle rating filter change
  const handleRatingChange = (e) => {
    const { value } = e.target;
    setRatingFilter(value);
    filterMovies(titleFilter, value);
  };

  // Function to filter movies
  const filterMovies = (title, rating) => {
    let filtered = movies.filter((movie) => {
      return (
        movie.title.toLowerCase().includes(title.toLowerCase()) &&
        (!rating || movie.rating >= rating)
      );
    });
    setFilteredMovies(filtered);
  };

  return (
    <div className="app">
      <h1>Movie App</h1>
      <Filter onTitleChange={handleTitleChange} onRatingChange={handleRatingChange} />
      <MovieList movies={filteredMovies} />
      <h2>Add New Movie</h2>
      <AddMovieForm addMovie={addMovie} />
    </div>
  );
};

// AddMovieForm component to add new movies
const AddMovieForm = ({ addMovie }) => {
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    posterURL: '',
    rating: '',
  });

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    addMovie(newMovie);
    setNewMovie({
      title: '',
      description: '',
      posterURL: '',
      rating: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" value={newMovie.title} onChange={handleChange} />
      <input type="text" name="description" placeholder="Description" value={newMovie.description} onChange={handleChange} />
      <input type="url" name="posterURL" placeholder="Poster URL" value={newMovie.posterURL} onChange={handleChange} />
      <input type="number" name="rating" placeholder="Rating" value={newMovie.rating} onChange={handleChange} />
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default App;