import { Maybe } from '../Maybe'

interface Person {
    name: string;
    age: number;
    someOptional?: Maybe<string>
}

const person: Person = {
    name: 'Andre',
    age: 33,
    someOptional: Maybe.fromValue('test')
}

const anotherPerson: Person = {
    name: 'Sandra',
    age: 34,
    someOptional: Maybe.fromValue(null)
}

const listOfPersons = [person, anotherPerson]

const findByName = (name: string): Maybe<Person> => {
    const result = listOfPersons
        .filter((p: Person) => p.name === name)
    return Maybe.fromValue(result[0]);
}

const getOptionalFromPerson = (name: string): Maybe<string> => {
    const result = listOfPersons.filter((p: Person) => p.name === name)
    return Maybe.fromValue(result[0])
        .flatMap((person) => person.someOptional)
}

console.log(findByName('Sandra')
    .getOrElse(() => 'not found'));
console.log(findByName('Stuff')
    .getOrElse(() => 'not found'));
console.log(getOptionalFromPerson('Andre')
    .getOrElse(() => 'not found'))
console.log(getOptionalFromPerson('Sandra')
    .getOrElse(() => 'not found'))