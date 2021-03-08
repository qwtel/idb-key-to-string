# IDB Key to String
A simple string serialization for IndexedDB-like keys.

Many key-value stores only support string-based keys, but in JavaScript we'd like to use (composed) IndexedDB-like keys.

The goal of this format is human readability, minimal tagging, and leaving regular strings unmodified,
so that the most common case carries no extra weight.

For tagging other types, 2 extra characters are used. This is the smallest sensible choice I could think of. 
Perhaps there's cleverer ways than prefixing, but hopefully not a simpler way.

Below are some notable examples:

```ts
'some key'        => 'some key' // (no extra quotes)
300               => 'n:300'
new Date(0)       => 'd:1970-01-01T00:00:00.000Z'
['foo', 'bar']    => '<foo|bar>'
['foo', [1, 2]]   => '<foo|<n:1|n:2>>'
'with|re<served>' => 's:with%7Cre%3Cserved%3E' // URL encoding iff necessary
'e:vil'           => 's:e%3Avil'
```

The last two examples show how strings containing array delimiters 
or conforming to the 2-char tagging schema are processed.

While mostly arbitrary, pointy brackets and pipes (`<`, `>`, `|`) were chosen as delimiters because 
1. they're part of ASCII (occupy single byte),
2. less likely to be found in english text than parens and commas, and
3. not part of stringified JSON (common practice despite being bad-practice!?)

Round-tripping a key will process it according to KV Storage working draft:
<https://wicg.github.io/kv-storage/#key-round-trip>
