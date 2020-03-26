# How To Record Internal Audio with QuickTime Player Screen Recording on macOS

<br/>

## 1. Introduction

When you use `QuickTime Player` for `Screen Recording`, you might expect it to record `internal audio` together at the same time. But it doesn't record internal audio automatically by default while it records your screen. It actually records only your voice through the microphone on your machine. 

If you want it to record internal audio as well, you need to set some special configurations. So in this post, I'm going to show you how to configure the settings on macOS to make `QuickTime Player` record screen alongside internal audio at the same time. 

First, we are going to install `Soundflower` for audio source manipulation, add some sound input/output devices at `Audio Midi Setup`, and then change `Sound` settings to apply the configuration to `QuickTime Player`. So, let's see how to do it step by step.

<br/>

## 2. Soundflower Installation

`Soundflower` is a OS X system extension that allows applications to pass audio to other applications. So we are going to use it to pass our `internal audio` to `QuickTime Player`.

### 1) Go to the link below and download the Soundflower installer  
https://www.macupdate.com/app/mac/14067/soundflower

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-2.1.1.png?raw=true" alt="drawing" width="720"/>

<br/>

### 2) Open the installation package

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-2.2.1.png?raw=true" alt="drawing" width="720"/>

<br/>

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-2.2.2.png?raw=true" alt="drawing" width="720"/>

<br/>

When you try to open the package, you might encounter a security warning that states ***\"Soundflower.pkg" can't be opened because it is from an unidentified developer.***

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-2.2.3.png?raw=true" alt="drawing" width="480"/>

<br/>

In this case, you need to `right-click` the package and go to `Open With > Installer (default)`.

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-2.2.4.png?raw=true" alt="drawing" width="320"/>

<br/>

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-2.2.5.png?raw=true" alt="drawing" width="240"/>

<br/>

Then, you will be prompted to allow it to open the package. And click on the `Open` button.

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-2.2.6.png?raw=true" alt="drawing" width="480"/>

<br/>

### 3) Install Soundflower

Click on the `Continue` button to start the installation.

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-2.3.1.png?raw=true" alt="drawing" width="720"/>

<br/>

Click on the `Install` button to finish the installation.

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-2.3.2.png?raw=true" alt="drawing" width="720"/>

<br/>

### 4) Unblock installing the package(if the installation is failed)

***If the installation is failed,*** you will see the error message that states ***A program tried to load new system extension(s) signed by "MATT INGALLS".*** It blocked the installation because the signer(MAT INGALLS) of the program is unknown to the system. So, we are going to see how to resolve this issue.  
(But if the installation is ***succeeded***, you can ***just skip*** this step and ***go to step 5).***)

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-2.4.1.png?raw=true" alt="drawing" width="720"/>

<br/>

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-2.4.2.png?raw=true" alt="drawing" width="480"/>

<br/>

Open `Security & Privacy` settings.

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-2.4.3.png?raw=true" alt="drawing" width="720"/>

<br/>

Click the lock to make changes and authenticate yourself to allow it.

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-2.4.4.png?raw=true" alt="drawing" width="720"/>

<br/>

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-2.4.5.png?raw=true" alt="drawing" width="720"/>

<br/>

Click on the `Allow` button.

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-2.4.6.png?raw=true" alt="drawing" width="720"/>

<br/>

Select `MATT INGALLS` and click on the `OK` button.

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-2.4.7.png?raw=true" alt="drawing" width="720"/>

<br/>

Now you need to restart the installation.

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-2.4.8.png?raw=true" alt="drawing" width="720"/>

<br/>

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-2.4.9.png?raw=true" alt="drawing" width="720"/>

<br/>

You will be prompted to authenticate yourself to allow it to continue the installation.

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-2.4.10.png?raw=true" alt="drawing" width="480"/>

<br/>

It will be installed successfully this time.

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-2.4.11.png?raw=true" alt="drawing" width="720"/>

<br/>

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-2.4.12.png?raw=true" alt="drawing" width="720"/>

<br/>

### 5) Check that Soundflower is installed properly

Go to `Sound` settings. And check that you have Soundflower(2ch) and Soundflower(64ch) devices installed.

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-2.5.1.png?raw=true" alt="drawing" width="720"/>

<br/>

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-2.5.2.png?raw=true" alt="drawing" width="720"/>

<br/>

## 3. Audio Midi Setup

You have installed `Soundflower` extension on your system. Now we are going to configure sound input/output devices at `Audio Midi Setup` to deliver internal audio to `QuickTime Player` appropriately.

### 1) Open Audio Midi Setup

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-3.1.1.png?raw=true" alt="drawing" width="720"/>

<br/>

### 2) Create Aggregate Device

On Audio Midi Setup, click on the `+` button at the left bottom corner. And select `Create Aggregate Device`.

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-3.2.1.png?raw=true" alt="drawing" width="720"/>

<br/>

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-3.2.2.png?raw=true" alt="drawing" width="320"/>

<br/>

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-3.2.3.png?raw=true" alt="drawing" width="720"/>

<br/>

Rename the device to `QuickTime Player Input`. And select `Soundflower (2ch)` in the checkbox on the Audio Device list.

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-3.2.4.png?raw=true" alt="drawing" width="720"/>

<br/>

### 3) Create Multi-Output Device

Click on the `+` button at the left bottom corner. And select `Create Multi-Output Device`.

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-3.3.1.png?raw=true" alt="drawing" width="720"/>

<br/>

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-3.3.2.png?raw=true" alt="drawing" width="320"/>

<br/>

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-3.3.3.png?raw=true" alt="drawing" width="720"/>

<br/>

Rename the device to `Screen Record w/ Audio`. And select `Soundflower (2ch)` in the checkbox on the Audio Device list. And then set Master Device to `Built-in Output`.

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-3.3.4.png?raw=true" alt="drawing" width="720"/>

<br/>

## 4. Sound Settings

You have created and configured audio input/output devices, and make them able to pass audio input/output to other applications using Soundflower. And now we are going to change settings in `Sound`.

### 1) Change Output device

Open `Sound` settings and change `Output` device to `Screen Record w/Audio`.

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-3.4.1.png?raw=true" alt="drawing" width="720"/>

<br/>

## 5. QuickTime Player Settings

### 1) Change options

Open `QuickTime Player`, and select `New Screen Recording`. And on the overlay window, select `Options > Microphone > QuickTime Player Input`. 

<img src="../images/computer-tips-quicktime-player-screen-record-with-audio-on-mac-3.5.1.png?raw=true" alt="drawing" width="720"/>

<br/>

All the necessary settings are done. Now you are ready to start `recording your screen` along with `internal audio` concurrently using `QuickTime Player`.

Just get started recording right now and enjoy your videos! :satisfied:

<br/>

<br/>

---

### References

\[1\] *Tario Productions. (2018, Sep 16). [How To Record Internal Audio with QuickTime Player Screen Recording on macOS](https://www.youtube.com/watch?v=dNYZOaf3Gvs) [Youtube]*

<br/>

---

### Hashtags

`#QuickTime Player` `#how to record internal audio on macOS` `#QuickTime Player Screen Recording` `#QuickTime Player internal audio` `#QuickTime Player internal audio recording` `#how to record screen with internal audio on mac` `#MacBook QuickTime Player` `#Soundflower` `#QuickTime Player with Soundflower` `#How to record internal audio with QuickTime Player` `#how to open mac terminal` `#Screen Recording on macOS`

<br/>

<br/>

© 2020, Byeongcheol Yoo. All rights reserved.


