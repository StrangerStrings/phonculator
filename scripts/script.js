$( document ).ready(function() {

var clickable = true;

var state0 = true;
var state1 = false;
var state2 = false;
var state3 = false;
var state4 = false;

var answer = '';


$('.sun').click(function(){
  $('.sunshine').addClass('enlarge2');
  setTimeout(function(){
    $('.bubbles-div').empty();
    $('.sunshine').removeClass('enlarge2');
    $('.answer').addClass('hidden');
  },800)
  allStatesFalse();
  state0=true;
})


//number
  $('.dial-circle div').click(function(){
    if (!clickable){return;}
    var x = 'rotate' + $(this).attr('class').match(/\d/);
    numberAnimation(x);
    var y = $(this).text();
    setTimeout(function(){
      if(state0){
        $('.bubbles-div').prepend('<div class="questions" >&nbsp;&nbsp;&nbsp;'+y+'</div>');
        allStatesFalse();
        state1 = true;
      }
      else if(state1||state2||state3){
        $('.bubbles-div > :first-child').append(y);
        allStatesFalse();
        state3 = true;
      }
      else if(state4){
        $('.answer').addClass('hidden');
        $('.bubbles-div > :first-child').css({'margin-bottom': '8rem'});
        $('.bubbles-div > :first-child').append('\n=&nbsp;'+answer);
        $('.bubbles-div').prepend('<div class="spacer"></div>');
        $('.bubbles-div').prepend('<div class="questions" >&nbsp;&nbsp;&nbsp;'+y+'</div>')
        allStatesFalse();
        state1=true;
      }
    },1000);

    if(state4){
      $('.bubbles-div > :first-child').animate({
      'margin-bottom': '150rem'}, 700);
    }


  })






//operator
  $('.operator').click(function(){
    if (!clickable){return;}
    var y = $(this).text();

    if(state1||state3){
      operatorAnimation();
      // $('.bubbles-div > :first-child').animate({
      // 'margin-bottom': '32rem'}, 200);
      setTimeout(function(){
        $('.bubbles-div > :first-child').css({'margin-bottom': '8rem'});
        $('.bubbles-div > :first-child').append('\n'+y+'&nbsp;');
        allStatesFalse();
        state2 = true;
      },400)
    }
    else if(state4){
      operatorAnimation();
      $('.bubbles-div > :first-child').animate({
      'margin-bottom': '90rem'}, 320);
      setTimeout(function(){
        $('.bubbles-div > :first-child').css({'margin-bottom': '8rem'});
        $('.answer').addClass('hidden');
        $('.bubbles-div').prepend('<div class="questions" >&nbsp;&nbsp;&nbsp;'+answer+'\n'+y+'&nbsp;</div>');
        allStatesFalse();
        state2 = true;
      },350)
    }
    else{
      // makeUnclickable(300);
      // $('.dial').animate({'top':'300rem'},150,function(){
      //   $('.dial').animate({'top':'0rem'},150);
      // })
    }

  })




//equals
  $('.equals').click(function(){
    if (!clickable){return;}
    if(state3){
      equalsAnimation();
      answer = splitAndCalculate($('.bubbles-div > :first-child').text());
      var displayAnswer = answer;
      var dec = answer.toString().split(/\./);
      if(dec[1]){
        if(dec[1].length > 6){
          dec[1] = dec[1].match(/\d{6}/)+'...';
          displayAnswer = dec.join('.');
        }
      }
      setTimeout(function(){
        $('.answer').removeClass('hidden').text('= '+displayAnswer);
        allStatesFalse();
        state4 = true;
      },1800)
    }
    else{
      //nowt
    }
  })




function splitAndCalculate(z){
  z = z.replace(/\s{3}/,'');
  z = z.split(/\n/g);   //now z is an array
  var z1 = z[0];
  var z2;
  for(i=1; i < z.length ;i++){
    z2 = z[i].split(/\s/);
    if (z2[0]=='+'){
      z1 = z1*1 + z2[1]*1;
    }
    else if (z2[0]=='-'){
      z1 -= z2[1];
    }
    else if (z2[0]=='x'){
      z1 *= z2[1];
    }
    else{
      z1 /= z2[1];
    }
  }
  return z1;
}



function numberAnimation(x){
  makeUnclickable(1000);


  $('.dial').addClass('zindex').addClass('rotated').addClass(x);
  setTimeout(function () {
   $('.dial').removeClass('rotated').removeClass(x);
  }, 400);
  setTimeout(function () {
   $('.dial').removeClass('zindex');
  }, 1000);

  telephoneBobs(650);
}




function operatorAnimation(){
  makeUnclickable(500);
  telephoneBobs(0);
}



function equalsAnimation(){
  makeUnclickable(1000);

  $('.left-handset').addClass('bob');
  setTimeout(function(){
    $('.left-handset').removeClass('bob');
  },220)

  $('.moonshine').addClass('enlarge');
  setTimeout(function () {
   $('.moonshine').removeClass('enlarge');
  }, 700);

 setTimeout(function(){
   $('.sunshine').addClass('enlarge');
   setTimeout(function () {
    $('.sunshine').removeClass('enlarge');
  }, 850);
 },800);
}











  function allStatesFalse(){
    // alert('called');
    state0=false;
    state1=false;
    state2=false;
    state3=false;
    state4=false;
  }


  function telephoneBobs(milliseconds){
    setTimeout(function(){
      $('.left-handset').addClass('bob');

      setTimeout(function(){
        $('.left-handset').removeClass('bob');
      },220)

      setTimeout(function(){
      $('.right-handset').addClass('bob2');
        setTimeout(function(){
          $('.right-handset').removeClass('bob2');
        },220)
      },200)

    },milliseconds)
  }


  function makeUnclickable(milliseconds){
    $('.clickable').addClass('unclickable');
    clickable = false;
    setTimeout(function(){
      $('.clickable').removeClass('unclickable');
      clickable = true;
    },milliseconds)
  }






});
