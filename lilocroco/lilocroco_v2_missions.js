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
    html += '<button onclick="validateTemporaryMission()" class="btn btn-info" style="width: 100%;">⏱️ Mission Flash</button>';
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
    console.log('\n========== VALIDATION MISSION Flash ==========');
    
    const player = players[currentPlayerIndex];
    console.log('1. Joueur actuel:', player ? player.name : 'AUCUN');
    
    if (!player) {
        console.error('❌ Aucun joueur actuel !');
        return;
    }
    
    console.log('2. Votes AVANT:', player.votes);
    console.log('3. Mission actuelle:', currentTemporaryMission);
    
    if (!currentTemporaryMission) {
        console.error('❌ Aucune mission Flash en cours');
        showToast('Aucune mission Flash en cours', 'warning');
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
    player.addVotes(votes, `Mission Flash #${currentTemporaryMission.id}` + (player.hasLunettes ? ' (x2)' : ''));
    console.log('7. Votes APRÈS ajout:', player.votes);
    
    player.addXP(10, 'Mission Flash');
    
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
    
    showToast(`${player.picto} Mission Flash #${currentTemporaryMission.id} accomplie ! +${votes} votes`, 'success', 4000);
    speak(`Mission Flash accomplie ! Plus ${votes} votes !`);
    
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
// POPUP MÉTÉO
// ========================================

/**
 * Affiche une popup avec la météo du tour
 */
function showWeatherPopup() {
    if (!currentWeather) {
        console.error('❌ Aucune météo actuelle !');
        return;
    }
    
    // Classe CSS selon la météo
    const weatherClass = currentWeather.class || 'weather-sunny';
    
    // Couleur selon la météo
    let bgColor = '#ffd700';
    let borderColor = '#ffa500';
    
    if (currentWeather.name === 'Canicule') {
        bgColor = '#ff5722';
        borderColor = '#f44336';
    } else if (currentWeather.name === 'Pluie fine') {
        bgColor = '#2196f3';
        borderColor = '#1976d2';
    } else if (currentWeather.name === 'Orage') {
        bgColor = '#607d8b';
        borderColor = '#455a64';
    } else if (currentWeather.name === 'Tempête') {
        bgColor = '#9c27b0';
        borderColor = '#7b1fa2';
    }
    
    let html = `<div style="text-align: center;">`;
    
    // Titre du tour
    html += `<h3 style="color: var(--gold); margin-top: 0; font-size: 1.5rem;">🎯 TOUR ${currentTurn}/${maxTurns}</h3>`;
    
    // Icône météo
    // html += `<div style="font-size: 0.9rem; margin: 20px 0; animation: pulse 2s infinite;">${currentWeather.icon}</div>`;
    
    // Nom de la météo
    html += `<h4 style="color: ${bgColor}; margin: 10px 0; font-size: 1.3rem; text-transform: uppercase; font-weight: bold;">${currentWeather.icon} ${currentWeather.name}</h4>`;
    
    // Effet
    html += `<div style="background: linear-gradient(135deg, ${bgColor}20 0%, ${borderColor}20 100%); border: 2px solid ${borderColor}; border-radius: 10px; padding: 15px; margin: 15px 0;">`;
    html += `<div style="font-size: 0.9rem; font-weight: bold; color: #000; margin-bottom: 5px;">⚡ EFFET</div>`;
    html += `<div style="font-size: 1rem; color: #333;">${currentWeather.effect}</div>`;
    html += `</div>`;
    
    // Niveau des crocodiles
    const maxCroco = 200;
    const level = globalData.jaugeCroco;
    let crocoLevel = 'Normal';
    let crocoColor = '#2ecc71';
    let crocoEffect = '1 case et 1 blessure';
    
    if (level >= maxCroco * 0.75) {
        crocoLevel = 'Furie';
        crocoColor = '#e74c3c';
        crocoEffect = '2 cases et 2 blessures';
    } else if (level >= maxCroco * 0.5) {
        crocoLevel = 'Énervé';
        crocoColor = '#f39c12';
        crocoEffect = '2 cases et 1 blessure';
    }
    
    html += `<div style="background: rgba(231, 76, 60, 0.1); border: 2px solid ${crocoColor}; border-radius: 10px; padding: 12px; margin: 15px 0;">`;
    html += `<div style="font-size: 0.9rem; font-weight: bold; color: ${crocoColor}; margin-bottom: 5px;">🐊 CROCODILES</div>`;
    html += `<div style="font-size: 0.95rem; color: #000; font-weight: bold;">${crocoLevel} (${level}/${maxCroco})</div>`;
    html += `<div style="font-size: 0.85rem; color: #666; margin-top: 5px;">${crocoEffect}</div>`;
    html += `</div>`;
    
    // Mission Flash
    if (currentTemporaryMission) {
        html += `<div style="background: rgba(155, 89, 182, 0.1); border: 2px solid #9b59b6; border-radius: 10px; padding: 12px; margin: 15px 0;">`;
        html += `<div style="font-size: 0.9rem; font-weight: bold; color: #9b59b6; margin-bottom: 5px;">🎯 MISSION FLASH</div>`;
        html += `<div style="font-size: 0.95rem; color: #000;">#${currentTemporaryMission.id} - ${currentTemporaryMission.libelle}</div>`;
        html += `<div style="font-size: 0.9rem; color: var(--gold); font-weight: bold; margin-top: 5px;">+25 votes</div>`;
        html += `</div>`;
    }
    
    // Joueur qui commence
    const firstPlayer = players[0];
    html += `<div style="margin: 15px 0; font-size: 1rem; color: #666;">`;
    html += `Au tour de <strong style="color: ${firstPlayer.colorHex};">${firstPlayer.picto} ${firstPlayer.name}</strong>`;
    html += `</div>`;
    
    // Bouton
    html += `<button onclick="closeWeatherPopup()" class="btn btn-primary" style="width: 100%; padding: 15px; font-size: 1.1rem; margin-top: 15px;">C'EST PARTI ! 🚀</button>`;
    
    html += `</div>`;
    
    // Ajouter l'animation pulse
    const style = document.createElement('style');
    style.id = 'weather-popup-style';
    style.textContent = `
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    
    // Supprimer l'ancien style s'il existe
    const oldStyle = document.getElementById('weather-popup-style');
    if (oldStyle) oldStyle.remove();
    
    document.head.appendChild(style);
    
    const modal = document.createElement('div');
    modal.id = 'weather-popup';
    modal.className = 'modal';
    modal.style.maxWidth = '400px';
    modal.innerHTML = html;
    modal.style.display = 'block';
    
    document.body.appendChild(modal);
    showOverlay();
    
    // Message vocal
    speak(`Début du tour ${currentTurn}. Météo : ${currentWeather.name}. ${currentWeather.effect}. C'est au tour de ${firstPlayer.name}.`);
}

/**
 * Ferme la popup météo
 */
function closeWeatherPopup() {
    const modal = document.getElementById('weather-popup');
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
    
    // Tirer une nouvelle mission Flash AVANT la météo (pour forcer beau temps si nécessaire)
    console.log('1. Tirage nouvelle mission Flash...');
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
    
    // Afficher la popup météo
    console.log('5. Affichage popup météo...');
    showWeatherPopup();
    
    console.log('========== FIN endRound() ==========\n');
}

// FONCTION evacuatePlayer SUPPRIMÉE - Utiliser celle de lilocroco_v2.js

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
