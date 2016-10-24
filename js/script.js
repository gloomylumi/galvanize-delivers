"use strict";
$( document ).ready( function() {
  console.log( "ready" );
  console.log( $( ".card-title" ) );
  console.log( $( ".card-title ~ p" ) );
  console.log( $( ".card-action :first-child" ) );
  // **** selector variables ****
  var cardTitleDivs = $( ".card-title" );
  var cardTitlePs = $( ".card-title ~ p" );
  var shoppingCart = $( "#shoppingCart" );


  // **** variables ****
  var menuTitles = [];
  menuTitles = createKeyArr( cardTitleDivs );
  var menuPrices = [];
  menuPrices = createPriceArr( cardTitlePs );
  var menuObj = {};
  menuObj = createMenuObject( menuTitles, menuPrices );
  var index;
  var orderPrices = [];

  // **** event listeners ****
  $( "#royaleButton" ).click( itemClicked );
  $( "#arugulaPieButton" ).click( itemClicked );
  $( "#smokedSwineButton" ).click( itemClicked );
  $( "#iceCreamBiscuitButton" ).click( itemClicked );
  $( "#submitButton" ).click( submitValidation );
  // **** functions ****
  function createKeyArr( cardTitleDivs ) {
    // creates an array with menu item titles - array will be used to create keys for menu object
    for ( var i = 0; i < cardTitleDivs.length; i++ ) {
      menuTitles.push( cardTitleDivs[ i ].innerText );
    }
    console.log( menuTitles );
    return menuTitles;
  }

  function createPriceArr( cardTitlePs ) {
    // creates an array with menu item prices - array will be used to create values for menu object
    for ( var i = 0; i < cardTitlePs.length; i++ ) {
      menuPrices.push( cardTitlePs[ i ].innerText );
    }
    console.log( menuPrices );
    return menuPrices;
  }

  function createMenuObject( menuTitles, menuPrices ) {
    for ( var i = 0; i < menuTitles.length; i++ ) {
      var tempObj = {};
      var key = menuTitles[ i ];
      var value = menuPrices[ i ];
      tempObj[ key ] = value;
      menuObj[ i ] = tempObj;
    }
    console.log( menuObj );
    return menuObj;
  }

  function itemClicked() {
    console.log( event.target.id );

    var button = event.target.id;
    switch ( button ) {
      case "royaleButton":
        index = 0;
        break;
      case "arugulaPieButton":
        index = 1;
        break;
      case "smokedSwineButton":
        index = 2;
        break;
      case "iceCreamBiscuitButton":
        index = 3;
        break;
      default:
        console.log( "uh oh, you got problems" );
    }
    return addItemToCart( index );
  }

  function addItemToCart( index ) {
    var newRow = document.createElement( 'tr' );
    $( shoppingCart ).append( newRow );
    var newPrice = document.createElement( 'td' );
    $( newPrice ).addClass( "right-align" );
    orderPrices.push( parseFloat( ( menuPrices[ index ] ).substring( 1 ) ) );
    console.log( orderPrices );
    newPrice.innerText = menuPrices[ index ];
    var newTitle = document.createElement( 'td' );
    newTitle.innerText = menuTitles[ index ];
    newRow.appendChild( newTitle );
    newRow.appendChild( newPrice );
    updateTotals( orderPrices );
  }

  function updateTotals( orderPrices ) {
    var subtotal = 0;
    var tax = 0;
    var total = 0;
    for ( var i = 0; i < orderPrices.length; i++ ) {
      subtotal += orderPrices[ i ];
    }
    tax = ( subtotal * 0.029 );
    total = subtotal + tax;
    $( "#subtotal" ).text( "$" + subtotal );
    $( "#tax" ).text( "$" + tax.toFixed( 2 ) );
    $( "#total" ).text( "$" + total.toFixed( 2 ) );
  }

  function submitValidation() {
    console.log( $( "#name" ) );
    console.log( $( "#phone" ).text() );
    console.log( $( "#address" ).text() );
    console.log( orderPrices );
    if ( $( "#name" ).hasClass( "valid" ) && $( "#phone" ).hasClass( "valid" ) && $( "#address" ).hasClass( "valid" ) ) {
      if ( orderPrices !== [] ) {
        return Materialize.toast( "Order successfully placed!", 4000 );
      } else {
        return Materialize.toast( "Whoops! You didn't order anything!", 4000 );
      }
    } else {
      return Materialize.toast( "Please fill in all information.", 4000 );
    }
  }






} );
