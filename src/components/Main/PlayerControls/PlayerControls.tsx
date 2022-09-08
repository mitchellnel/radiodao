import React, { useState } from "react";
import theme from "../../../assets/RadioDAOTheme";

import { ThemeProvider } from "@mui/material";

import PlayButton from "./Buttons/PlayButton";
import PauseButton from "./Buttons/PauseButton";
import PrevButton from "./Buttons/PrevButton";
import NextButton from "./Buttons/NextButton";
import PlayerSlider from "./PlayerSlider/PlayerSlider";

interface PlayerControlsProps {
  sliderPosition: number;
  handlePlayPauseClick: Function;
  handleTimeUpdate: Function;
}

function PlayerControls({
  sliderPosition,
  handlePlayPauseClick,
  handleTimeUpdate,
}: PlayerControlsProps) {
  const [isPlaying, setPlayingFlag] = useState<boolean>(false);

  const clickPlayPause = () => {
    setPlayingFlag(!isPlaying);
    handlePlayPauseClick(!isPlaying);
  };

  const clickPrev = () => {
    console.log("Previous clicked!");
  };

  const clickNext = () => {
    console.log("Next clicked!");
  };

  return (
    <ThemeProvider theme={theme}>
      <div id="slider" style={{ margin: "16px -56px" }}>
        <PlayerSlider
          currentTime={sliderPosition}
          onTimeUpdate={(time: number) => handleTimeUpdate(time)}
        />
      </div>

      <div id="buttons">
        {/* TODO: remove for actual radio app */}
        <PrevButton onClick={clickPrev} />

        {/* TODO: make this a mute button for radio app */}
        {isPlaying ? (
          <PauseButton onClick={clickPlayPause} />
        ) : (
          <PlayButton onClick={clickPlayPause} />
        )}

        {/* TODO: remove for actual radio app */}
        <NextButton onClick={clickNext} />
      </div>
    </ThemeProvider>
  );
}

export default PlayerControls;
