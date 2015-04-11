'use strict';

$(document).ready(init);

function init(){
  $('#getRandom').click(getRandom);
}

function getRandom(){
  var number = $('#number').val();
  $.getJSON('https://qrng.anu.edu.au/API/jsonI.php?length=' + number + '&type=uint16', function(response){
    $('#sum').text(sum(response.data));
    $('#min').text(min(response.data));
    $('#max').text(max(response.data));
    displayRoots(response.data);
  });
}

function displayRoots(numbers){
  var roots = numbers.map(function(n){
    return Math.sqrt(n);
  });

  var divs = roots.map(function(r, i){
    var $div = $('<div>');
    $div.addClass('root');

    var $div1 = $('<div>');
    $div1.text(numbers[i]);
    var color = numbers[i]%2 ? 'green' : 'red';
    $div1.css('background-color', color);

    var $div2 = $('<div>');
    $div2.text(r);
    color = parseInt(r)%2 ? 'blue' : 'pink';
    $div2.css('background-color', color);

    $div.append($div1, $div2);

    return $div;
  });

  $('#roots').empty().append(divs);
}

function max(numbers){
  return _.max(numbers);
}

function min(numbers){
  return _.min(numbers);
}

function sum(numbers){
  var total = 0;

  for(var i = 0; i < numbers.length; i++){
    total += numbers[i];
  }

  return total;
}
