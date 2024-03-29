## II. RELATED WORK

Most of the work done so far in this category can be divided into two classes. The first formalizes the security properties of consensus protocols and blockchains [17], while the second discusses specific security attacks on cryptocurrencies. For example, in a series of studies on Bitcoin, Bonneau et al. [18] present several security threats, Androulaki et al. [19] evaluate its anonymity property, and Gervais et al. [20] study how tampering with the network links affects participants’ view of the blockchain.

While these attack descriptions are very useful, they only outline specific threat scenarios for a given system. Our goal, however, is to develop a framework that allows reasoning about the full set of potential attacks facing a variety of cryptocurrency types.

<br/>

## III. STEPPING THROUGH THE ABC FRAMEWORK

applying ABC starts by understanding the functionality of the cryptocurrency system under design with a focus on its asset types and the financial motivations of the participants (Section III-A).

This is followed by identifying the impactful threat categories and mapping them to the system assets (Section III-B). After that, ABC directs system designers to extract concrete attack scenarios using a new tool called a collusion matrix, which helps in exploring and analyzing the full threat space (Section III-C). Lastly, ABC acknowledges that financial incentives affect other design steps including risk assessment and threat mitigation (Section III-D).

To make the discussion easier to follow, we illustrate the ABC process by describing its application to the following simplified system, which was inspired by Golem [4]:

CompuCoin is a cryptocurrency that provides a distributed computation outsourcing service. Parties with excessive CPU power may join the system as servers to perform computations on demand for others.

The full threat model of CompuCoin is available online [23].


### A. System Model Characterization

Therefore, an accurate system model must outline the use scenarios of the system, the assumptions on which it relies, and any dependencies on external services.

In addition, the system model must be aware of all participant roles, and any possible motivation they might have to attack the system.  For the latter, evaluators need to consider how the financial interests of these participants shape their behaviors.

Moreover, a system model must define the critical components that need to be protected from attackers. These components represent the assets that would compromise the whole system if attacked. To capture the features of the system, ABC identifies these assets based on its functionality.

For example, the blockchain and the currency can be considered concrete assets, while preserving user privacy would be an abstract asset.

#### Running example application. 

Figure 1 illustrates how this step would look in CompuCoin. It shows the various components of the system model, in addition to a network model of the computation outsourcing service.

<br/>

### B. Threat Category Identification

The next step is to identify the broad threat categories that must be investigated. For each system component, system analysts outline all threat classes that may apply.

Here ABC steps away from conventional practice of using an a priori-fixed list, and instead uses an adaptive approach inspired from requirements engineering [11] that defines threats as violations of system security goals. 

ABC defines these threat classes as violations of asset security requirements.

1. Define what constitutes secure behavior for the asset, and use that knowledge to derive its security requirements.

2. Define the threat categories of an asset as violations of its security requirements.

#### Running example application. 

Applying this step to CompuCoin produced the threat categories listed in Table I (the detailed process can be found in the extended version of the paper [24]).

<br/>

### C. Threat Scenario Enumeration and Reduction

Once the threat categories have been identified, the next step is to enumerate concrete attack scenarios under each threat type.. It is important in this step to be as comprehensive as possible by considering all potential attackers, target parties, and the set of actions attackers may follow to achieve their goals. This also involves considering collusion between several attackers who may cooperate on attacking the system.

To achieve this, ABC introduces collusion matrices that instruct analysts to enumerate all collusion cases, and reason about the feasibility of all threats scenarios in the system. A collusion matrix is two-dimensional, with the rows representing potential attackers and the columns representing the target parties.

#### 1) Enumeration: 

In this step, system analysts examine each cell and enumerate all strategies that attackers can use against the target parties, and documenting the process.

#### 2) Reduction: 

While examining each cell, system analysts reduce the number of threat cases by:

- Eliminating cells representing scenarios that will not
produce a threat to the system.

- Merging together scenarios (and the corresponding cells)
that have the same effect, or those that do not become
stronger with collusion.

#### 3) Documentation: 

System analysts should document all threat scenarios that remain after the reduction step.

#### Running example application. 

The CompuCoin threat model has 11 collusion matrices [23]. We present one of them here; the service theft threat collusion matrix as illustrated in Figure 3. In this matrix, ten cases have been ruled out. Ten other merged cases are shown in Figure 3. This includes all cells under the column with the “client and server” header, which are reduced to attacking only servers.

<br/>

### D. Risk Assessment and Threat Mitigation

During this process, it is useful to prioritize threats based on the amount of damage they can cause. This falls under the purview of risk management, a separate task from threat modeling, carried out using frameworks like DREAD [9].

For example, many threat vectors can be addressed using rational financial incentives that are often called detect-and-punish mechanisms. That is, when a cheating incident is detected, the miners punish the attacker financially. These approaches can use a game theoretic approach [25] to set the design parameters in a way that makes cheating unprofitable.

#### Running example application.

To illustrate this step in CompuCoin, we consider the distilled threat scenarios found in Figure 3. Both threats can be neutralized financially by designing proper techniques to make the client lock the payments in an escrow, along with a penalty deposit.

<br/>

## IV. EVALUATION

To evaluate the effectiveness of ABC, we set up a user study that compares its performance against STRIDE [9],

<br/>







[11] M. Deng, K. Wuyts, R. Scandariato, B. Preneel, and W. Joosen, “A privacy threat analysis framework: supporting the elicitation and fulfillment of privacy requirements,” Requirements Engineering, vol. 16, no. 1, 2011.

[17] R. Pass, L. Seeman, and A. Shelat, “Analysis of the blockchain protocol in asynchronous networks,” in EUROCRYPT, 2017.

[18] J. Bonneau, A. Miller, J. Clark, A. Narayanan, J. A. Kroll, and E. W. Felten, “Sok: Research perspectives and challenges for bitcoin and cryptocurrencies,” in IEEE S&P, 2015.

[23] Supplemental Material, https://ssl.engineering.nyu.edu/papers/abc-material.zip.