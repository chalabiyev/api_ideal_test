import AddUserIcon from '../MeetFooterIcons/AddUserIcon';
import CameraIcon from '../MeetFooterIcons/CameraIcon';
import MicIcon from '../MeetFooterIcons/MicIcon';
import HangUpIcon from '../MeetFooterIcons/HangUpIcon';
import PayIcon from '../MeetFooterIcons/PayIcon';
import ShareIcon from '../MeetFooterIcons/ShareIcon';
import ThreeDots from '../MeetFooterIcons/ThreeDots';

const VideoControls = () => (
  <div className="w-full  flex items-center gap-[20px] justify-center h-[10%] ">
    <PayIcon />
    <AddUserIcon />
    <ShareIcon />
    <CameraIcon />
    <MicIcon />
    <ThreeDots />
    <HangUpIcon />
  </div>
);

export default VideoControls;
