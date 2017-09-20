# objExtender [![Build Status](https://travis-ci.org/nperez0111/objExtender.svg?branch=master)](https://travis-ci.org/nperez0111/objextender)

> Extends the Object Prototype safely using ES6 Symbols

This small utility library allows you to extend the Object prototype safely to put methods that all objects will be guarenteed to have (since it is an extension of the Object Prototype which all Objects inherit from).

## Install

```
$ npm install --save objextender
```


## Usage

```js
const extend = require( 'objextender' );

let get = extend( {

    keys: function () {

        return Object.keys( this )

    }

} )

let x = {
    a: 1,
    b: 2
}

x[ get.keys ]()
//=> [ 'a', 'b' ]
```


## API

### objextender(input, [options])

#### input

Type: `object`

`input` must be in a format where the values of any given key is a `function`

#### options

##### getHelperMethod

Type: `boolean`<br>
Default: `true`

This allows you to choose whether you would like the provided get helper method which allows you to do this:

```js
let please = extend( {

    grabX: function ( get ) {

        return get( 'x' );

    }

} )

let y = {
    x: 34
}

y[ please.grabX ]()
//=> 34
```
##### toExtend

Type: `object(but really a class)`<br>
Default: `Object (the class)`

This allows you to choose what object you would like to be extending the prototype of safely. Like so:

```js
let classyClass = function () {
        this.x = 'magic'
    };

let please = fn( {
        grabX: function ( get ) {
            return get( 'x' );
        }
    }, {
        toExtend: classyClass
    } )
    
let objectOfClass = new classyClass();
    
objectOfClass[ please.grabX ]()
//=> 'magic'
```



## License

MIT © [Nick The Sick](http://nickthesick.com)
