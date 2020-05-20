# [Regex] Cheat Sheet

<br/>

## 1. Anchors

| Character | Description   |
|-----------|---------------|
| ^         | Start of string, or start of line in multi-line pattern |
| \A        | Start of string     |
| $         | End of string, or end of line in multi-line pattern |
| \Z        | End of string       |
| \b        | Word boundary       |
| \B        | Not word boundary   |
| \<        | Start of word       |
| \>        | End of word         |

<br/>

## 2. Character Classes

| Character | Description   |
|-----------|---------------|
| \c        | Control character |
| \s        | White space       |
| \S        | Not white space   |
| \d        | Digit             |
| \D        | Not digit         |
| \w        | Word              |
| \W        | Not word          |
| \x        | Hexade­cimal digit |
| \O        | Octal digit       |

<br/>

## 3. Quantifiers

| Character | Description   |
|-----------|---------------|
| *         | 0 or more     |
| +         | 1 or more     |
| ?         | 0 or 1        |
| {3}       | Exactly 3     |
| {3,}      | 3 or more     |
| {3,5}     | 3, 4 or 5     |

<br/>

## 4. Groups and Ranges

| Character | Description   |
|-----------|---------------|
| .         | Any character except new line (\n)  |
| (a\|b)    | a or b                              |
| (...)     | Group                               |
| (?:...)   | Passive (non-c­apt­uring) group       |
| [abc]     | Range (a or b or c)                 |
| [^abc]    | Not (a or b or c)                   |
| [a-q]     | Lower case letter from a to q       |
| [A-Q]     | Upper case letter from A to Q       |
| [0-7]     | Digit from 0 to 7                   |
| \x        | Group/­sub­pattern number "­x"         |

<br/>

## 5. Escape Sequences

| Character | Description   |
|-----------|---------------|
| \         | Escape following character  |
| \Q        | Begin literal sequence      |
| \E        | End literal sequence        |

<br/>

## 6. Pattern Modifiers

| Character | Description   | 
|-----------|---------------|
| g         | Global match  |
| i *       | Case-i­nse­nsitive  |
| m *       | Multiple lines    |
| s *       | Treat string as single line |
| x *       | Allow comments and whitespace in pattern  |
| e *       | Evaluate replac­ement |
| U *       | Ungreedy pattern     |

<br/>

## 7. Special Characters

| Character | Description   |
|-----------|---------------|
| \n        | New line      |
| \r        | Carriage return |
| \t        | Tab           |
| \v        | Vertical tab  |
| \f        | Form feed     |
| \xxx      | Octal character xxx |
| \xhh      | Hex character hh    |

<br/>

## 8. String Replac­ement

| Character | Description   |
|-----------|---------------|
| $n        | nth non-pa­ssive group       |
| $2        | "­xyz­" in /^(abc­(xy­z))$/     |
| $1        | "­xyz­" in /^(?:a­bc)­(xyz)$/   |
| $`        | Before matched string       |
| $'        | After matched string        |
| $+        | Last matched string         |
| $&        | Entire matched string       |

<br/>

## 9. POSIX

| Character | Description   |
|-----------|---------------|
| [:upper:] | Upper case letters  |
| [:lower:] | Lower case letters  |
| [:alpha:] | All letters         |
| [:alnum:] | Digits and letters  |
| [:digit:] | Digits              |
| [:xdigit:]| Hexade­cimal digits  |
| [:punct:] | Punctu­ation         |
| [:blank:] | Space and tab       |
| [:space:] | Blank characters    |
| [:cntrl:] | Control characters  |
| [:graph:] | Printed characters  |
| [:print:] | Printed characters and spaces   |
| [:word:]  | Digits, letters and underscore  |

<br/>

## 10. Assertions

| Character | Description   |
|-----------|---------------|
| ?=        | Lookahead assertion       |
| ?!        | Negative lookahead        |
| ?<=       | Lookbehind assertion      |
| ?!= or ?<!| Negative lookbehind       |
| ?>        | Once-only Subexp­ression   |
| ?()       | Condition [if then]       |
| ?()\|     | Condition [if then else]  |
| ?#        | Comment                   |

<br/>

## 11. Basic Examples

| Regex             | Matches any string that   |
|-------------------|---------------------------|
| hello	            | contains {hello} |
| gray\|grey	        | contains {gray, grey} |
| gr(a\|e)y	        | contains {gray, grey} |
| gr[ae]y	          | contains {gray, grey} |
| b[aeiou]bble	    | contains {babble, bebble, bibble, bobble, bubble} |
| [b-chm-pP]at\|ot  | contains {bat, cat, hat, mat, nat, oat, pat, Pat, ot} |
| colou?r	          | contains {color, colour} |
| rege(x(es)?\|xps?)| contains {regex, regexes, regexp, regexps} |
| go*gle	          | contains {ggle, gogle, google, gooogle, goooogle, ...} |
| go+gle	          | contains {gogle, google, gooogle, goooogle, ...} |
| g(oog)+le	        | contains {google, googoogle, googoogoogle, googoogoogoogle, ...} |
| z{3}	            | contains {zzz} |
| z{3,6}	          | contains {zzz, zzzz, zzzzz, zzzzzz} |
| z{3,}	            | contains {zzz, zzzz, zzzzz, ...} |
| [Bb]rainf\\\*\\\*k| contains {Brainf\*\*k, brainf\*\*k} |
| \d	      | contains {0,1,2,3,4,5,6,7,8,9} |
| \d{5}(-\d{4})?	  | contains a United States zip code |
| 1\d{10}	          | contains an 11-digit string starting with a 1 |
| [2-9]\|[12]\d\|3[0-6] | contains an integer in the range 2..36 inclusive |
| Hello\nworld	    | contains Hello followed by a newline followed by world |
| mi.....ft	        | contains a nine-character (sub)string beginning with mi and ending with ft (Note: depending on context, the dot stands either for “any character at all” or “any character except a newline”.) Each dot is allowed to match a different character, so both microsoft and minecraft will match. |
| \d+(\.\d\d)?	    | contains a positive integer or a floating point number with exactly two characters after the decimal point. |
| [^i*&2@]	        | contains any character other than an i, asterisk, ampersand, 2, or at-sign. |
| //[^\r\n]*[\r\n]	      | contains a Java or C# slash-slash comment |
| ^dog	            | begins with "dog" |
| dog$	            | ends with "dog"   |
| ^dog$	            | is exactly "dog"  |

<br/>

<br/>

---

### References

\[1\] *DaveChild from Cheatography. (2011, Nov 28). [Regular Expressions Cheat Sheet](https://cheatography.com/davechild/cheat-sheets/regular-expressions/) [Web Document]*

\[2\] *LMU Computer Science. (?). [Regular Expressions](https://cs.lmu.edu/~ray/notes/regex/) [Web Document]*

<br/>

---

### Hashtags

`#regex` `#regexs` `#regular expression` `#regular expressions` `#cheat sheet` `#정규식`