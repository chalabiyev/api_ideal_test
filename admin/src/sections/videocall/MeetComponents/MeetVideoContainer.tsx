import VideoControls from './VideoControls';
import VideoInterface from './VideoInterface';

const MeetVideoContainer: React.FC = () => (
  <div className="flex grid-cols-1 gap-[24px] flex-col flex-1 p-[24px] px-[80px] bg-gradient-to-r rounded-r-[30px] from-[#9d9d9da9] via-[#a6a6a6a4] to-[#8c8c8ca8] relative ">
    <div className=" w-full h-full items-center flex-col justify-between flex gap-[10px]">
      {/* service name */}
      <div className=" w-full h-[90px] flex  items-center justify-start gap-[20px]">
        {/* <img
            src={EdliyyePic}
            alt="service name"
            className="w-[65px] h-[70px]"
          /> */}
        <span className="text-white  font-medium text-[23px]">Ədliyyə Nazirliyi</span>
      </div>
      <VideoInterface />
      <VideoControls />
    </div>
  </div>
);

export default MeetVideoContainer;
