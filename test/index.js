import { strictEqual, deepStrictEqual } from 'assert';
import { encodeKey, decodeKey } from '../index.js';

strictEqual(encodeKey('some key'), 'some key');
strictEqual(encodeKey(300), 'n:300');
strictEqual(encodeKey(new Date(0)), 'd:1970-01-01T00:00:00.000Z');
strictEqual(encodeKey(['foo', 'bar']), '<foo|bar>');
strictEqual(encodeKey(['foo', [1, 2]]), '<foo|<n:1|n:2>>');
strictEqual(encodeKey('with|re<served>'), 's:with%7Cre%3Cserved%3E');
strictEqual(encodeKey('e:vil'), 's:e%3Avil');
strictEqual(encodeKey(new Uint8Array([255, 255])), 'b:__8');
strictEqual(encodeKey(new TextEncoder().encode('foobar')), 'b:Zm9vYmFy');
strictEqual(encodeKey([new Uint8Array([255, 255]), new TextEncoder().encode('bar')]), '<b:__8|b:YmFy>');

deepStrictEqual(decodeKey('some key'), 'some key');
deepStrictEqual(decodeKey('n:300'), 300);
deepStrictEqual(decodeKey('d:1970-01-01T00:00:00.000Z'), new Date(0));
deepStrictEqual(decodeKey('<foo|bar>'), ['foo', 'bar']);
deepStrictEqual(decodeKey('<foo|<n:1|n:2>>'), ['foo', [1, 2]]);
deepStrictEqual(decodeKey('s:with%7Cre%3Cserved%3E'), 'with|re<served>');
deepStrictEqual(decodeKey('s:e%3Avil'), 'e:vil');
deepStrictEqual(decodeKey('b:__8'), new Uint8Array([255, 255]).buffer);
deepStrictEqual(decodeKey('b:Zm9vYmFy'), new TextEncoder().encode('foobar').buffer);
deepStrictEqual(decodeKey('<b:__8|b:YmFy>'), [new Uint8Array([255, 255]).buffer, new TextEncoder().encode('bar').buffer]);
