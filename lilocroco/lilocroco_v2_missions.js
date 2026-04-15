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
    console.log('\n========== VALIDATION MISSION TEMPORAIRE ==========');
    
    const player = players[currentPlayerIndex];
    console.log('1. Joueur actuel:', player ? player.name : 'AUCUN');
    
    if (!player) {
        console.error('❌ Aucun joueur actuel !');
        return;
    }
    
    console.log('2. Votes AVANT:', player.votes);
    console.log('3. Mission actuelle:', currentTemporaryMission);
    
    if (!currentTemporaryMission) {
        console.error('❌ Aucune mission temporaire en cours');
        showToast('Aucune mission temporaire en cours', 'warning');
        closeMissionPopup();
        return;
    }
    
    closeMissionPopup();
    
    // Votes de base : 25
    let votes = 25;
    console.log('4. Votes de base:', votes);
    
    // Bonus lunettes de soleil (x2)
    if (player.hasLunettes) {
        votes *= 2;
        console.log('5. Bonus lunettes x2, votes:', votes);
        showToast(`🕶️ Lunettes de Soleil : votes doublés !`, 'info', 2000);
    }
    
    console.log('6. Appel player.addVotes(' + votes + ')...');
    player.addVotes(votes, `Mission temporaire #${currentTemporaryMission.id}` + (player.hasLunettes ? ' (x2)' : ''));
    console.log('7. Votes APRÈS ajout:', player.votes);
    
    player.addXP(10, 'Mission temporaire');
    
    // Enregistrer
    player.recordAction('mission_temporaire', {
        missionId: currentTemporaryMission.id,
        libelle: currentTemporaryMission.libelle,
        votes
    });
    
    console.log('8. Appel updatePlayerDisplay()...');
    // Mettre à jour l'affichage AVANT les messages
    updatePlayerDisplay();
    if (typeof updateOtherPlayersDisplay === 'function') {
        updateOtherPlayersDisplay();
    }
    
    console.log('9. Affichage mis à jour');
    
    showToast(`${player.picto} Mission temporaire #${currentTemporaryMission.id} accomplie ! +${votes} votes`, 'success', 4000);
    speak(`Mission temporaire accomplie ! Plus ${votes} votes !`);
    
    console.log(`✅ ${player.name} : Mission #${currentTemporaryMission.id} validée, +${votes} votes, total: ${player.votes}`);
    console.log('========== FIN VALIDATION ==========\n');
}

function scanSecretMission() {
    closeMissionPopup();
    
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    // Récupérer les valeurs du marché
    const marche = globalData.marcheVotes;
    
    // Créer un tableau avec les missions triées par votes (du plus au moins)
    const missions = [
        { color: 'blanc', label: 'Mission Blanche', votes: marche.blanc, bgColor: '#ecf0f1', textColor: '#2c3e50' },
        { color: 'marron', label: 'Mission Marron', votes: marche.marron, bgColor: '#8b4513', textColor: '#fff' },
        { color: 'noir', label: 'Mission Noire', votes: marche.noir, bgColor: '#2c3e50', textColor: '#fff' },
        { color: 'orange', label: 'Mission Orange', votes: marche.orange, bgColor: '#e67e22', textColor: '#fff' }
    ];
    
    // Trier par votes décroissants
    missions.sort((a, b) => b.votes - a.votes);
    
    let html = '<h3 style="color: var(--gold); margin-top: 0;">🔒 MISSION SECRÈTE</h3>';
    html += '<p style="font-size: 0.9rem; color: #666; margin-bottom: 20px;">Quelle mission secrète avez-vous accomplie ?</p>';
    
    html += '<div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">';
    
    missions.forEach(mission => {
        html += `<button onclick="validateSecretMission('${mission.color}', ${mission.votes})" class="btn" style="width: 100%; background: ${mission.bgColor}; color: ${mission.textColor}; padding: 15px; font-size: 1.1rem; font-weight: bold;">`;
        html += `${mission.label} - ${mission.votes} votes`;
        html += `</button>`;
    });
    
    html += '</div>';
    html += '<button onclick="closeSecretMissionPopup()" class="btn btn-danger" style="width: 100%;">Annuler</button>';
    
    const modal = document.createElement('div');
    modal.id = 'secret-mission-popup';
    modal.className = 'modal';
    modal.innerHTML = html;
    modal.style.display = 'block';
    
    document.body.appendChild(modal);
    showOverlay();
}

function validateSecretMission(missionColor, baseVotes) {
    console.log('\n========== VALIDATION MISSION SECRÈTE ==========');
    
    const player = players[currentPlayerIndex];
    console.log('1. Joueur actuel:', player ? player.name : 'AUCUN');
    console.log('2. Mission couleur:', missionColor);
    console.log('3. Votes de base:', baseVotes);
    
    if (!player) {
        console.error('❌ Aucun joueur actuel !');
        return;
    }
    
    console.log('4. Votes AVANT:', player.votes);
    
    closeSecretMissionPopup();
    
    let votes = baseVotes;
    
    // Bonus lunettes de soleil (x2)
    if (player.hasLunettes) {
        votes *= 2;
        console.log('5. Bonus lunettes x2, votes:', votes);
        showToast(`🕶️ Lunettes de Soleil : votes doublés !`, 'info', 2000);
    }
    
    console.log('6. Appel player.addVotes(' + votes + ')...');
    player.addVotes(votes, `Mission secrète ${missionColor}` + (player.hasLunettes ? ' (x2)' : ''));
    console.log('7. Votes APRÈS ajout:', player.votes);
    
    player.addXP(20, 'Mission secrète');
    
    // Enregistrer
    player.recordAction('mission_secrete', {
        color: missionColor,
        votes
    });
    
    console.log('8. Appel updatePlayerDisplay()...');
    updatePlayerDisplay();
    if (typeof updateOtherPlayersDisplay === 'function') {
        updateOtherPlayersDisplay();
    }
    
    console.log('9. Affichage mis à jour');
    
    showToast(`${player.picto} Mission secrète ${missionColor} accomplie ! +${votes} votes`, 'success', 5000);
    speak(`Mission secrète accomplie ! Plus ${votes} votes !`);
    
    console.log(`✅ ${player.name} : Mission ${missionColor} validée, +${votes} votes, total: ${player.votes}`);
    
    // Mettre à jour le marché des votes
    console.log('10. Appel updateMarketVotes(' + missionColor + ')...');
    if (typeof updateMarketVotes === 'function') {
        updateMarketVotes(missionColor);
    } else {
        console.error('❌ updateMarketVotes() non disponible !');
    }
    
    console.log('========== FIN VALIDATION ==========\n');
}

function closeSecretMissionPopup() {
    const modal = document.getElementById('secret-mission-popup');
    if (modal) {
        modal.remove();
        hideOverlay();
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
    console.log('\n========== FIN DE TOUR ==========');
    console.log(`🔄 Fin du tour ${currentTurn}`);
    console.log('Mission actuelle AVANT changement:', currentTemporaryMission);
    
    // Incrémenter le tour
    currentTurn++;
    currentPlayerIndex = 0;
    
    console.log(`🎯 Début du tour ${currentTurn}`);
    
    // Vérifier fin de partie
    if (currentTurn > maxTurns) {
        console.log('🏁 Fin de partie atteinte');
        endGame();
        return;
    }
    
    // Tirer une nouvelle mission temporaire AVANT la météo (pour forcer beau temps si nécessaire)
    console.log('1. Tirage nouvelle mission temporaire...');
    console.log('   - drawTemporaryMission existe ?', typeof drawTemporaryMission === 'function');
    
    if (typeof drawTemporaryMission === 'function') {
        drawTemporaryMission();
        console.log('   - Mission APRÈS tirage:', currentTemporaryMission);
        
        // Forcer la mise à jour de l'affichage
        if (typeof updateTemporaryMissionDisplay === 'function') {
            console.log('   - Appel forcé de updateTemporaryMissionDisplay()...');
            updateTemporaryMissionDisplay();
        }
    } else {
        console.error('❌ drawTemporaryMission() non disponible !');
    }
    
    // Changer la météo (après mission pour ne pas écraser le beau temps forcé)
    console.log('2. Changement de météo...');
    changeWeather();
    
    // Afficher le nouveau tour
    console.log('3. Mise à jour affichages...');
    updateWeatherDisplay();
    updatePlayerDisplay();
    if (typeof updateOtherPlayersDisplay === 'function') {
        updateOtherPlayersDisplay();
    }
    
    console.log('4. Affichages mis à jour');
    
    showToast(`🎯 Tour ${currentTurn}/${maxTurns}`, 'info', 3000);
    speak(`Début du tour ${currentTurn}. C'est au tour de ${players[0].name}.`);
    
    console.log('========== FIN endRound() ==========\n');
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
    
    // Libérer les items rares possédés
    if (typeof releaseAllRareItems === 'function') {
        releaseAllRareItems();
    }
    
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
