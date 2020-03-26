# Attribute-Based Encryption for Fine-Grained Access Control of Encrypted Data

Vipul Goyal, Omkant Pandey, Amit Sahai, Brent Waters


## Abstract

One drawback of encrypting data, is that it can be selectively shared only at a coarse-grained level (i.e., giving another party your private key). We develop a new cryptosystem for fine-grained sharing of encrypted data that we call Key-Policy Attribute-Based Encryption (KP-ABE).

Our construction supports delegation of private keys which subsumes Hierarchical Identity-Based Encryption (HIBE).


## I. Introduction

One disadvantage of encrypting data is that it severely limits the ability of users to selectively
share their encrypted data at a fine-grained level.

The user either needs to act as an intermediary and decrypt all relevant entries for the party or must give the party its private decryption key, and thus let it have access to all entries.

Sahai and Waters [34] made some initial steps to solving this problem by introducing the concept of Attributed-Based Encryption (ABE). The cryptosystem of Sahai and Waters allowed for decryption when at least k attributes overlapped between a ciphertext and a private key. While this primitive was
shown to be useful for error-tolerant encryption with biometrics, the lack of expressibility
seems to limit its applicability to larger systems.


### Our Contribution

We call such a scheme a Key-Policy Attribute-Based Encryption (KP-ABE), since the access structure is specified in the private key, while the ciphertexts are simply labeled with a set of descriptive attributes.

In our construction each user’s key is associated with a tree-access structure where the leaves are associated with attributes.

***The primary difference between our setting and secret-sharing schemes is that while secret-sharing schemes allow for cooperation between different parties, in our setting, this is expressly forbidden.***  To do this, we adapt and generalize the techniques introduced by [34] to deal with more complex settings.

Somewhat surprisingly, we observe that our construction with the delegation property subsumes Hierarchical Identity-Based Encryption [24, 21] and its derivatives [1].



## II. Related Work

### Fine-grained Access Control

Several techniques are known for implementing fine grained access control. Common to the existing techniques (see, e.g., [26, 20, 38, 28, 23, 29] and the references therein) is the fact that they employ a trusted server that stores the data in clear.
Access control relies on software checks to ensure that a user can access a piece of data only if he is authorized to do so. This situation is not particularly appealing from a security standpoint. In the event of server compromise, for example, as a result of a software vulnerability exploit, the potential for information theft is immense. Furthermore, there is always a danger of “insider attacks” wherein a person having access to the server steals and leaks the information, for example, for economic gains.

In our techniques, the data is stored on the server in an encrypted form while different users are still allowed to decrypt different pieces of data per the security policy. This effectively eliminates the need to rely on the storage server for preventing unauthorized data access.


### Secret-Sharing Schemes

The information given to a party is called the share (of the secret) for that party. 
Every SSS realizes some access structure that defines the sets of parties who should be able to reconstruct the secret by using their shares.

In SSS, one can specify a tree-access structure where the interior nodes consist of AND and OR gates and the leaves consist of different parties. Any set of parties that satisfy the tree can come together and reconstruct the secret.
***Therefore in SSS, collusion among different users (or parties) is not only allowed but required.***

In our construction each user’s key is associated with a tree-access structure where the leaves are associated with attributes. A user is able to decrypt a ciphertext if the attributes associated with a ciphertext satisfy the key’s access structure. ***In our scheme, contrary to SSS, users should be unable to collude in any meaningful way.***


### Identity-Based Encryption and Extensions
The concept of `Attribute-Based Encryption` was introduced by Sahai and Waters [34], who also presented a particular scheme that they called `Fuzzy Identity-Based Encryption (FIBE)`.
The `Fuzzy-IBE` scheme builds upon several ideas from `Identity-Based Encryption` [10, 36, 18]. In FIBE, an identity is viewed as a set of attributes. FIBE allows for a private key for an identity, ω, to decrypt to a ciphertext encrypted with an identity, ω' , if and only if the identities ω and ω' are close to each other as measured by the “set overlap” distance metric. In other words, if the message is encrypted with a set of attributes ω', a private key for a set of attributes ω enables decrypting that message, if and only if |ω ∩ ω'| ≥ d, where d is fixed during the setup time. ***Thus, FIBE achieves error tolerance making it suitable for use with biometric identities.***
However, ***it has limited applicability to access control of data***, our primary motivation for this work. Since the main goal in FIBE is error tolerance, ***the only access structure supported is a threshold gate whose threshold is fixed at the setup time.***

We develop a much richer type of attribute-based encryption. The private keys of different users might be associated with different access structures. Our constructions support a wide variety of access structures (indeed, in its most general form, every LSSS realizable access structure), including a tree of threshold gates.


## III. Background




