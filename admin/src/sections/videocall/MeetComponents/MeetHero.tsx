import MeetContent from './MeetContent';
import MeetStatusBar from './MeetStatusBar';
import HomeBackground from '../../../../public/HomeBgImage.jpg';

const MeetHero = () => (
    <section
      style={{ backgroundImage: `url(${HomeBackground})` }}
      className="w-full h-screen bg-no-repeat bg-cover flex items-center justify-center"
    >
      <div className="absolute z-0 flex items-center justify-center w-full h-screen backdrop-filter backdrop-blur-[16px]" />
      <div className="w-full h-screen flex items-center justify-center">
        <div className="lg:w-[75%] w-[95%] h-[95%] text-center gap-[25px] items-center backdrop-filter backdrop-blur-0 flex flex-col">
          <MeetStatusBar />
          <MeetContent />
        </div>
      </div>
    </section>
);

export default MeetHero;
