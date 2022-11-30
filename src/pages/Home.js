import { Link } from "react-router-dom";

function Home({ posts }) {
  if (posts.length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <header>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/admin">
          <button>Login</button>
        </Link>
      </header>
      <div className="posts">
        {posts.map((post, index) => {
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
                <Link to={`/detail/${index}`}>
                  <button>Read More</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
