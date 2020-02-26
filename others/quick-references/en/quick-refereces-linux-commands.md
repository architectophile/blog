# Linux Commands

<br/>

## Disclaimer

This document describes common linux commands. The commands in this document may or may not be supported on some particular linux/unix operating systems. 
Please be aware that **not** all the options of the commands are described in this document. Only some major ones are introduced briefly. Therefore it is recommend that you look for other appropriate materials for further details.

<br/>

## 1. Special Characters

There are some useful things to know about the command line before you get started with the below. These aren't exactly commands but are used within commands.

* `/` is the root directory of your system. Its used in directory paths.
* `~` is your home directory.
* `\` will escape a character for you. For example whitespace, if you have a space in a directory name you will need to use this before the space. E.g. `Action\ Movies`
* `|` : `pipe(|)` concatenates two commands and feed the output of the previous command into the next command as an input.
* `&` : `(&)` background

<br/>

## 1. Filesystem

### ls

*Description:*

the `ls` command simply lists the current working directory structure. You will probably also want to know some of the `ls` option keys. The most useful I find are `-l`, '-a' and `-h` which do the following:

*Options:*

* `-a` : will show hidden files as well  
* `-l` : will show files in a list format 
* `-h` : will show the size of the files in human readable format.

*Examples:*

You can also view the structure of a different directory by stating the directory after your options. For example 

```shell
foo@bar:~$ ls -lah downloads/movies/
```

<br/>

### cd

No good doing anything on command line unless you can move about within the directory structure. `cd` will change directory. 

```shell
foo@bar:~$ cd downloads/movies/
```

<br/>

### pwd

The `pwd` command displays the name of the present working directory.

```shell
pwd
```

<br/>

### mkdir

Sticking with the directory theme, `mkdir` will make a directory. 

```shell
mkdir movies
``` 

<br/>

```shell
mkdir downloads/movies
``` 

will make a directory called movies in the downloads directory.

<br/>

### rmdir

<br/>

### rm

`rm` will remove your unwanted files or directories

```shell
rm index.html
```

will remove the index.html file in your current location. You may also need some of the flags for `rm`, namely `-f` and `-R`.

 * '-f' - will attempt to force the removal regardless of permissions and without prompting for confirmation
 * '-R' - will remove recursively, meaning it will remove a directory and its contents including other directories. 

```shell
rm -Rf /downloads/movies
```

will recursively remove the movies directory and all of its contents without prompting for confirmation. Now you will understand the jokes and/or scams trying to get you to run `rm -Rf /` on your system (dont run it). This will remove your entire directory structure given that `/` is your root directory. 

<br/>

### mv

This is another useful directory/file based command. `mv` will move something for you. 

```shell
mv index.html var/www/
```

will move the `index.html` file into your `var/www` directory. Another use of the `mv` command though is to also rename a file.

```shell
mv index.html index_old.html
```

will rename `index.html` to `index_old.html`.

<br/>

### cp

If you dont want to move something, but rather copy it then `cp` is the command you want. 

```shell
cp index.html var/www
```

will copy your `inde.html` file into the `var/www` directory. 

<br/>

### touch

<br/>

### cat

`cat` will print out the contents of a file to your screen. 

```shell
cat ~/.ssh/.id_rsa.pub
```

will print out your public SSH key to the screen. 

<br/>

### head

<br/>

### tail

<br/>

### chmod

Talking of permissions, there may come a time when you need to change these. `chmod` will change the permissions levels for the given file. Its too in depth to explain Linux permissions here, however I will give a brief overview.

Permissions on a Ubuntu (Linux) system are based on a numbering system. With 3 classes of user. The `owner`, the `group` and the `world`. The `owner` is the user than owns the file/directory. The `group` is the group of users that the directory belongs to and the `world` users are everyone else. 

There are then 3 levels of permissions, read (`r`), write (`w`) and execute (`x`). There are fairly self explainatory. Each of these permissions is given a point level and those points added together for each user and then concatenated give the file/directory its permission level. 

* 4 points for `r`
* 2 points for `w`
* 1 point for `x`

So take `index.php` for example. If I want `r`, `w` and `x` for the owner, `r` and `w` for the group and just `r` for everyone else my permissions would be as follows:

```
4 + 2 + 1 = 7 # owner
4 + 2 = 6 # group
4 = 4 # world
```

Concatenate those numbers together you get `764` so running

```shell
chmod 764 index.php
```

will give those permissions for those users for the index.php file.

Another useful note here is the `-R` command is used for recursion through directories. 

<br/>

### chown

This will chnage the owner of the file / directory.

```shell
chown jason app/
```

This will make jason the owner of the app directory. 

<br/>

### chgrp

This will change the group of the file / directory.

```shell
chgrp www-data app/
``` 

This will change the `app` directory group to www-data

<br/>

### ssh

ssh denotes the secure shell. Connect to another computer using an encrypted network connection. For more details see SSH (secure shell)

<br/>

### scp

The scp command copies a file from one computer to another using ssh. For more details see SCP (secure copy)

<br/>

### sudo

When it comes to installing things on your system, its likely you will need to be a root user. Or at least have root level permissions for the system. `sudo` will ensure you are running your commands with those privileges. This will in most cases then ask for your password. 

```shell
sudo apt-get install nginx
```

<br/>

### dd
The dd command copies a file converting the file as specified. It is often used to copy an entire disk to a single file or back again. So, for example, dd if=/dev/sdd of=backup.img will create a backup image from an SD card or USB disk drive at /dev/sdd. Make sure to use the correct drive when copying an image to the SD card as it can overwrite the entire disk.

<br/>

### df

You probably wont need this one if you are just running a basic website or something on your server. However it can become quite useful if you have multiple sites or a small disk. `df` will tell you how much space is being used and how much is free on your disk. Similar to the `ls` command above, you will likely want the `-h` flag for humanly readable. 

```shell
df -h
```

<br/>

### unzip

The unzip command extracts the files from a compressed zip file.

<br/>

### tar

Use tar to store or extract files from a tape archive file. It can also reduce the space required by compressing the file similar to a zip file.

To create a compressed file, use tar -cvzf *filename.tar.gz* *directory/* To extract the contents of a file, use tar -xvzf *filename.tar.gz*

<br/>

### wget

Download a file from the web directly to the computer with wget. So wget https://www.raspberrypi.org/documentation/linux/usage/commands.md will download this file to your computer as commands.md

curl
Use curl to download or upload a file to/from a server. By default, it will output the file contents of the file to the screen.

man
Show the manual page for a file with man. To find out more, run man man to view the manual page of the man command.

<br/>

### curl

Use curl to download or upload a file to/from a server. By default, it will output the file contents of the file to the screen.

<br/>

### wget

Download a file from the web directly to the computer with wget. So wget https://www.raspberrypi.org/documentation/linux/usage/commands.md will download this file to your computer as commands.md

This is used to get the contents of a url. It has many uses, i mainly use it for 2 specific reasons. Either I simply want to download the contents or I want to run the script that is at that location. 

```shell
wget http://example.com/file.iso
```

this will download the iso from that location.

```shell
wget http://example.com/sendNotification.php
```

this will run the `sendNotification.php` script. Which could be run on say a cron job. 

<br/>

### apt-get

`apt-get` is a essential tool on a Ubuntu server. There are three parts to it, `install`, `remove` and `update`. This is what you will use to install all your packages like Nginx or MySQL. 

```shell
apt-get update
```

this will update the list of repositories in the apt get lists so you are install the most up-to-date stable releases. 

```shell
apt-get install nginx
```

this will install the `nginx` package.

```shell
apt-get remove nginx
```

this will remove the `nginx` package. 

<br/>

### man
Show the manual page for a file with man. To find out more, run man man to view the manual page of the man command.

<br/>

## 2. Search

### grep

Use grep to search inside files for certain search patterns. For example, grep "search" *.txt will look in all the files in the current directory ending with .txt for the string search.

The grep command supports regular expressions which allows special letter combinations to be included in the search.

<br/>

### awk
awk is a programming language useful for searching and manipulating text files.

find
The find command searches a directory and subdirectories for files matching certain patterns.

<br/>

### whereis

Use whereis to find the location of a command. It looks through standard program locations until it finds the requested command.

<br/>

## 3. User/Group Management

### adduser

Not much good chnaging permissions for users if you dont have any. The `adduser` command will do just that. Some people like to user `useradd` which technically does the same thing, but `adduser` will guide you through adding the user with passwords, names etc and create the home directory for you. `useradd` wont, you will need to do that manually.  

```shell
adduser jason
```

<br/>

### usermod

You will need this one to add an existing user to a group. 

```shell
user mod www-data jason
```

this will add the user jason to the group www-data.

<br/>

### deluser

This unsurprisingly will remove a user.

```shell
deluser jason
```

Will remove the user jason from the system. 

<br/>



## 4. Networking

<br/>

### ping

The ping utility is usually used to check if communication can be made with another host. It can be used with default settings by just specifying a hostname (e.g. ping raspberrypi.org) or an IP address (e.g. ping 8.8.8.8). It can specify the number of packets to send with the -c flag.

<br/>

### nmap

nmap is a network exploration and scanning tool. It can return port and OS information about a host or a range of hosts. Running just nmap will display the options available as well as example usage.

<br/>

### hostname

The hostname command displays the current hostname of the system. A privileged (super) user can set the hostname to a new one by supplying it as an argument (e.g. hostname new-host).

<br/>

### ifconfig

Use ifconfig to display the network configuration details for the interfaces on the current system when run without any arguments (i.e. ifconfig). By supplying the command with the name of an interface (e.g. eth0 or lo) you can then alter the configuration: check the manual page for more details.

<br/>

## 5. Process Management

<br/>

### top

`top` will bring up a screen with your currently running process, how much memory and CPU they are using among other things. This can be useful if you are having issues and need to diagnose some problems like memory leaks. 

<br/>

### restart

Moving on from directories now we have `restart` which I personally normally use in conjunction with `service`. The `restart` command will restart your system. Used with `service` it will just restart a service. Taking Nginx for example

```shell
service nginx restart
```

will restart the `nginx` service. You will need that one a lot when you are configuring Nginx

<br/>

### reload

However, sometimes you don't want to restart a service. Maybe you just want to reload the config. 

```shell
service nginx reload
```

will do just that. The difference being that `reload` will continue the service running, a `restart` will stop the service, then start the service again. Giving a momentary downtime. 

<br/>

---

### References

[1] *Raspberry Pi. (?). [Linux commands](https://www.raspberrypi.org/documentation/linux/usage/commands.md) [Web Document]*
