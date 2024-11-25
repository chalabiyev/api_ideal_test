import PayIcon from '../MeetFooterIcons/PayIcon';
import MicIcon from '../MeetFooterIcons/MicIcon';
import ShareIcon from '../MeetFooterIcons/ShareIcon';
import ThreeDots from '../MeetFooterIcons/ThreeDots';
import CameraIcon from '../MeetFooterIcons/CameraIcon';
import HangUpIcon from '../MeetFooterIcons/HangUpIcon';
import AddUserIcon from '../MeetFooterIcons/AddUserIcon';


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
