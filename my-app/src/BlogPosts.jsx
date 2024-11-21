import React, { useState, useEffect } from 'react';  /* Import necessary hooks from React */

const BlogPosts = () => { /* Initialize state variables using useState hook */
  const [posts, setPosts] = useState([]); /* State for storing blog posts */
  const [error, setError] = useState(null); /* State for handling errors */
  const [isLoading, setIsLoading] = useState(true);  /* State for loading status */

  useEffect(() => {  /* useEffect hook to fetch data when component mounts */
    const fetchPosts = async () => { /* Async function to fetch blog posts */
      try { /* Attempt to fetch data from the API */
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) { /* Check if the response is successful */
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json(); /* Parse the JSON response */
        setPosts(data); /* Update posts state with fetched data */
        setError(null); /* Clear any existing errors */
      } catch (err) {/*  Handling any errors that occur during fetch */
        setError('Failed to fetch blog posts. Please try again later.');
        setPosts([]); /* Clear posts on error */
      } finally {
       /*  Set loading to false regardless of success/failure */
        setIsLoading(false);
      }
    };

    fetchPosts();/* Call the fetch function */
  }, []);

  if (isLoading) { /* Show loading state while data is being fetched */
    return (
      <div >
        <p>Loading posts...</p>
      </div>
    );
  }

  if (error) { /* Show error message if there's an error */
    return (
      <div >
        <h2 >Error</h2>
        <p >{error}</p>
      </div>
    );
  }

  return (  /* Main render when posts are loaded successfully */
    <div >
      <h1 >Blog Posts</h1>
      <div>
        {posts.map((post, index) => (/* Map through posts array to render each post */
          <div 
            key={post.id} 
           
          >
            <h2 >
              <span >
                {index + 1}.{/*  Post number (starting from 1) */}
              </span>
              <span >
                {post.title}  {/* Post title */}
              </span>
            </h2>
            <p >
              {post.body} {/* Post content  */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPosts;