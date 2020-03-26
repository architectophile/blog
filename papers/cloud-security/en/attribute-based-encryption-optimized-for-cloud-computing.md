# Attribute-Based Encryption Optimized for Cloud Computing

## Abstract

Our main result is an extension of the decentralized CP-ABE scheme of Lewko and Waters [LW11] with identity-based user revocation.

Our revocation system is made feasible by removing the computational burden of a revocation event from the cloud service provider, at the expense of some permanent, yet acceptable overhead of the encryption and decryption algorithms run by the users.


## I. Introduction

Attribute-based encryption (ABE) proposed by Sahai and Waters [SW05] is intended for oneto-many encryption in which ciphertexts are encrypted for those who are able to fulfil certain requirements. 

The most suitable variant for fine-grained access control in the cloud is called
ciphertext-policy (CP-)ABE, in which ciphertexts are associated with access policies, determined
by the encryptor and attributes describe the user, accordingly attributes are embedded in the
users’ secret keys. A ciphertext can be decrypted by someone if and only if, his attributes satisfy
the access structure given in the ciphertext, thus data sharing is possible without prior knowledge
of who will be the receiver preserving the flexibility of the cloud even after encryption.

A crucial property of ABE systems is that they resist collusion attacks. it is achieved by binding together the attribute secret keys of a specific user with a random number so that only those attributes can be used for decryption which contains the same random value as the others.

As a result private keys must be issued by one central authority (CA) that would need to be in a position to verify all the attributes or credentials it issued for each user in the system.

 To overcome this problem, we are going to make use of the results of Lewko and Waters [LW11] about decentralising CP-ABE.

We emphasise that user revocation is applied in exceptional cases like the above-mentioned, as all other cases can be handled simpler, with the proper use of attributes (e.g. an attribute can include its planned validity like “CryptoProject2015”).

Related Work. The concept of ABE was first proposed by Sahai and Waters [SW05] as a generalization of identity-based encryption.

The problem of building ABE systems with multiple authorities was first considered by Chase
[Cha07] with a solution that introduced the concept of using a global identifier (GID) for tying
users’ keys together.

