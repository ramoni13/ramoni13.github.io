/**
 * PATCH AIDE DU PUBLIC - Ajout de la saisie de position
 * À intégrer dans lilocroco_v2_part2.js
 */

// Variable temporaire pour stocker l'item sélectionné
let selectedItemForPublicHelp = null;

// Remplacer la fonction searchItemWithPublicHelp existante par celle-ci :
function searchItemWithPublicHelp(itemName) {
    selectedItemForPublicHelp = itemName;
    closeAidePublicPopup();
    
    // Afficher la popup de saisie des coordonnées du joueur
    showPlayerPositionInputForPublicHelp();
}

function showPlayerPositionInputForPublicHelp() {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    const item = ITEMS.find(i => i.name === selectedItemForPublicHelp);
    
    let html = '<h3 style="color: #f39c12; margin-top: 0;">📢 AIDE DU PUBLIC</h3>';
    html += `<div style="font-size: 3rem; margin: 20px 0;">${item.icon}</div>`;
    html += `<p style="font-size: 1rem; margin: 15px 0;">Recherche : <strong>${item.name}</strong></p>`;
    html += '<p style="font-size: 0.9rem; color: #666; margin-bottom: 15px;">Saisissez ou dites votre position actuelle</p>';
    
    // Champs de saisie
    html += '<div style="display: flex; gap: 10px; margin-bottom: 15px;">';
    html += '<div style="flex: 1;">';
    html += '<label style="display: block; margin-bottom: 5px; font-weight: bold; color: #000;">Ligne :</label>';
    html += '<input type="text" id="aide-public-line-input" style="width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 8px; font-size: 1.2rem; text-align: center; text-transform: uppercase;" maxlength="1" placeholder="B">';
    html += '</div>';
    html += '<div style="flex: 1;">';
    html += '<label style="display: block; margin-bottom: 5px; font-weight: bold; color: #000;">Colonne :</label>';
    html += '<input type="number" id="aide-public-column-input" style="width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 8px; font-size: 1.2rem; text-align: center;" min="1" max="16" placeholder="12">';
    html += '</div>';
    html += '</div>';
    
    // Bouton micro (seulement si disponible)
    if (typeof recognition !== 'undefined' && recognition) {
        html += '<button onclick="startAidePublicVoiceRecognition()" class="btn btn-info" style="width: 100%; margin-bottom: 15px;">';
        html += '🎤 ÉCOUTER (ou saisissez manuellement)';
        html += '</button>';
    } else {
        html += '<p style="font-size: 0.85rem; color: #999; text-align: center; margin-bottom: 15px; font-style: italic;">';
        html += '⚠️ Reconnaissance vocale non disponible sur ce navigateur';
        html += '</p>';
    }
    
    // Boutons d'action
    html += '<div style="display: flex; gap: 10px;">';
    html += '<button onclick="closePlayerPositionInputForPublicHelp()" class="btn btn-danger" style="flex: 1;">Annuler</button>';
    html += '<button onclick="confirmPlayerPositionForPublicHelp()" class="btn btn-success" style="flex: 1;">Valider</button>';
    html += '</div>';
    
    const modal = document.createElement('div');
    modal.id = 'aide-public-position-popup';
    modal.className = 'modal';
    modal.innerHTML = html;
    modal.style.display = 'block';
    
    document.body.appendChild(modal);
    showOverlay();
    
    // Focus sur le premier champ
    setTimeout(() => {
        const lineInput = document.getElementById('aide-public-line-input');
        const columnInput = document.getElementById('aide-public-column-input');
        
        if (lineInput) {
            lineInput.focus();
            
            // Passer au champ suivant après saisie
            lineInput.addEventListener('input', () => {
                if (lineInput.value.length === 1 && columnInput) {
                    columnInput.focus();
                }
            });
            
            // Valider avec Entrée
            lineInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    if (columnInput) columnInput.focus();
                }
            });
        }
        
        if (columnInput) {
            // Valider avec Entrée
            columnInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    confirmPlayerPositionForPublicHelp();
                }
            });
        }
    }, 100);
}

function startAidePublicVoiceRecognition() {
    if (typeof recognition === 'undefined' || !recognition) {
        showToast('Reconnaissance vocale non disponible sur ce navigateur', 'error');
        speak('La reconnaissance vocale n\'est pas disponible. Veuillez saisir manuellement.');
        return;
    }
    
    showToast('🎤 Écoute en cours... Parlez maintenant !', 'info', 3000);
    speak('Dites vos coordonnées.');
    
    // Arrêter toute reconnaissance en cours
    if (typeof isListening !== 'undefined' && isListening) {
        try {
            recognition.stop();
        } catch (e) {
            console.log('Arrêt reconnaissance:', e);
        }
        isListening = false;
    }
    
    // Configurer les callbacks
    recognition.onstart = () => {
        console.log('🎤 Écoute démarrée');
        if (typeof isListening !== 'undefined') isListening = true;
    };
    
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('🎤 Reconnu:', transcript);
        
        // Parser le transcript (ex: "B 12", "B douze", "N14")
        const cleaned = transcript.toUpperCase().replace(/[^A-Z0-9\s]/g, '');
        
        let line = '';
        let column = '';
        
        // Méthode 1 : Chercher une lettre seule (A-N)
        const letterMatch = cleaned.match(/\b([A-N])\b/);
        if (letterMatch) {
            line = letterMatch[1];
        }
        
        // Méthode 2 : Si pas trouvé, chercher lettre collée aux chiffres (ex: "N14")
        if (!line) {
            const stuckMatch = cleaned.match(/([A-N])(\d+)/);
            if (stuckMatch) {
                line = stuckMatch[1];
                column = stuckMatch[2];
            }
        }
        
        // Chercher le nombre (colonne) si pas déjà trouvé
        if (!column) {
            const numberMatch = cleaned.match(/\b(\d+)\b/);
            if (numberMatch) {
                const num = parseInt(numberMatch[1]);
                if (num >= 1 && num <= 16) {
                    column = num.toString();
                }
            }
        }
        
        console.log('Parsed:', { line, column, cleaned });
        
        // Remplir les champs
        const lineInput = document.getElementById('aide-public-line-input');
        const columnInput = document.getElementById('aide-public-column-input');
        
        if (lineInput && line) lineInput.value = line;
        if (columnInput && column) columnInput.value = column;
        
        if (line && column) {
            showToast(`✅ Compris : ${line}-${column}`, 'success');
            speak(`${line} ${column}`);
        } else if (line && !column) {
            showToast(`⚠️ Ligne ${line} reconnue, saisissez la colonne`, 'warning');
            speak(`Ligne ${line} reconnue, saisissez la colonne.`);
            if (columnInput) columnInput.focus();
        } else if (!line && column) {
            showToast(`⚠️ Colonne ${column} reconnue, saisissez la ligne`, 'warning');
            speak(`Colonne ${column} reconnue, saisissez la ligne.`);
            if (lineInput) lineInput.focus();
        } else {
            showToast('⚠️ Non compris, veuillez saisir manuellement', 'warning');
            speak('Je n\'ai pas bien compris, veuillez saisir manuellement.');
            if (lineInput) lineInput.focus();
        }
    };
    
    recognition.onerror = (event) => {
        console.error('❌ Erreur reconnaissance:', event.error);
        if (typeof isListening !== 'undefined') isListening = false;
        
        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
            showToast('⚠️ Accès micro refusé. Autorisez le micro dans les paramètres du navigateur.', 'error', 5000);
            speak('Accès au microphone refusé. Veuillez autoriser le microphone.');
        } else if (event.error === 'no-speech') {
            showToast('Aucune parole détectée. Réessayez.', 'warning');
        } else {
            showToast('Erreur de reconnaissance vocale', 'error');
        }
    };
    
    recognition.onend = () => {
        console.log('🎤 Écoute terminée');
        if (typeof isListening !== 'undefined') isListening = false;
    };
    
    // Démarrer la reconnaissance
    try {
        recognition.start();
    } catch (error) {
        console.error('❌ Erreur démarrage:', error);
        showToast('Erreur de démarrage de la reconnaissance vocale', 'error');
        if (typeof isListening !== 'undefined') isListening = false;
    }
}

function confirmPlayerPositionForPublicHelp() {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    const lineInput = document.getElementById('aide-public-line-input');
    const columnInput = document.getElementById('aide-public-column-input');
    
    if (!lineInput || !columnInput) return;
    
    const line = lineInput.value.toUpperCase().trim();
    const column = parseInt(columnInput.value);
    
    if (!line || line.length !== 1 || line < 'A' || line > 'N') {
        showToast('Ligne invalide (A-N)', 'error');
        return;
    }
    
    if (isNaN(column) || column < 1 || column > 16) {
        showToast('Colonne invalide (1-16)', 'error');
        return;
    }
    
    const y = ALPHABET.indexOf(line);
    const x = column;
    
    console.log(`📢 Position du joueur : ${posToCoord(x, y)}`);
    
    closePlayerPositionInputForPublicHelp();
    
    // Déduire les votes
    player.votes -= 20;
    player.addXP(5, 'Aide du public');
    
    // Rechercher l'item avec la position du joueur
    const playerPos = {x, y};
    let closestItem = null;
    let minDistance = Infinity;
    
    itemsOnIsland.forEach(item => {
        if (item.name === selectedItemForPublicHelp && !item.found) {
            const dist = distance(playerPos, {x: item.x, y: item.y});
            if (dist < minDistance) {
                minDistance = dist;
                closestItem = item;
            }
        }
    });
    
    if (closestItem) {
        // Afficher les coordonnées réelles directement
        const coords = posToCoord(closestItem.x, closestItem.y);
        
        const item = ITEMS.find(i => i.name === selectedItemForPublicHelp);
        
        let html = '<h3 style="color: #f39c12; margin-top: 0;">📢 AIDE DU PUBLIC</h3>';
        html += `<div style="font-size: 3rem; margin: 20px 0;">${item.icon}</div>`;
        html += `<p style="font-size: 1.1rem; margin: 15px 0;">L'objet <strong>${item.name}</strong> le plus proche se trouve à :</p>`;
        html += `<div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">`;
        html += `<div style="font-size: 1.5rem; font-weight: bold; color: #f39c12;">${coords}</div>`;
        html += `</div>`;
        html += '<button onclick="closeAidePublicResultPopup()" class="btn btn-primary" style="width: 100%; margin-top: 20px;">OK</button>';
        
        const modal = document.createElement('div');
        modal.id = 'aide-public-result-popup';
        modal.className = 'modal';
        modal.innerHTML = html;
        modal.style.display = 'block';
        
        document.body.appendChild(modal);
        showOverlay();
        
        speak(`L'objet ${item.name} le plus proche se trouve en ${coords}`);
    } else {
        showToast('Aucun objet de ce type trouvé !', 'error');
        speak('Aucun objet de ce type n\'a été trouvé sur l\'île.');
    }
    
    updatePlayerDisplay();
    if (typeof updateOtherPlayersDisplay === 'function') {
        updateOtherPlayersDisplay();
    }
}

function closePlayerPositionInputForPublicHelp() {
    if (typeof stopVoiceRecognition === 'function') {
        stopVoiceRecognition();
    }
    const modal = document.getElementById('aide-public-position-popup');
    if (modal) {
        modal.remove();
        hideOverlay();
    }
}

console.log('✅ Patch Aide du Public chargé');
