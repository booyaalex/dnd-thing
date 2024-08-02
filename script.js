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
let textnode;

const temp = window.location.href;
const url = new URL(temp);
const char = url.searchParams.get("char");
const page = url.searchParams.get("page");
console.log(char); // Leondias
console.log(page); // Character
const charArray = [];

function getCharacters() {
  let i = 0;
  db.ref("/Characters").on("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      charArray.push(childSnapshot.key);
      if (childSnapshot.key == char) {
        statsPage(childSnapshot);
      }
    });
    if (!charArray.includes(char)) {
      characterSelect(snapshot);
    }
  });
}

function statsPage(child) {
  document.body.innerHTML = "";
  headerSection(child);
  navSection(child);
  if (page == "Character") {
    characterSection(child);
  }
  if (page == "Battle") {
    battleSection(child);
  }
}

function characterSelect(snapshot) {
  snapshot.forEach(function (child) {
    const section = document.createElement("section");
    section.classList.add("center");
    section.classList.add("flex");
    section.classList.add("between");

    const nameDiv = document.createElement("div");
    nameDiv.classList.add("container");
    nameDiv.classList.add("flex");
    nameDiv.classList.add("evenly");

    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    textnode = document.createTextNode(child.val().name.toUpperCase());
    h2.appendChild(textnode);
    const h3 = document.createElement("h3");
    textnode = document.createTextNode(child.val().pname);
    h3.appendChild(textnode);
    div.appendChild(h2);
    div.appendChild(h3);

    nameDiv.appendChild(div);

    const statusDiv = document.createElement("div");
    statusDiv.classList.add("container");
    statusDiv.classList.add("flex");
    statusDiv.classList.add("evenly");

    DIV("LV: ", child.val().level, child.val().exp);
    DIV("HP", child.val().status.hp, child.val().status.maxHp);
    DIV("MANA", child.val().status.mana, child.val().status.maxMana);

    section.appendChild(nameDiv);
    section.appendChild(statusDiv);

    function DIV(type, a, b) {
      if (type == "LV: ") {
        const div = document.createElement("div");
        const h2 = document.createElement("h2");
        textnode = document.createTextNode(`LV: ${a}`);
        h2.appendChild(textnode);
        const h3 = document.createElement("h3");
        textnode = document.createTextNode(`${b}/${100 * a + 100 * (a + 1)}`);
        h3.appendChild(textnode);
        div.appendChild(h2);
        div.appendChild(h3);
        statusDiv.appendChild(div);
      } else {
        const div = document.createElement("div");
        const h2 = document.createElement("h2");
        textnode = document.createTextNode(type);
        h2.appendChild(textnode);
        const h3 = document.createElement("h3");
        textnode = document.createTextNode(`${a}/${b}`);
        h3.appendChild(textnode);
        div.appendChild(h2);
        div.appendChild(h3);
        statusDiv.appendChild(div);
      }
    }
    document.body.appendChild(section);
  });
}

function headerSection(child) {
  const headerSection = document.createElement("section");
  headerSection.classList.add("center");
  headerSection.classList.add("flex");
  headerSection.classList.add("between");

  const nameDiv = document.createElement("div");
  nameDiv.classList.add("container");
  nameDiv.classList.add("flex");
  nameDiv.classList.add("evenly");

  const div = document.createElement("div");
  const h2 = document.createElement("h2");
  textnode = document.createTextNode(child.val().name.toUpperCase());
  h2.appendChild(textnode);
  const h3 = document.createElement("h3");
  textnode = document.createTextNode(child.val().pname);
  h3.appendChild(textnode);
  div.appendChild(h2);
  div.appendChild(h3);

  nameDiv.appendChild(div);

  const statusDiv = document.createElement("div");
  statusDiv.classList.add("container");
  statusDiv.classList.add("flex");
  statusDiv.classList.add("evenly");

  DIV("LV: ", child.val().level, child.val().exp);
  DIV("HP", child.val().status.hp, child.val().status.maxHp);
  DIV("MANA", child.val().status.mana, child.val().status.maxMana);

  headerSection.appendChild(nameDiv);
  headerSection.appendChild(statusDiv);

  function DIV(type, a, b) {
    if (type == "LV: ") {
      const div = document.createElement("div");
      const h2 = document.createElement("h2");
      textnode = document.createTextNode(`LV: ${a}`);
      h2.appendChild(textnode);
      const h3 = document.createElement("h3");
      textnode = document.createTextNode(`${b}/${100 * a + 100 * (a + 1)}`);
      h3.appendChild(textnode);
      div.appendChild(h2);
      div.appendChild(h3);
      statusDiv.appendChild(div);
    } else {
      const div = document.createElement("div");
      const h2 = document.createElement("h2");
      textnode = document.createTextNode(type);
      h2.appendChild(textnode);
      const h3 = document.createElement("h3");
      textnode = document.createTextNode(`${a}/${b}`);
      h3.appendChild(textnode);
      div.appendChild(h2);
      div.appendChild(h3);
      statusDiv.appendChild(div);
    }
  }
  document.body.appendChild(headerSection);
}
function navSection(child) {
  const navSection = document.createElement("section");
  navSection.classList.add("center");
  navSection.classList.add("flex");
  navSection.classList.add("evenly");

  DIV("Character");
  DIV("Battle");
  DIV("Inventory");

  function DIV(type) {
    let selected;
    if (type == page) {
      selected = true;
    } else {
      selected = false;
    }

    const div = document.createElement("div");
    div.setAttribute("onclick", "newPage(this.id)");
    div.id = type;
    div.classList.add("navLink");
    if (selected) {
      div.classList.add("selected");
    }
    const h3 = document.createElement("h3");
    textnode = document.createTextNode(type);
    h3.appendChild(textnode);
    div.appendChild(h3);
    navSection.appendChild(div);
  }
  document.body.appendChild(navSection);
}

function characterSection(child) {
  row(child, "Stats", "Appearance");
  row(child, "Character", "Extra");
  abilitiesSection(child);
  magicSection(child);
}
function battleSection(child) {
  weaponsSection(child);
  magicSection(child);
  row(child, "Stats", "Extra");
}

function row(child, a, b) {
  const row = document.createElement("div");
  row.classList.add("center");
  row.classList.add("flex");
  row.classList.add("between");
  row.classList.add("row");
  row.classList.add("two");

  if (a == "Stats" || b == "Stats") {
    const section = document.createElement("section");

    const h21 = document.createElement("h2");
    h21.className = "center";
    textnode = document.createTextNode("STATS");
    h21.appendChild(textnode);
    section.appendChild(h21);

    const div = document.createElement("div");
    div.classList.add("center");
    div.classList.add("flex");
    div.classList.add("evenly");
    DIV("Strength", "STR", child.val().stats.STR);
    DIV("Dexterity", "DEX", child.val().stats.DEX);
    DIV("Constitution", "CON", child.val().stats.CON);
    DIV("Intellegence", "INT", child.val().stats.INT);
    DIV("Wisdon", "WIS", child.val().stats.WIS);
    DIV("Charisma", "CHA", child.val().stats.CHA);
    section.appendChild(div);

    const h22 = document.createElement("h2");
    h22.className = "center";
    textnode = document.createTextNode("CONDITIONS");
    h22.appendChild(textnode);
    section.appendChild(h22);

    const p = document.createElement("p");
    textnode = document.createTextNode("Perfectly Healthy Sweety~");
    p.appendChild(textnode);
    section.appendChild(p);

    row.appendChild(section);

    function DIV(a, b, c) {
      const statDiv = document.createElement("div");
      statDiv.setAttribute("title", a);
      const h3 = document.createElement("h3");
      textnode = document.createTextNode(b);
      h3.appendChild(textnode);
      const p = document.createElement("p");
      textnode = document.createTextNode(c);
      p.appendChild(textnode);
      statDiv.appendChild(h3);
      statDiv.appendChild(p);
      div.appendChild(statDiv);
    }
  }
  if (a == "Appearance" || b == "Appearance") {
    const section = document.createElement("section");

    const h2 = document.createElement("h2");
    h2.className = "center";
    textnode = document.createTextNode("APPEARANCE");
    h2.appendChild(textnode);
    section.appendChild(h2);

    const div = document.createElement("div");
    div.classList.add("center");
    div.classList.add("flex");
    div.classList.add("evenly");
    DIV("Age", child.val().desc.appearance.age);
    DIV("Eyes", child.val().desc.appearance.eyes);
    DIV("Gender", child.val().desc.appearance.gender);
    DIV("Hair", child.val().desc.appearance.hair);
    DIV("Height", `${child.val().desc.appearance.height} cm`);
    DIV("Weight", `${child.val().desc.appearance.weight} lbs`);
    section.appendChild(div);

    row.appendChild(section);

    function DIV(a, b) {
      const statDiv = document.createElement("div");
      const h3 = document.createElement("h3");
      textnode = document.createTextNode(a);
      h3.appendChild(textnode);
      const p = document.createElement("p");
      textnode = document.createTextNode(b);
      p.appendChild(textnode);
      statDiv.appendChild(h3);
      statDiv.appendChild(p);
      div.appendChild(statDiv);
    }
  }
  if (a == "Character" || b == "Character") {
    const section = document.createElement("section");

    const h21 = document.createElement("h2");
    h21.className = "center";
    textnode = document.createTextNode("RACE");
    h21.appendChild(textnode);
    section.appendChild(h21);

    const p1 = document.createElement("p");
    p1.className = "center";
    textnode = document.createTextNode(child.val().desc.race);
    p1.appendChild(textnode);
    section.appendChild(p1);

    const h22 = document.createElement("h2");
    h22.className = "center";
    textnode = document.createTextNode("CLASS");
    h22.appendChild(textnode);
    section.appendChild(h22);

    const p2 = document.createElement("p");
    p2.className = "center";
    textnode = document.createTextNode(child.val().desc.class);
    p2.appendChild(textnode);
    section.appendChild(p2);

    row.appendChild(section);
  }
  if (a == "Extra" || b == "Extra") {
    const section = document.createElement("section");

    const h21 = document.createElement("h2");
    h21.className = "center";
    textnode = document.createTextNode("WALK SPEED");
    h21.appendChild(textnode);
    section.appendChild(h21);

    const p1 = document.createElement("p");
    p1.className = "center";
    textnode = document.createTextNode(`${child.val().walkSpeed} ft`);
    p1.appendChild(textnode);
    section.appendChild(p1);

    const h22 = document.createElement("h2");
    h22.className = "center";
    textnode = document.createTextNode("GOLD");
    h22.appendChild(textnode);
    section.appendChild(h22);

    const p2 = document.createElement("p");
    p2.className = "center";
    textnode = document.createTextNode(child.val().gold);
    p2.appendChild(textnode);
    section.appendChild(p2);

    row.appendChild(section);
  }
  document.body.appendChild(row);
}

function abilitiesSection(child) {
  const abilitySection = document.createElement("section");
  abilitySection.className = "center";

  const h2 = document.createElement("h2");
  h2.className = "smallCenter";
  textnode = document.createTextNode("ABILITIES");
  h2.appendChild(textnode);
  abilitySection.appendChild(h2);

  const row = document.createElement("div");
  row.classList.add("flex");
  row.classList.add("evenly");
  const test = child.val().abilities;

  test.forEach(function (ability) {
    const div = document.createElement("div");
    div.classList.add("container");
    div.classList.add("flex");
    div.classList.add("evenly");

    const contain = document.createElement("div");

    const h3 = document.createElement("h3");
    h3.className = "smallCenter";
    textnode = document.createTextNode(ability.test.name);
    h3.appendChild(textnode);
    contain.appendChild(h3);

    const p1 = document.createElement("p");
    p1.className = "smallCenter";
    textnode = document.createTextNode(`Type: ${ability.test.type}`);
    p1.appendChild(textnode);
    contain.appendChild(p1);

    const p2 = document.createElement("p");
    p2.className = "smallCenter";
    textnode = document.createTextNode(ability.test.desc);
    p2.appendChild(textnode);
    contain.appendChild(p2);

    div.appendChild(contain);
    row.appendChild(div);
  });
  abilitySection.appendChild(row);

  document.body.appendChild(abilitySection);
}

function magicSection(child) {
  const magicSection = document.createElement("section");
  magicSection.className = "center";

  const h2 = document.createElement("h2");
  h2.className = "smallCenter";
  textnode = document.createTextNode("SPELLS");
  h2.appendChild(textnode);
  magicSection.appendChild(h2);

  const row = document.createElement("div");
  row.classList.add("flex");
  row.classList.add("evenly");
  child.val().spells.forEach(function (spell) {
    const div = document.createElement("div");
    div.classList.add("container");
    div.classList.add("flex");
    div.classList.add("evenly");

    const contain = document.createElement("div");

    const h3 = document.createElement("h3");
    h3.className = "smallCenter";
    textnode = document.createTextNode(spell.test.name);
    h3.appendChild(textnode);
    contain.appendChild(h3);

    const p1 = document.createElement("p");
    p1.className = "smallCenter";
    textnode = document.createTextNode(`Damage: ${spell.test.damage}`);
    p1.appendChild(textnode);
    contain.appendChild(p1);

    const p2 = document.createElement("p");
    p2.className = "smallCenter";
    textnode = document.createTextNode(`Type: ${spell.test.type}`);
    p2.appendChild(textnode);
    contain.appendChild(p2);

    const p3 = document.createElement("p");
    p3.className = "smallCenter";
    textnode = document.createTextNode(`Range: ${spell.test.range} cm`);
    p3.appendChild(textnode);
    contain.appendChild(p3);

    div.appendChild(contain);
    row.appendChild(div);
  });
  magicSection.appendChild(row);

  document.body.appendChild(magicSection);
}

function weaponsSection(child) {
  const weaponsSection = document.createElement("section");
  weaponsSection.className = "center";

  const h2 = document.createElement("h2");
  h2.className = "smallCenter";
  textnode = document.createTextNode("WEAPONS");
  h2.appendChild(textnode);
  weaponsSection.appendChild(h2);

  const row = document.createElement("div");
  row.classList.add("flex");
  row.classList.add("evenly");
  child.val().inventory.weapons.forEach(function (weapon) {
    const div = document.createElement("div");
    div.classList.add("container");
    div.classList.add("flex");
    div.classList.add("evenly");

    const contain = document.createElement("div");

    const h3 = document.createElement("h3");
    h3.className = "smallCenter";
    textnode = document.createTextNode(weapon.name);
    h3.appendChild(textnode);
    contain.appendChild(h3);

    const p1 = document.createElement("p");
    p1.className = "smallCenter";
    textnode = document.createTextNode(`Damage: ${weapon.damage}`);
    p1.appendChild(textnode);
    contain.appendChild(p1);

    const p2 = document.createElement("p");
    p2.className = "smallCenter";
    textnode = document.createTextNode(
      `Type: ${weapon.type}, ${weapon.attackType}`
    );
    p2.appendChild(textnode);
    contain.appendChild(p2);

    const p3 = document.createElement("p");
    p3.className = "smallCenter";
    textnode = document.createTextNode(`Range: ${weapon.reach} cm`);
    p3.appendChild(textnode);
    contain.appendChild(p3);

    div.appendChild(contain);
    row.appendChild(div);
  });
  weaponsSection.appendChild(row);

  document.body.appendChild(weaponsSection);
}

getCharacters();

function newPage(hi) {
  console.log(url);
  let params = new URLSearchParams(url.search);
  console.log(params.toString());
  params.delete("page");
  params.set("page", hi);
  console.log(`${url.origin}${url.pathname}?${params.toString()}`);
  window.location.href = `${url.origin}${url.pathname}?${params.toString()}`;
}
