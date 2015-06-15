application structure
=====================

The are two parts to the application.

* User interface
* Episode data

user interface
--------------

This is all the html, js, css and images compiled into a single page that the user interacts with. The user interface is like a slide show, with some slides interactive. The slide types are:

* title. Shown at the start of an episode
* html. Shows arbitary html content
* pick. Shows a multiple choice question
* slider. Shows a horizontal slider to incicate preference
* sort. Show a list that needs to be sorted
* audio. Plays a segment of audio

episode data
------------

The episode data is downloaded as a single `.bso` file. Internally this file contains two parts:

* audio.mp3. This is a plain mp3 file that contains all the audio for the episode.
* slides.json. This is a text file that defines the slides for the episode.
