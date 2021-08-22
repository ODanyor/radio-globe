import { useEffect, useMemo } from 'react';
import { AudioPlayer } from 'types';

export function useAudioPlayer({src, playing, muted, volume}: AudioPlayer) {
  const audio = useMemo(() => new Audio(), []);

  useEffect(() => { src && audio.setAttribute('src', src) }, [audio, src]);
  useEffect(() => {
    if (playing) {
      audio.load();
      audio.play();
    } else audio.pause();
  }, [src, audio, playing]);
  useEffect(() => { audio.muted = muted }, [audio, muted]);
  useEffect(() => { audio.volume = volume }, [audio, volume]);

  function onLoadedData(callback: Function) {
    audio.onloadeddata = data => callback(data);
  }

  function onLoadStart(callback: Function) {
    audio.onloadstart = data => callback(data);
  }

  return { onLoadStart, onLoadedData };
}
