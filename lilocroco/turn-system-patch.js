/**
 * PATCH SYSTÈME DE TOURS - Version simplifiée et robuste
 * Remplace le système de chronomètre par un système de tours
 */

console.log('🎯 Chargement du patch système de tours...');

// Variables globales pour le système de tours
let maxTurns = 25;
let currentTurn = 1;
let turnCounter = 0;

// Fonction pour mettre à jour l'affichage du tour dans le bandeau météo
function updateTurnDisplay() {
  const weatherText = document.getElementById('weather-text');
  
  if (!weatherText) {
    console.log('⚠️ Élément weather-text non trouvé');
    return;
  }
  
  // Récupérer le texte actuel
  let currentHTML = weatherText.innerHTML;
  
  // Extraire uniquement la partie météo (avant tout span ou pipe)
  let weatherPart = currentHTML;
  
  // Enlever les spans existants
  weatherPart = weatherPart.replace(/<span[^>]*>.*?<\/span>/gi, '');
  
  // Enlever tout après le pipe |
  if (weatherPart.includes('|')) {
    weatherPart = weatherPart.split('|')[0];
  }
  
  // Nettoyer
  weatherPart = weatherPart.trim();
  
  // Déterminer la couleur selon la progression
  let turnColor = '#ffffff';
  let turnIcon = '🎯';
  
  if (currentTurn >= maxTurns) {
    turnColor = '#ff0000';
    turnIcon = '⚠️';
  } else if (currentTurn >= maxTurns * 0.8) {
    turnColor = '#ff9900';
  }
  
  // Construire le nouveau HTML
  const newHTML = weatherPart + ' <span style="color: ' + turnColor + '; font-weight: bold; margin-left: 20px;">' + turnIcon + ' Tour ' + currentTurn + '/' + maxTurns + '</span>';
  
  // Mettre à jour seulement si différent
  if (weatherText.innerHTML !== newHTML) {
    weatherText.innerHTML = newHTML;
    console.log('✅ Affichage mis à jour: Tour ' + currentTurn + '/' + maxTurns);
  }
}

// Fonction d'initialisation
function initPatch() {
  console.log('🔧 Initialisation du patch...');
  
  // Sauvegarder les fonctions originales
  const originalShowPlayerSelection = window.showPlayerSelection;
  const originalConfirmTurn = window.confirmTurn;
  const originalStartGlobalTimer = window.startGlobalTimer;
  const originalUpdateGlobalTimer = window.updateGlobalTimer;
  const originalUpdateGlobalTimerDisplay = window.updateGlobalTimerDisplay;
  const originalUpdatePlayerTimerDisplay = window.updatePlayerTimerDisplay;
  
  // Remplacer showPlayerSelection
  window.showPlayerSelection = function() {
    const selected = document.querySelector('input[name="gameDuration"]:checked');
    if (selected) {
      maxTurns = parseInt(selected.value);
      console.log('✅ Nombre de tours sélectionné:', maxTurns);
    }
    
    if (originalShowPlayerSelection) {
      originalShowPlayerSelection();
    }
  };
  
  // Remplacer confirmTurn
  window.confirmTurn = function() {
    console.log('🔄 confirmTurn - currentPlayer:', typeof currentPlayer !== 'undefined' ? currentPlayer : '?', 'turnCounter:', turnCounter);
    
    if (originalConfirmTurn) {
      originalConfirmTurn();
    }
    
    turnCounter++;
    
    // Vérifier si un tour complet est terminé
    if (typeof players !== 'undefined' && turnCounter >= players.length) {
      currentTurn++;
      turnCounter = 0;
      console.log('🔄 Tour complet - Nouveau tour:', currentTurn + '/' + maxTurns);
      
      updateTurnDisplay();
      
      // Vérifier la fin de partie
      if (currentTurn > maxTurns) {
        console.log('🏁 Fin de partie - Tour maximum atteint');
        
        if (typeof gameEnded !== 'undefined') {
          gameEnded = true;
        }
        
        if (typeof globalTimerInterval !== 'undefined' && globalTimerInterval) {
          clearInterval(globalTimerInterval);
        }
        
        setTimeout(function() {
          if (typeof showFinalRanking === 'function') {
            showFinalRanking();
          }
        }, 500);
      }
    } else {
      updateTurnDisplay();
    }
  };
  
  // Désactiver le chronomètre
  window.startGlobalTimer = function() {
    console.log('⏱️ Chronomètre désactivé - Système de tours actif');
    currentTurn = 1;
    turnCounter = 0;
    
    setTimeout(updateTurnDisplay, 200);
  };
  
  window.updateGlobalTimer = function() {
    updateTurnDisplay();
  };
  
  window.updateGlobalTimerDisplay = function() {
    updateTurnDisplay();
  };
  
  window.updatePlayerTimerDisplay = function() {
    updateTurnDisplay();
  };
  
  console.log('✅ Patch initialisé');
}

// Fonction pour afficher le classement final
window.showFinalRanking = function() {
  if (typeof players === 'undefined') {
    console.error('❌ Variable players non définie');
    return;
  }
  
  const sortedPlayers = players.slice().sort((a, b) => b.votes - a.votes);
  
  let rankingHTML = '<h2 style="color: var(--gold); font-size: 2rem; margin-bottom: 20px;">🏆 CLASSEMENT FINAL</h2>';
  rankingHTML += '<div style="margin: 20px 0;">';
  
  sortedPlayers.forEach((player, index) => {
    const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : (index + 1) + '.';
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
    const h3 = popup.querySelector('h3');
    if (h3) {
      h3.innerHTML = '🏆 FIN DE LA PARTIE';
      h3.style.color = 'var(--gold)';
    }
    
    const contentDiv = popup.querySelector('div');
    if (contentDiv) {
      contentDiv.innerHTML = rankingHTML;
    }
    
    const pElement = popup.querySelector('p');
    if (pElement) {
      pElement.style.display = 'none';
    }
    
    const buttons = popup.querySelectorAll('button');
    buttons.forEach((btn, idx) => {
      if (idx > 0) btn.style.display = 'none';
    });
    
    document.getElementById('overlay').style.display = 'block';
    popup.style.display = 'block';
  }
  
  if (typeof speak === 'function') {
    speak('Fin de la partie ! Le vainqueur est ' + sortedPlayers[0].name + ' avec ' + sortedPlayers[0].votes + ' votes !');
  }
};

// Observer pour forcer l'affichage du tour
function setupObserver() {
  if (typeof MutationObserver === 'undefined') return;
  
  const weatherText = document.getElementById('weather-text');
  if (!weatherText) {
    setTimeout(setupObserver, 500);
    return;
  }
  
  const observer = new MutationObserver(function(mutations) {
    const text = weatherText.innerHTML || weatherText.textContent;
    
    // Si on détecte un chrono, le remplacer
    if ((text.includes('⏱️') || (text.includes(':') && text.match(/\d+:\d+/))) && !text.includes('Tour')) {
      console.log('🔄 Chrono détecté, remplacement par le tour');
      updateTurnDisplay();
    }
  });
  
  observer.observe(weatherText, {
    childList: true,
    characterData: true,
    subtree: true
  });
  
  console.log('👁️ Observateur activé');
}

// Initialisation
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initPatch, 100);
    setTimeout(setupObserver, 500);
  });
} else {
  setTimeout(initPatch, 100);
  setTimeout(setupObserver, 500);
}

// Mise à jour périodique pour forcer l'affichage
setInterval(function() {
  if (currentTurn > 0) {
    updateTurnDisplay();
  }
}, 2000);

console.log('✅ Patch système de tours chargé');
