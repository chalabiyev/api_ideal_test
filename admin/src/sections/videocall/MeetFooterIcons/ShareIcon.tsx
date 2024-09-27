import { Box } from "@mui/material";
import { useStore } from "src/store/store";

const ShareIcon = () => {
  const { videoStream, setVideoStream } = useStore(state => ({
    videoStream: state.videoStream,
    setVideoStream: state.setVideoStream,
  }));

  const shareScreen = async () => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      setVideoStream(null);
      return;
    }

    try {
      if (navigator.mediaDevices.getDisplayMedia) {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });
        setVideoStream(stream);
      }
    } catch (error) {
      console.error("Error sharing screen:", error);
    }
  };

  return (
    <>
      <Box
        onClick={shareScreen}
        className={` 
         w-[45px] hover:opacity-50 h-[45px] duration-300 cursor-pointer flex items-center justify-center bg-[#DEDEDE] rounded-full`}
      >
        <svg
          width="20"
          height="32"
          viewBox="0 0 28 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.5455 10.2854H15.2727V20.6427C15.2727 20.9458 15.1386 21.2365 14.9 21.4508C14.6613 21.6651 14.3375 21.7855 14 21.7855C13.6625 21.7855 13.3387 21.6651 13.1 21.4508C12.8614 21.2365 12.7273 20.9458 12.7273 20.6427V10.2854H4.45455C3.27351 10.2865 2.14122 10.7083 1.3061 11.4582C0.470986 12.2081 0.00126336 13.2249 0 14.2854V27.9999C0.00126336 29.0605 0.470986 30.0772 1.3061 30.8272C2.14122 31.5771 3.27351 31.9989 4.45455 32H23.5455C24.7265 31.9989 25.8588 31.5771 26.6939 30.8272C27.529 30.0772 27.9987 29.0605 28 27.9999V14.2854C27.9987 13.2249 27.529 12.2081 26.6939 11.4582C25.8588 10.7083 24.7265 10.2865 23.5455 10.2854ZM15.2727 3.90168L19.464 7.6646C19.7046 7.86988 20.025 7.98263 20.3569 7.97882C20.6888 7.975 21.0059 7.85492 21.2405 7.64417C21.4752 7.43342 21.609 7.14869 21.6132 6.85067C21.6175 6.55265 21.4919 6.26493 21.2633 6.04886L14.8997 0.334476C14.661 0.120307 14.3374 0 14 0C13.6626 0 13.339 0.120307 13.1003 0.334476L6.7367 6.04886C6.5081 6.26493 6.38253 6.55265 6.38678 6.85067C6.39103 7.14869 6.52476 7.43342 6.75945 7.64417C6.99414 7.85492 7.31123 7.975 7.64311 7.97882C7.97499 7.98263 8.2954 7.86988 8.53602 7.6646L12.7273 3.90168V10.2854H15.2727V3.90168Z"
            fill="#434343"
          />
        </svg>
      </Box>
    </>
  );
};

export default ShareIcon;
