import { Box } from "@mui/material";
import { useState } from "react";

const MicIcon = () => {
  const [mic, setMic] = useState(false);

  const handleMic = async () => {
    try {
      const newMicState = !mic;
      if (newMicState) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setMic(!!stream); 
      } else {
        setMic(false);
      }
      showNotification(
        newMicState ? "Mikrofon aktiv edildi" : "Mikrofon deaktiv edildi"
      );
    } catch (err) {
      showNotification("Mikrofon əlçatan deyil");
    }
  };

  const showNotification = (message: string) => {
    if (Notification.permission === "granted") {
      const notification = new Notification(message);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          const notification = new Notification(message);
        }
      });
    }
  };
  return (
    <Box
      onClick={handleMic}
      className={`${
        mic ? "bg-[#C3FA1C]" : "bg-[#434343]"
      } w-[45px] hover:opacity-50 h-[45px] duration-100 cursor-pointer flex items-center justify-center  rounded-full`}
    >
      <svg
        width="18"
        height="34"
        viewBox="0 0 26 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 15.6159C19 17.2311 18.3679 18.7801 17.2426 19.9222C16.1174 21.0643 14.5913 21.7059 13 21.7059C11.4087 21.7059 9.88258 21.0643 8.75736 19.9222C7.63214 18.7801 7 17.2311 7 15.6159V7.08997C7 5.47481 7.63214 3.9258 8.75736 2.78371C9.88258 1.64162 11.4087 1 13 1C14.5913 1 16.1174 1.64162 17.2426 2.78371C18.3679 3.9258 19 5.47481 19 7.08997V15.6159Z"
          fill="#FA4545"
          stroke="#FA4545"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${mic ? "stroke-[#434343] fill-[#434343]" : ""}`}
        />
        <path
          d="M25 17C25.0025 18.4554 24.7249 19.8969 24.183 21.242C23.6412 22.5871 22.8458 23.8092 21.8424 24.8383C20.839 25.8674 19.6474 26.6833 18.336 27.239C17.0245 27.7948 15.619 28.0795 14.2 28.0769H11.8C10.3808 28.0801 8.97503 27.7959 7.66329 27.2403C6.35155 26.6848 5.15971 25.869 4.15621 24.8398C3.15271 23.8106 2.35731 22.5882 1.81568 21.2428C1.27405 19.8974 0.996863 18.4556 1.00003 17M13 28.0769V33"
          stroke="#FA4545"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${mic ? "stroke-[#434343]" : ""}`}
        />
      </svg>
    </Box>
  );
};

export default MicIcon;
