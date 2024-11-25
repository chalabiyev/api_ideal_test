import { useState, useEffect } from 'react';

import { Box } from '@mui/material';

import checkIcon from '../../../../public/checkIcon.png';

interface DeviceInfo {
  audio: MediaDeviceInfo[];
  video: MediaDeviceInfo[];
  audioOutput: MediaDeviceInfo[];
}

const ThreeDots = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [devices1, setDevices1] = useState<DeviceInfo>({
    audio: [],
    video: [],
    audioOutput: [],
  });
  const [selectedDevices, setSelectedDevices] = useState({
    mic: '',
    camera: '',
    speaker: '',
  });

  useEffect(() => {
    const getDevices = async () => {
      try {
        // Initial media permission request
        await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

        // Enumerate devices after gaining permission
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioDevices = devices.filter((device) => device.kind === 'audioinput');
        const videoDevices = devices.filter((device) => device.kind === 'videoinput');
        const audioOutputDevices = devices.filter((device) => device.kind === 'audiooutput');

        setDevices1({
          audio: audioDevices,
          video: videoDevices,
          audioOutput: audioOutputDevices,
        });

        // Set default selected devices if available
        setSelectedDevices((prev) => ({
          ...prev,
          mic: audioDevices[0]?.deviceId || prev.mic,
          camera: videoDevices[0]?.deviceId || prev.camera,
          speaker: audioOutputDevices[0]?.deviceId || prev.speaker,
        }));
      } catch (error) {
        console.error('Device access error:', error);
      }
    };

    getDevices();
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleDeviceSelection = (type: string, deviceId: string) => {
    setSelectedDevices((prev) => ({ ...prev, [type]: deviceId }));
  };

  return (
    <div className="relative">
      <Box
        onClick={toggleVisibility}
        className="w-[45px] hover:opacity-50 h-[45px] duration-100 cursor-pointer flex items-center justify-center bg-[#DEDEDE] rounded-full"
      >
        <svg
          width="18"
          height="6"
          viewBox="0 0 26 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="3" cy="3" r="2.5" fill="#434343" />
          <circle cx="13" cy="3" r="2.5" fill="#434343" />
          <circle cx="23" cy="3" r="2.5" fill="#434343" />
        </svg>
      </Box>
      {isVisible && (
        <div className="absolute text-sm w-[260px] h-auto bg-white rounded-xl bottom-[130%] left-1/2 -translate-x-1/2 flex flex-col items-start">
          <div className="text-start my-2 w-full h-full">
            <h4 className="ml-3 font-medium text-[#A2A2A2]">Camera</h4>
            <ul className="font-medium">
              {devices1.video.map((cam, index) => (
                <Box
                  key={index}
                  onClick={() => handleDeviceSelection('camera', cam.deviceId)}
                  className={`py-1 ${
                    selectedDevices.camera === cam.deviceId ? 'text-green-500' : ''
                  } flex items-center cursor-pointer duration-200 space-x-2`}
                >
                  <div className="w-9">
                    {selectedDevices.camera === cam.deviceId && (
                      <img src={checkIcon} className="ml-4 w-[17px] h-[13px]" alt="check icon" />
                    )}
                  </div>
                  <span className="text-sm truncate" style={{ maxWidth: '200px' }}>
                    {cam.label || `Camera ${index + 1}`}
                  </span>
                </Box>
              ))}
            </ul>
            <div className="w-full border my-1 border-[#A2A2A2]" />
            <h4 className="ml-3 font-medium text-[#A2A2A2]">Microphones</h4>
            <ul className="font-medium">
              {devices1.audio.map((mic, index) => (
                <Box
                  key={index}
                  onClick={() => handleDeviceSelection('mic', mic.deviceId)}
                  className={`py-1 flex items-center duration-200 cursor-pointer space-x-2 ${
                    selectedDevices.mic === mic.deviceId ? 'text-green-500' : ''
                  }`}
                >
                  <div className="w-9">
                    {selectedDevices.mic === mic.deviceId && (
                      <img src={checkIcon} className="ml-4 w-[17px] h-[13px]" alt="check icon" />
                    )}
                  </div>
                  <span className="text-sm truncate" style={{ maxWidth: '200px' }}>
                    {mic.label || `Mic ${index + 1}`}
                  </span>
                </Box>
              ))}
            </ul>
            <div className="w-full border mt-1 mb-2 border-[#A2A2A2]"/>

            <h4 className="ml-3 font-medium text-[#A2A2A2]">Speakers</h4>
            <ul className="font-medium">
              {devices1.audioOutput.map((speaker, index) => (
                <Box
                  key={index}
                  onClick={() => handleDeviceSelection('speaker', speaker.deviceId)}
                  className={`py-1 flex items-center cursor-pointer duration-200 space-x-2 ${
                    selectedDevices.speaker === speaker.deviceId ? 'text-green-500' : ''
                  }`}
                >
                  <div className="w-9">
                    {selectedDevices.speaker === speaker.deviceId && (
                      <img src={checkIcon} className="ml-4 w-[17px] h-[13px]" alt="check icon" />
                    )}
                  </div>
                  <span className="text-sm truncate" style={{ maxWidth: '200px' }}>
                    {speaker.label || `Speaker ${index + 1}`}
                  </span>
                </Box>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default ThreeDots;
