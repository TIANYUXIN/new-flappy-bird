window.onload=function(){
	var bird={x:140,y:264,w:30,h:18};
    // var guandao={
    // 	top:[{x:300,y:0,w:80,h:300},{x:510,y:0,w:80,h:300}],
    // 	bottom:[{x:300,y:420,w:80,h:300},{x:510,y:420,w:80,h:300}]
    // }
  var guandaos=[
    {
     top:{x:300,y:0,w:80,h:300},
     bottom:{x:300,y:420,w:80,h:300}
    },  
    {
     top:{x:610,y:0,w:80,h:300},
     bottom:{x:610,y:420,w:80,h:300}
    }
  ];

  var img=document.querySelector('#pipe');
  var birds=document.querySelector('#bird');
  var ctx=document.querySelector('#canvas').getContext('2d');
	//{x,y,w,h} {}
  //矩形框的碰撞
	var recvsrec =  function(rect0,rect1){
   if (rect0.x >= rect1.x && rect0.x >= rect1.x + rect1.w) {
     return false;
   } else if (rect0.x <= rect1.x && rect0.x + rect0.w <= rect1.x) {
     return false;
   } else if (rect0.y >= rect1.y && rect0.y >= rect1.y + rect1.h) {
     return false;
   } else if (rect0.y <= rect1.y && rect0.y + rect0.h <= rect1.y) {
     return false;
   }
   return true;
 };

 var upspeed  = 30;
 var a=1;
 var draw=function(){

      //清理画布
      ctx.clearRect(0,0,320,568);
      a+=0.02;
      bird.y+=a*a;
      ctx.drawImage(birds,bird.x,bird.y,bird.w,bird.h);
      
      //画管道

      var vs;
      for(var i=0;i<guandaos.length;i++){
       var z=guandaos[i];
       z.top.x-=2;
       z.bottom.x-=2;
       ctx.drawImage(img,z.top.x,z.top.y,z.top.w,z.top.h);
       ctx.drawImage(img,z.bottom.x,z.bottom.y,z.bottom.w,z.bottom.h);

       if(recvsrec(bird,z.top)||recvsrec(bird,z.bottom)){
         	vs=true;//return;
         }
         if(z.top.x<=-z.top.w){
         	z.top.x=600;
         	z.bottom.x=600;
         	z.top.h=Math.random()*200+100;
         	z.bottom.y=z.top.h+150;
         	z.bottom.h=568-z.bottom.y;
         }
         if(vs){
          end.style.display="block";
          return;
        }

      }     
      


      //边界判断
      if(bird.y>=568-40){
      	//return;
        ctx.fillRect(140,568,bird.w,bird.h);
        end.style.display="block";
      }else if(bird.y<=0){
      	ctx.fillRect(140,0,bird.w,bird.h);
        end.style.display="block";
      	//window.requestAnimationFrame(draw);
      }else{
      	window.requestAnimationFrame(draw);
      }
      
      // requestAnimationFrame(draw);
    }
    canvas.addEventListener('click',function(e){
      bird.y -= upspeed;
    },false);
    canvas.addEventListener('touchend',function(e){
      bird.y -= upspeed;
    },false);
    canvas.onclick=function(){
      a=1;
      bird.y-=30;
    }
    birdbegin.onclick=function(){
      requestAnimationFrame(draw);
      begin.style.display="none";
    }

    birdend.onclick=function(){
      end.style.display="none";
    }

    
  }