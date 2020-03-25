# [Git] 사용자 계정 삭제하고 다시 추가하기(on macOS)

<br/>

## 1. 서론

`Github` 계정을 새로 만들었을 경우, 새로 만든 계정으로 스위치해서 `git commit`, `git push` 명령을 실행해야 한다. 하지만 기존의 계정 정보(credentials)가 로컬 머신에 저장되어 있기 때문에 `git` 명령을 실행하면 예전 사용하던 계정으로 이벤트가 기록된다.

그러므로 이전 계정의 정보(credentials)을 삭제하고 새로운 계정을 추가해야 하는데, 단순히 `git config --global user.name`과 `git config --global user.email`을 수정하는 것만으로는 계정이 스위치되지 않는다.

`macOS`에서는 git의 계정 정보(credentials)가 `KeyChain` 툴에 저장되는데, 따라서 새로운 계정으로 변경하기 위해서는 `KeyChain` 안에 저장된 계정 정보를 삭제한 뒤, 새로운 계정을 등록해야 한다. 

이번 포스트에서는 `macOS`에서 어떻게 git 계정을 변경하는지 알아보도록 하자.

<br/>

## 2. Git 계정 변경 방법

### 1) KeyChain Access 실행

`KeyChain Access` 툴을 실행하고 `github.com`으로 검색을 해보면 다음과 같이 기존에 저장된 계정 정보를 확인할 수 있다.

<img src="https://github.com/architectophile/blog/blob/master/devops/git/issue-resolution/images/git-issue-resolution-delete-account-on-mac-2.1.1.png?raw=true" alt="drawing" width="648"/>

<br/>

<img src="https://github.com/architectophile/blog/blob/master/devops/git/issue-resolution/images/git-issue-resolution-delete-account-on-mac-2.1.2.png?raw=true" alt="drawing" width="648"/>

<br/>

### 2) 계정 정보 삭제

다음 명령을 실행하여 기존에 등록된 git 계정의 정보(credentials)를 삭제한다.

```shell
$ git credential-osxkeychain erase
host=github.com
protocol=https
```
> ***Note:***  
위의 명령이 성공적으로 수행되면 아무런 메시지도 출력되지 않는다.

그리고 다시 `KeyChain Access` 툴로 가보면 이전에 등록되어 있던 계정 정보가 삭제된 것을 확인할 수 있다.

<img src="https://github.com/architectophile/blog/blob/master/devops/git/issue-resolution/images/git-issue-resolution-delete-account-on-mac-2.2.1.png?raw=true" alt="drawing" width="648"/>

<br/>

### 3) 유저네임 및 이메일 변경

다음의 명령을 실행하여 유저네임과 이메일을 변경한다.

```shell
$ git config --global user.name "githubusername"
$ git config --global user.email "githubaccount@email.com"
```

> ***Note:***  
이 때 `user.email`에는 반드시 ***Github 계정의 이메일 주소를 입력해야*** 나중에 `Github` 리포지토리에서 contributor로서 트랙킹하는 것이 가능하다.

<br/>

### 4) 새로운 계정으로 git push

이제 새로 등록된 계정으로 `git commit`과 `git push` 명령을 실행한다. 그러면 다음과 같이 새로 등록할 Github 계정의 아이디와 비밀번호를 입력하는 과정이 나타난다.

<img src="https://github.com/architectophile/blog/blob/master/devops/git/issue-resolution/images/git-issue-resolution-delete-account-on-mac-2.4.1.png?raw=true" alt="drawing" width="648"/>

<br/>
<br/>

그리고 새로운 계정으로 `git push`가 완료된 후, 다시 `KeyChain Access` 툴에 가보면 ***새로운 계정 정보가 등록된*** 것을 확인할 수 있다.

<img src="https://github.com/architectophile/blog/blob/master/devops/git/issue-resolution/images/git-issue-resolution-delete-account-on-mac-2.4.2.png?raw=true" alt="drawing" width="648"/>

<br/>

<br/>

---

### References

\[1\] *Github. (?). [Updating credentials from the OSX Keychain](https://help.github.com/en/github/using-git/updating-credentials-from-the-osx-keychain) [Web Documentation]*

<br/>

---

### Hashtags

`#깃` `#깃헙` `#깃허브` `#깃 계정` `#깃 계정 변경` `#깃헙 계정` `#깃헙 키체인` `#깃헙 키체인 삭제` `#Git` `#Github` `#git account` `#git account delete` `#git account switch` `#git account change` `#git user change` `#git user switch` `#how to change git user` `#how to switch git user` `#how to switch git account` `#how to remove git credentials on macOS` `#KeyChain Access` `#git keychain` `#github keychain`

<br/>

<br/>

© 2020, Byeongcheol Yoo. All rights reserved.
