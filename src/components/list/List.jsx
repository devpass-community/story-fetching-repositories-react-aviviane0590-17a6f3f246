import React, { useState } from "react";
import { ListGroup, Button, Spinner } from "react-bootstrap";
import "./styles.css";

const List = () => {
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRepositories = async () => {  
    setIsLoading(true) 
    const url = "https://api.github.com/users/devpass-tech/repos"    
    fetch(url)      
      .then((response) => response.json())      
      .then(data => {
        
        setRepositories(data)
        setIsLoading(false)
      })
      .catch((error) => console.log('Erro na chamada da API', error.message))

    
  };

  return (
    <div className="list">
      <div className="container">
        <h2 className="title">Devpass Repositories</h2>

        {isLoading ?
          (<Spinner />) :
          (
            <ListGroup className="repositoriesList">

              {repositories.map(repo => (
                <ListGroup.Item key={repo.id}>{repo.name}</ListGroup.Item>
              ))}

            </ListGroup>)}
        <Button data-testid="button" className="button" variant="primary" onClick={() => fetchRepositories()}>Fetch repositories</Button>
      </div>
    </div>
  );
};

export default List;
