**Mera Paisa**
=====


----------


a money logging app for PECFest
-------------------------------


----------


## Installation ##
    git clone https://github.com/rhnvrm/merapaisa.git

You will need to install meteorjs for this to run locally.


    curl https://install.meteor.com | /bin/sh

After installing run this 

    cd merapaisa
    meteor run

Deploy yourself 

            meteor deploy fork-of-merapaisa.meteor.com


----------

Walkthrough
-----------

 - Start by registering with facebook, twitter or google.
 - You will now see a screen like this:
![image alt][1]
**Let us start from the top.** 
 - You can logout by clicking the link to your name in navbar. 
 - Logo of app
 - Your Avatar, Your Name, Your Current Account Balance
 - A form where you can simple enter name of new account, enter the credit or debt, their avatar image, date(default=today)
 - option to see only this weeks, this months or all the data. 
 - List of all your friends accounts
 - A form which can change the credit or debt of the account. Note you can change from CR to DR by clicking it.
 - ![List item][2]

The app syncs to all your devices in real time. You can select the account whose money you want to change and press Go.

![image alt][3]

 


  [1]: https://github.com/rhnvrm/merapaisa/raw/master/screenshot/demo%201.png
  [2]: https://raw.githubusercontent.com/rhnvrm/merapaisa/master/screenshot/demo%203%20cr%20dr.png
  [3]: https://raw.githubusercontent.com/rhnvrm/merapaisa/master/screenshot/demo%202%20syncs%20across%20devices.png
