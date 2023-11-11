import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import AudioPlayer from './AudioPlayer';

function MainPage() {
    const [trackList, setTrackList] = useState([]);

    const [trackArtistFilter, setTrackArtistFilter] = useState('');
    const [trackGenreFilter, setTrackGenreFilter] = useState('');
    console.log(trackList);
    useEffect(() => {
        Axios.get('http://localhost:3001/api/get').then((response) => {
          setTrackList(response.data);
          console.log("we was here",response.data);
        });
    }, []);

    useEffect(() => {
        Axios.get(`http://localhost:3001/api/get?artist=${trackArtistFilter}`).then((response) => {
            setTrackList(response.data);
            console.log("we was here 2",response.data);
        });
    }, [trackArtistFilter]);

    useEffect(() => {
        Axios.get(`http://localhost:3001/api/get?genre=${trackGenreFilter}`).then((response) => {
            setTrackList(response.data);
            console.log("we was here 3",response.data);
        });
    }, [trackGenreFilter]);

    return (
        <div className='MainPage'>
            <AudioPlayer tracks={trackList} />
            <table className='tracklist'>
                <thead>
                    <tr>
                    <th>Название /</th>
                    <th>Исполнитель /</th>
                    <th>Жанр</th>
                    </tr>
                </thead>
                <tbody>
                    {trackList.map((val, key) => {
                    return (
                        <tr>
                        <td>{val.title} /</td>
                        <td className='clickableTd' data-value={val.artist} onClick = {(e) => setTrackArtistFilter(e.target.getAttribute('data-value').replace(/\s+/g, ''))}>{val.artist} /</td>
                        <td className='clickableTd' data-value={val.genre} onClick = {(e) => setTrackGenreFilter(e.target.getAttribute('data-value').replace(/\s+/g, ''))} >{val.genre}</td>
                        </tr>
                    )
                    })}
                </tbody>
            </table>
            <div className='linkBlock'><a href='/create'>Добавить песню</a></div>
        </div>
    )
}

export default MainPage;