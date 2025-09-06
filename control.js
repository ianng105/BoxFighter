class Character {
  constructor(isPlayer1) {
    this.hp = 2000;
    this.Fattack = 50;
    this.Kattack = 125;
    this.hadoken = 175;
    if (isPlayer1 == true) {
      this.id = document.getElementById("p1");
      this.isplayer1 = true;
    } else {
      this.id = document.getElementById("p2");
      this.isplayer1 = false;
    }
    this.getHP();
    this.getFA();
    this.getKA();
    this.getHadoken();
    this.getID();
    this.getPlayerNo();
  }

  getHadoken() {
    return this.hadoken;
  }

  getFA() {
    return this.Fattack;
  }

  getKA() {
    return this.Kattack;
  }

  getHP() {
    return this.hp;
  }

  setHP(newHP) {
    this.hp = newHP;
  }

  getID() {
    return this.id;
  }

  getPlayerNo() {
    return this.isplayer1;
  }
}

let actionList = {};

document.addEventListener("keydown", function action(e) {
  actionList[e.key] = true;
  keyGate=true
});

document.addEventListener("keyup", function action(e) {
  actionList[e.key] = false;
  keyGate=false
});

function PublicActionListener(user1, user2) {
  let player1 = user1.getID();
  let player2 = user2.getID();
  let attackCounter1 = 0;
  let attackCounter2 = 0;

  let fist2 = document.getElementById("p2fist");
  let fist1 = document.getElementById("p1fist");

  let leg1 = document.getElementById("p1Leg");
  let leg2 = document.getElementById("p2Leg");

  let hdk1 = document.getElementById("p1hadoken");
  let hdk2 = document.getElementById("p2hadoken");

  let actionGate1 = 0;
  let actionGate2 = 0;

  let isKicking1=false;
  let isKicking2s=false;


  let isGuard1=false
  let isGuard2=false

  let isHadokening1=false
  let isHadokening2=false

  setInterval(() => {
    let p1r = player1.getBoundingClientRect().right;
    let p2r = player2.getBoundingClientRect().right;
    let p1l = player1.getBoundingClientRect().left;
    let p2l = player2.getBoundingClientRect().left;
    let p1t = player1.getBoundingClientRect().top;
    let p2t = player2.getBoundingClientRect().top;
    let p1b = player1.getBoundingClientRect().bottom;
    let p2b = player2.getBoundingClientRect().bottom;

    let f1Pr = fist1.getBoundingClientRect().right;
    let f1Pl = fist1.getBoundingClientRect().left;
    let f2Pr = fist2.getBoundingClientRect().right;
    let f2Pl = fist2.getBoundingClientRect().left;
    let f1Pt = fist1.getBoundingClientRect().top;
    let f1Pb = fist1.getBoundingClientRect().bottom;
    let f2Pt = fist2.getBoundingClientRect().top;
    let f2Pb = fist2.getBoundingClientRect().bottom;

    let L1Pr = leg1.getBoundingClientRect().right;
    let L1Pl = leg1.getBoundingClientRect().left;
    let L2Pr = leg2.getBoundingClientRect().right;
    let L2Pl = leg2.getBoundingClientRect().left;
    let L1Pb = leg1.getBoundingClientRect().bottom;
    let L1Pt = leg1.getBoundingClientRect().top;
    let L2Pb = leg2.getBoundingClientRect().bottom;
    let L2Pt = leg2.getBoundingClientRect().top;

    let HDKr_1 = hdk1.getBoundingClientRect().right;
    let HDKl_1 = hdk1.getBoundingClientRect().left;
    let HDKr_2 = hdk2.getBoundingClientRect().right;
    let HDKl_2 = hdk2.getBoundingClientRect().left;
    let HDKt_1 = hdk1.getBoundingClientRect().top;
    let HDKb_1 = hdk1.getBoundingClientRect().bottom;
    let HDKt_2 = hdk2.getBoundingClientRect().top;
    let HDKb_2 = hdk2.getBoundingClientRect().bottom;

    console.log("action gate : "+actionGate1)

    let p1Position = parseFloat(
      window.getComputedStyle(player1).getPropertyValue("margin-left")
    );
    let p2Position = parseFloat(
      window.getComputedStyle(player2).getPropertyValue("margin-left")
    );
/*
    for(let i=0;i<Object.keys(actionList).length;i++){
      console.log(Object.keys(actionList)+": "+Object.values(actionList))
    }
*/



//Player 1 walk forward
    if (actionList["d"]) {
      console.log("d");
      if (actionGate1 == 0&&isGuard1==false) {
        let walkDistance =
          parseFloat(
            window.getComputedStyle(player1).getPropertyValue("margin-left")
          ) + 20;
        player1.style.marginLeft = "" + walkDistance + "px";
      }
    }
//Player 1 walk backward
    if (actionList["a"]) {
      console.log("a");
      if (actionGate1 == 0&&isGuard1==false) {
        let walkdistance =
          parseFloat(
            window.getComputedStyle(player1).getPropertyValue("margin-left")
          ) - 20;
        player1.style.marginLeft = "" + walkdistance + "px";
      }
    }
//Player 1 jump
    if (actionList["w"]) {
      console.log("w");
      player1.classList.remove("idle");
      player1.classList.add("jump");
      const j = document.getElementsByClassName("jump")[0];
      j.addEventListener("animationend", function rm() {
        player1.classList.remove("jump");
        player1.classList.add("idle");
      });
    }
//Player 1 dodge
    if (actionList["s"]) {
      console.log("s");
      player1.classList.remove("idle");
      player1.classList.add("dodge");
    }
//Player 1 punch
    if (actionList["c"]) {

        fist1.classList.remove("fist");
        if (p1Position <= p2Position) {
          actionGate1 += 1;
          fist1.classList.add("punch");
          const p = document.getElementsByClassName("punch")[0];
          if (
            f1Pr >= p2l &&
            f1Pr <= p2r &&
            f1Pb >= p2t &&
            f1Pb <= p2b &&
            f1Pt <= p2b
            ) {

          attackCounter1 += 1;
          if (attackCounter1 == 1) {
            if(actionList["ArrowRight"]){
              isGuard2=true
              player2.style.background="dodgerblue"
              setTimeout(function(){
                player2.style.background="#fa0505"
                console.log("function works")
                isGuard2=false 
                 },500  
                
              )
            }
            else{
              user2.setHP(user2.getHP() - user1.getFA());
              console.log("user2 HP: " + user2.getHP());
            }

          }
        }

// Reverse
        }
        if (p1Position > p2Position) {
          actionGate1 += 1;
          fist1.classList.add("punchReverse");
          const p = document.getElementsByClassName("punchReverse")[0];
          if (f1Pl <= p2r &&f1Pl >= p2l &&f1Pb >= p2t &&f1Pb <= p2b &&f1Pt <= p2b) {
            attackCounter1 += 1;
            if (attackCounter1 == 1) {
              if(actionList["ArrowLeft"]){
              isGuard2=true
              player2.style.background="dodgerblue"
              setTimeout(function(){
                player2.style.background="#fa0505"
                console.log("function works")
                isGuard2=false },500  
                
              )
            }
            else{
              user2.setHP(user2.getHP() - user1.getFA());
              console.log("user2 HP: " + user2.getHP());
            }
              
            }
          }

        }
      
    }


    if(actionList["c"]==false){
       if(p1Position<=p2Position){
        fist1.classList.remove("punch");
        fist1.classList.add("fist");
        attackCounter1 = 0;
        actionGate1=0
      }
      else{
            fist1.classList.remove("punchReverse");
            fist1.classList.add("fist");
            attackCounter1 = 0;
            actionGate1=0
      }

    }

  if(actionList["v"]){
    isKicking1=true
  }

   if (actionList["v"]==false&&isKicking1==true) {
        actionGate1+=1
        leg1.classList.remove("leg");
        if (p1Position <= p2Position) {
          leg1.classList.add("kick");
          const L = document.getElementsByClassName("kick")[0];
          if (
            L1Pr >= p2l &&
            L1Pr <= p2r &&
            L1Pb >= p2t &&
            L1Pb <= p2b &&
            L1Pt <= p2b
          ) {
            attackCounter1 += 1;
            if (attackCounter1 == 1) {
              
            if(actionList["ArrowRight"]){
              isGuard2=true
              player2.style.background="dodgerblue"
              setTimeout(function(){
                player2.style.background="#fa0505"
                console.log("function works")
                isGuard2=false 
                 },500  
                
              )
            }
            else{
              user2.setHP(user2.getHP() - user1.getKA());
              console.log("user2 HP: " + user2.getHP());
            }
              
            }
          }
          L.addEventListener("animationend",function rmKicking(){
              attackCounter1 = 0;
              leg1.classList.remove("kick");
              leg1.classList.add("leg");
              actionGate1 = 0;
              isKicking1=false
          })
          
        }
        if (p1Position > p2Position) {
          leg1.classList.add("kickReverse");
          const L = document.getElementsByClassName("kickReverse")[0];
          
          if (
            L1Pl <= p2r &&
            L1Pl >= p2l &&
            L1Pb >= p2t &&
            L1Pb <= p2b &&
            L1Pt <= p2b
          ) {
            attackCounter1 += 1;
            if (attackCounter1 == 1) {
              if(actionList["ArrowLeft "]){
              isGuard2=true
              player2.style.background="dodgerblue"
              setTimeout(function(){
                player2.style.background="#fa0505"
                console.log("function works")
                isGuard2=false 
                 },500  
                
              )
            }
            else{
              user2.setHP(user2.getHP() - user1.getKA());
              console.log("user2 HP: " + user2.getHP());
            }
              
            }
          }
          L.addEventListener("animationend",function rmKicking(){
            attackCounter1 = 0;
            leg1.classList.remove("kickReverse");
            leg1.classList.add("leg");
            actionGate1=0
            isKicking1=false
          })
        }
      
    }
    
    




    if(actionList["b"]) {
      console.log("b");
        actionGate1+=1
        hdk1.classList.remove("hadoken");
        isHadokening1=true
        if (p1Position <= p2Position&&attackCounter1==0) {

          hdk1.classList.add("hadokening");
          const h = document.getElementsByClassName("hadokening")[0];
            h.addEventListener("animationend", function rmhadoken() {
                    isHadokening1=false
                    attackCounter1 = 0;
                    actionGate1=0
                    hdk1.classList.remove("hadokening");
                    hdk1.classList.add("hadoken");
                    h.style.opacity="1"
              
            

            });
          
        }
        if (p1Position > p2Position&&attackCounter1==0) {
          console.log("hadoken")
          hdk1.classList.add("hadoKenReverse");
          const h = document.getElementsByClassName("hadoKenReverse")[0];
              h.addEventListener("animationend", function rmhadoken() {
                isHadokening1=false
                attackCounter1 = 0;
                hdk1.classList.remove("hadoKenReverse");
                hdk1.classList.add("hadoken");
                h.style.opacity="1"
                actionGate1=0
              });
        }
      
    }

    if(actionList["b"]==false&&isHadokening1==true){
      if (p1Position <= p2Position&&attackCounter1==0){
        const h = document.getElementsByClassName("hadokening")[0];
        if (
            HDKr_1 >= p2l &&
            HDKr_1 <= p2r &&
            HDKb_1 >= p2t &&
            HDKb_1 <= p2b &&
            HDKt_1 <= p2b){
              attackCounter1 += 1;
              console.log(attackCounter1)
              if (attackCounter1 == 1) {
                if(actionList["ArrowRight"]){
                  isGuard2=true
                  player2.style.background="dodgerblue"
                  setTimeout(function(){
                    player2.style.background="#fa0505"
                    console.log("function works")
                    isGuard2=false 
                      },500  
                    
                  )
                }
                else{
                    user2.setHP(user2.getHP() - user1.getHadoken());
                    console.log("user2 HP: " + user2.getHP());
                }

                console.log("change back to zero")
                actionGate1=0
                h.style.opacity="0"
              }
          }
      }
      
    
      if (p1Position > p2Position&&attackCounter1==0){
        const h = document.getElementsByClassName("hadoKenReverse")[0];
        if(
            HDKl_1 >= p2l &&
            HDKl_1 <= p2r &&
            HDKb_1 >= p2t &&
            HDKb_1 <= p2b &&
            HDKt_1 <= p2b
            )
           {
            attackCounter1 += 1;
            console.log(attackCounter1)
            if (attackCounter1 == 1) {
              if(actionList["ArrowLeft "]){
                isGuard2=true
                player2.style.background="dodgerblue"
                setTimeout(function(){
                  player2.style.background="#fa0505"
                  console.log("function works")
                  isGuard2=false 
                  },500  
                  
                )
              }
              else{
                user2.setHP(user2.getHP() - user1.getHadoken());
                console.log("user2 HP: " + user2.getHP());
              }
              
              console.log("change back to zero")
              actionGate1=0
              h.style.opacity="0"

            }

          }
      }

    }


    if (actionList["ArrowUp"]) {
      console.log("up presseed");
      player2.classList.remove("idle");
      player2.classList.add("jump");
      const J = document.getElementsByClassName("jump")[0];
      J.addEventListener("animationend", function rm() {
        player2.classList.remove("jump");
        player2.classList.add("idle");
      });
    }
    if (actionList["ArrowDown"]) {
      console.log("ArrowDown");
      player2.classList.remove("idle");
      player2.classList.add("dodge");
    }
    if (actionList["ArrowRight"]) {
        if(actionGate2==0&&isGuard2==false){
            console.log("ArrowRight");
            let WalkDistance =
                parseFloat(
                window.getComputedStyle(player2).getPropertyValue("margin-left")
                ) + 20;
            player2.style.marginLeft = "" + WalkDistance + "px";
        }
      
    }
    if (actionList["ArrowLeft"]) {
        if(actionGate2==0&&isGuard2==false){
            console.log("ArrowLeft");
            let Walkdistance =
                parseFloat(
                window.getComputedStyle(player2).getPropertyValue("margin-left")
                ) - 20;
            player2.style.marginLeft = "" + Walkdistance + "px";
        }
      
    }
    if (actionList[","]) {
            fist2.classList.remove("fist");
            if (p1Position <= p2Position) {
                actionGate2+=1
                console.log("reverse");
                fist2.classList.add("punchReverse");
                const p = document.getElementsByClassName("punchReverse")[0];
                if (
                f2Pl >= p1l &&
                f2Pl <= p1r &&
                f2Pb >= p1t &&
                f2Pb <= p1b &&
                f2Pt <= p1b
                ) {
                attackCounter2 += 1;
                /**/ console.log(attackCounter2);
                if (attackCounter2 == 1) {
                  if(actionList["a"]){
                    isGuard1=true
                    player1.style.background="dodgerblue"
                    setTimeout(function(){
                      player1.style.background="#ffff"
                      console.log("function works")
                      isGuard1=false },500  
                      
                    )
                 }
                 else{
                    user1.setHP(user1.getHP() - user2.getFA());
                    console.log("user1 HP: " + user1.getHP());
                 }

                }
                }

            }
            if (p1Position > p2Position) {
                actionGate2+=1
                fist2.classList.add("punch");
                const p = document.getElementsByClassName("punch")[0];
                if (
                f2Pr <= p1r &&
                f2Pr >= p1l &&
                f2Pb >= p1t &&
                f2Pb <= p1b &&
                f2Pt <= p1b
                ) {
                attackCounter2 += 1;
                if (attackCounter2 == 1) {
                    if(actionList["d"]){
                    isGuard1=true
                    player1.style.background="dodgerblue"
                    setTimeout(function(){
                      player1.style.background="#ffff"
                      console.log("function works")
                      isGuard1=false },500  
                      
                    )
                 }
                 else{
                    user1.setHP(user1.getHP() - user2.getFA());
                    console.log("user1 HP: " + user1.getHP());
                 }
                    
                }
                }

            }
  
    }
    if(actionList[","]==false){
      if(p1Position>p2Position){
        fist2.classList.remove("punch");
        fist2.classList.add("fist");
        attackCounter2 = 0;
        actionGate2=0
      }
      else{
            fist2.classList.remove("punchReverse");
            fist2.classList.add("fist");
            attackCounter2 = 0;
            actionGate2=0
      }

    }



    if (actionList["."]) {
            actionGate2+=1
            leg2.classList.remove("leg");
            if (p1Position <= p2Position) {
                leg2.classList.add("kickReverse");
                const L = document.getElementsByClassName("kickReverse")[0];
                if (
                L2Pl <= p1r &&
                L2Pl >= p1l &&
                L2Pb >= p1t &&
                L2Pb <= p1b &&
                L2Pt <= p1b
                ) {
                attackCounter2 += 1;
                if (attackCounter2 == 1) {
                    user1.setHP(user1.getHP() - user2.getKA());
                    console.log("user1 HP: " + user1.getHP());
                }
                }
 
            }
            if (p1Position > p2Position) {
                leg2.classList.add("kick");
                const L = document.getElementsByClassName("kick")[0];
                if (
                L2Pr >= p1l &&
                L2Pr <= p1r &&
                L2Pb >= p1t &&
                L2Pb <= p1b &&
                L2Pt <= p1b
                ) {
                attackCounter2 += 1;
                if (attackCounter2 == 1) {
                    user1.setHP(user1.getHP() - user2.getKA());
                    console.log("user1 HP: " + user1.getHP());
                }
                }

            }
        
      
    }
    if(actionList["."]==false){
      if(p1Position>=p2Position){
        attackCounter2 = 0;
        leg2.classList.remove("kick");
        leg2.classList.add("leg");
        actionGate2 = 0;
      }
      else{
        attackCounter2 = 0;
        leg2.classList.remove("kickReverse");
        leg2.classList.add("leg");
        actionGate2=0
      }

    }

      if(actionList["/"]) {
      console.log("/");
        actionGate2+=1
        hdk2.classList.remove("hadoken");
        isHadokening2=true
        if (p1Position >p2Position&&attackCounter2==0) {

          hdk2.classList.add("hadokening");
          const h = document.getElementsByClassName("hadokening")[0];
            h.addEventListener("animationend", function rmhadoken() {
                    isHadokening2=false
                    attackCounter2 = 0;
                    actionGate2=0
                    hdk2.classList.remove("hadokening");
                    hdk2.classList.add("hadoken");
                    h.style.opacity="1"
              
            

            });
          
        }
        if (p1Position <= p2Position&&attackCounter2==0) {
          console.log("hadoken")
          hdk2.classList.add("hadoKenReverse");
          const h = document.getElementsByClassName("hadoKenReverse")[0];
              h.addEventListener("animationend", function rmhadoken() {
                isHadokening2=false
                attackCounter2 = 0;
                hdk2.classList.remove("hadoKenReverse");
                hdk2.classList.add("hadoken");
                h.style.opacity="1"
                actionGate2=0
              });
        }
      
    }

    if(actionList["/"]==false&&isHadokening2==true){
      if (p1Position > p2Position&&attackCounter1==0){
        const h = document.getElementsByClassName("hadokening")[0];
        if (
            HDKr_2 >= p1l &&
            HDKr_2 <= p1r &&
            HDKb_2 >= p1t &&
            HDKb_2 <= p1b &&
            HDKt_2 <= p1b){
              attackCounter2 += 1;
              if (attackCounter2 == 1) {
                user1.setHP(user1.getHP() - user2.getHadoken());
                console.log("user1 HP: " + user1.getHP());
                console.log("change back to zero")
                actionGate2=0
                h.style.opacity="0"
              }
          }
      }
      
    
      if (p1Position <= p2Position&&attackCounter1==0){
        const h = document.getElementsByClassName("hadoKenReverse")[0];
        if(
            HDKl_2 >= p1l &&
            HDKl_2 <= p1r &&
            HDKb_2 >= p1t &&
            HDKb_2 <= p1b &&
            HDKt_2 <= p1b
            )
           {
            attackCounter2 += 1;
            console.log(attackCounter2)
            if (attackCounter2 == 1) {
              user1.setHP(user1.getHP() - user2.getHadoken());
              console.log("user1 HP: " + user1.getHP());
              console.log("change back to zero")
              actionGate2=0
              h.style.opacity="0"

            }

          }
      }

    }



    if (actionList["s"] == false) {
      player1.classList.remove("dodge");
      player1.classList.add("idle");
    }
    if (actionList["ArrowDown"] == false) {
      player2.classList.remove("dodge");
      player2.classList.add("idle");
    }
  }, 16);
}

const ryu = new Character(true);
const ken = new Character(false);

PublicActionListener(ryu, ken);
