import { expect, test } from 'vitest'
import { sum, hello } from '../components/sample.js'

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
})

test('Greet user', () => {
    expect(hello("1, 2")).toBe("1, 2")
})