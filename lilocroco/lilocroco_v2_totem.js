/**
 * LILOCROCO TV SHOW V2 - SCAN TOTEM
 */

// ========================================
// SCAN TOTEM
// ========================================

/**
 * Lance le scan du totem
 */
function doActionTotem() {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    // Vérifier si le joueur a un totem
    // const hasTotem = player.hasItem('totem');
    
    // if (!hasTotem) {
    //     showToast('⚠️ Vous devez avoir un totem pour scanner !', 'warning', 4000);
    //     speak('Vous devez avoir un totem pour scanner la zone.');
    //     return;
    // }
    
    // Afficher la popup de saisie des coordonnées
    showTotemCoordinatesInput();
}

/**
 * Affiche la popup de saisie des coordonnées pour le scan
 */
function showTotemCoordinatesInput() {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    let html = '<h3 style="color: #8b4513; margin-top: 0;">🗿 SCAN TOTEM</h3>';
    html += '<p style="font-size: 0.9rem; color: #666; margin-bottom: 15px;">Saisissez ou dites les coordonnées du centre de la zone à scanner (7x7 cases)</p>';
    
    // Champs de saisie
    html += '<div style="display: flex; gap: 10px; margin-bottom: 15px;">';
    html += '<div style="flex: 1;">';
    html += '<label style="display: block; margin-bottom: 5px; font-weight: bold; color: #000;">Ligne :</label>';
    html += '<input type="text" id="totem-line-input" style="width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 8px; font-size: 1.2rem; text-align: center; text-transform: uppercase;" maxlength="1" placeholder="B">';
    html += '</div>';
    html += '<div style="flex: 1;">';
    html += '<label style="display: block; margin-bottom: 5px; font-weight: bold; color: #000;">Colonne :</label>';
    html += '<input type="number" id="totem-column-input" style="width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 8px; font-size: 1.2rem; text-align: center;" min="1" max="16" placeholder="12">';
    html += '</div>';
    html += '</div>';
    
    // Bouton micro (seulement si disponible)
    if (recognition) {
        html += '<button onclick="startTotemVoiceRecognition()" class="btn btn-info" style="width: 100%; margin-bottom: 15px;">';
        html += '🎤 ÉCOUTER (ou saisissez manuellement)';
        html += '</button>';
    } else {
        html += '<p style="font-size: 0.85rem; color: #999; text-align: center; margin-bottom: 15px; font-style: italic;">';
        html += '⚠️ Reconnaissance vocale non disponible sur ce navigateur';
        html += '</p>';
    }
    
    // Boutons d'action
    html += '<div style="display: flex; gap: 10px;">';
    html += '<button onclick="closeTotemCoordinatesPopup()" class="btn btn-danger" style="flex: 1;">Annuler</button>';
    html += '<button onclick="confirmTotemCoordinates()" class="btn btn-success" style="flex: 1;">Valider</button>';
    html += '</div>';
    
    const modal = document.createElement('div');
    modal.id = 'totem-coordinates-popup';
    modal.className = 'modal';
    modal.innerHTML = html;
    modal.style.display = 'block';
    
    document.body.appendChild(modal);
    showOverlay();
    
    // Focus sur le premier champ
    setTimeout(() => {
        const lineInput = document.getElementById('totem-line-input');
        const columnInput = document.getElementById('totem-column-input');
        
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
                    confirmTotemCoordinates();
                }
            });
        }
    }, 100);
}

/**
 * Démarre la reconnaissance vocale pour le totem
 */
function startTotemVoiceRecognition() {
    if (!recognition) {
        showToast('Reconnaissance vocale non disponible sur ce navigateur', 'error');
        speak('La reconnaissance vocale n\'est pas disponible. Veuillez saisir manuellement.');
        return;
    }
    
    showToast('🎤 Écoute en cours... Parlez maintenant !', 'info', 3000);
    speak('Dites les coordonnées.');
    
    // Arrêter toute reconnaissance en cours
    if (isListening) {
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
        isListening = true;
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
        const lineInput = document.getElementById('totem-line-input');
        const columnInput = document.getElementById('totem-column-input');
        
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
        isListening = false;
        
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
        isListening = false;
    };
    
    // Démarrer la reconnaissance
    try {
        recognition.start();
    } catch (error) {
        console.error('❌ Erreur démarrage:', error);
        showToast('Erreur de démarrage de la reconnaissance vocale', 'error');
        isListening = false;
    }
}

/**
 * Valide les coordonnées et passe à la sélection d'item
 */
function confirmTotemCoordinates() {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    const lineInput = document.getElementById('totem-line-input');
    const columnInput = document.getElementById('totem-column-input');
    
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
    
    console.log(`🗿 Scan totem centré sur ${posToCoord(x, y)}`);
    
    closeTotemCoordinatesPopup();
    
    // Passer à la sélection d'item
    showTotemItemSelection(x, y);
}

/**
 * Affiche la sélection d'item à scanner
 */
function showTotemItemSelection(centerX, centerY) {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    let html = '<h3 style="color: #8b4513; margin-top: 0;">🗿 SCAN TOTEM</h3>';
    html += `<p style="font-size: 0.9rem; color: #666; margin-bottom: 15px;">Zone de scan : ${posToCoord(centerX, centerY)} (7x7 cases)<br>Quel objet cherchez-vous ?</p>`;
    
    html += '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 20px 0;">';
    
    // Items recherchables (sauf diamants, caméras et totems)
    const searchableItems = ITEMS.filter(item => 
        !['banane', 'coco', 'mangue', 'diamant', 'camera', 'totem'].includes(item.name)
    );
    
    searchableItems.forEach(item => {
        html += `<div class="item-card" onclick="scanTotemForItem('${item.name}', ${centerX}, ${centerY})" title="${item.description}">${item.icon}</div>`;
    });
    
    html += '</div>';
    html += '<button onclick="closeTotemItemSelectionPopup()" class="btn btn-danger" style="width: 100%; margin-top: 10px;">Annuler</button>';
    
    const modal = document.createElement('div');
    modal.id = 'totem-item-selection-popup';
    modal.className = 'modal';
    modal.innerHTML = html;
    modal.style.display = 'block';
    
    document.body.appendChild(modal);
    showOverlay();
}

/**
 * Scanne la zone 7x7 pour un item spécifique
 */
function scanTotemForItem(itemName, centerX, centerY) {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    console.log(`🗿 Scan totem pour ${itemName} autour de ${posToCoord(centerX, centerY)}`);
    
    // Définir la zone 7x7 (3 cases dans chaque direction)
    const foundPositions = [];
    
    for (let dx = -3; dx <= 3; dx++) {
        for (let dy = -3; dy <= 3; dy++) {
            const scanX = centerX + dx;
            const scanY = centerY + dy;
            
            // Vérifier que la position est valide
            if (!isValidPosition(scanX, scanY)) continue;
            
            // Chercher l'item à cette position
            const itemsAtPos = itemsOnIsland.filter(item => 
                item.name === itemName && 
                item.x === scanX && 
                item.y === scanY && 
                !item.found
            );
            
            if (itemsAtPos.length > 0) {
                foundPositions.push({x: scanX, y: scanY});
            }
        }
    }
    
    closeTotemItemSelectionPopup();
    
    // Afficher les résultats
    showTotemScanResults(itemName, centerX, centerY, foundPositions);
    
    // Enregistrer l'action
    player.recordAction('totem_scan', {
        itemName,
        center: {x: centerX, y: centerY},
        foundCount: foundPositions.length
    });
    
    // XP
    player.addXP(5, 'Scan totem');
}

/**
 * Affiche les résultats du scan
 */
function showTotemScanResults(itemName, centerX, centerY, foundPositions) {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    const item = ITEMS.find(i => i.name === itemName);
    if (!item) return;
    
    let html = '<h3 style="color: #8b4513; margin-top: 0;">🗿 RÉSULTATS DU SCAN</h3>';
    html += `<div style="font-size: 3rem; margin: 20px 0;">${item.icon}</div>`;
    html += `<p style="font-size: 1.1rem; margin: 15px 0;">Zone scannée : <strong>${posToCoord(centerX, centerY)}</strong> (7x7 cases)</p>`;
    html += `<p style="font-size: 1rem; margin: 15px 0;">Objet recherché : <strong>${item.name}</strong></p>`;
    
    if (foundPositions.length > 0) {
        html += `<div style="background: #d4edda; border: 2px solid #28a745; padding: 20px; border-radius: 10px; margin: 20px 0;">`;
        html += `<div style="font-size: 1.3rem; font-weight: bold; color: #155724; margin-bottom: 15px;">✅ ${foundPositions.length} objet(s) trouvé(s) !</div>`;
        
        html += '<div style="text-align: left;">';
        foundPositions.forEach((pos, index) => {
            // Encoder les coordonnées avec la carte du joueur
            const encoded = encodeCoordinates(player, pos.x, pos.y);
            html += `<div style="background: white; padding: 12px; margin: 8px 0; border-radius: 8px; border-left: 4px solid #28a745;">`;
            html += `<div style="font-weight: bold; color: #000; font-size: 1.1rem;">${item.icon} Position ${index + 1}</div>`;
            html += `<div style="font-size: 1.3rem; color: #28a745; margin-top: 5px; font-weight: bold;">${encoded}</div>`;
            html += `</div>`;
        });
        html += '</div>';
        
        html += `<p style="font-size: 0.85rem; color: #666; margin-top: 15px; font-style: italic;">Utilisez votre livret de décodage personnel</p>`;
        html += `</div>`;
        
        speak(`Scan terminé ! ${foundPositions.length} objet${foundPositions.length > 1 ? 's' : ''} ${item.name} trouvé${foundPositions.length > 1 ? 's' : ''} dans la zone !`);
    } else {
        html += `<div style="background: #f8d7da; border: 2px solid #dc3545; padding: 20px; border-radius: 10px; margin: 20px 0;">`;
        html += `<div style="font-size: 1.3rem; font-weight: bold; color: #721c24;">❌ Aucun objet trouvé</div>`;
        html += `<p style="color: #721c24; margin-top: 10px;">L'objet <strong>${item.name}</strong> n'est pas présent dans cette zone.</p>`;
        html += `</div>`;
        
        speak(`Scan terminé. Aucun ${item.name} trouvé dans cette zone.`);
    }
    
    html += '<button onclick="closeTotemScanResultsPopup()" class="btn btn-primary" style="width: 100%; margin-top: 20px; padding: 15px; font-size: 1.2rem;">OK</button>';
    
    const modal = document.createElement('div');
    modal.id = 'totem-scan-results-popup';
    modal.className = 'modal';
    modal.style.maxWidth = '600px';
    modal.innerHTML = html;
    modal.style.display = 'block';
    
    document.body.appendChild(modal);
    showOverlay();
}

/**
 * Ferme les popups du totem
 */
function closeTotemCoordinatesPopup() {
    stopVoiceRecognition();
    const modal = document.getElementById('totem-coordinates-popup');
    if (modal) {
        modal.remove();
        hideOverlay();
    }
}

function closeTotemItemSelectionPopup() {
    const modal = document.getElementById('totem-item-selection-popup');
    if (modal) {
        modal.remove();
        hideOverlay();
    }
}

function closeTotemScanResultsPopup() {
    const modal = document.getElementById('totem-scan-results-popup');
    if (modal) {
        modal.remove();
        hideOverlay();
    }
}

console.log('✅ Scan Totem chargé');
