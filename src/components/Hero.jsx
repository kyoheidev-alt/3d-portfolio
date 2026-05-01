import { useEffect, useState } from "react";
import About from "./About";
import Works from "./Works";
import Tech from "./Tech";
import Contact from "./Contact";
import { styles } from "../styles";
import { TetraCanvas } from "./canvas";

const sections = [
  { id: 0, name: "About", Component: About },
  { id: 1, name: "Tech", Component: Tech },
  { id: 2, name: "Works", Component: Works },
  { id: 3, name: "Contact", Component: Contact },
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        !event.target.closest(".menu") &&
        !event.target.closest("#tetra-canvas")
      ) {
        setActiveIndex(null);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  // 選択されたセクションのコンポーネントを取得
  const ActiveComponent =
    activeIndex !== null ? sections[activeIndex].Component : null;

  return (
    <section className={`relative w-full h-screen mx-auto `}>
      {sections.map(({ id, name }) => (
        <div
          key={id}
          className={`absolute ${
            id % 2 === 0
              ? "lg:left-[20%] sm:left-[15%] left-[10%]"
              : "lg:right-[20%] sm:right-[15%] right-[10%]"
          } ${id < 2 ? "top-[25%]" : "top-[65%]"} max-w-7xl mx-auto ${
            styles.paddingX
          } z-20`}
        >
          <button
            type="button"
            className={`menu font-display text-xl font-semibold tracking-[0.12em] uppercase cursor-pointer select-none bg-transparent border-0 p-0 text-white rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-2 ${
              activeIndex === id ? "active" : ""
            }`}
            onClick={() => setActiveIndex(id)}
          >
            {name}
          </button>
        </div>
      ))}
      {/* key={0}の位置に選択されたセクションのコンポーネントを表示 */}
      {activeIndex !== null && <ActiveComponent />}
      <TetraCanvas activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
    </section>
  );
};

export default Hero;
