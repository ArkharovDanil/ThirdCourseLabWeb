import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import FileUpload from './FileUpload';

function CreateTrack() {
    const [trackTitle, setTrackTitle] = useState('');
    const [trackArtist, setTrackArtist] = useState('');
    const [trackGenre, setTrackGenre] = useState('');

    const [tracksWithDifferentArtists, setTracksWithDifferentArtists] = useState([]);
    const [tracksWithDifferentGenres, setTracksWithDifferentGenres] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/api/getdifart').then((response) => {
          setTracksWithDifferentArtists(response.data);
        });
        Axios.get('http://localhost:3001/api/getdifgen').then((response) => {
            setTracksWithDifferentGenres(response.data);
          });
    }, []);

    const submitTrack = () => {
        Axios.post('http://localhost:3001/api/insert', {
        title: trackTitle || "New Song",
        artist: trackArtist || "Mucuraev",
        genre: trackGenre || "Kruto"
        })
    };

    return (
        <div className='CreateTrack'>
            <p>Загрузите файл и отправьте информацию о нем</p>
            <FileUpload />
            <form name="newTrack" className='newTrackForm'>
                <label htmlFor="title">Название</label>
                <input name="title" type="text" onChange={(e) => {
                    setTrackTitle(e.target.value);
                }} />
                <label htmlFor="artist">Исполнитель</label>
                <select name="artist" onChange={(e) => {
                    setTrackArtist(e.target.value);
                }}>
                    {tracksWithDifferentArtists.map((val, key) => {
                        return <option value={val.artist}>{val.artist}</option>
                    })}
                </select>
                <label htmlFor="genre">Жанр</label>
                <select name="genre" onChange={(e) => {
                    setTrackGenre(e.target.value);
                }}>
                    {tracksWithDifferentGenres.map((val, key) => {
                        return <option value={val.genre}>{val.genre}</option>
                    })}
                </select>
                <button className='trackLoad' onClick={submitTrack}>Отправить</button>
            </form>
            <div className='linkBlock'><a href='/'>Назад</a></div>
        </div>
    )
}

export default CreateTrack;