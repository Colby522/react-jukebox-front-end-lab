const TrackList = (props) => {
  return (
    <div>
      <h1>Track List</h1>
      <div>
        {!props.tracks.length ? (
          <h2>No Tracks Yet!</h2>
        ) : (
          <ul>
            {props.tracks.map((track) => (
              <li 
                key={track._id}
                onClick={() => props.handleSelect(track)}
              >
                {track.title}
                <ul>
                  <button onClick={() => props.handlePlay(track)}>Play</button>
                  <button onClick={() => props.handleFormView(track._id)}>Edit</button>
                  <button 
                    onClick={() => props.handleDeleteTrack(track._id)}>
                    Delete
                  </button>
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button onClick={() => {props.setIsFormOpen(!props.isFormOpen); props.setSelected(false)}}>
        {props.isFormOpen ? 'Close Form' : 'New Track'}
      </button>
    </div>
  );
};
  
export default TrackList;
  