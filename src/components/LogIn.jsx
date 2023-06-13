import { useState } from "react"

function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);

  }
  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value })

  }

  return (
    <div className='mx-4 mt-2' style={{float: 'right'}}>
      <form onChange={onChange} >
        <input placeholder="Brugernavn" id="username" />
        <input placeholder="Adgangskode" id="password" />
        <button onClick={performLogin}>Log ind</button>
      </form>
    </div>
  )

}

export default LogIn;

