Security and Privacy Evaluation of Cryptocurrency Mobile Applications using Threat Modeling


Abstraction



## I. Introduction

Cryptocurrency is one of the Blockchain applications. And it has real world value. Therefore hackers' target.[8]

Since Bitcoin emerged in 2009, the market cap is increasing continuously.

The blockchain is interacted using mobile applications mostly.

Most of the blockchains has valuable assets. cryptocurreny

Mobile wallets are the target for attackers.

The user is inscreaing

cryptocurrency lacks of regulation

Mobile applications are not subject to the regulation and lack of security and privacy requirements in contrast to conventional financial mobile applications.

We are going to analyze current cryptocurrency mobile applications using threat modeling. STRIDE and LINDDUN.

We analyzed cryptocurrency or blockchain related threats to elicit more specific threats.
[1], [2], [3], [4], [5?]

We analyzed various android mobile application threats and security requirements to create a attack library.
[6]

This also involves considering collusion between several
attackers who may cooperate on attacking the system.

it does not contemplate collusion attack 
the target is only the user's mobile phone or application.

Blockchain-based financial services are different from conventional services. For instance, in blockchain, you can not cancel a transaction.
Public blochain ledger is exposed to the public as opposed to the conventional financial services like banknig services. Severe privacy issues can occur.

Therefore we need threat modeling framework for cryptocurrency specific services.




### The paper makes the following contributions:

- We evaluate security and privacy of cryptocurrency applications using static code analysis and network data analysis (Section 3).

<br/>

## II. Related Work

1. privacy-and-security-analysis-of-cryptocurrency-mobile-applications

However, their work does not consider threats which are specific to cryptocurrencies or blockchians
Particulary, have diffrent characteristics from conventional financial services. therefore, we elicited more cryptocurrenry specific threats.


2. Analysis and security of crypto currency wallets

3. A Cryptocurrency-Focused Threat Modeling Framework
However, this framework is for designing blockchian or cryptocurrency. not for mobile applications.





[1] A Taxonomy of Blockchain Threats and Vulnerabilities
[2] Threats and Risks in Cryptocurrency
[3] Threats and Opportunities of Cryptocurrency Technologies
[4] The destabilising effects of cryptocurrency cybercriminality
[5?] On Blockchain Security and Relevant Attacks

[6] OWASP Mobile top 10
[7] OWASP Mobile Security Testing Guide
[8] Coin market cap










## checklist

### network
- use ssl/tls when communicating online
- expose IP addresses of an end-point of API servers
- ssl pinning

### user interface
- expose sensitive information
  - display a warning message when exposing sensitive information(e.g. private key)
- copy and paste private keys
- show mnemonic words
- screen capture of keys
- input personal information
- request for suspicious permissions
- two-factor auth

### mitigating functions
- check the integrity of a user's address when sending address
- check the integrity of a user's address when displaying qr code
- check the integrity of a transaction before sign it
- send backup keys to the server
- check if the device is rooted
- clipboard integrity check

### data persistence
- key stroage in local app data
- sensitive information in app data(e.g. credentials, secre keys)

### cryptography
- rng
- use weak hash algorithms(e.g. MD5)
- use weak cryptographic algorithms(e.g. DES, ECB mode)
- perform cryptographic calculation in a secure environment(e.g. SE, TPM)

