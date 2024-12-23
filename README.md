# IMBDB

## A.K.A. I'm (the) Bee Database

This is a fully fledged full-stack app _without_ auth yet for students to get some extra auth practice. It's based off the regular boilerplate, so overall project structure is similar to other Full-Stack labs like Chirper and Blogs.

IMBDB maintains a list of user accounts, a list of bee species, and users will create log entries out bee sightings. This app is like a semi-private journaling site where all posts are visible to all users, but you must be a registered and logged in user to see posts.

## Getting Started

-   Run `npm install` to get your dependencies

-   Grab the script at [starter.sql](./starter.sql) to create the tables and pre-populate them with some data (the 1 user account for Buzz Lightyear has a plaintext password of `password123`);

-   Copy the [.env.sample](./.env.sample) file to a new `.env` file, filling it out with _your_ database user and database password.

-   Take a look around the backend, especially in the routes and queries. All the queries are fully written and you won't need to add or alter any (for the base requirements). Your work with routes will only be within the auth routes folder.

-   Take a look around the client side. Just like with the backend, the core CRUD functionality is done. There is an apiService file already included as well.

## Backend steps

-   Import all the passport libraries & their types, then create your passport middlewares

-   In the auth routes folder, develop your login and registration routes, using bcrypt to salt+hash your passwords, and jsonwebtoken to sign and issue tokens (make sure to update your `.env` and config accordingly!)

-   Protect _all_ your API routes, and in the process of doing that, ensure that any hardcoded placeholder `user_id` values in routes are getting derived from the _user_ making the _request_ instead

-   **BONUS** - as the requirements stand, all it takes to update or delete a sighting entry is that you're a valid user with a legitimate, unexpired token. You can edit my posts, and I can delete yours. There are a couple of different ways you could validate this - one would involve editing the WHERE clause of the update & delete queries to include an extra bit of data, and the other would involve preemptively getting that item and making sure some properties of it align with the user making the request. Try it out!

## Frontend steps

-   Implement a login and registration view, making sure to store your token.

-   Alter the apiService to add in the token to your auth headers so that your api will be able to receive and check your credentials

-   Create a component to check your auth status (simply checking for the token's existence is fine for this lab's requirements) that prevents access to other components if you are not logged in. Return the `<Navigate />` component from `react-router-dom` to push users back to the login page if the token does not exist.

-   The components that should be protected are: Create, Sightings, SightingDetails, and Edit. Home/Login/Register should all remain publicly accessible

-   **BONUS** In your auth wrapper component, instead of simply checking for the token's existence (it could be fake, expired, malformed, etc.), make a server side route that checks the token's validity, and use a call to that endpoint in your auth wrapper component to actually verify whether or not the token is legitimate.

-   **DOUBLE BONUS** If you make the above token validity checking endpoint, have your Navbar component check that on each page change to rerender buttons. I.E. if I am logged in, I should not see the login/register button. You could have a logout button then appear that deletes the token and navigates the user back to the login page. If I am logged out, I should only see home/login/register.
