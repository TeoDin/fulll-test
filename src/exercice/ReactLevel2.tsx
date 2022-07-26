import React, {FC, useEffect, useState} from "react";

interface IdLogin {
  id: number;
  login: string;
}

interface GithubResult {
  incomplete_results: boolean;
  items: IdLogin[];
  total_count: number;
}

const ReactLevel2Page: FC = () => {
  const [search, setSearch] = useState<string>('');
  const [result, setResult] = useState<GithubResult>();

  useEffect(() => {
    if (!search || search === '') {
      // if the search is empty, no need to fetch
      setResult(undefined);
      return;
    }
    // the input is debounced to limit the number of calls
    const debounce = setTimeout(() => {
      FetchService(search).then(setResult).catch(_ => setResult(undefined));
    }, 500);
    return () => clearTimeout(debounce);
  }, [search]);

  return (
    <div>
      <h2>React Level 2</h2>
      <input
        type="text"
        value={search}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}/>
      <h4>Nombre de résultat trouvé : {result?.total_count ?? 0}</h4>
      {!!result?.items && result.items.map((item: IdLogin) => <p key={item.id}>{item.login}</p>)}
    </div>
  );
}

//#region Service
// This region should have is own file / folder

function FetchService(search: string): Promise<any> {
  return fetch(`https://api.github.com/search/users?q=${search}`, {method: 'GET'})
    .then(handleHttpResponse)
    .then(handleJsonParsing)
    .catch(handleError);
}

// Generic handleResponse
function handleHttpResponse(response: Response): Response {
  if (response.status !== 200)
    throw new Error("Une erreur est survenu, http status = " + response.status);
  return response;
}

// Generic Json Parsing
async function handleJsonParsing(response: Response): Promise<any> {
  let result;
  try {
    result = await response.json();
  } catch (e) {
    throw new Error("Une érreur est survenue durant le parse du Json: " + e);
  }
  return result;
}

// Generic handleError
function handleError(error: Error) {
  console.error(error);
}

//#endregion

export default ReactLevel2Page;
