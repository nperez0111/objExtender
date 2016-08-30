import test from 'ava';
import fn from './';

test( 'Prototype is Set', t => {
    let please = fn( {
            get: function () {
                return true;
            }
        } ),
        x = {};
    t.true( x[ please.get ]() );
} );

test( 'Working This Reference', t => {
    let please = fn( {
            grabX: function () {
                return this.x;
            }
        } ),
        x = {
            x: true
        };
    t.true( x[ please.grabX ]() );
} );

test( 'Working get Helper Method', t => {
    let please = fn( {
            grabX: function ( get ) {
                return get( 'x' );
            }
        } ),
        x = {
            x: true
        };
    t.true( x[ please.grabX ]() );
} );

test( 'Working disabled get Helper Method', t => {
    fn.settings.getHelperMethod = false;
    let please = fn( {
            grabX: function ( get ) {
                return get === undefined;
            }
        } ),
        x = {};
    t.true( x[ please.grabX ]() );
    fn.settings.getHelperMethod = true;
    t.false( x[ please.grabX ]() );
} );

test( 'Working extension of prototypes of other types of objects', t => {


    let x = function () {
        this.x = true
    };
    fn.settings.toExtend = x;
    let please = fn( {
        grabX: function ( get ) {
            return get( 'x' );
        }
    } )

    t.true( ( new x() )[ please.grabX ]() );
} );
