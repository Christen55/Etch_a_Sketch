let num=16;
let isBackground=false;
let isEraser=false;
let isWrite=false;
let isRandom=false;
let isPen=false;
let color;
let colorRand;
let colorRandom;
let blackcolor;
let determine;      
let x=0;
let y=0;
create(16);
document.querySelector('.ok').addEventListener('click', ()=> { 
    if((Math.floor(num))!=num){
        num=0;
    }
    
    if(num!=0){
        for(i=0; i<num*num; i++){
            let div=document.querySelector('.square');
            div.remove();     
        }
        num=0;
        getNum();
    }

    else if(num==0){
        getNum();
    }
});

function getNum(){
    num = +document.getElementById('number').value;
    checkNumber(num);
}

function checkNumber(num){
    let additionalNumber=Math.floor(num);
    if(additionalNumber!=num || num<=0 ){
        document.getElementById('chooseNum').innerHTML="Введите целое число не равное нулю!"; 
    }
    else{
        document.getElementById('chooseNum').innerHTML=`Сетка ${num}×${num}`;
        create(num);
    }
}

function create(num){     
    for(i=0; i<num*num; i++){
        let div= document.createElement('div'); 
        div.className="square";
        let w=document.querySelector('#game');
        let widthGame=+w.offsetWidth-2;
        let size=(widthGame/num)-2;
        div.style.width=`${size}px`;
        div.style.height=`${size}px`;
        game.append(div);      
    }   
}
         
document.querySelector('.colorBackground').addEventListener('click', ()=> {
    colorBackground=document.getElementById('color').value;
});
    
document.querySelector('.color').addEventListener('click', ()=> {
    color=document.getElementById('color').value;
});

document.querySelector('.pen').addEventListener('click', ()=> {
    penColor=document.getElementById('color').value;
});
        
function play(variant){
    let squares=Array.from(document.querySelectorAll('.square'));
    switch(variant){
        case 1:
            dial("colorBackground");
            isEraser=false;
            isBackground=true;
            isRandom=false; 
            isPen=false;
            isWrite=false;  
            console.log('jkjl');
            console.log(colorBackground);
            if(isBackground){
                let background=document.getElementById('background');
                background.style.background=`${colorBackground}`;
                background.style.opacity=0.3;
            }
        break;
               
        case 2:
            dial("write");
            isEraser=false;
            isBackground=false;
            isRandom=false; 
            isPen=false;
            squares.forEach((square) =>{
                square.addEventListener('mousedown', function (e) {   
                    x=e.offSetX;
                    y=e.offSetY;
                    isWrite=true;  
                });

                square.addEventListener('mouseenter', function (e) {
                    if(isWrite){
                        e.target.style.background=`${color}`;
                        determine=+e.target.style.opacity;
                        if(determine<1){
                            highlight(determine);
                        }
                            function highlight(determine){
                                determine+=0.1;
                                e.target.style.opacity=determine;
                            }
                        x=e.offSetX;
                        y=e.offSetY;   
                    }  
                        
                });

                square.addEventListener('mouseup', function (e) {
                    if(isWrite){
                        x=0;
                        y=0;   
                        isWrite=false;
                    }          
                });         
            });

        break;    
                
        case 3:
            dial("pen");
            squares.forEach((square) =>{
                isBackground=false;
                isRandom=false;
                isWrite=false;
                isEraser=false;     
                square.addEventListener('mousedown', function (e) {   
                    x=e.offSetX;
                    y=e.offSetY;
                    isPen=true;  
                });

                square.addEventListener('mouseenter', function (e) {
                    e.target.style.opacity=1;   
                    if(isPen){    
                        e.target.style.background=`${penColor}`;  
                        x=e.offSetX;
                        y=e.offSetY; 
                    }                 
                });

                square.addEventListener('mouseup', function (e) {
                    if(isPen){
                        x=0;
                        y=0;   
                        isPen=false;
                    }          
                });      
            });

        break; 

        case 4:
            dial("random");
            isBackground=false;
            isRandom=true;
            isWrite=false;
            isEraser=false; 
            isPen=false;    
            squares.forEach((square) =>{
                square.addEventListener('mouseenter', function (e) {
                    e.target.style.opacity=1;
                    if(isRandom){
                        colorRand=Math.floor((Math.random()*16777216+1)).toString(16);

                        while(colorRand.length<6){
                            colorRand="0"+colorRand;
                        }  

                        colorRandom="#"+colorRand;       
                        e.target.style.background=`${colorRandom}`;
                    }            
                });
            });

        break; 

        case 5:
            dial("eraser"); 
            isBackground=false;
            isRandom=false;
            isWrite=false;
            isEraser=true;  
            isPen=false;  
            squares.forEach((square) =>{
                square.addEventListener('click', function (e) {
                    if(isEraser){
                        e.target.style.background='white';
                        e.target.style.opacity=0;  
                    }
                });
    
                square.oncontextmenu= function (e) {
                    if(isEraser){
                        determine=+e.target.style.opacity;
                        if(determine>0){
                            lowlight(determine);
                        }
                            function lowlight(determine){
                                determine-=0.1;
                                e.target.style.opacity=determine;
                            }

                        return false;
                    }    
                };       
            });  
            
        break;
    }            
}

function dial(choice){
    document.getElementById("colorBackground").classList.remove('buttonClick');
    document.getElementById("write").classList.remove('buttonClick');
    document.getElementById("eraser").classList.remove('buttonClick');  
    document.getElementById("random").classList.remove('buttonClick');
    document.getElementById("pen").classList.remove('buttonClick');
    document.getElementById(choice).classList.add('buttonClick');
}

slayder();
function slayder(){
    let slayds=Array.from(document.querySelectorAll('.slaid'));
    let left=document.querySelector('.left');
    let right=document.querySelector('.right');
    let qountLeft=6;
    let qountRight=0;
    slayds[0].style.display='block';
    left.onclick=function () {

        if(qountLeft<=slayds.length-1 && qountLeft>0){
            slayds[qountLeft-1].style.display='block'; 
            slayds[qountLeft].style.display='none';
            qountLeft--;      
        }
        else if(qountLeft==slayds.length){
            slayds[slayds.length-1].style.display='block'; 
            slayds[0].style.display='none';
            qountLeft--;  
        }
        else if(qountLeft==0){
            slayds[slayds.length-1].style.display='block'; 
            slayds[0].style.display='none';
            qountLeft=slayds.length-1;
        }
        qountRight=qountLeft; 
    }

    right.onclick=function () {
        if(qountRight<slayds.length-1 && qountRight>=0){
            slayds[qountRight+1].style.display='block';
            slayds[qountRight].style.display='none';
            qountRight++;   
        }
        else if(qountRight==slayds.length-1){
            slayds[0].style.display='block';
            slayds[qountRight].style.display='none';
            qountRight=0;
        }
        qountLeft=qountRight;
    }
}

function changeBackground(choose){
    let background=document.getElementById('background');
    let number=document.getElementById('number');
    background.style.opacity=0.5;
    switch(choose){
        case 1:
            background.style.backgroundImage="url('https://bipbap.ru/wp-content/uploads/2020/01/1504514575_youloveit_ru_risovanie_po_kletochkam05.png')";
            number.value='15';
        break;  
        case 2:
            background.style.backgroundImage="url('https://flomaster.club/uploads/posts/2021-11/1637297689_5-flomaster-club-p-piksel-art-nyan-ket-po-kletochkam-krasivie-5.png')";
            number.value='50';
        break;  
        case 3:
            background.style.backgroundImage="url('https://kartinkin.net/uploads/posts/2021-07/1627402003_8-kartinkin-com-p-piksel-art-ikonki-art-krasivo-10.png')";
            number.value='50';
        break;  
        case 4:
            background.style.backgroundImage="url('https://thumbs.dreamstime.com/b/%D0%B4%D0%B5%D0%B2%D1%83%D1%88%D0%BA%D0%B0-%D0%B0%D0%BD%D0%B8%D0%BC%D0%B5-%D0%B8%D1%81%D0%BA%D1%83%D1%81%D1%81%D1%82%D0%B2%D0%B0-%D0%BF%D0%B8%D0%BA%D1%81%D0%B5%D0%BB%D0%B5%D0%B9-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%B0-%D0%B8%D0%B7%D0%BE%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%83%D1%8E-%D0%B8%D1%81%D0%BA%D1%83%D1%81%D1%81%D1%82%D0%B2%D0%BE%D0%BC-182694478.jpg')";
            number.value='64';
        break;

        case 5:
            background.style.backgroundImage="url('https://bipbap.ru/wp-content/uploads/2020/01/1504514665_youloveit_ru_risovanie_po_kletochkam03.png')";
            number.value='15';
        break; 

        case 6:
            background.style.backgroundImage="url('https://kartinkin.net/uploads/posts/2021-07/1626227720_27-kartinkin-com-p-piksel-art-bolshoi-art-krasivo-29.png ')";
            number.value='50';
        break;
    }
    document.querySelector('.ok').click();  
}
