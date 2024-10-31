import { useEffect, useState } from 'react'
import Notification from './notification'


function App() {
  const [createdata, setCreatedata] = useState('')
  const [userdata, setNamedata] = useState([])
  const[magicform,stateMagicform] =useState(false)
  const [updateuser,setUpdateuser] = useState('')
  const[userid,stateUserid] =useState('')


  const formdatahandle = (e) => {
    e.preventDefault();

    setNamedata((prevState) => {
        // Check if the username already exists
        const userExists = prevState.some((user) => user.name === createdata);
       

        if (userExists) {
            // If the user already exists, return the previous state without changes
           
           return prevState;
        }

        // If the user does not exist, add the new user
        return [
            ...prevState,
            { id: Date.now(), name: createdata }
        ];
    });
};


  const deleteName = (id) => {

    const filteruser = userdata.filter((user) => user.id !== id)


    setNamedata(filteruser)
  }

  const editData =(name,id)=>{
    stateMagicform(true)
    stateUserid(id)
    setUpdateuser(name)
  }
  //updateName

  const updateName =(e)=>{
    e.preventDefault()
    setNamedata((prevState)=>
      prevState.map((user)=>
        
        user.id === userid ?
        {
          ...user,name:updateuser
        }:user

      
      )
    )
    stateMagicform(false)
    


  }



  return (
    <div className='container'>


      <div className='combinedata'>
        <div className="createrec">
          <form onSubmit={formdatahandle} className='formfields'>
            <input type="text"

              onChange={(e) => setCreatedata(e.target.value)}
              value={createdata}
            />
            <button className='createrecbtn'>Create</button>
          </form>
        </div>

        <div classname="userdetails">
          <table>
            <tr>
              <div className='datahead'>
                <th>Name</th>
                <th>Edit</th>
                <th>Delete</th>
              </div>
            </tr>
            <tr>
              {userdata && userdata.map((users) =>

                <div className='datauser'>
                  <td>{users.name}</td>
                  <td><button
                  onClick={()=>editData(users.name,users.id)}
                  >Edit</button>
                  </td>
                  <td><button
                    onClick={() => deleteName(users.id)}
                  >
                    Delete
                  </button>
                  </td>
                </div>

              )}
            </tr>

          </table>


        </div>
      </div>
      {magicform &&
      <div className='magicform'>
        <form onSubmit={updateName}>
          <input type="text" 
          onChange={(e)=>setUpdateuser(e.target.value)}  
          value={updateuser} />
          <button
          className='updatebtn'
          >Update</button>
        </form>

      </div>
    }

    </div>
  )
}

export default App
