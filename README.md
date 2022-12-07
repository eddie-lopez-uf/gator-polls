# Gator Polls

Welcome to Gator Polls! The web application dedicated to giving power to the people by allowing them to post and vote about issues they care about.

## Setup

> **NOTE:** If you don't have a zip file of this project, ignore

If you are running from a zip file of the project:

1. Extract contents into directory
2. Open terminal in that directory
3. Run `npm install`
4. Run `npm start`

The project should open in new window.

### Installing `npm` (if applicable)

To completely setup the required environment you need to run for Gator Polls, you must first ensure that you have Node downloaded in your computer. You can download Node [here](https://nodejs.org/en/download/).

To ensure that Node has correctly installed, you should test it by running the following command on any terminal:

> this command should give you a list of instructions on how to use the Node Package Manager CLI
```cmd
npm -help
```

### Installing `git` (if applicable)

The next step you want for your setup is ensuring that you have Git installed in your computer. If you don't, you can download it [here](https://git-scm.com/download/win). 

To ensure that you have Git setup correctly, you should test it by running the following command on any terminal:

> this command should give you a list of instructions on how to use the Git CLI
```cmd
git --help
```

### Cloning Repo

To clone the repo, you're going to want to go to a directory of your chosing, open a terminal in that directory, and clone it from github using the following command:

> this command will trigger the clonging from the remote repository, once done, it should create a new folder in that directory called `gator-polls`
```cmd
git clone https://github.com/eddie-lopez-uf/gator-polls.git
```

### Installing dependencies

Once the directory is created, you are going to want to enter the project with:

```cmd
cd gator-polls
```

And install the dependencies using:

```cmd:
npm i
```

After that is done, you will finally be all set for the final step of the process.

### Getting environment

The `.env` file is critical for the success of running the project. Without it, we cannot connect to the database, and you will likely get a lot of strange errors. To get the environment please contact a contributor of the project.

Once you have the `.env` file, you can copy it to the root of the project, without changing it's name.

### Starting the project!

You're in the final stretch! Once you have ensured that you have followed all the steps preceding this one, you can finally run the project using:

```cmd
npm start
```

This will compile and build all the code and deploy it to `localhost:3000` in your computer. It should automatically open a browser window so that you can see the project. From then on, all you have to do is create an account and start using Gator Polls!
