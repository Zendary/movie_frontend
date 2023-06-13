
import facade from "../apiFacade";
import { useState, useEffect } from 'react'

const About = ({ user }) => {
  const [dataFromServer, setDataFromServer] = useState("Loading...")
  useEffect(() => {
    if (user.username === '') {
      setDataFromServer("Please log in");
      return;
    }
    const url = user.roles.split(',').includes('user') ? '/api/info/user' : '/api/info/admin';
    facade.fetchData(url).then(res => {
      console.log(res);
      setDataFromServer(res.msg)
    });
  }, [user]);
  return (<>
    {/* {dataFromServer} */}
    <div className="ms-4 mt-4"><h2>Om</h2>
    <p>Dette er mit eksamen projekt lavet ud fra opgaven "Web Application for a movie festival"</p>
    <p>Lavet af Martin Lorentzen</p>
    </div>
  </>
  )
};

export default About