import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie(props) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const { push } = useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err));
  };
  
  const routeToUpdateForm = e => {
    e.preventDefault();
    console.log(props);
    push(`/update-movie/${movie.id}`);
  }

  const deleteMovie = (e, id) => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${movie.id}`)
    .then(response => {
      props.setMovieList(props.movies.filter(el => el.id !== response.data));
      push('/')
    })
  }

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />
      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <button onClick={routeToUpdateForm}>Update</button>
      <button onClick={deleteMovie}>Delete Movie</button>
    </div>
  );
}

export default Movie;