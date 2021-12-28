Clearing The Input Buffer In C/C++
What is a buffer?
A temporary storage area is called buffer. All standard input and output devices contain an input and output buffer. In standard C/C++, streams are buffered, for example in the case of standard input, when we press the key on keyboard, it isn’t sent to your program, rather it is buffered by operating system till the time is allotted to that program.


How does it effect Programming?
On various occasions you may need to clear the unwanted buffer so as to get the next input in the desired container and not in the buffer of previous variable. For example, in case of C after encountering “scanf()” , if we need to input a character array or character ,and in case of C++, after encountering“cin” statement, we require to input a character array or a string , we require to clear the input buffer or else the desired input is occupied by buffer of previous variable, not by the desired container.On pressing “Enter” (carriage return) on output screen after the first input , as the buffer of previous variable was the space for new container(as we did’nt clear it) , the program skips the following input of container.

In case of C Programming


tornado711

https://www.geeksforgeeks.org/clearing-the-input-buffer-in-cc/