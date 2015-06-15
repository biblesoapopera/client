demo
====

[![Build Status](https://travis-ci.org/biblesoapopera/demo.svg?branch=master)](http://travis-ci.org/biblesoapopera/demo)

This is an experimental user interface for the bible soap opera project (http://biblesoapopera.com/).

To view the user interface go to http://biblesoapopera.github.com/demo.

Further docs in the `docs` directory.

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

Point your browser to `http://localhost:8080`. You should see the demo.

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
