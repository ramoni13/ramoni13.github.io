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
        case 'totem':
            doActionTotem();
            break;
        case 'chasse_peche':
            doActionChassePeche();
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
    
    let blessuresAjoutees = 1;
    
    if (source === 'morsure') {
        // Vérifier si les crocos sont en mode Furie
        const enFurie = typeof isCrocoFurie === 'function' ? isCrocoFurie() : false;
        const enerve = typeof isEnerve === 'function' ? isEnerve() : false;
        
        if (enFurie) {
            blessuresAjoutees = 2;
            console.log('🐊 MODE FURIE : +2 blessures au lieu de +1');
        } else  if (enerve) {
            console.log('🐊 MODE ENERVE : 2 déplacments au lieu de 1');
        }
        
        //player.blessure += blessuresAjoutees;
        updateCrocoGauge(10);
        player.recordAction('blessure', { source: 'morsure', blessure: player.blessure, furie: enFurie });
        
        // if (enFurie) {
        //     showToast(`${player.picto} 🐊 FURIE ! Morsure ! +${blessuresAjoutees} Blessures (Total: ${player.blessure})`, 'danger', 4000);
        //     speak(`Attention ! Les crocodiles sont en furie ! Morsure ! Plus ${blessuresAjoutees} blessures. Total : ${player.blessure}.`);
        // } else {
        //     showToast(`${player.picto} Morsure ! +${blessuresAjoutees} Blessure (Total: ${player.blessure})`, 'danger');
        //     speak(`Morsure de crocodile ! Plus ${blessuresAjoutees} blessure. Total : ${player.blessure}.`);
        // }
        if (enFurie) {
            showToast(`🐊 MODE FURIE ! 2 blessures ! `, 'danger', 4000);
            speak(`Les crocos sont en furie ! Attention ! Ils infligent 2 blessures !`);
        } else if (enerve) {
            showToast(`🐊 MODE ENERVE ! 2 déplacements ! `, 'danger', 4000);
            speak(`Les crocos sont énervés ! Ils se déplacent de 2 cases !`);
        } else {
            showToast(`La jauge des crocos augmentent !`, 'danger');
            speak(`La jauge des crocos augmentent !`);
        }
    } else if (source === 'volcan') {
        player.blessure += blessuresAjoutees;
        updateVolcanoGauge(1);
        player.recordAction('blessure', { source: 'volcan', blessure: player.blessure });
        showToast(`La jauge du Volcan augmente`, 'warning');
        speak(`La jauge du Volcan augmente`);
    }
    
    updatePlayerDisplay();
    updateOtherPlayersDisplay();
    
    // Mettre à jour l'affichage dans la popup
    // const popup = document.getElementById('blessure-popup');
    // if (popup) {
    //     const levelDisplay = popup.querySelector('strong');
    //     if (levelDisplay) {
    //         levelDisplay.textContent = player.blessure;
    //     }
    // }
    
    // // Vérifier évacuation
    // if (player.blessure >= 8) {
    //     closeBlessurePopup();
    //     evacuatePlayer(player, '8 blessures');
    // }

    // // Vérifier évacuation
    //   if ((player.blessure >= 5) && (player.fatigue >= 5)) {
    //   closeBlessurePopup();
    //   evacuatePlayer(player, '5 blessures & 5 fatigues');
    // }
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
 * Action Chasse/Pêche
 */
function doActionChassePeche() {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    // Réduire la fatigue de 2 (sans descendre en dessous de 0)
    const fatigueReduced = Math.min(player.fatigue, 2);
    player.fatigue = Math.max(0, player.fatigue - 2);
    
    // Augmenter la jauge crocodiles de 5
    updateCrocoGauge(5);
    
    // Enregistrer l'action
    player.recordAction('chasse_peche', { 
        fatigueReduced,
        fatigue: player.fatigue 
    });
    
    // XP
    player.addXP(3, 'Chasse/Pêche');
    
    // Messages
    showToast(`${player.picto} 🎣 Chasse/Pêche ! -${fatigueReduced} Fatigue (Total: ${player.fatigue})`, 'success', 4000);
    speak(`Chasse ou pêche réussie ! Moins ${fatigueReduced} fatigue. Total : ${player.fatigue}.`);
    
    updatePlayerDisplay();
    if (typeof updateOtherPlayersDisplay === 'function') {
        updateOtherPlayersDisplay();
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
