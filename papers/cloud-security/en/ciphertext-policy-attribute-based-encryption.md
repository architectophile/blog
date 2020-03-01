# Ciphertext-Policy Attribute-Based Encryption

## Abstract

In several distributed systems a user should only be able to access data if a user posses a certain set of credentials or attributes.
If any server storing the data is compromised, then the confidentiality of the data will be compromised. 

By using our techniques encrypted data can be kept confidential even if the storage server is untrusted; moreover, our methods are secure against collusion attacks.




## I. Introduction

For example, the head FBI agent may want to encrypt a sensitive memo so that only personnel that have certain credentials or attributes can access it.

This person may not know the exact identities of all other people who should be able to access the data, but rather she may only have a way to describe them in terms of descriptive attributes or credentials.

Traditionally, this type of expressive access control is enforced by employing a trusted server to store data locally.

However, services are increasingly storing data in a distributed fashion across many servers. Replicating data across several locations has advantages in both performance and reliability.

The drawback of this trend is that it is increasingly difficult to guarantee the security of data
using traditional methods.

For these reasons we would like to require that sensitive data is stored in an encrypted form so that it will remain private even if a server is compromised.


### Our Contribution

In our system, a user’s private key will be associated with an arbitrary number of attributes expressed as strings.

When a party encrypts a message in our system, they specify an associated access structure over attributes.

At a mathematical level, access structures in our system are described by a monotonic “access tree”, where nodes of the access structure are composed of threshold gates and the leaves describe attributes.


### Our Techniques

At a high level, our work is similar to the recent work of Sahai and Waters [24] and Goyal et al. [15] on key-policy attribute based encryption (KP-ABE).
In key-policy attribute based encryption, ciphertexts are associated with sets of descriptive attributes, and users’ keys are associated with policies (the reverse of our situation).

We stress that in keypolicy ABE, the encryptor exerts no control over who has access to the data she encrypts, except by her choice of descriptive attributes for the data.
Rather, she must trust that the key-issuer issues the appropriate keys to grant or deny access to the appropriate users.
In other words, in [24, 15], the “intelligence” is assumed to be with the key issuer, and not the encryptor.
In our setting, the encryptor must be able to intelligently decide who should or should not have access to the data that she encrypts.

As such, the techniques of [24, 15] do not apply to our setting, and we must develop new techniques.

At a technical level, the main objective that we must attain is **collusion-resistance**: If multiple users collude, they should only be able to decrypt a ciphertext if at least one of the users could decrypt it on their own.

In the work of [24, 15], collusion resistance is insured by using a **secret-sharing scheme** and embedding independently chosen secret shares into each private key.

In our scenario, users’ private keys are associated with sets of attributes instead of access structures over them, and so **secret sharing schemes do not apply**.

Instead, we devise a novel private key randomization technique that uses a new **two-level random masking methodology**. This methodology makes use of groups with **efficiently computable bilinear maps**.




## II. Related Work

In an attribute-based encryption system **ciphertexts are not necessarily encrypted to one particular user** as in traditional public key cryptography.
Instead both users’ private keys and ciphertexts will be associated with a set of attributes or a policy over attributes.

In their original system Sahai and Waters presented a Threshold ABE system in which ciphertexts were labeled with a set of attributes S and a user’s private key was associated with both a threshold parameter k and another set of attributes S′. In order for a user **to decrypt a ciphertext at least k attributes must overlap** between the ciphertext and his private keys.

The primary drawback of the Sahai-Waters [24] threshold ABE system is that the threshold semantics
are not very expressive and therefore are limiting for designing more general systems.

Goyal et al. introduced the idea of a more general key-policy attributebased encryption system.
The construction of Goyal et al. can be viewed as an extension of the Sahai-Waters techniques where instead of embedding a Shamir [26] secret sharing scheme in the private key, the authority embeds a more general secret sharing scheme for monotonic access trees.




## III. Background

In these definitions the attributes will describe the users and the access structures will be used
to label different sets of encrypted data.


### Definitions

A of non-empty subsets of {P1,P2,... ,Pn}, i.e., A ⊆ 2{P1,P2,...,Pn}\{∅}.
The sets in A are called the authorized sets, and the sets
not in A are called the unauthorized sets.

In our context, the role of the parties is taken by
the attributes. 


#### Setup.

#### Encrypt(PK,M, A).

#### Key Generation(MK,S).

#### Decrypt(PK, CT, SK).

#### Delegate(SK, S˜).

#### Security Model for CP-ABE


###  Bilinear Maps

