import { useRef, useState } from 'react';

import { useStore } from 'src/store/store';

const VideoDisplay = ({
  src,
  stream,
  isFullView,
  toggleView,
}: {
  src: string;
  stream: MediaStream | null;
  isFullView: boolean;
  toggleView: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      loop={!isFullView}
      src={!isFullView ? src : undefined}
      style={{ width: '100%', height: '100%' }}
      onClick={toggleView}
      className="object-cover"
    />
  );
};

const VideoInterface = () => {
  const [isMainStream, setIsMainStream] = useState(false);
  const videoStream = useStore((state) => state.videoStream);
  const demoVideoUrl =
    'https://static.vecteezy.com/system/resources/previews/006/618/818/mp4/ai-head-wire-frame-loop-free-video.mp4';

  const toggleMainVideo = () => setIsMainStream((prevState) => !prevState);

  return (
    <div className="bg-[#272727] border rounded-[10px] relative border-[#C3FA1C] w-full h-[70%] overflow-hidden">
      <VideoDisplay
        src={demoVideoUrl}
        stream={videoStream}
        isFullView={isMainStream}
        toggleView={() => {}}
      />
      <div className="w-[27%] h-[27%] bg-[#272727] rounded-[4px] border border-[#8d8d8d] absolute bottom-4 right-4 cursor-pointer overflow-hidden flex items-center justify-center">
        <VideoDisplay
          src={demoVideoUrl}
          stream={videoStream}
          isFullView={!isMainStream}
          toggleView={toggleMainVideo}
        />
      </div>
    </div>
  );
};

export default VideoInterface;
