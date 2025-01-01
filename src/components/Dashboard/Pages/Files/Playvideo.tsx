"use client";
import { useState, useRef, useEffect } from "react";
import {
   Play,
   Pause,
   Volume2,
   VolumeX,
   Maximize,
   Minimize,
   SkipBack,
   SkipForward,
} from "lucide-react";

interface VideoPlayerProps {
   url: string;
   onError?: (error: Error) => void;
   initialVolume?: number;
   width?: string;
}

interface PlayerState {
   isPlaying: boolean;
   progress: number;
   currentTime: number;
   duration: number;
   volume: number;
   isMuted: boolean;
   isFullscreen: boolean;
}

const sizeConfig = {
   sm: "max-w-md", // 448px
   md: "max-w-lg", // 512px
   lg: "max-w-xl", // 576px
   xl: "max-w-2xl", // 672px
   "2xl": "max-w-3xl", // 768px
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({
   url,
   onError,
   initialVolume = 1,
   width = "xl", // default size
}) => {
   const videoRef = useRef<HTMLVideoElement>(null);
   const progressRef = useRef<HTMLDivElement>(null);

   const [playerState, setPlayerState] = useState<PlayerState>({
      isPlaying: false,
      progress: 0,
      currentTime: 0,
      duration: 0,
      volume: initialVolume,
      isMuted: false,
      isFullscreen: false,
   });

   useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const handleTimeUpdate = () => {
         const current = video.currentTime;
         const percent = (current / video.duration) * 100;
         setPlayerState((prev) => ({
            ...prev,
            progress: percent,
            currentTime: current,
         }));
      };

      const handleLoadMetadata = () => {
         setPlayerState((prev) => ({
            ...prev,
            duration: video.duration,
         }));
      };

      const handleVideoEnded = () => {
         setPlayerState((prev) => ({
            ...prev,
            isPlaying: false,
            progress: 0,
         }));
         if (video) video.currentTime = 0;
      };

      const handleError = (e: ErrorEvent) => {
         if (onError) {
            onError(new Error("Video playback error"));
         }
      };

      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("loadedmetadata", handleLoadMetadata);
      video.addEventListener("ended", handleVideoEnded);
      video.addEventListener("error", handleError as EventListener);

      return () => {
         video.removeEventListener("timeupdate", handleTimeUpdate);
         video.removeEventListener("loadedmetadata", handleLoadMetadata);
         video.removeEventListener("ended", handleVideoEnded);
         video.removeEventListener("error", handleError as EventListener);
      };
   }, [onError]);

   const togglePlay = async () => {
      if (!videoRef.current) return;

      try {
         if (playerState.isPlaying) {
            await videoRef.current.pause();
         } else {
            await videoRef.current.play();
         }
         setPlayerState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
      } catch (error) {
         if (onError) onError(error as Error);
      }
   };

   const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!videoRef.current || !progressRef.current) return;

      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * videoRef.current.duration;
   };

   const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!videoRef.current) return;

      const newVolume = parseFloat(e.target.value);
      videoRef.current.volume = newVolume;
      setPlayerState((prev) => ({
         ...prev,
         volume: newVolume,
         isMuted: newVolume === 0,
      }));
   };

   const toggleMute = () => {
      if (!videoRef.current) return;

      const newMutedState = !playerState.isMuted;
      videoRef.current.volume = newMutedState ? 0 : playerState.volume;
      setPlayerState((prev) => ({ ...prev, isMuted: newMutedState }));
   };

   const toggleFullscreen = async () => {
      if (!videoRef.current) return;

      try {
         if (!playerState.isFullscreen) {
            if (videoRef.current.requestFullscreen) {
               await videoRef.current.requestFullscreen();
            }
         } else {
            if (document.exitFullscreen) {
               await document.exitFullscreen();
            }
         }
         setPlayerState((prev) => ({ ...prev, isFullscreen: !prev.isFullscreen }));
      } catch (error) {
         if (onError) onError(error as Error);
      }
   };

   const skipTime = (seconds: number) => {
      if (!videoRef.current) return;
      videoRef.current.currentTime += seconds;
   };

   const formatTime = (time: number): string => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
   };

   return (
      <div className={`${sizeConfig[width]} mx-auto`}>
         <div className="relative group bg-black rounded-lg overflow-hidden aspect-video">
            <video
               ref={videoRef}
               className="w-full object-cover"
               src={url}
               onClick={togglePlay}
            />

            {/* Custom Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity">
               {/* Progress Bar */}
               <div
                  ref={progressRef}
                  className="w-full h-1 bg-gray-400 rounded-full mb-4 cursor-pointer"
                  onClick={handleProgressClick}
               >
                  <div
                     className="h-full bg-blue-500 rounded-full relative"
                     style={{ width: `${playerState.progress}%` }}
                  >
                     <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full transform scale-0 group-hover:scale-100" />
                  </div>
               </div>

               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     {/* Play/Pause Button */}
                     <button
                        onClick={togglePlay}
                        className="text-white hover:text-blue-500 transition-colors"
                        type="button"
                     >
                        {playerState.isPlaying ? <Pause size={24} /> : <Play size={24} />}
                     </button>

                     {/* Skip Buttons */}
                     <button
                        onClick={() => skipTime(-10)}
                        className="text-white hover:text-blue-500 transition-colors"
                        type="button"
                     >
                        <SkipBack size={24} />
                     </button>
                     <button
                        onClick={() => skipTime(10)}
                        className="text-white hover:text-blue-500 transition-colors"
                        type="button"
                     >
                        <SkipForward size={24} />
                     </button>

                     {/* Volume Controls */}
                     <div className="flex items-center gap-2">
                        <button
                           onClick={toggleMute}
                           className="text-white hover:text-blue-500 transition-colors"
                           type="button"
                        >
                           {playerState.isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                        </button>
                        <input
                           type="range"
                           min="0"
                           max="1"
                           step="0.1"
                           value={playerState.isMuted ? 0 : playerState.volume}
                           onChange={handleVolumeChange}
                           className="w-20 accent-blue-500"
                        />
                     </div>

                     {/* Time Display */}
                     <div className="text-white text-sm">
                        {formatTime(playerState.currentTime)} / {formatTime(playerState.duration)}
                     </div>
                  </div>

                  {/* Fullscreen Button */}
                  <button
                     onClick={toggleFullscreen}
                     className="text-white hover:text-blue-500 transition-colors"
                     type="button"
                  >
                     {playerState.isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
                  </button>
               </div>
            </div>

            {/* Play/Pause Overlay */}
            <div
               className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
               onClick={togglePlay}
            >
               <button
                  className="text-white/80 hover:text-white transform transition-transform hover:scale-110"
                  type="button"
               >
                  {playerState.isPlaying ? <Pause size={48} /> : <Play size={48} />}
               </button>
            </div>
         </div>
      </div>
   );
};

export default VideoPlayer;
