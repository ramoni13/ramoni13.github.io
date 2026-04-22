/**
 * LILOCROCO TV SHOW V2 - FOUILLE ET AIDE DU PUBLIC
 */

// ========================================
// FOUILLE AVEC RECONNAISSANCE VOCALE
// ========================================

function doActionFouille() {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    let html = '<h3 style="color: #9b59b6; margin-top: 0;">🔍 FOUILLE</h3>';
    html += '<p style="font-size: 0.9rem; color: #666; margin-bottom: 15px;">Saisissez ou dites les coordonnées (ex: "B 12")</p>';
    
    // Champs de saisie
    html += '<div style="display: flex; gap: 10px; margin-bottom: 15px;">';
    html += '<div style="flex: 1;">';
    html += '<label style="display: block; margin-bottom: 5px; font-weight: bold; color: #000;">Ligne :</label>';
    html += '<input type="text" id="fouille-line-input" style="width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 8px; font-size: 1.2rem; text-align: center; text-transform: uppercase;" maxlength="1" placeholder="B">';
    html += '</div>';
    html += '<div style="flex: 1;">';
    html += '<label style="display: block; margin-bottom: 5px; font-weight: bold; color: #000;">Colonne :</label>';
    html += '<input type="number" id="fouille-column-input" style="width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 8px; font-size: 1.2rem; text-align: center;" min="1" max="16" placeholder="12">';
    html += '</div>';
    html += '</div>';
    
    // Bouton micro (seulement si disponible)
    if (recognition) {
        html += '<button onclick="startFouilleVoiceRecognition()" class="btn btn-info" style="width: 100%; margin-bottom: 15px;">';
        html += '🎤 ÉCOUTER (ou saisissez manuellement)';
        html += '</button>';
    } else {
        html += '<p style="font-size: 0.85rem; color: #999; text-align: center; margin-bottom: 15px; font-style: italic;">';
        html += '⚠️ Reconnaissance vocale non disponible sur ce navigateur';
        html += '</p>';
    }
    
    // Boutons d'action
    html += '<div style="display: flex; gap: 10px;">';
    html += '<button onclick="closeFouillePopup()" class="btn btn-danger" style="flex: 1;">Annuler</button>';
    html += '<button onclick="confirmFouille()" class="btn btn-success" style="flex: 1;">Valider</button>';
    html += '</div>';
    
    const modal = document.createElement('div');
    modal.id = 'fouille-popup';
    modal.className = 'modal';
    modal.innerHTML = html;
    modal.style.display = 'block';
    
    document.body.appendChild(modal);
    showOverlay();
    
    // Focus sur le premier champ
    setTimeout(() => {
        const lineInput = document.getElementById('fouille-line-input');
        const columnInput = document.getElementById('fouille-column-input');
        
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
                    confirmFouille();
                }
            });
        }
    }, 100);
}

function startFouilleVoiceRecognition() {
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
        const lineInput = document.getElementById('fouille-line-input');
        const columnInput = document.getElementById('fouille-column-input');
        
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

function confirmFouille() {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    const lineInput = document.getElementById('fouille-line-input');
    const columnInput = document.getElementById('fouille-column-input');
    
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
    
    console.log(`🔍 Fouille en ${posToCoord(x, y)}`);
    
    // Chercher les items à cette position
    const foundItems = itemsOnIsland.filter(item => 
        item.x === x && item.y === y && !item.found
    );
    
    // Chercher les arbres
    const tree = trees.find(t => t.x === x && t.y === y);
    
    // Chercher les items rares (y compris totem doré)
    let foundRareItem = null;
    if (globalData.itemsRares) {
        for (let itemName in globalData.itemsRares) {
            const itemData = globalData.itemsRares[itemName];
            // Vérifier que l'item a une position
            if (itemData.position && 
                itemData.position.x === x && 
                itemData.position.y === y) {
                
                // Pour le totem doré, pas de vérification de possession
                if (itemName === 'totem_dore') {
                    foundRareItem = RARE_ITEMS.find(i => i.name === itemName);
                    if (foundRareItem) {
                        foundRareItem.globalName = itemName;
                        foundRareItem.votes = itemData.baseVotes || 250; // Ajouter la valeur actuelle
                    }
                    break;
                }
                // Pour les autres items, vérifier qu'ils ne sont pas possédés
                else if (!itemData.possessedBy) {
                    foundRareItem = RARE_ITEMS.find(i => i.name === itemName);
                    if (foundRareItem) {
                        foundRareItem.globalName = itemName;
                    }
                    break;
                }
            }
        }
    }
    
    closeFouillePopup();
    
    // Afficher les résultats
    showFouilleResults(x, y, foundItems, tree, foundRareItem);
    
    // Enregistrer l'action
    player.recordAction('fouille', {
        location: {x, y},
        foundItems: foundItems.length,
        foundTotem: foundItems.some(item => item.name === 'totem')
    });
    
    // XP
    player.addXP(2, 'Fouille');
    if (foundItems.length > 0) {
        player.addXP(foundItems.length * 2, 'Découvertes');
    }
    
    // Jauge volcan si fouille sur le volcan
    if (isInZone({x, y}, ZONES.VOLCAN)) {
        updateVolcanoGauge(3);
    }
    
    // Incrémenter baseVotes du totem doré (+1 par fouille mondiale)
    incrementTotemDoreValue();
}

function showFouilleResults(x, y, foundItems, tree, foundRareItem) {
    const player = players[currentPlayerIndex];
    
    let html = '<h3 style="color: #9b59b6; margin-top: 0;">🔍 RÉSULTATS DE FOUILLE</h3>';
    html += `<p style="font-size: 0.9rem; color: #666; margin-bottom: 15px;">Case ${posToCoord(x, y)}</p>`;
    
    // Items trouvés
    if (foundItems.length > 0 || tree || foundRareItem) {
        html += '<div class="items-found-grid">';
        
        foundItems.forEach(item => {
            html += `<div class="item-card" onclick="pickupItem('${item.name}', ${x}, ${y})" title="${item.description}">${item.icon}</div>`;
        });
        
        if (tree && tree.stock > 0) {
            const fruitName = tree.type === 'cocotier' ? 'coco' : 'banane';
            html += `<div class="item-card" onclick="pickupFruit('${fruitName}', ${x}, ${y})" title="${tree.icon} ${tree.type}">${tree.icon}</div>`;
        }
        
        if (foundRareItem) {
            html += `<div class="item-card" onclick="pickupRareItem('${foundRareItem.globalName}', ${x}, ${y})" title="${foundRareItem.description}" style="border-color: var(--gold); box-shadow: 0 0 20px rgba(241, 196, 15, 0.8);">${foundRareItem.icon}</div>`;
        }
        
        html += '</div>';
        html += '<p style="font-size: 0.85rem; color: #666; margin-top: 15px;">Cliquez sur un item pour le ramasser</p>';
    } else {
        html += '<div style="padding: 40px; text-align: center;">';
        html += '<div style="font-size: 4rem; margin-bottom: 15px;">🚫</div>';
        html += '<p style="font-size: 1.1rem; color: #999;">Rien à cet endroit</p>';
        html += '</div>';
    }
    
    html += '<button onclick="closeFouilleResultsPopup()" class="btn btn-primary" style="width: 100%; margin-top: 20px;">Terminer</button>';
    
    const modal = document.createElement('div');
    modal.id = 'fouille-results-popup';
    modal.className = 'modal';
    modal.innerHTML = html;
    modal.style.display = 'block';
    
    document.body.appendChild(modal);
    showOverlay();
    
    if (foundItems.length > 0 || tree || foundRareItem) {
        const total = foundItems.length + (tree && tree.stock > 0 ? 1 : 0) + (foundRareItem ? 1 : 0);
        speak(`Vous avez trouvé ${total} objet${total > 1 ? 's' : ''} !`);
    } else {
        speak('Rien à cet endroit.');
    }
}

function pickupItem(itemName, x, y) {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    // Trouver l'item
    const itemIndex = itemsOnIsland.findIndex(item => 
        item.name === itemName && item.x === x && item.y === y && !item.found
    );
    
    if (itemIndex === -1) {
        showToast('Item déjà ramassé', 'error');
        return;
    }
    
    const item = {...itemsOnIsland[itemIndex]};
    
    // Marquer comme trouvé
    itemsOnIsland[itemIndex].found = true;
    
    // Cas spécial pour les caméras (Mission Flash)
    if (item.name === 'camera') {
        showMissionFlashStep1(player);
        
        // Faire disparaître la caméra de la popup
        const itemCard = event.target;
        if (itemCard && itemCard.classList.contains('item-card')) {
            itemCard.style.transition = 'all 0.3s ease-out';
            itemCard.style.transform = 'scale(0)';
            itemCard.style.opacity = '0';
            setTimeout(() => itemCard.remove(), 300);
        }
        
        // Régénérer la caméra
        regenerateItem(item);
        return;
    }
    
    // Cas spécial pour les diamants
    if (item.name === 'diamant') {
        const votes = 200;
        player.addVotes(votes, 'Diamant');
        player.addXP(20, 'Diamant');
        player.recordAction('diamant_trouve', { location: {x, y}, votes });
        
        // Mettre à jour l'affichage immédiatement
        updatePlayerDisplay();
        if (typeof updateOtherPlayersDisplay === 'function') {
            updateOtherPlayersDisplay();
        }
        
        // Popup de félicitation
        showDiamantPopup(player, votes);
        
        // Ne PAS régénérer le diamant
    } else {
        showToast(`${player.picto} ${item.icon} ramassé !`, 'success');
        speak(`${item.name} ramassé.`);
        
        // Régénérer l'item ailleurs (sauf diamants)
        regenerateItem(item);
    }
    
    // Faire disparaître l'item de la popup
    const itemCard = event.target;
    if (itemCard && itemCard.classList.contains('item-card')) {
        itemCard.style.transition = 'all 0.3s ease-out';
        itemCard.style.transform = 'scale(0)';
        itemCard.style.opacity = '0';
        
        setTimeout(() => {
            itemCard.remove();
            
            // Vérifier s'il reste des items
            const popup = document.getElementById('fouille-results-popup');
            if (popup) {
                const remainingItems = popup.querySelectorAll('.item-card');
                if (remainingItems.length === 0) {
                    // Plus d'items, afficher message
                    const grid = popup.querySelector('.items-found-grid');
                    if (grid) {
                        grid.innerHTML = '<div style="grid-column: 1 / -1; padding: 20px; text-align: center; color: #999; font-style: italic;">Tous les items ont été ramassés</div>';
                    }
                }
            }
        }, 300);
    }
}

function pickupFruit(fruitName, x, y) {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    const tree = trees.find(t => t.x === x && t.y === y);
    if (!tree || tree.stock <= 0) {
        showToast('Plus de fruits sur cet arbre', 'error');
        return;
    }
    
    const fruit = ITEMS.find(item => item.name === fruitName);
    if (!fruit) return;
    
    tree.stock--;
    showToast(`${player.picto} ${fruit.icon} ramassé !`, 'success');
    speak(`${fruitName} ramassé.`);
    
    // Faire disparaître le fruit de la popup
    const itemCard = event.target;
    if (itemCard && itemCard.classList.contains('item-card')) {
        itemCard.style.transition = 'all 0.3s ease-out';
        itemCard.style.transform = 'scale(0)';
        itemCard.style.opacity = '0';
        
        setTimeout(() => {
            itemCard.remove();
            
            // Vérifier s'il reste des items
            const popup = document.getElementById('fouille-results-popup');
            if (popup) {
                const remainingItems = popup.querySelectorAll('.item-card');
                if (remainingItems.length === 0) {
                    const grid = popup.querySelector('.items-found-grid');
                    if (grid) {
                        grid.innerHTML = '<div style="grid-column: 1 / -1; padding: 20px; text-align: center; color: #999; font-style: italic;">Tous les items ont été ramassés</div>';
                    }
                }
            }
        }, 300);
    }
}

function pickupRareItem(itemName, x, y) {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    const rareItem = RARE_ITEMS.find(item => item.name === itemName);
    if (!rareItem) return;
    
    // Marquer comme possédé dans Firebase
    if (globalData.itemsRares && globalData.itemsRares[itemName]) {
        globalData.itemsRares[itemName].possessedBy = player.name;
        globalData.itemsRares[itemName].possessedByPlayerId = player.playerId; // ID unique du joueur
        globalData.itemsRares[itemName].possessedByPicto = player.picto;
        globalData.itemsRares[itemName].possessionStartTime = new Date().toISOString();
        globalData.itemsRares[itemName].position = null; // Retirer de l'île
        
        if (isFirebaseConnected) {
            const today = new Date().toISOString().split('T')[0];
            database.ref(`global/${today}/itemsRares/${itemName}`).update({
                possessedBy: player.name,
                possessedByPlayerId: player.playerId,
                possessedByPicto: player.picto,
                possessionStartTime: globalData.itemsRares[itemName].possessionStartTime,
                position: null
            });
        }
    }
    
    // Appliquer l'effet
    if (itemName === 'totem_dore') {
        // Totem doré : donner les votes mondiaux et réinitialiser
        const votes = globalData.totemDoreVotes || 250;
        player.addVotes(votes, 'Totem Doré');
        player.addXP(50, 'Totem Doré');
        
        showToast(`${player.picto} 🏆 TOTEM DORÉ ! +${votes} votes !`, 'success', 6000);
        speak(`${player.name} a trouvé le Totem Doré ! Plus ${votes} votes !`);
        
        // Réinitialiser le totem : nouvelle position + 250 votes
        resetTotemDore();
        
    } else if (itemName === 'bracelet_immunite') {
        player.hasImmunity = true;
        player.rareItemPossessed = 'bracelet_immunite';
        player.addXP(30, 'Bracelet Immunité');
        showToast(`${player.picto} 💫 BRACELET D'IMMUNITÉ ! Plus de morsures !`, 'success', 5000);
        speak(`${player.name} a trouvé le Bracelet d'Immunité ! Plus de morsures de crocodiles !`);
        
        // Programmer la libération après 1 heure
        scheduleItemRelease(itemName, 60 * 60 * 1000); // 1 heure
    } else if (itemName === 'lunettes_soleil') {
        player.hasLunettes = true;
        player.rareItemPossessed = 'lunettes_soleil';
        player.addXP(30, 'Lunettes Soleil');
        showToast(`${player.picto} 🕶️ LUNETTES DE SOLEIL ! Missions Flash x2 !`, 'success', 5000);
        speak(`${player.name} a trouvé les Lunettes de Soleil ! Missions Flash doublées !`);
        
        // Programmer la libération après 1 heure
        scheduleItemRelease(itemName, 60 * 60 * 1000); // 1 heure
    }
    
    updateGlobalDataDisplay();
    updatePlayerDisplay();
    
    // Faire disparaître l'item de la popup
    const itemCard = event.target;
    if (itemCard && itemCard.classList.contains('item-card')) {
        itemCard.style.transition = 'all 0.3s ease-out';
        itemCard.style.transform = 'scale(0)';
        itemCard.style.opacity = '0';
        
        setTimeout(() => {
            itemCard.remove();
            
            // Vérifier s'il reste des items
            const popup = document.getElementById('fouille-results-popup');
            if (popup) {
                const remainingItems = popup.querySelectorAll('.item-card');
                if (remainingItems.length === 0) {
                    const grid = popup.querySelector('.items-found-grid');
                    if (grid) {
                        grid.innerHTML = '<div style="grid-column: 1 / -1; padding: 20px; text-align: center; color: #999; font-style: italic;">Tous les items ont été ramassés</div>';
                    }
                }
            }
        }, 300);
    }
}

function regenerateItem(item) {
    // Ne pas régénérer les diamants
    if (item.name === 'diamant') {
        console.log(`💎 Diamant non régénéré (unique)`);
        return;
    }
    
    // Régénérer l'item à une nouvelle position
    let pos = null;
    let attempts = 0;
    
    while (!pos && attempts < 100) {
        const x = random(1, GRID_WIDTH - 2);
        const y = random(1, GRID_HEIGHT - 2);
        const testPos = {x, y};
        
        if (isInZone(testPos, ZONES.MER)) { attempts++; continue; }
        if (isInZone(testPos, ZONES.VOLCAN)) { attempts++; continue; }
        
        const hasItem = itemsOnIsland.some(i => i.x === x && i.y === y && !i.found);
        if (hasItem) { attempts++; continue; }
        
        pos = testPos;
    }
    
    if (pos) {
        itemsOnIsland.push({
            ...item,
            x: pos.x,
            y: pos.y,
            found: false
        });
        console.log(`♻️ ${item.icon} régénéré en ${posToCoord(pos.x, pos.y)}`);
    }
}

/**
 * Affiche une popup de félicitation pour un diamant
 */
function showDiamantPopup(player, votes) {
    let html = '<h3 style="color: var(--gold); margin-top: 0; font-size: 2rem;">🎉 FÉLICITATIONS ! 🎉</h3>';
    html += '<div style="font-size: 5rem; margin: 30px 0; animation: pulse 1s infinite;">💎</div>';
    html += `<p style="font-size: 1.5rem; font-weight: bold; color: var(--gold); margin: 20px 0;">DIAMANT TROUVÉ !</p>`;
    html += `<p style="font-size: 1.2rem; margin: 15px 0;">${player.picto} <strong>${player.name}</strong></p>`;
    html += `<div style="background: linear-gradient(135deg, #f1c40f 0%, #f39c12 100%); padding: 20px; border-radius: 15px; margin: 20px 0;">`;
    html += `<div style="font-size: 2.5rem; font-weight: bold; color: #000;">+${votes} VOTES</div>`;
    html += `</div>`;
    html += '<p style="font-size: 0.9rem; color: #666; margin-top: 15px;">Le diamant ne sera pas régénéré</p>';
    html += '<button onclick="closeDiamantPopup()" class="btn btn-primary" style="width: 100%; margin-top: 20px; padding: 15px; font-size: 1.2rem;">CONTINUER</button>';
    
    // Ajouter l'animation pulse
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(style);
    
    const modal = document.createElement('div');
    modal.id = 'diamant-popup';
    modal.className = 'modal';
    modal.style.maxWidth = '500px';
    modal.innerHTML = html;
    modal.style.display = 'block';
    
    document.body.appendChild(modal);
    showOverlay();
    
    speak(`Félicitations ${player.name} ! Vous avez trouvé un diamant ! Plus ${votes} votes !`);
}

function closeDiamantPopup() {
    const modal = document.getElementById('diamant-popup');
    if (modal) {
        modal.remove();
        hideOverlay();
    }
    
    // Fermer aussi la popup de résultats de fouille
    closeFouilleResultsPopup();
}

function closeFouillePopup() {
    stopVoiceRecognition();
    const modal = document.getElementById('fouille-popup');
    if (modal) {
        modal.remove();
        hideOverlay();
    }
}

function closeFouilleResultsPopup() {
    const modal = document.getElementById('fouille-results-popup');
    if (modal) {
        modal.remove();
        hideOverlay();
    }
}

// ========================================
// AIDE DU PUBLIC
// ========================================

function doActionAidePublic() {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    if (player.votes < 20) {
        showToast('Pas assez de votes ! (20 requis)', 'error');
        speak('Vous n\'avez pas assez de votes pour l\'aide du public.');
        return;
    }
    
    // Demander quel item chercher
    let html = '<h3 style="color: #f39c12; margin-top: 0;">📢 AIDE DU PUBLIC</h3>';
    html += '<p style="font-size: 0.9rem; color: #666; margin-bottom: 15px;">Quel objet cherchez-vous ?<br><strong>Coût : 20 votes</strong></p>';
    
    html += '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 20px 0;">';
    
    const searchableItems = ITEMS.filter(item => 
        !['banane', 'coco', 'mangue', 'diamant', 'camera', 'totem'].includes(item.name)
    );
    
    searchableItems.forEach(item => {
        html += `<div class="item-card" onclick="searchItemWithPublicHelp('${item.name}')" title="${item.description}">${item.icon}</div>`;
    });
    
    html += '</div>';
    html += '<button onclick="closeAidePublicPopup()" class="btn btn-danger" style="width: 100%; margin-top: 10px;">Annuler</button>';
    
    const modal = document.createElement('div');
    modal.id = 'aide-public-popup';
    modal.className = 'modal';
    modal.innerHTML = html;
    modal.style.display = 'block';
    
    document.body.appendChild(modal);
    showOverlay();
}

function searchItemWithPublicHelp(itemName) {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    // Déduire les votes
    player.votes -= 20;
    player.addXP(5, 'Aide du public');
    
    // Trouver l'item le plus proche
    const playerPos = player.position;
    let closestItem = null;
    let minDistance = Infinity;
    
    itemsOnIsland.forEach(item => {
        if (item.name === itemName && !item.found) {
            const dist = distance(playerPos, {x: item.x, y: item.y});
            if (dist < minDistance) {
                minDistance = dist;
                closestItem = item;
            }
        }
    });
    
    closeAidePublicPopup();
    
    if (closestItem) {
        // Encoder les coordonnées
        const encoded = encodeCoordinates(player, closestItem.x, closestItem.y);
        
        const item = ITEMS.find(i => i.name === itemName);
        
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
    updateOtherPlayersDisplay();
}

function closeAidePublicPopup() {
    const modal = document.getElementById('aide-public-popup');
    if (modal) {
        modal.remove();
        hideOverlay();
    }
}

function closeAidePublicResultPopup() {
    const modal = document.getElementById('aide-public-result-popup');
    if (modal) {
        modal.remove();
        hideOverlay();
    }
}

/**
 * Programme la libération d'un item rare après un délai
 */
function scheduleItemRelease(itemName, delay) {
    setTimeout(() => {
        releaseRareItem(itemName, 'Temps écoulé (1h)');
    }, delay);
}

/**
 * Libère un item rare et le replace sur l'île
 */
async function releaseRareItem(itemName, reason) {
    console.log(`🔓 Libération de ${itemName} : ${reason}`);
    
    if (!globalData.itemsRares || !globalData.itemsRares[itemName]) return;
    
    const itemData = globalData.itemsRares[itemName];
    const previousOwner = itemData.possessedBy;
    
    // Trouver une nouvelle position aléatoire
    const availablePositions = [];
    for (let x = 1; x < GRID_WIDTH - 1; x++) {
        for (let y = 1; y < GRID_HEIGHT - 1; y++) {
            const pos = {x, y};
            if (isInZone(pos, ZONES.MER)) continue;
            availablePositions.push(pos);
        }
    }
    
    const shuffled = shuffle(availablePositions);
    const newPosition = shuffled[0];
    
    // Mettre à jour les données
    itemData.possessedBy = null;
    itemData.possessedByPicto = null;
    itemData.possessionStartTime = null;
    itemData.possessedByPlayerId = null;
    itemData.position = newPosition;
    
    if (isFirebaseConnected) {
        const today = new Date().toISOString().split('T')[0];
        await database.ref(`global/${today}/itemsRares/${itemName}`).update({
            possessedBy: null,
            possessedByPicto: null,
            possessionStartTime: null,
            possessedByPlayerId: null,
            position: newPosition
        });
    }
    
    // Retirer l'item du joueur s'il le possède encore
    // Vérifier par ID de joueur (plus fiable que le nom)
    const possessedByPlayerId = itemData.possessedByPlayerId;
    
    players.forEach(player => {
        // Vérifier par ID OU par nom (pour compatibilité avec anciennes données)
        const isOwner = (possessedByPlayerId && player.playerId === possessedByPlayerId) ||
                       (player.rareItemPossessed === itemName);
        
        if (isOwner) {
            console.log(`   👤 Retrait de l'item du joueur ${player.name} (ID: ${player.playerId})`);
            player.rareItemPossessed = null;
            if (itemName === 'bracelet_immunite') {
                player.hasImmunity = false;
            } else if (itemName === 'lunettes_soleil') {
                player.hasLunettes = false;
            }
        }
    });
    
    const item = RARE_ITEMS.find(i => i.name === itemName);
    showToast(`${item.icon} ${item.name.replace('_', ' ').toUpperCase()} libéré ! Nouvelle position : ${posToCoord(newPosition.x, newPosition.y)}`, 'info', 5000);
    
    updateGlobalDataDisplay();
}

/**
 * Libère tous les items rares possédés (fin de partie ou 1h)
 */
async function releaseAllRareItems(reason = 'Fin de partie') {
    console.log(`🔓 Libération de tous les items rares : ${reason}`);
    console.log(`   Joueurs de la partie actuelle :`);
    players.forEach(p => console.log(`     - ${p.name} (ID: ${p.playerId})`));
    
    if (!globalData.itemsRares) {
        console.log('⚠️ Aucun item rare dans globalData');
        return;
    }
    
    // Créer un Set des IDs des joueurs de la partie actuelle
    const currentPlayerIds = new Set(players.map(p => p.playerId));
    console.log(`   IDs des joueurs actuels :`, Array.from(currentPlayerIds));
    
    let releasedCount = 0;
    
    for (let itemName in globalData.itemsRares) {
        const itemData = globalData.itemsRares[itemName];
        
        // Ignorer le totem doré (non possédable)
        if (itemName === 'totem_dore') {
            console.log(`   🏆 ${itemName} : ignoré (non possédable)`);
            continue;
        }
        
        // Vérifier si l'item est possédé
        if (!itemData.possessedBy) {
            console.log(`   💫 ${itemName} : déjà libre`);
            continue;
        }
        
        // Vérifier si le possédant fait partie de la partie actuelle
        const possessedByPlayerId = itemData.possessedByPlayerId;
        
        if (possessedByPlayerId && currentPlayerIds.has(possessedByPlayerId)) {
            // Le joueur fait partie de la partie actuelle, libérer l'item
            console.log(`   ✅ ${itemName} : possédé par ${itemData.possessedBy} (ID: ${possessedByPlayerId}) - LIBÉRATION`);
            await releaseRareItem(itemName, reason);
            releasedCount++;
        } else {
            // Le joueur ne fait PAS partie de la partie actuelle, ne pas libérer
            console.log(`   ❌ ${itemName} : possédé par ${itemData.possessedBy} (ID: ${possessedByPlayerId}) - AUTRE PARTIE, pas de libération`);
        }
    }
    
    if (releasedCount > 0) {
        console.log(`✅ ${releasedCount} item(s) rare(s) libéré(s)`);
        showToast(`🔓 ${releasedCount} item(s) rare(s) remis sur l'île !`, 'info', 4000);
    } else {
        console.log('ℹ️ Aucun item rare à libérer pour cette partie');
    }
}

/**
 * Réinitialise le totem doré : nouvelle position + 250 votes
 */
async function resetTotemDore() {
    console.log('🏆 Réinitialisation du Totem Doré...');
    
    if (!globalData.itemsRares || !globalData.itemsRares.totem_dore) return;
    
    // Trouver une nouvelle position aléatoire
    const availablePositions = [];
    for (let x = 1; x < GRID_WIDTH - 1; x++) {
        for (let y = 1; y < GRID_HEIGHT - 1; y++) {
            const pos = {x, y};
            if (isInZone(pos, ZONES.MER)) continue;
            availablePositions.push(pos);
        }
    }
    
    const shuffled = shuffle(availablePositions);
    const newPosition = shuffled[0];
    
    // Réinitialiser les données locales
    globalData.itemsRares.totem_dore.position = newPosition;
    globalData.totemDoreVotes = 250;
    
    if (isFirebaseConnected) {
        const today = new Date().toISOString().split('T')[0];
        
        // Mettre à jour la position dans global/{date}/
        await database.ref(`global/${today}/itemsRares/totem_dore`).update({
            position: newPosition
        });
        
        // Réinitialiser la valeur mondiale dans world/
        await database.ref('world/totemDore').set({
            baseVotes: 250
        });
        
        console.log('🏆 Valeur mondiale du totem réinitialisée à 250 dans world/');
    }
    
    console.log(`🏆 Totem Doré réinitialisé en ${posToCoord(newPosition.x, newPosition.y)} avec 250 votes`);
    showToast(`🏆 Le Totem Doré a été replacé sur l'île !`, 'info', 4000);
    
    updateGlobalDataDisplay();
}

/**
 * Incrémente la valeur mondiale du totem doré (+1 par fouille mondiale)
 */
async function incrementTotemDoreValue() {
    if (!isFirebaseConnected) {
        console.log('⚠️ Firebase non connecté, valeur totem non incrémentée');
        // Incrémenter localement quand même
        globalData.totemDoreVotes = (globalData.totemDoreVotes || 250) + 1;
        return;
    }
    
    try {
        const totemRef = database.ref('world/totemDore/baseVotes');
        
        // Incrémenter de 1 dans la base mondiale
        const snapshot = await totemRef.once('value');
        const currentValue = snapshot.val() || 250;
        const newValue = currentValue + 1;
        
        await totemRef.set(newValue);
        
        // Mettre à jour localement
        globalData.totemDoreVotes = newValue;
        
        // Mettre à jour aussi dans itemsRares pour compatibilité
        if (globalData.itemsRares && globalData.itemsRares.totem_dore) {
            globalData.itemsRares.totem_dore.baseVotes = newValue;
        }
        
        console.log(`🏆 Totem Doré mondial : ${currentValue} → ${newValue} votes`);
        
        // Mettre à jour l'affichage
        updateGlobalDataDisplay();
    } catch (error) {
        console.error('❌ Erreur incrémentation totem:', error);
    }
}

// ========================================
// MISSIONS FLASH (CAMÉRAS)
// ========================================

/**
 * Étape 1 : Affiche la popup "Piochez 1 carte Action"
 */
function showMissionFlashStep1(player) {
    let html = '<h3 style="color: #9b59b6; margin-top: 0;">🎥 CAMÉRA TROUVÉE !</h3>';
    html += '<div style="font-size: 4rem; margin: 30px 0;">🎥</div>';
    html += '<p style="font-size: 1.3rem; font-weight: bold; margin: 20px 0;">Piochez 1 carte Face Cam</p>';
    html += '<p style="font-size: 0.9rem; color: #666; margin: 15px 0;">Vous allez devoir réaliser un face caméra</p>';
    html += '<button onclick="showMissionFlashStep2()" class="btn btn-primary" style="width: 100%; padding: 15px; font-size: 1.2rem; margin-top: 20px;">OK</button>';
    
    const modal = document.createElement('div');
    modal.id = 'mission-flash-step1-popup';
    modal.className = 'modal';
    modal.innerHTML = html;
    modal.style.display = 'block';
    
    document.body.appendChild(modal);
    showOverlay();
    
    speak('Caméra trouvée ! Piochez une carte Face Cam.');
}

/**
 * Étape 2 : Affiche les 4 types de cartes avec les votes
 */
function showMissionFlashStep2() {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    // Fermer la popup précédente
    const step1Modal = document.getElementById('mission-flash-step1-popup');
    if (step1Modal) step1Modal.remove();
    
    // Types de cartes Action
    const cardTypes = [
        { name: 'Stratégie', icon: '🧠', description: 'Pourquoi ces choix' },
        { name: 'Immersion', icon: '🏝️', description: 'Vit sur l\'ile' },
        { name: 'Drama', icon: '😡', description: 'Expression d\'une tension' },
        { name: 'Performance', icon: '🎭', description: 'Exploit devant la caméra' }
    ];
    
    // Valeurs fixes
    const voteValues = [50, 30, 20, 0];
    
    // Mélanger les types de cartes
    const shuffledCards = shuffle([...cardTypes]);
    
    // Associer les valeurs (du plus au moins)
    const cardsWithVotes = shuffledCards.map((card, index) => ({
        ...card,
        votes: voteValues[index]
    }));
    
    // Trier par votes décroissants
    cardsWithVotes.sort((a, b) => b.votes - a.votes);
    
    let html = '<h3 style="color: #9b59b6; margin-top: 0;">🎬 FACE CAM</h3>';
    html += '<p style="font-size: 0.9rem; color: #666; margin-bottom: 20px;">Choisissez le type de carte que vous avez en main</p>';
    
    html += '<div style="display: flex; flex-direction: column; gap: 12px; margin: 20px 0;">';
    
    cardsWithVotes.forEach(card => {
        const voteColor = card.votes === 50 ? 'var(--gold)' : 
                         card.votes === 30 ? '#2ecc71' : 
                         card.votes === 20 ? '#3498db' : '#999';
        
        html += `<button onclick="completeMissionFlash('${card.name}', ${card.votes})" class="btn" style="width: 100%; padding: 20px; background: linear-gradient(135deg, rgba(155, 89, 182, 0.2) 0%, rgba(142, 68, 173, 0.2) 100%); border: 2px solid #9b59b6; color: #000; text-align: left; display: flex; justify-content: space-between; align-items: center;">`;
        html += `<div style="display: flex; align-items: center; gap: 15px;">`;
        html += `<span style="font-size: 2rem;">${card.icon}</span>`;
        html += `<div>`;
        html += `<div style="font-weight: bold; font-size: 1.1rem;">${card.name}</div>`;
        html += `<div style="font-size: 0.8rem; color: #666; margin-top: 3px;">${card.description}</div>`;
        html += `</div>`;
        html += `</div>`;
        html += `<div style="font-size: 1.8rem; font-weight: bold; color: ${voteColor};">${card.votes > 0 ? '+' + card.votes : card.votes}</div>`;
        html += `</button>`;
    });
    
    html += '</div>';
    html += '<p style="font-size: 0.75rem; color: #999; text-align: center; margin-top: 15px; font-style: italic;">Vous devez défausser la carte correspondante</p>';
    
    const modal = document.createElement('div');
    modal.id = 'mission-flash-step2-popup';
    modal.className = 'modal';
    modal.style.maxWidth = '500px';
    modal.innerHTML = html;
    modal.style.display = 'block';
    
    document.body.appendChild(modal);
    showOverlay();
    
    speak('Choisissez le type de carte que vous avez en main.');
}

/**
 * Complète la mission flash et attribue les votes
 */
function completeMissionFlash(cardType, votes) {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    // Fermer la popup
    const step2Modal = document.getElementById('mission-flash-step2-popup');
    if (step2Modal) step2Modal.remove();
    hideOverlay();
    
    // Appliquer le bonus lunettes de soleil (x2)
    let finalVotes = votes;
    if (player.hasLunettes && votes > 0) {
        finalVotes *= 2;
        showToast(`🕶️ Lunettes de Soleil : votes doublés !`, 'info', 2000);
    }
    
    // Attribuer les votes
    if (finalVotes > 0) {
        player.addVotes(finalVotes, `Mission Flash : ${cardType}` + (player.hasLunettes ? ' (x2)' : ''));
        player.addXP(10, 'Mission Flash');
        
        showToast(`${player.picto} Mission Flash ${cardType} ! +${finalVotes} votes`, 'success', 4000);
        speak(`Mission Flash ${cardType} réussie ! Plus ${finalVotes} votes !`);
    } else {
        showToast(`${player.picto} Mission Flash ${cardType} : 0 votes`, 'warning', 3000);
        speak(`Mission Flash ${cardType}. Aucun vote gagné.`);
    }
    
    // Enregistrer l'action
    player.recordAction('mission_flash', { 
        cardType, 
        votes: finalVotes,
        baseVotes: votes,
        hasLunettes: player.hasLunettes
    });
    
    updatePlayerDisplay();
    if (typeof updateOtherPlayersDisplay === 'function') {
        updateOtherPlayersDisplay();
    }
}

console.log('✅ Fouille et Aide du Public chargés');
