# InfraBlockchain Analysis

## Proof of Transaction (PoT)

1. Pulbic/permissioned hybrid 노드 환경에서 BFT 합의 알고리즘을 사용하는데 전체 노드 수와 trusted nodes 수는 어떻게 되는가? trusted nodes가 최소한 50%를 초과해야 안전하지 않은가? 실제로 일반적인 public 노드가 현재 참여하고 있는가?

2. PoT는 수수료를 통해서 블록 생성자를 선출하는데 PoS에 비해 훨씬 위험하지 않은가?
   PoS에서는 패널티로 소유한 모든 지분을 잃게 되지만 PoT에서는 앞으로 벌어들일 수입만 없어짐. 게다가 네이티브 코인의 경우 플랫폼에 문제가 생기면 가치가 떨어지지만 fiat-pegged stable token은 상관없음

3. 사용자들은 수수료를 지불할 때 반드시 block producers가 지정한 transaction fee token으로만 지불해야 하는가?

4. Block producers는 어떻게 선발되는가? 트랜잭션이 너무 많고 서로 전파되지 않았을 경우 가장 많은 투표를 받은 계정이 서로 다르지 않나? Block producer는 자신을 뽑지 않는 트랜잭션은 빼버릴 수 있지 않는가? 혹시 이전 블록에 저장된 트랜잭션의 투표를 취합하여 다음 block producers를 선출하는가? 그렇다면 당연히 문제가 되지 않는가? 선발된 여러 block producers 중에서 블록 생성을 누가 할 지 어떻게 결정되는가? (time slot을 어떻게 배분하는가?)
   (block producers = service providers?)

5. trusted entities에 의해 발행된 fiat-pegged stable token만 transaction fee token으로 선택될 수 있는가? User-created token이 transaction fee payment에 사용된다고 했는데 그렇다면 fiat-pegged stable token을 선택한다는 것은 무슨 말인가? 누구라도 생성한 커스텀 토큰을 transaction fee token으로 사용가능하다고 했는데 맞는 말인가?

6. PoS는 누구나 블록 생성자가 될 수 있지만 PoT는 허용된 엔티티만 선출되기 때문에 불공평하지 않은가?

7. PoT는 트랜잭션 수만 많으면 선출될 가능성이 높아지는데 트랜잭션 수가 높다고 더 유용한 서비스인가? (e.g. 게임 vs 부동산 거래)
   오히려 트랜잭션을 많이 발생시킬 수록 블록체인 네트워크의 대역폭(bandwidth) 점유율이 높아지는 것인데 보상도 많이 받는 것은 불공평하지 않은가?

8. 만약 transaction vote 항목에 service provider가 아닌 다른 account를 고의적으로 적는 공격을 한다면? 특정 컨트랙트에 토큰을 몰아주고 지분을 소유한 사람들끼리 쌓인 수수료를 나눠 갖는다면?

9. Native Currency가 없는데, 스마트 컨트랙트 구동 시 수수료는 어떻게 산정하는가?
   오퍼레이션 당 가격을 fiat-pegged stable token으로 일정하게 고정하는가?

10. 수수료로 다양한 fiat-pegged stable token을 지원하는데 토큰 간 환율에 대한 정보는 외부 오라클을 사용해야 하지 않는가? 각 Transaction fee token의 weight를 계산할 때 인위적으로 왜곡된 값을 지정할 수 있지 않는가? 거래내역에 수수료로 사용할 token 종류와 최대 사용가능 수수료(e.g. gas limit) 등을 설정하는 것인가? 최대 수수료가 없다면 공격 가능성이 있지 않은가?

11. 회사의 비지니스 모델은 무엇인가?

12. 블록체인 상에서 KYC가 진행된 사용자를 구분할 수 있는데, 프라이버시 문제를 보호하기 위한 안전한 장치들이 마련되어 있는가?

13. Token Backing Depository에서 새로운 token을 발생할 때 off-chain 데이터에 대한 오라클 문제 발생하지 않는가?

14. 스마트 컨트랙트는 EOS와 같이 WebAssembly VM을 기반으로 하고 있는데 EOS 스마트 컨트랙트와 호환이 가능한가?
