var Calendar = function(){}

Calendar.prototype.setMonth = function(month){

  var months = new Array('Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro');

  return months[month-1];

}

Calendar.prototype.getDaysInMonth = function(month, year){
  return new Date(year, month, 0).getDate();
}

Calendar.prototype.build = function(month, year, fertPeriod){

  var days          = this.getDaysInMonth(month, year),
      currentDate   = new Date(year, (month-1), 1),
      firstDay      = currentDate.getDay(),
      blankDays     = firstDay,            
      objHTML       = {},
      objDays       = {},
      dateAtribute  = '',
      day           = '',
      classDay      = '',
      period        = fertPeriod;    

  for(var i = 1; i <= (days+blankDays); i++){

      if(i > blankDays){

        dateAtribute = (i - blankDays) + "/" + month + "/" + year;
        day = (i - blankDays);

      }else{

        dateAtribute = "";
        day = "";

      }
      
      bla = new Date(year, (month-1), day);
      bla = bla.setDate(bla.getDate());

      if(bla >= period.fertPeriodInit && bla <= period.fertPeriodEnd){

        if(period.fertDay == bla){

          classDay = "fertDay";

        }else{

          classDay = "periodFertDay";

        }

      }else{

        classDay = "normal";      

      }

      objDays[i] = {
          day     : day, 
          date    : dateAtribute, 
          detail  : classDay
        };
  }

  objHTML.janeiro = {
        month : {monthNumber : month +'/'+ year, monthText : this.setMonth(month)},
        days  : objDays
      }
    
  return objHTML;

  /*if(_target < (boxDay.length-1)){
    this.build(month+1, year, _target+1);
  }*/

}

var periodCounter = 1;

PeriodController = function(){};

PeriodController.prototype.add = function(data){

}

PeriodController.prototype.view = function(data, callback){

  if(data.date){

    var period = this.calcPeriod(data);
    
    callback(null, period);

  }else{

    var period = this.calcPeriod({
      date: "01/01/2013", cicle: 28}
      );

    callback(null, period);    

  } 

}

PeriodController.prototype.calcPeriod = function(data){  

  var d   = data.date.split("/"),
      dia = d[0],
      mes = d[1],
      ano = d[2];

  var cicle   = data.cicle,
      qtDays;

  if(cicle == 28){
    qtDays = 14;
  }else if(cicle == 34){
    qtDays = 17;
  }

  var dt          = new Date(ano, (parseInt(mes)-1), dia),
      fertPeriod  = {
        fertDay       : dt.setDate(dt.getDate() + qtDays),
        fertPeriodInit: dt.setDate(dt.getDate() - 2),
        fertPeriodEnd : dt.setDate(dt.getDate() + 4)
      }

  var calendar = new Calendar();

  return calendar.build(mes, ano, fertPeriod);

};

PeriodController.prototype.findAll = function(){

};

PeriodController.prototype.findById = function(id, callback) {
 
};

PeriodController.prototype.save = function(periods, callback) {
  

};

exports.PeriodController = PeriodController;