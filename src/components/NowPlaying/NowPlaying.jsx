const NowPlaying = (props) => {
    return (
    <div>
        {props.currentTrack === null ? <h3>No Track Playing</h3> :
            <h3>Current Track: {props.currentTrack?.title} By {props.currentTrack?.artist}</h3>
        }
    </div>
    )
}

export default NowPlaying