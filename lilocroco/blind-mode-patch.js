/**
 * PATCH MODE AVEUGLE - Jeu sans affichage de l'île
 * Les joueurs doivent se référer au plateau physique
 */

console.log('🎯 Chargement du patch mode aveugle...');

// Variables globales pour le mode aveugle
let blindMode = {
  active: false,
  selectedRow: null,
  selectedCol: null,
  availableRows: [],
  availableCols: [],
  lastSpokenMessage: '',
  lastSpeakTime: 0
};

// Fonction pour afficher les positions initiales des animaux (popup 1: Crocodiles)
function showInitialPositions() {
  console.log('📍 Affichage des positions initiales - Étape 1: Crocodiles...');
  showCrocodilesPositions();
}

// Popup 1: Crocodiles
function showCrocodilesPositions() {
  const container = document.createElement('div');
  container.id = 'crocodiles-positions-container';
  container.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 5000; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow-y: auto; padding: 20px;';
  
  // Titre principal
  const mainTitle = document.createElement('h2');
  mainTitle.style.cssText = 'color: var(--gold); font-size: 1.5rem; margin-bottom: 10px; text-align: center;';
  mainTitle.textContent = '📍 POSITIONS INITIALES';
  container.appendChild(mainTitle);
  
  // Sous-titre progression
  const progress = document.createElement('p');
  progress.style.cssText = 'color: #999; font-size: 0.9rem; margin-bottom: 30px; text-align: center;';
  progress.textContent = 'Étape 1/3';
  container.appendChild(progress);
  
  // Liste des crocodiles
  const crocosBox = createAnimalList('🐊 CROCODILES', crocos, 'croco');
  crocosBox.style.maxWidth = '500px';
  crocosBox.style.width = '100%';
  container.appendChild(crocosBox);
  
  // Bouton suivant
  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'SUIVANT →';
  nextBtn.style.cssText = 'background: var(--gold); color: black; padding: 15px 40px; border: none; border-radius: 50px; font-weight: bold; font-size: 1.2rem; cursor: pointer; margin-top: 30px; box-shadow: 0 4px 15px rgba(241, 196, 15, 0.5);';
  nextBtn.onclick = function() {
    document.body.removeChild(container);
    showFishesPositions();
  };
  container.appendChild(nextBtn);
  
  document.body.appendChild(container);
  
  if (typeof speak === 'function') {
    speak('Notez les positions des crocodiles sur le plateau !');
  }
}

// Popup 2: Poissons
function showFishesPositions() {
  console.log('📍 Affichage des positions initiales - Étape 2: Poissons...');
  
  const container = document.createElement('div');
  container.id = 'fishes-positions-container';
  container.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 5000; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow-y: auto; padding: 20px;';
  
  // Titre principal
  const mainTitle = document.createElement('h2');
  mainTitle.style.cssText = 'color: var(--gold); font-size: 1.5rem; margin-bottom: 10px; text-align: center;';
  mainTitle.textContent = '📍 POSITIONS INITIALES';
  container.appendChild(mainTitle);
  
  // Sous-titre progression
  const progress = document.createElement('p');
  progress.style.cssText = 'color: #999; font-size: 0.9rem; margin-bottom: 30px; text-align: center;';
  progress.textContent = 'Étape 2/3';
  container.appendChild(progress);
  
  // Liste des poissons
  const fishesBox = createAnimalList('🐟 POISSONS', fishes, 'fish');
  fishesBox.style.maxWidth = '500px';
  fishesBox.style.width = '100%';
  container.appendChild(fishesBox);
  
  // Bouton suivant
  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'SUIVANT →';
  nextBtn.style.cssText = 'background: var(--gold); color: black; padding: 15px 40px; border: none; border-radius: 50px; font-weight: bold; font-size: 1.2rem; cursor: pointer; margin-top: 30px; box-shadow: 0 4px 15px rgba(241, 196, 15, 0.5);';
  nextBtn.onclick = function() {
    document.body.removeChild(container);
    showBirdsPositions();
  };
  container.appendChild(nextBtn);
  
  document.body.appendChild(container);
  
  if (typeof speak === 'function') {
    speak('Notez les positions des poissons sur le plateau !');
  }
}

// Popup 3: Oiseaux
function showBirdsPositions() {
  console.log('📍 Affichage des positions initiales - Étape 3: Oiseaux...');
  
  const container = document.createElement('div');
  container.id = 'birds-positions-container';
  container.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 5000; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow-y: auto; padding: 20px;';
  
  // Titre principal
  const mainTitle = document.createElement('h2');
  mainTitle.style.cssText = 'color: var(--gold); font-size: 1.5rem; margin-bottom: 10px; text-align: center;';
  mainTitle.textContent = '📍 POSITIONS INITIALES';
  container.appendChild(mainTitle);
  
  // Sous-titre progression
  const progress = document.createElement('p');
  progress.style.cssText = 'color: #999; font-size: 0.9rem; margin-bottom: 30px; text-align: center;';
  progress.textContent = 'Étape 3/3';
  container.appendChild(progress);
  
  // Liste des oiseaux
  const birdsBox = createAnimalList('🦅 OISEAUX', birds, 'bird');
  birdsBox.style.maxWidth = '500px';
  birdsBox.style.width = '100%';
  container.appendChild(birdsBox);
  
  // Bouton continuer
  const continueBtn = document.createElement('button');
  continueBtn.textContent = 'COMMENCER LA PARTIE';
  continueBtn.style.cssText = 'background: var(--gold); color: black; padding: 15px 40px; border: none; border-radius: 50px; font-weight: bold; font-size: 1.2rem; cursor: pointer; margin-top: 30px; box-shadow: 0 4px 15px rgba(241, 196, 15, 0.5);';
  continueBtn.onclick = function() {
    console.log('👍 Bouton COMMENCER cliqué');
    document.body.removeChild(container);
    blindMode.active = true;
    console.log('✅ Mode aveugle activé:', blindMode.active);
    hideIsland();
    if (typeof speak === 'function') {
      speak('Positions notées ! Que l\'aventure commence !');
    }
    
    // Démarrer le premier tour
    console.log('🎮 Démarrage du premier tour...');
    if (typeof startTurn === 'function') {
      setTimeout(function() {
        startTurn();
      }, 500);
    } else {
      console.error('❌ Fonction startTurn non trouvée');
    }
  };
  container.appendChild(continueBtn);
  
  document.body.appendChild(container);
  
  if (typeof speak === 'function') {
    speak('Notez les positions des oiseaux sur le plateau !');
  }
}

// Fonction pour créer une liste d'animaux
function createAnimalList(title, animals, type) {
  const box = document.createElement('div');
  box.style.cssText = 'background: rgba(255,255,255,0.1); border: 2px solid var(--gold); border-radius: 15px; padding: 15px;';
  
  const titleEl = document.createElement('h3');
  titleEl.style.cssText = 'color: var(--gold); font-size: 1.2rem; margin: 0 0 15px 0; text-align: center;';
  titleEl.textContent = title;
  box.appendChild(titleEl);
  
  const list = document.createElement('div');
  list.style.cssText = 'display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; max-height: 60vh; overflow-y: auto;';
  
  animals.forEach(animal => {
    const item = document.createElement('div');
    item.style.cssText = 'background: rgba(0,0,0,0.3); padding: 8px; border-radius: 8px; font-size: 0.9rem; text-align: center; font-weight: bold;';
    
    const coord = getCoordinateLabel(animal.x, animal.y);
    item.textContent = type === 'croco' ? '🐊 ' + animal.id + ' : ' + coord :
                       type === 'fish' ? '🐟 ' + animal.id + ' : ' + coord :
                       '🦅 ' + animal.id + ' : ' + coord;
    
    list.appendChild(item);
  });
  
  box.appendChild(list);
  return box;
}

// Fonction pour obtenir le label de coordonnées (ex: A5)
function getCoordinateLabel(x, y) {
  const alphabet = 'ABCDEFGHIJKLMN';
  return alphabet[y] + "-" + x;
}

// Fonction pour masquer l'île
function hideIsland() {
  console.log('🙈 Masquage de l\'île...');
  
  const gridContainer = document.querySelector('.grid-container');
  if (gridContainer) {
    gridContainer.style.display = 'none';
    console.log('✅ Grid container masqué');
  } else {
    console.warn('⚠️ Grid container non trouvé');
  }
  
  // Masquer aussi le bandeau d'événements globaux si présent
  const globalEvents = document.getElementById('global-events');
  if (globalEvents) {
    globalEvents.style.display = 'none';
    console.log('✅ Global events masqué');
  }
}

// Fonction pour calculer toutes les cases atteignables
function getReachableCells(player, range) {
  const reachable = [];
  
  // Parcourir toutes les cases dans la portée
  for (let x = 1; x <= 16; x++) {
    for (let y = 1; y <= 12; y++) {
      const distance = getDistance(player.x, player.y, x, y);
      
      // Vérifier si la case est atteignable
      if (distance <= range && distance > 0) {
        // Vérifier qu'il n'y a pas d'autre joueur
        const otherPlayer = players.find(p => p.id !== player.id && p.x === x && p.y === y);
        if (!otherPlayer) {
          reachable.push({x: x, y: y, distance: distance});
        }
      }
    }
  }
  
  return reachable;
}

// Fonction pour afficher les boutons de sélection de ligne
function showRowSelection(availableRange) {
  console.log('📍 showRowSelection appelé - Range:', availableRange);
  console.log('📍 currentPlayer:', currentPlayer);
  console.log('📍 players:', players);
  
  const player = players[currentPlayer];
  console.log('📍 Position joueur:', player.x, player.y);
  
  const alphabet = 'ABCDEFGHIJKLMN';
  
  // Calculer toutes les cases atteignables
  const reachableCells = getReachableCells(player, availableRange);
  console.log('📍 Cases atteignables:', reachableCells.length, reachableCells);
  
  // Extraire les lignes uniques disponibles
  blindMode.availableRows = [...new Set(reachableCells.map(cell => cell.y))].sort((a, b) => a - b);
  console.log('📍 Lignes disponibles:', blindMode.availableRows);
  
  if (blindMode.availableRows.length === 0) {
    console.error('❌ ERREUR: Aucune ligne disponible !');
    alert('Erreur: Aucune case atteignable. Vérifiez la console.');
    return;
  }
  
  // Créer le conteneur
  console.log('📍 Création du conteneur de sélection...');
  const container = document.createElement('div');
  container.id = 'row-selection-container';
  container.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; color: black; padding: 30px; border-radius: 20px; z-index: 200; width: 90%; max-width: 400px; text-align: center;';
  
  // Titre
  const title = document.createElement('h3');
  title.style.cssText = 'color: #f1c40f; margin: 0 0 15px 0; font-size: 1.3rem;';
  title.textContent = '🎯 CHOISISSEZ UNE LIGNE';
  container.appendChild(title);
  console.log('📍 Titre ajouté');
  
  // Infos du joueur (score, fatigue, blessure)
  const playerInfo = document.createElement('div');
  playerInfo.style.cssText = 'background: #f5f5f5; padding: 10px; border-radius: 10px; margin-bottom: 15px;';
  playerInfo.innerHTML = `
    <div style="display: flex; justify-content: space-around; margin-bottom: 8px;">
      <div style="text-align: center;">
        <div style="font-size: 0.7rem; color: #666;">VOTES</div>
        <div style="font-size: 1.2rem; font-weight: bold; color: #f1c40f;">⭐ ${player.votes}</div>
      </div>
      <div style="text-align: center;">
        <div style="font-size: 0.7rem; color: #666;">FATIGUE</div>
        <div style="font-size: 1.2rem; font-weight: bold; color: #d35400;">😫 ${player.fatigueCards}</div>
      </div>
      <div style="text-align: center;">
        <div style="font-size: 0.7rem; color: #666;">BLESSURE</div>
        <div style="font-size: 1.2rem; font-weight: bold; color: #c0392b;">🩸 ${player.woundCards}</div>
      </div>
    </div>
  `;
  container.appendChild(playerInfo);
  
  // Météo et tour
  const gameInfo = document.createElement('div');
  gameInfo.style.cssText = 'background: #e8f5e9; padding: 8px; border-radius: 8px; margin-bottom: 15px; font-size: 0.85rem;';
  const weatherIcon = typeof currentWeather !== 'undefined' ? 
    (currentWeather === 'Canicule' ? '🌡️' : 
     currentWeather === 'Orage' ? '⛈️' : 
     currentWeather === 'Pluie fine' ? '🌧️' : '☀️') : '☀️';
  const weatherText = typeof currentWeather !== 'undefined' ? currentWeather : 'Beau temps';
  const tourInfo = typeof currentTurn !== 'undefined' && typeof maxTurns !== 'undefined' ? 
    `Tour ${currentTurn}/${maxTurns}` : '';
  gameInfo.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <span style="font-weight: bold;">${weatherIcon} ${weatherText}</span>
      <span style="font-weight: bold; color: #f1c40f;">🎯 ${tourInfo}</span>
    </div>
  `;
  container.appendChild(gameInfo);
  
  // Position actuelle
  const posInfo = document.createElement('p');
  posInfo.style.cssText = 'margin: 0 0 15px 0; font-size: 0.9rem; font-weight: bold; color: #666;';
  posInfo.textContent = 'Position : ' + alphabet[player.y] + player.x;
  container.appendChild(posInfo);
  
  // Grille de boutons
  const grid = document.createElement('div');
  grid.style.cssText = 'display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 20px;';
  
  blindMode.availableRows.forEach(y => {
    const btn = document.createElement('button');
    btn.textContent = alphabet[y];
    btn.style.cssText = 'padding: 20px; font-size: 1.5rem; font-weight: bold; border: 3px solid var(--gold); border-radius: 10px; background: white; color: black; cursor: pointer; transition: all 0.3s;';
    
    btn.onmouseover = function() {
      this.style.background = 'var(--gold)';
      this.style.transform = 'scale(1.1)';
    };
    
    btn.onmouseout = function() {
      this.style.background = 'white';
      this.style.transform = 'scale(1)';
    };
    
    btn.onclick = function() {
      blindMode.selectedRow = y;
      document.body.removeChild(container);
      document.getElementById('overlay').style.display = 'none';
      showColSelection(availableRange);
    };
    
    grid.appendChild(btn);
  });
  
  container.appendChild(grid);
  console.log('📍 Grille de boutons ajoutée, nombre de boutons:', blindMode.availableRows.length);
  
  // Overlay
  const overlay = document.getElementById('overlay');
  if (overlay) {
    overlay.style.display = 'block';
    // Ne pas modifier le z-index de l'overlay (il est à 90 par défaut)
    console.log('📍 Overlay activé');
  } else {
    console.warn('⚠️ Overlay non trouvé');
  }
  
  document.body.appendChild(container);
  console.log('📍 Conteneur ajouté au body');
  console.log('📍 Conteneur visible:', container.style.display !== 'none');
  console.log('📍 Z-index conteneur:', container.style.zIndex);
  
  // Message vocal avec les vraies lignes disponibles (avec protection anti-répétition)
  if (typeof speak === 'function') {
    const rowsText = blindMode.availableRows.map(y => alphabet[y]).join(', ');
    const message = 'Lignes disponibles : ' + rowsText;
    const now = Date.now();
    
    // Ne parler que si le message est différent ou si plus de 2 secondes se sont écoulées
    if (blindMode.lastSpokenMessage !== message || now - blindMode.lastSpeakTime > 2000) {
      speak(message);
      blindMode.lastSpokenMessage = message;
      blindMode.lastSpeakTime = now;
    } else {
      console.log('🔇 Message vocal ignoré (répétition)');
    }
  }
}

// Fonction pour afficher les boutons de sélection de colonne
function showColSelection(availableRange) {
  console.log('📍 Affichage sélection de colonne - Range:', availableRange);
  
  const player = players[currentPlayer];
  const alphabet = 'ABCDEFGHIJKLMN';
  
  // Calculer toutes les cases atteignables
  const reachableCells = getReachableCells(player, availableRange);
  
  // Filtrer uniquement les cases de la ligne sélectionnée
  const cellsInRow = reachableCells.filter(cell => cell.y === blindMode.selectedRow);
  
  // Extraire les colonnes disponibles pour cette ligne
  blindMode.availableCols = cellsInRow.map(cell => cell.x).sort((a, b) => a - b);
  console.log('Colonnes disponibles pour ligne', alphabet[blindMode.selectedRow], ':', blindMode.availableCols);
  
  // Créer le conteneur
  const container = document.createElement('div');
  container.id = 'col-selection-container';
  container.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; color: black; padding: 30px; border-radius: 20px; z-index: 200; width: 90%; max-width: 400px; text-align: center;';
  
  // Titre
  const title = document.createElement('h3');
  title.style.cssText = 'color: #f1c40f; margin: 0 0 15px 0; font-size: 1.3rem;';
  title.textContent = '🎯 CHOISISSEZ UNE COLONNE';
  container.appendChild(title);
  
  // Infos du joueur (score, fatigue, blessure)
  const playerInfo = document.createElement('div');
  playerInfo.style.cssText = 'background: #f5f5f5; padding: 10px; border-radius: 10px; margin-bottom: 15px;';
  playerInfo.innerHTML = `
    <div style="display: flex; justify-content: space-around; margin-bottom: 8px;">
      <div style="text-align: center;">
        <div style="font-size: 0.7rem; color: #666;">VOTES</div>
        <div style="font-size: 1.2rem; font-weight: bold; color: #f1c40f;">⭐ ${player.votes}</div>
      </div>
      <div style="text-align: center;">
        <div style="font-size: 0.7rem; color: #666;">FATIGUE</div>
        <div style="font-size: 1.2rem; font-weight: bold; color: #d35400;">😫 ${player.fatigueCards}</div>
      </div>
      <div style="text-align: center;">
        <div style="font-size: 0.7rem; color: #666;">BLESSURE</div>
        <div style="font-size: 1.2rem; font-weight: bold; color: #c0392b;">🩸 ${player.woundCards}</div>
      </div>
    </div>
  `;
  container.appendChild(playerInfo);
  
  // Météo et tour
  const gameInfo = document.createElement('div');
  gameInfo.style.cssText = 'background: #e8f5e9; padding: 8px; border-radius: 8px; margin-bottom: 15px; font-size: 0.85rem;';
  const weatherIcon = typeof currentWeather !== 'undefined' ? 
    (currentWeather === 'Canicule' ? '🌡️' : 
     currentWeather === 'Orage' ? '⛈️' : 
     currentWeather === 'Pluie fine' ? '🌧️' : '☀️') : '☀️';
  const weatherText = typeof currentWeather !== 'undefined' ? currentWeather : 'Beau temps';
  const tourInfo = typeof currentTurn !== 'undefined' && typeof maxTurns !== 'undefined' ? 
    `Tour ${currentTurn}/${maxTurns}` : '';
  gameInfo.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <span style="font-weight: bold;">${weatherIcon} ${weatherText}</span>
      <span style="font-weight: bold; color: #f1c40f;">🎯 ${tourInfo}</span>
    </div>
  `;
  container.appendChild(gameInfo);
  
  // Ligne choisie
  const lineInfo = document.createElement('p');
  lineInfo.style.cssText = 'margin: 0 0 15px 0; font-size: 0.9rem; font-weight: bold; color: #666;';
  lineInfo.textContent = 'Ligne choisie : ' + alphabet[blindMode.selectedRow];
  container.appendChild(lineInfo);
  
  // Grille de boutons
  const grid = document.createElement('div');
  grid.style.cssText = 'display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 20px;';
  
  blindMode.availableCols.forEach(x => {
    const btn = document.createElement('button');
    btn.textContent = x;
    btn.style.cssText = 'padding: 20px; font-size: 1.5rem; font-weight: bold; border: 3px solid var(--gold); border-radius: 10px; background: white; color: black; cursor: pointer; transition: all 0.3s;';
    
    btn.onmouseover = function() {
      this.style.background = 'var(--gold)';
      this.style.transform = 'scale(1.1)';
    };
    
    btn.onmouseout = function() {
      this.style.background = 'white';
      this.style.transform = 'scale(1)';
    };
    
    btn.onclick = function() {
      blindMode.selectedCol = x;
      document.body.removeChild(container);
      document.getElementById('overlay').style.display = 'none';
      confirmBlindMove();
    };
    
    grid.appendChild(btn);
  });
  
  container.appendChild(grid);
  
  // Overlay
  const overlay = document.getElementById('overlay');
  if (overlay) {
    overlay.style.display = 'block';
    // Ne pas modifier le z-index de l'overlay (il est à 90 par défaut)
  }
  
  document.body.appendChild(container);
  
  // Message vocal avec les vraies colonnes disponibles (avec protection anti-répétition)
  if (typeof speak === 'function') {
    const colsText = blindMode.availableCols.length > 0 ? 
      'Colonnes disponibles : ' + blindMode.availableCols.join(', ') :
      'Aucune colonne disponible sur cette ligne';
    const now = Date.now();
    
    // Ne parler que si le message est différent ou si plus de 2 secondes se sont écoulées
    if (blindMode.lastSpokenMessage !== colsText || now - blindMode.lastSpeakTime > 2000) {
      speak(colsText);
      blindMode.lastSpokenMessage = colsText;
      blindMode.lastSpeakTime = now;
    } else {
      console.log('🔇 Message vocal ignoré (répétition)');
    }
  }
}

// Fonction pour nettoyer les popups de sélection
function cleanupSelectionPopups() {
  console.log('🧹 Nettoyage des popups de sélection...');
  
  // Supprimer la popup de sélection de ligne si elle existe
  const rowContainer = document.getElementById('row-selection-container');
  if (rowContainer && rowContainer.parentNode) {
    rowContainer.parentNode.removeChild(rowContainer);
    console.log('✅ Popup de ligne supprimée');
  }
  
  // Supprimer la popup de sélection de colonne si elle existe
  const colContainer = document.getElementById('col-selection-container');
  if (colContainer && colContainer.parentNode) {
    colContainer.parentNode.removeChild(colContainer);
    console.log('✅ Popup de colonne supprimée');
  }
  
  // Supprimer la popup de don si elle existe
  const giftContainer = document.getElementById('gift-players-container');
  if (giftContainer && giftContainer.parentNode) {
    giftContainer.parentNode.removeChild(giftContainer);
    console.log('✅ Popup de don supprimée');
  }
  
  // Supprimer la popup de chasse si elle existe
  const huntContainer = document.getElementById('hunt-targets-container');
  if (huntContainer && huntContainer.parentNode) {
    huntContainer.parentNode.removeChild(huntContainer);
    console.log('✅ Popup de chasse supprimée');
  }
  
  // Masquer l'overlay
  const overlay = document.getElementById('overlay');
  if (overlay) {
    overlay.style.display = 'none';
  }
}

// Fonction pour confirmer le déplacement en mode aveugle
function confirmBlindMove() {
  const alphabet = 'ABCDEFGHIJKLMN';
  const coord = alphabet[blindMode.selectedRow] + blindMode.selectedCol;
  
  console.log('✅ Déplacement choisi:', coord);
  
  const player = players[currentPlayer];
  const distance = getDistance(player.x, player.y, blindMode.selectedCol, blindMode.selectedRow);
  
  // Vérifier si le déplacement est valide
  // if (distance > currentRange) {
  //   if (typeof speak === 'function') {
  //     speak('Déplacement trop loin ! Choisissez une case plus proche.');
  //   }
  //   showRowSelection(currentRange);
  //   return;
  // }
  
  // Vérifier s'il y a un autre joueur sur la case
  // const otherPlayer = players.find(p => p.id !== player.id && p.x === blindMode.selectedCol && p.y === blindMode.selectedRow);
  // if (otherPlayer) {
  //   if (typeof speak === 'function') {
  //     speak('Case occupée par un autre joueur ! Choisissez une autre case.');
  //   }
  //   showRowSelection(currentRange);
  //   return;
  // }
  
  // Nettoyer les popups
  cleanupSelectionPopups();
  
  // Exécuter le déplacement
  if (typeof executeMove === 'function') {
    executeMove(blindMode.selectedCol, blindMode.selectedRow, distance);
  }
  
  // Réinitialiser
  blindMode.selectedRow = null;
  blindMode.selectedCol = null;
}

// Fonction pour afficher le titre "Que faites-vous ?"
function showActionTitle() {
  const gridContainer = document.querySelector('.grid-container');
  if (!gridContainer) return;
  
  // Vérifier si le titre existe déjà
  let titleEl = document.getElementById('action-title');
  if (!titleEl) {
    titleEl = document.createElement('div');
    titleEl.id = 'action-title';
    titleEl.style.cssText = 'text-align: center; font-size: 1.8rem; font-weight: bold; color: var(--gold); padding: 40px 20px; margin: 20px 0;';
    titleEl.textContent = '🎯 QUE FAITES-VOUS ?';
    
    // Insérer avant le menu d'actions
    const actionsMenu = document.getElementById('menu-actions');
    if (actionsMenu && actionsMenu.parentNode) {
      actionsMenu.parentNode.insertBefore(titleEl, actionsMenu);
    }
  }
}

// Fonction pour afficher les joueurs adjacents pour le don
function showAdjacentPlayersForGift() {
  console.log('🤝 Affichage des joueurs adjacents pour don...');
  
  const player = players[currentPlayer];
  const adjacentPlayers = [];
  const directions = [{x: 0, y: 1}, {x: 0, y: -1}, {x: 1, y: 0}, {x: -1, y: 0}];
  
  // Trouver les joueurs adjacents avec de la place dans l'inventaire
  directions.forEach(dir => {
    const checkX = player.x + dir.x;
    const checkY = player.y + dir.y;
    
    players.forEach(p => {
      if (p.id !== player.id && p.x === checkX && p.y === checkY) {
        // Vérifier si le joueur a de la place
        const hasSpace = p.leftHand === null || p.rightHand === null || p.backpack.some(slot => slot === null);
        if (hasSpace) {
          const alphabet = 'ABCDEFGHIJKLMN';
          adjacentPlayers.push({
            player: p,
            coord: alphabet[p.y] + p.x
          });
        }
      }
    });
  });
  
  if (adjacentPlayers.length === 0) {
    alert('Aucun joueur adjacent avec de la place dans l\'inventaire !');
    if (typeof speak === 'function') {
      speak('Aucun joueur adjacent disponible');
    }
    return;
  }
  
  // Créer la popup
  const container = document.createElement('div');
  container.id = 'gift-players-container';
  container.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; color: black; padding: 30px; border-radius: 20px; z-index: 200; width: 90%; max-width: 400px; text-align: center;';
  
  const title = document.createElement('h3');
  title.style.cssText = 'color: #27ae60; margin: 0 0 20px 0; font-size: 1.3rem;';
  title.textContent = '🤝 DONNER À QUI ?';
  container.appendChild(title);
  
  const grid = document.createElement('div');
  grid.style.cssText = 'display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;';
  
  adjacentPlayers.forEach(({player: p, coord}) => {
    const btn = document.createElement('button');
    btn.textContent = p.picto + ' ' + p.name + ' (' + coord + ')';
    btn.style.cssText = 'padding: 15px; font-size: 1.2rem; font-weight: bold; border: 3px solid #27ae60; border-radius: 10px; background: white; color: black; cursor: pointer; transition: all 0.3s;';
    
    btn.onmouseover = function() {
      this.style.background = '#27ae60';
      this.style.color = 'white';
    };
    
    btn.onmouseout = function() {
      this.style.background = 'white';
      this.style.color = 'black';
    };
    
    btn.onclick = function() {
      document.body.removeChild(container);
      document.getElementById('overlay').style.display = 'none';
      
      // Appeler la fonction originale de sélection de cible
      if (typeof selectGiftTarget === 'function') {
        selectGiftTarget(p.id);
      }
    };
    
    grid.appendChild(btn);
  });
  
  container.appendChild(grid);
  
  // Bouton annuler
  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'ANNULER';
  cancelBtn.style.cssText = 'padding: 12px; font-size: 1rem; font-weight: bold; border: 2px solid #e74c3c; border-radius: 10px; background: white; color: #e74c3c; cursor: pointer; width: 100%;';
  cancelBtn.onclick = function() {
    document.body.removeChild(container);
    document.getElementById('overlay').style.display = 'none';
    giftMode = false;
  };
  container.appendChild(cancelBtn);
  
  const overlay = document.getElementById('overlay');
  if (overlay) {
    overlay.style.display = 'block';
  }
  
  document.body.appendChild(container);
  
  if (typeof speak === 'function') {
    const names = adjacentPlayers.map(ap => ap.player.name).join(', ');
    speak('Joueurs adjacents : ' + names);
  }
}

// Fonction pour afficher les cibles de chasse/pêche
function showHuntTargets() {
  console.log('🎯 Affichage des cibles de chasse/pêche...');
  
  const player = players[currentPlayer];
  const alphabet = 'ABCDEFGHIJKLMN';
  const targets = [];
  const directions = [{x: 0, y: 1}, {x: 0, y: -1}, {x: 1, y: 0}, {x: -1, y: 0}];
  
  const hasCanne = player.leftHand && player.leftHand.name === 'canne' || 
                   player.rightHand && player.rightHand.name === 'canne' || 
                   player.backpack.some(item => item && item.name === 'canne');
  
  const hasArc = player.leftHand && player.leftHand.name === 'arc' || 
                 player.rightHand && player.rightHand.name === 'arc' || 
                 player.backpack.some(item => item && item.name === 'arc');
  
  // Chercher les poissons adjacents (si canne)
  if (hasCanne && typeof fishes !== 'undefined') {
    directions.forEach(dir => {
      const checkX = player.x + dir.x;
      const checkY = player.y + dir.y;
      
      fishes.forEach(fish => {
        if (fish.x === checkX && fish.y === checkY) {
          targets.push({
            type: 'fish',
            id: fish.id,
            x: fish.x,
            y: fish.y,
            coord: alphabet[fish.y] + fish.x,
            icon: '🐟',
            name: 'Poisson ' + fish.id
          });
        }
      });
    });
  }
  
  // Chercher les oiseaux adjacents (si arc)
  if (hasArc && typeof birds !== 'undefined') {
    directions.forEach(dir => {
      const checkX = player.x + dir.x;
      const checkY = player.y + dir.y;
      
      birds.forEach(bird => {
        if (bird.x === checkX && bird.y === checkY) {
          targets.push({
            type: 'bird',
            id: bird.id,
            x: bird.x,
            y: bird.y,
            coord: alphabet[bird.y] + bird.x,
            icon: '🦅',
            name: 'Oiseau ' + bird.id
          });
        }
      });
    });
  }
  
  if (targets.length === 0) {
    alert('Aucune cible disponible ! Vérifiez que vous avez une canne (poissons) ou un arc (oiseaux).');
    if (typeof speak === 'function') {
      speak('Aucune cible disponible');
    }
    return;
  }
  
  // Créer la popup
  const container = document.createElement('div');
  container.id = 'hunt-targets-container';
  container.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; color: black; padding: 30px; border-radius: 20px; z-index: 200; width: 90%; max-width: 400px; text-align: center;';
  
  const title = document.createElement('h3');
  title.style.cssText = 'color: #e67e22; margin: 0 0 20px 0; font-size: 1.3rem;';
  title.textContent = '🎯 CHOISIR UNE CIBLE';
  container.appendChild(title);
  
  const grid = document.createElement('div');
  grid.style.cssText = 'display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;';
  
  targets.forEach(target => {
    const btn = document.createElement('button');
    btn.textContent = target.icon + ' ' + target.name + ' (' + target.coord + ')';
    btn.style.cssText = 'padding: 15px; font-size: 1.2rem; font-weight: bold; border: 3px solid #e67e22; border-radius: 10px; background: white; color: black; cursor: pointer; transition: all 0.3s;';
    
    btn.onmouseover = function() {
      this.style.background = '#e67e22';
      this.style.color = 'white';
    };
    
    btn.onmouseout = function() {
      this.style.background = 'white';
      this.style.color = 'black';
    };
    
    btn.onclick = function() {
      document.body.removeChild(container);
      document.getElementById('overlay').style.display = 'none';
      
      // Appeler la fonction originale de chasse
      if (typeof huntTarget === 'function') {
        huntTarget(target);
      }
    };
    
    grid.appendChild(btn);
  });
  
  container.appendChild(grid);
  
  // Bouton annuler
  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'ANNULER';
  cancelBtn.style.cssText = 'padding: 12px; font-size: 1rem; font-weight: bold; border: 2px solid #e74c3c; border-radius: 10px; background: white; color: #e74c3c; cursor: pointer; width: 100%;';
  cancelBtn.onclick = function() {
    document.body.removeChild(container);
    document.getElementById('overlay').style.display = 'none';
    huntMode = false;
  };
  container.appendChild(cancelBtn);
  
  const overlay = document.getElementById('overlay');
  if (overlay) {
    overlay.style.display = 'block';
  }
  
  document.body.appendChild(container);
  
  if (typeof speak === 'function') {
    const targetNames = targets.map(t => t.name).join(', ');
    speak('Cibles disponibles : ' + targetNames);
  }
}

// Fonction d'initialisation du patch
function initBlindModePatch() {
  console.log('🔧 Initialisation du patch mode aveugle...');
  
  // Sauvegarder les fonctions originales
  const originalLaunchGame = window.launchGame;
  const originalPrepMove = window.prepMove;
  const originalRenderGrid = window.renderGrid;
  
  // Remplacer launchGame
  window.launchGame = function() {
    console.log('🎮 launchGame - Mode aveugle');
    
    if (originalLaunchGame) {
      originalLaunchGame();
    }
    
    // Afficher les positions initiales après un court délai
    setTimeout(function() {
      showInitialPositions();
    }, 1000);
  };
  
  // Remplacer prepMove
  window.prepMove = function(range) {
    console.log('🎯 prepMove appelé - Range:', range, 'Mode aveugle:', blindMode.active);
    console.log('🎯 currentPlayer:', typeof currentPlayer !== 'undefined' ? currentPlayer : 'undefined');
    console.log('🎯 players:', typeof players !== 'undefined' ? players.length : 'undefined');
    
    if (!blindMode.active) {
      console.log('⚠️ Mode aveugle non actif, appel original');
      if (originalPrepMove) {
        originalPrepMove(range);
      }
      return;
    }
    
    console.log('✅ Mode aveugle actif, affichage sélection');
    
    // Nettoyer les anciennes popups avant d'en créer de nouvelles
    cleanupSelectionPopups();
    
    // Appliquer la réduction de portée en cas d'orage
    let adjustedRange = range;
    if (typeof currentWeather !== 'undefined' && currentWeather === 'Orage') {
      const player = players[currentPlayer];
      if (typeof hasBottes === 'function' && !hasBottes(player)) {
        adjustedRange--;
        console.log('⛈️ Orage - Portée réduite à', adjustedRange);
      }
    }
    
    // Mode aveugle : afficher la sélection de ligne
    currentRange = adjustedRange;
    turnStep = 1;
    
    // Masquer le QR button
    const qrButton = document.getElementById('qr-button');
    if (qrButton) {
      qrButton.classList.remove('visible');
    }
    
    // Afficher la sélection
    setTimeout(function() {
      showRowSelection(adjustedRange);
    }, 100);
  };
  
  // Remplacer renderGrid
  window.renderGrid = function() {
    if (!blindMode.active) {
      if (originalRenderGrid) {
        originalRenderGrid();
      }
      return;
    }
    
    // En mode aveugle, ne rien afficher
    console.log('🙈 renderGrid - Mode aveugle actif, pas d\'affichage');
    
    // Afficher le titre si on est en phase d'action
    if (turnStep === 2) {
      showActionTitle();
    }
    
    // Si on est en mode don, afficher les joueurs adjacents
    if (typeof giftMode !== 'undefined' && giftMode && turnStep === 2) {
      console.log('🤝 Mode don détecté, affichage des joueurs adjacents');
      setTimeout(showAdjacentPlayersForGift, 100);
    }
    
    // Si on est en mode chasse, afficher les cibles
    if (typeof huntMode !== 'undefined' && huntMode && turnStep === 2) {
      console.log('🎯 Mode chasse détecté, affichage des cibles');
      setTimeout(showHuntTargets, 100);
    }
  };
  
  console.log('✅ Patch mode aveugle initialisé');
}

// Initialisation
console.log('🔧 Démarrage initialisation patch mode aveugle...');
console.log('🔧 Document ready state:', document.readyState);

if (document.readyState === 'loading') {
  console.log('🔧 Document en chargement, attente DOMContentLoaded...');
  document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 DOMContentLoaded déclenché');
    setTimeout(initBlindModePatch, 200);
  });
} else {
  console.log('🔧 Document déjà chargé, initialisation immédiate');
  setTimeout(initBlindModePatch, 200);
}

console.log('✅ Patch mode aveugle chargé');

