# objExtender [![Build Status](https://travis-ci.org/nperez0111/objExtender.svg?branch=master)](https://travis-ci.org/nperez0111/objextender)

> Extends the Object Prototype safely using ES6 Symbols


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



## License

MIT © [Nick The Sick](http://nickthesick.com)
