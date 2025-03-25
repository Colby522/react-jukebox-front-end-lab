import {useState, useEffect} from 'react'
import * as trackService from './services/trackService';
import TrackList from './components/TrackList/TrackList.jsx'
import TrackDetail from './components/TrackDetail/TrackDetail.jsx'
import TrackForm from './components/TrackForm/TrackForm.jsx'
import NowPlaying from './components/NowPlaying/NowPlaying.jsx';

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [selected, setSelected] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(null)

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const fetchedTracks = await trackService.index();
        if (fetchedTracks.err) {
          throw new Error(fetchedTracks.err);
        }
        setTracks(fetchedTracks);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTracks();
  }, []);

  const handleSelect = (track) => {
    setSelected(track)
  }

  const handleFormView = (track) => {
    if (!track) setSelected(null)
    setIsFormOpen(!isFormOpen)
  }

  const handleAddTrack = async (formData) => {
    try {
      const newTrack = await trackService.create(formData);

      if (newTrack.err) {
        throw new Error(newTrack.err)
      }
      setTracks([newTrack, ...tracks])
      setIsFormOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdateTrack = async (formData, trackId) => {
    try {
      const updatedTrack = await trackService.update(formData, trackId)

      if (updatedTrack.err) {
        throw new Error(updatedTrack.err)
      }

      const updatedTrackList = tracks.map((track) => (
        track._id !== updatedTrack._id ? track : updatedTrack
      ))
      setTracks(updatedTrackList)
      setSelected(updatedTrack)
      setIsFormOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteTrack = async (trackId) => {
    try {
      const deletedTrack = await trackService.deleteTrack(trackId)

      if (deletedTrack.err) {
        throw new Error(deletedTrack.err)
      }

      setTracks(tracks.filter((track) => track._id !== deletedTrack._id))
      setSelected(null)
      setIsFormOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handlePlay = (track) => {
    setIsPlaying(true)
    setCurrentTrack(track)
  }

  return (
    <>
      <TrackList 
        tracks={tracks} 
        handleSelect={handleSelect}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}
        handlePlay={handlePlay}
        handleDeleteTrack={handleDeleteTrack}
        setIsFormOpen={setIsFormOpen}
        setSelected={setSelected}
      />
      <NowPlaying  
        handlePlay={handlePlay}
        currentTrack={currentTrack}
      />
      {isFormOpen ? (
        <TrackForm 
          handleAddTrack={handleAddTrack}
          selected={selected}
          handleUpdateTrack={handleUpdateTrack}
        />
      ) : (null)}
    </>
  )
};


export default App;
