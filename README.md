# Social-Ignition

This project is an app that allows users to post images to a website and caption that image, like another post, and delete their own post.

Full Stack MERN App Deployment
- MongoDB — document database
- Express(.js) — Node.js web framework
- React(.js) — a client-side JavaScript framework
- Node(.js) — the premier JavaScript web server

This is a full stack project:
- Front End: (Client Side)
  - Navigation and utility, visible part of the website: 
    - HTML, CSS, JS - (React, Angular, Vue, Jquery, Bootstrap)
  
- Back End: (Server Side) 
- Manages database using queries  es and APIs and ensures data consistency 
  - NodeJS, Python - Django, Flask, Java C#, PHP, Perl, Ruby

- Database 
  - This adds, retrieves, and deletes data.
    - MongoDB, MySQL, PostgreSQL, Oracle


## Full Cycle of backend connection
#### Consider these steps with 'deletePost' function
- ##### Start with back end:
- 1] Call new function routes/posts.js
  - Import it from controllers
- 2] Actually create that function in controllers
- ##### Go to the front end 
- 3] Initiate function first in api/index.js
  - Create new API call
- 4] Then go into actions/posts.js and create that API call
- 5] Now go to reducers/posts.js and create the new "state"
- 6] Finally dispatch the action in Posts/Post/Post.js
