const firebaseConfig = {
    apiKey: "AIzaSyCtT2rJWStxP-_qaTmUdlE5UZNW3IPq4-k",
    authDomain: "dnd-thing-53e50.firebaseapp.com",
    databaseURL: "https://dnd-thing-53e50-default-rtdb.firebaseio.com/",
    projectId: "dnd-thing-53e50",
    storageBucket: "dnd-thing-53e50.appspot.com",
    messagingSenderId: "289465071369",
    appId: "1:289465071369:web:cff0e15516ebeb3a04c5d8"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  
  let statsArray = [15, 14, 13, 12, 10, 8];
  
  let characrerName = document.getElementById("character_name_input");
  let playerName = document.getElementById("player_name_input");
  
  let playerStat1 = document.getElementById("stat1");
  let playerStat2 = document.getElementById("stat2");
  let playerStat3 = document.getElementById("stat3");
  let playerStat4 = document.getElementById("stat4");
  let playerStat5 = document.getElementById("stat5");
  let playerStat6 = document.getElementById("stat6");
  
  let characterRace = document.getElementById("race_input");
  let characterClass = document.getElementById("class_selecter");
  
  let playerAppearance1 = document.getElementById("appearance_input_1");
  let playerAppearance2 = document.getElementById("appearance_input_2");
  let playerAppearance3 = document.getElementById("appearance_input_3");
  let playerAppearance4 = document.getElementById("appearance_input_4");
  let playerAppearance5 = document.getElementById("appearance_input_5");
  let playerAppearance6 = document.getElementById("appearance_input_6");
  
  function rollStats() {
    //Ranodomize Numbers
    shuffle(statsArray);
  
    //Display Numbers
    document.getElementById("stat1").innerHTML = statsArray[0];
    document.getElementById("stat2").innerHTML = statsArray[1];
    document.getElementById("stat3").innerHTML = statsArray[2];
    document.getElementById("stat4").innerHTML = statsArray[3];
    document.getElementById("stat5").innerHTML = statsArray[4];
    document.getElementById("stat6").innerHTML = statsArray[5];
  
    document.getElementById("stat1").setAttribute("value", statsArray[0]);
    document.getElementById("stat2").setAttribute("value", statsArray[1]);
    document.getElementById("stat3").setAttribute("value", statsArray[2]);
    document.getElementById("stat4").setAttribute("value", statsArray[3]);
    document.getElementById("stat5").setAttribute("value", statsArray[4]);
    document.getElementById("stat6").setAttribute("value", statsArray[5]);
  }
  
  function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex]
      ];
    }
  }
  
  function submitChar() {
    let maxHP = (Number(playerStat3.innerHTML) * 0.75) + (Number(playerStat1.innerHTML) * 0.75);
    console.log(maxHP);
    let maxMANA = (Number(playerStat5.innerHTML) * 0.75)+ (Number(playerStat1.innerHTML) * 0.75);
    console.log(maxMANA);
    if (confirm("Are you sure you want to save this thing into the database?")) {
      let filled = true;
      const inputs = document.getElementsByClassName("charInput");
      for (let input of inputs) {
        if (input.id == "class_selecter") {
          if (characterClass.value == "") {
            filled = false;
          }
        } else {
          if (input.classList.contains("statInput")) {
            if (input.innerHTML == "") {
              filled = false;
            }
          } else {
            if (!input.value) {
              filled = false;
            }
          }
        }
        console.log(input);
        console.log(input.value);
      }
      if (filled) {
        
        db.ref("/Characters").child(`${characrerName.value}`).update({
          desc: {
            appearance: {
                age: playerAppearance1.value,
                eyes: playerAppearance2.value,
                gender: playerAppearance1.value,
                hair: playerAppearance1.value,
                height: playerAppearance1.value,
                weight: playerAppearance1.value
            },
            background: "None",
            class: characterClass.value,
            race: characterRace
          },
          exp: 0,
          gold: 0,
          inventory: {
            weapons: [
              {
                attackType: "Slashing",
                damage: "1d6+3",
                name: "Dagger",
                reach: 20,
                sell: 20,
                type: "Melee",
                weight: 3
              }
            ]
          },
          level: 1,
          name: characrerName.value,
          pname: playerName.value,
          stats: {
            CHA: playerStat6,
            CON: playerStat3,
            DEX: playerStat2,
            INT: playerStat4,
            STR: playerStat1,
            WIS: playerStat5
          },
          status: {
            hp: maxHP,
            maxHp: maxHP,
            mana: maxMANA,
            maxMana: maxMANA
          },
          walkSpeed: Number(playerStat2 * 2)
        });
      } else {
        alert("Fill in all inputs please");
      }
    } else {
      console.log("Thing was not saved to the database.");
    }
  }
  