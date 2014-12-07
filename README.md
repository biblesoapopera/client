demo
====

This is an experimental user interface for the bible soap opera project (http://biblesoapopera.com/).

To view the user interface go to http://biblesoapopera.github.com/demo.

developing the bso demo
=======================

These instructions will install the demo source code locally.

install required tools
----------------------

The demo development tools use node.js. You will need http://nodejs.org installed on your system. Check that node is installed correctly by typing these commands at your system command prompt:

* `>node`. The node.js command prompt (`>`) should appear. (Press `ctrl-c` to exit).
* `>npm`. The help screen for the node package manager should appear.

Demo source code is managed with git. You will need git installed on your system. On windows machines this is probably the easisest way to install git: https://windows.github.com/. Check that git is installed correctly by typing this command at the your system command prompt:

* `>git`. The git help screen should appear.
 
download the source
-------------------

At your system command propmpt type:

`>git clone http://github.com/biblesoapopera/demo`

This will download the source and create a git repository in a new directory called `demo`.

install dependencies
--------------------

Change into the newly created `demo` directory:

`>cd demo`

Then type:

`>npm install`

This will use the node package manage to download all the third party libraries used by the bible soap opera demo.

build
-----

Type:

`>node gulp.js`

This will start the build tool (called gulp). The build tool will carry out the following tasks:

* Build the source files into file that a web server can deliver, and place them in the `/demo/dev` directory.
* Start the development webserver
* Place a watch on all the source files
* Start a live reload server
* Rebuild the source any time one of the source files is changed
 
view
----

Point your browser to `http://localhost`. You should see the demo.

edit
----

Open the `/demo/data/ep1/slide.json` file in your favourite text editor.

Look for the line `"subtitle": "bible soap opera demo"` and change the subtitle to something different.

Then save the edited file.

Your browser should automatically reload the demo site, and your changes should be visible.

Happy playing!

building distributable
======================

Type:

`>node gulp.js --dist`

This will build compressed distributable files to `/demo/dist`. These are the files placed in the `gh-pages` branch for serving at `http://biblesoapopera.github.io/demo`.

making a contribution
=====================

Not surprisingly this project uses git to manage source code, and github pull requests to review changes.

If you make local changes to the demo that you would like incorporated into the master repository, then follow this workflow:

* You will need a github account if you don't already have one.
* Go the demo github page (`http://github.com/biblesoapopera/demo`) and click on `fork` in the top right corner. This will create your own personal copy of the demo in your own github account.
* On your local machine open a command prompt and go to your `demo` directory
* Add a new remote to your local git repository by typing the following command:
`>git remote add myforkname http://github.com/myusername/demo`
* Next, list the changes you have made to your local repository with:
`>git status`
* Now you need to stage those changes you want to commit. Use the following two commands multiple times for different files:
`>git add filepath`
`>git rm filepath`
* Use `>git status` to check your staging. Unstaged changes will be listed in red. Staged changes will be listed in green.
* Commit your work with:
`git commit -m "my commit message"`
* Send your commit to your github remote with:
`git push myforkname master`
* Then go to your personal github fork (`http://github.com/myusername/demo`) and create a pull request.
 
You're done! Your pull request will appear on the issues page of `http://github.com/biblesoapopera/demo` ready for review, dissucssion and then merging.

design principles
=================

This is software targeted at low end smart phones. It needs to be as light and fast and simple as possible.

* No javascript frameworks. Use only vanilla javascript. Much smaller, much lighter. Often ends up being simpler too.
* Keep images to a minimum. Use css effects instead whereever possible.
* Single page load with everything embedded, no linked css, js, or images.
* Use modern standards, don't support legacy browsers. Allows more things to be pushed out of js and onto native browser capabilities.
* Be thoughtful about performance, don't have javascript creating and destroying huge chunks of html, or doing heavy processing.

Keep code maintainable.

* Use the less css preprocessor to reduce and simplify code size.
* Use the twig html preprocessor to reduce and modularize code.

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

slides.json
===========

```js
{
  //The episode author, currently not displayed anywhere in the ui
  "author": "tim",
  
  //The episode title, displayed on the title slide, and on the top-nav summary
  "title": "Episode 1",

  //The episode sub title, displayed on the title slide, and on the top-nav summary
  "subtitle": "bible soap opera demo"  
  
  //an array of section objects
  //each section is displayed on the top-nav summary
  //the user will work through each section in the order listed
  "sections": [
    {
      //section type
      //allowed values are info||discuss||listen
      //section type alters the color of the slides in that section
      //section type also alters the icon used for that section in the top-nav summary
      "type": "info",
      
      //section title, displayed in the top-nav summary
      "title": "intro",
      
      //an array of slide object
      //these are all the slides in the section
      //the use will work through each slide in the order listed
      "slides": [          
        {
          //slide type
          //allowed slide types are title||html||pick||slider||sort||audio
          //title slide type will display the episode title and sub title
          "type": "title"
        },        
        {
          "type": "html",
          
          //html snippet to display on the slide
          "content": "<p>This is an experimental demo.</p><p>It has been developed with firefox, and is not tested on other browsers.</p><p>The UI is designed for a small screen (320x480) landscape. Press <code>ctrl-shift-m</code> in firefox to change your screen size.</p><p>Enjoy!</p>"
        },
        {
          "type": "pick",
          
          //question html string
          "question": "What is the answer?",
          
          //array of answer html strings
          "answers": [
            "answer 1",
            "answer 2",
            "answer 3"
          ]
        },
        {
          "type": "slider",
          
          //question html string          
          "question": "Do you like chocolate?",
          
          //answer at the left end of the slider
          "left": "yuck",
          
          //answer at the right end of the slider
          "right": "yum"
        }, 
        {
          "type": "sort",
          
          //question html string          
          "question": "Sort these from smallest to largest:",
          
          //array of answers
          "answers": [
            "mouse",
            "elephant",
            "grape",
            "pig"
          ]
        },
        {
          "type": "audio",
          
          //html string          
          "text": "audio drama, part 1",
          
          //the point to start playback in the mp3 file. In seconds.          
          "start": 0,
          
          //the point to stop playback in the mp3 file. In seconds.                
          "end": 60
        }
      ]
    }
  ]
}
```
