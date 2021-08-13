import { useEffect, useMemo } from 'react';
import { AudioPlayer } from 'types';

export function useAudioPlayer({src, playing, muted, volume}: AudioPlayer) {
  const audio = useMemo(() => new Audio(), []);

  useEffect(() => {
    audio.setAttribute('src', src);
    playing && audio.play().catch(() => null);
  }, [audio, src]); // eslint-disable-line
  useEffect(() => {
    if (playing) {
      audio.load();
      audio.play();
    } else audio.pause() ;
  }, [audio, playing]);
  useEffect(() => { audio.muted = muted }, [audio, muted]);
  useEffect(() => { audio.volume = volume }, [audio, volume]);

  function onLoadedData(callback: any) {
    audio.onloadeddata = data => callback(data);
  }

  function onLoadStart(callback: any) {
    audio.onloadstart = data => callback(data);
  }

  return { onLoadStart, onLoadedData };
}
