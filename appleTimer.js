let x;
let b;
let sel;
let selTwo;
let selThree;
let h;
let m;
let s;
let ss;
let howManySeconds;
let odecet
let zacatecniUhel;
let uhlovyRozestup;
let oKolikSeBudeKonecnyUhelMensit;
let opt = document.getElementsByTagName("select")[0];
let optTwo = document.getElementsByTagName("select")[1];
let optThree = document.getElementsByTagName("select")[2];
let p = document.getElementById("txt");
let canv = document.getElementById("surprise");
let draw = canv.getContext("2d");
let date;
let futureH;
let futureM;

canv.width = window.innerWidth/2;
canv.height = window.innerHeight/2;


for(let i = 0; i <= 23; i++)
{
   sel = document.createElement("option");
   sel.setAttribute("value", i);
   sel.innerHTML = i + " hod";
   
   opt.appendChild(sel);

}

for(let k = 0; k <= 59; k++)
{
   selTwo = document.createElement("option");
   selTwo.setAttribute("value", k);
   selTwo.innerHTML = k + " min";
   
   optTwo.appendChild(selTwo);

   selThree = document.createElement("option");
   selThree.setAttribute("value", k);
   selThree.innerHTML = k + " s";   
 
   optThree.appendChild(selThree);

}
  
function percentProgressAndDrawTimer()
{
  zacatecniUhel = 630;
  
  uhlovyRozestup = 630 - 270;
  
  oKolikSeBudeKonecnyUhelMensit = uhlovyRozestup / howManySeconds;
         
  draw.beginPath();             
     draw.arc(canv.width/2, canv.height/2, 140, 270/57.2957795, 630/57.2957795);
     draw.strokeStyle = "#262629";
     draw.lineWidth = "9";
     draw.stroke();                         
   draw.closePath();
     
   draw.beginPath();             
     draw.arc(canv.width/2, canv.height/2, 140, 270/57.2957795, zacatecniUhel/57.2957795);
     draw.strokeStyle = "#ffb340";
     draw.lineWidth = "9";
     draw.lineCap ="round";
     draw.stroke();                         
   draw.closePath();

   startOfCircleReducingAnim();
}   
   
   
function startOfCircleReducingAnim()
{   
  clearInterval(b)
  b = setInterval(function() {
            
	 zacatecniUhel-=oKolikSeBudeKonecnyUhelMensit/100;
    
     draw.clearRect(0,0,canv.width,canv.height)
     
     draw.beginPath();             
       draw.arc(canv.width/2, canv.height/2, 140, 270/57.2957795, 630/57.2957795);
       draw.strokeStyle = "#262629";
       draw.lineWidth = "9";
       draw.stroke();                         
     draw.closePath();
     
     draw.beginPath();             
       draw.arc(canv.width/2, canv.height/2, 140, 270/57.2957795, zacatecniUhel/57.2957795);
       draw.strokeStyle = "#ffb340";
       draw.lineWidth = "9";
       draw.lineCap ="round";
       draw.stroke();                         
     draw.closePath();
     
     let mn;
     
     if(howManySeconds <= 0)
     {	
	    mn = "00:00";
      
     }
     
     if(h > "0" + 0)
     {
        mn = (h + ":" + m + ":" + ss);
                
     } else if(h <= "0" + 0) {
      
   		 mn = (m + ":" + ss);
      
     }
      
     draw.fillStyle = "white";
     draw.textAlign = "center";
     draw.font = "40px Arial";
     draw.fillText(mn, canv.width/2, canv.height/2);
     
     draw.fillStyle = "white";    
     draw.textAlign = "center";
     draw.font = "20px Arial";
     draw.fillText(("🔔 " + futureH + ":" + futureM), canv.width/2, canv.height/2 + 40);
             
     if(zacatecniUhel<= 270)
     {
        clearInterval(b);
        
        draw.clearRect(0,0,canv.width,canv.height) 
   		 draw.fillStyle = "white";
   		 draw.font = "35px Arial"
   		 draw.fillText("TIME IS UP", canv.width/2, canv.height/2);
      
     }
            
  }, 10);
}
    
function timer()
{  
  h = parseInt((opt.options[opt.selectedIndex].value));
  m = parseInt((optTwo.options[optTwo.selectedIndex].value));
  s = parseInt((optThree.options[optThree.selectedIndex].value));
   
  howManySeconds = (h*60*60) + (m*60) + s*1;
  
  if(howManySeconds <= 0)
  {
	howManySeconds = 1;
	s = 1;
      
  }
   
  odecet = howManySeconds;
  
  futureDateShow();
  
  percentProgressAndDrawTimer();  
  
  if(h < 10)
  {
     h = "0" + h;
       
  }

  if(m < 10)
  {
     m = "0" + m;
          
  }

  if(s < 10)
	{
       ss = "0" + s;
       
	} else { 
		
		ss = s;
		    
	}   
  
  startOfTimer();
  
}

function startOfTimer()
{
  clearInterval(x);  
  x = setInterval(function()
  { 
    let b;
    let c;
    
    // nevím proč, ale aby se to dorovnalo Apple časovači přesně, musí být jak tady, tak i u zacatecniUhel /90 a ne /100 = to moje je pomalejší. Buď to mají oni zrychlený a nebo já mám špatně výpočet. Ale přitom logicky bych si myslel, že přičtení/odečtení 1 sekundy při 10 milisekundovým intervalu je 10 * 100, neboli 1/100
    
    s-=1/100;
    b = Math.abs(s.toFixed(0));
    
    odecet-=1/100;
    c = Math.abs(odecet.toFixed(0));
    
	if(b < 10) 
	{
       ss = "0" + b;
       
	} else { 
	
	    ss = b;
	    
	}
   
   if(s < -0.4)
   { 
       s = 59.49;
    
       --m;
       
       if(m < 10)
       {
          m = "0" + m;
          
       }
   }
   
   if(m < "0"+0)
   {
       m = 59;
       --h;
       
       if(h < 10)
       {
          h = "0" + h;
          
       }
   }   
   
   if(c <= 0)
   {
     clearInterval(x);  
       
   }
  
  }, 10);
}

function futureDateShow()
{
  
  date = new Date();

  date.setSeconds(date.getSeconds() + odecet);

  futureH = date.getHours();
  futureM = date.getMinutes();
  
  if(futureH < 10)
  {
      futureH = "0" + futureH;
      
  }
  
  if(futureM < 10)
  {
      futureM = "0" + futureM;
      
  }  
   
}  

function stop()
{
    clearInterval(x);
    clearInterval(b);
    
     draw.clearRect(canv.width/2 - 45, canv.height/2 + 15, 90, 30);
     draw.fillStyle = "grey";    
     draw.textAlign = "center";
     draw.font = "20px Arial";
     draw.fillText(("🔔 " + futureH + ":" + futureM), canv.width/2, canv.height/2 + 40);     
    
}

function goOn() 
{  
  futureDateShow()
  startOfTimer(); 
  startOfCircleReducingAnim();
  
  
}
