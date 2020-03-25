# 맥(macOS)에서 키보드 단축키로 앱 여는 법

<br/>

## 1. 서론

컴퓨터에서 다양한 작업을 하다보면 자주 사용하는 기능이나 앱을 키보드 단축키로 설정해놓으면 매우 편리하다. 맥(macOS)에서는 터미널(Terminal), 파인더(Finder), 또는 크롬 브라우저(Google Chrome) 등을 자주 사용하는데, 자주 쓰는 앱을 실행할 때마다 `Spotlight Search` 또는 `Launchpad`를 사용하는 것을 매우 번거로운 일이다.

따라서 이번 포스트에서는 `맥(macOS)`에서 `키보드 단축키(Keyboard Shortcuts)`를 설정하여 ***빠르고 편리하게 앱을 열 수 있는 방법에 대해서 알아보도록 하겠다.*** 이를 위해서 우리는 맥에서 기본적으로 제공하는 `오토메이터(Automator)` 툴을 사용하도록 할 것이다.

<br/>

## 2. 단축키 설정 방법

### 1) Automator 설정

(1) 메뉴바에서 돋보기 모양의 아이콘을 클릭하거나 또는 단축키 `Command + Space`를 입력하여 `Spotlight Search`를 연다. 그리고 "Automator" 또는 "오토메이터"를 입력하여 실행한다(또는 `런치패드(Launchpad)`를 사용하여 오토메이터(Automator)를 실행한다.)

<img src="https://github.com/architectophile/blog/blob/master/others/computer-tips/images/computer-tips-set-keyboard-shortcut-to-open-app-on-mac-2.1.1.png?raw=true" alt="drawing" width="480"/>

<br/>

(2) Automator 앱을 실행하면 다음과 같이 새로운 작업을 만드는 창이 뜨는데 여기서 `Quick Action`을 선택한다(만약 새로운 작업 생성 창이 나타나지 않을 경우에는 `File > New`를 선택한다).

<img src="https://github.com/architectophile/blog/blob/master/others/computer-tips/images/computer-tips-set-keyboard-shortcut-to-open-app-on-mac-2.1.2.png?raw=true" alt="drawing" width="648"/>

<br/>

(3) `Workflow receives current` 항목에서 `no input`을 선택한다.

<img src="https://github.com/architectophile/blog/blob/master/others/computer-tips/images/computer-tips-set-keyboard-shortcut-to-open-app-on-mac-2.1.3.1.png?raw=true" alt="drawing" width="648"/>

<br/>

<img src="https://github.com/architectophile/blog/blob/master/others/computer-tips/images/computer-tips-set-keyboard-shortcut-to-open-app-on-mac-2.1.3.2.png?raw=true" alt="drawing" width="240"/>

<br/>

(4) 왼쪽에 보이는 Actions 리스트 중에서 `Launch Application`을 선택하고 오른쪽 방향으로 ***드래그(drag)하여*** 워크플로우에 추가한다.

<img src="https://github.com/architectophile/blog/blob/master/others/computer-tips/images/computer-tips-set-keyboard-shortcut-to-open-app-on-mac-2.1.4.1.png?raw=true" alt="drawing" width="648"/>

<br/>

<img src="https://github.com/architectophile/blog/blob/master/others/computer-tips/images/computer-tips-set-keyboard-shortcut-to-open-app-on-mac-2.1.4.2.png?raw=true" alt="drawing" width="648"/>

<br/>

(5) 단축키를 이용해 실행할 어플리케이션을 찾아서 선택한다. 이 예제에서는 `터미널(Terminal)` 프로그램을 선택하였다.

<img src="https://github.com/architectophile/blog/blob/master/others/computer-tips/images/computer-tips-set-keyboard-shortcut-to-open-app-on-mac-2.1.5.1.png?raw=true" alt="drawing" width="648"/>

<br/>

<img src="https://github.com/architectophile/blog/blob/master/others/computer-tips/images/computer-tips-set-keyboard-shortcut-to-open-app-on-mac-2.1.5.2.png?raw=true" alt="drawing" width="648"/>

<br/>

<img src="https://github.com/architectophile/blog/blob/master/others/computer-tips/images/computer-tips-set-keyboard-shortcut-to-open-app-on-mac-2.1.5.3.png?raw=true" alt="drawing" width="648"/>

<br/>

(6) 메뉴바에서 `File > Save`를 선택하고, 추가할 ***작업의 이름을 작성하고 저장한다.***

<img src="https://github.com/architectophile/blog/blob/master/others/computer-tips/images/computer-tips-set-keyboard-shortcut-to-open-app-on-mac-2.1.6.1.png?raw=true" alt="drawing" width="240"/>

<br/>

<img src="https://github.com/architectophile/blog/blob/master/others/computer-tips/images/computer-tips-set-keyboard-shortcut-to-open-app-on-mac-2.1.6.2.png?raw=true" alt="drawing" width="648"/>

<br/>

### 2) 키보드 단축키(keyboard shortcut) 설정

(1) 맥의 시스템 설정(System Preferences)을 연다.

<img src="https://github.com/architectophile/blog/blob/master/others/computer-tips/images/computer-tips-set-keyboard-shortcut-to-open-app-on-mac-2.2.1.png?raw=true" alt="drawing" width="240"/>

<br/>

(2) `키보드(Keyboard)`를 클릭하고 `shrotcut` 탭을 선택한다.

<img src="https://github.com/architectophile/blog/blob/master/others/computer-tips/images/computer-tips-set-keyboard-shortcut-to-open-app-on-mac-2.2.2.1.png?raw=true" alt="drawing" width="648"/>

<br/>

<img src="https://github.com/architectophile/blog/blob/master/others/computer-tips/images/computer-tips-set-keyboard-shortcut-to-open-app-on-mac-2.2.2.2.png?raw=true" alt="drawing" width="648"/>

<br/>

(3) 왼쪽에 메뉴에 있는 `Services`를 선택하고, 방금 우리가 추가한 작업을 선택한다.

<img src="https://github.com/architectophile/blog/blob/master/others/computer-tips/images/computer-tips-set-keyboard-shortcut-to-open-app-on-mac-2.2.3.1.png?raw=true" alt="drawing" width="648"/>

<br/>

<img src="https://github.com/architectophile/blog/blob/master/others/computer-tips/images/computer-tips-set-keyboard-shortcut-to-open-app-on-mac-2.2.3.2.png?raw=true" alt="drawing" width="648"/>

<br/>

(4) `Add Shortcut` 버튼을 클릭하고, 원하는 단축키 조합을 입력하여 설정한다.

<img src="https://github.com/architectophile/blog/blob/master/others/computer-tips/images/computer-tips-set-keyboard-shortcut-to-open-app-on-mac-2.2.4.1.png?raw=true" alt="drawing" width="648"/>

<br/>

<img src="https://github.com/architectophile/blog/blob/master/others/computer-tips/images/computer-tips-set-keyboard-shortcut-to-open-app-on-mac-2.2.4.2.png?raw=true" alt="drawing" width="648"/>

<br/>

### 3) 단축키 동작 확인

(1) 앞서 설정한 단축키 조합을 입력하여 해당 어플리케이션이 실행되는 것을 확인한다.

<img src="https://github.com/architectophile/blog/blob/master/others/computer-tips/images/computer-tips-set-keyboard-shortcut-to-open-app-on-mac-2.3.1.1.png?raw=true" alt="drawing" width="648"/>

<br/>

> ***Note:***  
만약 지정한 단축키를 입력해도 ***앱이 실행되지 않을 경우*** 바탕화면을 선택한 후, 메뉴바에서 `Finder > Services`를 한 번 클릭한 후 다시 바탕화면을 선택한 다음, 단축키를 입력하면 앱이 실행될 것이다. 이것은 ***맥의 키보드 단축키 설정 버그로서*** 현재 `macOS 10.15 Beta` 버전을 기준으로 아직까지 버그가 수정되지 않은 것으로 보인다.

<img src="https://github.com/architectophile/blog/blob/master/others/computer-tips/images/computer-tips-set-keyboard-shortcut-to-open-app-on-mac-2.3.1.2.png?raw=true" alt="drawing" width="240"/>

<br/>

<br/>

---

### References

\[1\] *wikiHow Staff. (2017, Sep 11). [How to Set a Keyboard Shortcut to Open Mac Apps](https://www.wikihow.com/Set-a-Keyboard-Shortcut-to-Open-Mac-Apps) [wikiHow]*

<br/>

---

### Hashtags

`#맥북` `#맥` `#맥북 단축키` `#맥 단축키` `#맥북 터미널 단축키` `#맥 터미널 단축키` `#맥북 단축키 설정` `#macOS` `#mac shortcut` `#MacBook terminal keyboard shortcut` `#macOS shortcut` `#how to set a keyboard shortcut to open an app` `#macOS terminal shortcut`

<br/>

<br/>

© 2020, Byeongcheol Yoo. All rights reserved.
