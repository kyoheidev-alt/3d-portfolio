import { Hero, Navbar, BackgroundCanvas, RippleCanvas } from "./components";
const App = () => {
  return (
    <div className="relative z-0 bg-primary">
      <div className="bg-cover bg-no-repeat bg-center">
        <Navbar />
        <BackgroundCanvas />
        <RippleCanvas />
        <Hero />
      </div>
    </div>
  );
};

export default App;
