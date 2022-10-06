import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { IRepo } from "../models/models";
import { addFavourites, removeFavourites } from "../store/Github/githubSlice";

type Props = {
  repo: IRepo;
}

const RepoCard: React.FC<Props> = ({ repo }) => {
  const favourites = useAppSelector(state => state.github.favourites)
  const dispatch = useAppDispatch();
  const [isFavourite, setIsFavourite] = useState(favourites.includes(repo.html_url))

  const addToFavourites = (repoUrl: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    dispatch(addFavourites(repoUrl));
    setIsFavourite(true);
  }

  const removeFromFavourites = (repoUrl: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    dispatch(removeFavourites(repoUrl));
    setIsFavourite(false);
  }

  return(
    <div className="border rounded px-5 py-3 mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
      <a href={repo.html_url} target="_blank">
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm mb-2">
          Forks: <span className="font-bold mr-3">{repo.forks}</span>
          Created: <span className="font-bold">{repo.created_at.toString()}</span>
        </p>
        <p className="text-sm font-thin mb-2">{repo?.description}</p>
        {!isFavourite && <button
          className="border rounded bg-green-400 hover:bg-green-300 transition-all px-4 mr-2"
          onClick={event => addToFavourites(repo.html_url, event)}
        >
          Add
        </button>}
        {isFavourite && <button
          className="border rounded bg-red-500 hover:bg-red-400 transition-all px-4 mr-2"
          onClick={event => removeFromFavourites(repo.html_url, event)}
        >
          Remove
        </button>}
      </a>
    </div>
  )
}

export default RepoCard;