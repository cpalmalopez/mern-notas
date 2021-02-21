import React, { useState } from 'react';
import { Grid, TextField } from '@material-ui/core';
import YouTube from 'react-youtube';


export const VideoContainer = () => {
    const [ videoLink, setVideoLink ] = useState("");
    const [ videoTimestamp, setVideotimestamp ] = useState(0);

    const onChange = (e) => {
        setVideoLink(e.target.value);
    };

    const getVideoId = () => {
        if(videoLink === "" || videoLink === undefined) return "";
        let splitVideoLink = videoLink.split("v=")[1];
        let ampersandLocation = splitVideoLink.indexOf("&");
        if(ampersandLocation !== -1) {
            return splitVideoLink.substring(0, ampersandLocation);
        }
        return splitVideoLink;
    }

    return (
        <Grid container direction='column' justify='center' alignItems='center'>
            <Grid item xs={12}>
                <TextField
                    value={videoLink}
                    name='videoLink'
                    placeholder='Ingresa una URL de YouTube'
                    variant='outlined'
                    onChange={(e) => onChange(e)}
                />
            </Grid>
            <Grid item xs={12}>
                <YouTube 
                    videoId={getVideoId()}
                    opts={{
                        width: '100%',
                        playerVars: {
                            start: parseInt(videoTimestamp)
                        }
                    }}
                />
            </Grid>
        </Grid>
    )
}
