import React, { useState, useEffect } from "react";
import axios from "axios";

function FileUpload() {
    const [track, setTrack] = useState(null);
    const sendFile = React.useCallback(async () => {
        try {
            let data = new FormData();
            data.append('track', track);
            await axios.post('http://localhost:3001/api/upload', data, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then(res => console.log(res.data.path));
        } catch (error) {
            console.log(error);
        }
    }, [track]);

    return (
        <div className="FileUpload">
            <input type="file" onChange={e => setTrack(e.target.files[0])} />
            <button className="btn" onClick={sendFile}>Загрузить</button>
        </div>
    )
}

export default FileUpload;