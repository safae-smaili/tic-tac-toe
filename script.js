const container_main=document.getElementById("main");
const menu=document.getElementById("menu");
const menu_items=document.getElementById("menu_items");
const resetbutn=document.querySelector('[data-id="reset-btn"]');
const newbutn=document.querySelector('[data-id="new-btn"]');
const boxs=document.querySelectorAll("[data-id='case']");
const whosturn=document.getElementById("whosturn");
const turnicon=document.getElementById("icon1");
const modal=document.getElementById("modal");
const results=document.querySelectorAll('[data-id="score"]');
//variable to use in the programme
let nbrclc=0;
let table = new Array(9).fill(null);

let index;
let result=0;
let P1wins=0;
let P2wins=0;
let ties=0;
let tab=[P1wins,ties,P2wins]


//to show the drop-down list reset and new round buttons
menu.addEventListener("click",function(){
    menu_items.classList.toggle("hidden");
});
//to hide the dropdown list when click in an other place
document.body.addEventListener("click",function(e){
    if(e.target.dataset.id != "menu-btn"){
    menu_items.classList.add("hidden");
}
});
//the reset and the new rond buttons functioning
resetbutn.addEventListener('click',()=>{
    //to clear the grid
    location.reload();
});
newbutn.addEventListener('click',()=>{
    //to start from the 0
    location.reload();
    localStorage.clear();
    
});
//  boxs.forEach((box)=>{
//     box.addEventListener("click",(e)=>{
//         const content=document.createElement('i');
//         if(e.target.childNodes.length==0){
//             if(nbrclc%2==0){
//                 content.classList.add("fa-x")
//                 e.target.appendChild(content);
//                 index= parseInt(e.target.id)-1;
//                 table[index]=0
//             }
//             else { 
//                 content.classList.add("fa-o")
//                 e.target.appendChild(content);
//                 index= parseInt(e.target.id)-1;
//                 table[index]=1
//         }
//             nbrclc++}
//             xturn();
            
//     })
// })
boxs.forEach((box)=>{
    box.addEventListener("click",(e)=>{
        const content=document.createElement('i');
        content.classList.add("fa-solid")
        // if(table[parseInt(e.target.id)-1]=== null){
            if(!box.hasChildNodes()){
            if(nbrclc%2==0){
                content.classList.add("fa-x")
                e.target.appendChild(content);
                index= parseInt(e.target.id)-1;
                table[index]=0
            }
            else { 
                content.classList.add("fa-o")
                e.target.appendChild(content);
                index= parseInt(e.target.id)-1;
                table[index]=1
        }
        //test if there is a winer
        if(nbrclc>=4){
            result=win();
            if(result==1){
               
               //manage the model 
               if(table[index]==0){
                    modalmanage(1)
                P1wins++
                
                tab=[P1wins,ties,P2wins]
                savedata()
                //modifie the score
                score()
            }
                else {modalmanage(2)
                P2wins++
                tab=[P1wins,ties,P2wins]
                savedata()
                //modifie the score
                score()
            }
            }
            if(nbrclc==8 && result!=1){
            //if number of clic is 8 so there is no more box to selcte anymore the players tied
                modalmanage(3)
                ties++;
                tab=[P1wins,ties,P2wins]
                savedata()
                //modifie the score
                score()
            }
           
        }
        



            nbrclc++}
            xturn();
            
    })  
})

function xturn(){
    if(nbrclc%2==0){
        whosturn.textContent="Player1,you're up!"
        turnicon.classList.remove("fa-o");
        turnicon.classList.add("fa-x");
        turnicon.style.color="rgb(117, 82, 125)"
    }
    else{
        turnicon.style.color="rgb(174, 51, 117)"
        whosturn.textContent="Player 2,you're up!";
        turnicon.classList.remove("fa-x")
        turnicon.classList.add("fa-o");
    }
}
//win the game will and
const solconb=[
                    [0,1,2],
                    [3,4,5],
                    [6,7,8],
                    [0,3,6],
                    [1,4,7],
                    [2,5,8],
                    [2,4,6],
                    [0,4,8]
                   ]
function win(){
    let i=0,j=0,n,cnt=0;
    for(i=0;i<solconb.length;i++){ 
        for(j=0;j<solconb[i].length;j++){
                n=solconb[i][j];
                if(table[index]==table[n]){
                    
                    cnt++;
                }
                
                
                if(cnt==3)
                    return 1;
        
        }
         cnt=0;
    }

}

//modal manage
function modalmanage(nbr){
   const text= modal.querySelector("p");
   const playe=modal.querySelector("button")
   if(nbr==1 || nbr==2){
    text.textContent="Player "+nbr+ " wins!"
    
   }else{
    text.textContent="You are tied"

   }
   playe.addEventListener("click",()=>{
   //reset the parametres of the game;
   result=0
   table = new Array(9).fill(null);
   nbrclc=0;
   xturn();
   modal.classList.add("hidden");
   boxs.forEach((box)=>{
            if(box.hasChildNodes()){
                let i=box.querySelector('i');            
                box.removeChild(i);   
            }
        }
   
   )})

    modal.classList.remove("hidden");
}
//score
function score(){
    let r;
    let i=0;
    
    results.forEach(e=>{
       r= e.querySelector('span');
       
       r.textContent=tab[i]
       i++;
    })
//this should be saved

}
function savedata(){
    const tabstring=JSON.stringify(tab);
    localStorage.setItem("data",tabstring)
}
function loaddata(){
    const tabstring=localStorage.getItem("data");
     tab=JSON.parse(tabstring);
     score()
}
loaddata() 
console.log(tab)
