  
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
}

const UpdateMovie = props => {
    // get the params and history objects
    const { id } = useParams();
    const { push } = useHistory();

    const [movie, setMovie] = useState(initialMovie);
    const [movieList] = useState(props.movieList)
    // find the movie and set it to state
    // get rid of the id from params
    // loop through the movie list to find the movie
    // set the movie to state to pre-populate the form

    useEffect(() => {
        const movieToUpdate = movieList.find(el => `${el.id}` === id);
        if (movieToUpdate) {
            setMovie(movieToUpdate);
        }
    }, [movieList, id]);

    const handleChange = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        // make a PUT request to edit the item
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(response => {
            //update state in App through the setter function
            //navigate user to the movie list page
            //(potentially, you could just how a success message without navigating)
            // props.setMovie
            props.setMovieList(response.movie);
            push(`/movies/${id}`);
        })
        .catch(error => console.log(error));
    }
    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="id" onChange={handleChange} placeholder="id" value={movie.id} />
                <input type="text" name="title" onChange={handleChange} placeholder="title" value={movie.title} />
                <input type="text" name="director" onChange={handleChange} placeholder="director" value={movie.director} />
                <input type="text" name="metascore" onChange={handleChange} placeholder="metascore" value={movie.metascore} />
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie;