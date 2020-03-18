# Secure Attribute-Based Systems

## Abstract

Attributes deﬁne, classify, or annotate the datum to which they are assigned. 

We introduce a novel secure information management architecture based on emerging attribute-based encryption (ABE) primitives. 

We further explore the use of such policies in two example applications: a HIPAA compliant distributed ﬁle system and a social network. 

A performance analysis of our ABE system and example applications demonstrates the ability to reduce cryptographic costs by as much as 98% over previously proposed constructions.


## Introduction

For example, individuals in enterprise systems are often segregated into groups of common interest or duty based on a given set of attributes [27], e.g., function, department, university.

Existing systems principally rely on the assignment and subsequent enforcement of policies by trusted and often centralized servers. However, these servers are acutely ill-equipped to deal with disconnected and asynchronous clients. Reliance upon **centralized servers** further **limits scalability and mandates a single point of trust**. 

Attribute-based encryption (ABE) [26], a generalization of identity-based cryptosystems, incorporates attributes as inputs to its cryptographic primitives.
Objects are encrypted using a set of attributes describing the intended receiver

More ﬂexible requirements are achievable through the use of a thresholding primitive, for which only k-of-n attributes are necessary to perform decryption.

Furthermore, decryption under both the standard and threshold approaches is **collusion-resistant** as multiple parties are unable to meaningfully pool attributes. 

