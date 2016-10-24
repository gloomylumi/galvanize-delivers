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
  var newTableRow = $( "#shoppingCart :last-child" );
  // var newTitle = $( "#shoppingCart tr:last-child :first-child" );
  // var newPrice = $( "#shoppingCart tr:last-child :last-child" );

  // **** variables ****
  var menuTitles = [];
  menuTitles = createKeyArr( cardTitleDivs );
  var menuPrices = [];
  menuPrices = createPriceArr( cardTitlePs );
  var menuObj = {};
  menuObj = createMenuObject( menuTitles, menuPrices );
  var menuItem = {};
  var index;
  var orderPrices = [];

  // **** event listeners ****
  $( "#royaleButton" ).click( itemClicked );

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

  // function addItemToCart( index ) {
  //   console.log( "adding to cart" );
  //   var titleData = menuTitles[ index ];
  //   var priceData = menuPrices[ index ];
  //   $( shoppingCart ).append( '<tr></tr>' );
  //   console.log( $( shoppingCart ) );
  //   $( "#shoppingCart :last-child" ).append( 'td' );
  //   $( "#shoppingCart tr:last-child :first-child" ).text( titleData );
  //   console.log( $( "#shoppingCart tr:last-child :first-child" ) );
  //   $( newTableRow ).append( 'td' ).text( priceData );
  //   // $( newPrice ).text( priceData );
  // }
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
  }

  function itemClicked() {
    console.log( event.target.id );

    var button = event.target.id;
    switch ( button ) {
      case "royaleButton":
        console.log( "switched" );
        index = 0;
        break;
      default:

    }

    return addItemToCart( index );
  }






} );
