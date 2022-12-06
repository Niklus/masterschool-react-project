import { useState, useEffect } from "react";
import Login from "../components/Login";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../firebase";
import { Link } from "react-router-dom";
import { getDatabase, set, ref as dbRef } from "firebase/database";

const db = getDatabase(app);

const auth = getAuth(app);

function Admin({ posts }) {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) ?? {};
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (email && password) {
      signIn(email, password);
    }
  }

  function signIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
  }

  function logOut() {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (Object.keys(user).length === 0) {
    return (
      <>
        <header>
          <Link to="/">
            <button>Home</button>
          </Link>
          <button onClick={logOut}>Log Out</button>
        </header>
        <Login
          email={email}
          password={password}
          onEmailChange={handleEmailChange}
          onPasswordChange={handlePasswordChange}
          onFormSubmit={handleFormSubmit}
        />
      </>
    );
  }

  function deletePost(index) {
    const filtered = posts.filter((item, i) => {
      if (i === index) {
        return false;
      }
      return true;
    });

    set(dbRef(db, "posts"), filtered);
  }

  const filtered = posts.filter((item) => {
    return item.uid === user.uid;
  });

  if (posts.length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <header>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/create">
          <button>New Post</button>
        </Link>
        <button onClick={logOut}>Log Out</button>
      </header>
      <div className="posts">
        {filtered.map((post, index) => {
          return (
            <div className="card" key={index}>
              <img
                src={post.image}
                alt={post.title}
                className="img-small"
                loading="lazy"
              />
              <div className="card-body">
                <h3 className="card-title">{post.title}</h3>
                <div className="card-text">
                  {post.description.substring(0, 30) + "..."}
                </div>
                <p className="card-text date">${post.price}</p>

                <Link to={`/update/${index}`}>
                  <button>Edit</button>
                </Link>
                <button
                  style={{ marginLeft: "10px", backgroundColor: "crimson" }}
                  onClick={() => deletePost(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Admin;
