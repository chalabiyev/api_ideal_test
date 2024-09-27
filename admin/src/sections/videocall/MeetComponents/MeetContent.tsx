import MeetChat from './MeetChat';
import MeetVideoContainer from './MeetVideoContainer';

const HeroContent = () => (
  <div className="h-[80%] w-full rounded-[30px] select-none duration-300 border-[#bcbcbc7b] border-[0.5px] bg-[#0000007e] relative flex">
    <MeetChat />
    <MeetVideoContainer />
  </div>
);

export default HeroContent;
