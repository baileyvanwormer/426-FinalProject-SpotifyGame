# Spotify Name That Tune Game

## Link to Our Final Project Presentation Video
https://youtu.be/QmriKZKhEF0

## Project Overview
Spotify Name That Tune is a web-based game developed by Bailey Van Wormer (730472595), Brad Weyand (730318989), and Andrew Mu (730290106) where players listen to song previews and guess the song titles to earn points. This project was designed to integrate with the Spotify API to fetch song previews and artist data.

We used Angular for the frontend and Express for the backend. All frontend can be found in /SpotifyGame and all backend logic can be found in /SpotifyGameBackend. As previously mentioned, the 3rd party API we selected for this project was the Spotify Web API (https://developer.spotify.com/documentation/web-api). We keep track of persistent user session state through the recording of a user's high scores for each particular artist. 

How to play the game:
1. Login with your desired username
2. Type in an artist whose songs you would like to guess.
3. Listen to the provided song preview for that artist.
3. Enter your song guess into the input box below the song preview. Remember to use exact spelling.
4. Click 'Submit Guess' to see if you got the correct answer!
5. If you did, move back to step 3 and repeat! If you did not, you will be taken to a Game Over screen where your game score and highest score for that artist are displayed. You have the option to return back to the menu and select another artist to play again!
6. Enjoy!

Here is what our alert looks like that is not displaying in the video:
