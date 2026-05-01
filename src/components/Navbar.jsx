
import { styles } from "../styles";
import { logo } from "../assets";

const Navbar = () => {
  return (
    <nav
      className={`
    ${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20
    `}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <button
          type="button"
          className="flex items-center gap-2 cursor-pointer bg-transparent border-0 p-0 text-left text-inherit rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-2"
          aria-label="トップへスクロール"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img src={logo} alt="" className="w-10 h-10 object-contain" aria-hidden />
          <p className="font-display text-white text-[17px] sm:text-[18px] font-semibold tracking-tight cursor-pointer flex">
            KioheyHashida &nbsp;
            <span className="sm:block hidden"> | Portfolio</span>
          </p>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
