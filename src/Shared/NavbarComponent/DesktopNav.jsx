import { Link } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";
import { categories } from "./categories";

const DesktopNav = () => {
  return (
    <div className="hidden 2xl:block xl:block">
      <div>
        <ul className="flex 2xl:text-[18px] xl:text-[15px] font-normal 2xl:gap-8 xl:gap-5">
          <li className="hover:text-orange-300">
            <Link to="/">Home</Link>
          </li>

          {Object.entries(categories).map(([title, items]) => (
            <CategoryDropdown
              key={title}
              title={title}
              items={items}
            />
          ))}

          <li className="hover:text-orange-300">
            <Link to="/productsList/newArrival">
              New Arrival
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DesktopNav;