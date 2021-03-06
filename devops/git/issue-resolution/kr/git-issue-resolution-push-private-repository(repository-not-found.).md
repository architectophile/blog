# [Git] 프라이빗 리포지토리 푸쉬 오류 해결 방법

## 1. 서론

기존에 작업하던 리포지토리를 깃헙에 새로 생성한 ***프라이빗 리포지토리(private repository)***로 옮기기 위해 푸쉬하려고 할 때 다음과 같이 ***\"Repository not found.\"***라는 메시지와 함께 오류가 발생할 수 있다.

```
remote: Repository not found.
fatal: repository 'https://github.com/my-username/my-project.git/' not found
```

원인은 여러가지가 있을 수 있겠으나 나의 경우에는, 내가 새로 옮기려고 하는 프라이빗 리포지토리가 새로 만든 깃헙 계정이기 때문에 발생한 것으로 보였다. 아마도 ***나의 로컬 머신에 저장되어 있는 기존에 사용하던 깃헙 계정 정보가 옮기려고 하는 새로운 프라이빗 리포의 계정과 달라서*** 발생하는 문제인 것 같았다.

<br/>

## 2. 해결 방법

1) 만약 이미 리모트 리포지토리를 등록한 상태라면 우선 해당 리모트 리포지토리를 삭제해준다.

```console
& git remote remove origin
```

2) 그리고 리모트 리포지토리를 다시 등록하는데, 이 때 중요한 것은 다음과 같이 깃헙의 프라이빗 리포의 URL주소 앞에 당신의 ***유저네임@***를 추가해준다.

```console
$ git remote add origin https://my-username@github.com/my-username/dev-env-setup.git
```

3) 새로운 프라이빗 리포지토리에 푸쉬해준다.

```console
$ git push -u origin master
```

<br/>

<br/>

---

### References

\[1\] *StackOverflow. (2013). [Git Push ERROR: Repository not found](https://stackoverflow.com/questions/10116373/git-push-error-repository-not-found) [StackOverflow Answer]*

<br/>

---

### Hashtags

`#깃` `#깃헙` `#깃 프라이빗` `#깃헙 프라이빗` `#깃 에러` `#깃헙 에러` `#깃 프라이빗 리포` `#프라이빗 리포 에러` `#깃헙 프라이빗 리포` `#프라이빗 리포 오류` `#Git` `#Github` `#git error` `#Repository not found` `#git Repository not found` `#git error: Repository not found` `#git private Repository not found` `#git private` `#git private repository` `#github private` `#github private repository` `#git private repo` `#github private repo` `#git push` `#git push error` `#git push origin master` `#git push private repo` `#git push origin`

<br/>

<br/>

© 2020, Byeongcheol Yoo. All rights reserved.
