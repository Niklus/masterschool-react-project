import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";
import UpdatePost from "./pages/UpdatePost";

import app from "./firebase";

// Init DB
const database = getDatabase(app);

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsRef = ref(database, "posts");

    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      setPosts(() => data);
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home posts={posts} />}></Route>
        <Route
          path="/detail/:index"
          element={<PostDetail posts={posts} />}
        ></Route>
        <Route path="/admin" element={<Admin posts={posts} />}></Route>
        <Route path="/create" element={<CreatePost />}></Route>
        <Route
          path="/update/:index"
          element={<UpdatePost posts={posts} />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
