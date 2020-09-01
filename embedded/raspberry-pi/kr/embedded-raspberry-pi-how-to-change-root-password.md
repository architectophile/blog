# [Raspberry Pi] 패스워드 변경 방법

<br/>

## 1. 서론

이번 포스트에서는 `라즈베리파이(Raspberry Pi)`의 기본(`default`) `패스워드(passwd)`를 잊어버렸을 경우 `패스워드`를 새롭게 변경하는 방법에 대해서 알아볼 것이다.

<br/>

## 2. 준비사항(Prerequisites)

- `Raspberry Pi` 보드(이 글에서는 Raspberry Pi 3 Model B v1.2 사용)
- `PC` 또는 `노트북`(cmdline.txt 파일 수정을 위해 필요)
- `모니터`(HDMI를 통해 라즈베리파이와 연결)
- `키보드`(명령을 실행하고 비밀번호 입력하기 위함)

<br/>

## 3. cmdline.txt 파일 수정

### 1) SD 카드 제거

우선 라즈베리파이가 실행 중인 경우 `shutdown`하거나 전원을 분리하여 라즈베리파이를 종료한다. 그리고 라즈베리파이에 꽂혀있는 `SD 카드`를 분리한다.

<br/>

### 2) cmdline.txt 파일 수정

제거된 `SD 카드`를 `PC`에 연결한다. `SD 카드` 내부의 파일 중에서 `cmdline.txt` 파일을 연다.

파일을 열면 아래와 비슷한 명령이 쓰여있을 것이다.

```
dwc_otg.lpm_enable=0 console=ttyAMA0,115200 console=tty1 root=/dev/mmcblk0p2 rootfstype=ext4 elevator=deadline fsck.repair=yes rootwait
```

`cmdline.txt`의 기존 내용에서 아래의 명령을 마지막에 추가한 다음 파일을 저장한다.

```
init=/bin/sh
```

> ***주의사항*** :  
해당 `init=/bin/sh` 명령을 추가할 때는 반드시 기존의 `cmdline.txt` 파일 내용에서 ***같은 줄에 명령을 추가해야 한다.*** 엔터(line break)를 사용해서는 안 되고 스페이스(space)로 한 칸 띄운 뒤에 `init=/bin/sh`을 추가한다.

<br/>

## 4. 라즈베리파이 비밀번호 변경

### 1) 라즈베리파이 부팅

이제 `PC`에 꽂혀 있던 `SD 카드`를 제거하고, 다시 `라즈베리파이`에 `SD 카드`를 꽂는다.  
그리고 `라즈베리파이`에 전원을 입력하여 부팅한다.

<br/>

### 2) 루트 시스템 마운트

```console
$ mount -o remount, rw /
```

<br/>

### 3) 비밀번호 변경

```console
$ passwd pi
```

위 명령을 실행하면 새로운 비밀번호를 입력하고, 한 번더 동일한 비밀번호를 입력하여 확인하고 나면 `(passwd: password updated successfully)`라는 메시지와 함께 비밀번호 변경이 완료된다.

```console
$ sync
$ exec /sbin/init
```

위와 같이 `sync` 명령을 실행하여 캐쉬된 데이터를 스토리지에 저장하고, `init` 명령을 실행한다. 몇 초간 기다리면 라즈비안이 부팅된다. 

<br/>

## 5. cmdline.txt 파일 원상복구

`라즈비안`을 종료한 다음, `라즈베리파이`에 꽂혀 있는 `SD 카드`를 다시 분리하여, `PC`에서 기존에 수정했던 `cmdline.txt` 파일을 다시 연다. 그리고 아까 추가했던 `init=/bin/sh` 부분을 ***삭제하여*** 기존 내용으로 복구한 다음 저장한다.

그리고 다시 `SD 카드`를 `라즈베리파이`에 꽂은 다음 전원을 연결하여 부팅하여 사용한다.

<br/>

<br/>

---

### References

\[1\] _Raspberry Pi tutorials. (2018, Mar 14). [How to recover the password of your Raspberry Pi if you lost it. 2018 Update.](https://howtoraspberrypi.com/recover-password-raspberry-pi/) [Web Blog Post]_

<br/>

### Hashtags

`#라즈베리파이` `#라즈베리파이 비밀번호` `#라즈베리 비밀번호 변경` `#라즈베리 파이 비번` `#라즈베리 파이 비번 변경` `#Raspberry Pi` `#Raspberry Pi password` `#Raspberry Pi passwd` `#raspberrypi password` `#how to change raspberry pi password` `#how to change password on Raspberry Pi` `#passwd raspberry pi` `#linux` `#Raspbian` `#Raspbian passwd` `#raspberry pi root password` `#raspberry pi root passwd`

<br/>

<br/>

© 2020, Byeongcheol Yoo. All rights reserved.
