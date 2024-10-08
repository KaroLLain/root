import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listUsers, deleteUser } from '../actions/userActions'

function UserListScreen () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userList = useSelector(state => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
      if (userInfo && userInfo.isAdmin) {
          dispatch(listUsers())
      } else {
        navigate('/login')
    }

  }, [dispatch, navigate, successDelete, userInfo])

  const deleteHandler = id => {

    if(window.confirm("Are you sure, you want to delete this user?")) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <div>
      <h2>USERS</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table
          variant='light'
          striped
          bordered
          hover
          responsive
          className='table-l'
        >
          <thead className='bordered backgroundColorBeige'>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody className='bordered'>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-x' style={{ color: 'red' }}></i>
                  )}
                </td>

                <td className='reletiveToCenter'>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='secondary' className='btn-sm px-3'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm px-3'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default UserListScreen
