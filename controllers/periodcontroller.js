var Calendar = function(){

  this.months = 2;
  this.calendarHTML = {};

}

Calendar.prototype.setMonth = function(month){

  var months = new Array('Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro');

  return months[month-1];

}

Calendar.prototype.getDaysInMonth = function(month, year){
  return new Date(year, month, 0).getDate();
}

Calendar.prototype.build = function(month, year, fertPeriod, numMonthsCalendar){

  var days          = this.getDaysInMonth(month, year),
      currentDate   = new Date(year, (month-1), 1),
      firstDay      = currentDate.getDay(),
      blankDays     = firstDay,  
      numMonths     = numMonthsCalendar || 1,  
      objDays       = {},
      dateAtribute  = '',
      day           = '',
      classDay      = '',
      period        = fertPeriod,
      timestamp;

    for(var i = 1; i <= (days+blankDays); i++){

      if(numMonths < this.months){

        if(i > blankDays){

          dateAtribute = (i - blankDays) + "/" + month + "/" + year;
          day = (i - blankDays);

        }else{

          dateAtribute = "";
          day = "";

        }

      }else{       

            if(i <= days){

              dateAtribute = (i) + "/" + month + "/" + year;
              day = (i);

            }else{

              dateAtribute = "";
              day = "";

            }
      }
      
      if(period){

        timestamp = new Date(year, month-1, day);
        timestamp = timestamp.setDate(timestamp.getDate());

        if(timestamp >= period.fertPeriodInit && timestamp <= period.fertPeriodEnd){

          if(period.fertDay == timestamp){

            classDay = "fertDay";

          }else{

            classDay = "periodFertDay";

          }

        }else{

          if(period.menstruationDay == timestamp){
            
            classDay = "menstruationDay";   

          }else{
            
            classDay = "normal";      

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

    this.calendarHTML[monthText] = {
      month : {monthNumber : month + '/' + year, monthText : this.setMonth(month)},
      days  : objDays
    }

  if(this.months > numMonths){

    this.build((parseInt(month)+1), year, null, (numMonths + 1));

  }

  //return this.calendarHTML;
}

Calendar.prototype.getCalendar = function(month, year, fertPeriod){
  
  this.build(month, year, fertPeriod, 1);

  return this.calendarHTML;
}

var periodCounter = 1;

PeriodController = function(){};

PeriodController.prototype.add = function(data){

}

PeriodController.prototype.view = function(data, callback){

  if(data.date){

    var period        = this.calcPeriod(data),
        calendar      = new Calendar(),
        calendarBuilt = calendar.getCalendar(period.month, period.year, period.period);
    
    callback(null, calendarBuilt);

  }else{

    var period    = this.calcPeriod({date: "01/01/2013", cicle: 28}),
    calendar      = new Calendar(),
    calendarBuilt = calendar.getCalendar(period.month, period.year);
    
    callback(null, calendarBuilt); 

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
    qtDays = 13;
  }else if(cicle == 34){
    qtDays = 16;
  }

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