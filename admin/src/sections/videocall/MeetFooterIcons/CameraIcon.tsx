import { Box } from "@mui/material";

import { useStore } from "src/store/store";

const CameraIcon = () => {
  const { videoStream, setVideoStream, screenShareActive, toggleScreenShare } =
    useStore();

  const handleCameraToggle = async () => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      setVideoStream(null);
    } else {
      try {
        if (screenShareActive) {
          toggleScreenShare(false);
        }
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setVideoStream(stream);
      } catch (error) {
        console.error("kamera xətası", error);
      }
    }
  };
  return (
    <Box
      onClick={handleCameraToggle}
      className="w-[45px] hover:opacity-50 h-[45px] duration-100 cursor-pointer flex items-center justify-center bg-[#DEDEDE] rounded-full"
    >
      <svg
        width="25"
        height="24"
        viewBox="0 0 32 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.19948 0C3.82049 0 2.49798 0.586988 1.52289 1.63183C0.547801 2.67668 0 4.09379 0 5.57143V18.4286C0 19.9062 0.547801 21.3233 1.52289 22.3682C2.49798 23.413 3.82049 24 5.19948 24H17.1983C18.5773 24 19.8998 23.413 20.8749 22.3682C21.85 21.3233 22.3978 19.9062 22.3978 18.4286V17.8937L27.61 21.7509C29.4659 23.1223 32 21.6994 32 19.2823V4.716C32 2.29886 29.4659 0.872571 27.61 2.24743L22.3978 6.10629V5.57143C22.3978 4.09379 21.85 2.67668 20.8749 1.63183C19.8998 0.586988 18.5773 0 17.1983 0H5.19948Z"
          fill="#434343"
        />
      </svg>
    </Box>
  );
};

export default CameraIcon;
