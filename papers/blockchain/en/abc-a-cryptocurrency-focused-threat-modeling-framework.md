# ABC: A Cryptocurrency-Focused Threat Modeling Framework

<br/>

## I. Introduction

The best practice for designing a secure system requires a threat modeling step to investigate potential security risks. Such a model can guide system designers in deploying the proper countermeasures, and assessing the security level of a system.

Although threat modeling has been thoroughly studied in the literature, existing paradigms primarily target software applications [9] or distributed systems that have a small number of participant types [10]. These threat modeling techniques were frankly not designed to be scalable for a set of diverse, mutually distrustful parties as found in cryptocurrencies.

The complexity of reasoning about and managing threat cases becomes unwieldy as these sets grow.
To address this issue, we propose ABC, an Asset-Based Cryptocurrency-focused threat modeling framework. ABC introduces a novel technique, called a collusion matrix, that allows users to investigate the full threat space and manage its complexity.
A collusion matrix is a comprehensive investigation and threat enumeration tool that directly addresses collusion by accounting for all possible sets of attacker and target parties. 
ABC helps in reducing the combinatorial growth of these cases by ruling out irrelevant ones and merging threat cases that have the same effect. Such explicit consideration of attacker collusion is particularly important in permissionless cryptocurrencies that allow anyone to join.

<br/>

## II. RELATED WORK

### Threat modeling frameworks

The STRIDE framework is one of the most popular strategies in this field [9]. STRIDE is an acronym of the threat categories it covers, namely, Spoofing, Tampering, Repudiation, Information disclosure, Denial of service (DoS), and Elevation of privilege.  Though several solutions have extended STRIDE to accommodate more complex systems [10], and cover other security requirements, e.g., privacy [11], its model does not fit cryptocurrencies. Another study [12] has borne out this
premise, where the authors extended STRIDE’s threat categories to handle Bitcoin-like community currencies.

Other paradigms have pursued slightly different approaches. KAOS [13] is a goal-oriented requirements engineering framework that has been extended to cover security. ANOA [14] is a generic framework to define and analyze anonymity of communication networks. And the framework
presented in [15] targets the secure design of data routing protocols. Finally, other works build specialized threat models for specific classes of distributed systems, e.g., storage systems [16], rather than introducing a framework.










\[10\] S. Myagmar, A. J. Lee, and W. Yurcik, “Threat modeling as a basis for security requirements,” in SREIS, 2005.

\[11\] M. Deng, K. Wuyts, R. Scandariato, B. Preneel, and W. Joosen, “A privacy threat analysis framework: supporting the elicitation and fulfillment of privacy requirements,” Requirements Engineering, vol. 16, no. 1, 2011.

\[12\] D. Vandervort, D. Gaucas, and R. St Jacques, “Issues in designing a
bitcoin-like community currency,” in FC, 2015.

\[13\] A. Van Lamsweerde, “Elaborating security requirements by construction
of intentional anti-models,” in IEEE ICSE, 2004.

\[14\] M. Backes, A. Kate, P. Manoharan, S. Meiser, and E. Mohammadi,
“Anoa: A framework for analyzing anonymous communication protocols,” in IEEE CSF, 2013.

\[15\] M. Hollick, C. Nita-Rotaru, P. Papadimitratos, A. Perrig, and S. Schmid,
“Toward a taxonomy and attacker model for secure routing protocols,”
Computer Communication Review, vol. 47, no. 1, 2017.

\[16\] R. Hasan, S. Myagmar, A. J. Lee, and W. Yurcik, “Toward a threat
model for storage systems,” in ACM StorageSS, 2005.