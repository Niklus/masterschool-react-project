import { Link, useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getDatabase, set, ref as dbRef } from "firebase/database";
import app from "../firebase";

const storage = getStorage(app);

// Init DB
const db = getDatabase(app);

function UpdatePost({ posts }) {
  const navigate = useNavigate();
  const titleInputRef = useRef();
  const priceInputRef = useRef();
  const descriptionInputRef = useRef();
  const { index } = useParams();
  let file = null;

  const user = JSON.parse(localStorage.getItem("user")) || {};

  if (Object.keys(user).length === 0) {
    return <h1>Login to access</h1>;
  }

  if (posts.length === 0) {
    return <h1>Loading...</h1>;
  }

  const post = posts[index];

  function handleFormSubmit(e) {
    e.preventDefault();
    const title = titleInputRef.current.value;
    const price = priceInputRef.current.value;
    const description = descriptionInputRef.current.value;
    const image = file.files[0];

    const newData = {
      title,
      price,
      description,
    };

    if (image) {
      const size = image.size / 1024 / 1024;

      // Check image size
      if (size > 10) {
        // If image is larger than 2mb return
        alert("Image is too large");
        return;
      }

      const storageRef = ref(storage, `images/${post.imageId}/house.jpg`);

      // Upload the file and metadata
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            newData.image = downloadURL;
            posts[index] = { ...post, ...newData };
            set(dbRef(db, "posts"), [...posts]);
            navigate("/admin");
          });
        }
      );
    } else {
      posts[index] = { ...post, ...newData };
      set(dbRef(db, "posts"), [...posts]);
      navigate("/admin");
    }
  }

  return (
    <>
      <header>
        <Link to="/admin">
          <button>Admin</button>
        </Link>
      </header>
      <div className="card-container">
        <div className="card card-large">
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <div>
                <label>New Image</label>
                <br />
                <input
                  type="file"
                  accept="image/jpeg"
                  ref={(ref) => (file = ref)}
                />
                <br />
              </div>
              <div>
                <label>Title</label>
                <br />
                <input
                  defaultValue={post.title}
                  type="text"
                  ref={titleInputRef}
                  required
                />
                <br />
              </div>
              <div>
                <label>Price</label>
                <br />
                <input
                  defaultValue={post.price}
                  type="text"
                  ref={priceInputRef}
                  required
                />
                <br />
              </div>
              <div>
                <label>Description</label>
                <br />
                <textarea
                  defaultValue={post.description}
                  rows="25"
                  cols="80"
                  ref={descriptionInputRef}
                  required
                ></textarea>
              </div>
              <button>Create</button>
            </form>
            <Link to={`/admin`}>
              <button>Go Back</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdatePost;
