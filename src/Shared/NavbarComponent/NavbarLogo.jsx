import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

const NavbarLogo = ({ onMenuClick, hamburgerRef }) => {
  return (
    <div className="flex xl:items-center items-end gap-2">
      {/* sidebar icon */}
      <div
        className="xl:hidden block mr-3"
        onClick={onMenuClick}
      >
        <RxHamburgerMenu
          ref={hamburgerRef}
          className="md:text-3xl text-[26px]"
        />
      </div>

      {/* logo */}
      <Link to="/">
        <p
          className="uppercase font-bold 2xl:text-3xl text-2xl"
          style={{
            fontFamily: "Integral CF",
            letterSpacing: "2px",
          }}
        >
          <span>shop</span>.co
        </p>
      </Link>
    </div>
  );
};

export default NavbarLogo;