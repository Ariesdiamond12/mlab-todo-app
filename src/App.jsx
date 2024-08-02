import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

//Pages that we are importing
import Todo from "./Components/Todo";
import Registraion from "./Components/Registration";
import Login from "./Components/Login";
import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);

  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(""); // Track input value for user ID

  const [editUserId, setEditUserId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []); // Run only once on component mount

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchUser = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
  };

  const addUser = async (name, email, password) => {
    try {
      await axios.post("http://localhost:3001/users", {
        name,
        email,
        password,
      });
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const updateUser = async (id) => {
    try {
      await axios.put(`http://localhost:3001/users/${id}`, {
        name: editName,
        age: editAge,
      });
      setEditUserId(null);
      setEditName("");
      setEditAge("");
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditClick = (user) => {
    setEditUserId(user.id);
    setEditName(user.name);
    // setEditAge(user.age);
  };

  return (
    <div>
      <div className="bg-stone-300 grid py-4 min-h-screen content-center">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login users={users} />} />
            <Route
              path="/Registration"
              element={<Registraion addUser={addUser} />}
            />
            <Route path="/Todo" element={<Todo />} />
          </Routes>
        </BrowserRouter>
      </div>

      {/* <h2>Add User</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setname(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <button onClick={addUser}>Add</button> */}

      {/* <div>
        
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {editUserId === user.id ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <input
                  type="number"
                  value={editAge}
                  onChange={(e) => setEditAge(e.target.value)}
                />
                <button onClick={() => updateUser(user.id)}>Update</button>
                <button onClick={() => setEditUserId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {user.name} - {user.age}
                <button onClick={() => handleEditClick(user)}>Edit</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <h2>Get User by ID</h2>
      <input
        type="number"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={() => fetchUser(userId)}>Fetch User</button>
      {user && (
        <div>
          <h3>User Details</h3>
          <p>ID: {user.id}</p>
          <p>Name: {user.name}</p>
          <p>Age: {user.age}</p>
        </div>
      )}
      <h2>Delete User by ID</h2>
      <input
        type="number"
        placeholder="User ID"
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={() => deleteUser(userId)}>Delete</button>
      </div> */}
    </div>
  );
};

export default App;
