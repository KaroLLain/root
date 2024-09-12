import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

function UserEditScreen () {
  const userId = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const userDetails = useSelector(state => state.userDetails)
  const { error, loading, user } = userDetails

  const userUpdate = useSelector(state => state.userUpdate)
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      navigate('/admin/userList')
    } else {
      if (!user.name || user._id !== Number(userId.id)) {
        dispatch(getUserDetails(userId.id))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [user, userId, dispatch, navigate, successUpdate])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(updateUser({_id:user._id, name, email, isAdmin}))
  }

  return (
    <div>
      <Link to='/admin/userList' className='btn btn-success my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1 className='py-5'>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='pb-3'>
              <Form.Label className='font-weight-light'>Name</Form.Label>
              <Form.Control
                className='py-2'
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={e => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className='pb-3'>
              <Form.Label className='font-weight-light'>
                Email Address
              </Form.Label>
              <Form.Control
                required
                className='py-2'
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isAdmin' className='pb-3'>
              <Form.Check
                className='py-2'
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='light' className='px-4 py-3'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  )
}

export default UserEditScreen
