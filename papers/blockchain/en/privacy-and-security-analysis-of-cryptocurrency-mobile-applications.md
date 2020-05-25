# Privacy and Security Analysis of Cryptocurrency Mobile Applications

<br/>

## I. Introduction

With a perceived real world value cryptocurrency wallets are a target for attackers.
Unlike mainstream financial services applications, cryptocurrency wallets are not subject to the same stringent security requirements of their regulated counterparts.

The lack of regulation combined with high demand may allow developers to publish applications without proper security and privacy implementation. This may prove of value to attackers as these applications often contain monetary assets and lack regulatory security requirements.

One conspicuous example of attackers exploiting the vulnerability in cryptocurrency mobile application is the ExoBot malware.

Other malware such as BankBot, Marcher and Mazar have also been configured to attack the cryptocurrency applications.

These malwares are designed to steal user credential and/or coins from the target application.

### The paper makes the following contributions:

- We evaluate security and privacy of cryptocurrency applications using static code analysis and network data analysis.

- We compare the security and privacy provisions of traditional banking and trading applications to that of cryptocurrency applications.

- We explore the limitations of static code analysis and examine the validity of the static test for security evaluation.

- We propose a technique to examine the state of security provision for cryptocurrency mobile applications.

<br/>

## II. PRIVACY AND SECURITY ISSUES

we first overview the ten most common security threat vectors for mobile application followed by a description of privacy threats.

<br/>

### A. OWASP Mobile top 10

The Open Web Application Security Project (OWASP) mobile security project provides a collection of the most common security issues in mobile applications [5].

- ***M1: Improper Platform Usage:*** Improper implementation of host operating system services can lead to known security threats. For example, using App local Storage instead of iOS Keychain in iOS applications [6] to store sensitive data. App local storage may expose the information to other components of the application whereas the data stored in Keychain is secured from unauthorized access by the operating system.

- ***M2: Insecure Data Storage:*** This category includes unintentional data leakage and insecure information storage. Data stored in local SQL databases and Log files may be prone to threat if the adversary gains access to the device. Storing sensitive data to external storage is considered
insecure and can be exploited. The data leakage may exist due to vulnerabilities present in frameworks, hardware or due to rooted devices.

- ***M3: Insecure Communication:*** Bad actors might exploit vulnerabilities present in the communication to intercept sensitive information. This category includes threats induced by improper implementation of SSL for network communication.

- ***M4: Insecure Authentication:*** Applications dealing with sensitive information such as personal or financial data should implement proper user authentication.  One example of insecure
authentication is the case where the application permits the device to execute a backend API service request without an access token.

- ***M5: Insufficient Cryptography:*** Applications that leverage encryption often use cryptographic functions. The first one is using a vulnerability in the implementation of the encryption/decryption process to gain access to sensitive information. The second threat occurs due to the usage of a broken cryptographic functions.

- ***M6: Insecure Authorization:*** During authorization, the application should verify if the authenticated user has the permission to perform a given operation.

- ***M7: Poor Code Quality:*** This category involves bad programming practices that may result in vulnerabilities such as buffer overflow.

- ***M8: Code Tampering:*** This allows attackers to tamper with the code of the application to insert a backdoor or to change API calls to gain sensitive information. Attackers can modify the source code and re-sign the application before distributing it to end users.

- ***M9: Reverse Engineering:*** Reverse engineering may allow the attacker to determine the application logic in place including deduction of source code, libraries, and other assets in use. After determining the application logic, the attacker can find vulnerabilities to exploit in the design or flow of information.

- ***M10: Extraneous Functionality:*** During the development process, the developers often use back doors for testing. This back door may involve bypassing two-step authentication during testing. Failure to remove such back doors can leave the application vulnerable.

<br/>

### B. Permission based privacy analysis

We follow a permission-based privacy analysis model [9] to identify misconfigured resource access. 
We survey cryptocurrency android applications and report the system resources requested by the applications. We further investigate the application work-flow to determine if the requested service has been implemented in the application logic.

<br/>

## III. EMPIRICAL STUDY

The empirical study is sectioned into two phases. In the first phase we examine the source code and network traffic for threats listed in Section 2A and 2B using automated tools.
In phase two, we perform a manual analysis of source code on a subset of cryptocurrency and banking applications. Figure 1 illustrates the design of the empirical study.

#### A. Phase 1

Similar to desktop applications there are two ways of investigating the applications for security threats: static and network data analysis.

In the static analysis, we examine the source code for occurrences of known security threats such as those mentioned in Section 2A. Whereas in the network data analysis of the application, we execute the application in a simulated environment and sniff the network traffic to outline any networking issue such as transmission of secret information in plain text.

1) Static Analysis: Static analysis technique is widely used to asses the security of Android applications [10]. In static analysis, we parse the source code and understand the program
path to detect program attributes. Automated tools such as DroidSafe [11] allow us to automate this process. To perform static analysis, we adopt the approach used by [12] to generate
java source code from the Android application package file (APK).

Permissions without workflow applications have been classified as suspicious in this study.

We now classify the threats identified by DroidSafe into the categories listed in section 2A. The automated tools such as DroidSafe can only detect a subset of the issues identified by OWASP top 10 (Section 2).

- ELF without stack protection: An application built with -fstack-protector option can significantly increase the difficulty of a stack overflow [13].

-Java HashCode:  By applying birthday attack [14] on java hash code, we ascertain that with 77000 objects we have a 50% chance of collision. This proneness to collision renders java hash code insecure for cryptographic hashing.

- Insecure Random Number Generator:  Using a predictable random number generator for operations such as key generation can prove to be insecure. In Java, the Random.nextInt() is deemed insecure because of its predictable nature [15].

- IP Address Disclosure: Disclosing IP addresses of the backend server may provide an attacker with more attack vectors such as exploitation of the web server to gain sensitive data.

- MD5: MD5 hashing algorithm has been broken and is considered weak [16]. Even though there are acceptable use cases for MD5, it may still pose a security threat if it is used in critical cryptography algorithms in the application.

- Hardcoded Sensitive Information: Sensitive information such as API keys may reveal the structure of the backend resulting in more attack vectors.

- Temporary File: Storing sensitive information in temporary files can lead to data leakage if the attacker gains access to storage.

- Insecure WebView Implementation: Improper implementation of WebView in Android can lead to an insecure direct object reference and Cross-Site Scripting.

- SHA-1: [17] have proposed an attack on SHA-1 which undermines the security promises of SHA-1 insecure for usage in critical security functions.

- Raw SQL Query Execution: Allowing raw SQL queries may lead to a SQL injection. SQL injection is particularly harmful if sensitive data is stored in the SQL database.

- WebView Ignores SSL Certificate: Ignoring SSL certificate in WebView can allow an attacker to conduct a Man-in-the-middle attack [18].

- ECB mode in Encryption Algorithm: Electronic code block is a type of block cipher technique in which at a time a block of plaintext is translated into ciphertext. ECB generates the same ciphertext for the same substring if processed again.

- Insecure Certificate: Using algorithms such as MD5 and SHA-1 to generate a digital certificate may not be secure due to the algorithms used.

We extend the static code analysis by detecting security features implemented by the developers. We modify the DroidSafe to detect the following security features.

- Root Detection: Rooted Android devices can bypass many security provisions, detecting a rooted device allows the developer to handle such threats.

- Prevention of tapjacking attack: In a tapjacking attack, the attacker attempts to record the touch events of other applications using a malicious application on the device.
This attack may allow the attacker access to typed credentials. We detect the existence of code to prevent such an attack in the source code.

- SSL Pinning Library: SSL pinning can improve the security of a service that relies on SSL certificates. By using a pinning library, the developer can prevent a Manin-the-middle attack.

- Database with encryption: An encrypted database is not prone to data leakage via SQL injections.

<br/>

### 2) Network Analysis:

To detect potential communication vulnerabilities (M3: Insecure Communication), we use a simulated application execution environment and monitor data flow from the application. We use the Android emulator [19] and route the data traffic through Wireshark [20] for packet analysis.

<br/>

### B. Phase 2

The static code analyzer (DroidSafe) examines the source code to report usage of insecure methods in code implementation. The static code analysis enables us to identify occurrences of known threats (listed in table II) in the decompiled source code.

We aim to address this threat to validity by examininga subset of the test applications manually to determine thedetected threats security implication.

A faulty cryptography library or implementation may lead to a vulnerable application. The same is true for the authentication components, as a compromised authentication components can lead to a leak of sensitive user data and let attackers bypass authentication or authorization constraints.

For the manual testing, we locate the cryptography and authentication components in the application by using a hybrid feature location technique [21].

After locating the components responsible for authentication and cryptography function, we examine them for occurrences of threats outlined in Section 2. We report the findings of our manual analysis in Section 4B.

<br/>

## IV. RESULTS

### A. Phase 1

By following the permission-based privacy analysis model [9] we report that all the tested applications required access to the internet.

<br/>

### B. Phase 2

In phase 2, we perform the manual investigation of the source code and determine if the issues detected by static analysis in phase 1 pose any real security threat to the authentication and cryptography component of the application. We examine the four most downloaded cryptocurrency applications and four most download banking and trading applications. We manifest the average results from our testing in table V.

<br/>

<br/>

### References

\[5\] “Owasp mobile security project.” [Online]. Available: https://www.owasp.org/index.php/Mobile Top 10 2016-Top 10

\[6\] “Keychain services.” [Online]. Available: https://developer.apple.com/documentation/security/keychain services

\[10\] L. Li, T. F. Bissyande, M. Papadakis, S. Rasthofer, A. Bartel, D. Octeau, J. Klein, and L. Traon, “Static analysis of android apps: A systematic literature review,” Information and Software Technology, vol. 88, pp.67–95, 2017.

\[11\] M. I. Gordon, D. Kim, J. H. Perkins, L. Gilham, N. Nguyen, and M. C. Rinard, “Information flow analysis of android applications in droidsafe.” in NDSS, vol. 15, 2015, p. 110.

\[12\] A. Desnos and G. Gueguen, “Android: From reversing to decompilation,” Proc. of Black Hat Abu Dhabi, pp. 77–101, 2011.

\[13\] “[patch] add a new option ”-fstack-protector-strong” (patch / doc inside).” [Online]. Available: https://gcc.gnu.org/ml/gcc-patches/2012-06/msg00974.html

\[19\] “Android emulator — android developers.” [Online]. Available: https://developer.android.com/studio/run/emulator

\[20\] A. Nath, Packet Analysis with Wireshark. Packt Publishing Ltd, 2015.

\[21\] W. A. E. C. Razzaq, Abdul and B. Jim, “The state of empirical evaluation in static feature location,” ACM Transaction on Software Engineering Methodology, vol. 28, no. 1, p. TO APPEAR, 2019.

<br/>