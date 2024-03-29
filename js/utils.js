function qs(arg) {
  return document.querySelector(arg);
}

function qsa(arg) {
  return [...document.querySelectorAll(arg)];
}

// carrega html de arquivos externos
function render(elm, url, fun) {
  let xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (this.status === 200) {
      elm.innerHTML = xhr.responseText;
      if (fun) setTimeout(fun(), 10);
    }
  }
  xhr.open("GET", url, true);
  xhr.send();
}

// carrega todos
function renderAll(func) {
  qsa("[data-component]").forEach(function(e) {
    if (e.getAttribute("data-component")) {
      render(e, e.getAttribute("data-component"), func);
    }
  });
}

// necessário para controlar disparo do 
// evento ao carregar todos os arquivos externos
var clen = 0;
function afterLoad(func) {
  renderAll(function() {
    clen++;
    if (clen === qsa("[data-component]").length) {
      clen = 0;
      func();
      enterPress();
    }
  });
}

function setCookie(key, val, min) {
  const d = new Date();
  d.setTime(d.getTime() + min * 60 * 1000);
  document.cookie = `${key}=${val};expires=${d.toUTCString()};path=/`;
}

function setCookieY(key, val) {
  setCookie(key, val, 365 * 24 * 60);
}

function getCookie(key) {
  key = key + "=";
  let val = "";
  document.cookie.split("; ").forEach(function(e) {
    if (e.indexOf(key) === 0) {
      val = e.substring(key.length, e.length);
      return;
    }
  });
  return val;
}

function clearCookies() {
  document.cookie.split(";").forEach(function(e) {
    delCookie(e.split("=")[0].trim());
  });
}

function delCookie(key) {
  setCookie(key, "", -1);
}

function setSession(key, val) {
  // sessionStorage.setItem(key, val);
  setCookie("session_" + key, val, 30);
}

function getSession(key) {
  // return sessionStorage.getItem(key);
  return getCookie("session_" + key);
}

function delSession(key) {
  // sessionStorage.removeItem("key");
  // sessionStorage.clear();
  delCookie("session_" + key);
}

// converte objetos em json
function encode(object) {
  return JSON.stringify(Object.entries(object));
}

// converte json em objeto de uma determinada classe
function decode(string, T) {
  const object = new T();
  JSON.parse(string).map(([key, value]) => (object[key] = value));
  return object;
}

function changeClass(elem, old_class, new_class) {
  elem.classList.remove(old_class);
  elem.classList.add(new_class);
}

// cria div de mensagem acima de um elemento
function bsAlert(message, type, ele, time = 5000, after = false) {
  qsa("div.alert").forEach(function(e) {e.remove();});
  let html = `<div class="alert alert-${type} alert-dismissible" role="alert"><div>${message}</div><button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>`;
  let div = document.createElement("div");
  div.innerHTML = html;
  if (after) ele.after(div);
  else ele.before(div);
  setTimeout(function() {div.remove();}, time);
}

// converte milissegundo em data hora
// min: 32:34
// short: 23/10 15:32
// long: 23/10/2022 15:32:34
// full: 23/10/2022 15:32:34:234
function getTime(ms, format = "short") {
  let d = new Date(ms);
  let dd = pLeft(d.getDate());
  let mm = pLeft(d.getMonth() + 1);
  let yy = d.getFullYear();
  let h = pLeft(d.getHours());
  let m = pLeft(d.getMinutes());
  let s = pLeft(d.getSeconds());
  let l = pLeft(d.getMilliseconds(), 3);
  
  let f = "";
  if (format == "min") {
    f = `${m}:${s}`;
  } else if (format == "short") {
    f = `${dd}/${mm} ${h}:${m}`;
  } else if (format == "mill") {
    f = `${h}:${m}:${s}:${l}`;
  } else if (format == "long") {
    f = `${dd}/${mm}/${yy} ${h}:${m}:${s}`;
  } else if (format == "full") {
    f = `${dd}/${mm}/${yy} ${h}:${m}:${s}:${l}`;
  }
  return f;
}

function pLeft(n, len = 2) {
  return n.toString().padStart(len, "0");
}

// associa botão ao evento Enter do texto do atributo aria-describedby
function enterPress() {
  qsa('button[aria-describedby]').forEach(function(e) {
    let inp = qs("#" + e.getAttribute("aria-describedby"));
    inp.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        e.click();
      }
    });
  });
}

// número aleatório entre 0 e vlr, vlr inclusive 
function random(vlr) {
  return Math.floor(Math.random() * (vlr + 1));
}

// número aleatório entre min e max
function randomBetween(min, max) {
  return random(max - min) + min;
}

// texto no console
function c(msg) {
  console.log(msg);
}

function capF(text) {
  return text[0].toUpperCase() + text.substring(1);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// adiciona texto div antes do elemento indicado
function ab(text, str_elm) {
  const newDiv = document.createElement("div");
  const newContent = document.createTextNode(text);
  newDiv.appendChild(newContent);
  const elm = qs(str_elm);
  document.body.insertBefore(newDiv, elm);
}

function appendHtml(html, target, bef = false) {
    let tmp = document.createElement("div");
    tmp.innerHTML = html;
    if (!target) target = qs("main");
    let child = tmp.firstChild;
    if (bef)
      target.prepend(child);
    else
      target.append(child);
    return child;
}

function cc(text, replace = false, time_log = false) {
  if (!text) return;
  let div = qs("#div_log");
  if (!div) {
    div = appendHtml(`<div class="mt-4" id="div_log"></div>`);
  }
  let html = replace ? "" : div.innerHTML;
  let t = time_log ? getTime(new Date(), "mill") + " => " : "";
  div.innerHTML = `<p class="p-0 m-0">${t}${text}</p>${html}`;
}

function custom_console() {
  let html = `<div>
    <div class="cus_con_log">
      <div id="cus_con_log_his"></div>
      <hr class="cus_con_log_hr" />
      <div class="cus_con_log_div">
        <label class="cus_con_log_lab" for="input_log">&#10095;</label>
        <input class="cus_con_log_inp" type="text" id="input_log" autofocus="autofocus">
      </div>
    </div>
    <style>
      .cus_con_log {
        padding: 0 6px 2px;
        background-color: #333;
      }
      .cus_con_log * {
        color: #ddd;
      }
      .cus_con_log_hr {
        margin: 10px 0 0;
      }
      .cus_con_log_his * {
        height: 18px;
      }
      .cus_con_log_his_ite label {
        padding-right: 6px;
      }
      .cus_con_log_div {
        display: flex;
      }
      .cus_con_log_lab {
        color: #6C94D2;
      }
      .cus_con_log_inp {
        width: 100%;
        border: none;
        background: none;
        padding: 0 8px;
      }
    </style>
  </div>`;
  appendHtml(html);
  
  qs("#input_log").onkeydown = function() {
    cus_con_exec_log(event);
  }
}

function cus_con_exec_log(ev) {
  if (event.key != "Enter") return;

  let cmd = qs("#input_log").value;
  let ret;
  try {
    ret = eval(cmd);
  } catch (err) {
    ret = err;
  }
  let html = `<div class="cus_con_log_his_ite" onclick="cus_con_reload_cmd('${cmd}')"><label>&#10095;</label>${cmd}</div>`;
  appendHtml(html, qs("#cus_con_log_his"));
  
  if (ret) {
    html = `<div class="cus_con_log_his_ite"><label>&#10094;</label>${ret}</div>`;
    appendHtml(html, qs("#cus_con_log_his"));
  }
  
  qs("#input_log").value = "";
}

function cus_con_reload_cmd(cmd) {
  qs("#input_log").value = cmd;
  qs("#input_log").focus();
}


const pokes = ["*", "bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", "squirtle", "wartortle", "blastoise", "caterpie", "metapod", "butterfree", "weedle", "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", "raticate", "spearow", "fearow", "ekans", "arbok", "pikachu", "raichu", "sandshrew", "sandslash", "nidoran", "nidorina", "nidoqueen", "nidoran", "nidorino", "nidoking", "clefairy", "clefable", "vulpix", "ninetales", "jigglypuff", "wigglytuff", "zubat", "golbat", "oddish", "gloom", "vileplume", "paras", "parasect", "venonat", "venomoth", "diglett", "dugtrio", "meowth", "persian", "psyduck", "golduck", "mankey", "primeape", "growlithe", "arcanine", "poliwag", "poliwhirl", "poliwrath", "abra", "kadabra", "alakazam", "machop", "machoke", "machamp", "bellsprout", "weepinbell", "victreebel", "tentacool", "tentacruel", "geodude", "graveler", "golem", "ponyta", "rapidash", "slowpoke", "slowbro", "magnemite", "magneton", "farfetchd", "doduo", "dodrio", "seel", "dewgong", "grimer", "muk", "shellder", "cloyster", "gastly", "haunter", "gengar", "onix", "drowzee", "hypno", "krabby", "kingler", "voltorb", "electrode", "exeggcute", "exeggutor", "cubone", "marowak", "hitmonlee", "hitmonchan", "lickitung", "koffing", "weezing", "rhyhorn", "rhydon", "chansey", "tangela", "kangaskhan", "horsea", "seadra", "goldeen", "seaking", "staryu", "starmie", "mr", "scyther", "jynx", "electabuzz", "magmar", "pinsir", "tauros", "magikarp", "gyarados", "lapras", "ditto", "eevee", "vaporeon", "jolteon", "flareon", "porygon", "omanyte", "omastar", "kabuto", "kabutops", "aerodactyl", "snorlax", "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew", "chikorita", "bayleef", "meganium", "cyndaquil", "quilava", "typhlosion", "totodile", "croconaw", "feraligatr", "sentret", "furret", "hoothoot", "noctowl", "ledyba", "ledian", "spinarak", "ariados", "crobat", "chinchou", "lanturn", "pichu", "cleffa", "igglybuff", "togepi", "togetic", "natu", "xatu", "mareep", "flaaffy", "ampharos", "bellossom", "marill", "azumarill", "sudowoodo", "politoed", "hoppip", "skiploom", "jumpluff", "aipom", "sunkern", "sunflora", "yanma", "wooper", "quagsire", "espeon", "umbreon", "murkrow", "slowking", "misdreavus", "unown", "wobbuffet", "girafarig", "pineco", "forretress", "dunsparce", "gligar", "steelix", "snubbull", "granbull", "qwilfish", "scizor", "shuckle", "heracross", "sneasel", "teddiursa", "ursaring", "slugma", "magcargo", "swinub", "piloswine", "corsola", "remoraid", "octillery", "delibird", "mantine", "skarmory", "houndour", "houndoom", "kingdra", "phanpy", "donphan", "porygon2", "stantler", "smeargle", "tyrogue", "hitmontop", "smoochum", "elekid", "magby", "miltank", "blissey", "raikou", "entei", "suicune", "larvitar", "pupitar", "tyranitar", "lugia", "ho", "celebi", "treecko", "grovyle", "sceptile", "torchic", "combusken", "blaziken", "mudkip", "marshtomp", "swampert", "poochyena", "mightyena", "zigzagoon", "linoone", "wurmple", "silcoon", "beautifly", "cascoon", "dustox", "lotad", "lombre", "ludicolo", "seedot", "nuzleaf", "shiftry", "taillow", "swellow", "wingull", "pelipper", "ralts", "kirlia", "gardevoir", "surskit", "masquerain", "shroomish", "breloom", "slakoth", "vigoroth", "slaking", "nincada", "ninjask", "shedinja", "whismur", "loudred", "exploud", "makuhita", "hariyama", "azurill", "nosepass", "skitty", "delcatty", "sableye", "mawile", "aron", "lairon", "aggron", "meditite", "medicham", "electrike", "manectric", "plusle", "minun", "volbeat", "illumise", "roselia", "gulpin", "swalot", "carvanha", "sharpedo", "wailmer", "wailord", "numel", "camerupt", "torkoal", "spoink", "grumpig", "spinda", "trapinch", "vibrava", "flygon", "cacnea", "cacturne", "swablu", "altaria", "zangoose", "seviper", "lunatone", "solrock", "barboach", "whiscash", "corphish", "crawdaunt", "baltoy", "claydol", "lileep", "cradily", "anorith", "armaldo", "feebas", "milotic", "castform", "kecleon", "shuppet", "banette", "duskull", "dusclops", "tropius", "chimecho", "absol", "wynaut", "snorunt", "glalie", "spheal", "sealeo", "walrein", "clamperl", "huntail", "gorebyss", "relicanth", "luvdisc", "bagon", "shelgon", "salamence", "beldum", "metang", "metagross", "regirock", "regice", "registeel", "latias", "latios", "kyogre", "groudon", "rayquaza", "jirachi", "deoxys", "turtwig", "grotle", "torterra", "chimchar", "monferno", "infernape", "piplup", "prinplup", "empoleon", "starly", "staravia", "staraptor", "bidoof", "bibarel", "kricketot", "kricketune", "shinx", "luxio", "luxray", "budew", "roserade", "cranidos", "rampardos", "shieldon", "bastiodon", "burmy", "wormadam", "mothim", "combee", "vespiquen", "pachirisu", "buizel", "floatzel", "cherubi", "cherrim", "shellos", "gastrodon", "ambipom", "drifloon", "drifblim", "buneary", "lopunny", "mismagius", "honchkrow", "glameow", "purugly", "chingling", "stunky", "skuntank", "bronzor", "bronzong", "bonsly", "mime", "happiny", "chatot", "spiritomb", "gible", "gabite", "garchomp", "munchlax", "riolu", "lucario", "hippopotas", "hippowdon", "skorupi", "drapion", "croagunk", "toxicroak", "carnivine", "finneon", "lumineon", "mantyke", "snover", "abomasnow", "weavile", "magnezone", "lickilicky", "rhyperior", "tangrowth", "electivire", "magmortar", "togekiss", "yanmega", "leafeon", "glaceon", "gliscor", "mamoswine", "porygon", "gallade", "probopass", "dusknoir", "froslass", "rotom", "uxie", "mesprit", "azelf", "dialga", "palkia", "heatran", "regigigas", "giratina", "cresselia", "phione", "manaphy", "darkrai", "shaymin", "arceus", "victini", "snivy", "servine", "serperior", "tepig", "pignite", "emboar", "oshawott", "dewott", "samurott", "patrat", "watchog", "lillipup", "herdier", "stoutland", "purrloin", "liepard", "pansage", "simisage", "pansear", "simisear", "panpour", "simipour", "munna", "musharna", "pidove", "tranquill", "unfezant", "blitzle", "zebstrika", "roggenrola", "boldore", "gigalith", "woobat", "swoobat", "drilbur", "excadrill", "audino", "timburr", "gurdurr", "conkeldurr", "tympole", "palpitoad", "seismitoad", "throh", "sawk", "sewaddle", "swadloon", "leavanny", "venipede", "whirlipede", "scolipede", "cottonee", "whimsicott", "petilil", "lilligant", "basculin", "sandile", "krokorok", "krookodile", "darumaka", "darmanitan", "maractus", "dwebble", "crustle", "scraggy", "scrafty", "sigilyph", "yamask", "cofagrigus", "tirtouga", "carracosta", "archen", "archeops", "trubbish", "garbodor", "zorua", "zoroark", "minccino", "cinccino", "gothita", "gothorita", "gothitelle", "solosis", "duosion", "reuniclus", "ducklett", "swanna", "vanillite", "vanillish", "vanilluxe", "deerling", "sawsbuck", "emolga", "karrablast", "escavalier", "foongus", "amoonguss", "frillish", "jellicent", "alomomola", "joltik", "galvantula", "ferroseed", "ferrothorn", "klink", "klang", "klinklang", "tynamo", "eelektrik", "eelektross", "elgyem", "beheeyem", "litwick", "lampent", "chandelure", "axew", "fraxure", "haxorus", "cubchoo", "beartic", "cryogonal", "shelmet", "accelgor", "stunfisk", "mienfoo", "mienshao", "druddigon", "golett", "golurk", "pawniard", "bisharp", "bouffalant", "rufflet", "braviary", "vullaby", "mandibuzz", "heatmor", "durant", "deino", "zweilous", "hydreigon", "larvesta", "volcarona", "cobalion", "terrakion", "virizion", "tornadus", "thundurus", "reshiram", "zekrom", "landorus", "kyurem", "keldeo", "meloetta", "genesect", "chespin", "quilladin", "chesnaught", "fennekin", "braixen", "delphox", "froakie", "frogadier", "greninja", "bunnelby", "diggersby", "fletchling", "fletchinder", "talonflame", "scatterbug", "spewpa", "vivillon", "litleo", "pyroar", "flabebe", "floette", "florges", "skiddo", "gogoat", "pancham", "pangoro", "furfrou", "espurr", "meowstic", "honedge", "doublade", "aegislash", "spritzee", "aromatisse", "swirlix", "slurpuff", "inkay", "malamar", "binacle", "barbaracle", "skrelp", "dragalge", "clauncher", "clawitzer", "helioptile", "heliolisk", "tyrunt", "tyrantrum", "amaura", "aurorus", "sylveon", "hawlucha", "dedenne", "carbink", "goomy", "sliggoo", "goodra", "klefki", "phantump", "trevenant", "pumpkaboo", "gourgeist", "bergmite", "avalugg", "noibat", "noivern", "xerneas", "yveltal", "zygarde", "diancie", "hoopa", "volcanion", "rowlet", "dartrix", "decidueye", "litten", "torracat", "incineroar", "popplio", "brionne", "primarina", "pikipek", "trumbeak", "toucannon", "yungoos", "gumshoos", "grubbin", "charjabug", "vikavolt", "crabrawler", "crabominable", "oricorio", "cutiefly", "ribombee", "rockruff", "lycanroc", "wishiwashi", "mareanie", "toxapex", "mudbray", "mudsdale", "dewpider", "araquanid", "fomantis", "lurantis", "morelull", "shiinotic", "salandit", "salazzle", "stufful", "bewear", "bounsweet", "steenee", "tsareena", "comfey", "oranguru", "passimian", "wimpod", "golisopod", "sandygast", "palossand", "pyukumuku", "type", "silvally", "minior", "komala", "turtonator", "togedemaru", "mimikyu", "bruxish", "drampa", "dhelmise", "jangmo", "hakamo", "kommo", "tapu", "tapu", "tapu", "tapu", "cosmog", "cosmoem", "solgaleo", "lunala", "nihilego", "buzzwole", "pheromosa", "xurkitree", "celesteela", "kartana", "guzzlord", "necrozma", "magearna", "marshadow", "poipole", "naganadel", "stakataka", "blacephalon", "zeraora", "meltan", "melmetal", "grookey", "thwackey", "rillaboom", "scorbunny", "raboot", "cinderace", "sobble", "drizzile", "inteleon", "skwovet", "greedent", "rookidee", "corvisquire", "corviknight", "blipbug", "dottler", "orbeetle", "nickit", "thievul", "gossifleur", "eldegoss", "wooloo", "dubwool", "chewtle", "drednaw", "yamper", "boltund", "rolycoly", "carkol", "coalossal", "applin", "flapple", "appletun", "silicobra", "sandaconda", "cramorant", "arrokuda", "barraskewda", "toxel", "toxtricity", "sizzlipede", "centiskorch", "clobbopus", "grapploct", "sinistea", "polteageist", "hatenna", "hattrem", "hatterene", "impidimp", "morgrem", "grimmsnarl", "obstagoon", "perrserker", "cursola", "sirfetchd", "mr", "runerigus", "milcery", "alcremie", "falinks", "pincurchin", "snom", "frosmoth", "stonjourner", "eiscue", "indeedee", "morpeko", "cufant", "copperajah", "dracozolt", "arctozolt", "dracovish", "arctovish", "duraludon", "dreepy", "drakloak", "dragapult", "zacian", "zamazenta", "eternatus", "kubfu", "urshifu", "zarude", "regieleki", "regidrago", "glastrier", "spectrier", "calyrex", "wyrdeer", "kleavor", "ursaluna", "basculegion", "sneasler", "overqwil", "enamorus"];



// export {
//   qs, 
//   qsa, 
//   render, 
//   renderAll, 
//   afterLoad
//   setCookie, 
//   setCookieY, 
//   getCookie, 
//   setSession, 
//   getSession, 
//   encode, 
//   decode, 
//   bsAlert, 
//   getTime, 
//   enterPress, 
//   random, 
//   randomBetween, 
//   c
// };


// (new bootstrap.Modal('#modal_static')).show();
