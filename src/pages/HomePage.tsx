import { useEffect, useState } from "react";
import RepoCard from "../components/RepoCard";
import { useDebouce } from "../hooks/debounce";
import { useLazyGetUserReposQuery, useSearchUsersQuery } from "../store/Github/github.api";

const HomePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const debounced = useDebouce(search, 800);
  const {isLoading, isError, data: users} = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3
  });
  const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery();

  useEffect(() => {
    setDropdown(debounced.length > 2 && users?.length !== 0)
  }, [debounced, users])

  const clickHandler = (username: string) => {
    fetchRepos(username);
    setDropdown(false);
  }

  return(
    <>
      <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
        {isError && <p className="text-center text-red-600">Something went wrong...</p>}

        <div className="relative w-[560px]">
          <input
            type="text"
            className="border py-2 px-4 w-full h-[42px] mb-2"
            placeholder="Search for Github username"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          {dropdown && <ul className="absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white list-none overflow-y-scroll">
            {isLoading && <p className="text-center">Loading...</p>}
            {users?.map(user => (
              <li
                key={user.id}
                onClick={() => clickHandler(user.login)}
                className="py-2 px-4 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
              >
                {user.login}
              </li>
            ))}
          </ul>}

          <div className="container">
            { areReposLoading && <p className="text-center ">Repos are loading...</p>}
            {repos?.map(repo => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage;