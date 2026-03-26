/**
 * TESTJSO - JEU D'AVENTURE LILOCROCO
 * Version desobfusquee et nettoyee
 * 
 * DESCRIPTION:
 * Jeu d'aventure cooperatif sur une ile mysterieuse avec 4 joueurs
 * 
 * JOUEURS:
 * - ROUGE (id: 0) - Position: (16, 1)
 * - VERT  (id: 1) - Position: (16, 12)
 * - BLEU  (id: 2) - Position: (1, 1)
 * - JAUNE (id: 3) - Position: (1, 12)
 * 
 * MECANIQUES:
 * - Grille: 16x12 cases
 * - Crocodiles qui se deplacent et attaquent
 * - Cartes de fatigue et blessures
 * - Inventaire: 2 mains + 3 sac a dos
 * - Timer: 10 minutes par tour
 * 
 * OBJETS:
 * totem, machette, arc, torche, filet, fruit, lance, piege
 * 
 * MISSIONS:
 * 100 missions secretes avec systeme de votes
 */
const getString = decodeString;
(function (arrayFunc, seed) {
  const decode = decodeString, array = arrayFunc();
  while (true) {
    try {
      const checksum = parseInt(decode(878)) / 1 + -parseInt(decode(848)) / 2 * (-parseInt(decode(730)) / 3) + parseInt(decode(671)) / 4 + parseInt(decode(614)) / 5 * (parseInt(decode(645)) / 6) + -parseInt(decode(804)) / 7 * (parseInt(decode(536)) / 8) + parseInt(decode(627)) / 9 + -parseInt(decode(507)) / 10 * (parseInt(decode(851)) / 11);
      if (checksum === seed) break; else array.push(array.shift());
    } catch (error) {
      array.push(array.shift());
    }
  }
}(getStringArray, 994811));
const synth = window.speechSynthesis;
function speak(message) {
  const decoder = getString;
  synth.cancel(), setTimeout(() => {
    const decoder2 = decoder, utterance = new SpeechSynthesisUtterance(message);
    utterance.pitch = 1.1, utterance.rate = 1, utterance.lang = "fr-CA", synth.speak(utterance);
  }, 250);
}
const alphabet = "ABCDEFGHIJKL";
let players = [
  {id: 2, name: "BLEU", picto: "👤", x: 1, y: 1, votes: 0, leftHand: null, rightHand: null, backpack: [null, null, null], actions: [], status: [], fatigueCards: 0, woundCards: 0, turnStartBites: 0, lastActionClicks: [], xp: 0},
  {id: 0, name: "ROUGE", picto: "👨‍🦰", x: 16, y: 1, votes: 0, leftHand: null, rightHand: null, backpack: [null, null, null], actions: [], status: [], fatigueCards: 0, woundCards: 0, turnStartBites: 0, lastActionClicks: [], xp: 0},
  {id: 3, name: "JAUNE", picto: "👩", x: 1, y: 12, votes: 0, leftHand: null, rightHand: null, backpack: [null, null, null], actions: [], status: [], fatigueCards: 0, woundCards: 0, turnStartBites: 0, lastActionClicks: [], xp: 0},
  {id: 1, name: "VERT", picto: "👨", x: 16, y: 12, votes: 0, leftHand: null, rightHand: null, backpack: [null, null, null], actions: [], status: [], fatigueCards: 0, woundCards: 0, turnStartBites: 0, lastActionClicks: [], xp: 0}], currentPlayer = 0, turnStep = 0, currentRange = 0, crocos = [], fishes = [], birds = [], scenery = [], isAnimating = false, currentWeather = "sunny", selectedItem = null, currentCellItems = [], autoSearchDone = false, giftMode = false, giftTargetPlayer = null, huntMode = false, huntTargets = [], html5QrCode = null, isScanning = false, firebaseDB = null, gameSessionId = null, isOnline = false, mangues = [], totemScanMode = false, totemSelectedItem = null, diamonds = [], hadTotemBeforeSearch = false, globalGameDuration = 30, globalTimeRemaining = 0, gameTimeExpired = false, globalTimerInterval = null, gameStartTime = null, gameEnded = false, publicHelpSelectedItem = null, selectedPlayers = [], currentPlayerSetupIndex = 0, playerQrCodeScanner = null, isPlayerScanning = false, pendingPlayerId = null, turnSummary = {fatigueAdded: 0, fatigueRemoved: 0, woundAdded: 0, woundRemoved: 0, itemsBroken: [], itemsUsed: [], itemsCollected: [], itemsDropped: [], missionsCompleted: [], votesGained: 0};
const carteBLEU = [{1: "O", 2: "W", 3: "N", 4: "R", 5: "Q", 6: "C", 7: "A", 8: "G", 9: "V", 10: "L", 11: "Z", 12: "U", 13: "E", 14: "Y", 15: "K", 16: "M"}, {1: "Y", 2: "P", 3: "F", 4: "J", 5: "Z", 6: "A", 7: "C", 8: "W", 9: "B", 10: "U", 11: "R", 12: "S", 13: "L", 14: "E", 15: "Q", 16: "D"}, {1: "Z", 2: "V", 3: "M", 4: "G", 5: "T", 6: "S", 7: "I", 8: "E", 9: "R", 10: "K", 11: "H", 12: "D", 13: "N", 14: "B", 15: "F", 16: "C"}, {1: "Y", 2: "C", 3: "H", 4: "J", 5: "A", 6: "X", 7: "D", 8: "L", 9: "S", 10: "I", 11: "B", 12: "V", 13: "K", 14: "Z", 15: "U", 16: "M"}, {1: "I", 2: "B", 3: "Y", 4: "D", 5: "U", 6: "G", 7: "M", 8: "P", 9: "O", 10: "N", 11: "S", 12: "A", 13: "C", 14: "V", 15: "L", 16: "H"}], carteROUGE = [{1: "T", 2: "H", 3: "G", 4: "B", 5: "O", 6: "A", 7: "Z", 8: "P", 9: "X", 10: "R", 11: "U", 12: "S", 13: "Y", 14: "Q", 15: "K", 16: "J"}, {1: "Q", 2: "U", 3: "L", 4: "B", 5: "W", 6: "N", 7: "J", 8: "Z", 9: "X", 10: "H", 11: "E", 12: "R", 13: "D", 14: "G", 15: "F", 16: "C"}, {1: "U", 2: "T", 3: "K", 4: "E", 5: "G", 6: "H", 7: "A", 8: "Q", 9: "C", 10: "M", 11: "B", 12: "O", 13: "Y", 14: "N", 15: "P", 16: "I"}, {1: "E", 2: "K", 3: "V", 4: "B", 5: "I", 6: "D", 7: "Y", 8: "C", 9: "S", 10: "U", 11: "G", 12: "R", 13: "F", 14: "J", 15: "Q", 16: "M"}, {1: "S", 2: "U", 3: "C", 4: "R", 5: "G", 6: "T", 7: "F", 8: "E", 9: "B", 10: "Q", 11: "Z", 12: "K", 13: "I", 14: "P", 15: "D", 16: "Y"}], carteJAUNE = [{1: "K", 2: "Q", 3: "V", 4: "B", 5: "F", 6: "C", 7: "R", 8: "Z", 9: "D", 10: "I", 11: "P", 12: "G", 13: "N", 14: "L", 15: "Y", 16: "E"}, {1: "U", 2: "R", 3: "E", 4: "I", 5: "P", 6: "J", 7: "O", 8: "C", 9: "V", 10: "F", 11: "B", 12: "G", 13: "Y", 14: "L", 15: "Q", 16: "K"}, {1: "G", 2: "F", 3: "C", 4: "Z", 5: "R", 6: "K", 7: "O", 8: "X", 9: "L", 10: "H", 11: "W", 12: "A", 13: "I", 14: "P", 15: "N", 16: "T"}, {1: "B", 2: "J", 3: "M", 4: "G", 5: "O", 6: "Q", 7: "P", 8: "L", 9: "T", 10: "Y", 11: "X", 12: "F", 13: "D", 14: "H", 15: "S", 16: "W"}, {1: "W", 2: "K", 3: "Q", 4: "Z", 5: "J", 6: "I", 7: "R", 8: "O", 9: "V", 10: "L", 11: "E", 12: "T", 13: "A", 14: "C", 15: "D", 16: "Y"}], carteVERT = [{1: "M", 2: "C", 3: "D", 4: "X", 5: "S", 6: "A", 7: "I", 8: "F", 9: "G", 10: "W", 11: "T", 12: "H", 13: "V", 14: "B", 15: "U", 16: "K"}, {1: "D", 2: "E", 3: "V", 4: "R", 5: "G", 6: "J", 7: "A", 8: "Z", 9: "O", 10: "C", 11: "H", 12: "I", 13: "T", 14: "U", 15: "B", 16: "F"}, {1: "N", 2: "D", 3: "K", 4: "E", 5: "S", 6: "O", 7: "C", 8: "I", 9: "H", 10: "F", 11: "M", 12: "L", 13: "P", 14: "X", 15: "Y", 16: "T"}, {1: "Y", 2: "E", 3: "U", 4: "H", 5: "W", 6: "M", 7: "N", 8: "O", 9: "B", 10: "V", 11: "Q", 12: "K", 13: "L", 14: "S", 15: "A", 16: "F"}, {1: "F", 2: "R", 3: "Y", 4: "J", 5: "Z", 6: "V", 7: "G", 8: "U", 9: "I", 10: "D", 11: "L", 12: "N", 13: "X", 14: "A", 15: "H", 16: "M"}];
const ITEMS = [
        {name: 'totem', icon: '🗿', durability: null},
        {name: 'pioche', icon: '⛏️', durability: 3},
        {name: 'arc', icon: '🏹', durability: 2},
        {name: 'torche', icon: '🔥', durability: 3},
        {name: 'gourde', icon: '🥤', durability: 2},
        {name: 'trousse', icon: '🩹', durability: null},
        {name: 'canne', icon: '🎣', durability: 2},
        {name: 'bottes', icon: '🥾', durability: 2}
    ];

let hiddenItems = [];
const SECRET_MISSIONS = [{id: 1, description: "Collecter 3 fruits", votes: 120, condition: player => checkFruitsCollected(player, 3)}, {id: 2, description: "Se deplacer 3 fois sans morsure", votes: 180, condition: player => checkMove3WithoutBite3Times(player)}, {id: 3, description: "Offrir un objet", votes: 100, condition: player => checkGiftGiven(player)}, {id: 4, description: "Chasser ou pêcher 2 animaux", votes: 140, condition: player => checkHunt2Animals(player)}, {id: 5, description: "Trouver le totem", votes: 160, condition: player => checkTotemFound(player)}, {id: 6, description: "Survivre a 3 morsures", votes: 200, condition: player => checkSurvive3Bites(player)}, {id: 7, description: "Avoir 2 torches", votes: 120, condition: player => checkTwoTorches(player)}, {id: 8, description: "3 clics consecutifs sur Se cacher", votes: 140, condition: player => check3ConsecutiveHideClicks(player)}, {id: 9, description: "Collecter 5 objets différents", votes: 160, condition: player => checkCollect5Items(player)}, {id: 10, description: "Atteindre le camp ennemi", votes: 180, condition: player => checkReachEnemyCamp(player)}, ...Array.from({length: 90}, (unused, index) => ({id: index + 11, description: "Mission secrète " + (index + 11), votes: 15 + Math.floor(Math.random() * 35), condition: player => false}))];
function createItem(itemTemplate) {
  const decoder = getString;
  return {name: itemTemplate.name, icon: itemTemplate.icon, durability: itemTemplate.durability, maxDurability: itemTemplate.durability};
}
function getBaseOwner(x, y) {
  if (x <= 2 && y <= 2) return 0;
  if (x >= 15 && y <= 2) return 1;
  if (x <= 2 && y >= 11) return 2;
  if (x >= 15 && y >= 11) return 3;
  return null;
}
function initIsland() {
  const decoder = getString;
  let crocoId = 1;
  const baseZones = [{x1: 1, x2: 3, y1: 1, y2: 3}, {x1: 14, x2: 16, y1: 1, y2: 3}, {x1: 1, x2: 3, y1: 10, y2: 12}, {x1: 14, x2: 16, y1: 10, y2: 12}];
  baseZones.forEach(zone => {
    const decoder2 = decoder;
    let placed = false, attempts = 0;
    while (!placed && attempts < 100) {
      let randomX = Math.floor(Math.random() * (zone.x2 - zone.x1 + 1)) + zone.x1, randomY = Math.floor(Math.random() * (zone.y2 - zone.y1 + 1)) + zone.y1;
      getBaseOwner(randomX, randomY) === null && (crocos.push({id: crocoId++, x: randomX, y: randomY, oldX: randomX, oldY: randomY, stage: "none", seen: false}), placed = true), attempts++;
    }
  });
  const centerZones = [[4, 8, 4, 6], [9, 13, 4, 6], [4, 8, 7, 9], [9, 13, 7, 9]];
  centerZones.forEach(centerZone => {
    const decoder3 = decoder;
    for (let i = 0; i < 2; i++) {
      let crocoX, crocoY, tryCount = 0;
      do {
        crocoX = Math.floor(Math.random() * (centerZone[1] - centerZone[0] + 1)) + centerZone[0], crocoY = Math.floor(Math.random() * (centerZone[3] - centerZone[2] + 1)) + centerZone[2], tryCount++;
      } while ((crocos.some(croco => croco.x === crocoX && croco.y === crocoY) || crocoX >= 7 && crocoX <= 10 && crocoY >= 5 && crocoY <= 8) && tryCount < 100);
      !(crocoX >= 7 && crocoX <= 10 && crocoY >= 5 && crocoY <= 8) && crocos.push({id: crocoId++, x: crocoX, y: crocoY, oldX: crocoX, oldY: crocoY, stage: "egg", seen: false});
    }
  });
  
 scenery.push({x: 1, y: 7, type: 'cocotier', icon: '🌴', stock: 1, fruit: '🥥', item: null});
 scenery.push({x: 2, y: 7, type: 'cocotier', icon: '🌴', stock: 1, fruit: '🥥', item: null});
 scenery.push({x: 4, y: 2, type: 'cocotier', icon: '🌴', stock: 1, fruit: '🥥', item: null});
 scenery.push({x: 4, y: 5, type: 'cocotier', icon: '🌴', stock: 1, fruit: '🥥', item: null});
 scenery.push({x: 6, y: 11, type: 'cocotier', icon: '🌴', stock: 1, fruit: '🥥', item: null});
 scenery.push({x: 7, y: 4, type: 'cocotier', icon: '🌴', stock: 1, fruit: '🥥', item: null});
 scenery.push({x: 7, y: 11, type: 'cocotier', icon: '🌴', stock: 1, fruit: '🥥', item: null});
 scenery.push({x: 8, y: 2, type: 'cocotier', icon: '🌴', stock: 1, fruit: '🥥', item: null});
 scenery.push({x: 9, y: 11, type: 'cocotier', icon: '🌴', stock: 1, fruit: '🥥', item: null});
 scenery.push({x: 10, y: 1, type: 'cocotier', icon: '🌴', stock: 1, fruit: '🥥', item: null});
 scenery.push({x: 10, y: 3, type: 'cocotier', icon: '🌴', stock: 1, fruit: '🥥', item: null});
 scenery.push({x: 10, y: 10, type: 'cocotier', icon: '🌴', stock: 1, fruit: '🥥', item: null});
 scenery.push({x: 10, y: 12, type: 'cocotier', icon: '🌴', stock: 1, fruit: '🥥', item: null});
 scenery.push({x: 11, y: 2, type: 'cocotier', icon: '🌴', stock: 1, fruit: '🥥', item: null});
 scenery.push({x: 12, y: 1, type: 'cocotier', icon: '🌴', stock: 1, fruit: '🥥', item: null});

 scenery.push({x: 2, y: 4, type: 'bananier', icon: '🌿', stock: 1, fruit: '🍌', item: null});
 scenery.push({x: 1, y: 6, type: 'bananier', icon: '🌿', stock: 1, fruit: '🍌', item: null});
 scenery.push({x: 3, y: 8, type: 'bananier', icon: '🌿', stock: 1, fruit: '🍌', item: null});
 scenery.push({x: 4, y: 11, type: 'bananier', icon: '🌿', stock: 1, fruit: '🍌', item: null});
 scenery.push({x: 5, y: 8, type: 'bananier', icon: '🌿', stock: 1, fruit: '🍌', item: null});
 scenery.push({x: 5, y: 10, type: 'bananier', icon: '🌿', stock: 1, fruit: '🍌', item: null});
 scenery.push({x: 6, y: 2, type: 'bananier', icon: '🌿', stock: 1, fruit: '🍌', item: null});
 scenery.push({x: 8, y: 1, type: 'bananier', icon: '🌿', stock: 1, fruit: '🍌', item: null});
 scenery.push({x: 12, y: 11, type: 'bananier', icon: '🌿', stock: 1, fruit: '🍌', item: null});
 scenery.push({x: 13, y: 5, type: 'bananier', icon: '🌿', stock: 1, fruit: '🍌', item: null});
 scenery.push({x: 13, y: 10, type: 'bananier', icon: '🌿', stock: 1, fruit: '🍌', item: null});
 scenery.push({x: 14, y: 5, type: 'bananier', icon: '🌿', stock: 1, fruit: '🍌', item: null});
 scenery.push({x: 14, y: 8, type: 'bananier', icon: '🌿', stock: 1, fruit: '🍌', item: null});
 scenery.push({x: 15, y: 5, type: 'bananier', icon: '🌿', stock: 1, fruit: '🍌', item: null});
 scenery.push({x: 15, y: 9, type: 'bananier', icon: '🌿', stock: 1, fruit: '🍌', item: null});
 scenery.push({x: 16, y: 4, type: 'bananier', icon: '🌿', stock: 1, fruit: '🍌', item: null});
 
  const _0xe61a94 = [{x1: 1, x2: 8, y1: 1, y2: 6}, {x1: 9, x2: 16, y1: 1, y2: 6}, {x1: 1, x2: 8, y1: 7, y2: 12}, {x1: 9, x2: 16, y1: 7, y2: 12}];
  _0xe61a94.forEach((_0x4c0c2c, _0xe8b186) => {
    ITEMS.forEach(_0x1833e6 => {
      const _0x4e6d7e = decodeString;
      for (let _0xff5bc1 = 0; _0xff5bc1 < 2; _0xff5bc1++) {
        let _0x220e21 = false, _0x2d27a2 = 0;
        while (!_0x220e21 && _0x2d27a2 < 100) {
          let _0x1e2294 = Math[_0x4e6d7e(472)](Math.random() * (_0x4c0c2c.x2 - _0x4c0c2c.x1 + 1)) + _0x4c0c2c.x1, _0x47983c = Math.floor(Math.random() * (_0x4c0c2c.y2 - _0x4c0c2c.y1 + 1)) + _0x4c0c2c.y1;
          getBaseOwner(_0x1e2294, _0x47983c) === null && !(_0x1e2294 === 0 || _0x1e2294 === 17 || _0x47983c === 0 || _0x47983c === 13) && !(_0x1e2294 >= 7 && _0x1e2294 <= 10 && _0x47983c >= 5 && _0x47983c <= 8) && (hiddenItems[_0x4e6d7e(948)]({x: _0x1e2294, y: _0x47983c, item: createItem(_0x1833e6), found: false, discovered: false, zone: _0xe8b186}), _0x220e21 = true), _0x2d27a2++;
        }
      }
    });
  });
  let _0x2dad8b = 1, _0x3a7aad = [];
  for (let _0x43aebb = 0; _0x43aebb <= 17; _0x43aebb++) {
    for (let _0x44200a = 0; _0x44200a <= 13; _0x44200a++) {
      (_0x43aebb === 0 || _0x43aebb === 17 || _0x44200a === 0 || _0x44200a === 13) && _0x3a7aad.push({x: _0x43aebb, y: _0x44200a});
    }
  }
  for (let _0x284afe = 0; _0x284afe < 10; _0x284afe++) {
    let _0x20edc1 = _0x3a7aad[decoder(540)](_0x267026 => {
      const _0x1cede3 = decoder;
      if (fishes[_0x1cede3(790)](_0x3587bf => _0x3587bf.x === _0x267026.x && _0x3587bf.y === _0x267026.y)) return false;
      if (crocos[_0x1cede3(790)](_0x55bb54 => _0x55bb54.x === _0x267026.x && _0x55bb54.y === _0x267026.y)) return false;
      let _0x47be05 = fishes.some(_0x15a634 => {
        let _0x4d9b14 = getDistance(_0x15a634.x, _0x15a634.y, _0x267026.x, _0x267026.y);
        return _0x4d9b14 < 4;
      });
      return !_0x47be05;
    });
    if (_0x20edc1[decoder(450)] > 0) {
      let _0x1e6c40 = _0x20edc1[Math.floor(Math.random() * _0x20edc1[decoder(450)])];
      fishes.push({id: _0x2dad8b++, x: _0x1e6c40.x, y: _0x1e6c40.y});
    }
  }
  let _0x2ee9c9 = 1, _0xcad3e0 = [];
  for (let _0x9fff1c = 0; _0x9fff1c <= 17; _0x9fff1c++) {
    for (let _0x2e72c3 = 0; _0x2e72c3 <= 13; _0x2e72c3++) {
      _0xcad3e0.push({x: _0x9fff1c, y: _0x2e72c3});
    }
  }
  for (let _0x596a41 = 0; _0x596a41 < 10; _0x596a41++) {
    let _0xdaba9d = _0xcad3e0[decoder(540)](_0x2c625a => {
      const _0x1e5a22 = decoder;
      if (crocos[_0x1e5a22(790)](_0x554c3f => _0x554c3f.x === _0x2c625a.x && _0x554c3f.y === _0x2c625a.y)) return false;
      if (fishes.some(_0x3690a3 => _0x3690a3.x === _0x2c625a.x && _0x3690a3.y === _0x2c625a.y)) return false;
      if (birds.some(_0x5a0a53 => _0x5a0a53.x === _0x2c625a.x && _0x5a0a53.y === _0x2c625a.y)) return false;
      if (_0x2c625a.x >= 7 && _0x2c625a.x <= 10 && _0x2c625a.y >= 5 && _0x2c625a.y <= 8) return false;
      return true;
    });
    if (_0xdaba9d[decoder(450)] > 0) {
      let _0x23efac = _0xdaba9d[Math.floor(Math.random() * _0xdaba9d[decoder(450)])];
      birds.push({id: _0x2ee9c9++, x: _0x23efac.x, y: _0x23efac.y});
    }
  }
  let _0x7ffc58 = [];
  for (let _0x46ebf1 = 1; _0x46ebf1 <= 16; _0x46ebf1++) {
    for (let _0x27b04f = 1; _0x27b04f <= 12; _0x27b04f++) {
      let _0x2e6ff4 = _0x46ebf1 === 1 || _0x46ebf1 === 16 || _0x27b04f === 1 || _0x27b04f === 12, _0x224931 = getBaseOwner(_0x46ebf1, _0x27b04f) !== null;
      _0x2e6ff4 && !_0x224931 && _0x7ffc58.push({x: _0x46ebf1, y: _0x27b04f});
    }
  }
  for (let _0x309f08 = 0; _0x309f08 < 15; _0x309f08++) {
    let _0x2985f1 = _0x7ffc58[decoder(540)](_0x3ee242 => {
      const _0x4b76a0 = decoder;
      if (mangues[_0x4b76a0(790)](_0x430485 => _0x430485.x === _0x3ee242.x && _0x430485.y === _0x3ee242.y)) return false;
      let _0x36f1c5 = mangues[_0x4b76a0(790)](_0x369401 => {
        let _0x1695df = getDistance(_0x369401.x, _0x369401.y, _0x3ee242.x, _0x3ee242.y);
        return _0x1695df < 3;
      });
      return !_0x36f1c5;
    });
    if (_0x2985f1[decoder(450)] > 0) {
      let _0x5c95ef = _0x2985f1[Math.floor(Math.random() * _0x2985f1[decoder(450)])];
      mangues.push({x: _0x5c95ef.x, y: _0x5c95ef.y, found: false});
    }
  }
  let _0x37cf51 = [];
  for (let _0x4e41b3 = 7; _0x4e41b3 <= 10; _0x4e41b3++) {
    for (let _0xe770ce = 5; _0xe770ce <= 8; _0xe770ce++) {
      _0x37cf51.push({x: _0x4e41b3, y: _0xe770ce});
    }
  }
  for (let _0x1a4779 = 0; _0x1a4779 < 4; _0x1a4779++) {
    if (_0x37cf51.length === 0) break;
    let _0x483c67 = Math.floor(Math.random() * _0x37cf51[decoder(450)]), _0x247d05 = _0x37cf51[_0x483c67];
    diamonds.push({x: _0x247d05.x, y: _0x247d05.y, found: false}), _0x37cf51[decoder(827)](_0x483c67, 1);
  }
  console[decoder(670)](decoder(695), crocos), console[decoder(670)](decoder(707), fishes), console.log(decoder(907), birds), console[decoder(670)](decoder(890), mangues), console.log("INIT - Diamants (zone volcan):", diamonds), console.log(decoder(903), hiddenItems.length, "objets répartis"), console[decoder(670)]("INIT - Tous les objets cachés :", hiddenItems), console[decoder(670)](decoder(799), ITEMS[decoder(825)](_0x4b627e => _0x4b627e.name + ": " + hiddenItems[decoder(540)](_0xd3b48d => _0xd3b48d[decoder(530)].name === _0x4b627e.name)[decoder(450)]).join(", "));
  let _0x112e1d = hiddenItems[decoder(540)](_0x1112e4 => _0x1112e4[decoder(530)].name === decoder(727));
  console.log(decoder(578)), _0x112e1d.forEach((_0x58097d, _0x26a938) => {
    const _0x135bcf = decoder;
    let _0x2061a5 = "" + alphabet[_0x58097d.y - 1] + _0x58097d.x;
    console.log("  Totem " + (_0x26a938 + 1) + ": " + _0x2061a5 + _0x135bcf(853) + _0x58097d.x + _0x135bcf(691) + _0x58097d.y + _0x135bcf(448) + _0x58097d[_0x135bcf(541)]);
  }), renderGrid();
}
const LAUNCH_PHRASES = ["Direct en cours ! Bienvenue sur Lilocroco TV ! C'est parti pour une nouvelle aventure !", "Mesdames et messieurs, le show commence ! Que le meilleur aventurier gagne !", "Attention, caméras en place ! L'île vous attend, aventuriers !", "3, 2, 1... Action ! Bienvenue dans la plus grande aventure de votre vie !", getString(482), getString(820), getString(492), "Bienvenue dans l'aventure ultime ! Que la chasse aux votes commence !", "Le show le plus attendu de l'année démarre maintenant ! Bonne chance à tous !", getString(494)];
function showPlayerSelection() {
  const _0x43e836 = getString;
  let _0x1e7f75 = document[_0x43e836(880)](_0x43e836(845));
  _0x1e7f75 && (globalGameDuration = parseInt(_0x1e7f75[_0x43e836(956)])), 
  document.getElementById(_0x43e836(750)).style[_0x43e836(699)] = "none", 
  document[_0x43e836(743)](_0x43e836(607)).style[_0x43e836(699)] = _0x43e836(574), 
  initFirebase(), 
  updatePlayerSelectionUI(),
  prepMove(3);
}
function updatePlayerSelectionUI() {
  const _0x41b1fa = getString, _0x30e291 = ["ROUGE", "VERT", "BLEU", "JAUNE"], _0x25522e = ['player-color-2', 'player-color-0', 'player-color-3', 'player-color-1'], _0x5421de = ["👨‍🦰","👨","👤", "👩"];
  let _0x42657d = _0x30e291[currentPlayerSetupIndex], _0x377260 = _0x25522e[currentPlayerSetupIndex], _0x48f733 = _0x5421de[currentPlayerSetupIndex];
  document[_0x41b1fa(743)]("player-selection-subtitle").innerText = _0x41b1fa(514) + _0x42657d, document[_0x41b1fa(743)](_0x41b1fa(926))[_0x41b1fa(443)] = _0x48f733 + " JOUEUR " + _0x42657d, document[_0x41b1fa(743)]("btn-scan-player")[_0x41b1fa(443)] = _0x41b1fa(469) + _0x42657d, document[_0x41b1fa(743)]("btn-generic-player")[_0x41b1fa(901)] = _0x41b1fa(784) + _0x377260, document[_0x41b1fa(743)](_0x41b1fa(673))[_0x41b1fa(901)] = "player-btn player-btn-scan " + _0x377260;
}
function selectGenericPlayer() {
  const _0x4095d7 = getString, _0x363c7a = ["ROUGE", "VERT", "BLEU", "JAUNE"], _0x396a91 = ["👨‍🦰","👨","👤", "👩"], _0x468e16 = [{x: 1, y: 1}, {x: 16, y: 1}, {x: 1, y: 12}, {x: 16, y: 12}];
  let _0xa400d8 = {id: currentPlayerSetupIndex, name: _0x363c7a[currentPlayerSetupIndex], picto: _0x396a91[currentPlayerSetupIndex], x: _0x468e16[currentPlayerSetupIndex].x, y: _0x468e16[currentPlayerSetupIndex].y, votes: 0, leftHand: null, rightHand: null, backpack: [null, null, null], actions: [], status: [], fatigueCards: 0, woundCards: 0, turnStartBites: 0, lastActionClicks: [], xp: 0, isGeneric: true};
  selectedPlayers[_0x4095d7(948)](_0xa400d8), console[_0x4095d7(670)]("Joueur générique ajouté:", _0xa400d8), askForNextPlayer();
}
function scanPersonalPlayer() {
  const _0x12defe = getString;
  document[_0x12defe(743)](_0x12defe(451))[_0x12defe(612)][_0x12defe(699)] = _0x12defe(887), document[_0x12defe(743)]("player-qr-status").innerText = _0x12defe(872), playerQrCodeScanner = new Html5Qrcode(_0x12defe(522));
  const _0x2af837 = {fps: 10, qrbox: {width: 250, height: 250}, aspectRatio: 1};
  playerQrCodeScanner[_0x12defe(579)]({facingMode: _0x12defe(453)}, _0x2af837, onPlayerQRCodeScanned, onPlayerQRCodeError)[_0x12defe(629)](() => {
    isPlayerScanning = true;
  })[_0x12defe(534)](_0x12ecfe => {
    const _0xb90a43 = _0x12defe;
    console.error(_0xb90a43(850), _0x12ecfe), document.getElementById(_0xb90a43(641))[_0xb90a43(443)] = _0xb90a43(583);
  });
}
function onPlayerQRCodeScanned(_0x2096ab, _0x5606ec) {
  const _0x15d66c = getString;
  console.log("QR Code aventurier scanné:", _0x2096ab);
  if (!_0x2096ab[_0x15d66c(525)](_0x15d66c(921)) || !_0x2096ab.endsWith(_0x15d66c(708))) {
    document[_0x15d66c(743)](_0x15d66c(641)).innerText = _0x15d66c(900), speak(_0x15d66c(659));
    return;
  }
  let _0x2f439b = _0x2096ab[_0x15d66c(720)](4, _0x2096ab[_0x15d66c(450)] - 5);
  if (!_0x2f439b || _0x2f439b[_0x15d66c(450)] === 0) {
    document.getElementById(_0x15d66c(641))[_0x15d66c(443)] = _0x15d66c(813), speak("QR Code invalide !");
    return;
  }
  console[_0x15d66c(670)]("Identifiant unique extrait:", _0x2f439b), closePlayerQRScanner(), checkPlayerProfile(_0x2f439b);
}
function onPlayerQRCodeError(_0x880095) {}
function closePlayerQRScanner() {
  const _0x3b1927 = getString;
  playerQrCodeScanner && isPlayerScanning ? playerQrCodeScanner[_0x3b1927(904)]().then(() => {
    const _0x346621 = _0x3b1927;
    isPlayerScanning = false, playerQrCodeScanner[_0x346621(718)](), document.getElementById(_0x346621(451))[_0x346621(612)][_0x346621(699)] = "none";
  })[_0x3b1927(534)](_0x278093 => {
    const _0x508834 = _0x3b1927;
    console[_0x508834(529)](_0x508834(603), _0x278093);
  }) : document[_0x3b1927(743)](_0x3b1927(451)).style[_0x3b1927(699)] = _0x3b1927(854);
}
function checkPlayerProfile(_0x59a650) {
  const _0x4d1f46 = getString;
  if (!firebaseDB) {
    console[_0x4d1f46(437)](_0x4d1f46(874)), pendingPlayerId = _0x59a650, showNameInputPopup();
    return;
  }
  const _0x871f9b = firebaseDB[_0x4d1f46(774)](_0x4d1f46(719) + _0x59a650), _0x1980ba = new Promise((_0x277eb9, _0x6750cd) => setTimeout(() => _0x6750cd(new Error(_0x4d1f46(664))), 5e3));
  Promise.race([_0x871f9b.once("value"), _0x1980ba])[_0x4d1f46(629)](_0x3490b1 => {
    const _0x8ff6d6 = _0x4d1f46;
    if (_0x3490b1[_0x8ff6d6(596)]()) {
      let _0x334d68 = _0x3490b1[_0x8ff6d6(800)]();
      console[_0x8ff6d6(670)]("Profil existant récupéré:", _0x334d68), createPlayerFromData(_0x59a650, _0x334d68), speak(_0x8ff6d6(912) + _0x334d68[_0x8ff6d6(666)] + " !");
    } else console[_0x8ff6d6(670)](_0x8ff6d6(924)), pendingPlayerId = _0x59a650, showNameInputPopup();
  })[_0x4d1f46(534)](_0x264303 => {
    const _0x33f771 = _0x4d1f46;
    console.error(_0x33f771(855), _0x264303), console[_0x33f771(670)](_0x33f771(754)), pendingPlayerId = _0x59a650, showNameInputPopup();
  });
}
function showNameInputPopup() {
  const _0x2e92de = getString;
  document[_0x2e92de(743)](_0x2e92de(808)).value = "", document[_0x2e92de(743)]("name-input-box")[_0x2e92de(612)][_0x2e92de(699)] = _0x2e92de(887), document[_0x2e92de(743)]("overlay")[_0x2e92de(612)][_0x2e92de(699)] = "block";
}
function confirmPlayerName() {
  const _0x5db061 = getString;
  let _0x6336af = document[_0x5db061(743)](_0x5db061(808))[_0x5db061(956)][_0x5db061(917)]();
  if (!_0x6336af || _0x6336af[_0x5db061(450)] === 0) {
    speak(_0x5db061(595));
    return;
  }
  document.getElementById(_0x5db061(797))[_0x5db061(612)][_0x5db061(699)] = _0x5db061(854), document[_0x5db061(743)](_0x5db061(642))[_0x5db061(612)][_0x5db061(699)] = "none";
  let _0x30783e = {name: _0x6336af, votes: 0, leftHand: null, rightHand: null, backpack: [null, null, null], actions: [], status: [], fatigueCards: 0, woundCards: 0, turnStartBites: 0, lastActionClicks: [], xp: 0};
  firebaseDB && firebaseDB[_0x5db061(774)](_0x5db061(719) + pendingPlayerId)[_0x5db061(543)](_0x30783e)[_0x5db061(629)](() => {
    const _0x6ca844 = _0x5db061;
    console[_0x6ca844(670)](_0x6ca844(532), pendingPlayerId, _0x30783e), speak(_0x6ca844(508) + _0x6336af + " !");
  })[_0x5db061(534)](_0x3d2625 => {
    const _0x3323a8 = _0x5db061;
    console[_0x3323a8(529)](_0x3323a8(662), _0x3d2625);
  }), createPlayerFromData(pendingPlayerId, _0x30783e), pendingPlayerId = null;
}
function createPlayerFromData(_0x3a631c, _0x547da1) {
  const _0x117827 = getString, _0x447ed3 = ["👨‍🦰","👨","👤", "👩" ], _0x22c13a = [{x: 1, y: 1}, {x: 16, y: 1}, {x: 1, y: 12}, {x: 16, y: 12}];
  let _0x1c411d = {id: currentPlayerSetupIndex, firebaseId: _0x3a631c, name: _0x547da1[_0x117827(666)], picto: _0x447ed3[currentPlayerSetupIndex], x: _0x22c13a[currentPlayerSetupIndex].x, y: _0x22c13a[currentPlayerSetupIndex].y, votes: _0x547da1[_0x117827(644)] || 0, leftHand: _0x547da1[_0x117827(731)] || null, rightHand: _0x547da1.rightHand || null, backpack: _0x547da1[_0x117827(875)] || [null, null, null], actions: _0x547da1[_0x117827(490)] || [], status: _0x547da1[_0x117827(638)] || [], fatigueCards: _0x547da1[_0x117827(675)] || 0, woundCards: _0x547da1[_0x117827(826)] || 0, timeRemaining: gameTimeDuration * 60, timeOut: false, turnStartBites: _0x547da1[_0x117827(710)] || 0, lastActionClicks: _0x547da1.lastActionClicks || [], xp: _0x547da1.xp || 0, isGeneric: false};
  selectedPlayers[_0x117827(948)](_0x1c411d), console[_0x117827(670)](_0x117827(687), _0x1c411d), askForNextPlayer();
}
function askForNextPlayer() {
  const _0x162c6c = getString;
  if (selectedPlayers[_0x162c6c(450)] >= 4) {
    startGameWithPlayers();
    return;
  }
  document[_0x162c6c(743)](_0x162c6c(732))[_0x162c6c(612)][_0x162c6c(699)] = _0x162c6c(887), document[_0x162c6c(743)](_0x162c6c(642))[_0x162c6c(612)][_0x162c6c(699)] = _0x162c6c(887);
}
function addAnotherPlayer() {
  const _0x3119f9 = getString;
  document.getElementById(_0x3119f9(732)).style[_0x3119f9(699)] = _0x3119f9(854), currentPlayerSetupIndex++, updatePlayerSelectionUI();
}
function startGameWithPlayers() {
  const _0x384f9f = getString;
  document[_0x384f9f(743)](_0x384f9f(732))[_0x384f9f(612)].display = "none", document[_0x384f9f(743)](_0x384f9f(607)).style[_0x384f9f(699)] = _0x384f9f(854), document[_0x384f9f(743)]("overlay")[_0x384f9f(612)][_0x384f9f(699)] = "none", players = selectedPlayers, console[_0x384f9f(670)](_0x384f9f(737), players), launchGame();
}
function launchGame() {
  const _0x3d966c = getString;
  // Initialisation du chrono global
  createGlobalTimerDisplay();
  initIsland();
  startGlobalTimer();
  let _0x45b0a9 = LAUNCH_PHRASES[Math.floor(Math[_0x3d966c(480)]() * LAUNCH_PHRASES[_0x3d966c(450)])];
  speak(_0x45b0a9), updateQRButtonVisibility();
}
function startPlayerTimer() {
  // OBSOLÈTE - Remplacé par le chrono global
  return;
  /*
  const _0x2a002b = getString;
  let _0x3c444c = players[currentPlayer];
  if (_0x3c444c[_0x2a002b(819)]) return;
  turnStartTime = Date.now(), updatePlayerTimerDisplay(), gameTimerInterval && clearInterval(gameTimerInterval), gameTimerInterval = setInterval(() => {
    const _0x5ab89c = _0x2a002b;
    let _0x37d1c0 = players[currentPlayer], _0x111ddc = Math.floor((Date.now() - turnStartTime) / 1e3);
    _0x37d1c0.timeRemaining = Math[_0x5ab89c(883)](0, _0x37d1c0[_0x5ab89c(764)] - 1), updatePlayerTimerDisplay(), _0x37d1c0.timeRemaining <= 0 && endPlayerTimer();
  }, 1e3);
  */
}
function updatePlayerTimerDisplay() {
  const _0x22d61a = getString;
  let _0x2dd688 = players[currentPlayer], _0x578d58 = Math[_0x22d61a(472)](_0x2dd688[_0x22d61a(764)] / 60), _0xd29de8 = _0x2dd688[_0x22d61a(764)] % 60, _0x13b8d5 = _0x578d58 + ":" + _0xd29de8.toString()[_0x22d61a(876)](2, "0"), _0xf7b8a0 = "", _0x269220 = "";
  if (currentWeather === _0x22d61a(685)) _0xf7b8a0 = _0x22d61a(618), _0x269220 = _0x22d61a(746); else {
    if (currentWeather === _0x22d61a(958)) _0xf7b8a0 = "⛈️", _0x269220 = _0x22d61a(661); else currentWeather === "Pluie fine" ? (_0xf7b8a0 = _0x22d61a(928), _0x269220 = "PLUIE FINE - Bananiers +1 stock") : (_0xf7b8a0 = "☀️", _0x269220 = _0x22d61a(909));
  }
  let _0x5747b6 = [_0x22d61a(945), _0x22d61a(714), "#f1c40f", _0x22d61a(817)], _0x268190 = _0x5747b6[currentPlayer], _0x5d2aca = _0x22d61a(601) + _0x268190 + _0x22d61a(577) + _0x2dd688[_0x22d61a(666)] + _0x22d61a(922) + _0x13b8d5;
  document[_0x22d61a(743)](_0x22d61a(841))[_0x22d61a(617)] = _0xf7b8a0 + " " + _0x269220 + _0x22d61a(499) + _0x5d2aca;
  document.getElementById("weather-banner").dataset.originalWeather = _0xf7b8a0 + " " + _0x269220;
}
function endPlayerTimer() {
  const _0x22641e = getString;
  gameTimerInterval && (clearInterval(gameTimerInterval), gameTimerInterval = null);
  let _0x27f8a9 = players[currentPlayer];
  _0x27f8a9[_0x22641e(819)] = true, _0x27f8a9[_0x22641e(764)] = 0, speak(_0x22641e(449) + _0x27f8a9[_0x22641e(666)] + " !"), updatePlayerTimerDisplay();
  let _0x410f6b = players.every(_0x19f52e => _0x19f52e[_0x22641e(819)]);
  _0x410f6b && (gameEnded = true);
}
function stopPlayerTimer() {
  // OBSOLÈTE - Remplacé par le chrono global
  return;
}
function initFirebase() {
  const _0x397045 = getString, _0x59e75c = {apiKey: _0x397045(622), authDomain: _0x397045(557), databaseURL: _0x397045(893), projectId: _0x397045(465), storageBucket: _0x397045(829), messagingSenderId: _0x397045(910), appId: _0x397045(748), measurementId: "G-9L8FBHX54F"};
  try {
    !firebase.apps.length && firebase[_0x397045(734)](_0x59e75c), firebaseDB = firebase.database(), gameSessionId = localStorage[_0x397045(538)]("lilocroco_session_id"), !gameSessionId && (gameSessionId = _0x397045(866) + Date[_0x397045(770)]() + "_" + Math[_0x397045(480)]()[_0x397045(952)](36)[_0x397045(870)](2, 9), localStorage.setItem(_0x397045(712), gameSessionId)), listenToGlobalWeather(), listenToGlobalEvents(), isOnline = true, showSyncIndicator(), console.log(_0x397045(653), gameSessionId);
  } catch (_0x4b553e) {
    console.error("Erreur Firebase:", _0x4b553e), isOnline = false, speak(_0x397045(795));
  }
}
function showSyncIndicator() {
  const _0x2698df = getString, _0x4762a2 = document[_0x2698df(743)](_0x2698df(858));
  _0x4762a2[_0x2698df(483)][_0x2698df(568)]("active"), setTimeout(() => {
    const _0x5c0b32 = _0x2698df;
    _0x4762a2[_0x5c0b32(483)].remove(_0x5c0b32(955));
  }, 3e3);
}
function listenToGlobalWeather() {
  const _0x455e23 = getString;
  if (!firebaseDB) return;
  const _0x2bb2a6 = firebaseDB[_0x455e23(774)](_0x455e23(444));
  _0x2bb2a6.on(_0x455e23(956), _0x44d1cd => {
    const _0x2e360f = _0x455e23, _0x1be95a = _0x44d1cd[_0x2e360f(800)]();
    if (_0x1be95a && _0x1be95a[_0x2e360f(846)] && _0x1be95a[_0x2e360f(549)]) {
      const _0x393253 = Date[_0x2e360f(770)]();
      _0x393253 - _0x1be95a[_0x2e360f(549)] < 3e5 && console[_0x2e360f(670)](_0x2e360f(961), _0x1be95a[_0x2e360f(846)]);
    }
  });
}
function listenToGlobalEvents() {
  const _0x4544ce = getString;
  if (!firebaseDB) return;
  const _0x542c8a = firebaseDB[_0x4544ce(774)](_0x4544ce(823)).limitToLast(10);
  _0x542c8a.on(_0x4544ce(956), _0x28ad9a => {
    const _0x5f4e1f = _0x4544ce, _0x49f864 = [];
    _0x28ad9a[_0x5f4e1f(849)](_0x243539 => {
      const _0x5c7306 = _0x5f4e1f;
      _0x49f864[_0x5c7306(948)](_0x243539[_0x5c7306(800)]());
    }), displayGlobalEvents(_0x49f864);
  });
}
function displayGlobalEvents(_0x791d4c) {
  const _0x2514ac = getString, _0x34aa61 = document.getElementById("global-events"), _0x20e7ea = document[_0x2514ac(743)](_0x2514ac(780));
  if (_0x791d4c[_0x2514ac(450)] === 0) {
    _0x34aa61[_0x2514ac(612)][_0x2514ac(699)] = "none";
    return;
  }
  _0x34aa61[_0x2514ac(612)][_0x2514ac(699)] = "block", _0x20e7ea[_0x2514ac(617)] = "", _0x791d4c.slice(-5)[_0x2514ac(741)]()[_0x2514ac(849)](_0x12bca0 => {
    const _0x2cd56d = _0x2514ac, _0x55cb2b = document.createElement(_0x2cd56d(511));
    _0x55cb2b.className = "event-item";
    const _0x264789 = getTimeAgo(_0x12bca0[_0x2cd56d(549)]), _0x5b1a91 = getEventIcon(_0x12bca0[_0x2cd56d(561)]);
    _0x55cb2b.innerHTML = _0x5b1a91 + _0x2cd56d(840) + _0x12bca0[_0x2cd56d(728)] + "</strong> " + _0x12bca0.message + _0x2cd56d(548) + _0x264789 + _0x2cd56d(668), _0x20e7ea[_0x2cd56d(447)](_0x55cb2b);
  });
}
function getEventIcon(_0x45ecc2) {
  const _0x358e8b = {totem: "🗿", mission: "🎯", bite: "🐊", hunt: "🎣", move3: "🏃", default: "⭐"};
  return _0x358e8b[_0x45ecc2] || _0x358e8b.default;
}
function getTimeAgo(_0x26a39a) {
  const _0x4c05d4 = getString, _0x448583 = Math[_0x4c05d4(472)]((Date[_0x4c05d4(770)]() - _0x26a39a) / 1e3);
  if (_0x448583 < 60) return _0x4c05d4(689);
  if (_0x448583 < 3600) return Math[_0x4c05d4(472)](_0x448583 / 60) + "min";
  return Math[_0x4c05d4(472)](_0x448583 / 3600) + "h";
}
function publishGlobalEvent(_0x2d49ee, _0x138db5) {
  const _0x5bf596 = getString;
  if (!firebaseDB || !isOnline) return;
  const _0x324cc0 = players[currentPlayer], _0x26bddd = {type: _0x2d49ee, playerName: _0x324cc0.name, message: _0x138db5, timestamp: Date[_0x5bf596(770)](), sessionId: gameSessionId};
  firebaseDB[_0x5bf596(774)](_0x5bf596(823))[_0x5bf596(948)](_0x26bddd)[_0x5bf596(629)](() => {
    const _0x9fbeb0 = _0x5bf596;
    console[_0x9fbeb0(670)]("Événement publié:", _0x26bddd), showSyncIndicator();
  }).catch(_0x1ba7c5 => console[_0x5bf596(529)](_0x5bf596(793), _0x1ba7c5));
}
function publishGlobalWeather(_0x1344a5) {
  const _0x34e5a4 = getString;
  if (!firebaseDB || !isOnline) return;
  const _0x5cb1c4 = {weather: _0x1344a5, timestamp: Date[_0x34e5a4(770)](), sessionId: gameSessionId};
  firebaseDB[_0x34e5a4(774)](_0x34e5a4(444)).set(_0x5cb1c4)[_0x34e5a4(629)](() => {
    const _0x411a85 = _0x34e5a4;
    console[_0x411a85(670)](_0x411a85(860), _0x1344a5), showSyncIndicator();
  })[_0x34e5a4(534)](_0x555c52 => console[_0x34e5a4(529)]("Erreur publication météo:", _0x555c52));
}
function hasBottes(_0x34fb6a) {
  const _0x2083fa = getString;
  return _0x34fb6a[_0x2083fa(731)] && _0x34fb6a[_0x2083fa(731)][_0x2083fa(666)] === _0x2083fa(892) || _0x34fb6a[_0x2083fa(470)] && _0x34fb6a[_0x2083fa(470)][_0x2083fa(666)] === _0x2083fa(892) || _0x34fb6a[_0x2083fa(875)].some(_0x184be9 => _0x184be9 && _0x184be9[_0x2083fa(666)] === _0x2083fa(892));
}
function prepMove(_0x4c4199) {
  const _0x4e47d7 = getString;
  if (isAnimating) return;
  let _0x3e3bd6 = players[currentPlayer];
  if (currentWeather === _0x4e47d7(958) && !hasBottes(_0x3e3bd6)) _0x4c4199--;
  currentRange = _0x4c4199, turnStep = 1, 
  //document.getElementById(_0x4e47d7(550)).style.opacity = _0x4e47d7(953), 
  updateQRButtonVisibility(), 
  renderGrid();
}
function getDistance(_0x42ddf8, _0x55fb26, _0x3caa46, _0x292c9f) {
  const _0x5a73dd = getString;
  return Math[_0x5a73dd(667)](_0x42ddf8 - _0x3caa46) + Math[_0x5a73dd(667)](_0x55fb26 - _0x292c9f);
}
function hasGourde(_0x95cb36) {
  const _0x3ec5e9 = getString;
  return _0x95cb36.leftHand && _0x95cb36[_0x3ec5e9(731)].name === _0x3ec5e9(628) || _0x95cb36[_0x3ec5e9(470)] && _0x95cb36.rightHand[_0x3ec5e9(666)] === _0x3ec5e9(628) || _0x95cb36[_0x3ec5e9(875)].some(_0x57f64e => _0x57f64e && _0x57f64e[_0x3ec5e9(666)] === _0x3ec5e9(628));
}
function renderGrid() {
  const _0x552af2 = getString, _0x435e8e = document.getElementById(_0x552af2(686));
  _0x435e8e[_0x552af2(617)] = "";
  const _0x9a978 = players[currentPlayer];
  for (let _0x50b533 = _0x9a978.y - 3; _0x50b533 <= _0x9a978.y + 3; _0x50b533++) {
    for (let _0x5be19c = _0x9a978.x - 3; _0x5be19c <= _0x9a978.x + 3; _0x5be19c++) {
      const _0x192798 = document[_0x552af2(935)](_0x552af2(511));
      if (_0x5be19c < 0 || _0x5be19c > 17 || _0x50b533 < 0 || _0x50b533 > 13) _0x192798.className = _0x552af2(721); else {
        if (_0x5be19c === 0 || _0x5be19c === 17 || _0x50b533 === 0 || _0x50b533 === 13) _0x192798[_0x552af2(901)] = "cell cell-sea", huntMode && turnStep === 2 && huntTargets[_0x552af2(849)](_0x3a5885 => {
          const _0x475e68 = _0x552af2;
          _0x3a5885.x === _0x5be19c && _0x3a5885.y === _0x50b533 && (_0x192798[_0x475e68(483)][_0x475e68(568)](_0x475e68(439)), _0x192798[_0x475e68(781)] = () => huntTarget(_0x3a5885));
        }), crocos[_0x552af2(849)](_0x5a381a => {
          const _0x464b8a = _0x552af2;
          if (_0x5a381a.x === _0x5be19c && _0x5a381a.y === _0x50b533) {
            let _0x403451 = document[_0x464b8a(935)]("div");
            _0x403451[_0x464b8a(901)] = _0x464b8a(619), _0x403451[_0x464b8a(617)] = '🐊<div class="croco-num">' + _0x5a381a.id + _0x464b8a(625), _0x192798.appendChild(_0x403451);
          }
        }), fishes[_0x552af2(849)](_0x164a73 => {
          const _0x1af9ef = _0x552af2;
          if (_0x164a73.x === _0x5be19c && _0x164a73.y === _0x50b533) {
            let _0x25cbe8 = document.createElement(_0x1af9ef(511));
            _0x25cbe8[_0x1af9ef(901)] = _0x1af9ef(640), _0x25cbe8[_0x1af9ef(617)] = '🐟<div class="fish-num">' + _0x164a73.id + "</div>", _0x192798[_0x1af9ef(447)](_0x25cbe8);
          }
        }), birds[_0x552af2(849)](_0x3444c9 => {
          const _0x3c6218 = _0x552af2;
          if (_0x3444c9.x === _0x5be19c && _0x3444c9.y === _0x50b533) {
            let _0x45b635 = document[_0x3c6218(935)](_0x3c6218(511));
            _0x45b635[_0x3c6218(901)] = _0x3c6218(630), _0x45b635[_0x3c6218(617)] = '🦅<div class="bird-num">' + _0x3444c9.id + _0x3c6218(625), _0x192798.appendChild(_0x45b635);
          }
        }); else {
          _0x192798[_0x552af2(901)] = _0x552af2(654);
          let _0x45c5fa = getBaseOwner(_0x5be19c, _0x50b533);
          if (_0x45c5fa !== null) _0x192798[_0x552af2(483)][_0x552af2(568)](_0x552af2(949) + _0x45c5fa);
          if (_0x5be19c >= 7 && _0x5be19c <= 10 && _0x50b533 >= 5 && _0x50b533 <= 8) _0x192798[_0x552af2(483)][_0x552af2(568)](_0x552af2(517));
          if (_0x5be19c === _0x9a978.x && _0x50b533 === _0x9a978.y) _0x192798[_0x552af2(483)].add("cell-player");
          let _0x5fa44c = getDistance(_0x9a978.x, _0x9a978.y, _0x5be19c, _0x50b533), _0x43da5d = players[_0x552af2(790)](_0x56cb67 => _0x56cb67.id !== _0x9a978.id && _0x56cb67.x === _0x5be19c && _0x56cb67.y === _0x50b533), _0x4b591f = turnStep === 1 && _0x5fa44c <= currentRange && !_0x43da5d && !isAnimating;
          _0x4b591f && (_0x5be19c >= 7 && _0x5be19c <= 10 && _0x50b533 >= 5 && _0x50b533 <= 8 ? _0x192798[_0x552af2(483)].add(_0x552af2(567)) : _0x192798[_0x552af2(483)][_0x552af2(568)]("cell-reachable"));
          if (giftMode && turnStep === 2) {
            let _0x17f28d = getAdjacentPlayersWithSpace();
            _0x17f28d[_0x552af2(849)](_0x1a4204 => {
              const _0x16fa1f = _0x552af2;
              _0x1a4204.x === _0x5be19c && _0x1a4204.y === _0x50b533 && (_0x192798[_0x16fa1f(483)][_0x16fa1f(568)]("cell-giftable"), _0x192798.onclick = () => selectGiftTarget(_0x1a4204.id));
            });
          }
          huntMode && turnStep === 2 && huntTargets.forEach(_0xf36964 => {
            const _0x5ef0cf = _0x552af2;
            _0xf36964.x === _0x5be19c && _0xf36964.y === _0x50b533 && (_0x192798[_0x5ef0cf(483)].add(_0x5ef0cf(439)), _0x192798[_0x5ef0cf(781)] = () => huntTarget(_0xf36964));
          });
          !totemScanMode && crocos[_0x552af2(849)](_0x58a3c2 => {
            const _0x43584c = _0x552af2;
            if (_0x58a3c2.x === _0x5be19c && _0x58a3c2.y === _0x50b533) {
              let _0x3b670f = document[_0x43584c(935)](_0x43584c(511));
              _0x3b670f[_0x43584c(901)] = _0x43584c(619), _0x3b670f[_0x43584c(617)] = _0x43584c(788) + _0x58a3c2.id + _0x43584c(625), _0x192798[_0x43584c(447)](_0x3b670f);
            }
          });
          players[_0x552af2(849)](_0x2a0dde => {
            const _0x4de3b0 = _0x552af2;
            if (_0x2a0dde.x === _0x5be19c && _0x2a0dde.y === _0x50b533) _0x192798[_0x4de3b0(617)] += _0x4de3b0(842) + _0x2a0dde[_0x4de3b0(590)] + _0x4de3b0(868);
          });
          if (totemScanMode && totemSelectedItem) {
            let _0x58b72e = hiddenItems[_0x552af2(540)](_0x12bb40 => _0x12bb40.x === _0x5be19c && _0x12bb40.y === _0x50b533 && !_0x12bb40[_0x552af2(865)] && _0x12bb40[_0x552af2(530)][_0x552af2(666)] === totemSelectedItem);
            _0x58b72e[_0x552af2(849)](_0x549a0d => {
              const _0x42b51b = _0x552af2;
              _0x192798[_0x42b51b(617)] += _0x549a0d[_0x42b51b(530)][_0x42b51b(937)];
            });
          } else scenery[_0x552af2(849)](_0x3fd19a => {
            const _0x58a3b3 = _0x552af2;
            if (_0x3fd19a.x === _0x5be19c && _0x3fd19a.y === _0x50b533) _0x192798.innerHTML += _0x3fd19a[_0x58a3b3(937)];
          }), birds[_0x552af2(849)](_0x28b29a => {
            const _0x6bd026 = _0x552af2;
            if (_0x28b29a.x === _0x5be19c && _0x28b29a.y === _0x50b533) {
              let _0x3dbfe2 = document[_0x6bd026(935)](_0x6bd026(511));
              _0x3dbfe2[_0x6bd026(901)] = _0x6bd026(630), _0x3dbfe2[_0x6bd026(617)] = _0x6bd026(704) + _0x28b29a.id + "</div>", _0x192798[_0x6bd026(447)](_0x3dbfe2);
            }
          });
          _0x192798.innerHTML += _0x552af2(786) + alphabet[_0x50b533 - 1] + _0x5be19c + "</span>";
          if (_0x4b591f) _0x192798.onclick = () => finalizeTurnMove(_0x5be19c, _0x50b533, _0x5fa44c);
        }
      }
      _0x435e8e[_0x552af2(447)](_0x192798);
    }
  }
}
function startTurn() {
  const _0x4141ca = getString, _0x231cb0 = players[currentPlayer];
  if (_0x231cb0[_0x4141ca(819)]) {
    showPlayerTimeOutPopup();
    return;
  }
  startPlayerTimer(), turnSummary = {fatigueAdded: 0, fatigueRemoved: 0, woundAdded: 0, woundRemoved: 0, itemsBroken: [], itemsUsed: [], itemsCollected: [], itemsDropped: [], missionsCompleted: [], votesGained: 0}, console.log(_0x4141ca(811)), console[_0x4141ca(670)](_0x4141ca(520), JSON.parse(JSON[_0x4141ca(681)](players))), renderGrid();
  let _0x4cddb2 = _0x231cb0[_0x4141ca(638)][_0x4141ca(925)](_0x4141ca(474)), _0xf64b18 = _0x231cb0[_0x4141ca(731)] && _0x231cb0[_0x4141ca(731)].name === _0x4141ca(832) || _0x231cb0[_0x4141ca(470)] && _0x231cb0[_0x4141ca(470)][_0x4141ca(666)] === _0x4141ca(832);
  _0x231cb0[_0x4141ca(710)] = 0;
  if (crocos.some(_0xae19d => _0xae19d.x === _0x231cb0.x && _0xae19d.y === _0x231cb0.y)) {
    if (_0x4cddb2) speak(_0x4141ca(794)); else _0xf64b18 ? speak(_0x4141ca(545)) : (_0x231cb0[_0x4141ca(826)]++, turnSummary[_0x4141ca(562)]++, _0x231cb0.turnStartBites++, updateFatigueWoundDisplay(_0x231cb0), 
    checkEvacuation(_0x231cb0), 
    //document[_0x4141ca(743)](_0x4141ca(696))[_0x4141ca(880)]("p")[_0x4141ca(443)] = _0x4141ca(440), 
    //document[_0x4141ca(743)](_0x4141ca(642))[_0x4141ca(612)][_0x4141ca(699)] = _0x4141ca(887), 
    //document.getElementById(_0x4141ca(696)).style.display = _0x4141ca(887), 
    speak(_0x4141ca(785)));
  }
  _0x231cb0[_0x4141ca(638)] = _0x231cb0[_0x4141ca(638)][_0x4141ca(540)](_0x15484c => _0x15484c !== _0x4141ca(474)), decreaseHandItemsDurability(_0x231cb0), updateQRButtonVisibility(), updateUI();
  // DÃ©marrer automatiquement le dÃ©placement
  prepMove(3);
}
function moveCrocosGlobal() {
    const _0xd4f23 = getString;
    console[_0xd4f23(670)](_0xd4f23(643), JSON[_0xd4f23(929)](JSON[_0xd4f23(681)](crocos))), crocos.forEach(_0xcdc8d6 => {
    const _0xc4ff3 = _0xd4f23;
    _0xcdc8d6.oldX = _0xcdc8d6.x, _0xcdc8d6[_0xc4ff3(787)] = _0xcdc8d6.y, _0xcdc8d6[_0xc4ff3(598)] = false;
    let _0x169bc9 = players[_0xc4ff3(569)]((_0x45f815, _0x4e39fe) => getDistance(_0xcdc8d6.x, _0xcdc8d6.y, _0x4e39fe.x, _0x4e39fe.y) < getDistance(_0xcdc8d6.x, _0xcdc8d6.y, _0x45f815.x, _0x45f815.y) ? _0x4e39fe : _0x45f815), _0x1fd23c = _0xcdc8d6.x, _0x1a4d10 = _0xcdc8d6.y;
    if (_0xcdc8d6.x < _0x169bc9.x) _0x1fd23c++;
    if (_0xcdc8d6.x > _0x169bc9.x) _0x1fd23c--;
    if (_0xcdc8d6.y < _0x169bc9.y) _0x1a4d10++;
    if (_0xcdc8d6.y > _0x169bc9.y) _0x1a4d10--;
    let _0xd6dd69 = crocos.some(_0x33c96f => _0x33c96f.id !== _0xcdc8d6.id && _0x33c96f.x === _0x1fd23c && _0x33c96f.y === _0x1a4d10) || fishes[_0xc4ff3(790)](_0x44f519 => _0x44f519.x === _0x1fd23c && _0x44f519.y === _0x1a4d10) || birds[_0xc4ff3(790)](_0x53b324 => _0x53b324.x === _0x1fd23c && _0x53b324.y === _0x1a4d10);
    if (getBaseOwner(_0x1fd23c, _0x1a4d10) !== null || _0x1fd23c >= 7 && _0x1fd23c <= 10 && _0x1a4d10 >= 5 && _0x1a4d10 <= 8 || _0xd6dd69) {
      let _0x54b224 = [{x: 0, y: 1}, {x: 0, y: -1}, {x: 1, y: 0}, {x: -1, y: 0}, {x: 1, y: 1}, {x: -1, y: -1}, {x: 1, y: -1}, {x: -1, y: 1}], _0x553439 = _0x54b224[_0xc4ff3(540)](_0xfe93b3 => {
        const _0x420808 = _0xc4ff3;
        let _0x34cfec = _0xcdc8d6.x + _0xfe93b3.x, _0x43ddf1 = _0xcdc8d6.y + _0xfe93b3.y, _0x31830c = _0x34cfec === 0 || _0x34cfec === 17 || _0x43ddf1 === 0 || _0x43ddf1 === 13, _0x20fef1 = _0x34cfec >= 1 && _0x34cfec <= 16 && _0x43ddf1 >= 1 && _0x43ddf1 <= 12 && getBaseOwner(_0x34cfec, _0x43ddf1) === null && !(_0x34cfec >= 7 && _0x34cfec <= 10 && _0x43ddf1 >= 5 && _0x43ddf1 <= 8), _0x4b8933 = !crocos[_0x420808(790)](_0x110128 => _0x110128.x === _0x34cfec && _0x110128.y === _0x43ddf1) && !fishes[_0x420808(790)](_0x4955ee => _0x4955ee.x === _0x34cfec && _0x4955ee.y === _0x43ddf1) && !birds[_0x420808(790)](_0x1a1e69 => _0x1a1e69.x === _0x34cfec && _0x1a1e69.y === _0x43ddf1);
        return (_0x31830c || _0x20fef1) && _0x4b8933;
      });
      if (_0x553439[_0xc4ff3(450)] > 0) {
        let _0x2319f4 = _0x553439[Math[_0xc4ff3(472)](Math.random() * _0x553439[_0xc4ff3(450)])];
        _0xcdc8d6.x += _0x2319f4.x, _0xcdc8d6.y += _0x2319f4.y;
      }
    } else _0xcdc8d6.x = _0x1fd23c, _0xcdc8d6.y = _0x1a4d10;
  }), console.log(_0xd4f23(881), JSON[_0xd4f23(929)](JSON[_0xd4f23(681)](crocos)));
}
function moveFishesGlobal() {
  const _0x38f3b3 = getString;
  console[_0x38f3b3(670)]("AVANT DEPLACEMENT - Poissons:", JSON[_0x38f3b3(929)](JSON[_0x38f3b3(681)](fishes))), fishes[_0x38f3b3(849)](_0x379167 => {
    const _0x2747d4 = _0x38f3b3;
    let _0x32b5a7 = [{x: 0, y: 1}, {x: 0, y: -1}, {x: 1, y: 0}, {x: -1, y: 0}], _0x1478df = _0x32b5a7[_0x2747d4(540)](_0x2bf051 => {
      const _0x49583e = _0x2747d4;
      let _0x5cd745 = _0x379167.x + _0x2bf051.x, _0x35d798 = _0x379167.y + _0x2bf051.y;
      if (!(_0x5cd745 === 0 || _0x5cd745 === 17 || _0x35d798 === 0 || _0x35d798 === 13)) return false;
      if (crocos[_0x49583e(790)](_0x49eeb8 => _0x49eeb8.x === _0x5cd745 && _0x49eeb8.y === _0x35d798)) return false;
      if (fishes[_0x49583e(790)](_0x5ac66b => _0x5ac66b.id !== _0x379167.id && _0x5ac66b.x === _0x5cd745 && _0x5ac66b.y === _0x35d798)) return false;
      if (birds.some(_0x39d12f => _0x39d12f.x === _0x5cd745 && _0x39d12f.y === _0x35d798)) return false;
      if (_0x5cd745 >= 7 && _0x5cd745 <= 10 && _0x35d798 >= 5 && _0x35d798 <= 8) return false;
      return true;
    });
    if (_0x1478df[_0x2747d4(450)] > 0) {
      let _0x38b42a = _0x1478df[Math[_0x2747d4(472)](Math[_0x2747d4(480)]() * _0x1478df[_0x2747d4(450)])];
      _0x379167.x += _0x38b42a.x, _0x379167.y += _0x38b42a.y;
    }
  }), console[_0x38f3b3(670)]("APRES DEPLACEMENT - Poissons:", JSON[_0x38f3b3(929)](JSON[_0x38f3b3(681)](fishes)));
}
function moveBirdsGlobal() {
  const _0x3ae00b = getString;
  console[_0x3ae00b(670)](_0x3ae00b(747), JSON.parse(JSON[_0x3ae00b(681)](birds))), birds[_0x3ae00b(849)](_0x7e1b4c => {
    let _0x366a7b = [{x: 0, y: 1}, {x: 0, y: -1}, {x: 1, y: 0}, {x: -1, y: 0}], _0x5f4096 = _0x366a7b.filter(_0x2e8224 => {
      const _0x28be4c = decodeString;
      let _0x17983c = _0x7e1b4c.x + _0x2e8224.x, _0x56dfea = _0x7e1b4c.y + _0x2e8224.y;
      if (_0x17983c < 0 || _0x17983c > 17 || _0x56dfea < 0 || _0x56dfea > 13) return false;
      if (crocos[_0x28be4c(790)](_0x214e19 => _0x214e19.x === _0x17983c && _0x214e19.y === _0x56dfea)) return false;
      if (fishes[_0x28be4c(790)](_0x5b218f => _0x5b218f.x === _0x17983c && _0x5b218f.y === _0x56dfea)) return false;
      if (birds[_0x28be4c(790)](_0x30ee51 => _0x30ee51.id !== _0x7e1b4c.id && _0x30ee51.x === _0x17983c && _0x30ee51.y === _0x56dfea)) return false;
      if (_0x17983c >= 7 && _0x17983c <= 10 && _0x56dfea >= 5 && _0x56dfea <= 8) return false;
      return true;
    });
    if (_0x5f4096.length > 0) {
      let _0x302b55 = _0x5f4096[Math.floor(Math.random() * _0x5f4096.length)];
      _0x7e1b4c.x += _0x302b55.x, _0x7e1b4c.y += _0x302b55.y;
    }
  }), console[_0x3ae00b(670)](_0x3ae00b(487), JSON[_0x3ae00b(929)](JSON[_0x3ae00b(681)](birds)));
}
function countCrocosOnPath(_0xa41be7, _0x2ec6a7, _0x4c00ce, _0x3f7b1e, _0x41bdd5) {
  const _0x48f223 = getString;
  let _0x251c21 = [], _0x4baf3e = [{x: _0xa41be7, y: _0x2ec6a7, dist: 0, path: []}], _0x2148d3 = new Map;
  _0x2148d3[_0x48f223(543)](_0xa41be7 + "," + _0x2ec6a7, 0);
  while (_0x4baf3e[_0x48f223(450)] > 0) {
    let _0x205c33 = _0x4baf3e[_0x48f223(869)]();
    if (_0x205c33.x === _0x4c00ce && _0x205c33.y === _0x3f7b1e) {
      let _0xd04368 = _0x205c33[_0x48f223(763)][_0x48f223(540)](_0x2eb9f5 => crocos[_0x48f223(790)](_0xc3426c => _0xc3426c.x === _0x2eb9f5.x && _0xc3426c.y === _0x2eb9f5.y))[_0x48f223(450)];
      _0x251c21.push({path: _0x205c33[_0x48f223(763)], crocos: _0xd04368, dist: _0x205c33[_0x48f223(495)]});
      continue;
    }
    if (_0x205c33[_0x48f223(495)] >= _0x41bdd5) continue;
    let _0x2da838 = [{x: _0x205c33.x + 1, y: _0x205c33.y}, {x: _0x205c33.x - 1, y: _0x205c33.y}, {x: _0x205c33.x, y: _0x205c33.y + 1}, {x: _0x205c33.x, y: _0x205c33.y - 1}];
    for (let _0x5cdd7f of _0x2da838) {
      if (_0x5cdd7f.x < 1 || _0x5cdd7f.x > 16 || _0x5cdd7f.y < 1 || _0x5cdd7f.y > 12) continue;
      let _0x2c5110 = _0x5cdd7f.x + "," + _0x5cdd7f.y, _0x1635bb = _0x205c33.dist + 1;
      (!_0x2148d3[_0x48f223(873)](_0x2c5110) || _0x2148d3[_0x48f223(914)](_0x2c5110) >= _0x1635bb) && (_0x2148d3[_0x48f223(543)](_0x2c5110, _0x1635bb), _0x4baf3e.push({x: _0x5cdd7f.x, y: _0x5cdd7f.y, dist: _0x1635bb, path: [..._0x205c33.path, {x: _0x5cdd7f.x, y: _0x5cdd7f.y}]}));
    }
  }
  if (_0x251c21[_0x48f223(450)] === 0) return -1;
  return _0x251c21[_0x48f223(806)]((_0x2964d9, _0x322fb8) => {
    const _0x226334 = _0x48f223;
    if (_0x2964d9.crocos !== _0x322fb8[_0x226334(458)]) return _0x2964d9[_0x226334(458)] - _0x322fb8.crocos;
    return _0x2964d9.dist - _0x322fb8[_0x226334(495)];
  }), _0x251c21[0].crocos;
}
let pendingMove = null;
function finalizeTurnMove(_0x14fe50, _0x22dc39, _0x5ddbb9) {
  const _0x2f4eb9 = getString;
  let _0x433b03 = players[currentPlayer];
  pendingMove = {nx: _0x14fe50, ny: _0x22dc39, dist: _0x5ddbb9};
  let _0x21d4ce = "" + alphabet[_0x22dc39 - 1] + _0x14fe50;
  document.getElementById(_0x2f4eb9(862))[_0x2f4eb9(443)] = _0x2f4eb9(749) + _0x21d4ce, document[_0x2f4eb9(743)](_0x2f4eb9(642))[_0x2f4eb9(612)][_0x2f4eb9(699)] = _0x2f4eb9(887), document.getElementById(_0x2f4eb9(698))[_0x2f4eb9(612)][_0x2f4eb9(699)] = _0x2f4eb9(887);
}
function cancelMove() {
  const _0x4515c5 = getString;
  document.getElementById(_0x4515c5(698))[_0x4515c5(612)][_0x4515c5(699)] = _0x4515c5(854), document[_0x4515c5(743)](_0x4515c5(642))[_0x4515c5(612)][_0x4515c5(699)] = _0x4515c5(854), pendingMove = null, renderGrid();
}
function confirmMove() {
  const _0x4a14bc = getString;
  document.getElementById(_0x4a14bc(698)).style[_0x4a14bc(699)] = "none", document.getElementById(_0x4a14bc(642)).style.display = _0x4a14bc(854);
  if (!pendingMove) return;
  executeMove(pendingMove.nx, pendingMove.ny, pendingMove.dist), pendingMove = null;
}
function executeMove(_0x115bd7, _0x181620, _0x38ea01) {
  const _0x1316e9 = getString;
  let _0x4ad5f8 = players[currentPlayer];
  if (_0x4ad5f8.x === _0x115bd7 && _0x4ad5f8.y === _0x181620) {
    if (crocos.some(_0x36b3f5 => _0x36b3f5.x === _0x4ad5f8.x && _0x36b3f5.y === _0x4ad5f8.y)) {
      let _0x34da5b = _0x4ad5f8[_0x1316e9(731)] && _0x4ad5f8.leftHand[_0x1316e9(666)] === _0x1316e9(832) || _0x4ad5f8[_0x1316e9(470)] && _0x4ad5f8[_0x1316e9(470)][_0x1316e9(666)] === _0x1316e9(832);
      if (!_0x34da5b) {
        _0x4ad5f8.woundCards++, _0x4ad5f8.turnStartBites++, turnSummary[_0x1316e9(562)]++, updateFatigueWoundDisplay(_0x4ad5f8), checkEvacuation(_0x4ad5f8);
        let _0x12315d = document[_0x1316e9(743)](_0x1316e9(696));
        _0x12315d[_0x1316e9(880)]("h3")[_0x1316e9(443)] = _0x1316e9(674), _0x12315d[_0x1316e9(880)]("h3")[_0x1316e9(612)][_0x1316e9(471)] = _0x1316e9(701), _0x12315d.querySelector("div")[_0x1316e9(443)] = "🐊", _0x12315d[_0x1316e9(880)]("p")[_0x1316e9(443)] = "1 morsure : ajoutez 1 carte blessure à votre défausse.", document.getElementById("overlay").style[_0x1316e9(699)] = _0x1316e9(887), _0x12315d[_0x1316e9(612)][_0x1316e9(699)] = _0x1316e9(887), speak("Morsure ! Ajoutez une blessure.");
      } else speak("Votre torche protège contre la morsure !");
    }
    _0x4ad5f8.actions.push({type: _0x1316e9(560), from: {x: _0x4ad5f8.x, y: _0x4ad5f8.y}, to: {x: _0x115bd7, y: _0x181620}, distance: 0, bites: 0}), turnStep = 2, 
    //document[_0x1316e9(743)](_0x1316e9(550))[_0x1316e9(612)][_0x1316e9(699)] = "none", 
    document[_0x1316e9(743)](_0x1316e9(446))[_0x1316e9(612)][_0x1316e9(699)] = _0x1316e9(686), 
    updateQRButtonVisibility(), 
    renderGrid();
    return;
  }
  let _0x18142f = countCrocosOnPath(_0x4ad5f8.x, _0x4ad5f8.y, _0x115bd7, _0x181620, _0x38ea01);
  _0x4ad5f8[_0x1316e9(490)][_0x1316e9(948)]({type: _0x1316e9(560), from: {x: _0x4ad5f8.x, y: _0x4ad5f8.y}, to: {x: _0x115bd7, y: _0x181620}, distance: _0x38ea01, bites: _0x18142f}), _0x4ad5f8.x = _0x115bd7, _0x4ad5f8.y = _0x181620;
  if (_0x115bd7 >= 7 && _0x115bd7 <= 10 && _0x181620 >= 5 && _0x181620 <= 8 && _0x38ea01 > 0) {
    _0x4ad5f8[_0x1316e9(826)]++, turnSummary[_0x1316e9(562)]++, updateFatigueWoundDisplay(_0x4ad5f8), checkEvacuation(_0x4ad5f8), speak(_0x1316e9(610));
    let _0x471ccb = document[_0x1316e9(743)](_0x1316e9(696));
    _0x471ccb.querySelector("h3").innerText = _0x1316e9(943), _0x471ccb[_0x1316e9(880)]("h3")[_0x1316e9(612)][_0x1316e9(471)] = _0x1316e9(652), _0x471ccb[_0x1316e9(880)](_0x1316e9(511)).innerText = "🌋", _0x471ccb[_0x1316e9(880)]("p")[_0x1316e9(443)] = _0x1316e9(593), document[_0x1316e9(743)](_0x1316e9(642))[_0x1316e9(612)][_0x1316e9(699)] = "block", _0x471ccb[_0x1316e9(612)][_0x1316e9(699)] = "block";
  }
  _0x38ea01 === 3 && (addVotes(_0x4ad5f8, 20, _0x1316e9(814)), publishGlobalEvent("move3", "a fait un déplacement de 3 cases ! 🏃"));
  checkSecretMission(_0x4ad5f8);
  let _0x1a6adf = 0, _0x36285e = hasGourde(_0x4ad5f8);
  if (currentWeather === _0x1316e9(685) && !_0x36285e) {
    if (_0x38ea01 >= 1 && _0x38ea01 <= 2) _0x1a6adf = 1;
    if (_0x38ea01 === 3) _0x1a6adf = 2;
  } else {
    if (currentWeather !== "Canicule") {
      if (_0x38ea01 === 3) _0x1a6adf = 1;
    }
  }
  if (_0x1a6adf > 0) {
    _0x4ad5f8[_0x1316e9(675)] += _0x1a6adf, turnSummary.fatigueAdded += _0x1a6adf, updateFatigueWoundDisplay(_0x4ad5f8), checkEvacuation(_0x4ad5f8);
    if (_0x1a6adf === 1) speak(_0x1316e9(505));
    if (_0x1a6adf === 2) speak("   Double Fatigue. +2 Fatigues.");
  }
  if (_0x18142f > 0) {
    let _0x58eb33 = _0x4ad5f8[_0x1316e9(731)] && _0x4ad5f8[_0x1316e9(731)][_0x1316e9(666)] === _0x1316e9(832) || _0x4ad5f8[_0x1316e9(470)] && _0x4ad5f8[_0x1316e9(470)][_0x1316e9(666)] === _0x1316e9(832);
    if (_0x58eb33) speak(_0x1316e9(792)), _0x4ad5f8.actions.push({type: "torch_protection"}), checkSecretMission(_0x4ad5f8); else {
      _0x4ad5f8.woundCards += _0x18142f, _0x4ad5f8.turnStartBites += _0x18142f, turnSummary[_0x1316e9(562)] += _0x18142f, updateFatigueWoundDisplay(_0x4ad5f8), checkEvacuation(_0x4ad5f8);
      let _0x152252 = _0x18142f === 1 ? _0x1316e9(506) : _0x18142f + _0x1316e9(836), _0x21478f = _0x18142f === 1 ? "+1 Blessure" : _0x18142f + " Blessures";
      document[_0x1316e9(743)]("bite-box")[_0x1316e9(880)]("p")[_0x1316e9(443)] = _0x152252 + _0x1316e9(856) + _0x21478f + _0x1316e9(915), document[_0x1316e9(743)](_0x1316e9(642))[_0x1316e9(612)][_0x1316e9(699)] = "block", document[_0x1316e9(743)](_0x1316e9(696))[_0x1316e9(612)][_0x1316e9(699)] = _0x1316e9(887), speak(_0x152252 + _0x1316e9(735) + _0x21478f + "."), addVotes(_0x4ad5f8, 50, _0x1316e9(649)), publishGlobalEvent(_0x1316e9(493), _0x1316e9(950) + _0x18142f + _0x1316e9(658) + (_0x18142f > 1 ? "s" : "") + " ! 🐊");
    }
  }
  turnStep = 2, 
  //document[_0x1316e9(743)](_0x1316e9(550))[_0x1316e9(612)][_0x1316e9(699)] = _0x1316e9(854), 
  document[_0x1316e9(743)]("menu-actions")[_0x1316e9(612)][_0x1316e9(699)] = _0x1316e9(686), 
  updateQRButtonVisibility();
  let _0x3ca60d = _0x4ad5f8.leftHand && _0x4ad5f8.leftHand.name === _0x1316e9(828) || _0x4ad5f8[_0x1316e9(470)] && _0x4ad5f8[_0x1316e9(470)][_0x1316e9(666)] === _0x1316e9(828);
  if (_0x3ca60d) {
    autoSearchDone = true;
    speak(_0x1316e9(581));
    performAutoSearch();
  } else {
    autoSearchDone = false;
  }
  document.getElementById(_0x1316e9(575)).disabled = autoSearchDone;
  updateGiftButton();
  updateHuntButton();
  updatePublicHelpButton();
  renderGrid();
}
function performAutoSearch() {
  const _0x15194f = getString;
  let _0x8b6270 = players[currentPlayer];
  hadTotemBeforeSearch = _0x8b6270[_0x15194f(731)] && _0x8b6270[_0x15194f(731)].name === "totem" || _0x8b6270[_0x15194f(470)] && _0x8b6270[_0x15194f(470)][_0x15194f(666)] === _0x15194f(727) || _0x8b6270[_0x15194f(875)][_0x15194f(790)](_0xa8fe4b => _0xa8fe4b && _0xa8fe4b[_0x15194f(666)] === _0x15194f(727)), currentCellItems = [];
  let _0xb93578 = scenery[_0x15194f(540)](_0x3f18aa => _0x3f18aa.x === _0x8b6270.x && _0x3f18aa.y === _0x8b6270.y);
  _0xb93578[_0x15194f(849)](_0x215f6e => {
    const _0x115f25 = _0x15194f;
    _0x215f6e.stock > 0 && (currentCellItems[_0x115f25(948)]({type: _0x115f25(766), icon: _0x215f6e[_0x115f25(766)], name: _0x215f6e[_0x115f25(561)]}), _0x215f6e[_0x115f25(798)]--), _0x215f6e[_0x115f25(530)] && (currentCellItems.push({type: "item", icon: _0x215f6e[_0x115f25(530)][_0x115f25(937)], name: _0x215f6e.item.name, durability: _0x215f6e.item[_0x115f25(633)], maxDurability: _0x215f6e[_0x115f25(530)].maxDurability}), _0x215f6e[_0x115f25(530)] = null);
  });
  let _0x18a658 = hiddenItems[_0x15194f(540)](_0x18278b => _0x18278b.x === _0x8b6270.x && _0x18278b.y === _0x8b6270.y && !_0x18278b[_0x15194f(865)]);
  // FIX: Vérifier le totem AVANT de marquer discovered (fouille auto)
  let _0x587c7b_auto = _0x18a658.find(_0x2a9c85 => _0x2a9c85.item[_0x15194f(666)] === _0x15194f(727));
  _0x587c7b_auto && !_0x587c7b_auto[_0x15194f(700)] && (_0x587c7b_auto[_0x15194f(700)] = true, addVotes(_0x8b6270, 50, _0x15194f(864)), publishGlobalEvent(_0x15194f(727), _0x15194f(809)));
  _0x18a658[_0x15194f(849)](_0x94f051 => {
    const _0x5ea2d2 = _0x15194f;
    currentCellItems[_0x5ea2d2(948)]({type: _0x5ea2d2(530), icon: _0x94f051[_0x5ea2d2(530)].icon, name: _0x94f051[_0x5ea2d2(530)][_0x5ea2d2(666)], durability: _0x94f051[_0x5ea2d2(530)][_0x5ea2d2(633)], maxDurability: _0x94f051.item[_0x5ea2d2(591)]}), _0x94f051[_0x5ea2d2(865)] = true, console[_0x5ea2d2(670)]("Objet trouvé en (" + _0x8b6270.x + ", " + _0x8b6270.y + _0x5ea2d2(680) + _0x94f051[_0x5ea2d2(530)][_0x5ea2d2(666)]);
  });
  let _0x2a5023 = mangues[_0x15194f(733)](_0x2a3dbb => _0x2a3dbb.x === _0x8b6270.x && _0x2a3dbb.y === _0x8b6270.y && !_0x2a3dbb[_0x15194f(865)]);
  _0x2a5023 !== -1 && (currentCellItems[_0x15194f(948)]({type: _0x15194f(766), icon: "🥭", name: _0x15194f(859)}), mangues[_0x2a5023][_0x15194f(865)] = true, console[_0x15194f(670)]("Mangue trouvée en (" + _0x8b6270.x + ", " + _0x8b6270.y + _0x15194f(716)));
  let _0xafca = diamonds.findIndex(_0x4b8757 => _0x4b8757.x === _0x8b6270.x && _0x4b8757.y === _0x8b6270.y && !_0x4b8757.found), _0x2e1de0 = false;
  _0xafca !== -1 && (diamonds[_0xafca][_0x15194f(865)] = true, _0x2e1de0 = true, console[_0x15194f(670)]("Diamant trouvé en (" + _0x8b6270.x + ", " + _0x8b6270.y + _0x15194f(716)));
  _0x8b6270[_0x15194f(490)][_0x15194f(948)]({type: _0x15194f(510), items: currentCellItems, location: {x: _0x8b6270.x, y: _0x8b6270.y}}), checkSecretMission(_0x8b6270);
  if (_0x2e1de0) {
    handleDiamondFound(_0x8b6270);
    return;
  }
  (currentCellItems[_0x15194f(450)] > 0 || autoSearchDone) && showLootInventory();
}
function doAction(_0x138461) {
  const _0x8b79c9 = getString;
  let _0x30a212 = players[currentPlayer];
  recordActionClick(_0x138461);
  if (_0x138461 === "fouille") {
    if (autoSearchDone) {
      speak(_0x8b79c9(824));
      return;
    }
    hadTotemBeforeSearch = _0x30a212[_0x8b79c9(731)] && _0x30a212[_0x8b79c9(731)][_0x8b79c9(666)] === "totem" || _0x30a212[_0x8b79c9(470)] && _0x30a212[_0x8b79c9(470)][_0x8b79c9(666)] === _0x8b79c9(727) || _0x30a212.backpack[_0x8b79c9(790)](_0x2dbd84 => _0x2dbd84 && _0x2dbd84.name === "totem"), currentCellItems = [];
    let _0x152809 = scenery[_0x8b79c9(540)](_0x201a14 => _0x201a14.x === _0x30a212.x && _0x201a14.y === _0x30a212.y);
    _0x152809.forEach(_0x4fad5f => {
      const _0x2eed40 = _0x8b79c9;
      _0x4fad5f[_0x2eed40(798)] > 0 && (currentCellItems[_0x2eed40(948)]({type: _0x2eed40(766), icon: _0x4fad5f[_0x2eed40(766)], name: _0x4fad5f.type}), _0x4fad5f.stock--), _0x4fad5f.item && (currentCellItems.push({type: _0x2eed40(530), icon: _0x4fad5f[_0x2eed40(530)][_0x2eed40(937)], name: _0x4fad5f.item[_0x2eed40(666)], durability: _0x4fad5f[_0x2eed40(530)][_0x2eed40(633)], maxDurability: _0x4fad5f[_0x2eed40(530)][_0x2eed40(591)]}), _0x4fad5f.item = null);
    });
    let _0x3662cf = hiddenItems[_0x8b79c9(540)](_0x4a1858 => _0x4a1858.x === _0x30a212.x && _0x4a1858.y === _0x30a212.y && !_0x4a1858[_0x8b79c9(865)]);
    // FIX: Vérifier le totem AVANT de marquer discovered pour donner les 50 votes
    let _0x587c7b = _0x3662cf.find(_0x2a9c85 => _0x2a9c85.item[_0x8b79c9(666)] === _0x8b79c9(727));
    _0x587c7b && !_0x587c7b[_0x8b79c9(700)] && (_0x587c7b[_0x8b79c9(700)] = true, addVotes(_0x30a212, 50, _0x8b79c9(864)), publishGlobalEvent(_0x8b79c9(727), _0x8b79c9(809)));
    // Marquer tous les objets comme discovered
    _0x3662cf[_0x8b79c9(849)](_0x248812 => {
      const _0x335c00 = _0x8b79c9;
      currentCellItems[_0x335c00(948)]({type: _0x335c00(530), icon: _0x248812[_0x335c00(530)][_0x335c00(937)], name: _0x248812[_0x335c00(530)][_0x335c00(666)], durability: _0x248812.item[_0x335c00(633)], maxDurability: _0x248812[_0x335c00(530)][_0x335c00(591)]}), _0x248812[_0x335c00(865)] = true, console[_0x335c00(670)]("Objet trouvé en (" + _0x30a212.x + ", " + _0x30a212.y + "): " + _0x248812.item[_0x335c00(666)]);
    });
    let _0x5dd82c = mangues[_0x8b79c9(733)](_0x5ce386 => _0x5ce386.x === _0x30a212.x && _0x5ce386.y === _0x30a212.y && !_0x5ce386.found);
    _0x5dd82c !== -1 && (currentCellItems[_0x8b79c9(948)]({type: _0x8b79c9(766), icon: "🥭", name: _0x8b79c9(859)}), mangues[_0x5dd82c][_0x8b79c9(865)] = true, console.log("Mangue trouvée en (" + _0x30a212.x + ", " + _0x30a212.y + _0x8b79c9(716)));
    let _0x467aef = diamonds[_0x8b79c9(733)](_0x5506a3 => _0x5506a3.x === _0x30a212.x && _0x5506a3.y === _0x30a212.y && !_0x5506a3.found), _0x4bd455 = false;
    _0x467aef !== -1 && (diamonds[_0x467aef][_0x8b79c9(865)] = true, _0x4bd455 = true, console[_0x8b79c9(670)]("Diamant trouvé en (" + _0x30a212.x + ", " + _0x30a212.y + ") !"));
    _0x30a212.actions.push({type: _0x8b79c9(692), items: currentCellItems, location: {x: _0x30a212.x, y: _0x30a212.y}});
    let _0x1685d5 = _0x152809[_0x8b79c9(450)] > 0, _0x11e092 = currentCellItems[_0x8b79c9(790)](_0x4b44f0 => _0x4b44f0[_0x8b79c9(561)] === _0x8b79c9(530));
    !_0x1685d5 && _0x11e092 && addVotes(_0x30a212, 20, _0x8b79c9(946));
    checkSecretMission(_0x30a212);
    if (_0x4bd455) {
      handleDiamondFound(_0x30a212);
      return;
    }
    showLootInventory();
  } else {
    if (_0x138461 === _0x8b79c9(899)) _0x30a212[_0x8b79c9(638)][_0x8b79c9(948)](_0x8b79c9(474)), _0x30a212[_0x8b79c9(490)].push({type: "cache", location: {x: _0x30a212.x, y: _0x30a212.y}}), checkSecretMission(_0x30a212), speak(_0x8b79c9(537)), endTurnLog(), prepareEndTurn(); else {
      if (_0x138461 === "repos") showRestMenu(); else {
        if (_0x138461 === _0x8b79c9(947)) giftMode = true, speak(_0x8b79c9(615)), renderGrid(); else {
          if (_0x138461 === "chasse") huntMode = true, huntTargets = getAdjacentHuntTargets(), speak(_0x8b79c9(886)), renderGrid(); else {
            if (_0x138461 === _0x8b79c9(810)) {
              let _0x2387a4 = players[currentPlayer];
              if (_0x2387a4[_0x8b79c9(644)] < 20) {
                speak(_0x8b79c9(559));
                return;
              }
              document[_0x8b79c9(743)](_0x8b79c9(642))[_0x8b79c9(612)][_0x8b79c9(699)] = _0x8b79c9(887), document[_0x8b79c9(743)](_0x8b79c9(683))[_0x8b79c9(612)][_0x8b79c9(699)] = _0x8b79c9(887);
            } else endTurnLog(), prepareEndTurn();
          }
        }
      }
    }
  }
}
function cancelPublicHelp() {
  const _0x5cce0d = getString;
  document.getElementById("public-help-confirm-box")[_0x5cce0d(612)][_0x5cce0d(699)] = "none", document[_0x5cce0d(743)]("overlay").style.display = _0x5cce0d(854), publicHelpMode = false;
}
function confirmPublicHelp() {
  const _0x549cda = getString;
  document[_0x549cda(743)](_0x549cda(683))[_0x549cda(612)][_0x549cda(699)] = _0x549cda(854);
  let _0x47f91b = document.getElementById(_0x549cda(815));
  _0x47f91b.innerHTML = "", ITEMS.forEach(_0x1537f4 => {
    const _0x3d9e4a = _0x549cda;
    if (_0x1537f4.name !== "totem") {
      let _0x298157 = document[_0x3d9e4a(935)]("div");
      _0x298157[_0x3d9e4a(901)] = "totem-item-card", _0x298157[_0x3d9e4a(443)] = _0x1537f4[_0x3d9e4a(937)], _0x298157[_0x3d9e4a(781)] = () => selectPublicHelpItem(_0x1537f4[_0x3d9e4a(666)], _0x1537f4.icon, _0x298157), _0x47f91b[_0x3d9e4a(447)](_0x298157);
    }
  }), publicHelpSelectedItem = null, document[_0x549cda(743)](_0x549cda(672))[_0x549cda(504)] = true, document[_0x549cda(743)](_0x549cda(672))[_0x549cda(443)] = _0x549cda(871), document[_0x549cda(743)](_0x549cda(672))[_0x549cda(781)] = activatePublicHelp, document[_0x549cda(743)]("totem-scanner-box").querySelector("h3")[_0x549cda(443)] = _0x549cda(767), document[_0x549cda(743)](_0x549cda(527))[_0x549cda(880)]("p")[_0x549cda(443)] = _0x549cda(682), document[_0x549cda(743)](_0x549cda(527)).style.display = _0x549cda(887), document[_0x549cda(743)](_0x549cda(642))[_0x549cda(612)].display = _0x549cda(887);
}
function selectPublicHelpItem(_0x3247ec, _0x1fd965, _0x562c5a) {
  const _0x9c2447 = getString;
  document[_0x9c2447(931)](_0x9c2447(500)).forEach(_0x3d76ea => _0x3d76ea[_0x9c2447(483)][_0x9c2447(478)]("selected")), _0x562c5a[_0x9c2447(483)][_0x9c2447(568)](_0x9c2447(736)), publicHelpSelectedItem = {name: _0x3247ec, icon: _0x1fd965}, document[_0x9c2447(743)]("totem-scan-btn")[_0x9c2447(504)] = false;
}
function activatePublicHelp() {
  const _0x3cb3a8 = getString;
  if (!publicHelpSelectedItem) return;
  let _0x5529a0 = players[currentPlayer];
  document[_0x3cb3a8(743)](_0x3cb3a8(527))[_0x3cb3a8(612)][_0x3cb3a8(699)] = _0x3cb3a8(854);
  let _0x3ff1c0 = findClosestItem(_0x5529a0.x, _0x5529a0.y, publicHelpSelectedItem[_0x3cb3a8(666)]);
  if (!_0x3ff1c0) {
    speak(_0x3cb3a8(582)), document.getElementById(_0x3cb3a8(642))[_0x3cb3a8(612)].display = _0x3cb3a8(854), publicHelpMode = false;
    return;
  }
  _0x5529a0[_0x3cb3a8(644)] -= 20, turnSummary[_0x3cb3a8(807)] -= 20, updateUI();
  let _0x4cddd4 = encodeCoordinates(_0x5529a0, _0x3ff1c0.x, _0x3ff1c0.y);
  document.getElementById(_0x3cb3a8(761))[_0x3cb3a8(443)] = publicHelpSelectedItem[_0x3cb3a8(937)], document[_0x3cb3a8(743)]("public-help-result-text")[_0x3cb3a8(617)] = _0x3cb3a8(711) + publicHelpSelectedItem[_0x3cb3a8(666)] + '</strong> le + proche se trouve à :<br><br><strong style="font-size:1.5rem; color:#f39c12;">' + _0x4cddd4 + _0x3cb3a8(489), document.getElementById(_0x3cb3a8(690))[_0x3cb3a8(612)][_0x3cb3a8(699)] = _0x3cb3a8(887), speak(_0x3cb3a8(589) + publicHelpSelectedItem[_0x3cb3a8(666)] + _0x3cb3a8(636) + _0x4cddd4 + "."), _0x5529a0.actions[_0x3cb3a8(948)]({type: _0x3cb3a8(810), item: publicHelpSelectedItem[_0x3cb3a8(666)], cost: 20, location: {x: _0x5529a0.x, y: _0x5529a0.y}}), publicHelpMode = false;
}
function findClosestItem(_0x189d1c, _0x4f8bfd, _0x3fd8b7) {
  const _0x323225 = getString;
  let _0x343afe = hiddenItems[_0x323225(540)](_0x582369 => !_0x582369.found && _0x582369[_0x323225(530)].name === _0x3fd8b7);
  if (_0x343afe[_0x323225(450)] === 0) return null;
  let _0x9367df = null, _0x4a3d23 = Infinity;
  return _0x343afe[_0x323225(849)](_0x4af929 => {
    let _0x58500a = getDistance(_0x189d1c, _0x4f8bfd, _0x4af929.x, _0x4af929.y);
    _0x58500a < _0x4a3d23 && (_0x4a3d23 = _0x58500a, _0x9367df = _0x4af929);
  }), _0x9367df;
}
function encodeCoordinates(_0x385df9, _0x17ef14, _0x11f664) {
  const _0x31717c = getString;
  let _0x3b7a25;
  if (_0x385df9.id === 2) _0x3b7a25 = carteBLEU; else {
    if (_0x385df9.id === 0) _0x3b7a25 = carteROUGE; else {
      if (_0x385df9.id === 3) _0x3b7a25 = carteJAUNE; else {
        if (_0x385df9.id === 1) _0x3b7a25 = carteVERT;
      }
    }
  }
  if (!_0x3b7a25) return "Erreur";
  let _0x2386f3 = Math[_0x31717c(472)](Math.random() * 5), _0x18a2d1 = _0x3b7a25[_0x2386f3][_0x17ef14], _0x2e4e2f = alphabet[_0x11f664 - 1];
  return "L" + (_0x2386f3 + 1) + _0x31717c(677) + _0x2e4e2f + "-" + _0x18a2d1;
}
function closePublicHelpResult() {
  const _0x224855 = getString;
  document[_0x224855(743)](_0x224855(690)).style[_0x224855(699)] = "none", document[_0x224855(743)](_0x224855(642))[_0x224855(612)][_0x224855(699)] = "none", document[_0x224855(743)]("totem-scan-btn").innerText = _0x224855(916), document.getElementById(_0x224855(672)).onclick = activateTotemScan, document[_0x224855(743)](_0x224855(527))[_0x224855(880)]("h3")[_0x224855(443)] = _0x224855(821), document.getElementById(_0x224855(527))[_0x224855(880)]("p")[_0x224855(443)] = _0x224855(779), publicHelpSelectedItem = null, endTurnLog(), prepareEndTurn();
}
function showLootInventory() {
  const _0x9e4a5 = getString;
  let _0x4e8162 = players[currentPlayer];
  selectedItem = null, document.getElementById(_0x9e4a5(539))[_0x9e4a5(443)] = _0x4e8162[_0x9e4a5(731)] ? _0x4e8162[_0x9e4a5(731)][_0x9e4a5(937)] : "", document[_0x9e4a5(743)]("inv-right")[_0x9e4a5(443)] = _0x4e8162[_0x9e4a5(470)] ? _0x4e8162[_0x9e4a5(470)][_0x9e4a5(937)] : "", document[_0x9e4a5(743)](_0x9e4a5(602))[_0x9e4a5(443)] = _0x4e8162[_0x9e4a5(875)][0] ? _0x4e8162.backpack[0][_0x9e4a5(937)] : "", document.getElementById("inv-back1")[_0x9e4a5(443)] = _0x4e8162[_0x9e4a5(875)][1] ? _0x4e8162[_0x9e4a5(875)][1].icon : "", document[_0x9e4a5(743)](_0x9e4a5(951))[_0x9e4a5(443)] = _0x4e8162[_0x9e4a5(875)][2] ? _0x4e8162[_0x9e4a5(875)][2][_0x9e4a5(937)] : "";
  let _0x2bb338 = document.getElementById(_0x9e4a5(660));
  _0x2bb338[_0x9e4a5(617)] = "", currentCellItems[_0x9e4a5(450)] === 0 ? _0x2bb338[_0x9e4a5(617)] = _0x9e4a5(572) : currentCellItems[_0x9e4a5(849)]((_0x47d6d4, _0x3498da) => {
    const _0x13fff7 = _0x9e4a5;
    let _0x124ec5 = document[_0x13fff7(935)]("div");
    _0x124ec5[_0x13fff7(901)] = _0x13fff7(782), _0x124ec5.innerText = _0x47d6d4.icon, _0x124ec5[_0x13fff7(781)] = () => selectFoundItem(_0x3498da), _0x2bb338[_0x13fff7(447)](_0x124ec5);
  }), document.getElementById(_0x9e4a5(888)).style[_0x9e4a5(699)] = "block", document.getElementById(_0x9e4a5(642)).style[_0x9e4a5(699)] = "block";
}
function selectFoundItem(_0x293407) {
  const _0x28e00b = getString;
  selectedItem = {source: "found", index: _0x293407}, document.querySelectorAll(_0x28e00b(962))[_0x28e00b(849)]((_0x17d128, _0x5d1477) => {
    const _0xeb1513 = _0x28e00b;
    _0x17d128[_0xeb1513(483)].toggle(_0xeb1513(736), _0x5d1477 === _0x293407);
  }), document[_0x28e00b(931)](_0x28e00b(445)).forEach(_0x310f00 => _0x310f00[_0x28e00b(483)][_0x28e00b(478)](_0x28e00b(736)));
}
function selectInventorySlot(_0x23c59b) {
  const _0x20fa49 = getString;
  let _0x11b6ff = players[currentPlayer];
  if (!selectedItem) {
    let _0x34851b = null;
    if (_0x23c59b === _0x20fa49(751) && _0x11b6ff[_0x20fa49(731)]) _0x34851b = _0x11b6ff.leftHand, _0x11b6ff[_0x20fa49(731)] = null; else {
      if (_0x23c59b === _0x20fa49(805) && _0x11b6ff[_0x20fa49(470)]) _0x34851b = _0x11b6ff[_0x20fa49(470)], _0x11b6ff.rightHand = null; else {
        if (_0x23c59b.startsWith(_0x20fa49(461))) {
          let _0x2f1d0d = parseInt(_0x23c59b[_0x20fa49(632)](_0x20fa49(461), ""));
          _0x11b6ff[_0x20fa49(875)][_0x2f1d0d] && (_0x34851b = _0x11b6ff[_0x20fa49(875)][_0x2f1d0d], _0x11b6ff.backpack[_0x2f1d0d] = null);
        }
      }
    }
    _0x34851b && (currentCellItems[_0x20fa49(948)](_0x34851b), turnSummary[_0x20fa49(759)][_0x20fa49(948)]({icon: _0x34851b.icon, name: _0x34851b[_0x20fa49(666)] || _0x34851b.type}), updateGiftButton(), showLootInventory());
    return;
  }
  let _0x1fcf8e = null;
  selectedItem[_0x20fa49(705)] === "found" && (_0x1fcf8e = currentCellItems[selectedItem[_0x20fa49(523)]], currentCellItems.splice(selectedItem[_0x20fa49(523)], 1));
  let _0x2179f9 = null;
  if (_0x23c59b === _0x20fa49(751)) _0x2179f9 = _0x11b6ff[_0x20fa49(731)], _0x11b6ff[_0x20fa49(731)] = _0x1fcf8e, console[_0x20fa49(670)](_0x20fa49(441), _0x1fcf8e); else {
    if (_0x23c59b === _0x20fa49(805)) _0x2179f9 = _0x11b6ff[_0x20fa49(470)], _0x11b6ff.rightHand = _0x1fcf8e, console[_0x20fa49(670)](_0x20fa49(576), _0x1fcf8e); else {
      if (_0x23c59b.startsWith("back")) {
        let _0x2474a0 = parseInt(_0x23c59b.replace("back", ""));
        _0x2179f9 = _0x11b6ff[_0x20fa49(875)][_0x2474a0], _0x11b6ff[_0x20fa49(875)][_0x2474a0] = _0x1fcf8e, console[_0x20fa49(670)]("Objet placé dans sac[" + _0x2474a0 + "]:", _0x1fcf8e);
      }
    }
  }
  _0x2179f9 && currentCellItems[_0x20fa49(948)](_0x2179f9), _0x1fcf8e && (turnSummary.itemsCollected[_0x20fa49(948)]({icon: _0x1fcf8e[_0x20fa49(937)], name: _0x1fcf8e[_0x20fa49(666)] || _0x1fcf8e.type}), _0x1fcf8e[_0x20fa49(561)] === _0x20fa49(604) && (addVotes(_0x11b6ff, 200, _0x20fa49(957)), setTimeout(() => {
    const _0x257399 = _0x20fa49;
    let _0x39accc = document[_0x257399(743)](_0x257399(696));
    _0x39accc[_0x257399(880)]("h3").innerText = _0x257399(913), _0x39accc[_0x257399(880)]("h3")[_0x257399(612)][_0x257399(471)] = _0x257399(648), _0x39accc[_0x257399(880)]("div")[_0x257399(443)] = "💎", _0x39accc.querySelector("p")[_0x257399(443)] = _0x257399(843), document[_0x257399(743)](_0x257399(642))[_0x257399(612)].display = "block", _0x39accc[_0x257399(612)][_0x257399(699)] = _0x257399(887), speak("Félicitations ! Vous avez trouvé un diamant ! 200 votes du public !"), publishGlobalEvent("diamond", _0x257399(830));
  }, 100))), selectedItem = null, updateGiftButton(), showLootInventory();
}
function endTurnLog() {
  const _0x34b718 = getString;
  console.log("========== FIN TOUR =========="), console[_0x34b718(670)]("TOUS LES JOUEURS:", JSON[_0x34b718(929)](JSON[_0x34b718(681)](players)));
}
function prepareEndTurn() {
  // Afficher d'abord la popup de gestion d'inventaire
  showInventoryManage();
}

function showTurnSummary() {
  const _0x23d181 = getString;
  // Vérifier si le temps global est écoulé
  if (gameTimeExpired) {
    endGame();
    return;
  }
  let _0x1a8853 = players[currentPlayer];
  stopPlayerTimer(), document[_0x23d181(743)](_0x23d181(460))[_0x23d181(443)] = _0x1a8853[_0x23d181(644)];
  // Temps restant supprimé - affiché dans le bandeau météo
  document[_0x23d181(743)]("summary-total-fatigue")[_0x23d181(443)] = _0x1a8853.fatigueCards;
  document[_0x23d181(743)]("summary-total-wound")[_0x23d181(443)] = _0x1a8853.woundCards;
  let _0x3d2834 = "";
  turnSummary[_0x23d181(694)] > 0 && (_0x3d2834 += '<div class="summary-item negative"><span class="summary-icon">😫</span><span>+' + turnSummary[_0x23d181(694)] + _0x23d181(752));
  turnSummary.fatigueRemoved > 0 && (_0x3d2834 += '<div class="summary-item positive"><span class="summary-icon">😊</span><span>-' + turnSummary[_0x23d181(769)] + _0x23d181(752));
  turnSummary[_0x23d181(562)] > 0 && (_0x3d2834 += _0x23d181(775) + turnSummary[_0x23d181(562)] + _0x23d181(777));
  turnSummary.woundRemoved > 0 && (_0x3d2834 += _0x23d181(884) + turnSummary.woundRemoved + _0x23d181(777));
  if (!_0x3d2834) _0x3d2834 = _0x23d181(902);
  document[_0x23d181(743)](_0x23d181(776)).innerHTML = _0x3d2834;
  let _0x4a81d7 = "";
  turnSummary[_0x23d181(457)].forEach(_0x11460b => {
    const _0x4b5aea = _0x23d181;
    _0x4a81d7 += _0x4b5aea(738) + _0x11460b[_0x4b5aea(937)] + _0x4b5aea(939) + _0x11460b.name + _0x4b5aea(844);
  }), turnSummary[_0x23d181(759)][_0x23d181(849)](_0x2234ad => {
    const _0x4f00fe = _0x23d181;
    _0x4a81d7 += _0x4f00fe(833) + _0x2234ad[_0x4f00fe(937)] + _0x4f00fe(939) + _0x2234ad[_0x4f00fe(666)] + _0x4f00fe(584);
  }), turnSummary[_0x23d181(513)][_0x23d181(849)](_0x9c68c4 => {
    const _0x5a5f68 = _0x23d181;
    _0x4a81d7 += _0x5a5f68(473) + _0x9c68c4[_0x5a5f68(937)] + _0x5a5f68(939) + _0x9c68c4[_0x5a5f68(666)] + _0x5a5f68(485);
  }), turnSummary[_0x23d181(639)].forEach(_0x1c875e => {
    const _0x3ca3e1 = _0x23d181;
    _0x4a81d7 += _0x3ca3e1(833) + _0x1c875e[_0x3ca3e1(937)] + _0x3ca3e1(939) + _0x1c875e.name + " " + _0x1c875e.action + _0x3ca3e1(456);
  });
  if (!_0x4a81d7) _0x4a81d7 = '<div class="summary-empty">Aucun changement</div>';
  document[_0x23d181(743)](_0x23d181(679))[_0x23d181(617)] = _0x4a81d7;
  let _0x3607bf = "";
  turnSummary.missionsCompleted[_0x23d181(849)](_0x498aae => {
    const _0x4904b0 = _0x23d181;
    _0x3607bf += _0x4904b0(895) + _0x498aae.id + _0x4904b0(452) + _0x498aae.votes + _0x4904b0(484);
  });
  if (!_0x3607bf) _0x3607bf = _0x23d181(822);
  document[_0x23d181(743)]("summary-missions-content")[_0x23d181(617)] = _0x3607bf;
  let _0x33a2a3 = "";
  turnSummary[_0x23d181(807)] > 0 ? _0x33a2a3 = '<div class="summary-item positive"><span class="summary-icon">⭐</span><span>+' + turnSummary.votesGained + " votes gagnés</span></div>" : _0x33a2a3 = _0x23d181(906), document.getElementById(_0x23d181(831))[_0x23d181(617)] = _0x33a2a3, document[_0x23d181(743)]("overlay")[_0x23d181(612)][_0x23d181(699)] = "block", document.getElementById(_0x23d181(724))[_0x23d181(612)][_0x23d181(699)] = "block";
}
function closeTurnSummary() {
  const _0x51aee7 = getString;
  document[_0x51aee7(743)](_0x51aee7(724))[_0x51aee7(612)].display = _0x51aee7(854), showPlayerChange();
}
function showPlayerChange() {
  const _0x2114ae = getString;
  let _0x201994 = (currentPlayer + 1) % players[_0x2114ae(450)], _0x250bf0 = players[_0x201994], _0x13098b = [_0x2114ae(945), _0x2114ae(714), _0x2114ae(789), _0x2114ae(817)], _0x415817 = _0x13098b[_0x250bf0.id];
  document[_0x2114ae(743)](_0x2114ae(459)).innerText = _0x250bf0[_0x2114ae(590)], document[_0x2114ae(743)](_0x2114ae(586))[_0x2114ae(617)] = _0x2114ae(918) + _0x415817 + _0x2114ae(475) + _0x250bf0[_0x2114ae(666)] + _0x2114ae(868), document[_0x2114ae(743)](_0x2114ae(642))[_0x2114ae(612)][_0x2114ae(699)] = _0x2114ae(887), document[_0x2114ae(743)](_0x2114ae(552))[_0x2114ae(612)][_0x2114ae(699)] = _0x2114ae(887), speak(_0x2114ae(554) + _0x250bf0.name + ", à vous.");
}
function showPlayerTimeOutPopup() {
  const _0x45581a = getString;
  let _0x137056 = players[currentPlayer], _0x399ee4 = [_0x45581a(945), _0x45581a(714), _0x45581a(789), "#2ecc71"], _0x2c17b5 = _0x399ee4[currentPlayer];
  document[_0x45581a(743)]("next-player-icon")[_0x45581a(443)] = "⏱️", document[_0x45581a(743)](_0x45581a(586))[_0x45581a(617)] = _0x45581a(852) + _0x2c17b5 + ';">JOUEUR ' + _0x137056[_0x45581a(666)] + "</span><br><br>Vous avez consommé tout votre temps !<br>Vous ne jouez plus.", document[_0x45581a(743)](_0x45581a(642))[_0x45581a(612)][_0x45581a(699)] = "block", document[_0x45581a(743)]("player-change-box")[_0x45581a(612)][_0x45581a(699)] = _0x45581a(887), speak("Joueur " + _0x137056.name + _0x45581a(709));
}
function closePlayerChange() {
  const _0x344515 = getString;
  document[_0x344515(743)](_0x344515(552))[_0x344515(612)][_0x344515(699)] = "none", 
  document.getElementById(_0x344515(642))[_0x344515(612)].display = _0x344515(854), 
  confirmTurn();
}
function closeLoot() {
  const _0x23eb8b = getString;
  let _0x177a85 = players[currentPlayer], _0x3ea844 = currentCellItems[_0x23eb8b(450)], _0x7499b2 = turnSummary[_0x23eb8b(457)][_0x23eb8b(450)];
  if (_0x3ea844 > 0 && _0x7499b2 === 0) {
    document.getElementById(_0x23eb8b(888)).style[_0x23eb8b(699)] = "none";
    let _0x3d41d0 = document[_0x23eb8b(743)](_0x23eb8b(696)), _0x8754b6 = _0x3d41d0.querySelector("h3"), _0x2fdfb1 = _0x3d41d0.querySelector(_0x23eb8b(511)), _0x15ec16 = _0x3d41d0.querySelector("p"), _0x2d77c1 = _0x3d41d0[_0x23eb8b(880)](_0x23eb8b(580));
    if (_0x8754b6) _0x8754b6[_0x23eb8b(443)] = _0x23eb8b(791);
    if (_0x8754b6) _0x8754b6[_0x23eb8b(612)][_0x23eb8b(471)] = _0x23eb8b(652);
    if (_0x2fdfb1) _0x2fdfb1[_0x23eb8b(443)] = "⚠️";
    if (_0x15ec16) _0x15ec16[_0x23eb8b(443)] = _0x23eb8b(934);
    _0x2d77c1 && (_0x2d77c1.outerHTML = _0x23eb8b(882));
    document[_0x23eb8b(743)](_0x23eb8b(642))[_0x23eb8b(612)][_0x23eb8b(699)] = _0x23eb8b(887), _0x3d41d0[_0x23eb8b(612)].display = _0x23eb8b(887), speak("Vous n'avez rien pris !");
    return;
  }
  proceedCloseLoot();
}
function cancelCloseLoot() {
  const _0x3a915d = getString;
  document.getElementById("bite-box")[_0x3a915d(612)][_0x3a915d(699)] = "none";
  let _0xcdcb7a = document[_0x3a915d(743)]("bite-box"), _0x121d86 = _0xcdcb7a[_0x3a915d(880)](_0x3a915d(566));
  _0x121d86 && (_0x121d86[_0x3a915d(678)] = _0x3a915d(656)), document[_0x3a915d(743)]("loot-box")[_0x3a915d(612)][_0x3a915d(699)] = _0x3a915d(887), speak("Continuez votre fouille.");
}
function confirmCloseLoot() {
  const _0x324768 = getString;
  document[_0x324768(743)]("bite-box")[_0x324768(612)][_0x324768(699)] = "none";
  let _0xa2c851 = document[_0x324768(743)]("bite-box"), _0x3b90ad = _0xa2c851[_0x324768(880)]('div[style*="display: flex"]');
  _0x3b90ad && (_0x3b90ad[_0x324768(678)] = _0x324768(656)), proceedCloseLoot();
}
function proceedCloseLoot() {
  const _0x369050 = getString;
  document.getElementById(_0x369050(888))[_0x369050(612)][_0x369050(699)] = _0x369050(854), document[_0x369050(743)](_0x369050(642))[_0x369050(612)][_0x369050(699)] = _0x369050(854);
  if (autoSearchDone) {
    let _0x2bde4f = players[currentPlayer], _0x343ab8 = currentCellItems[_0x369050(518)](_0x27611f => _0x27611f[_0x369050(666)] === _0x369050(727));
    if (_0x343ab8 && hadTotemBeforeSearch) {
      showTotemScanner();
      return;
    }
    if (_0x343ab8 && !hadTotemBeforeSearch) {
      let _0x81399 = hiddenItems[_0x369050(518)](_0x3dd78c => _0x3dd78c.x === _0x2bde4f.x && _0x3dd78c.y === _0x2bde4f.y && _0x3dd78c[_0x369050(530)].name === "totem" && _0x3dd78c[_0x369050(865)]);
      _0x81399 && (_0x81399[_0x369050(865)] = false, console[_0x369050(670)](_0x369050(611) + _0x2bde4f.x + ", " + _0x2bde4f.y + ")"));
    }
    hadTotemBeforeSearch = false;
    return;
  }
  let _0x27b96e = players[currentPlayer], _0x503fae = currentCellItems[_0x369050(518)](_0x4f3e22 => _0x4f3e22[_0x369050(666)] === _0x369050(727));
  if (_0x503fae && hadTotemBeforeSearch) {
    showTotemScanner();
    return;
  }
  if (_0x503fae && !hadTotemBeforeSearch) {
    let _0x140c77 = hiddenItems[_0x369050(518)](_0x40fd10 => _0x40fd10.x === _0x27b96e.x && _0x40fd10.y === _0x27b96e.y && _0x40fd10[_0x369050(530)][_0x369050(666)] === _0x369050(727) && _0x40fd10[_0x369050(865)]);
    _0x140c77 && (_0x140c77.found = false, console.log(_0x369050(611) + _0x27b96e.x + ", " + _0x27b96e.y + ")"));
  }
  hadTotemBeforeSearch = false, endTurnLog(), prepareEndTurn();
}
function showTotemScanner() {
  const _0x2dd22a = getString;
  let _0x11146d = players[currentPlayer], _0x116f3f = currentCellItems[_0x2dd22a(733)](_0x58b1a8 => _0x58b1a8[_0x2dd22a(666)] === _0x2dd22a(727));
  _0x116f3f !== -1 && (currentCellItems[_0x2dd22a(827)](_0x116f3f, 1), respawnItem(_0x2dd22a(727)), speak(_0x2dd22a(920)));
  let _0x465246 = document[_0x2dd22a(743)](_0x2dd22a(815));
  _0x465246[_0x2dd22a(617)] = "", ITEMS[_0x2dd22a(849)](_0x2a9cd0 => {
    const _0x28beb9 = _0x2dd22a;
    if (_0x2a9cd0.name !== _0x28beb9(727)) {
      let _0x4d8fbe = document[_0x28beb9(935)](_0x28beb9(511));
      _0x4d8fbe[_0x28beb9(901)] = _0x28beb9(573), _0x4d8fbe[_0x28beb9(443)] = _0x2a9cd0[_0x28beb9(937)], _0x4d8fbe.onclick = () => selectTotemItem(_0x2a9cd0[_0x28beb9(666)], _0x4d8fbe), _0x465246[_0x28beb9(447)](_0x4d8fbe);
    }
  }), totemSelectedItem = null, document[_0x2dd22a(743)](_0x2dd22a(672)).disabled = true, document[_0x2dd22a(743)](_0x2dd22a(527))[_0x2dd22a(612)][_0x2dd22a(699)] = _0x2dd22a(887), document[_0x2dd22a(743)](_0x2dd22a(642))[_0x2dd22a(612)][_0x2dd22a(699)] = "block";
}
function selectTotemItem(_0x37977b, _0x33a87a) {
  const _0x1db62c = getString;
  document[_0x1db62c(931)](_0x1db62c(500))[_0x1db62c(849)](_0x2b52ca => _0x2b52ca[_0x1db62c(483)][_0x1db62c(478)]("selected")), _0x33a87a[_0x1db62c(483)][_0x1db62c(568)]("selected"), totemSelectedItem = _0x37977b, document[_0x1db62c(743)]("totem-scan-btn").disabled = false;
}
function activateTotemScan() {
  const _0x3b501a = getString;
  if (!totemSelectedItem) return;
  let _0x3e33f4 = players[currentPlayer];
  document.getElementById("totem-scanner-box")[_0x3b501a(612)][_0x3b501a(699)] = _0x3b501a(854), 
  document[_0x3b501a(743)]("overlay")[_0x3b501a(612)][_0x3b501a(699)] = _0x3b501a(854), 
  totemScanMode = true, document[_0x3b501a(743)](_0x3b501a(446))[_0x3b501a(612)][_0x3b501a(699)] = "none", 
  document[_0x3b501a(743)](_0x3b501a(550)).style[_0x3b501a(699)] = "none", 
  document[_0x3b501a(743)](_0x3b501a(624)).classList.add(_0x3b501a(555)), 
  _0x3e33f4[_0x3b501a(490)][_0x3b501a(948)]({type: _0x3b501a(697), item: totemSelectedItem, location: {x: _0x3e33f4.x, y: _0x3e33f4.y}}), 
  addVotes(_0x3e33f4, 50, _0x3b501a(941));
  let _0x49525d = ITEMS[_0x3b501a(518)](_0x4a1676 => _0x4a1676[_0x3b501a(666)] === totemSelectedItem);
  publishGlobalEvent("totem", _0x3b501a(857) + _0x49525d.icon + _0x3b501a(467)), 
  speak(_0x3b501a(816) + totemSelectedItem + _0x3b501a(739)), renderGrid();
}
function closeTotemScan() {
  const _0xadff05 = getString;
  totemScanMode = false, totemSelectedItem = null, document.getElementById(_0xadff05(624))[_0xadff05(483)][_0xadff05(478)](_0xadff05(555)), endTurnLog(), prepareEndTurn();
}
function confirmTurn() {
  const _0x4a7a69 = getString;
  endTurnLog(), document[_0x4a7a69(743)](_0x4a7a69(888))[_0x4a7a69(612)].display = _0x4a7a69(854), 
  document[_0x4a7a69(743)](_0x4a7a69(642))[_0x4a7a69(612)].display = _0x4a7a69(854), 
  document[_0x4a7a69(743)](_0x4a7a69(446))[_0x4a7a69(612)][_0x4a7a69(699)] = _0x4a7a69(854), 
  //document[_0x4a7a69(743)](_0x4a7a69(550)).style[_0x4a7a69(699)] = _0x4a7a69(686), 
  //document[_0x4a7a69(743)](_0x4a7a69(550))[_0x4a7a69(612)].opacity = "1", 
  currentPlayer = (currentPlayer + 1) % players[_0x4a7a69(450)], 
  turnStep = 0,
  prepMove(3);
  if (gameEnded) {
    showFinalRanking();
    return;
  }
  currentPlayer === 0 && (console[_0x4a7a69(670)](_0x4a7a69(938)), moveCrocosGlobal(), moveFishesGlobal(), moveBirdsGlobal(), updateWeather(), currentWeather === "Canicule" && players[_0x4a7a69(849)](_0x2cd4c2 => decreaseGourdeDurability(_0x2cd4c2)), currentWeather === _0x4a7a69(958) && players[_0x4a7a69(849)](_0x3157fb => decreaseBottesDurability(_0x3157fb))), startTurn();
}
function updateWeather() {
  const _0x174722 = getString, _0x8545ef = [_0x174722(685), _0x174722(958), "Pluie fine", "Beau temps"];
  currentWeather = _0x8545ef[Math.floor(Math[_0x174722(480)]() * _0x8545ef[_0x174722(450)])];
  if (currentWeather === _0x174722(685)) scenery[_0x174722(849)](_0x28588f => {
    const _0x5e3af9 = _0x174722;
    if (_0x28588f[_0x5e3af9(561)] === _0x5e3af9(930)) _0x28588f.stock++;
  }), speak(_0x174722(756)); else {
    if (currentWeather === _0x174722(958)) speak(_0x174722(597)); else currentWeather === "Pluie fine" ? (scenery.forEach(_0x3b1258 => {
      const _0x2b69e9 = _0x174722;
      if (_0x3b1258.type === _0x2b69e9(512)) _0x3b1258.stock++;
    }), speak(_0x174722(745))) : speak(_0x174722(503));
  }
  updatePlayerTimerDisplay(), publishGlobalWeather(currentWeather);
}
function showFinalRanking() {
  const _0x3d2cb9 = getString;
  let _0x3cb66b = [...players][_0x3d2cb9(806)]((_0x51c330, _0x23cad6) => _0x23cad6.votes - _0x51c330[_0x3d2cb9(644)]), _0x339668 = "";
  _0x3cb66b[_0x3d2cb9(849)]((_0x2efa9e, _0x4606cb) => {
    const _0x411179 = _0x3d2cb9;
    let _0x27a535 = "", _0x4e2307 = "";
    if (_0x4606cb === 0) _0x27a535 = "🥇", _0x4e2307 = _0x411179(648); else {
      if (_0x4606cb === 1) _0x27a535 = "🥈", _0x4e2307 = "#C0C0C0"; else _0x4606cb === 2 ? (_0x27a535 = "🥉", _0x4e2307 = "#CD7F32") : (_0x27a535 = _0x4606cb + 1 + ".", _0x4e2307 = _0x411179(509));
    }
    let _0x578626 = ["#3498db", _0x411179(714), _0x411179(789), _0x411179(817)], _0x3981bd = _0x578626[_0x2efa9e.id];
    _0x339668 += _0x411179(669) + _0x27a535 + _0x411179(563) + _0x2efa9e.picto + '</span>\n                        <span style="font-size:1rem; font-weight:bold; color:' + _0x3981bd + _0x411179(577) + _0x2efa9e.name + _0x411179(960) + _0x4e2307 + _0x411179(577) + _0x2efa9e[_0x411179(644)] + "</div>\n                </div>\n            ";
  });
  let _0x348224 = document[_0x3d2cb9(743)]("bite-box");
  _0x348224[_0x3d2cb9(880)]("h3").innerText = _0x3d2cb9(927), _0x348224[_0x3d2cb9(880)]("h3")[_0x3d2cb9(612)][_0x3d2cb9(471)] = _0x3d2cb9(648), _0x348224[_0x3d2cb9(880)](_0x3d2cb9(511))[_0x3d2cb9(617)] = _0x339668, _0x348224[_0x3d2cb9(880)]("p")[_0x3d2cb9(617)] = _0x3d2cb9(717) + _0x3cb66b[0][_0x3d2cb9(666)] + _0x3d2cb9(631);
  let _0x592462 = _0x348224[_0x3d2cb9(880)]('button:not([onclick="location.reload()"])');
  if (_0x592462) _0x592462.style[_0x3d2cb9(699)] = _0x3d2cb9(854);
  document[_0x3d2cb9(743)](_0x3d2cb9(642))[_0x3d2cb9(612)][_0x3d2cb9(699)] = _0x3d2cb9(887), _0x348224[_0x3d2cb9(612)].display = _0x3d2cb9(887), speak("Le vainqueur est " + _0x3cb66b[0][_0x3d2cb9(666)] + _0x3d2cb9(551) + _0x3cb66b[0].votes + _0x3d2cb9(861));
}
function updateUI() {
  const _0x184ecf = getString;
  let _0x19c5c9 = players[currentPlayer];
  document[_0x184ecf(743)](_0x184ecf(455)).className = "header active-" + currentPlayer;
  let _0xc1ae9c = _0x184ecf(514) + _0x19c5c9[_0x184ecf(666)];
  _0x19c5c9[_0x184ecf(620)] && !_0x19c5c9[_0x184ecf(620)].completed && (_0xc1ae9c += _0x184ecf(588) + _0x19c5c9.secretMission.id + "</span>"), document[_0x184ecf(743)](_0x184ecf(702))[_0x184ecf(617)] = _0xc1ae9c, document.getElementById(_0x184ecf(891))[_0x184ecf(443)] = _0x19c5c9[_0x184ecf(644)], 
  updateFatigueWoundDisplay(_0x19c5c9), 
  //document.getElementById(_0x184ecf(838))[_0x184ecf(504)] = _0x19c5c9[_0x184ecf(675)] === 0, 
  //document[_0x184ecf(743)](_0x184ecf(571))[_0x184ecf(504)] = _0x19c5c9.woundCards === 0, 
  updateQRButtonVisibility(), checkSecretMission(_0x19c5c9), checkEvacuation(_0x19c5c9);
}
function updateFatigueWoundDisplay(_0x526fa5) {
  const _0x2c7165 = getString, _0x5935eb = document.getElementById(_0x2c7165(725)), _0x202964 = document[_0x2c7165(743)](_0x2c7165(783));
  _0x5935eb[_0x2c7165(443)] = _0x526fa5[_0x2c7165(675)], _0x202964.innerText = _0x526fa5[_0x2c7165(826)];
  if (_0x526fa5.fatigueCards <= 2) _0x5935eb[_0x2c7165(612)].color = "#2ecc71"; else _0x526fa5.fatigueCards <= 4 ? _0x5935eb[_0x2c7165(612)][_0x2c7165(471)] = "#e67e22" : _0x5935eb[_0x2c7165(612)].color = _0x2c7165(714);
  if (_0x526fa5[_0x2c7165(826)] <= 2) _0x202964[_0x2c7165(612)][_0x2c7165(471)] = _0x2c7165(817); else _0x526fa5[_0x2c7165(826)] <= 4 ? _0x202964[_0x2c7165(612)][_0x2c7165(471)] = _0x2c7165(652) : _0x202964[_0x2c7165(612)][_0x2c7165(471)] = _0x2c7165(714);
}
function checkEvacuation(_0x21393d) {
  const _0x1447c8 = getString;
  (_0x21393d[_0x1447c8(675)] >= 5 && _0x21393d[_0x1447c8(826)] >= 5 || _0x21393d[_0x1447c8(675)] >= 8 || _0x21393d[_0x1447c8(826)] >= 8) && evacuatePlayer(_0x21393d);
}
function evacuatePlayer(_0x25e465) {
  const _0x47a20b = getString;
  let _0x3a4e4a = document[_0x47a20b(743)](_0x47a20b(696));
  _0x3a4e4a[_0x47a20b(880)]("h3").innerText = _0x47a20b(877), _0x3a4e4a[_0x47a20b(880)]("h3")[_0x47a20b(612)][_0x47a20b(471)] = _0x47a20b(714), _0x3a4e4a.querySelector("div")[_0x47a20b(443)] = "🚁", _0x3a4e4a[_0x47a20b(880)]("p")[_0x47a20b(443)] = _0x47a20b(476);
  let _0x1be116 = _0x3a4e4a[_0x47a20b(880)]("button");
  _0x1be116 && (_0x1be116[_0x47a20b(443)] = "OK", _0x1be116[_0x47a20b(612)][_0x47a20b(703)] = _0x47a20b(714), _0x1be116.style[_0x47a20b(471)] = _0x47a20b(676), _0x1be116[_0x47a20b(781)] = () => closeEvacuationPopup(_0x25e465)), document[_0x47a20b(743)]("overlay")[_0x47a20b(612)][_0x47a20b(699)] = _0x47a20b(887), _0x3a4e4a[_0x47a20b(612)][_0x47a20b(699)] = "block", speak(_0x47a20b(533)), publishGlobalEvent("evacuation", "a été évacué de l'île ! 🚁");
}
function closeEvacuationPopup(_0x41c3a1) {
  const _0x2ae395 = getString;
  document.getElementById(_0x2ae395(696))[_0x2ae395(612)][_0x2ae395(699)] = _0x2ae395(854), document[_0x2ae395(743)]("overlay")[_0x2ae395(612)][_0x2ae395(699)] = _0x2ae395(854);
  let _0x13ab23 = document[_0x2ae395(743)](_0x2ae395(696)), _0x5b673c = _0x13ab23[_0x2ae395(880)](_0x2ae395(580));
  _0x5b673c && (_0x5b673c.innerText = "OK", _0x5b673c.style[_0x2ae395(703)] = "var(--red)", _0x5b673c[_0x2ae395(612)].color = "white", _0x5b673c[_0x2ae395(781)] = closeBite);
  _0x13ab23[_0x2ae395(880)]("h3")[_0x2ae395(443)] = "MORSURE !", _0x13ab23.querySelector("h3").style[_0x2ae395(471)] = _0x2ae395(701), _0x13ab23.querySelector(_0x2ae395(511)).innerText = "🐊", _0x13ab23[_0x2ae395(880)]("p")[_0x2ae395(443)] = "Morsure : +1 Blessure.", respawnPlayerItems(_0x41c3a1);
  let _0x4dbecb = Math.floor(_0x41c3a1[_0x2ae395(644)] / 2), _0x5cf922 = Math[_0x2ae395(472)](_0x4dbecb / 100) * 100;
  _0x41c3a1.fatigueCards = 0, _0x41c3a1[_0x2ae395(826)] = 0, updateFatigueWoundDisplay(_0x41c3a1), _0x41c3a1[_0x2ae395(644)] = _0x5cf922, _0x41c3a1[_0x2ae395(731)] = null, _0x41c3a1[_0x2ae395(470)] = null, _0x41c3a1[_0x2ae395(875)] = [null, null, null];
  _0x41c3a1[_0x2ae395(620)] && (_0x41c3a1[_0x2ae395(620)] = null);
  const _0x507517 = [{x: 1, y: 1}, {x: 16, y: 1}, {x: 1, y: 12}, {x: 16, y: 12}];
  _0x41c3a1.x = _0x507517[_0x41c3a1.id].x, _0x41c3a1.y = _0x507517[_0x41c3a1.id].y, _0x5cf922 > 0 ? speak(_0x2ae395(812) + _0x5cf922 + _0x2ae395(867)) : speak(_0x2ae395(521)), endTurnLog(), prepareEndTurn();
}
function respawnPlayerItems(_0x4008) {
  const _0x35f894 = getString;
  let _0x1c1396 = [];
  _0x4008[_0x35f894(731)] && _0x4008[_0x35f894(731)][_0x35f894(666)] && _0x1c1396[_0x35f894(948)](_0x4008[_0x35f894(731)][_0x35f894(666)]), _0x4008[_0x35f894(470)] && _0x4008.rightHand[_0x35f894(666)] && _0x1c1396[_0x35f894(948)](_0x4008[_0x35f894(470)][_0x35f894(666)]), _0x4008[_0x35f894(875)][_0x35f894(849)](_0x48fe94 => {
    const _0x4a18a2 = _0x35f894;
    _0x48fe94 && _0x48fe94.name && _0x1c1396.push(_0x48fe94[_0x4a18a2(666)]);
  }), _0x1c1396[_0x35f894(849)](_0x4631bf => {
    respawnItem(_0x4631bf);
  }), console[_0x35f894(670)](_0x35f894(744) + _0x4008[_0x35f894(666)] + " replacés:", _0x1c1396);
}
function updateQRButtonVisibility() {
  const _0x29fb45 = getString;
  let _0x290884 = players[currentPlayer], _0x293e55 = document.getElementById(_0x29fb45(742));
  (turnStep === 0 || turnStep === 1) && (!_0x290884[_0x29fb45(620)] || _0x290884[_0x29fb45(620)] && _0x290884[_0x29fb45(620)].completed) ? _0x293e55[_0x29fb45(483)][_0x29fb45(568)]("visible") : _0x293e55.classList[_0x29fb45(478)](_0x29fb45(555));
}
function addVotes(_0x18b24d, _0x57d835, _0x1b42eb) {
  const _0x2829ad = getString;
  _0x18b24d[_0x2829ad(644)] += _0x57d835, turnSummary.votesGained += _0x57d835, updateUI(), speak(_0x57d835 + " votes du public ! " + _0x1b42eb), console[_0x2829ad(670)](_0x18b24d[_0x2829ad(666)] + _0x2829ad(609) + _0x57d835 + _0x2829ad(726) + _0x1b42eb);
}
function hasAnyItem(_0xc780db) {
  const _0x252dce = getString;
  return _0xc780db.leftHand !== null || _0xc780db[_0x252dce(470)] !== null || _0xc780db[_0x252dce(875)].some(_0x2f8e72 => _0x2f8e72 !== null);
}
function isInventoryFull(_0x535104) {
  const _0x553be6 = getString;
  return _0x535104[_0x553be6(731)] !== null && _0x535104.rightHand !== null && _0x535104[_0x553be6(875)][_0x553be6(753)](_0x5a42ac => _0x5a42ac !== null);
}
function getAdjacentPlayersWithSpace() {
  const _0x5c072e = getString;
  let _0x4d622d = players[currentPlayer], _0x2dffd4 = [], _0x17ad12 = [{x: 0, y: 1}, {x: 0, y: -1}, {x: 1, y: 0}, {x: -1, y: 0}];
  return _0x17ad12[_0x5c072e(849)](_0x29ed7a => {
    const _0xec761e = _0x5c072e;
    let _0x13bd9d = _0x4d622d.x + _0x29ed7a.x, _0x5b4176 = _0x4d622d.y + _0x29ed7a.y;
    players[_0xec761e(849)](_0x19bfa7 => {
      const _0x1deaea = _0xec761e;
      _0x19bfa7.id !== _0x4d622d.id && _0x19bfa7.x === _0x13bd9d && _0x19bfa7.y === _0x5b4176 && !isInventoryFull(_0x19bfa7) && _0x2dffd4[_0x1deaea(948)](_0x19bfa7);
    });
  }), _0x2dffd4;
}
function updateGiftButton() {
  const _0x16b06c = getString;
  let _0x41d9e6 = players[currentPlayer], _0x21b6e8 = hasAnyItem(_0x41d9e6) && getAdjacentPlayersWithSpace()[_0x16b06c(450)] > 0;
  document[_0x16b06c(743)](_0x16b06c(663)).disabled = !_0x21b6e8;
}
function hasCanne(_0x54eef4) {
  const _0x2d6fdb = getString;
  return _0x54eef4.leftHand && _0x54eef4[_0x2d6fdb(731)][_0x2d6fdb(666)] === _0x2d6fdb(594) || _0x54eef4.rightHand && _0x54eef4.rightHand[_0x2d6fdb(666)] === "canne" || _0x54eef4.backpack[_0x2d6fdb(790)](_0x8a669b => _0x8a669b && _0x8a669b[_0x2d6fdb(666)] === _0x2d6fdb(594));
}
function hasArc(_0x2cac69) {
  const _0x57b2c0 = getString;
  return _0x2cac69[_0x57b2c0(731)] && _0x2cac69[_0x57b2c0(731)][_0x57b2c0(666)] === _0x57b2c0(942) || _0x2cac69[_0x57b2c0(470)] && _0x2cac69[_0x57b2c0(470)][_0x57b2c0(666)] === "arc" || _0x2cac69.backpack[_0x57b2c0(790)](_0x46376f => _0x46376f && _0x46376f[_0x57b2c0(666)] === _0x57b2c0(942));
}
function getAdjacentHuntTargets() {
  const _0x26a73e = getString;
  let _0x4b2b41 = players[currentPlayer], _0x4b168e = [], _0x181e45 = [{x: 0, y: 1}, {x: 0, y: -1}, {x: 1, y: 0}, {x: -1, y: 0}], _0x466213 = hasCanne(_0x4b2b41), _0x2c3c1d = hasArc(_0x4b2b41);
  return _0x181e45[_0x26a73e(849)](_0x4186e4 => {
    const _0x4cf934 = _0x26a73e;
    let _0x175aaa = _0x4b2b41.x + _0x4186e4.x, _0x44b097 = _0x4b2b41.y + _0x4186e4.y;
    _0x466213 && fishes[_0x4cf934(849)](_0x557f98 => {
      const _0x43ad96 = _0x4cf934;
      _0x557f98.x === _0x175aaa && _0x557f98.y === _0x44b097 && _0x4b168e[_0x43ad96(948)]({type: _0x43ad96(600), id: _0x557f98.id, x: _0x557f98.x, y: _0x557f98.y});
    }), _0x2c3c1d && birds.forEach(_0x3e8ded => {
      const _0x43bee7 = _0x4cf934;
      _0x3e8ded.x === _0x175aaa && _0x3e8ded.y === _0x44b097 && _0x4b168e.push({type: _0x43bee7(933), id: _0x3e8ded.id, x: _0x3e8ded.x, y: _0x3e8ded.y});
    });
  }), _0x4b168e;
}
function updateHuntButton() {
  const _0x5db192 = getString;
  let _0xfc4b82 = players[currentPlayer], _0x1633d3 = getAdjacentHuntTargets()[_0x5db192(450)] > 0;
  document[_0x5db192(743)]("btn-hunt")[_0x5db192(504)] = !_0x1633d3;
}
function updatePublicHelpButton() {
  const _0x260bc8 = getString;
  let _0x522aa3 = players[currentPlayer], _0x980c00 = _0x522aa3[_0x260bc8(644)] >= 20;
  document.getElementById(_0x260bc8(796))[_0x260bc8(504)] = !_0x980c00;
}
function huntTarget(_0x459668) {
  const _0x1b304b = getString;
  let _0x2b667d = players[currentPlayer];
  if (_0x459668[_0x1b304b(561)] === _0x1b304b(600)) {
    let _0x2474b5 = fishes.findIndex(_0x16aced => _0x16aced.id === _0x459668.id);
    if (_0x2474b5 !== -1) {
      fishes[_0x1b304b(827)](_0x2474b5, 1);
      let _0x549933 = Math[_0x1b304b(486)](2, _0x2b667d.fatigueCards);
      _0x2b667d[_0x1b304b(675)] = Math[_0x1b304b(883)](0, _0x2b667d[_0x1b304b(675)] - 2), turnSummary[_0x1b304b(769)] += _0x549933, updateFatigueWoundDisplay(_0x2b667d), checkEvacuation(_0x2b667d), _0x549933 > 0 ? speak(_0x1b304b(755) + _0x549933 + _0x1b304b(637) + (_0x549933 > 1 ? "s" : "") + ".") : speak(_0x1b304b(940)), respawnFish(_0x459668.id), decreaseItemDurability(_0x2b667d, "canne");
    }
  } else {
    if (_0x459668.type === _0x1b304b(933)) {
      let _0x165ecd = birds[_0x1b304b(733)](_0x29708b => _0x29708b.id === _0x459668.id);
      if (_0x165ecd !== -1) {
        birds.splice(_0x165ecd, 1);
        let _0x2f38f0 = Math[_0x1b304b(486)](2, _0x2b667d[_0x1b304b(675)]);
        _0x2b667d[_0x1b304b(675)] = Math[_0x1b304b(883)](0, _0x2b667d[_0x1b304b(675)] - 2), turnSummary.fatigueRemoved += _0x2f38f0, updateFatigueWoundDisplay(_0x2b667d), checkEvacuation(_0x2b667d), _0x2f38f0 > 0 ? speak(_0x1b304b(944) + _0x2f38f0 + _0x1b304b(637) + (_0x2f38f0 > 1 ? "s" : "") + ".") : speak(_0x1b304b(801)), respawnBird(_0x459668.id), decreaseItemDurability(_0x2b667d, _0x1b304b(942));
      }
    }
  }
  _0x2b667d.actions[_0x1b304b(948)]({type: "chasse", target: _0x459668[_0x1b304b(561)], location: {x: _0x2b667d.x, y: _0x2b667d.y}}), checkSecretMission(_0x2b667d), huntMode = false, huntTargets = [], endTurnLog(), prepareEndTurn();
}
function respawnFish(_0x55e675) {
  const _0x173197 = getString;
  let _0x21595c = [];
  for (let _0x4c824a = 0; _0x4c824a <= 17; _0x4c824a++) {
    for (let _0x274a28 = 0; _0x274a28 <= 13; _0x274a28++) {
      (_0x4c824a === 0 || _0x4c824a === 17 || _0x274a28 === 0 || _0x274a28 === 13) && _0x21595c[_0x173197(948)]({x: _0x4c824a, y: _0x274a28});
    }
  }
  let _0x1a7e9d = _0x21595c.filter(_0x408602 => {
    const _0x3ecb8b = _0x173197;
    if (crocos[_0x3ecb8b(790)](_0x5f0ece => _0x5f0ece.x === _0x408602.x && _0x5f0ece.y === _0x408602.y)) return false;
    if (fishes.some(_0x458ff0 => _0x458ff0.x === _0x408602.x && _0x458ff0.y === _0x408602.y)) return false;
    if (birds.some(_0x329df5 => _0x329df5.x === _0x408602.x && _0x329df5.y === _0x408602.y)) return false;
    let _0x40f55a = fishes[_0x3ecb8b(790)](_0x59af39 => {
      let _0x6745da = getDistance(_0x59af39.x, _0x59af39.y, _0x408602.x, _0x408602.y);
      return _0x6745da < 4;
    });
    return !_0x40f55a;
  });
  if (_0x1a7e9d[_0x173197(450)] > 0) {
    let _0x5064bd = _0x1a7e9d[Math[_0x173197(472)](Math[_0x173197(480)]() * _0x1a7e9d.length)];
    fishes[_0x173197(948)]({id: _0x55e675, x: _0x5064bd.x, y: _0x5064bd.y}), console[_0x173197(670)](_0x173197(932) + _0x55e675 + _0x173197(757) + _0x5064bd.x + ", " + _0x5064bd.y + ")");
  }
}
function respawnBird(_0x37e087) {
  const _0x13aeaa = getString;
  let _0x493207 = [];
  for (let _0x44ff84 = 0; _0x44ff84 <= 17; _0x44ff84++) {
    for (let _0x2764c8 = 0; _0x2764c8 <= 13; _0x2764c8++) {
      _0x493207.push({x: _0x44ff84, y: _0x2764c8});
    }
  }
  let _0x33adff = _0x493207.filter(_0x35f4e8 => {
    const _0x327f0e = decodeString;
    if (crocos.some(_0x17597e => _0x17597e.x === _0x35f4e8.x && _0x17597e.y === _0x35f4e8.y)) return false;
    if (fishes[_0x327f0e(790)](_0x1135e8 => _0x1135e8.x === _0x35f4e8.x && _0x1135e8.y === _0x35f4e8.y)) return false;
    if (birds[_0x327f0e(790)](_0xcff82c => _0xcff82c.x === _0x35f4e8.x && _0xcff82c.y === _0x35f4e8.y)) return false;
    return true;
  });
  if (_0x33adff[_0x13aeaa(450)] > 0) {
    let _0x2411ae = _0x33adff[Math[_0x13aeaa(472)](Math[_0x13aeaa(480)]() * _0x33adff[_0x13aeaa(450)])];
    birds[_0x13aeaa(948)]({id: _0x37e087, x: _0x2411ae.x, y: _0x2411ae.y}), console.log(_0x13aeaa(885) + _0x37e087 + " réapparu en (" + _0x2411ae.x + ", " + _0x2411ae.y + ")");
  }
}
function selectGiftTarget(_0x3fa509) {
  giftTargetPlayer = _0x3fa509, giftMode = false, speak("Sélectionnez l'objet à donner."), showGiftInventory();
}
function showGiftInventory() {
  const _0x111d58 = getString;
  let _0xb948cb = players[currentPlayer];
  selectedItem = null, currentCellItems = [], document[_0x111d58(743)](_0x111d58(539))[_0x111d58(443)] = _0xb948cb[_0x111d58(731)] ? _0xb948cb[_0x111d58(731)][_0x111d58(937)] : "", document[_0x111d58(743)](_0x111d58(898))[_0x111d58(443)] = _0xb948cb[_0x111d58(470)] ? _0xb948cb[_0x111d58(470)].icon : "", document[_0x111d58(743)]("inv-back0")[_0x111d58(443)] = _0xb948cb[_0x111d58(875)][0] ? _0xb948cb[_0x111d58(875)][0][_0x111d58(937)] : "", document[_0x111d58(743)](_0x111d58(599))[_0x111d58(443)] = _0xb948cb[_0x111d58(875)][1] ? _0xb948cb[_0x111d58(875)][1][_0x111d58(937)] : "", document[_0x111d58(743)](_0x111d58(951))[_0x111d58(443)] = _0xb948cb[_0x111d58(875)][2] ? _0xb948cb[_0x111d58(875)][2][_0x111d58(937)] : "", document[_0x111d58(743)]("loot-box")[_0x111d58(880)]("h3")[_0x111d58(443)] = _0x111d58(592), document[_0x111d58(743)](_0x111d58(660)).innerHTML = _0x111d58(889);
  let _0x499b5c = document[_0x111d58(743)]("loot-box")[_0x111d58(880)]("button");
  _0x499b5c[_0x111d58(443)] = _0x111d58(565), _0x499b5c[_0x111d58(781)] = cancelGift, document.getElementById(_0x111d58(539))[_0x111d58(781)] = () => giveItemFromSlot(_0x111d58(751)), document.getElementById(_0x111d58(898))[_0x111d58(781)] = () => giveItemFromSlot(_0x111d58(805)), document[_0x111d58(743)](_0x111d58(602))[_0x111d58(781)] = () => giveItemFromSlot("back0"), document[_0x111d58(743)](_0x111d58(599)).onclick = () => giveItemFromSlot(_0x111d58(621)), document[_0x111d58(743)](_0x111d58(951)).onclick = () => giveItemFromSlot(_0x111d58(524)), document[_0x111d58(743)](_0x111d58(888))[_0x111d58(612)][_0x111d58(699)] = _0x111d58(887), document.getElementById(_0x111d58(642)).style[_0x111d58(699)] = _0x111d58(887);
}
function giveItemFromSlot(_0x13bc0b) {
  const _0x167492 = getString;
  let _0x17e961 = players[currentPlayer], _0x42b71d = players[giftTargetPlayer], _0x2ecb28 = null;
  if (_0x13bc0b === _0x167492(751)) {
    _0x2ecb28 = _0x17e961[_0x167492(731)];
    if (!_0x2ecb28) return;
    _0x17e961[_0x167492(731)] = null;
  } else {
    if (_0x13bc0b === "right") {
      _0x2ecb28 = _0x17e961[_0x167492(470)];
      if (!_0x2ecb28) return;
      _0x17e961[_0x167492(470)] = null;
    } else {
      if (_0x13bc0b.startsWith(_0x167492(461))) {
        let _0x5d14fb = parseInt(_0x13bc0b.replace(_0x167492(461), ""));
        _0x2ecb28 = _0x17e961[_0x167492(875)][_0x5d14fb];
        if (!_0x2ecb28) return;
        _0x17e961[_0x167492(875)][_0x5d14fb] = null;
      }
    }
  }
  let _0x53b726 = false;
  for (let _0xb7d636 = 0; _0xb7d636 < 3; _0xb7d636++) {
    if (_0x42b71d[_0x167492(875)][_0xb7d636] === null) {
      _0x42b71d[_0x167492(875)][_0xb7d636] = _0x2ecb28, _0x53b726 = true;
      break;
    }
  }
  !_0x53b726 && _0x42b71d[_0x167492(731)] === null && (_0x42b71d[_0x167492(731)] = _0x2ecb28, _0x53b726 = true), !_0x53b726 && _0x42b71d[_0x167492(470)] === null && (_0x42b71d[_0x167492(470)] = _0x2ecb28, _0x53b726 = true), turnSummary[_0x167492(639)][_0x167492(948)]({icon: _0x2ecb28[_0x167492(937)], name: _0x2ecb28[_0x167492(666)] || _0x2ecb28[_0x167492(561)], action: _0x167492(908)}), _0x17e961[_0x167492(490)][_0x167492(948)]({type: _0x167492(947), item: _0x2ecb28, to: giftTargetPlayer, location: {x: _0x17e961.x, y: _0x17e961.y}}), checkSecretMission(_0x17e961), speak(_0x167492(519) + _0x42b71d[_0x167492(666)] + " !"), closeGiftInventory();
}
function cancelGift() {
  giftMode = false, giftTargetPlayer = null, closeGiftInventory(), renderGrid();
}
function closeGiftInventory() {
  const _0x1b5fcb = getString;
  document[_0x1b5fcb(743)](_0x1b5fcb(888))[_0x1b5fcb(880)]("h3").innerText = _0x1b5fcb(772);
  let _0x31bbc8 = document.getElementById("loot-box")[_0x1b5fcb(880)](_0x1b5fcb(580));
  _0x31bbc8.innerText = "TERMINER", _0x31bbc8[_0x1b5fcb(781)] = closeLoot, document.getElementById(_0x1b5fcb(539))[_0x1b5fcb(781)] = () => selectInventorySlot(_0x1b5fcb(751)), document[_0x1b5fcb(743)]("inv-right")[_0x1b5fcb(781)] = () => selectInventorySlot(_0x1b5fcb(805)), document[_0x1b5fcb(743)](_0x1b5fcb(602))[_0x1b5fcb(781)] = () => selectInventorySlot(_0x1b5fcb(837)), document[_0x1b5fcb(743)]("inv-back1").onclick = () => selectInventorySlot(_0x1b5fcb(621)), document.getElementById(_0x1b5fcb(951))[_0x1b5fcb(781)] = () => selectInventorySlot(_0x1b5fcb(524)), document[_0x1b5fcb(743)](_0x1b5fcb(888))[_0x1b5fcb(612)][_0x1b5fcb(699)] = _0x1b5fcb(854), document.getElementById(_0x1b5fcb(642)).style.display = _0x1b5fcb(854), giftMode = false, giftTargetPlayer = null, endTurnLog(), prepareEndTurn();
}
function showRestMenu() {
  const _0x3c5de9 = getString;
  let _0x5b5fdd = players[currentPlayer], _0x4ef29a = document.getElementById(_0x3c5de9(706));
  _0x4ef29a[_0x3c5de9(617)] = "";
  let _0x59758a = [];
  _0x5b5fdd[_0x3c5de9(731)] && isConsumable(_0x5b5fdd[_0x3c5de9(731)]) && _0x59758a[_0x3c5de9(948)]({item: _0x5b5fdd[_0x3c5de9(731)], slot: _0x3c5de9(751)}), _0x5b5fdd[_0x3c5de9(470)] && isConsumable(_0x5b5fdd[_0x3c5de9(470)]) && _0x59758a[_0x3c5de9(948)]({item: _0x5b5fdd[_0x3c5de9(470)], slot: _0x3c5de9(805)}), _0x5b5fdd[_0x3c5de9(875)][_0x3c5de9(849)]((_0x4dbd1f, _0x7027c9) => {
    const _0x1f76ac = _0x3c5de9;
    _0x4dbd1f && isConsumable(_0x4dbd1f) && _0x59758a[_0x1f76ac(948)]({item: _0x4dbd1f, slot: "back" + _0x7027c9});
  }), _0x59758a[_0x3c5de9(450)] === 0 ? _0x4ef29a.innerHTML = _0x3c5de9(468) : _0x59758a.forEach(_0x361905 => {
    const _0x157854 = _0x3c5de9;
    let _0x3906d2 = document[_0x157854(935)](_0x157854(580));
    _0x3906d2[_0x157854(612)][_0x157854(740)] = _0x157854(479);
    let _0x11c149 = getConsumableEffect(_0x361905[_0x157854(530)]);
    _0x3906d2[_0x157854(617)] = '<span style="font-size:1.5rem;">' + _0x361905[_0x157854(530)][_0x157854(937)] + '</span><span style="flex:1; text-align:left;">' + _0x11c149[_0x157854(666)] + _0x157854(868), _0x3906d2[_0x157854(781)] = () => consumeItem(_0x361905.slot, _0x11c149), _0x4ef29a[_0x157854(447)](_0x3906d2);
  }), document.getElementById(_0x3c5de9(768))[_0x3c5de9(612)][_0x3c5de9(699)] = _0x3c5de9(887), document.getElementById("overlay")[_0x3c5de9(612)].display = _0x3c5de9(887);
}
function isConsumable(_0xd2c8fe) {
  const _0x203afd = getString;
  return _0xd2c8fe[_0x203afd(666)] === "trousse" || _0xd2c8fe[_0x203afd(561)] === _0x203afd(766);
}
function getConsumableEffect(_0x3220ea) {
  const _0x40ec6d = getString;
  if (_0x3220ea[_0x40ec6d(666)] === _0x40ec6d(608)) return {name: _0x40ec6d(570), message: _0x40ec6d(436), fatigue: -1, wound: -2}; else {
    if (_0x3220ea[_0x40ec6d(937)] === "🥥") return {name: "Noix de coco", message: "Vous récupérez fatigue et immunité. -1 Fatigue et -1 Blessure.", fatigue: -1, wound: -1}; else {
      if (_0x3220ea[_0x40ec6d(937)] === "🍌") return {name: "Banane", message: _0x40ec6d(802), fatigue: -2, wound: 0}; else {
        if (_0x3220ea[_0x40ec6d(937)] === "🥭") return {name: "Mangue", message: "Un petit coup de boost. -2 Fatigues.", fatigue: -2, wound: 0};
      }
    }
  }
  return null;
}
function doRest() {
  const _0x399b49 = getString;
  let _0x597075 = players[currentPlayer], _0x27260e = getBaseOwner(_0x597075.x, _0x597075.y), _0x3805a6 = _0x27260e !== null && _0x27260e === _0x597075.id;
  if (_0x3805a6) {
    let _0x5d5a98 = _0x597075.fatigueCards, _0x13258c = _0x597075[_0x399b49(826)];
    _0x597075[_0x399b49(675)] = 0, _0x597075.woundCards = 0, turnSummary.fatigueRemoved += _0x5d5a98, turnSummary[_0x399b49(462)] += _0x13258c, updateFatigueWoundDisplay(_0x597075), checkEvacuation(_0x597075);
    let _0x2bc53e = _0x399b49(516) + _0x5d5a98 + ") et blessures (" + _0x13258c + ") sont retirées !";
    speak(_0x2bc53e), publishGlobalEvent(_0x399b49(442), "s'est reposé au camp et a récupéré toutes ses forces ! 🏕️"), (_0x5d5a98 > 0 || _0x13258c > 0) && addVotes(_0x597075, 30, _0x399b49(496));
  } else _0x597075.fatigueCards > 0 ? (_0x597075[_0x399b49(675)]--, turnSummary.fatigueRemoved++, updateFatigueWoundDisplay(_0x597075), checkEvacuation(_0x597075), speak(_0x399b49(758))) : speak(_0x399b49(834));
  _0x597075[_0x399b49(490)][_0x399b49(948)]({type: _0x399b49(605), location: {x: _0x597075.x, y: _0x597075.y}, inCamp: _0x3805a6}), checkSecretMission(_0x597075), closeRest(), endTurnLog(), prepareEndTurn();
}
function consumeItem(_0x4627e1, _0x446a69) {
  const _0xdd5e02 = getString;
  let _0x1b6a77 = players[currentPlayer];
  if (_0x4627e1 === _0xdd5e02(751)) _0x1b6a77[_0xdd5e02(731)] = null; else {
    if (_0x4627e1 === _0xdd5e02(805)) _0x1b6a77[_0xdd5e02(470)] = null; else {
      if (_0x4627e1[_0xdd5e02(525)](_0xdd5e02(461))) {
        let _0x2c311b = parseInt(_0x4627e1[_0xdd5e02(632)](_0xdd5e02(461), ""));
        _0x1b6a77[_0xdd5e02(875)][_0x2c311b] = null;
      }
    }
  }
  if (_0x446a69[_0xdd5e02(634)] < 0) {
    let _0x3ae00e = Math[_0xdd5e02(486)](-_0x446a69[_0xdd5e02(634)], _0x1b6a77.fatigueCards);
    _0x1b6a77.fatigueCards = Math[_0xdd5e02(883)](0, _0x1b6a77.fatigueCards + _0x446a69[_0xdd5e02(634)]), turnSummary.fatigueRemoved += _0x3ae00e;
  }
  if (_0x446a69[_0xdd5e02(481)] < 0) {
    let _0x3ca469 = Math[_0xdd5e02(486)](-_0x446a69.wound, _0x1b6a77[_0xdd5e02(826)]);
    _0x1b6a77[_0xdd5e02(826)] = Math[_0xdd5e02(883)](0, _0x1b6a77[_0xdd5e02(826)] + _0x446a69.wound), turnSummary.woundRemoved += _0x3ca469;
  }
  updateFatigueWoundDisplay(_0x1b6a77), checkEvacuation(_0x1b6a77), turnSummary[_0xdd5e02(639)].push({icon: _0x446a69.name[_0xdd5e02(925)](_0xdd5e02(553)) ? "🥥" : _0x446a69.name[_0xdd5e02(925)](_0xdd5e02(905)) ? "🍌" : _0x446a69[_0xdd5e02(666)][_0xdd5e02(925)](_0xdd5e02(488)) ? "🥭" : "🩹", name: _0x446a69.name, action: "consommé"}), speak(_0x446a69[_0xdd5e02(498)]);
  if (_0x446a69[_0xdd5e02(666)] === "Noix de coco") respawnFruit(_0xdd5e02(930), "🥥"); else {
    if (_0x446a69[_0xdd5e02(666)] === _0xdd5e02(905)) respawnFruit(_0xdd5e02(512), "🍌"); else _0x446a69[_0xdd5e02(666)] === _0xdd5e02(488) && respawnMangue();
  }
  _0x1b6a77[_0xdd5e02(490)][_0xdd5e02(948)]({type: _0xdd5e02(657), item: _0x446a69[_0xdd5e02(666)], location: {x: _0x1b6a77.x, y: _0x1b6a77.y}}), closeRest(), endTurnLog(), prepareEndTurn();
}
function closeRest() {
  const _0x4e2834 = getString;
  document.getElementById(_0x4e2834(768))[_0x4e2834(612)][_0x4e2834(699)] = _0x4e2834(854), document[_0x4e2834(743)](_0x4e2834(642)).style[_0x4e2834(699)] = _0x4e2834(854);
}
function closeBite() {
  const _0x1fda8b = getString;
  document[_0x1fda8b(743)](_0x1fda8b(696))[_0x1fda8b(612)][_0x1fda8b(699)] = _0x1fda8b(854), document[_0x1fda8b(743)](_0x1fda8b(642)).style[_0x1fda8b(699)] = _0x1fda8b(854), document[_0x1fda8b(743)](_0x1fda8b(696)).querySelector("h3")[_0x1fda8b(443)] = "MORSURE !", document[_0x1fda8b(743)](_0x1fda8b(696)).querySelector("h3")[_0x1fda8b(612)][_0x1fda8b(471)] = _0x1fda8b(701), document.getElementById("bite-box").querySelector(_0x1fda8b(511))[_0x1fda8b(443)] = "🐊", document.getElementById(_0x1fda8b(696)).querySelector("p")[_0x1fda8b(443)] = "Morsure : +1 Blessure";
}
function decreaseHandItemsDurability(_0x105348) {
  const _0x59c42d = getString;
  _0x105348[_0x59c42d(731)] && _0x105348.leftHand[_0x59c42d(633)] !== null && ((_0x105348[_0x59c42d(731)].name === _0x59c42d(832) || _0x105348[_0x59c42d(731)][_0x59c42d(666)] === _0x59c42d(828)) && (_0x105348[_0x59c42d(731)][_0x59c42d(633)]--, _0x105348.leftHand[_0x59c42d(633)] <= 0 && (speak(_0x59c42d(502) + _0x105348[_0x59c42d(731)][_0x59c42d(666)] + _0x59c42d(613)), turnSummary[_0x59c42d(513)][_0x59c42d(948)]({icon: _0x105348[_0x59c42d(731)][_0x59c42d(937)], name: _0x105348[_0x59c42d(731)][_0x59c42d(666)]}), respawnItem(_0x105348[_0x59c42d(731)].name), _0x105348[_0x59c42d(731)] = null))), _0x105348[_0x59c42d(470)] && _0x105348[_0x59c42d(470)][_0x59c42d(633)] !== null && ((_0x105348[_0x59c42d(470)][_0x59c42d(666)] === _0x59c42d(832) || _0x105348[_0x59c42d(470)][_0x59c42d(666)] === _0x59c42d(828)) && (_0x105348[_0x59c42d(470)].durability--, _0x105348.rightHand[_0x59c42d(633)] <= 0 && (speak(_0x59c42d(502) + _0x105348.rightHand[_0x59c42d(666)] + _0x59c42d(613)), turnSummary[_0x59c42d(513)][_0x59c42d(948)]({icon: _0x105348.rightHand[_0x59c42d(937)], name: _0x105348.rightHand[_0x59c42d(666)]}), respawnItem(_0x105348.rightHand[_0x59c42d(666)]), _0x105348.rightHand = null)));
}
function decreaseBottesDurability(_0x2ff5db) {
  const _0x1baeea = getString;
  _0x2ff5db[_0x1baeea(731)] && _0x2ff5db[_0x1baeea(731)][_0x1baeea(666)] === "bottes" && _0x2ff5db.leftHand[_0x1baeea(633)] !== null && (_0x2ff5db[_0x1baeea(731)][_0x1baeea(633)]--, _0x2ff5db[_0x1baeea(731)][_0x1baeea(633)] <= 0 && (speak(_0x1baeea(818) + _0x2ff5db.name + _0x1baeea(863)), turnSummary[_0x1baeea(513)][_0x1baeea(948)]({icon: _0x2ff5db[_0x1baeea(731)][_0x1baeea(937)], name: _0x1baeea(892)}), respawnItem(_0x1baeea(892)), _0x2ff5db[_0x1baeea(731)] = null)), _0x2ff5db[_0x1baeea(470)] && _0x2ff5db[_0x1baeea(470)][_0x1baeea(666)] === _0x1baeea(892) && _0x2ff5db[_0x1baeea(470)][_0x1baeea(633)] !== null && (_0x2ff5db[_0x1baeea(470)][_0x1baeea(633)]--, _0x2ff5db[_0x1baeea(470)][_0x1baeea(633)] <= 0 && (speak(_0x1baeea(818) + _0x2ff5db.name + _0x1baeea(863)), turnSummary[_0x1baeea(513)][_0x1baeea(948)]({icon: _0x2ff5db[_0x1baeea(470)][_0x1baeea(937)], name: _0x1baeea(892)}), respawnItem("bottes"), _0x2ff5db.rightHand = null)), _0x2ff5db.backpack[_0x1baeea(849)]((_0x4ecc4a, _0x359e8a) => {
    const _0x1a9bbb = _0x1baeea;
    _0x4ecc4a && _0x4ecc4a[_0x1a9bbb(666)] === _0x1a9bbb(892) && _0x4ecc4a[_0x1a9bbb(633)] !== null && (_0x4ecc4a.durability--, _0x4ecc4a.durability <= 0 && (speak("Les bottes de " + _0x2ff5db[_0x1a9bbb(666)] + _0x1a9bbb(863)), turnSummary[_0x1a9bbb(513)][_0x1a9bbb(948)]({icon: _0x4ecc4a.icon, name: _0x1a9bbb(892)}), respawnItem("bottes"), _0x2ff5db[_0x1a9bbb(875)][_0x359e8a] = null));
  });
}
function decreaseGourdeDurability(_0x24e9e4) {
  const _0x51067f = getString;
  _0x24e9e4.leftHand && _0x24e9e4[_0x51067f(731)][_0x51067f(666)] === _0x51067f(628) && _0x24e9e4.leftHand[_0x51067f(633)] !== null && (_0x24e9e4.leftHand.durability--, _0x24e9e4[_0x51067f(731)][_0x51067f(633)] <= 0 && (speak("La gourde de " + _0x24e9e4[_0x51067f(666)] + _0x51067f(647)), respawnItem(_0x51067f(628)), _0x24e9e4[_0x51067f(731)] = null)), _0x24e9e4[_0x51067f(470)] && _0x24e9e4.rightHand[_0x51067f(666)] === _0x51067f(628) && _0x24e9e4.rightHand[_0x51067f(633)] !== null && (_0x24e9e4[_0x51067f(470)][_0x51067f(633)]--, _0x24e9e4.rightHand[_0x51067f(633)] <= 0 && (speak(_0x51067f(894) + _0x24e9e4[_0x51067f(666)] + _0x51067f(647)), respawnItem(_0x51067f(628)), _0x24e9e4[_0x51067f(470)] = null)), _0x24e9e4[_0x51067f(875)][_0x51067f(849)]((_0x360a44, _0x2a638c) => {
    const _0x470da5 = _0x51067f;
    _0x360a44 && _0x360a44[_0x470da5(666)] === _0x470da5(628) && _0x360a44.durability !== null && (_0x360a44.durability--, _0x360a44[_0x470da5(633)] <= 0 && (speak(_0x470da5(894) + _0x24e9e4.name + _0x470da5(647)), respawnItem("gourde"), _0x24e9e4[_0x470da5(875)][_0x2a638c] = null));
  });
}
function decreaseItemDurability(_0x21db62, _0xda5dc7) {
  const _0x5a4b4b = getString;
  if (_0x21db62[_0x5a4b4b(731)] && _0x21db62.leftHand[_0x5a4b4b(666)] === _0xda5dc7 && _0x21db62[_0x5a4b4b(731)][_0x5a4b4b(633)] !== null) {
    _0x21db62[_0x5a4b4b(731)][_0x5a4b4b(633)]--;
    _0x21db62[_0x5a4b4b(731)].durability <= 0 && (speak(_0x5a4b4b(502) + _0xda5dc7 + " est cassée !"), turnSummary[_0x5a4b4b(513)].push({icon: _0x21db62[_0x5a4b4b(731)][_0x5a4b4b(937)], name: _0xda5dc7}), respawnItem(_0xda5dc7), _0x21db62[_0x5a4b4b(731)] = null);
    return;
  }
  if (_0x21db62[_0x5a4b4b(470)] && _0x21db62[_0x5a4b4b(470)].name === _0xda5dc7 && _0x21db62[_0x5a4b4b(470)][_0x5a4b4b(633)] !== null) {
    _0x21db62[_0x5a4b4b(470)][_0x5a4b4b(633)]--;
    _0x21db62.rightHand[_0x5a4b4b(633)] <= 0 && (speak(_0x5a4b4b(502) + _0xda5dc7 + _0x5a4b4b(613)), turnSummary[_0x5a4b4b(513)][_0x5a4b4b(948)]({icon: _0x21db62[_0x5a4b4b(470)][_0x5a4b4b(937)], name: _0xda5dc7}), respawnItem(_0xda5dc7), _0x21db62.rightHand = null);
    return;
  }
  for (let _0x9df252 = 0; _0x9df252 < _0x21db62[_0x5a4b4b(875)][_0x5a4b4b(450)]; _0x9df252++) {
    let _0x1f536b = _0x21db62[_0x5a4b4b(875)][_0x9df252];
    if (_0x1f536b && _0x1f536b[_0x5a4b4b(666)] === _0xda5dc7 && _0x1f536b[_0x5a4b4b(633)] !== null) {
      _0x1f536b[_0x5a4b4b(633)]--;
      _0x1f536b[_0x5a4b4b(633)] <= 0 && (speak(_0x5a4b4b(502) + _0xda5dc7 + " est cassée !"), turnSummary.itemsBroken[_0x5a4b4b(948)]({icon: _0x1f536b[_0x5a4b4b(937)], name: _0xda5dc7}), respawnItem(_0xda5dc7), _0x21db62[_0x5a4b4b(875)][_0x9df252] = null);
      return;
    }
  }
}
function openQRScanner() {
  const _0x16cbe3 = getString;
  if (isScanning) return;
  document.getElementById(_0x16cbe3(515))[_0x16cbe3(612)][_0x16cbe3(699)] = "block", document[_0x16cbe3(743)](_0x16cbe3(463))[_0x16cbe3(443)] = _0x16cbe3(872), html5QrCode = new Html5Qrcode(_0x16cbe3(919));
  const _0x9f9be0 = {fps: 10, qrbox: {width: 250, height: 250}, aspectRatio: 1};
  html5QrCode[_0x16cbe3(579)]({facingMode: "environment"}, _0x9f9be0, onQRCodeScanned, onQRCodeError)[_0x16cbe3(629)](() => {
    isScanning = true;
  })[_0x16cbe3(534)](_0x4afd04 => {
    const _0x57ec9f = _0x16cbe3;
    console.error("Erreur démarrage caméra:", _0x4afd04), document[_0x57ec9f(743)](_0x57ec9f(463))[_0x57ec9f(443)] = _0x57ec9f(583);
  });
}
function closeQRScanner() {
  const _0xfd02fe = getString;
  html5QrCode && isScanning ? html5QrCode[_0xfd02fe(904)]()[_0xfd02fe(629)](() => {
    const _0x591b2a = _0xfd02fe;
    isScanning = false, html5QrCode[_0x591b2a(718)](), document[_0x591b2a(743)](_0x591b2a(515))[_0x591b2a(612)].display = _0x591b2a(854);
  }).catch(_0x5491cd => {
    const _0x186889 = _0xfd02fe;
    console[_0x186889(529)](_0x186889(603), _0x5491cd);
  }) : document.getElementById("qr-scanner-modal")[_0xfd02fe(612)][_0xfd02fe(699)] = "none";
}
function onQRCodeScanned(_0x146f5e, _0x1685f9) {
  const _0x16e5d2 = getString;
  console[_0x16e5d2(670)]("QR Code scanné:", _0x146f5e);
  const _0x986b7c = parseInt(_0x146f5e);
  if (isNaN(_0x986b7c) || _0x986b7c < 1 || _0x986b7c > 100) {
    document[_0x16e5d2(743)](_0x16e5d2(463))[_0x16e5d2(443)] = _0x16e5d2(847), speak(_0x16e5d2(659));
    return;
  }
  assignSecretMission(_0x986b7c), closeQRScanner();
}
function onQRCodeError(_0x33fa37) {}
function assignSecretMission(_0x5c388b) {
  const _0x296605 = getString;
  let _0x7a8681 = players[currentPlayer];
  if (_0x7a8681[_0x296605(620)] && !_0x7a8681[_0x296605(620)][_0x296605(477)]) {
    speak(_0x296605(839));
    return;
  }
  const _0x5de6a2 = SECRET_MISSIONS[_0x296605(518)](_0x23a5bc => _0x23a5bc.id === _0x5c388b);
  if (!_0x5de6a2) {
    speak(_0x296605(693));
    return;
  }
  _0x7a8681[_0x296605(620)] = {id: _0x5de6a2.id, description: _0x5de6a2[_0x296605(650)], votes: _0x5de6a2.votes, completed: false, condition: _0x5de6a2[_0x296605(765)]}, console[_0x296605(670)](_0x296605(454) + _0x5c388b + _0x296605(803) + _0x7a8681.name + ":", _0x5de6a2[_0x296605(650)]), speak("Mission secrète attribuée à " + _0x7a8681[_0x296605(666)] + ":"), publishGlobalEvent(_0x296605(623), _0x296605(635) + _0x5c388b + _0x296605(954)), updateUI();
}
function checkSecretMission(_0x39625e) {
  const _0x3bb9e0 = getString;
  if (!_0x39625e.secretMission || _0x39625e[_0x3bb9e0(620)][_0x3bb9e0(477)]) return;
  _0x39625e[_0x3bb9e0(620)][_0x3bb9e0(765)](_0x39625e) && (_0x39625e[_0x3bb9e0(620)].completed = true, !_0x39625e.completedMissions && (_0x39625e[_0x3bb9e0(760)] = []), _0x39625e[_0x3bb9e0(760)][_0x3bb9e0(948)]({id: _0x39625e.secretMission.id, description: _0x39625e[_0x3bb9e0(620)][_0x3bb9e0(650)], votes: _0x39625e.secretMission[_0x3bb9e0(644)]}), turnSummary[_0x3bb9e0(646)].push({id: _0x39625e[_0x3bb9e0(620)].id, description: _0x39625e[_0x3bb9e0(620)].description, votes: _0x39625e[_0x3bb9e0(620)][_0x3bb9e0(644)]}), addVotes(_0x39625e, _0x39625e[_0x3bb9e0(620)].votes, "Mission secrète accomplie : " + _0x39625e[_0x3bb9e0(620)][_0x3bb9e0(650)]), console[_0x3bb9e0(670)](_0x39625e[_0x3bb9e0(666)] + _0x3bb9e0(688)), publishGlobalEvent(_0x3bb9e0(623), _0x3bb9e0(936) + _0x39625e[_0x3bb9e0(620)].id + _0x3bb9e0(655) + _0x39625e[_0x3bb9e0(620)][_0x3bb9e0(644)] + _0x3bb9e0(896)), _0x39625e.secretMission = null, updateUI());
}
function checkFruitsCollected(_0x312d4a, _0x15bb26) {
  const _0x43c8e4 = getString;
  let _0x59f2d5 = [];
  _0x312d4a[_0x43c8e4(731)] && _0x312d4a[_0x43c8e4(731)][_0x43c8e4(561)] === _0x43c8e4(766) && _0x59f2d5.push(_0x312d4a.leftHand.icon);
  _0x312d4a.rightHand && _0x312d4a.rightHand[_0x43c8e4(561)] === "fruit" && _0x59f2d5[_0x43c8e4(948)](_0x312d4a[_0x43c8e4(470)][_0x43c8e4(937)]);
  _0x312d4a.backpack[_0x43c8e4(849)](_0x326d58 => {
    const _0x49a70a = _0x43c8e4;
    _0x326d58 && _0x326d58[_0x49a70a(561)] === "fruit" && _0x59f2d5[_0x49a70a(948)](_0x326d58[_0x49a70a(937)]);
  });
  let _0x21b059 = new Set(_0x59f2d5);
  return _0x21b059.size >= _0x15bb26;
}
function checkMove3WithoutBite3Times(_0x3e7de9) {
  const _0x42d7e8 = getString;
  let _0x13e683 = _0x3e7de9.actions[_0x42d7e8(540)](_0x22f340 => _0x22f340[_0x42d7e8(561)] === "move" && _0x22f340[_0x42d7e8(544)] === 3);
  if (_0x13e683[_0x42d7e8(450)] < 3) return false;
  let _0x283420 = _0x13e683[_0x42d7e8(564)](-3);
  for (let _0x56d83f = 0; _0x56d83f < _0x283420.length; _0x56d83f++) {
    let _0x56fea2 = _0x283420[_0x56d83f];
    if (_0x56fea2[_0x42d7e8(959)] && _0x56fea2[_0x42d7e8(959)] > 0) return false;
  }
  return true;
}
function checkGiftGiven(_0x1a06e9) {
  const _0x209c63 = getString;
  return _0x1a06e9[_0x209c63(490)][_0x209c63(790)](_0x27c181 => _0x27c181.type === "don");
}
function checkHunt2Animals(_0x37b380) {
  const _0x2ceb7d = getString;
  return _0x37b380[_0x2ceb7d(490)][_0x2ceb7d(540)](_0x1d96fd => _0x1d96fd[_0x2ceb7d(561)] === "chasse")[_0x2ceb7d(450)] >= 2;
}
function checkTotemFound(_0x55ca0f) {
  const _0x123e7a = getString;
  let _0xfb0a40 = _0x55ca0f[_0x123e7a(490)][_0x123e7a(540)](_0x3d737d => _0x3d737d[_0x123e7a(561)] === _0x123e7a(692) || _0x3d737d.type === "fouille_auto")[_0x123e7a(547)](_0x911812 => _0x911812[_0x123e7a(626)]);
  return _0xfb0a40.some(_0x1045dc => _0x1045dc.name === _0x123e7a(727));
}
function checkSurvive3Bites(_0x439149) {
  const _0x443000 = getString;
  // FIX: Vérifier turnStartBites (morsures dans le même tour) au lieu de woundCards (total)
  return _0x439149[_0x443000(710)] >= 3;
}
function checkTwoTorches(_0xca8fc3) {
  const _0x1f3068 = getString;
  return _0xca8fc3[_0x1f3068(731)] && _0xca8fc3.leftHand[_0x1f3068(666)] === _0x1f3068(832) && _0xca8fc3[_0x1f3068(470)] && _0xca8fc3[_0x1f3068(470)].name === _0x1f3068(832);
}
function getStringArray() {
  const _0x16c856 = ["</div>", "items", "13145004OlbByc", "gourde", "then", "bird-unit", '</strong><br><button onclick="location.reload()" style="background:var(--gold); color:black; padding:12px 25px; border:none; border-radius:10px; font-size:1rem; font-weight:bold; cursor:pointer; margin-top:15px;">REJOUER</button>', "replace", "durability", "fatigue", "a reçu la mission secrète #", " le plus proche se trouve en ", " fatigue", "status", "itemsUsed", "fish-unit", "player-qr-status", "overlay", "AVANT DEPLACEMENT - Crocos:", "votes", "41916EDuWqi", "missionsCompleted", " est vide !", "var(--gold)", "Morsure pendant le déplacement !", "description", "diamant", "#e67e22", "Firebase initialisé - Session:", "cell", " ! (+", '<button onclick="closeBite()" style="background:var(--red); color:white; width:100%; padding:12px; border:none; border-radius:10px;">OK</button>', "soin", " morsure", "QR Code invalide !", "items-found", "ORAGE - Déplacements réduits de 1 case", "Erreur création profil:", "btn-gift", "Timeout", "black", "name", "abs", ")</span>", '\n                <div style="background:rgba(255,255,255,0.1); padding:10px; margin:5px 0; border-radius:8px; display:flex; align-items:center; justify-content:space-between;">\n                    <div style="display:flex; align-items:center; gap:10px;">\n                        <span style="font-size:1.5rem;">', "log", "2555356mfjrQt", "totem-scan-btn", "btn-scan-player", "MORSURE !", "fatigueCards", "white", " : ", "outerHTML", "summary-items-content", "): ", "stringify", "Sélectionnez l'objet à rechercher", "public-help-confirm-box", "Clics enregistrés pour ", "Canicule", "grid", "Joueur personnel ajouté:", " a accompli sa mission secrète !", "à l'instant", "public-help-result-box", ", y:", "fouille", "Mission introuvable !", "fatigueAdded", "INIT - Crocos:", "bite-box", "totem_scan", "move-confirm-box", "display", "discovered", "var(--red)", "p-name", "background", '🦅<div class="bird-num">', "source", "consumable-items", "INIT - Poissons:", "croco", ", vous avez consommé tout votre temps.", "turnStartBites", "L'objet <strong>", "lilocroco_session_id", "Trouver un totem", "#e74c3c", " régénéré sur ", ") !", '<strong style="color:var(--gold); font-size:1.1rem;">🎉 VAINQUEUR : ', "clear", "players/", "substring", "cell cell-hidden", "Donner un objet à un autre joueur", "size", "turn-summary-box", "p-fatigue", " votes : ", "totem", "playerName", "player-color-1", "6774SCYMba", "leftHand", "add-player-box", "findIndex", "initializeApp", " ! Ajoutez ", "selected", "Joueurs finaux:", '<div class="summary-item positive"><span class="summary-icon">', " en cours.", "cssText", "reverse", "qr-button", "getElementById", "Objets du joueur ", "Pluie fine. Les bananiers donnent plus de fruits.", "CANICULE - Cocotiers +1 stock - Déplacements +1 fatigue (sauf pour les aventuriers qui possèdent une gourde)", "AVANT DEPLACEMENT - Oiseaux:", "1:107264960465:web:710524e1336fbf95b2a2f0", "Vous allez vous déplacer en ", "start-overlay", "left", " Fatigue</span></div>", "every", "Création profil local (mode hors ligne)", "Vous avez pêché un poisson ! Vous vous nourrissez et retirez ", "Attention, canicule ! Les cocotiers donnent plus de fruits mais attention à la fatigue. Sauf pour ceux qui ont une gourde.", " réapparu en (", "Vous vous reposez. -1 Fatigue.", "itemsDropped", "completedMissions", "public-help-item-icon", "ROUGE", "path", "timeRemaining", "condition", "fruit", "📢 AIDE DU PUBLIC", "rest-box", "fatigueRemoved", "now", "Avoir une torche dans chaque main", "FOUILLE", "🥭 Mangue régénérée en (", "ref", '<div class="summary-item negative"><span class="summary-icon">🩸</span><span>+', "summary-cards-content", " Blessure</span></div>", "BLEU", "Sélectionnez l'objet à scanner sur la zone", "events-list", "onclick", "item-card", "p-wound", "player-btn player-btn-generic ", "Morsure ! Ajoutez une blessure.", '<span class="cell-coord">', "oldY", '🐊<div class="croco-num">', "#f1c40f", "some", "ATTENTION !", "Votre torche vous protège des crocodiles sur le chemin !", "Erreur publication:", "Vous étiez caché, le crocodile ne vous a pas vu !", "Mode hors ligne activé.", "btn-public-help", "name-input-box", "stock", "INIT - Détail objets:", "val", "Vous avez chassé un oiseau ! Vous vous nourrissez.", "Un petit coup de boost. Défaussez 2 fatigues.", " attribuée à ", "10381NcztrS", "right", "sort", "votesGained", "player-name-input", "a trouvé un totem ! 🗿", "aide_public", "========== DÉBUT TOUR ==========", "Vous redémarrez l'aventure avec ", "QR Code invalide ! (identifiant vide)", "Déplacement de 3 cases !", "totem-items-grid", "Scanner totem activé ! Recherche de ", "#2ecc71", "Les bottes de ", "timeOut", "Chers téléspectateurs, installez-vous ! Le spectacle va commencer !", "🗿 SCANNER TOTEM", '<div class="summary-empty">Aucune mission accomplie</div>', "global/events", "Vous avez déjà fouillé avec votre pioche !", "map", "woundCards", "splice", "pioche", "lilocroco-b4bd5.firebasestorage.app", "a trouvé un diamant ! 💎 (+200 votes)", "summary-votes-content", "torche", '<div class="summary-item neutral"><span class="summary-icon">', "Vous vous reposez mais vous n'avez pas de fatigue.", "summary-time-remaining", " morsures", "back0", "btn-fatigue", "Vous avez déjà une mission secrète en cours !", " <strong>", "weather-text", '<span class="pion">', "Vous avez trouvé un diamant ! Vous gagnez 200 votes !", " ramassé(e)</span></div>", 'input[name="gameDuration"]:checked', "weather", "QR Code invalide ! (doit être entre 1 et 100)", "1524NvOaTy", "forEach", "Erreur démarrage caméra:", "397023ZWpCgv", '<span style="color:', " (x:", "none", "Erreur Firebase:", " : ajoutez ", "a utilisé le scanner totem pour trouver ", "sync-indicator", "mangue", "Météo publiée:", " votes ! Félicitations !", "move-confirm-text", " sont usées !", "Découverte d'un totem !", "found", "game_", " votes.", "</span>", "shift", "substr", "DEMANDER AU PUBLIC", "Positionnez le QR Code devant la caméra", "has", "Firebase non disponible, création profil local", "backpack", "padStart", "ÉVACUATION !", "745115XPtEmc", " régénéré dans zone ", "querySelector", "APRES DEPLACEMENT - Crocos:", '\n                    <div style="display: flex; gap: 10px; width: 100%;">\n                        <button onclick="cancelCloseLoot()" style="background:#27ae60; color:white; flex:1; padding:12px; border:none; border-radius:10px; font-weight:bold;">ANNULER</button>\n                        <button onclick="confirmCloseLoot()" style="background:#e67e22; color:white; flex:1; padding:12px; border:none; border-radius:10px; font-weight:bold;">OK</button>\n                    </div>\n                ', "max", '<div class="summary-item positive"><span class="summary-icon">💚</span><span>-', "Oiseau ", "Sélectionnez votre cible.", "block", "loot-box", '<p style="color: #999;">Cliquez sur l\'objet à donner</p>', "INIT - Mangues (cachées):", "p-votes", "bottes", "https://lilocroco-b4bd5-default-rtdb.europe-west1.firebasedatabase.app", "La gourde de ", '<div class="summary-item positive"><span class="summary-icon">🎯</span><span>Mission #', " votes) ⭐", "Récupérer 3 fruits différents", "inv-right", "cache", 'QR Code invalide ! (doit commencer par "lilo" et finir par "croco")', "className", '<div class="summary-empty">Aucun changement</div>', "INIT - Objets cachés:", "stop", "Banane", '<div class="summary-empty">Aucun vote gagné</div>', "INIT - Oiseaux:", "donné", "BEAU TEMPS - Tout va bien !", "107264960465", "rate", "Bienvenue ", "FÉLICITATIONS !", "get", " à votre défausse.", "SCANNER LA ZONE", "trim", 'Au tour de <span style="color:', "qr-reader", "Totem activé ! Sélectionnez un objet à scanner.", "lilo", "</span> : ", "Se cacher 3 tours de suite", "Nouveau profil, demande du nom", "includes", "btn-generic-player", "🏆 CLASSEMENT FINAL", "🌧️", "parse", "cocotier", "querySelectorAll", "Poisson ", "bird", "Vous n'avez rien pris ! Voulez-vous vraiment terminer la fouille ?", "createElement", "a accompli sa mission secrète #", "icon", "FIN DE CYCLE - Déplacement des crocos, poissons et oiseaux", "</span><span>", "Vous avez pêché un poisson ! Vous vous nourrissez.", "Utilisation du scanner totem !", "arc", "ZONE VOLCAN !", "Vous avez chassé un oiseau ! Vous vous nourrissez et retirez ", "#3498db", "Fouille hors arbres avec découverte !", "don", "push", "base-", "a survécu à ", "inv-back2", "toString", "0.3", " ! 🎯", "active", "value", "Découverte d'un diamant !", "Orage", "bites", '</span>\n                    </div>\n                    <div style="font-size:1.2rem; font-weight:bold; color:', "Météo globale reçue:", ".item-card", "Vous vous soignez. Retirez 2 blessures et 1 fatigue.", "warn", " en (", "cell-huntable", "Morsure : +1 Blessure", "Objet placé dans main gauche:", "rest", "innerText", "global/weather", ".inv-slot", "menu-actions", "appendChild", ") - Zone ", "Temps écoulé pour ", "length", "player-qr-scanner-modal", " accomplie ! (+", "environment", "Mission ", "p-header", "</span></div>", "itemsCollected", "crocos", "next-player-icon", "summary-total-votes", "back", "woundRemoved", "qr-status", "lastActionClicks", "lilocroco-b4bd5", "Se déplacer de 3 cases sans morsure 3 fois de suite", " ! 🗿", '<p style="color: #999; font-size: 0.85rem; margin: 10px 0;">Aucun objet consommable</p>', "📷 SCAN PERSO ", "rightHand", "color", "floor", '<div class="summary-item negative"><span class="summary-icon">', "caché", ';">JOUEUR ', "Vous êtes évacué de l'île, votre état est trop dangereux.", "completed", "remove", "background:#27ae60; color:white; width:100%; padding:10px; border:none; border-radius:8px; font-weight:bold; cursor:pointer; font-size:0.85rem; display:flex; align-items:center; gap:8px;", "random", "wound", "Le direct démarre ! Crocodiles, épreuves et votes vous attendent sur l'île !", "classList", " votes)</span></div>", " cassé(e)</span></div>", "min", "APRES DEPLACEMENT - Oiseaux:", "Mangue", "</strong>", "actions", 
  "from", "Lilocroco TV est en direct ! Qui survivra aux dangers de l'île mystérieuse ?", "bite", "Attention, nous sommes en direct ! L'île, les crocos et la gloire vous attendent !", "dist", "Repos complet au camp !", "Beau temps", "message", " | ", ".totem-item-card", "cancel", "Votre ", "Beau temps, profitez-en !", "disabled", "   Fatigue. +1 Fatigue.", "1 morsure", "640QvUoVN", "Profil créé pour ", "#666", "fouille_auto", "div", "bananier", "itemsBroken", "JOUEUR ", "qr-scanner-modal", "Repos au camp ! Toutes les fatigues (", "cell-volcano", "find", "Objet donné au joueur ", "TOUS LES JOUEURS:", "Vous redémarrez l'aventure à 0.", "player-qr-reader", "index", "back2", "startsWith", "pitch", "totem-scanner-box", "JAUNE", "error", "item", "VERT", "Profil créé dans Firebase:", "Évacuation ! Vous êtes évacué de l'île.", "catch", "speechSynthesis", "8344VkZhXo", "Vous vous cachez. Vous êtes protégé des crocodiles au prochain tour.", "getItem", "inv-left", "filter", "zone", "player-color-2", "set", "distance", "Votre torche effraie le crocodile ! Vous êtes protégé.", "player-color-0", "flatMap", ' <span style="opacity:0.7;">(', "timestamp", "deck-menu", " avec ", "player-change-box", "Noix", "Joueur ", "visible", "👨‍🦰", "lilocroco-b4bd5.firebaseapp.com", "Subir 3 morsures dans le même tour", "Vous n'avez pas assez de votes pour l'aide du public !", "move", "type", "woundAdded", '</span>\n                        <span style="font-size:1.2rem;">', "slice", "ANNULER", 'div[style*="display: flex"]', "cell-reachable-volcano", "add", "reduce", "Trousse de soin", "btn-wound", '<p style="color: #999;">Rien trouvé</p>', "totem-item-card", "flex", "btn-search", "Objet placé dans main droite:", ';">', "INIT - Emplacements des TOTEMS 🗿:", "start", "button", "Votre pioche vous permet de fouiller automatiquement !", "Aucun objet de ce type n'a été trouvé sur l'île.", "Erreur: Impossible d'accéder à la caméra", " posé(e)</span></div>", "Félicitations ! Vous avez trouvé un diamant ! 200 votes du public !", "next-player-text", "Atteindre le camp adverse", '<span class="mission-badge">🎯 ', "Le public vous indique que l'objet ", "picto", "maxDurability", "DONNER UN OBJET", "Vous êtes sur la zone du volcan ! +1 Blessure", "canne", "Veuillez entrer un nom", "exists", "Orage ! Vos déplacements sont réduits.", "seen", "inv-back1", "fish", '⏱️ <span style="color:', "inv-back0", "Erreur arrêt caméra:", "diamond", "repos", "CONTINUER", "player-selection-overlay", "trousse", " gagne ", "⚠️ Danger ! Vous êtes sur la zone du volcan ! Vous prenez une blessure.", "Totem non ramassé, remis à disponible en (", "style", " est cassée !", "205GAeWtc", "Sélectionnez un joueur adjacent pour lui donner un objet.", "actionType", "innerHTML", "🌡️☀️", "croco-unit", "secretMission", "back1", "AIzaSyBmoFwx1ezeXVnTbb4C9Ea142GHzIuzG30", "mission", "totem-ok-btn"];
  getStringArray = function () {
    return _0x16c856;
  };
  return getStringArray();
}
function checkCollect5Items(_0x26dd32) {
  const _0x5ba1b1 = getString;
  let _0x3fd504 = [];
  _0x26dd32[_0x5ba1b1(731)] && _0x26dd32[_0x5ba1b1(731)][_0x5ba1b1(666)] && _0x3fd504[_0x5ba1b1(948)](_0x26dd32[_0x5ba1b1(731)][_0x5ba1b1(666)]);
  _0x26dd32[_0x5ba1b1(470)] && _0x26dd32[_0x5ba1b1(470)][_0x5ba1b1(666)] && _0x3fd504[_0x5ba1b1(948)](_0x26dd32[_0x5ba1b1(470)].name);
  _0x26dd32.backpack.forEach(_0x32c6ee => {
    const _0x4c9f4a = _0x5ba1b1;
    _0x32c6ee && _0x32c6ee[_0x4c9f4a(666)] && _0x3fd504[_0x4c9f4a(948)](_0x32c6ee[_0x4c9f4a(666)]);
  });
  let _0x3c7eb4 = new Set(_0x3fd504);
  return _0x3c7eb4[_0x5ba1b1(723)] >= 5;
}
function checkReachEnemyCamp(_0x537709) {
  let _0x426859 = getBaseOwner(_0x537709.x, _0x537709.y);
  return _0x426859 !== null && _0x426859 !== _0x537709.id;
}
function recordActionClick(_0x22d73f) {
  const _0x1dd1ec = getString;
  let _0x3b87af = players[currentPlayer];
  _0x3b87af.lastActionClicks[_0x1dd1ec(948)]({actionType: _0x22d73f, turnNumber: _0x3b87af[_0x1dd1ec(490)][_0x1dd1ec(540)](_0x3de25d => _0x3de25d[_0x1dd1ec(561)] === _0x1dd1ec(560))[_0x1dd1ec(450)] + 1}), _0x3b87af[_0x1dd1ec(464)].length > 3 && _0x3b87af.lastActionClicks[_0x1dd1ec(869)](), console[_0x1dd1ec(670)](_0x1dd1ec(684) + _0x3b87af[_0x1dd1ec(666)] + ":", _0x3b87af[_0x1dd1ec(464)]);
}
function check3ConsecutiveHideClicks() {
  const _0x49c118 = getString;
  let _0x518589 = players[currentPlayer];
  if (_0x518589.lastActionClicks[_0x49c118(450)] < 3) return false;
  let _0x2b152b = _0x518589[_0x49c118(464)][_0x49c118(564)](-3);
  return _0x2b152b[_0x49c118(753)](_0x1206e => _0x1206e[_0x49c118(616)] === _0x49c118(899));
}
function respawnFruit(_0x2c30c9, _0x1357e8) {
  const _0xa6404 = getString;
  let _0x356220 = scenery.filter(_0x11070e => _0x11070e[_0xa6404(561)] === _0x2c30c9);
  if (_0x356220[_0xa6404(450)] === 0) return;
  let _0x401610 = _0x356220[Math[_0xa6404(472)](Math[_0xa6404(480)]() * _0x356220.length)];
  _0x401610[_0xa6404(798)]++, console[_0xa6404(670)](_0x1357e8 + _0xa6404(715) + _0x2c30c9 + " en (" + _0x401610.x + ", " + _0x401610.y + ")");
}
function respawnMangue() {
  const _0x3572d5 = getString;
  let _0x231600 = mangues[_0x3572d5(540)](_0x137359 => _0x137359[_0x3572d5(865)]);
  if (_0x231600[_0x3572d5(450)] === 0) return;
  let _0x1dd6e0 = _0x231600[Math[_0x3572d5(472)](Math[_0x3572d5(480)]() * _0x231600[_0x3572d5(450)])];
  _0x1dd6e0[_0x3572d5(865)] = false, console[_0x3572d5(670)](_0x3572d5(773) + _0x1dd6e0.x + ", " + _0x1dd6e0.y + ")");
}
function decodeString(_0x338af5, _0x1ef368) {
  _0x338af5 = _0x338af5 - 436;
  const _0x28d165 = getStringArray();
  let _0x5756a5 = _0x28d165[_0x338af5];
  return _0x5756a5;
}
function handleDiamondFound(_0x23a6ce) {
  const _0x252e6c = getString;
  let _0x469d76 = turnSummary[_0x252e6c(457)][_0x252e6c(790)](_0x2379e2 => _0x2379e2[_0x252e6c(937)] === "💎" && _0x2379e2[_0x252e6c(666)] === _0x252e6c(651));
  !_0x469d76 && turnSummary[_0x252e6c(457)][_0x252e6c(948)]({icon: "💎", name: _0x252e6c(651)});
  addVotes(_0x23a6ce, 200, "Découverte d'un diamant !");
  let _0x906901 = document[_0x252e6c(743)](_0x252e6c(696));
  _0x906901.querySelector("h3")[_0x252e6c(443)] = _0x252e6c(913), _0x906901[_0x252e6c(880)]("h3")[_0x252e6c(612)][_0x252e6c(471)] = _0x252e6c(648), _0x906901[_0x252e6c(880)](_0x252e6c(511))[_0x252e6c(443)] = "💎", _0x906901[_0x252e6c(880)]("p")[_0x252e6c(443)] = _0x252e6c(843);
  let _0x23eae3 = _0x906901.querySelector(_0x252e6c(580));
  _0x23eae3 && (_0x23eae3.innerText = _0x252e6c(606), _0x23eae3[_0x252e6c(612)][_0x252e6c(703)] = _0x252e6c(648), _0x23eae3.style[_0x252e6c(471)] = _0x252e6c(665), _0x23eae3.onclick = closeDiamondPopup), document[_0x252e6c(743)]("overlay")[_0x252e6c(612)][_0x252e6c(699)] = _0x252e6c(887), _0x906901.style[_0x252e6c(699)] = _0x252e6c(887), speak(_0x252e6c(585)), publishGlobalEvent(_0x252e6c(604), _0x252e6c(830));
}
function closeDiamondPopup() {
  const _0x448ea1 = getString;
  document.getElementById(_0x448ea1(696)).style.display = _0x448ea1(854), document.getElementById(_0x448ea1(642))[_0x448ea1(612)][_0x448ea1(699)] = _0x448ea1(854);
  let _0x3fcb42 = document[_0x448ea1(743)]("bite-box"), _0x41549d = _0x3fcb42.querySelector("button");
  _0x41549d && (_0x41549d[_0x448ea1(443)] = "OK", _0x41549d[_0x448ea1(612)][_0x448ea1(703)] = "var(--red)", _0x41549d[_0x448ea1(612)].color = _0x448ea1(676), _0x41549d[_0x448ea1(781)] = closeBite), _0x3fcb42[_0x448ea1(880)]("h3").innerText = "MORSURE !", _0x3fcb42.querySelector("h3")[_0x448ea1(612)][_0x448ea1(471)] = _0x448ea1(701), _0x3fcb42[_0x448ea1(880)](_0x448ea1(511)).innerText = "🐊", _0x3fcb42.querySelector("p")[_0x448ea1(443)] = _0x448ea1(440), endTurnLog(), prepareEndTurn();
}
function respawnItem(_0x1f6990) {
  const _0x4c110e = getString;
  let _0x4fb9f1 = hiddenItems[_0x4c110e(540)](_0x5295df => _0x5295df[_0x4c110e(530)][_0x4c110e(666)] === _0x1f6990 && _0x5295df[_0x4c110e(865)]);
  if (_0x4fb9f1[_0x4c110e(450)] === 0) return;
  let _0x118613 = _0x4fb9f1[Math[_0x4c110e(472)](Math[_0x4c110e(480)]() * _0x4fb9f1[_0x4c110e(450)])];
  const _0x2bde8c = [{x1: 1, x2: 8, y1: 1, y2: 6}, {x1: 9, x2: 16, y1: 1, y2: 6}, {x1: 1, x2: 8, y1: 7, y2: 12}, {x1: 9, x2: 16, y1: 7, y2: 12}];
  let _0x2167bc = _0x2bde8c[_0x118613[_0x4c110e(541)]], _0x1e4539 = false, _0x791053 = 0;
  while (!_0x1e4539 && _0x791053 < 100) {
    let _0x78d7da = Math[_0x4c110e(472)](Math.random() * (_0x2167bc.x2 - _0x2167bc.x1 + 1)) + _0x2167bc.x1, _0x20f275 = Math[_0x4c110e(472)](Math[_0x4c110e(480)]() * (_0x2167bc.y2 - _0x2167bc.y1 + 1)) + _0x2167bc.y1;
    if (getBaseOwner(_0x78d7da, _0x20f275) === null && !(_0x78d7da === 0 || _0x78d7da === 17 || _0x20f275 === 0 || _0x20f275 === 13) && !(_0x78d7da >= 7 && _0x78d7da <= 10 && _0x20f275 >= 5 && _0x20f275 <= 8)) {
      _0x118613.x = _0x78d7da, _0x118613.y = _0x20f275, _0x118613[_0x4c110e(865)] = false, _0x118613[_0x4c110e(700)] = false;
      let _0x13badb = ITEMS[_0x4c110e(518)](_0xcc0f25 => _0xcc0f25[_0x4c110e(666)] === _0x1f6990);
      _0x13badb && (_0x118613[_0x4c110e(530)] = createItem(_0x13badb)), _0x1e4539 = true, console[_0x4c110e(670)](_0x118613[_0x4c110e(530)].icon + " " + _0x1f6990 + _0x4c110e(879) + _0x118613[_0x4c110e(541)] + _0x4c110e(438) + _0x78d7da + ", " + _0x20f275 + ")");
    }
    _0x791053++;
  }
  if (!_0x1e4539) {
    _0x118613[_0x4c110e(865)] = false, _0x118613.discovered = false;
    let _0x29d1ec = ITEMS[_0x4c110e(518)](_0x27c46e => _0x27c46e[_0x4c110e(666)] === _0x1f6990);
    _0x29d1ec && (_0x118613[_0x4c110e(530)] = createItem(_0x29d1ec)), console[_0x4c110e(670)](_0x118613[_0x4c110e(530)][_0x4c110e(937)] + " " + _0x1f6990 + " régénéré à l'ancienne position (" + _0x118613.x + ", " + _0x118613.y + ")");
  }
}



// ========== CHRONO GLOBAL ==========

function startGlobalTimer() {
  globalTimeRemaining = globalGameDuration * 60;
  gameStartTime = Date.now();
  globalTimerInterval = setInterval(updateGlobalTimer, 1000);
  updateGlobalTimerDisplay();
  console.log('Chrono global dÃ©marrÃ©: ' + globalGameDuration + ' minutes');
}

function updateGlobalTimer() {
  if (globalTimeRemaining > 0) {
    globalTimeRemaining--;
    updateGlobalTimerDisplay();
    
    if (globalTimeRemaining === 60) {
      speak('Attention ! Il reste 1 minute !');
    }
    
    if (globalTimeRemaining === 0) {
      gameTimeExpired = true;
      clearInterval(globalTimerInterval);
      speak('Temps Ã©coulÃ© ! Fin de la partie aprÃ¨s ce tour.');
    }
  }
}

function updateGlobalTimerDisplay() {
  const minutes = Math.floor(globalTimeRemaining / 60);
  const seconds = globalTimeRemaining % 60;
  const timeString = minutes + ':' + seconds.toString().padStart(2, '0');
  
  // Mettre Ã  jour le bandeau mÃ©tÃ©o avec le temps
  const weatherBanner = document.getElementById('weather-banner');
  const weatherText = document.getElementById('weather-text');
  
  if (weatherText) {
    // Stocker le texte mÃ©tÃ©o original si pas encore fait
    if (!weatherBanner.dataset.originalWeather) {
      weatherBanner.dataset.originalWeather = weatherText.textContent.trim();
    }
    
    const originalWeather = weatherBanner.dataset.originalWeather;
    let timeColor = '#ffffff';
    let timeIcon = '⏱️';
    
    if (globalTimeRemaining < 60) {
      timeColor = '#ff0000';
      timeIcon = '⚠️';
    } else if (globalTimeRemaining < 120) {
      timeColor = '#ff9900';
    }
    
    weatherText.innerHTML = originalWeather + ' <span style="color: ' + timeColor + '; font-weight: bold; margin-left: 20px;">' + timeIcon + ' ' + timeString + '</span>';
  }
}

function endGame() {
  gameEnded = true;
  stopGlobalTimer();
  showFinalRanking();
  speak('Temps Ã©coulÃ© ! Fin de la partie !');
}

function showFinalRanking() {
  const sortedPlayers = players.slice().sort((a, b) => b.votes - a.votes);
  
  let rankingHTML = '<h2 style="color: var(--gold); font-size: 2rem; margin-bottom: 20px;">ðŸ† CLASSEMENT FINAL</h2>';
  rankingHTML += '<div style="margin: 20px 0;">';
  
  sortedPlayers.forEach((player, index) => {
    const medal = index === 0 ? 'ðŸ¥‡' : index === 1 ? 'ðŸ¥ˆ' : index === 2 ? 'ðŸ¥‰' : (index + 1) + '.';
    const color = index === 0 ? 'var(--gold)' : index === 1 ? '#C0C0C0' : index === 2 ? '#CD7F32' : 'white';
    
    rankingHTML += '<div style="background: rgba(255,255,255,0.1); padding: 15px; margin: 10px 0; border-radius: 10px; display: flex; justify-content: space-between; align-items: center; border-left: 5px solid ' + color + ';">';
    rankingHTML += '<span style="font-size: 1.5rem;">' + medal + '</span>';
    rankingHTML += '<span style="font-size: 1.3rem; font-weight: bold;">' + player.name + '</span>';
    rankingHTML += '<span style="font-size: 1.5rem; color: ' + color + ';">' + player.votes + ' votes</span>';
    rankingHTML += '</div>';
  });
  
  rankingHTML += '</div>';
  rankingHTML += '<button onclick="location.reload()" style="background:var(--gold); color:black; padding:15px 30px; border:none; border-radius:10px; font-size:1.2rem; font-weight:bold; cursor:pointer; margin-top: 20px;">REJOUER</button>';
  
  const popup = document.getElementById('bite-box');
  if (popup) {
    popup.querySelector('h3').innerHTML = 'ðŸ† FIN DE LA PARTIE';
    popup.querySelector('h3').style.color = 'var(--gold)';
    const contentDiv = popup.querySelector('div');
    if (contentDiv) {
      contentDiv.innerHTML = rankingHTML;
    }
    const pElement = popup.querySelector('p');
    if (pElement) {
      pElement.style.display = 'none';
    }
    document.getElementById('overlay').style.display = 'block';
    popup.style.display = 'block';
  }
}

function createGlobalTimerDisplay() {
  // Le chrono est maintenant intÃ©grÃ© dans le bandeau mÃ©tÃ©o
  // Pas besoin de crÃ©er un Ã©lÃ©ment sÃ©parÃ©
  const style = document.createElement('style');
  style.textContent = '@keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0.3; } }';
  if (!document.getElementById('blink-animation-style')) {
    style.id = 'blink-animation-style';
    document.head.appendChild(style);
  }
}
// ========== GESTION INVENTAIRE / CONSOMMATION ==========

let selectedManageSlot = null;
let selectedConsumeItem = null;

function showInventoryManage() {
  const player = players[currentPlayer];
  
  // Afficher les emplacements d'inventaire
  document.getElementById('manage-inv-left').innerText = player.leftHand ? player.leftHand.icon : '';
  document.getElementById('manage-inv-right').innerText = player.rightHand ? player.rightHand.icon : '';
  document.getElementById('manage-inv-back0').innerText = player.backpack[0] ? player.backpack[0].icon : '';
  document.getElementById('manage-inv-back1').innerText = player.backpack[1] ? player.backpack[1].icon : '';
  document.getElementById('manage-inv-back2').innerText = player.backpack[2] ? player.backpack[2].icon : '';
  
  
  // Afficher Fatigue et Blessure
  document.getElementById('manage-total-fatigue').innerText = player.fatigueCards;
  document.getElementById('manage-total-wound').innerText = player.woundCards;
  // RÃ©initialiser les sÃ©lections
  selectedManageSlot = null;
  selectedConsumeItem = null;
  document.querySelectorAll('#inventory-manage-box .inv-slot').forEach(slot => slot.classList.remove('selected'));
  
  // Afficher les objets consommables
  updateManageConsumableItems();
  
  // Afficher la popup
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('inventory-manage-box').style.display = 'block';
}

function selectManageSlot(slotName) {
  const player = players[currentPlayer];
  const slotElement = document.getElementById('manage-inv-' + slotName);
  
  // VÃ©rifier si l'emplacement a un objet
  let hasItem = false;
  if (slotName === 'left') hasItem = player.leftHand !== null;
  else if (slotName === 'right') hasItem = player.rightHand !== null;
  else if (slotName === 'back0') hasItem = player.backpack[0] !== null;
  else if (slotName === 'back1') hasItem = player.backpack[1] !== null;
  else if (slotName === 'back2') hasItem = player.backpack[2] !== null;
  
  // Si aucun slot n'est sÃ©lectionnÃ©
  if (selectedManageSlot === null) {
    // Ne sÃ©lectionner que si l'emplacement a un objet
    if (!hasItem) return;
    selectedManageSlot = slotName;
    slotElement.classList.add('selected');
  }
  // Si on clique sur le mÃªme slot, le dÃ©sÃ©lectionner
  else if (selectedManageSlot === slotName) {
    selectedManageSlot = null;
    slotElement.classList.remove('selected');
  }
  // Si un autre slot est sÃ©lectionnÃ©, Ã©changer les objets
  else {
    swapInventorySlots(selectedManageSlot, slotName);
    document.querySelectorAll('#inventory-manage-box .inv-slot').forEach(slot => slot.classList.remove('selected'));
    selectedManageSlot = null;
    
    // RafraÃ®chir l'affichage
    showInventoryManage();
  }
}

function swapInventorySlots(slot1, slot2) {
  const player = players[currentPlayer];
  
  // RÃ©cupÃ©rer les objets
  let item1 = getItemFromSlot(player, slot1);
  let item2 = getItemFromSlot(player, slot2);
  
  // Ã‰changer
  setItemToSlot(player, slot1, item2);
  setItemToSlot(player, slot2, item1);
  
  console.log('Ã‰change: ' + slot1 + ' <-> ' + slot2);
}

function getItemFromSlot(player, slotName) {
  if (slotName === 'left') return player.leftHand;
  if (slotName === 'right') return player.rightHand;
  if (slotName === 'back0') return player.backpack[0];
  if (slotName === 'back1') return player.backpack[1];
  if (slotName === 'back2') return player.backpack[2];
  return null;
}

function setItemToSlot(player, slotName, item) {
  if (slotName === 'left') player.leftHand = item;
  else if (slotName === 'right') player.rightHand = item;
  else if (slotName === 'back0') player.backpack[0] = item;
  else if (slotName === 'back1') player.backpack[1] = item;
  else if (slotName === 'back2') player.backpack[2] = item;
}

function updateManageConsumableItems() {
  const player = players[currentPlayer];
  const container = document.getElementById('manage-consumable-items');
  container.innerHTML = '';
  
  // Collecter tous les objets consommables
  const consumables = [];
  const allItems = [player.leftHand, player.rightHand, ...player.backpack].filter(item => item !== null);
  
  allItems.forEach((item, index) => {
    if (isConsumableItem(item)) {
      consumables.push({item: item, index: index});
    }
  });
  
  if (consumables.length === 0) {
    container.innerHTML = '<p style="color: #999; font-size: 0.85rem; margin: 10px 0; text-align: center;">Aucun objet consommable</p>';
    return;
  }
  
  // Afficher les objets consommables
  consumables.forEach((consumable, idx) => {
    const itemDiv = document.createElement('div');
    itemDiv.style.cssText = 'background:#27ae60; color:white; width:100%; padding:10px; border:none; border-radius:8px; font-weight:bold; cursor:pointer; font-size:0.85rem; display:flex; align-items:center; gap:8px;';
    itemDiv.innerHTML = '<span style="font-size:1.5rem;">' + consumable.item.icon + '</span><span>' + consumable.item.name + '</span>';
    itemDiv.onclick = () => selectConsumeItem(idx, itemDiv);
    itemDiv.id = 'consume-item-' + idx;
    container.appendChild(itemDiv);
  });
}

function isConsumableItem(item) {
  if (!item) return false;
  const consumableNames = ['cocotier', 'bananier', 'mangue', 'trousse'];
  return consumableNames.some(name => item.name.toLowerCase().includes(name.toLowerCase()));
}

function selectConsumeItem(index, element) {
  // DÃ©sÃ©lectionner tous les autres
  document.querySelectorAll('#manage-consumable-items > div').forEach(div => {
    div.style.background = '#27ae60';
  });
  
  // Si on clique sur le mÃªme, le dÃ©sÃ©lectionner
  if (selectedConsumeItem === index) {
    selectedConsumeItem = null;
    element.style.background = '#27ae60';
  } else {
    // SÃ©lectionner celui-ci
    selectedConsumeItem = index;
    element.style.background = '#f39c12';
  }
}

function closeInventoryManage() {
  const player = players[currentPlayer];
  
  // Si un objet consommable est sÃ©lectionnÃ©, l'utiliser
  if (selectedConsumeItem !== null) {
    const allItems = [player.leftHand, player.rightHand, ...player.backpack].filter(item => item !== null);
    const consumables = allItems.filter(item => isConsumableItem(item));
    const itemToConsume = consumables[selectedConsumeItem];
    
    if (itemToConsume) {
      consumeItem(player, itemToConsume);
    }
  }
  
  // Fermer la popup
  document.getElementById('inventory-manage-box').style.display = 'none';
  
  // Passer au rÃ©capitulatif
  showTurnSummary();
}

function consumeItem(player, item) {
  const effects = getConsumableEffects(item);
  
  // Appliquer les effets
  if (effects.fatigue < 0) {
    const removed = Math.min(-effects.fatigue, player.fatigueCards);
    player.fatigueCards = Math.max(0, player.fatigueCards + effects.fatigue);
    turnSummary.fatigueRemoved += removed;
  }
  
  if (effects.wound < 0) {
    const removed = Math.min(-effects.wound, player.woundCards);
    player.woundCards = Math.max(0, player.woundCards + effects.wound);
    turnSummary.woundRemoved += removed;
  }
  
  // Retirer l'objet de l'inventaire
  removeItemFromInventory(player, item);
  turnSummary.itemsUsed.push({...item, action: 'consommée'});
  // Mettre Ã  jour l'affichage
  updateFatigueWoundDisplay(player);
  checkEvacuation(player);
  
  console.log('Consommation: ' + item.name + ' - Fatigue: ' + effects.fatigue + ', Blessure: ' + effects.wound);
}

function getConsumableEffects(item) {
  const name = item.name.toLowerCase();
  
  if (name.includes('trousse')) {
    return {fatigue: -1, wound: -2};
  } else if (name.includes('cocotier')) {
    return {fatigue: -1, wound: -1};
  } else if (name.includes('bananier')) {
    return {fatigue: -2, wound: 0};
  } else if (name.includes('mangue')) {
    return {fatigue: -1, wound: 0};
  }
  
  return {fatigue: 0, wound: 0};
}

function removeItemFromInventory(player, item) {
  if (player.leftHand === item) {
    player.leftHand = null;
  } else if (player.rightHand === item) {
    player.rightHand = null;
  } else {
    for (let i = 0; i < player.backpack.length; i++) {
      if (player.backpack[i] === item) {
        player.backpack[i] = null;
        break;
      }
    }
  }
}
