import React, { useEffect, useState, useContext } from 'react'
import {
  BrowserRouter as Router,
  useHistory,
  useParams,
  useLocation
} from "react-router-dom";
import { UseUserContext } from '../utils/UserContext'
import RoomDetails from '../components/RoomDetails'
import UserList from '../components/UserList'
import axios from 'axios'

export default function Hone() {
  const location = useLocation()
  const { roomId } = useParams()
  let history = useHistory();

  const [user,] = useContext(UseUserContext)
  const [users, setUsers] = useState([])
  const [info, setInfo] = useState([])

  useEffect(() => {
    updateRoom()
  }, [])

  useEffect(() => {
    if (!user || !user.id) return;

    const isUserInRoom = users.find(u => u.id === user.id)
    if (isUserInRoom) return;

    axios.post(`/api/Room/AddUser?roomId=${roomId}&userId=${user.id}`)
  }, [user, users])

  const updateRoom = async () => {
    while (history.location == location) {
      try {
        const { data } = await axios.get(`/api/Room?id=${roomId}`)
        setUsers(data.users)
        setInfo(data)
        console.log(data)
        await new Promise(r => setTimeout(r, 200));
      }
      catch (err) {
        console.log(err)
        break;
      }
    }
  }

  const Table = () => {
    return (
      <div style={{ width: "25rem", height: "10rem", backgroundColor: "#74b3ff" }}>
      </div>
    )
  }

  return (
    <div>
      <RoomDetails info={info} />
      <UserList users={users} />
    </div>
  )
}
