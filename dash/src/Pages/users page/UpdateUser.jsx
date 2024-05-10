import React, { useState , useEffect}  from "react";
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from '../../Components/SideBar Section/Sidebar';
import { BiSearchAlt } from 'react-icons/bi';
import { TbMessageCircle } from 'react-icons/tb';
import { IoNotificationsOutline } from 'react-icons/io5';
import img from '../../../src/Assets/img.jpg';

import axios from 'axios'

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser } from "../../redux/userSlice";
const UpdateUser = ()=> {
    const {id} = useParams()
    const users = useSelector (state => state.users.users)
    const user = users.find(u => u.id === id)

  

    const [username , setUsername] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [role , setRole] = useState('')
  //  const [photo_user , setPhoto_user] = useState ('')
    const navigate = useNavigate();

const getsingleUser = async (id) =>{

  try {
    const {data} = await axios.get(`http://localhost:4000/user/getoneuser/${id}`);
    const {username , email , password ,role,photo_user} = data.result;
    setUsername(username);
    setEmail(email);
    setPassword (password);
    setRole(role);
  //  setPhoto_user(photo_user);

  } catch (err){
    console.log(err)
  }
}
useEffect(() => {
  getsingleUser(id);
  
}, [id]);

    const dispatch = useDispatch()
    
    const handleUpdate = async (e) => {
      e.preventDefault();
  
      try {
        // Create an object containing the updated user data
        const updatedUserData = {
          username: username,
          email: email,
          password: password,
          role: role,
        };
  
        const response = await axios.put(
          `http://localhost:4000/user/updateUser/${id}`,
          updatedUserData
        );
  
        console.log("Update User Response:", response.data);
  
        if (response.status === 200) {
          dispatch(updateUser(response.data.user));
          navigate("/User");
        } else {
          console.error("Failed to update user:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating user:", error);
      }
    };
  
  
      


    
    return (
        <div className="container">
          <Sidebar />
          <Toaster />
          <div className="mainContent">
            <div className="topSection">
              <div className="headerSection flex">
                <div className="title">
                  <h1>Welcome to ....</h1>
                  <p>Hello Admin, Welcome back!</p>
                </div>
                <div className="searchBar flex">
                  <input type="text" placeholder="Search Dashboard"/>
                  <BiSearchAlt className="icon" />
                </div>
                <div className="adminDiv flex ">
                  <TbMessageCircle className="icon" />
                  <IoNotificationsOutline className="icon" />
                  <div className="adminImage">
                    <img src={img} alt="Admin Image" />
                  </div>
                </div>
              </div>
            </div>
    
            <div className="formContent flex">
              <h2>Update User detail </h2>
            </div>
    
            <form  className="formSection"   onSubmit={handleUpdate}>
              <div className="row">
                <div className="col-25">
                  <label htmlFor="Username">User Name</label>
                </div>
                <div className="col-75">
                  <input
                    type="text"
                    placeholder="user name.."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                     />
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label htmlFor="Email">Email</label>
                </div>
                <div className="col-75">
                  <input
                    type="text"
                    placeholder="email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                   />
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label htmlFor="Phone Number">Password</label>
                </div>
                <div className="col-75">
                  <input
                    type="text"
                    placeholder="Password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                     />
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label htmlFor="Phone Number">Phone Number</label>
                </div>
                <div className="col-75">
                  <input
                    type="text"
                    placeholder="Phone Number..."
                     />
                </div>
              </div>
           
              <div className="row">
                <div className="col-25">
                  <label htmlFor="role">Role </label>
                </div>
                <div className="col-75">
                  <select
                    name="role"
                    value = {role}
                    onChange={(e) => setRole(e.target.value)}>

                      <option value="">edit role</option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                </div>
              </div>
           {  /* <div className="row">
            <div className="col-25">
              <label htmlFor="photo" className="file-upload"> Image</label>
            </div>
            <div className="col-75">
              <input id="file-upload" type="file"  accept="image/*" 
               onChange={(e) => setPhoto_user(e.target.files[0])}/>
            </div>
            </div>
            <div className="row">
                  <div className="col-25">
                      <label htmlFor="photo">Image</label>
                  </div>
                  {photo_user && photo_user instanceof File ? (
                  <div className="col-75">
                      <img src={URL.createObjectURL(photo_user)} alt="Uploaded" style={{ width: '170px', height: '190px', display: 'flex', borderRadius: '10px' }} />
                  </div>
              ) : (
                  <div className="col-75" >
                      <img src={`http://localhost:4000/User/userPhoto/${id}`} alt="Default" 
                      style={{ width: '170px', height: '150px', paddingTop : '10px',display: 'flex', borderRadius: '10px' }} />
                  </div>
              )}

              </div> 
            */}

         <div className="buttons flex">
            <button className="btn" type="submit"  > save change </button>
          </div>
         
            </form>
            <div className="buttons flex">
          </div>
          </div>
        </div>
      );


}

export default UpdateUser ;