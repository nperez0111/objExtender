"use strict";
const isFunc = require( 'is-function' ),
    isObj = require( 'is-object' ),
    mapObj = require( 'map-obj' ),
    isCorrectType = obj => {
        return Object.keys( obj ).map( key => {

            return obj[ key ]

        } ).map( val => {

            if ( isObj( val ) ) {

                return isCorrectType( val )

            }

            return isFunc( val )

        } ).every( isTrue => {

            return isTrue

        } );

    },
    mapToSymbols = ( obj ) => {

        return mapObj( obj, ( key, val ) => {

            if ( isObj( val ) ) {

                return [ key, mapToSymbols( val ) ];

            }

            return [ key, Symbol.for( key ) ];

        } )

    },
    funcBinder = ( obj, symbols, toBeBound ) => {

        return mapObj( obj, ( key, val ) => {

            if ( isObj( val ) ) {

                return [ key, funcBinder( val, symbols[ key ], toBeBound ) ]

            }

            return [ key, function () {

                let that = this,
                    args = Array.from( arguments )
                if ( module.exports.settings.getHelperMethod ) {
                    args.unshift( function ( query ) {

                        if ( that.hasOwnProperty( query ) ) {

                            return that[ query ]

                        }
                        if ( query === undefined ) {

                            return that

                        }

                        return undefined

                    } )
                }

                return val.apply( this, args )

            } ]

        } )

    }

module.exports = ( objToExtendWith, options ) => {

    if ( !isCorrectType( objToExtendWith ) ) {

        return false;

    }

    if ( options ) {

        module.exports.settings = Object.assign( {}, module.exports.settings, options );

    }

    let symbols = mapToSymbols( objToExtendWith ),
        vals = funcBinder( objToExtendWith, symbols )

    Object.keys( vals ).forEach( function ( key ) {

        module.exports.settings.toExtend.prototype[ symbols[ key ] ] = vals[ key ]

    } )
    reset();
    return symbols;
}

function reset() {
    module.exports.settings = {
        getHelperMethod: true,
        toExtend: Object
    };
}
reset();
