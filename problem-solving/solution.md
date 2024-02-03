# Is A Palindrome String

## Thought Process
- A palindrome string is a string that reads the same forwards and backwards.
- So to check if a string is a palindrome, we need to compare the two halves of the string.
- We also need to ignore any non-alphanumeric characters and ignore the case of the characters.
- one solution would be to reverse the string and compare it with the original string. But this would take `O(n)` space. and `O(2n)` time.
- Another solution could be to loop through have the string and compare the characters at the start and end of the string. This would take `O(n)` time and `O(1)` space, but the non-alphanumeric characters and case sensitivity would need to be handled somehow.
- A good solution would be to use a stack to reverse the string and compare while looping only once. This would take `O(n)` time and `O(n)` space. pretty good. 
- Maybe a better solution would be to have 2 pointers, one at the start and one at the end. And loop through the string comparing the characters at the start and end of the string. This would take `O(n)` time and `O(1)` space since we are not using any extra space.
- If a pointer meets a non-alphanumeric character, it should skip it and continue to the next character.

## Pseudocode Solution (2 pointer approach)
```
function isPalindrome(s: string): boolean
  let start = 0
  let end = s.length - 1
  while start < end
    if !isAlphanumeric(s[start])
      start++
      continue
    if !isAlphanumeric(s[end])
      end--
      continue
    if toLowerCase(s[start]) !== toLowerCase(s[end])
      return false
    start++
    end--
  return true
```

## Complexity Analysis
The time complexity of this approach is `O(n)` and the space complexity is `O(1)`.

## Alternative Solutions And Complexity Analysis
- Using a stack to reverse the string and compare while looping only once. This would take `O(n)` time and `O(n)` space.
- Reverse the string and compare it with the original string. This would take `O(n)` time and `O(2n)` space.
- Loop through have the string and compare the characters at the start and end of the string. This would take `O(n)` time and `O(1)` space, but the non-alphanumeric characters and case sensitivity would need to be handled somehow. The 2 pointer approach is a better version of this solution.
```
