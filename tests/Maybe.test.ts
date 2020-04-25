import { Maybe } from '../Maybe'
import 'mocha'
import 'jasmine'

describe( 'Maybe monad', () => {
    it('Should exist', () => {
        expect(Maybe).toBeTruthy()
    })
    it('Left identity should be satisfied', () => {
        const value = 2
        const maybeMonad = Maybe.fromValue(2)
        const mapping = (x: number) => Maybe.fromValue( x * 2)
        expect(maybeMonad.flatMap(mapping)).toEqual(mapping(value))
    })
    it('Right identity should be satisfied', () => {
        const maybeMonad = Maybe.fromValue(2)
        const mapping = (x: number) => Maybe.fromValue(2)
        expect(maybeMonad.flatMap(mapping)).toEqual(maybeMonad);
    })
    it('Associativity law should be satisfied', () => {
        const base = Maybe.fromValue(1)
        const first = (value: number) => Maybe.fromValue(value + 1)
        const second = (value: number) => Maybe.fromValue(value * 2);
        const left = base.flatMap(first).flatMap(second)
        const right = base.flatMap((x: number) => first(x).flatMap(second))
        expect(left).toEqual(right);
    })
})
