import { expect, test } from 'vitest'
import { sum, hello } from '../components/sample.js'
import { describe } from 'node:test'

describe("Testing easy stuff"); {
    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3)
    })
}

describe("Testing greetings"); {
    test('Greet user', () => {
        expect(hello("1, 2")).toBe("1, 2")
    })
}

describe("Testing greetings 2"); {
    test('Greet user', () => {
        expect(hello("1, 2")).toBe("1, 2")
    })
}


test('Greet user', () => {
    expect(hello("1, 2")).toBe("1, 2")
})
