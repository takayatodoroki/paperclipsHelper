// ==UserScript==
// @name        paperclips helper
// @namespace   paperclips helper
// @include     http://www.decisionproblem.com/paperclips/index2.html
// @version     1
// @grant       none
// @author      takayatodorokif1
// ==/UserScript==


var ticker=0;
var quantumdelay=3;
// helper interface

    var helperDiv = document.createElement("div");
    helperDiv.id="helper";
    var helperHTML= "Helper<br>";
		helperHTML +=    "<input id='autoFireClipper' type='checkbox' checked>Autofire on 'Make Paperclip'</input><br>";
		helperHTML +=    "<input id='autoQuantum' type='checkbox' checked>Smartish autofire on quantum</input></br>";
		helperHTML +=    "<input id='autoTournaments' type='checkbox' checked>Autostart tournaments<br>&nbsp;&nbsp;&nbsp;&nbsp;with the last strategy</input>";
		helperDiv.innerHTML=helperHTML;
    document.getElementById("page").appendChild(helperDiv);
    document.getElementById("helper").style.float = "left";
    document.getElementById("helper").style.width = "250px";



setInterval(autohelper, 1);


// AUTO MAKES PAPERCLIPS
// AUTO GET OPS FROM QUANTUM
// AUTO PLAYS TOURNAMENTS
function autohelper()
{
  
    var btnMakePaperclip=document.getElementById("btnMakePaperclip");
    var qCompDisplay=document.getElementById("qCompDisplay");
    var tournamentManagement=document.getElementById("tournamentManagement");
    var stratPicker=document.getElementById("stratPicker");
    var btnNewTournament=document.getElementById("btnNewTournament");
    var btnRunTournament=document.getElementById("btnRunTournament");
 
  	ticker++;

  
   // MAKES PAPERCLIP SECTION
   // auto click for a clip
   if (document.getElementById("autoFireClipper").checked) {
   	btnMakePaperclip.click();
   }
  
  // QUANTUM SECTION
  // tries to get ops from quantum computing: it works by guessing so it's not very effective, you can still manually click when you see a good pattern to have better result
  if (document.getElementById("autoQuantum").checked) {
    quantumdelay-=1;
    var qv=parseInt(qCompDisplay.childNodes[0].nodeValue.substr(6,20));
    if ( qv>0){quantumdelay=0;}
    if (quantumdelay<=0)
    {
        document.getElementById("btnQcompute").click();
        var qv=parseInt(qCompDisplay.childNodes[0].nodeValue.substr(6,20));
        if ( qv<=0)
        {
          // add delay
          quantumdelay=2-qv*3  // high malus --> high delay for the next guess
        }
        else
        {
          // we got a bonus so delay to =1 ---> it will get ops for each call
          quantumdelay=1
        }
     }
   }  
  
   // TOURNAMENTS SECTION
   // autorun tournaments for yomi
   // set most perfoming available strategy
   // start the new tournament
  
  if (document.getElementById("autoTournaments").checked && ticker>1000) {
    if (tournamentManagement.style["display"] =="")
     {
       stratPicker.selectedIndex=stratPicker.childElementCount-1;
       btnNewTournament.click();
       // run  the new tournament
       btnRunTournament.click();
     }
  }
}



