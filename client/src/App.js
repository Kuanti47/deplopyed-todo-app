import React, { useEffect, useState } from 'react'; // Make sure to import useEffect
import ListItem from './Components/ListItem'
import ListHeader from './Components/ListHeader';
import Auth from './Components/Auth'
import { useCookies } from 'react-cookie';

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken
    const userEmail = cookies.Email
    const [ tasks, setTasks] = useState([]) //initialize tasks with an empty array

    async function getData() {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`);
      const json = await response.json(); // Use parentheses to call .json()
      setTasks(json);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect (() => {
    if (authToken) {
      getData()
    }}
    ,[])

  //sort by date
  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="app">
    {!authToken && <Auth/>}
    {authToken && 
    <>
      <ListHeader listName={'🌴 Holiday Tick list'} getData={getData}/>
      <p className="user-email">Welcome Back {userEmail} </p>
    {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData}/>)}
    </>}
    <p className="Copyright">© Creative Coding LLC</p>
    </div>
  );
};

export default App;