## design.byForm v1.0.0

design.byform is the portfolio of Dan Flynn, a freelance designer, developer and creative director, working out of Melbourne, Australia. Built with Craft CMS 3.

## Structure

All the front-end assets are in ```/src``` and then compiled into the ```web/assets/``` folders.

## Install

This assumes you have MAMP Pro and Sequel Pro installed, after you have forked the repo you will need to point the MAMP to this directory, then start yo server. Hopefully this works 🤷‍.


1. Fork the repository, then ```cd``` into the project directory on your local
````
cd your/project/directory
````
2. Once in the directory, pull down your forked repo

````
git clone --recursive https://github.com/studiolathe/form.git
````
3. Duplicate ```.env.example``` and rename it to ```.env```, then create a local database that uses setting from:
````
config/general.php
````
4. Install dependencies. (Make sure you have Yarn installed ```yarn```)
````
yarn install
````
5. Start building
````
yarn run dev
````

## Using Git
1. After forking, always create a new working branch. (Don't forget this, never work in the master branch)
````
git checkout -b <branch-name>
````
2. Add changes after working on files
````
git add .
````
3. Commit changes to the branch
````
git commit -m 'Your commit message goes here'
````
4. Switch back to master branch
````
git checkout master
````
5. Then push working branch to master
````
git push origin <branch-name>
````
# form
