import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../store/users';
import { autoLogin } from '../../store/auth';

function AllUsers() {
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div className="container">
      {auth.isAdmin ? (
        <div>
          <h2>All Users</h2>

          <table className="table mt-5">
            <thead>
              <tr>
                {/* <th scope="col">#</th> */}
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <>
                  <tr key={user.id}>
                    {/* <th scope="row">{user.id}</th> */}
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

const mapDispatch = (dispatch) => ({
  autoLogin: (token) => dispatch(autoLogin(token)),
  getUsers: () => dispatch(fetchUsers()),
});

export default AllUsers;
