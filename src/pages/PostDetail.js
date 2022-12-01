import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function PostDetail({ posts }) {
  const { index } = useParams();
  const post = posts[index];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <header>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/admin">
          <button>Login</button>
        </Link>
      </header>
      <div className="card-container">
        <div className="card card-large">
          <img src={post.image} className="image-large" alt={post.title} />
          <div className="card-body card-body-large">
            <h2 className="card-title">{post.title}</h2>
            <div className="card-text">{post.description}</div>
            <div className="detail-btns">
              <Link to={`/`}>
                <button>
                  <div className="back-btn">
                    <img src="/back.svg" alt="" height="18px" />
                    &nbsp; Go Back
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostDetail;
