import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { removeFavourites } from "../store/Github/githubSlice";

const Favourites: React.FC = () => {
  const favourites = useAppSelector(state => state.github.favourites);
  const dispatch = useAppDispatch();

  return(
    <div className="flex flex-col items-center pt-10">
      <h1 className="text-3xl font-bold pb-4">Favourite Repos:</h1>
        {favourites.map(fav => (
          <div>
            <a key={fav} href={fav}>{fav}</a>
            <button className="pl-4 hover:font-bold" onClick={() => dispatch(removeFavourites(fav))}>x</button>
          </div>
        ))}
    </div>
  )
}

export default Favourites;