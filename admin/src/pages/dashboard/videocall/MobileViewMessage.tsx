import React, { useEffect } from "react";

const MobileViewMessage: React.FC = () => {
  useEffect(() => {
    const userAgent: string = navigator.userAgent || navigator.vendor;
    const isIOS: boolean = /iPad|iPhone|iPod/.test(userAgent);
    const isAndroid: boolean = /android/i.test(userAgent);

    const openAppOrRedirect = (): void => {
      if (isAndroid) {
        window.location.href =
          "https://play.google.com/store/apps/details?id=com.instagram.android&pcampaignid=web_share";
      } else if (isIOS) {
        window.location.href =
          "https://apps.apple.com/us/app/instagram/id389801252";
      } else {
        window.location.href = "/";
      }
    };

    openAppOrRedirect();
  }, []);

  return null;
};

export default MobileViewMessage;
