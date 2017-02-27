//mongo db
calculations = new Mongo.Collection("calculations");

if (Meteor.isClient)
{
  //Session vars
  Session.set("display", "");
  Session.set("total", "0");
  Session.set("operator", "");
  Session.set("clear", "false");
  Session.set("calcs", "");

  Template.numbers.helpers({
    display : function () { return Session.get("display")}
  });

  Template.calcs.helpers({
    recentCalcs: function() { return calculations.find({}, {sort: {_id: 1}}) }
  });


  Template.keypad.events( {

    "click #btn1" : function() {
      if(Session.get("clear") === "true")
      {
        Session.set("display","");
        Session.set("clear","false");
      }
      Session.set("display",Session.get("display")+"1");
    },
    "click #btn2" : function() {
      if(Session.get("clear") === "true")
      {
        Session.set("display","");
        Session.set("clear","false");
      }
      Session.set("display",Session.get("display")+"2");
    },
    "click #btn3" : function() {
      if(Session.get("clear") === "true")
      {
        Session.set("display","");
        Session.set("clear","false");
      }
      Session.set("display",Session.get("display")+"3");
    },
    "click #btn4" : function() {
      if(Session.get("clear") === "true")
      {
        Session.set("display","");
        Session.set("clear","false");
      }
      Session.set("display",Session.get("display")+"4");
    },
    "click #btn5" : function() {
      if(Session.get("clear") === "true")
      {
        Session.set("display","");
        Session.set("clear","false");
      }
      Session.set("display",Session.get("display")+"5");
    },
    "click #btn6" : function() {
      if(Session.get("clear") === "true")
      {
        Session.set("display","");
        Session.set("clear","false");
      }
      Session.set("display",Session.get("display")+"6");
    },
    "click #btn7" : function() {
      if(Session.get("clear") === "true")
      {
        Session.set("display","");
        Session.set("clear","false");
      }
      Session.set("display",Session.get("display")+"7");
    },
    "click #btn8" : function() {
      if(Session.get("clear") === "true")
      {
        Session.set("display","");
        Session.set("clear","false");
      }
      Session.set("display",Session.get("display")+"8");
    },
    "click #btn9" : function() {
      if(Session.get("clear") === "true")
      {
        Session.set("display","");
        Session.set("clear","false");
      }
      Session.set("display",Session.get("display")+"9");
    },
    "click #btn0" : function() {
      if(Session.get("clear") === "true")
      {
        Session.set("display","");
        Session.set("clear","false");
      }
      Session.set("display",Session.get("display")+"0");
    },
    "click #dotBtn" : function() {
      if(Session.get("clear") === "true")
      {
        Session.set("display","");
        Session.set("clear","false");
      }
      if(Session.get("display").indexOf(".") == -1)
      {
        Session.set("display",Session.get("display")+".");
      }
    },
    "click #clearBtn" : function() {
      Session.set("display","");
    },
    "click #equalsBtn" : function() {
      if(!isNaN(parseFloat(Session.get("display"))))
      {
        //do previous operation
        doCalc();
        //then set operator to empty as calculations have been done
        Session.set("operator","");
        //And finally, add the total to the end of the calcs string as the calculation has been done
        Session.set("calcs", Session.get("calcs") + "=" + parseFloat(Session.get("display")));
        //So that it can be added to the mongo database to be stored persistantly
        calculations.insert({calculation: Session.get("calcs")});
        //now clear the calcs string
        Session.set("calcs","");
      }
    },
    "click #plusBtn" : function() {
      //If there is a number in the display
      if(!isNaN(parseFloat(Session.get("display"))))
      {
        //do previous operation
        doCalc();
        //then set operator to for next calculation
        Session.set("operator","+");
      }
    },
    "click #multiplyBtn" : function() {
      //If there is a number in the display
      if(!isNaN(parseFloat(Session.get("display"))))
      {
        //do previous operation
        doCalc();
        //then set operator to for next calculation
        Session.set("operator","x");
      }
    },
    "click #divideBtn" : function() {
      //If there is a number in the display
      if(!isNaN(parseFloat(Session.get("display"))))
      {
        //do previous operation
        doCalc();
        //then set operator to for next calculation
        Session.set("operator","/");
      }
    },
    "click #modBtn" : function() {
      //If there is a number in the display
      if(!isNaN(parseFloat(Session.get("display"))))
      {
        //do previous operation
        doCalc();
        //then set operator to for next calculation
        Session.set("operator","%");
      }
    },
    "click #minusBtn" : function() {
      //if display is to be cleared on next button click
      if(Session.get("clear") === "true")
      {
        Session.set("display","");
        Session.set("clear","false");
      }
      //If there is no number in the display and minus is clicked its going to be a negative number
      if(Session.get("display") === "")
      {
        //- is to be added to beginning of number to make it a negative
        Session.set("display","-");
        //set clear to false in case it is true so that next number doesnt clear
        Session.set("clear","false");
      }
      //else If there is a number in the display its going to do a minus calculation
      else if(!isNaN(parseFloat(Session.get("display"))))
      {
        //do previous operation
        doCalc();
        //then set operator to for next calculation
        Session.set("operator","-");
      }
    }

  });

  function doCalc()
  {
    if(Session.get("operator") === "")
    {
      //As the operator is empty no calculation need to be down, total will just equal whats in the display
      Session.set("total",parseFloat(Session.get("display")));
      //Now add it to the calcs string
      Session.set("calcs", Session.get("calcs")+parseFloat(Session.get("display")));
    }
    else if(Session.get("operator") === "-")
    {
      //As operator is - a negative calculation must be done to the current total
      Session.set("total",parseFloat(Session.get("total")) - parseFloat(Session.get("display")));
      //Now add it to the calcs string along with the current operator
      Session.set("calcs", Session.get("calcs") + Session.get("operator") +parseFloat(Session.get("display")));
      //finally, display the total
      Session.set("display",Session.get("total"));
    }
    else if(Session.get("operator") === "+")
    {
      //As the operator is + an addition must be done to the current total
      Session.set("total",parseFloat(Session.get("total")) + parseFloat(Session.get("display")));
      //Now add it to the calcs string along with the operator
      Session.set("calcs", Session.get("calcs") + Session.get("operator") +parseFloat(Session.get("display")));
      //Finally, display total
      Session.set("display",Session.get("total"));
    }
    else if(Session.get("operator") === "x")
    {
      //As the operator is x multiplication must be done to the current total
      Session.set("total",parseFloat(Session.get("total")) * parseFloat(Session.get("display")));
      //Now add it to the calcs string along with the operator
      Session.set("calcs", Session.get("calcs") + Session.get("operator") +parseFloat(Session.get("display")));
      //Finally, display total
      Session.set("display",Session.get("total"));
    }
    else if(Session.get("operator") === "/")
    {
      //Division operator so division must be done
      Session.set("total",parseFloat(Session.get("total")) / parseFloat(Session.get("display")));
      //Now add it to the calcs string along with the operator
      Session.set("calcs", Session.get("calcs") + Session.get("operator") +parseFloat(Session.get("display")));
      //Finally, display total
      Session.set("display",Session.get("total"));
    }
    else if(Session.get("operator") === "%")
    {
      //modulus operator so modulus calculation must be done to current total
      Session.set("total",parseFloat(Session.get("total")) % parseFloat(Session.get("display")));
      //Now add it to the calcs string along with the operator
      Session.set("calcs", Session.get("calcs") + Session.get("operator") +parseFloat(Session.get("display")));
      //Finally, display total
      Session.set("display",Session.get("total"));
    }
    Session.set("clear","true");
  }
}

if (Meteor.isServer)
{
  Meteor.startup(function ()
  {
    // code to run on server at startup
  });
}
