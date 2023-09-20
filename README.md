# LAMP_Stack
Small project for COP4331 with McAlpin

# Cloning the Project and Setting Up Locally
Click `Code` in the top right of the repo and select `HTTPS` or `SSH` depending on your setup.  Copy the link and then in your terminal type in `git clone <paste what you copied>`.  This will clone the project locally to your machine.

# Pushing Updates to Github
To save your changes and push them to github type the following in your terminal:  
If you haven't made a branch yet do: `git checkout -b <name of branch>`  

`git add .`  
`git commit -m "Message saying what you did"`  
`git push -u origin <branch you're pushing to>`  

# Pushing Updates to the DigitalOcean Droplet
First ssh into the droplet: `ssh root@104.131.2.162` and enter the password we made  
Then run this command: `cd /var/www/spl-16/LAMP_Stack`  
To switch to your changes on the droplet type in `git switch <your branch>`

# Navigating to the Droplet in your Browser
The droplet can be found <a href="http://www.spl-16.xyz" target="_blank">here</a>.

# Local Development
## Project Management (Shaoyan)
Tasks and issues that need to be completed will be tracked through Github issues.

## Frontend (Stephen/Colby)
Using VSCode open the project and right click on the html file you're editing.  Select `Copy Path` and paste it into your browser.  This will bring up the html page you're editing in your browser.  Any updates you make to the javascript or html page, just refresh the browser and they'll update.

## Backend (Eddy/Colby/Hyrum)
As of now, we can only test backend on the DigitalOcean droplet.  See 'Pushing Updates to the DigitalOcean Project' for how to get your changes onto the droplet.