import { useState } from 'react';

const HangUpIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  function handleHangUp() {
    setIsOpen(!isOpen);
  }

  return (
    <div
      role="presentation"
      onClick={handleHangUp}
      className="w-[45px] group relative  h-[45px] duration-100 cursor-pointer flex items-center justify-center bg-[#DEDEDE] rounded-full"
    >
      <div
        role="presentation"
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`${
          isOpen
            ? 'opacity-100 -translate-y-[130%] visible '
            : 'opacity-0 -translate-y-[100%]  invisible'
        } absolute w-[190px] flex items-center  text-center duration-200 rounded-md justify-center h-[45px] bg-[#D9D9D9] left-1/2 -translate-y-32 gap-5 -translate-x-1/2`}
      >
        <div
          role="presentation"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className=" text-red-500 font-bold hover:scale-110 duration-100 rounded-sm py-1 px-3 text-sm flex items-center justify-normal"
        >
          Bitir
        </div>
        <div
          role="presentation"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="  text-gray-500 font-light hover:scale-110 duration-100 rounded-sm py-1 px-3 text-sm flex items-center justify-normal"
        >
          Ləğv et
        </div>
      </div>
      <svg
        width="25"
        height="12"
        viewBox="0 0 32 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${isOpen ? 'opacity-50' : 'opacity-100'} group-hover:opacity-50`}
      >
        <path
          d="M16 2.7088C13.8667 2.7088 11.8 3.0474 9.86667 3.68397V7.88262C9.86667 8.42438 9.56 8.88488 9.12 9.10158C7.81333 9.76524 6.62667 10.6185 5.56 11.6072C5.33333 11.851 5 12 4.66667 12C4.26667 12 3.93333 11.8375 3.69333 11.5937L0.386667 8.23476C0.140341 7.98249 0.00147283 7.642 0 7.28668C0 6.90745 0.146667 6.56885 0.386667 6.32506C4.45333 2.39729 9.94667 0 16 0C22.0533 0 27.5467 2.39729 31.6133 6.32506C31.8533 6.56885 32 6.90745 32 7.28668C32 7.65237 31.8533 7.99097 31.6133 8.23476L28.3067 11.5937C28.0667 11.8375 27.7333 12 27.3333 12C26.9922 11.9943 26.6668 11.8534 26.4267 11.6072C25.3733 10.6185 24.1867 9.76524 22.88 9.10158C22.6556 8.98989 22.4666 8.81639 22.3346 8.60086C22.2026 8.38533 22.1328 8.13646 22.1333 7.88262V3.68397C20.2 3.0474 18.1333 2.7088 16 2.7088Z"
          fill="#434343"
        />
      </svg>{' '}
    </div>
  );
};

export default HangUpIcon;
