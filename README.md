# Film Lake :movie: :lake:

#### A dashingly designed application for searching and discovering everything related to film! :film:

Live demo: [https://filmlake.xyz](https://filmlake.xyz)

##### Powered by one of the largest film databases in the world [https://tmdb.com](https://tmdb.com)

- Browse movies, tv shows and people!
- Discover your next flick! Filter by genre, year and type. Sort results by revenue, ratings, popularity, and release date!
- Find the newest, hottest shows on the trending page
- Search for people, movies and tv shows!
- Build a list of your favorite shows!
- Rate your favorite- and least favorite- tv and movies!


## Setup the project
Clone this repo 
In the project's directory, run:
```
npm install
```

## Local Development
1. ### Start the development server for hot-reloads
In project directory, run:
    ```
    npm run serve
    ```
2. ### Navigate to `localhost:8080` in your browser to see the project running locally

3. ### Expose local server for TMDB Authentication (optional)
If you want to perform any actions that require TMDB auth such as liking, rating, or reviewing movies, you must expose your development server to the internet using ngrok(or your favorite tunneling method, ngrok is great and free)
    1. Download ngrok here [https://ngrok.com/download](https://ngrok.com/download)
    2. Follow ngrok's installation instructions. Then in the directory where you unzipped ngrok:
        `ngrok http 8080 -host-header=rewrite`
    3. Finally, copy the `.env` file and rename it to `.env.development`. Update it's `VUE_APP_BASE_URL` environment variable with your ngrok domain
    4. Test out some auth-required features! Contribute to TMDB and rate a movie!

## Production
1. ### Compile and Minify for production
In the project directory run:
```
npm run build
```


--- 

## Author

Kevin Graham @kevingrahamtech <kevingrahamtech@gmail.com>

---

## License and copyright
This project is licensed under the MIT license and is free to use by any and all