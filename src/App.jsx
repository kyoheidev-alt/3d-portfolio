import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
  BackgroundCanvas,
  RippleCanvas,
} from "./components";

const App = () => {
   // マウスの位置を管理する状態
   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

   // マウスの位置を更新する関数
   const updateMousePosition = ev => {
     setMousePosition({ x: ev.clientX, y: ev.clientY });
   };
    // コンポーネントがマウントされたときにイベントリスナーを追加し、アンマウントされたときに削除
  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-cover bg-no-repeat bg-center">
          <Navbar />
          <BackgroundCanvas />     
         <RippleCanvas mousePosition={mousePosition} />
          <Hero />
        </div>
             </div>
    </BrowserRouter>
  );
};

export default App;
