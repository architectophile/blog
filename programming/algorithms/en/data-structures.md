# Data Structures

<br/>

## 2. What Are Data Structures?

A data structure is a way of organizing and managing data. We use the concept of data structures almost every single day. For example, we use email everyday. Using an email application like Gmail or Outlook, we organize emails in a vertical list. They might be are ordered by the time they were sent or they were received. You might have a folders like a spam folder, or a folder of important emails. We could use more advanced things like filters, or labels that remove emails that you don't want to see or that show you which emails are relevant to a particular subject. The point is that you are interacting with data in this case, emails, and you are structuring data and organizing it and managing it.

A data structure is a collection of data values, the relationships among them, and the functions or operations that can be applied to the data.

There are a lot of different data structures out there. We are going to cover all the different types of data structures here. The key thing for the context of coding interviews is going to be well-versed in all of the popular foundation of data structures, to know all of these relationships between data values, all of the functions and operations that these data structures support, and to know the benefits and downsides that all of these data structures have.

<br/>

## 3. Complexity Analysis

Complexity analysis is the foundational knowledge that you need to better understand data structures. In turn complexity analysis is sort of like the bedrock of coding interview problems.

It is common that a single problem has multiple solutions. The solutions are not equal. Some solutions are better than others.

### 3.1. What is a better solution?

What makes one solution better than the other is whether or not it has a better complexity. In terms of complexity, we are referring to a very specific computer science concept. they are concept `time complexity` and `space complexity`.

- Time Complexity: the measure of how fast an algorithm or solution runs.
- Space Complexity: the measure of how much memory an algorithm or solution uses up.

When you are comparing two solutions and trying to figuring out which is better, you are really comparing their space-time complexities.

Operations or functions of data structures have time complexity and space complexity ramifications. In other words, to perform an operation or function, on a given data structure, or rather on the underlying set of data values, it is going to take time or it is going to take up memory.
And similarly, the relationships between the data values and a data structures, are going to have time and space complexity ramifications.

There are a lot of data structures that look different and have relationships between the data values. What that means is that different data structures have different time complexity and space complexity ramifications for the operations or functions that they support.

The key thing for you, when you are going to be dealing with a coding interview problem, is not only to figure out wha data structure best allows you to solve the problem, but also what data structure allows you to do so with the best time or space complexities.

<br/>

## 4. Memory

When you write code, and when you execute code, one of the most basic things you do is you declare variables. Behind the scenes, somewhere in you computer the variables should be stored. Because you are going to be referencing the variables later on your code. This is where memory comes into play.

So what is memory? One of my favorite ways to do so is to imagine it as a `canvas`. This canvas lives somewhere in your computer that is bounded and that is divided in a bunch of little slots. So here I've drawn out such a canvas where we've got 20 slots, as they start at zero and we go to 19.

| 0 | 1 | 2 | 3 |
|---|---|---|---|
| 4 | 5 | 6 | 7 |
| 8 | 9 | 10| 11|
| 12| 13| 14| 15|
| 16| 17| 18| 19|

And the key point is that this is a bounded canvas, meaning there is a finite number of slots. Perhaps I should be a little bit more accurate and call these slots `memory slots`. Now why did I repeat the fact that this is a bounded canvas. Because it's actually very important. In the complexity analysis, we said that the less memory an algorithm takes up, the better it is. Why is that the case? Precisely because this memory canvas is bounded. We have a finite number of memory slots. You could imagine that if all of these slots are somehow taken, you would no long have any available memory slots.

Your program will always store a variable in a memory slot that is free. If your program needed more than one memory slot to store a variable, it will store it in back-to-back memory slots.

### 4.1. Byte

But how is memory actually represented? What is the unit that use for memory? It turns out that memory is made up of just what are called `bits`. Bits are zeroes and ones. So you store the data in the form of bits. More specifically one memory slot can hold 8 bits. And that is actually called a `byte`. So when you store data in a memory slot, you actually a byte of data.

### 4.2. How many bytes are needed to store data?

We represent integers, either in 32-bit format, or 64-bit format. In fact, if you come from a C++ background, or Java background, you might know that the type `int` represents a 32-bit integer and the type `long` represents a 64-bit integer. For instance, in Java, when you store integer 1, it will take up 4 bytes which means that our program will need to store it in 4 back-to-back memory slots. Not only you need a free memory slot to store data, ***but you also need back-to-back contiguous free memory slots, if you are going to need multiple slots.***

### 4.3. Endianness

In computing, `endianness` refers to the order of bytes (or sometimes bits) within a binary representation of a number.

A `big-endian` ordering places the most significant byte first and the least significant byte last, a `little-endian` ordering does the opposite.

For example, consider the unsigned hexadecimal number `0x1234`, which requires at least two bytes to represent. In a `big-endian` ordering they would be 0x12 0x34, while in a l`ittle-endian `ordering, the bytes would be arranged 0x34 0x12 (assuming 'first' is on the left).

### 4.4. Pointer

You can actually store in a memory slot the memory address of another memory slot. The slot that stores the memory address is called a `pointer`. With a pointer, you can point a memory slot that is super far away.

### 4.5. Accessing memory slots

Your computer can access all different memory slots directly very quickly. For instance, accessing memory slot 4, memory slot 10, or memory 19 can be done extremely quickly. You can access values in an array at a given index very quickly. It is a very inexpensive operation, so to speak.

<br/>

<br/>

---

### References

\[1\] *ESLint. (?). [Data Structures][2] [Web Tutorial]*

[1]:https://www.algoexpert.io/data-structures

<br/>

### Hashtags

`#data structures` `#data structure` `#complexity analysis` `#bounded memory` `#address memory` `#computer memory` `#byte` `#bit` `#integer` `#32-bit integer` `#memory structure` `#time complexity` `#space complexity`

<br/>

<br/>

© 2020, Byeongcheol Yoo. All rights reserved.




