

class Character{
    constructor(isPlayer1){
        this.hp=2000
        this.Fattack=50
        this.Kattack=125
        this.hadoken=175
        if(isPlayer1==true){
            this.id=document.getElementById("p1")
            this.isplayer1=true
        }
        else{
            this.id=document.getElementById("p2")   
            this.isplayer1=false
    
        }
        this.getHP()
        this.getFA()
        this.getKA()
        this.getID()
        this.getPlayerNo()

        
    }

    getFA(){
        return this.Fattack
    }

    getKA(){
        return this.Kattack
    }

    getHP(){
        return this.hp
    }

    setHP(newHP){
        this.hp=newHP
    }

    getID(){
        return this.id
    }

    getPlayerNo(){
        return this.isplayer1
    }
            
}


let actionList={}

document.addEventListener("keydown",function action(e){
    actionList[e.key]=true
    
})

document.addEventListener("keyup",function action(e){
    actionList[e.key]=false 
})





function PublicActionListener(user1,user2){
        let player1=user1.getID()
        let player2=user2.getID()
        let attackCounter1=0
        let attackCounter2=0

        let fist2=document.getElementById("p2fist")
        let fist1=document.getElementById("p1fist")
        
        let leg1=document.getElementById("p1Leg")
        let leg2=document.getElementById("p2Leg")
        

        setInterval(()=>{
                let p1r=player1.getBoundingClientRect().right
                let p2r=player2.getBoundingClientRect().right
                let p1l=player1.getBoundingClientRect().left
                let p2l=player2.getBoundingClientRect().left
                let p1t=player1.getBoundingClientRect().top
                let p2t=player2.getBoundingClientRect().top
                let p1b=player1.getBoundingClientRect().bottom
                let p2b=player2.getBoundingClientRect().bottom

                let f1Pr = fist1.getBoundingClientRect().right
                let f1Pl = fist1.getBoundingClientRect().left
                let f2Pr = fist2.getBoundingClientRect().right
                let f2Pl = fist2.getBoundingClientRect().left
                let f1Pt = fist1.getBoundingClientRect().top
                let f1Pb = fist1.getBoundingClientRect().bottom
                let f2Pt = fist2.getBoundingClientRect().top
                let f2Pb = fist2.getBoundingClientRect().bottom


                let L1Pr = leg1.getBoundingClientRect().right
                let L1Pl = leg1.getBoundingClientRect().left
                let L2Pr = leg2.getBoundingClientRect().top
                let L2Pl = leg2.getBoundingClientRect().left
                let L1Pb = leg1.getBoundingClientRect().bottom
                let L1Pt = leg1.getBoundingClientRect().top
                let L2Pb = leg2.getBoundingClientRect().bottom
                let L2Pt = leg2.getBoundingClientRect().top

                

                let p1Position=parseFloat(window.getComputedStyle(player1).getPropertyValue("margin-left"))
                let p2Position=parseFloat(window.getComputedStyle(player2).getPropertyValue("margin-left"))

            if(actionList["d"]){
                console.log("d")
                let walkDistance=parseFloat(window.getComputedStyle(player1).getPropertyValue("margin-left"))+20
                player1.style.marginLeft=(""+walkDistance+"px")
            }
            if(actionList["a"]){
                console.log("a")
                let walkdistance=parseFloat(window.getComputedStyle(player1).getPropertyValue("margin-left"))-20
                player1.style.marginLeft=(""+walkdistance+"px")
            }
            if(actionList["w"]){
                console.log("w")
                player1.classList.remove("idle")
                player1.classList.add("jump")
                const j =document.getElementsByClassName("jump")[0]
                j.addEventListener("animationend",function rm(){
                    player1.classList.remove("jump")
                    player1.classList.add("idle")
                })
            }
            if(actionList["s"]){
                console.log("s")
                player1.classList.remove("idle")
                player1.classList.add("dodge")
            }
            if(actionList["c"]){
                console.log("c")
                    fist1.classList.remove("fist")
                    if(p1Position<p2Position){
                            fist1.classList.add("punch")
                            const p =document.getElementsByClassName("punch")[0]
                                if(f1Pr>=p2l&&f1Pr<=p2r&&(f1Pb>=p2t&&f1Pb<=p2b&&f1Pt<=p2b)){
                                    attackCounter1+=1
                                    if(attackCounter1==1){
                                        user2.setHP(user2.getHP()-user1.getFA())
                                        console.log("user2 HP: "+user2.getHP())
                                    }
                                    
                                }
                            p.addEventListener("animationend",function rmPunch(){
                                attackCounter1=0
                                fist1.classList.remove("punch")
                                fist1.classList.add("fist")
                        })

                    }
                    if(p1Position>p2Position){
                            fist1.classList.add("punchReverse")
                            const p =document.getElementsByClassName("punchReverse")[0]
                            if(f1Pl<=p2r&&f1Pl>=p2l&&f1Pb>=p2t&&f1Pb<=p2b&&f1Pt<=p2b){
                                    attackCounter1+=1
                                    if(attackCounter1==1){
                                        user2.setHP(user2.getHP()-user1.getFA())
                                        console.log("user2 HP: "+user2.getHP())
                                    }
                                    
                                }
                            p.addEventListener("animationend",function rmPunch(){
                                attackCounter1=0
                                fist1.classList.remove("punchReverse")
                                fist1.classList.add("fist")
                            
                        })
                    }
                    
            }

            if(actionList["v"]){
                leg1.classList.remove("leg")
                if(p1Position<p2Position){
                    leg1.classList.add("kick")
                    const L =document.getElementsByClassName("kick")[0]
                    if(L1Pr>=p2l&&L1Pr<=p2r&&(L1Pb>=p2t&&L1Pb<=p2b&&L1Pt<=p2b)){
                        attackCounter1+=1
                        if(attackCounter1==1){
                            user2.setHP(user2.getHP()-user1.getKA())
                            console.log("user2 HP: "+user2.getHP())
                        }
                                    
                    }
                    L.addEventListener("animationend",function rmKick(){
                                attackCounter1=0
                                leg1.classList.remove("kick")
                                leg1.classList.add("leg")
                     })          
                }
                if(p1Position>p2Position){
                    leg1.classList.add("kickReverse")
                    const L =document.getElementsByClassName("kickReverse")[0]
                    if(L1Pl<=p2r&&L1Pl>=p2l&&L1Pb>=p2t&&L1Pb<=p2b&&L1Pt<=p2b){
                        attackCounter1+=1
                        if(attackCounter1==1){
                            user2.setHP(user2.getHP()-user1.getKA())
                            console.log("user2 HP: "+user2.getHP())
                        }
                                    
                    }
                    L.addEventListener("animationend",function rmKick(){
                                attackCounter1=0
                                leg1.classList.remove("kickReverse")
                                leg1.classList.add("leg")
                     })          
                }
            }


            if(actionList["ArrowUp"]){
                console.log("up presseed")
                player2.classList.remove("idle")
                player2.classList.add("jump")
                const J =document.getElementsByClassName("jump")[0]
                J.addEventListener("animationend",function rm(){
                    player2.classList.remove("jump")
                    player2.classList.add("idle")
                })
            }
            if(actionList["ArrowDown"]){
                console.log("ArrowDown")
                player2.classList.remove("idle")
                player2.classList.add("dodge")
            }
            if(actionList["ArrowRight"]){
                console.log("ArrowRight")
                let WalkDistance=parseFloat(window.getComputedStyle(player2).getPropertyValue("margin-left"))+20   
                player2.style.marginLeft=(""+WalkDistance+"px")
            }
            if(actionList["ArrowLeft"]){
                console.log("ArrowLeft")
                let Walkdistance=parseFloat(window.getComputedStyle(player2).getPropertyValue("margin-left"))-20   
                player2.style.marginLeft=(""+Walkdistance+"px")
            }
            if(actionList[","]){
                    fist2.classList.remove("fist")
                    if(p1Position<p2Position){
                            fist2.classList.add("punchReverse")
                            const p =document.getElementsByClassName("punchReverse")[0]
                            if(f2Pl<=p1r&&f2Pl>=p1l&&f2Pb>=p1t&&f2Pb<=p1b&&f2Pt<=p1b){
                                    attackCounter2+=1
                                    if(attackCounter2==1){
                                        user1.setHP(user1.getHP()-user2.getFA())
                                        console.log("user1 HP: "+user1.getHP())
                                    }
                                    
                                }
                            p.addEventListener("animationend",function rmPunch(){
                                attackCounter2=0
                                fist2.classList.remove("punchReverse")
                                fist2.classList.add("fist")
                            
                        })

                    }
                    if(p1Position>p2Position){
                        fist2.classList.add("punch")
                            const p =document.getElementsByClassName("punch")[0]
                                if(f2Pr>=p1l&&f2Pr<=p1r&&(f2Pb>=p1t&&f2Pb<=p1b&&f2Pt<=p1b)){
                                    attackCounter2+=1
                                    if(attackCounter2==1){
                                        user1.setHP(user1.getHP()-user2.getFA())
                                        console.log("user1 HP: "+user1.getHP())
                                    }
                                    
                                }
                            p.addEventListener("animationend",function rmPunch(){
                                attackCounter2=0
                                fist2.classList.remove("punch")
                                fist2.classList.add("fist")
                        })
                    }
                 
            }
            if(actionList["s"]==false){
                    player1.classList.remove("dodge")
                    player1.classList.add("idle")

            }
            if(actionList["ArrowDown"]==false){
                        player2.classList.remove("dodge")
                        player2.classList.add("idle")
            }
        },16)      
    }


    



        
                

            

const ryu = new Character(true)
const ken=new Character(false)

PublicActionListener(ryu,ken)

















