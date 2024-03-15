import React, { useState, useEffect } from "react"; // useEffectをインポート
import About from "./About";
import Work from "./Work";
import Game from "./Game";
import Contact from "./Contact";
import { styles } from "../styles";
import { TetraCanvas } from "./canvas";

const sections = [
  { id: 0, name: "About", Component: About },
  { id: 1, name: "Game", Component: Game },
  { id: 2, name: "Work", Component: Work },
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
          onClick={() => {
            setActiveIndex(id);
          }}
        >
          <a
            className={`menu text-xl font-bold cursor-pointer ${
              activeIndex === id ? "active" : ""
            }`}
          >
            {name}
          </a>
        </div>
      ))}
      {/* key={0}の位置に選択されたセクションのコンポーネントを表示 */}
      {activeIndex !== null && <ActiveComponent />}
      <TetraCanvas activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
    </section>
  );
};

export default Hero;
