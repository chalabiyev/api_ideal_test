import { useState } from "react";

import { Box } from "@mui/material";

const PayIcon = () => {
  const [payment, setPayment] = useState(false);

  return (
    <Box
      onClick={() => setPayment(false)}
      className={`${
        payment ? "opacity-100 " : "opacity-50 cursor-not-allowed"
      } w-[45px] hover:opacity-50 h-[45px] duration-100 cursor-pointer flex items-center justify-center bg-[#DEDEDE] rounded-full`}
    >
      <svg
        width="28"
        height="24"
        viewBox="0 0 32 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.14286 0C3.77889 0 2.47078 0.517206 1.50631 1.43784C0.541835 2.35847 0 3.60712 0 4.90909V6.54545H32V4.90909C32 3.60712 31.4582 2.35847 30.4937 1.43784C29.5292 0.517206 28.2211 0 26.8571 0H5.14286ZM0 19.0909V8.72727H32V19.0909C32 20.3929 31.4582 21.6415 30.4937 22.5622C29.5292 23.4828 28.2211 24 26.8571 24H5.14286C3.77889 24 2.47078 23.4828 1.50631 22.5622C0.541835 21.6415 0 20.3929 0 19.0909ZM21.7143 15.2727C21.4112 15.2727 21.1205 15.3877 20.9062 15.5922C20.6918 15.7968 20.5714 16.0743 20.5714 16.3636C20.5714 16.653 20.6918 16.9304 20.9062 17.135C21.1205 17.3396 21.4112 17.4545 21.7143 17.4545H25.1429C25.446 17.4545 25.7367 17.3396 25.951 17.135C26.1653 16.9304 26.2857 16.653 26.2857 16.3636C26.2857 16.0743 26.1653 15.7968 25.951 15.5922C25.7367 15.3877 25.446 15.2727 25.1429 15.2727H21.7143Z"
          fill="#434343"
        />
      </svg>
    </Box>
  );
};

export default PayIcon;
