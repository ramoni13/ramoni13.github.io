/**
 * PATCH POPUP SCAN MISSION
 * Ajoute une popup dédiée au scan de mission secrète
 */

console.log('📷 Chargement du patch popup scan mission...');

// Fonction pour afficher la popup de scan de mission
function showMissionScanPopup() {
  console.log('📷 Affichage popup scan mission');
  
  const player = players[numeroJoueurScanMission];
  const colors = ["#e74c3c" , "#2ecc71" , "#3498db", "#f1c40f"];
  const playerColor = colors[player.id];
  
  // Créer le conteneur
  const container = document.createElement('div');
  container.id = 'mission-scan-popup';
  container.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; color: black; padding: 40px; border-radius: 20px; z-index: 200; width: 90%; max-width: 450px; text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.3);';
  
  // Icône joueur
  const icon = document.createElement('div');
  icon.style.cssText = 'font-size: 4rem; margin-bottom: 20px;';
  icon.textContent = player.picto;
  container.appendChild(icon);
  
  // Titre
  const title = document.createElement('h2');
  title.style.cssText = 'color: ' + playerColor + '; margin: 0 0 15px 0; font-size: 1.8rem;';
  title.textContent = player.name;
  container.appendChild(title);
  
  // Message
  const message = document.createElement('p');
  message.style.cssText = 'font-size: 1.1rem; color: #666; margin: 0 0 30px 0; line-height: 1.5;';
  message.textContent = 'Scannez votre mission secrète pour commencer votre tour !';
  container.appendChild(message);
  
  // Bouton scan
  const scanBtn = document.createElement('button');
  scanBtn.textContent = '📷 SCANNER MISSION SECRÈTE';
  scanBtn.style.cssText = 'background: var(--gold); color: black; padding: 18px 40px; border: none; border-radius: 50px; font-weight: bold; font-size: 1.2rem; cursor: pointer; box-shadow: 0 4px 15px rgba(241, 196, 15, 0.5); transition: all 0.3s; width: 100%;';
  scanBtn.onmouseover = function() {
    this.style.transform = 'scale(1.05)';
    this.style.boxShadow = '0 6px 20px rgba(241, 196, 15, 0.7)';
  };
  scanBtn.onmouseout = function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 4px 15px rgba(241, 196, 15, 0.5)';
  };
  scanBtn.onclick = function() {
    if (typeof openQRScanner === 'function') {
      openQRScanner();
    }
  };
  container.appendChild(scanBtn);
  
  // Afficher
  document.getElementById('overlay').style.display = 'block';
  document.body.appendChild(container);
  
  if (typeof speak === 'function') {
    speak('Scannez votre mission secrète');
  }
}

// Fonction pour fermer la popup de scan de mission
function closeMissionScanPopup() {
  console.log('🔒 Fermeture popup scan mission');
  
  const popup = document.getElementById('mission-scan-popup');
  if (popup && popup.parentNode) {
    popup.parentNode.removeChild(popup);
  }
  
  document.getElementById('overlay').style.display = 'none';
  
  // Démarrer le tour
  if ((turnCounter === 0) && numeroJoueurScanMission ===0) {
    startTurn();
  } else {
    console.log(" closeMissionScanPopup() - mission-scan-popu-patch - ligne 82");
    confirmTurn();
  }
  
}

// Remplacer closePlayerChange
const originalClosePlayerChange = window.closePlayerChange;

window.closePlayerChange = function() {
  console.log('🔄 closePlayerChange patché');
  
  document.getElementById("player-change-box").style.display = "none";
  
  // Vérifier si le joueur a une mission
  numeroJoueurScanMission = (currentPlayer + 1) % players.length;
  
  const player = players[numeroJoueurScanMission];
  if (!player.secretMission || player.secretMission.completed) {
    // Pas de mission -> afficher la popup de scan
    console.log('📷 Pas de mission, affichage popup scan');
    showMissionScanPopup();
  } else {
    // Mission en cours -> passer directement au tour
    console.log('✅ Mission en cours, passage au tour');
    document.getElementById("overlay").style.display = "none";
    console.log(" closeMissionScanPopup() - mission-scan-popu-patch - ligne 108");
    confirmTurn();
  }
};

// Modifier assignSecretMission pour fermer la popup après scan
const originalAssignSecretMission = window.assignSecretMission;

window.assignSecretMission = function(missionId) {
  console.log('🎯 assignSecretMission patché, mission:', missionId);
  
  // Appeler la fonction originale
  if (originalAssignSecretMission) {
    originalAssignSecretMission(missionId);
  }
  
  // Fermer la popup de scan si elle existe
  const popup = document.getElementById('mission-scan-popup');
  if (popup) {
    console.log('🔒 Fermeture popup scan après attribution mission');
    closeMissionScanPopup();
  }
};

// Au démarrage du jeu, afficher la popup pour le premier joueur
const originalLaunchGame = window.launchGame;

window.launchGame = function() {
  console.log('🎮 launchGame patché');
  
  // Appeler la fonction originale
  if (originalLaunchGame) {
    originalLaunchGame();
  }
  
  // Ne pas afficher la popup si on est en mode aveugle (elle sera affichée après les positions initiales)
  if (typeof blindMode !== 'undefined' && blindMode.active) {
    console.log('👁️ Mode aveugle actif, pas de popup scan au démarrage');
    return;
  }
  
  // Attendre un peu puis afficher la popup de scan pour le premier joueur
  // setTimeout(function() {
  //   const player = players[currentPlayer];
  //   if (!player.secretMission || player.secretMission.completed) {
  //     console.log('📷 Affichage popup scan au démarrage');
  //     showMissionScanPopup();
  //   }
  // }, 2000);
};

console.log('✅ Patch popup scan mission chargé');
