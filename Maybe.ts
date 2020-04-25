export class Maybe<T> {

    private constructor (private value: T | null){}

    static some<T>(value: T): Maybe<T> {
        if(!value) {
            throw Error("Provide some value!");
        }
        return new Maybe<T>(value);
    }

    static none<T>(): Maybe<T> {
        return new Maybe<T>(null);
    }

    static fromValue<T>(value: T): Maybe<T> {
        return value ? Maybe.some(value) : Maybe.none();
    }

    getOrElse<R>(fn:() => R): T | R {
        if(this.value === null) {
            return fn();
        } else {
            return this.value
        }
    }

    map<R>(fn:(boxed: T) => R): Maybe<R> {
        if(this.value === null) {
            return Maybe.none();
        } else {
            return Maybe.fromValue(fn(this.value))
        }
    }
    
    flatMap<R>(fn:(boxed: T) => Maybe<R>): Maybe<R> {
        if(this.value === null) {
            return Maybe.none<R>();
        } else {
            return fn(this.value);
        }
    }
}