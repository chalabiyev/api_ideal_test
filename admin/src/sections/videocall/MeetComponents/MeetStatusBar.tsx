import { Box } from '@mui/material';

import { formatDate, formatTime, useCurrentTime } from 'src/utils/dateTimeUtils';

import { useStore } from 'src/store/store';

import DefaultProfilePic from '../../../../public/DefaultProfilePic.png';

const MeetStatusBar = () => {
  const time = useCurrentTime();

  const setLoginModalState = useStore((state) => state.SetLoginModalState);
  const LoginModalState = useStore((state) => state.LoginInModalState);
  const FocusDocumentModal = useStore((state) => state.FocusDocumentModal);

  const toggleLoginModal = () => {
    setLoginModalState(!LoginModalState);
  };

  return (
    <div className="rounded-[30px] duration-500 hover:scale-[0.97] select-none  md:h-[11%] h-[10%] md:w-[81%] w-[90%]   border-[#bcbcbc7b] border-[0.5px] bg-gradient-to-r from-[#48484876] via-[#7e7e7e6b] to-[#3f3f3f74] flex items-center justify-between md:px-[21px] px-[19px] md:py-[14px] py-[10px] md:pr-[25px] pr-[16px]">
      <div className="text-[#EFEFEF]  flex items-center justify-center gap-[28px]">
        <Box
          onClick={toggleLoginModal}
          className="md:w-[52px] w-[40px] h-[40px] md:h-[52px] cursor-pointer flex items-center justify-center  rounded-full bg-[#D9D9D9]"
        >
          <img
            src={DefaultProfilePic}
            alt="İstifadəçi şəkli"
            className="md:w-[28px] w-[24px] md:h-[28px] h-[24px]"
          />
        </Box>
        <p className="md:text-[20px] text-[16px]">
          Salam, <span className="font-medium">istifadəçi!</span>
        </p>
      </div>
      <span
        className={`${
          FocusDocumentModal ? 'opacity-100' : 'opacity-0'
        } md:text-[20px]  font-bold text-[16px] duration-200 underline bg-gradient-to-r from-lime-300 via-lime-600  to-lime-400 text-transparent bg-clip-text animate-gradient  tracking-tight`}
      >
        Sənədlərim
      </span>
      <div className="md:text-[16px] text-[12px] text-white flex flex-col justify-center items-end">
        <p>{formatTime(time)}</p>
        <p>
          <span>{formatDate(time)}</span>
        </p>
      </div>
    </div>
  );
};

export default MeetStatusBar;
