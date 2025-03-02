import {useEffect, useRef} from "react";
import Player, { I18N } from "xgplayer/es/player";
import Start from 'xgplayer/es/plugins/start'
import PC from 'xgplayer/es/plugins/pc'
import Progress from 'xgplayer/es/plugins/progress'
import Time from 'xgplayer/es/plugins/time'
import Play from 'xgplayer/es/plugins/play'
import Error from 'xgplayer/es/plugins/error'
import LangZH from 'xgplayer/es/lang/zh-cn'
import FullScreen from 'xgplayer/es/plugins/fullscreen'
import Replay from 'xgplayer/es/plugins/replay'
import Volume from 'xgplayer/es/plugins/volume'
import PIP from 'xgplayer/es/plugins/pip'
import PlaybackRate from 'xgplayer/es/plugins/playbackRate'
import * as React from "react";

interface VideoPlayerProps {
  src: string;
}

// eslint-disable-next-line react-hooks/rules-of-hooks
I18N.use(LangZH);

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      playerRef.current = new Player({
        el: videoRef.current,
        url: src,
        width: "100%",
        height: "100%",
        autoplay: true,
        lang: 'zh',
        pip: true,
        plugins: [Start, PC, Progress, Time, Play, Error, FullScreen, Replay, Volume, PIP, PlaybackRate],
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [src]);

  return (
    <div className="w-full h-full" ref={videoRef}/>
  );
};

export default VideoPlayer;
