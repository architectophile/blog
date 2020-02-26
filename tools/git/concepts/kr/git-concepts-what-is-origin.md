# Git에서 'origin'이 의미하는 것은?

## 1. 서론

Git에서 ***'origin'***은 해당 프로젝트가 원래 클론되었던 리모트 리포지토리(remote repository)를 의미하는 줄임이다. 

더욱 정확하게는, origin은 실제 ***해당 리모트 리포지토리의 URL 대신***에 사용되는 것이다.

그리고 origin은 절대적인 것은 아니고 관습적으로 통용되는 표준이다. 따라서 이 관습을 따르는 것이 일반적이기는 하지만 원한다면 언제든지 원하는 대로 이름을 재정의할 수 있다.

<br/>

## 2. 예제

다음과 같이 어떤 리포를 클론할 때 뒤에 붙는 ***URL 주소***가 바로 클론된 로컬 리포의 입장에서 'origin'이 된다.

```console
git clone https://github.com/my-username/my-awesome-project.git
```

<br/>

---

### References

[1] *TOWER. (?). [What is the origin in Git?](https://www.git-tower.com/learn/git/glossary/origin) [Web Document]*