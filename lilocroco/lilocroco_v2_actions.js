/**
 * LILOCROCO TV SHOW V2 - ACTIONS
 * Gestion des actions du joueur avec reconnaissance vocale
 */

// ========================================
// RECONNAISSANCE VOCALE
// ========================================

let recognition = null;
let isListening = false;

// Initialiser la reconnaissance vocale
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'fr-FR';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    console.log('✅ Reconnaissance vocale disponible');
} else {
    console.warn('⚠️ Reconnaissance vocale non disponible');
}

/**
 * Démarre l'écoute vocale
 */
function startVoiceRecognition(callback) {
    if (!recognition) {
        showToast('Reconnaissance vocale non disponible', 'error');
        return;
    }
    
    if (isListening) {
        recognition.stop();
        isListening = false;
    }
    
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('🎤 Reconnu:', transcript);
        callback(transcript);
    };
    
    recognition.onerror = (event) => {
        console.error('❌ Erreur reconnaissance vocale:', event.error);
        showToast('Erreur de reconnaissance vocale', 'error');
        isListening = false;
    };
    
    recognition.onend = () => {
        isListening = false;
    };
    
    try {
        recognition.start();
        isListening = true;
        console.log('🎤 Écoute en cours...');
    } catch (error) {
        console.error('❌ Erreur démarrage reconnaissance:', error);
        showToast('Erreur de démarrage de la reconnaissance vocale', 'error');
    }
}

/**
 * Arrête l'écoute vocale
 */
function stopVoiceRecognition() {
    if (recognition && isListening) {
        recognition.stop();
        isListening = false;
    }
}

// ========================================
// DISPATCHER D'ACTIONS
// ========================================

function doAction(actionType) {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    console.log(`🎮 Action: ${actionType} par ${player.name}`);
    
    switch (actionType) {
        case 'blessure':
            doActionBlessure();
            break;
        case 'fatigue':
            doActionFatigue();
            break;
        case 'soin':
            doActionSoin();
            break;
        case 'repos':
            doActionRepos();
            break;
        case 'fouille':
            doActionFouille();
            break;
        case 'aide_public':
            doActionAidePublic();
            break;
        case 'mission':
            doActionMission();
            break;
        default:
            console.warn('⚠️ Action inconnue:', actionType);
    }
}

// ========================================
// ACTIONS
// ========================================

/**
 * Action Blessure
 */
function doActionBlessure() {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    let html = '<h3 style="color: #e74c3c; margin-top: 0;">🩹 BLESSURE</h3>';
    html += `<p style="font-size: 1rem; margin: 20px 0;">Niveau actuel : <strong style="font-size: 1.5rem; color: #e74c3c;">${player.blessure}</strong></p>`;
    html += '<p style="font-size: 0.9rem; color: #666; margin-bottom: 15px;">Source de la blessure :</p>';
    
    html += '<div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">';
    html += '<button onclick="addBlessure(\'morsure\')" class="btn btn-danger" style="width: 100%;">🐊 Morsure</button>';
    html += '<button onclick="addBlessure(\'volcan\')" class="btn btn-warning" style="width: 100%;">🌋 Volcan</button>';
    html += '</div>';
    
    html += '<button onclick="closeBlessurePopup()" class="btn btn-info" style="width: 100%;">OK</button>';
    
    const modal = document.createElement('div');
    modal.id = 'blessure-popup';
    modal.className = 'modal';
    modal.innerHTML = html;
    modal.style.display = 'block';
    
    document.body.appendChild(modal);
    showOverlay();
}

function addBlessure(source) {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    player.blessure++;
    
    if (source === 'morsure') {
        updateCrocoGauge(10);
        player.recordAction('blessure', { source: 'morsure', blessure: player.blessure });
        showToast(`${player.picto} Morsure ! +1 Blessure (Total: ${player.blessure})`, 'danger');
        speak(`Morsure de crocodile ! Plus 1 blessure. Total : ${player.blessure}.`);
    } else if (source === 'volcan') {
        updateVolcanoGauge(1);
        player.recordAction('blessure', { source: 'volcan', blessure: player.blessure });
        showToast(`${player.picto} Volcan ! +1 Blessure (Total: ${player.blessure})`, 'warning');
        speak(`Blessure du volcan ! Plus 1 blessure. Total : ${player.blessure}.`);
    }
    
    updatePlayerDisplay();
    updateOtherPlayersDisplay();
    
    // Mettre à jour l'affichage dans la popup
    const popup = document.getElementById('blessure-popup');
    if (popup) {
        const levelDisplay = popup.querySelector('strong');
        if (levelDisplay) {
            levelDisplay.textContent = player.blessure;
        }
    }
    
    // Vérifier évacuation
    if (player.blessure >= 8) {
        closeBlessurePopup();
        evacuatePlayer(player, '8 blessures');
    }

    // Vérifier évacuation
      if ((player.blessure >= 5) && (player.fatigue >= 5)) {
      closeBlessurePopup();
      evacuatePlayer(player, '5 blessures & 5 fatigues');
  }
}

function closeBlessurePopup() {
    const modal = document.getElementById('blessure-popup');
    if (modal) {
        modal.remove();
        hideOverlay();
    }
}

/**
 * Action Fatigue
 */
function doActionFatigue() {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    player.fatigue++;
    player.recordAction('fatigue', { fatigue: player.fatigue });
    showToast(`${player.picto} +1 Fatigue (Total: ${player.fatigue})`, 'warning');
    speak(`Plus 1 fatigue. Total : ${player.fatigue}.`);
    updatePlayerDisplay();
    updateOtherPlayersDisplay();
    
      // Vérifier évacuation
  if (player.fatigue >= 8) {
      evacuatePlayer(player, '8 fatigues');
  }

          // Vérifier évacuation
      if ((player.blessure >= 5) && (player.fatigue >= 5)) {
          evacuatePlayer(player, '5 blessures & 5 fatigues');
      }
    
}

/**
 * Action Soin
 */
function doActionSoin() {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    if (player.blessure > 0) {
        player.blessure--;
        player.recordAction('soin', { type: 'blessure', blessure: player.blessure });
        showToast(`${player.picto} -1 Blessure (Total: ${player.blessure})`, 'success');
        speak(`Moins 1 blessure. Total : ${player.blessure}.`);
        updatePlayerDisplay();
        updateOtherPlayersDisplay();
    } else {
        showToast('Aucune blessure à soigner', 'info');
        speak('Vous n\'avez aucune blessure.');
    }
}

/**
 * Action Repos
 */
function doActionRepos() {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    if (player.fatigue > 0) {
        player.fatigue--;
        player.recordAction('repos', { type: 'fatigue', fatigue: player.fatigue });
        showToast(`${player.picto} -1 Fatigue (Total: ${player.fatigue})`, 'success');
        speak(`Moins 1 fatigue. Total : ${player.fatigue}.`);
        updatePlayerDisplay();
        updateOtherPlayersDisplay();
    } else {
        showToast('Aucune fatigue à retirer', 'info');
        speak('Vous n\'avez aucune fatigue.');
    }
}

/**
 * Affiche les infos des autres joueurs
 */
function updateOtherPlayersDisplay() {
    const content = document.getElementById('other-players-content');
    if (!content) return;
    
    let html = '';
    
    players.forEach((p, index) => {
        if (index !== currentPlayerIndex) {
            // Couleurs selon les niveaux
            const fatigueColor = p.fatigue >= 5 ? '#e74c3c' : p.fatigue >= 3 ? '#f39c12' : '#2ecc71';
            const blessureColor = p.blessure >= 5 ? '#e74c3c' : p.blessure >= 3 ? '#f39c12' : '#2ecc71';
            
            html += `<div style="background: rgba(255,255,255,0.1); padding: 10px 12px; border-radius: 8px; border-left: 4px solid ${p.colorHex}; min-width: 180px;">`;
            
            // Nom du joueur
            html += `<div style="font-weight: bold; margin-bottom: 5px; font-size: 0.85rem;">${p.picto} ${p.name}</div>`;
            
            // Stats ligne 1 : Votes + XP
            html += `<div style="display: flex; justify-content: space-between; gap: 10px; font-size: 0.7rem; margin-bottom: 3px;">`;
            html += `<span style="color: var(--gold); font-weight: bold;">⭐ ${p.votes}</span>`;
            html += `<span style="color: #999;">XP: ${p.xp}</span>`;
            html += `</div>`;
            
            // Stats ligne 2 : Fatigue + Blessure
            html += `<div style="display: flex; gap: 12px; font-size: 0.7rem;">`;
            html += `<span style="color: ${fatigueColor}; font-weight: bold;">😫 F: ${p.fatigue}</span>`;
            html += `<span style="color: ${blessureColor}; font-weight: bold;">🩹 B: ${p.blessure}</span>`;
            html += `</div>`;
            
            // Si évacué
            if (p.evacuated) {
                html += `<div style="margin-top: 5px; padding: 3px 6px; background: rgba(231, 76, 60, 0.3); border-radius: 4px; font-size: 0.65rem; color: #e74c3c; font-weight: bold;">`;
                html += `⚠️ ÉVACUÉ`;
                html += `</div>`;
            }
            
            html += `</div>`;
        }
    });
    
    if (html === '') {
        html = '<div style="color: #999; font-style: italic; font-size: 0.75rem; text-align: center; padding: 10px;">Aucun autre joueur</div>';
    }
    
    content.innerHTML = html;
}

console.log('✅ Actions chargées');
