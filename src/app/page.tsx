import HomeSection from '@app/_components/HomeSection';

const HomePage = () => {
  return (
    <div className="h-screen overflow-y-scroll scrollbar-hide relative">
      <div className="bg-primary-10 max-w-[600px] m-auto">
      <HomeSection />
      </div>
    </div>
  );
};

export default HomePage;
