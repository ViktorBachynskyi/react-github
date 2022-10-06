import { NavLink } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-rose-500 text-white">
      <h3 className="font-bold">Github search</h3>

      <div>
        <NavLink to="/" className="mr-2">Home</NavLink>
        <NavLink to="/favourites">Favourites</NavLink>
      </div>
    </nav>
  )
}

export default Navigation;