import { useEffect,useState } from "react";
import { useFetchRepositories } from "./hooks/useRepos"
import Card from "./components/Card";
import { useFavoriteReposStore } from "./store/favoriteRepos";

function App() {

  const [user, setUser] = useState('Saul19-L98');

  const {data,isLoading} = useFetchRepositories(user);

  const {favoriteReposIds } = useFavoriteReposStore();


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setUser(formData.get('user') as string);
  }

  useEffect(()=>{
    console.log(data);
  },[data])

  if(isLoading) return (
    <div>
      <h1>🔃Loading...</h1>
    </div>
  )

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user">User:</label>
        <input type="text" id="user" name="user" />
        <button type="submit">Submit</button>
      </form>
      {data?.map(repository => (
        <Card key={repository.id} repository={repository}
        isFavorite={favoriteReposIds.includes(repository.id)}
        />
      ))}
    </div>
  )
}

export default App
