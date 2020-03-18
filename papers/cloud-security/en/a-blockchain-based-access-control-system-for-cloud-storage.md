# A Blockchain-Based Access Control System for Cloud Storage 

## Abstract

A prototype multi-user system for access control to datasets stored in an untrusted cloud environment  without the provider participation. 

ciphertext-policy attribute-based encryption scheme with dynamic attributes.




## I. Introduction

The essential problem is transferring data to the external environment, such that anyone else other than the owner can get access to information.

Encryption is one of the main protective mechanisms recommended by the Cloud Security Alliance.

BigchainDB




## II. ACCESS CONTROL SYSTEM

implementation of attribute-based encryption-based Ethereum smart contracts.

The most widely-used standard for attribute-based access control is XACML.

it is necessary to classify them firstly as either publicly available or restricted. To do this, the user must be given the opportunity to convert files and directories with the appropriate attributes.

Thus, in the case of restricted information is required to obtain all necessary encoding information, encryption to send data to the cloud and add an appropriate entry in the blockchain.

Change the virtual machine state can be written in Turing complete scripting language. 

For each file the user creates a smart contract, which will store information about the owner, access policy, a hash sum of the stored information, information to identify the cloud, and all changes that will occur with the file. 




## III. ATTRIBUTE-BASED ENCRYPTION 

Mate Horvath proposed in [8] a multi-authority CP-ABE scheme for effective revocation of user’s attributes based on their identities. 

Yuan proposed in [9] a way to define dynamic access policies without changing user keys. The method is based on the observation, which says that all ciphertexts consist of several components: the primary ciphertext; components of the ciphertext, which are related with attributes. 

Thus, to change the access policy you want to change just some components. 



To create file the user encrypts file by attribute-encryption scheme on his own device, and then sends the ciphertext to the cloud, and records the public link, the hash code of the file and the access policy in the contract. For changing the file’s access policy, CD performs the update of the access matrix and components of the ciphertext. Then updates the information in the contract file, and replaces components of the ciphertext in the cloud. 