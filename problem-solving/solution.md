# Is A Palindrome String

## Thought Process
- A palindrome string is a string that reads the same forwards and backwards.
- So to check if a string is a palindrome, we need to compare the two halves of the string.
- If the string is of odd length, we can ignore the middle character.
- we can loop from the start of the string to the middle of the string and compare the characters at the start and end of the string.
- this can be done in `O(n)` time complexity. I will loop n/2 times but I will be index two characters at a time, so the time complexity is `O(n)`.
- The space complexity is `O(1)` because I am not using any extra space.
- I simpler approach would be to use a stack to reverse the string and compare while looping only once.
- first step would be to fill the stack by looping through the first half of the string.
- ignore the middle character if the string is of odd length.
- then loop through the second half of the string and compare the characters with the characters in the stack.
- if one character does not match, then the string is not a palindrome, and we don't need to continue looping.
- this approach has a time complexity of `O(n)` and a space complexity of `O(n)`.
- I will implement the first approach because it has a better space complexity.

## Pseudocode Solution
```
function isPalindromeString(s: string): boolean
    n = s.length
    for i = 0 to n/2
        if s[i] != s[n-i-1]
            return false
    return true
```

## Complexity Analysis
The time complexity is `O(n)` because we loop through the string once and compare the characters at the start and end of the string.
The space complexity is `O(1)` because we are not using any extra space.

## Alternative Solutions
An alternative solution would be to use a stack to reverse the string and compare while looping only once.
The time complexity of this approach is `O(n)` and the space complexity is `O(n)`.
