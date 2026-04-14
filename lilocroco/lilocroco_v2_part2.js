/**
 * LILOCROCO TV SHOW V2 - PARTIE 2
 * Actions, Aide du Public, Missions, Fin de tour
 */

// Ce fichier doit être chargé APRÈS lilocroco_v2.js

// ========================================
// ACTIONS DU JOUEUR (suite)
// ========================================

/**
 * Aide du public
 */
function doAidePublic() {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    if (player.votes < 20) {
        showToast('Pas assez de votes ! (20 requis)', 'error');
        speak("Vous n\\'avez pas assez de votes pour l\\'aide du public.");
        return;
    }
    
    // Demander quel item chercher
    let html = '<h3 style="color: #f39c12; margin-top: 0;">📢 AIDE DU PUBLIC</h3>';
    html += '<p style="font-size: 0.9rem; color: #666; margin-bottom: 15px;">Quel objet cherchez-vous ?<br><strong>Coût : 20 votes</strong></p>';
    
    html += '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 20px 0;">';
    
    const searchableItems = ITEMS.filter(item => 
        !['banane', 'coco', 'mangue', 'diamant', 'camera'].includes(item.name)
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
        html += `<div style="font-size: 1.5rem; font-weight: bold; color: #f39c12;">${encoded}</div>`;
        html += `</div>`;
        html += `<p style="font-size: 0.85rem; color: #999; margin-top: 15px;">Utilisez votre livret de décodage personnel</p>`;
        html += '<button onclick="closeAidePublicResultPopup()" class="btn btn-primary" style="width: 100%; margin-top: 20px;">OK</button>';
        
        const modal = document.createElement('div');
        modal.id = 'aide-public-result-popup';
        modal.className = 'modal';
        modal.innerHTML = html;
        modal.style.display = 'block';
        
        document.body.appendChild(modal);
        showOverlay();
        
        speak(`L'objet ${item.name} le plus proche se trouve en ${encoded}`);
    } else {
        showToast('Aucun objet de ce type trouvé !', 'error');
        speak("Aucun objet de ce type n\\'a été trouvé sur l\\'île.");
    }
    
    updatePlayerDisplay();
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
 * Missions
 */
function doMission() {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    let html = '<h3 style="color: var(--gold); margin-top: 0;">🎯 MISSIONS</h3>';
    html += '<p style="font-size: 0.9rem; color: #666; margin-bottom: 20px;">Quelle mission avez-vous accomplie ?</p>';
    
    html += '<div style="display: flex; flex-direction: column; gap: 10px;">';
    html += '<button onclick="scanSecretMission()" class="btn btn-purple" style="width: 100%;">🔒 Mission Secrète</button>';
    html += '<button onclick="validateTemporaryMission()" class="btn btn-info" style="width: 100%;">⏱️ Mission Temporaire</button>';
    html += '</div>';
    
    html += '<button onclick="closeMissionPopup()" class="btn btn-danger" style="width: 100%; margin-top: 20px;">Annuler</button>';
    
    const modal = document.createElement('div');
    modal.id = 'mission-popup';
    modal.className = 'modal';
    modal.innerHTML = html;
    modal.style.display = 'block';
    
    document.body.appendChild(modal);
    showOverlay();
}

function scanSecretMission() {
    closeMissionPopup();
    showToast('Scannez votre QR Code de mission secrète', 'info');
    // TODO: Implémenter le scan de mission secrète
    speak('Scannez votre QR Code de mission secrète pour valider.');
}

function validateTemporaryMission() {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    closeMissionPopup();
    
    // TODO: Vérifier si le joueur a accompli la mission temporaire
    showToast('Mission temporaire validée !', 'success');
    speak('Mission temporaire validée ! Vous gagnez des votes !');
}

function closeMissionPopup() {
    const modal = document.getElementById('mission-popup');
    if (modal) {
        modal.remove();
        hideOverlay();
    }
}

// ========================================
// FIN DE TOUR
// ========================================

/**
 * Termine le tour du joueur actuel
 */
function endTurn() {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    console.log(`✅ Fin du tour de ${player.name}`);
    
    // Vérifier si le joueur est évacué
    if (player.evacuated) {
        showToast(`${player.picto} ${player.name} a été évacué !`, 'danger', 5000);
        speak(`${player.name} a été évacué de l'île !`);
        checkGameEnd();
        return;
    }
    
    // Passer au joueur suivant
    currentPlayerIndex++;
    
    // Si tous les joueurs ont joué
    if (currentPlayerIndex >= players.length) {
        endRound();
    } else {
        // Joueur suivant
        const nextPlayer = players[currentPlayerIndex];
        updatePlayerDisplay();
        
        showToast(`Au tour de ${nextPlayer.picto} ${nextPlayer.name}`, 'info', 3000);
        speak(`Au tour de ${nextPlayer.name}`);
    }
}

/**
 * Termine un tour complet (tous les joueurs ont joué)
 */
function endRound() {
    console.log(`🔄 Fin du tour ${currentTurn}`);
    
    // Incrémenter le tour
    currentTurn++;
    currentPlayerIndex = 0;
    
    // Changer la météo
    changeWeather();
    
    // Vérifier fin de partie
    if (currentTurn > maxTurns) {
        endGame();
        return;
    }
    
    // Afficher le nouveau tour
    updateWeatherDisplay();
    updatePlayerDisplay();
    
    showToast(`🎯 Tour ${currentTurn}/${maxTurns}`, 'info', 3000);
    speak(`Début du tour ${currentTurn}. C'est au tour de ${players[0].name}.`);
}

/**
 * Vérifie si la partie doit se terminer
 */
function checkGameEnd() {
    // Vérifier si tous les joueurs sont évacués
    const activePlayers = players.filter(p => !p.evacuated);
    
    if (activePlayers.length === 0) {
        showToast('Tous les joueurs ont été évacués !', 'danger', 5000);
        speak('Tous les aventuriers ont été évacués ! Fin de la partie.');
        endGame();
        return true;
    }
    
    // Vérifier si le nombre de tours max est atteint
    if (currentTurn > maxTurns) {
        endGame();
        return true;
    }
    
    return false;
}

/**
 * Termine la partie et affiche le classement
 */
function endGame() {
    console.log('🏁 FIN DE LA PARTIE');
    gameEnded = true;
    
    // Trier les joueurs par votes
    const sortedPlayers = [...players].sort((a, b) => b.votes - a.votes);
    
    // Calculer les bonus XP
    sortedPlayers.forEach((player, index) => {
        player.addXP(10, 'Participation');
        
        if (index === 0) {
            player.addXP(50, 'Victoire');
            if (player.isPersonal) {
                player.totalVictories++;
            }
        } else if (index < 3) {
            player.addXP(20, 'Top 3');
        }
        
        if (player.evacuated && player.isPersonal) {
            player.totalEvacuations++;
            player.addXP(5, 'Évacuation');
        }
        
        // Mettre à jour les records
        if (player.isPersonal) {
            player.totalGames++;
            
            const recordKey = `turns${maxTurns}`;
            if (player.records && player.votes > (player.records[recordKey] || 0)) {
                player.records[recordKey] = player.votes;
            }
        }
    });
    
    // Afficher le classement
    showFinalRanking(sortedPlayers);
    
    // Sauvegarder les stats dans Firebase
    saveFinalStats(sortedPlayers);
}

/**
 * Affiche le classement final
 */
function showFinalRanking(sortedPlayers) {
    let html = '<h3 style="color: var(--gold); margin-top: 0; font-size: 2rem;">🏆 CLASSEMENT FINAL</h3>';
    
    html += '<div style="margin: 30px 0;">';
    
    sortedPlayers.forEach((player, index) => {
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
        const color = index === 0 ? 'var(--gold)' : index === 1 ? '#C0C0C0' : index === 2 ? '#CD7F32' : '#999';
        
        html += '<div style=\"background: rgba(255,255,255,0.1); padding: 20px; margin: 15px 0; border-radius: 15px; border-left: 5px solid ' + color + ';\">';
        html += '<div style=\"display: flex; justify-content: space-between; align-items: center;\">';
        html += `<div style=\"font-size: 2rem;\">${medal}</div>`;
        html += `<div style=\"flex: 1; margin: 0 20px;\">`;
        html += `<div style=\"font-size: 1.3rem; font-weight: bold; color: ${player.colorHex};\">${player.picto} ${player.name}</div>`;
        html += `<div style=\"font-size: 0.9rem; color: #ccc; margin-top: 5px;\">XP: ${player.xp}</div>`;
        html += `</div>`;
        html += `<div style=\"font-size: 1.8rem; font-weight: bold; color: ${color};\">${player.votes} votes</div>`;
        html += '</div>';
        
        if (player.evacuated) {
            html += `<div style=\"margin-top: 10px; padding: 10px; background: rgba(231, 76, 60, 0.2); border-radius: 8px; font-size: 0.85rem; color: #e74c3c;\">`;
            html += `⚠️ Évacué : ${player.evacuationReason}`;
            html += `</div>`;
        }
        
        html += '</div>';
    });
    
    html += '</div>';
    
    html += '<button onclick=\"location.reload()\" class=\"btn btn-primary\" style=\"width: 100%; padding: 15px; font-size: 1.2rem; margin-top: 20px;\">REJOUER</button>';
    
    const modal = document.createElement('div');
    modal.id = 'final-ranking-popup';
    modal.className = 'modal';
    modal.style.maxWidth = '600px';
    modal.innerHTML = html;
    modal.style.display = 'block';
    
    document.body.appendChild(modal);
    showOverlay();
    
    const winner = sortedPlayers[0];
    speak(`Fin de la partie ! Le vainqueur est ${winner.name} avec ${winner.votes} votes ! Félicitations !`);
}

/**
 * Sauvegarde les statistiques finales dans Firebase
 */
async function saveFinalStats(sortedPlayers) {
    if (!isFirebaseConnected) {
        console.log('⚠️ Firebase non connecté, stats non sauvegardées');
        return;
    }
    
    try {
        for (const player of sortedPlayers) {
            if (player.isPersonal && player.qrData && player.qrData.id) {
                const playerRef = database.ref(`players/${player.qrData.id}`);
                
                await playerRef.update({
                    totalGames: player.totalGames,
                    totalVictories: player.totalVictories,
                    totalEvacuations: player.totalEvacuations,
                    totalXP: player.totalXP,
                    records: player.records,
                    lastPlayed: new Date().toISOString()
                });
                
                console.log(`✅ Stats sauvegardées pour ${player.name}`);
            }
        }
    } catch (error) {
        console.error('❌ Erreur sauvegarde stats:', error);
    }
}

console.log('✅ Partie 2 chargée : Actions, Missions, Fin de tour');
