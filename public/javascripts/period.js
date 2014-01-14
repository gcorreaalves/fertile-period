$(function() { 

  (function(){

    var elements    = $('#banner').find('li'),
      sizeBanners = elements.length,
      banner      = 0;
      lastBanner  = null;

    elements.hide();

    var interval = window.setInterval(changePicture, 5000);
    function changePicture() {                
      elements.eq(lastBanner).fadeOut(1000);
      elements.eq(banner).fadeIn(800);        
      lastBanner = banner;
      if(banner < (sizeBanners-1)){
        banner++;
      }else{
        banner = 0;
      }        
    }

    changePicture();

  })();

  var ajax = function(type, url, data, callback){
    $.ajax({
      type: type,
      url: url,
      data: data
    }).done(function( data ) {
       callback(data);
    });
  };

  $('.ciclo-menstrual').change(function(){
    $('.menstruationDay').find('a').trigger('click');
  });

  $("#calendario").on('click', '.dias a', function(e){
    e.preventDefault();
    var data  = $(this).attr('title'),
        ciclo = $('.ciclo-menstrual').val();
    if(data){
      ajax("GET", "/period/calendar-content", { 'ciclo-menstrual': ciclo, data: data }, function(output){
        $('#calendario').html(output); 
      });
    }
  });

  var controlArrows = function(monthCurrent, monthNext, direction){
    var currentMonth = $('.hidden-month:eq(0)').attr('title').split("/"),
        month        = parseInt(currentMonth[0]),
        year         = parseInt(currentMonth[1]),
        data,
        ciclo        = $('.ciclo-menstrual').val(); 
        if(month === monthCurrent){
          month = monthNext;
          if(direction === 'left'){
            year  = year-1;
          }else{
              year  = year+1;
          }
        }
    if(direction === 'left'){
      data = "00/" + (parseInt(month)-1) + "/" + year;  
    }else{
      data = "00/" + (parseInt(month)+1) + "/" + year;  
    }
    ajax("GET", "/period/calendar-content", { 'ciclo-menstrual': ciclo, data: data }, function(output){
      $('#calendario').html(output); 
    });      
  }

  $('.seta-esquerda').on('click', function(e){        
    e.preventDefault();        
    controlArrows(1, 13, 'left');
  });

  $('.seta-direita').on('click', function(e){        
    e.preventDefault();        
    controlArrows(12, 0, 'right'); 
  });

});