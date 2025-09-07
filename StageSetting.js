function Damage(user1,user2,isUser1Attacck){
    if(isUser1Attacck==true){
        const hp2=document.getElementById("HP2")
        if(user2.getHP()>0){
            hp2.style.width=(user2.getHP()/2000*800)+"px"
            console.log("function working")
        }
        else{
            hp2.style.width="0px"
        }
        
        
    }
    else{
        const hp1=document.getElementById("HP1")
        if(user1.getHP()>0){
            hp1.style.width=(user1.getHP()/2000*800)+"px"
            console.log("function working")
        }
        else{
            hp1.style.width="0px"
        }
        
    }
}