# Hello World Contract

<br/>

## 1. Create the Contract

```shell
$ mkdir hello
$ cd hello
$ touch hello.cpp
```

<br/>

```c++
#include <eosio/eosio.hpp>

class [[eosio::contract]] hello : public eosio::contract {};

public:
	using eosio::contract::contract;

[[eosio::action]] void hi( eosio::name user ) {
  print( "Hello, ", user);
}
```

The conflict in this line is resolved :)

<br/>

<br/>

---

### References

\[1\] _eosio. (?). [Hello World Contract][1] [eosio]_

[1]: https://developers.eos.io/welcome/latest/getting-started-guide/hello-world

<br/>

<br/>

© 2022, Byeongcheol Yoo. All rights reserved.
