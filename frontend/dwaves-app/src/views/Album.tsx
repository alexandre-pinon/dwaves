import "styles/Explorer.scss";
import { ContentAlbum } from "components";
import {AlbumDetail, CurrentUser, responseRequest} from "models";
import React from "react";

interface Props {
  setCurrentSong: React.Dispatch<React.SetStateAction<any>>
  setSongs: React.Dispatch<React.SetStateAction<any>>
  audioElmt: React.RefObject<HTMLAudioElement>
  isPlaying: boolean
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
  setArtist : React.Dispatch<React.SetStateAction<AlbumDetail|undefined>>
  setAlert: React.Dispatch<React.SetStateAction<responseRequest | undefined>>
  likedMusics: string[];
  likeOrDislikeMusic: (music: string)=> void
}

export const Album: React.FC<Props> = ({
  setCurrentSong,
  setSongs,
  audioElmt,
  isPlaying,
  setIsPlaying,
  setArtist,
  setAlert,
  likedMusics,
  likeOrDislikeMusic
}) => {
  return <ContentAlbum
    setCurrentSong={setCurrentSong}
    setSongs={setSongs}
    audioElmt={audioElmt}
    isPlaying={isPlaying}
    setIsPlaying={setIsPlaying}
    setArtist={setArtist}
    setAlert={setAlert}
    likedMusics={likedMusics}
    likeOrDislikeMusic={likeOrDislikeMusic}
  />;
};
