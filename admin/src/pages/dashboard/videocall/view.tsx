import { useRef, useLayoutEffect, useState } from 'react';

import { toast } from 'sonner';

import { FaMicrophone } from 'react-icons/fa';
import { IoMdAttach } from 'react-icons/io';
import { ImPhoneHangUp } from 'react-icons/im';
import { MdScreenShare, MdSend } from 'react-icons/md';
import { RiUserAddFill } from 'react-icons/ri';

import { Box, Input, Typography } from '@mui/material';

import { addSecond, checkTime } from 'src/utils/helper';

import MobileViewMessage from './MobileViewMessage';
import VideoCameraIcon from '../../../../public/assets/icons/files/VideoCameraIcon';

const staticData = [
  {
    id: 2,
    message: 'sender sendersender sender sender senr sender sender',
    sender: 'sender',
    time: '10:30',
  },

  {
    id: 1,
    message: 'user user user user user user user user user user user user',
    sender: 'user',
    time: '10:30',
  },
  {
    id: 2,
    message: 'sender sendersender sender sender senr sender sender',
    sender: 'sender',
    time: '10:30',
  },
  {
    id: 2,
    message: 'sender sendersender sender sender senr sender sender',
    sender: 'sender',
    time: '10:30',
  },
  {
    id: 2,
    message: 'sender sendersender sender sender senr sender sender',
    sender: 'sender',
    time: '10:30',
  },
  {
    id: 2,
    message: 'sender sendersender sender sender senr sender sender',
    sender: 'sender',
    time: '10:30',
  },

  {
    id: 1,
    message: 'user user user user user user user user user user user user',
    sender: 'user',
    time: '10:30',
  },
  {
    id: 2,
    message: 'sender sendersender sender sender senr sender sender',
    sender: 'sender',
    time: '10:30',
  },

  {
    id: 1,
    message: 'user user user user user user user user user user user user',
    sender: 'user',
    time: '10:30',
  },
  {
    id: 2,
    message: 'sender sendersender sender sender senr sender sender',
    sender: 'sender',
    time: '10:30',
  },

  {
    id: 1,
    message: 'user user user user user user user user user user user user',
    sender: 'user',
    time: '10:30',
  },
  {
    id: 2,
    message: 'sender sendersender sender sender senr sender sender',
    sender: 'sender',
    time: '10:30',
  },
];

const ICON_DATA = [
  {
    id: 1,
    name: 'user',
    icon: <RiUserAddFill />,
    color: '#CBCBCB',
    fontSize: '24px',
    iconFunction: userClick,
  },
  {
    id: 2,
    name: 'share',
    icon: <MdScreenShare />,
    color: '#CBCBCB',
    fontSize: '24px',
  },
  {
    id: 3,
    name: 'video',
    icon: <VideoCameraIcon />,
    color: '#CBCBCB',
    fontSize: '24px',
  },
  {
    id: 4,
    name: 'mic',
    icon: <FaMicrophone />,
    color: '#CBCBCB',
    fontSize: '24px',
    iconFunction: micClick,
  },
  {
    id: 5,
    name: 'phone',
    icon: <ImPhoneHangUp />,
    color: '#CBCBCB',
    fontSize: '24px',
    iconFunction: phoneClick,
  },
];

function micClick() {
  console.log('mic');
}
function phoneClick() {
  console.log('phone');
}
function userClick() {
  console.log(navigator.clipboard?.writeText(window.location.href));
  toast('Link kopyalandı', {
    icon: '👏',
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  });
}

const VideoCallView = () => {
  const clockRef = useRef<HTMLSpanElement>(null);
  const initialTime = useRef(new Date());
  const [isMobileView] = useState(window.innerWidth < 777);

  useLayoutEffect(() => {
    function startClock() {
      initialTime.current = addSecond(initialTime.current);
      const h = initialTime.current.getHours();
      const m = checkTime(initialTime.current.getMinutes());

      if (clockRef.current) {
        clockRef.current.innerHTML = `${h}:${m}`
      }
    }

    const intervalId = setInterval(startClock, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (isMobileView) {
    return <MobileViewMessage />;
  }

  return (
    <Box className="bg-[#243bed] max-h-[873px] p-[10%]  from-[rgba(48,38,158,0.89)] via-[rgba(9,5,231,0.86)] to-[rgba(48,38,158,0.89)] flex justify-between md:flex-nowrap flex-wrap ">
      {/* left (chat)  */}
      <Box className="w-[25%] overflow-hidden rounded-[18px] justify-between bg-[rgba(203,203,203,0.66)] flex flex-col p-[0.6%] gap-[0.6%]">
        <Box className="h-[89%] rounded-md bg-[aqua]/0 shrink-0 overflow-auto flex flex-col gap-[2.5%]" >
          {staticData.map((item) => (
            <Box
              className={`bg-yellow-500/0 flex items-center ${
                item.sender === 'user' && 'justify-end'
              }`}
            >
              <Typography
                className={`${
                  item.sender === 'user'
                    ? 'bg-[#3E3E3E] text-[#E1E1E1] rounded-br-none'
                    : 'bg-[#D3D3D3] text-[#1F1F1F] rounded-bl-none'
                } p-[2%] px-[3%] max-w-[83%] rounded-md flex items-end justify-between`}
              >
                <Typography className="bg-green-500/0 w-[80%] leading-[106%]"> {item.message}</Typography>
                <Typography
                  className={`${
                    item.sender === 'user' ? 'text-[#E1E1E1]' : 'text-[#1F1F1F]'
                  } text-xs font-extralight`}
                >
                  {item.time}
                </Typography>
              </Typography>
            </Box>
          ))}
        </Box>

        {/* input  */}
        <Box className="h-[8%] px-[4%] bg-gradient-to-r from-[#525D69] to-[#374B60] rounded-[9px] overflow-hidden flex items-center">
          <Box className="cursor-pointer *:text-[24px] max-lg:text-[24px]">
            <IoMdAttach color="#8E8DAA" />
          </Box>

          <Box className="w-[1px] h-[60%] bg-[#8E8DAA] mr-[4%] ml-[2%]" />
          <Input
            type="text"
            className="w-[72%] max-lg:text-sm bg-transparent  outline-none placeholder:text-[#8E8DAA] text-[#d7d7d7] "
            placeholder="Müraciətinizi daxil edin"
          />
          <Box className="ml-[4%] text-[30px] max-lg:text-lg">
            <MdSend color="#8E8DAA" />
          </Box>
        </Box>
      </Box>
      {/* right  */}
      <Box className="w-[73%] rounded-[18px] bg-[aqua]/0 flex flex-col justify-between">
        {/* right top  */}
        <Box className="w-full h-[14%] bg-purple-400/0 flex items-center justify-between">
          {/* logo  */}
          <img src="/public/logo/whitelogo.png" alt="ideal Kredit logo" className="w-[25%]" />
          {/* clock  */}
          <Typography ref={clockRef} className="text-[#DBDBDB] font-medium text-[24px]" />
        </Box>
        {/* right bottom (video call)  */}
        <Box className="w-full relative h-[83%] bg-yellow-400/0 overflow-hidden border-[2px] border-[#9EB3C7] rounded-[18px]">
          <video
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            playsInline
            muted
            autoPlay
            className="h-full w-full object-cover"
            loop
          />
          {/* user camera  */}
          <Box className="absolute -translate-y-[95%] bottom-0 right-5 w-[30%] border-[2px] border-[#9EB3C7] rounded-[18px] overflow-hidden  aspect-video bg-black/0">
            {/*  */}
            <video
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              playsInline
              muted
              autoPlay
              className="h-full w-full object-cover"
              loop
            />
          </Box>

          {/* buttons  */}
          <Box className=" absolute left-1/2 max-lg:-translate-y-3 -translate-x-1/2  bg-red-500/0 bottom-0 -translate-y-12 flex items-center justify-center gap-[33px] max-md:gap-[28px] max-lg:gap-[20px]">
            {/* <div className="w-[60px] duration-200 cursor-pointer hover:opacity-80 max-md:w-[45px] max-md:h-[45px] h-[60px] rounded-full flex justify-center items-center bg-black/60">
              <RiUserAddFill color="#CBCBCB" style={{ fontSize: "29px" }} />
            </div> */}
            {ICON_DATA.map((item) => (
              <Box
                aria-hidden="true"
                onClick={item.iconFunction}
                key={item.id}
                className="w-[60px] duration-200 cursor-pointer hover:opacity-80 max-md:w-[45px] max-md:h-[45px] text-[29px] max-lg:text-[20px] text-[#CBCBCB] h-[60px] rounded-full flex justify-center items-center max-lg:w-[40px] max-lg:h-[40px] bg-black/60"
              >
                {item.icon}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoCallView;
