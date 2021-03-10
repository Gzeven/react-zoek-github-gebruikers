import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({children}) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers)
  //request loading
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  //error
  const [error, setError] = useState({show: false, message: ''})

  const searchGithubUser = async (user) => {
  toggleError()
  setIsLoading(true)
  const response = await axios(`${rootUrl}/users/${user}`).catch(error => console.log(error))
  if(response) {
    setGithubUser(response.data)
    const {login, followers_url} = response.data;
   
    await Promise.allSettled([axios(`${rootUrl}/users/${login}/repos?per_page=100`), axios(`${followers_url}?per_page=100`)])
    .then((results)=>{ 
      const [repos, followers] = results;
      const status = 'fulfilled';
      if(repos.status === status) {
        setRepos(repos.value.data)
      }
       if(followers.status === status) {
        setFollowers(followers.value.data)
      }
    }).catch(error=>console.log(error))
    //https://api.github.com/users/john-smilga/repos?per_page=100
    //https://api.github.com/users/john-smilga/followers
  } else {
    toggleError(true, 'Geen Github gebruiker met deze naam.')
  }
  checkRequest();
  setIsLoading(false)
  }

  function toggleError(show = false, message = '') {
  setError({show, message})
  }

  //check remaing request
  const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`)
    .then(({data})=> {
    let { rate: {remaining},} = data;
     setRequests(remaining)
     if(remaining === 0) {
       //throw error
       toggleError(true, 'Sorry, geen verzoeken meer over voor dit uur!')
     }
   
    })
    .catch((error)=>{console.log(error)})
  }

  useEffect(checkRequest, [])

return <GithubContext.Provider value={{githubUser, repos, followers, requests, error, searchGithubUser, isLoading}}> 
         {children}
       </GithubContext.Provider>

}

export {GithubProvider, GithubContext};

