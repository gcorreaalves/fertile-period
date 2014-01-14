var Calendar = function () {
  this.calendarHTML = null;
}

Calendar.prototype.setMonth = function(month){

  var months = new Array('Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro', 'Janeiro');

  return months[month-1];

}

Calendar.prototype.getDaysInMonth = function(month, year){
  return new Date(year, month, 0).getDate();
}

Calendar.prototype.build = function(month, year, fertPeriod){

  var days           = this.getDaysInMonth(month, year),
      currentDate    = new Date(year, (month-1), 1),
      firstDay       = currentDate.getDay(),
      lastDay        = (6 - new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDay()),
      blankDays      = firstDay,   
      objDays        = {},
      dateAtribute   = '',
      day            = '',
      classDay       = '',
      period         = fertPeriod,
      totalDaysBlank = days+blankDays+lastDay,
      timestamp;

    for(var i = 1; i <= totalDaysBlank; i++){

      if(i > blankDays && i <= (totalDaysBlank-lastDay)){

        var monthTwoChar = month;

        if(month < 10){
          monthTwoChar = "0"+month;
        }

        dateAtribute = (i - blankDays) + "/" + monthTwoChar + "/" + year;
        day = (i - blankDays);

      }else{

        dateAtribute = "";
        day = "";

      }
      
      if(period){

        timestamp = new Date(year, month-1, day);
        timestamp = timestamp.setDate(timestamp.getDate());        

        if(timestamp >= period.fertPeriodInit && timestamp <= period.fertPeriodEnd && day){

          classDay = "periodFertDay";

          if(period.fertDay === timestamp){

            classDay = "fertDay";

          }

        }else{

          classDay = "normal";

          if(period.menstruationDay === timestamp && day){
            
            classDay = "menstruationDay";   

          }

        }

      }

      objDays[i] = {
        day     : day, 
        date    : dateAtribute, 
        detail  : classDay
      };

    }
    
    var monthText = this.setMonth(month);

    this.calendarHTML = {
      month : {monthNumber : month + '/' + year, monthText : monthText},
      days  : objDays
    }
}

Calendar.prototype.getCalendar = function(month, year, fertPeriod){
  
  this.build(month, year, fertPeriod);

  return this.calendarHTML;
}

PeriodController = function(){};

PeriodController.prototype.add = function(data){

}

PeriodController.prototype.view = function(data, callback){

  if(data.date){

    var period        = this.calcPeriod(data),
        calendar      = new Calendar(),
        calendarBuilt = [];      

      for(var i = 0; i < 2; i++){
        calendarBuilt.push(calendar.getCalendar(parseInt(period.month, 10)+i, period.year, period.period));
      }
    
    callback(null, calendarBuilt);

  }else{

    var today = new Date();
    today = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

    var period    = this.calcPeriod({date: today, cicle: 28}),
    calendar      = new Calendar(),
    calendarBuilt = [];

    for(var i = 0; i < 2; i++){
      calendarBuilt.push(calendar.getCalendar(parseInt(period.month, 10)+i, period.year));      
    }
    
    callback(null, calendarBuilt); 

  } 

}

PeriodController.prototype.calcPeriod = function(data){  

  var d   = data.date.split("/"),
      dia = d[0],
      mes = d[1],
      ano = d[2];

  var cicle   = data.cicle,
      qtDays,
      baseCicle = 28,
      baseQtDay = 14;

    qtDays = (cicle - baseCicle) + baseQtDay;

  var dt          = new Date(ano, (parseInt(mes)-1), dia),
      fertPeriod  = {
        menstruationDay : dt.setDate(dt.getDate()),
        fertDay         : dt.setDate(dt.getDate() + qtDays),
        fertPeriodInit  : dt.setDate(dt.getDate() - 2),
        fertPeriodEnd   : dt.setDate(dt.getDate() + 4)
      }

  if(dia == 0){
    return {day : dia, month : mes, year : ano, period : null};
  }

  return {day : dia, month : mes, year : ano, period : fertPeriod};

};

PeriodController.prototype.findAll = function(){

};

PeriodController.prototype.findById = function(id, callback) {
 
};

PeriodController.prototype.save = function(periods, callback) {
  

};

exports.PeriodController = PeriodController;