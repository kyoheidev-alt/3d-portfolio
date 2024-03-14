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
    // クリックイベントリスナーを追加
    const handleDocumentClick = (event) => {
      console.log(event.target);
      // クリックされた要素がmenuクラスを持っているか、またはTetraCanvas内の要素かどうかをチェック
      if (
        !event.target.closest(".menu") &&
        !event.target.closest("#tetra-canvas")
      ) {
        setActiveIndex(null); // 条件に一致しない場合はactiveIndexをnullに設定
      }
    };

    document.addEventListener("click", handleDocumentClick);

    // コンポーネントのアンマウント時にイベントリスナーを削除
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []); // 空の依存配列を渡して、コンポーネントのマウント時にのみ実行

  return (
    <section
      className={`relative w-full h-screen mx-auto `}
      // onClick={handleClickOutside}
    >
      {sections.map(({ id, name, Component }) => (
        <div
          key={id}
          className={`absolute  ${
            id % 2 === 0
              ? "lg:left-[20%] sm:left-[15%] left-[10%]"
              : "lg:right-[20%] sm:right-[15%] right-[10%]"
          } ${id < 2 ? "top-[25%]" : "top-[70%]"} max-w-7xl mx-auto ${
            styles.paddingX
          } z-20 cursor-pointer`}
          onClick={() => {
            setActiveIndex(id);
          }}
        >
          <a
            className="menu text-xl font-bold"
            style={{ color: activeIndex === id ? "red" : "inherit" }}
          >
            {name}
          </a>
          {activeIndex === id && <Component />}
        </div>
      ))}
      <TetraCanvas activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
    </section>
  );
};

export default Hero;
