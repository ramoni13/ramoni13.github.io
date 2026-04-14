/**
 * LILOCROCO TV SHOW V2 - MISSIONS ET FIN DE TOUR
 */

// ========================================
// MISSIONS
// ========================================

function doActionMission() {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    let html = '<h3 style="color: var(--gold); margin-top: 0;">🎯 MISSIONS</h3>';
    html += '<p style="font-size: 0.9rem; color: #666; margin-bottom: 20px;">Quelle mission avez-vous accomplie ?</p>';
    
    html += '<div style="display: flex; flex-direction: column; gap: 10px;">';
    html += '<button onclick="validateTemporaryMission()" class="btn btn-info" style="width: 100%;">⏱️ Mission Temporaire</button>';
    html += '<button onclick="scanSecretMission()" class="btn btn-purple" style="width: 100%;">🔒 Mission Secrète</button>';
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

function validateTemporaryMission() {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    closeMissionPopup();
    
    // TODO: Implémenter la logique des missions temporaires
    // Pour l'instant, on donne juste des votes
    const votes = 50;
    player.addVotes(votes, 'Mission temporaire');
    player.addXP(10, 'Mission temporaire');
    
    showToast(`${player.picto} Mission temporaire validée ! +${votes} votes`, 'success', 4000);
    speak(`Mission temporaire validée ! Plus ${votes} votes ! La mission changera à la fin de ce tour.`);
    
    updatePlayerDisplay();
    updateOtherPlayersDisplay();
}

function scanSecretMission() {
    closeMissionPopup();
    
    // Ouvrir le scanner QR
    const qrModal = document.getElementById('qr-scanner-modal');
    if (qrModal) {
        qrModal.style.display = 'block';
        showOverlay();
        startQRScannerForMission();
    } else {
        console.error('❌ Modal QR scanner introuvable');
        showToast('Erreur : scanner QR non disponible', 'error');
    }
}

function startQRScannerForMission() {
    if (!html5QrCode) {
        html5QrCode = new Html5Qrcode('qr-reader');
    } else {
        try {
            html5QrCode.stop().then(() => {
                html5QrCode.clear();
                startQRScannerForMission();
            }).catch(() => {
                html5QrCode = new Html5Qrcode('qr-reader');
            });
            return;
        } catch (e) {
            html5QrCode = new Html5Qrcode('qr-reader');
        }
    }
    
    html5QrCode.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
            console.log('📷 QR Code mission scanné:', decodedText);
            handleMissionQRCode(decodedText);
        },
        (error) => {
            // Ignorer les erreurs de scan
        }
    ).catch(err => {
        console.error('❌ Erreur scanner QR:', err);
        showToast('Erreur d\'accès à la caméra', 'error');
    });
}

function handleMissionQRCode(qrData) {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    try {
        const data = JSON.parse(qrData);
        
        if (data.type === 'mission') {
            // Mission secrète
            const votes = data.votes || 100;
            player.addVotes(votes, `Mission secrète : ${data.title || 'Mission'}`);
            player.addXP(20, 'Mission secrète');
            
            closeQRScanner();
            
            showToast(`${player.picto} Mission secrète accomplie ! +${votes} votes`, 'success', 5000);
            speak(`Mission secrète accomplie ! Plus ${votes} votes !`);
            
            updatePlayerDisplay();
            updateOtherPlayersDisplay();
        } else {
            showToast('QR Code invalide', 'error');
        }
    } catch (error) {
        console.error('❌ Erreur parsing QR mission:', error);
        showToast('QR Code invalide', 'error');
    }
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
    
    // Passer au joueur suivant
    currentPlayerIndex++;
    
    // Si tous les joueurs ont joué
    if (currentPlayerIndex >= players.length) {
        endRound();
    } else {
        // Joueur suivant
        const nextPlayer = players[currentPlayerIndex];
        updatePlayerDisplay();
        if (typeof updateOtherPlayersDisplay === 'function') {
            updateOtherPlayersDisplay();
        }
        
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
    if (typeof updateOtherPlayersDisplay === 'function') {
        updateOtherPlayersDisplay();
    }
    
    showToast(`🎯 Tour ${currentTurn}/${maxTurns}`, 'info', 3000);
    speak(`Début du tour ${currentTurn}. C'est au tour de ${players[0].name}.`);
}

/**
 * Gère l'évacuation d'un joueur
 */
function evacuatePlayer(player, reason) {
    console.log(`🚑 Évacuation de ${player.name} : ${reason}`);
    
    // Calculer la perte de votes (moitié)
    const lostVotes = Math.floor(player.votes / 2);
    player.votes = player.votes - lostVotes;
    
    // Réinitialiser fatigue et blessure
    player.fatigue = 0;
    player.blessure = 0;
    
    // Retour au camp
    player.position = {...CAMPS[player.color].start};
    
    // Enregistrer l'évacuation
    player.recordAction('evacuation', { 
        reason, 
        lostVotes,
        location: player.position 
    });
    
    // Message
    showToast(`${player.picto} ${player.name} évacué ! -${lostVotes} votes`, 'danger', 5000);
    speak(`${player.name} est évacué ! Moins ${lostVotes} votes. Retour au camp.`);
    
    // Mettre à jour l'affichage
    updatePlayerDisplay();
    if (typeof updateOtherPlayersDisplay === 'function') {
        updateOtherPlayersDisplay();
    }
    
    // Fin du tour du joueur
    setTimeout(() => {
        endTurn();
    }, 2000);
}

/**
 * Vérifie si la partie doit se terminer
 */
function checkGameEnd() {
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
        
        html += '<div style="background: rgba(255,255,255,0.1); padding: 20px; margin: 15px 0; border-radius: 15px; border-left: 5px solid ' + color + ';">';
        html += '<div style="display: flex; justify-content: space-between; align-items: center;">';
        html += `<div style="font-size: 2rem;">${medal}</div>`;
        html += `<div style="flex: 1; margin: 0 20px;">`;
        html += `<div style="font-size: 1.3rem; font-weight: bold; color: ${player.colorHex};">${player.picto} ${player.name}</div>`;
        html += `<div style="font-size: 0.9rem; color: #ccc; margin-top: 5px;">XP: ${player.xp}</div>`;
        html += `</div>`;
        html += `<div style="font-size: 1.8rem; font-weight: bold; color: ${color};">${player.votes} votes</div>`;
        html += '</div>';
        
        if (player.evacuated) {
            html += `<div style="margin-top: 10px; padding: 10px; background: rgba(231, 76, 60, 0.2); border-radius: 8px; font-size: 0.85rem; color: #e74c3c;">`;
            html += `⚠️ Évacué : ${player.evacuationReason}`;
            html += `</div>`;
        }
        
        html += '</div>';
    });
    
    html += '</div>';
    
    html += '<button onclick="location.reload()" class="btn btn-primary" style="width: 100%; padding: 15px; font-size: 1.2rem; margin-top: 20px;">REJOUER</button>';
    
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

console.log('✅ Missions et Fin de tour chargés');
