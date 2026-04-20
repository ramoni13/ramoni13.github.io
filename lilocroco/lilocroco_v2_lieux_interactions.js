/**
 * LILOCROCO TV SHOW V2 - INTERACTIONS LIEUX MYSTIQUES
 */

/**
 * Affiche la popup des lieux mystiques avec interactions
 */
function showLieuxMystiquesInteraction() {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    // if (!globalData.lieuxMystiques || Object.keys(globalData.lieuxMystiques).length === 0) {
    //     showToast('Aucun lieu mystique disponible', 'warning');
    //     return;
    // }
    
    let html = '<h3 style="color: var(--gold); margin-top: 0;">🗺️ LIEUX MYSTIQUES</h3>';
    html += '<p style="font-size: 0.9rem; color: #666; margin-bottom: 15px;">Cliquez sur un lieu pour activer son effet</p>';
    
    html += '<div style="display: grid; gap: 10px; margin: 20px 0;">';
    
    for (let lieuName in globalData.lieuxMystiques) {
        const pos = globalData.lieuxMystiques[lieuName];
        const lieu = LIEUX_MYSTIQUES.find(l => l.name === lieuName);
        
        if (lieu && pos) {
            const coord = posToCoord(pos.x, pos.y);
            
            // Vérifier si c'est la station météo et si elle a déjà été utilisée
            const isStationMeteo = lieuName === 'station_meteo';
            const isDisabled = isStationMeteo && stationMeteoUsed;
            
            // Style du bouton
            let buttonStyle = 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: left; padding: 15px; border: none; border-radius: 10px; cursor: pointer; transition: transform 0.2s;';
            let hoverEffect = `onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'"`;;
            
            if (isDisabled) {
                buttonStyle = 'background: #666; color: #999; text-align: left; padding: 15px; border: none; border-radius: 10px; cursor: not-allowed; opacity: 0.5;';
                hoverEffect = '';
            }
            
            html += `<button onclick="${isDisabled ? '' : `activateLieu('${lieuName}')`}" class="btn" style="${buttonStyle}" ${hoverEffect} ${isDisabled ? 'disabled' : ''}>`;
            html += `<div style="display: flex; align-items: center; gap: 10px;">`;
            html += `<div style="font-size: 2rem;">${lieu.icon}</div>`;
            html += `<div style="flex: 1;">`;
            
            // Ajouter "(1 seule fois)" pour la station météo
            let lieuTitle = lieu.name.replace('_', ' ').toUpperCase();
            if (isStationMeteo) {
                lieuTitle += isDisabled ? ' (DÉJÀ UTILISÉE)' : ' (1 SEULE FOIS)';
            }
            
            html += `<div style="font-weight: bold; font-size: 1rem; margin-bottom: 3px;">${lieuTitle}</div>`;
            html += `<div style="font-size: 0.75rem; opacity: 0.9;">${coord} - ${lieu.effect}</div>`;
            html += `</div>`;
            html += `</div>`;
            html += `</button>`;
        }
    }
    
    html += '</div>';
    html += '<button onclick="closeLieuxInteractionPopup();" class="btn btn-danger" style="width: 100%; margin-top: 10px;">Fermer</button>';
    
    const modal = document.createElement('div');
    modal.id = 'lieux-interaction-popup';
    modal.className = 'modal';
    modal.innerHTML = html;
    modal.style.display = 'block';
    
    document.body.appendChild(modal);
    showOverlay();
}

/**
 * Active l'effet d'un lieu mystique
 */
function activateLieu(lieuName) {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    const lieu = LIEUX_MYSTIQUES.find(l => l.name === lieuName);
    if (!lieu) return;
    
    console.log(`🗺️ Activation du lieu: ${lieuName}`);
    
    switch (lieuName) {
        case 'temple':
            activateTemple(player, lieu);
            break;
        case 'photo_booth':
            activatePhotoBooth(player, lieu);
            break;
        case 'antenne_radio':
            activateAntenneRadio(player, lieu);
            break;
        case 'autel_offrandes':
            activateAutelOffrandes(player, lieu);
            break;
        case 'cabine_regie':
            activateCabineRegie(player, lieu);
            break;
        case 'station_meteo':
            activateStationMeteo(player, lieu);
            break;
        case 'source_sacree':
            activateSourceSacree(player, lieu);
            break;
        case 'tombe':
            activateTombe(player, lieu);
            break;
        default:
            showToast('Lieu non implémenté', 'warning');
    }
}

/**
 * 🛕 Temple : Fatigue + Blessure = 0 (avec totem)
 */
function activateTemple(player, lieu) {
    // Vérifier si le joueur a un totem
    // const hasTotem = player.hasItem('totem');
    const hasTotem = true;
    
    if (hasTotem) {
        player.fatigue = 0;
        player.blessure = 0;
        player.recordAction('lieu_mystique', { lieu: 'temple', effect: 'reset_stats' });
        player.addXP(20, 'Temple');
        showToast(`${player.picto} ${lieu.icon} Temple : Fatigue et Blessure remises à 0 !`, 'success', 4000);
        speak('Temple activé ! Fatigue et blessure remises à zéro !');
        
        updatePlayerDisplay();
        closeLieuxInteractionPopup();
    } else {
        showToast('⚠️ Vous devez avoir un totem pour utiliser le Temple', 'warning', 4000);
        speak('Vous devez avoir un totem pour utiliser le Temple.');
    }
}

/**
 * 📸 Photo Booth : +20 votes par photo
 */
function activatePhotoBooth(player, lieu) {
    const votes = 20;
    player.addVotes(votes, 'Photo Booth');
    player.addXP(5, 'Photo Booth');
    player.recordAction('lieu_mystique', { lieu: 'photo_booth', votes });
    
    showToast(`${player.picto} ${lieu.icon} Photo Booth : +${votes} votes !`, 'success', 4000);
    speak(`Photo Booth ! Plus ${votes} votes !`);
    
    updatePlayerDisplay();
    closeLieuxInteractionPopup();
}

/**
 * 📻 Antenne Radio : Piocher 2 cartes Action
 */
function activateAntenneRadio(player, lieu) {
    player.recordAction('lieu_mystique', { lieu: 'antenne_radio', cartes: 2 });
    player.addXP(25, 'Antenne radio');
    showToast(`${player.picto} ${lieu.icon} Antenne Radio : Piochez 2 cartes Action !`, 'info', 4000);
    speak('Antenne Radio ! Piochez 2 cartes Action !');
    
    closeLieuxInteractionPopup();
}

/**
 * ⛩️ Autel Offrandes : Poser 1 mangue = +50 votes + 1 carte Action
 */
function activateAutelOffrandes(player, lieu) {
    //const hasMangue = player.hasItem('mangue');
    const hasMangue = true;

    if (hasMangue) {
        const votes = 25;
        player.addVotes(votes, 'Autel Offrandes');
        player.addXP(10, 'Autel Offrandes');
        player.recordAction('lieu_mystique', { lieu: 'autel_offrandes', votes, cartes: 1 });
        
        showToast(`${player.picto} ${lieu.icon} Autel : +${votes} votes + 1 carte Face Cam !`, 'success', 4000);
        speak(`Autel des Offrandes ! Plus ${votes} votes et piochez 1 carte Face Cam !`);
        
        updatePlayerDisplay();
        closeLieuxInteractionPopup();
    } else {
        showToast('⚠️ Vous devez avoir une mangue pour utiliser l\'Autel', 'warning', 4000);
        speak('Vous devez avoir une mangue pour utiliser l\'Autel des Offrandes.');
    }
}

/**
 * 🎬 Cabine Régie : Indique position d'un diamant
 */
function activateCabineRegie(player, lieu) {
    // Chercher un diamant non trouvé (seulement dans le volcan)
    const diamants = itemsOnIsland.filter(item => 
        item.name === 'diamant' && 
        !item.found && 
        isInZone({x: item.x, y: item.y}, ZONES.VOLCAN)
    );
    
    if (diamants.length > 0) {
        // Prendre le plus proche
        let closest = diamants[0];
        let minDist = distance(player.position, {x: closest.x, y: closest.y});
        
        diamants.forEach(d => {
            const dist = distance(player.position, {x: d.x, y: d.y});
            if (dist < minDist) {
                minDist = dist;
                closest = d;
            }
        });
        
        const encoded = encodeCoordinates(player, closest.x, closest.y);
        
        player.recordAction('lieu_mystique', { lieu: 'cabine_regie', diamant: {x: closest.x, y: closest.y} });
        player.addXP(10, 'Cabine Régie');

        let html = '<h3 style="color: var(--gold); margin-top: 0;">🎬 CABINE RÉGIE</h3>';
        html += '<div style="font-size: 3rem; margin: 20px 0;">💎</div>';
        html += '<p style="font-size: 1.1rem; margin: 15px 0;">Un diamant se trouve à :</p>';
        html += `<div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">`;
        html += `<div style="font-size: 1.5rem; font-weight: bold; color: var(--gold);">${encoded}</div>`;
        html += `</div>`;
        html += '<p style="font-size: 0.85rem; color: #999; margin-top: 15px;">Utilisez votre livret de décodage</p>';
        html += '<button onclick="closeCabineRegieResultPopup()" class="btn btn-primary" style="width: 100%; margin-top: 20px;">OK</button>';
        
        closeLieuxInteractionPopup();
        
        const modal = document.createElement('div');
        modal.id = 'cabine-regie-result-popup';
        modal.className = 'modal';
        modal.innerHTML = html;
        modal.style.display = 'block';
        
        document.body.appendChild(modal);
        showOverlay();
        
        speak(`Cabine Régie ! Un diamant se trouve en ${encoded}`);
    } else {
        showToast('⚠️ Aucun diamant disponible sur l\'île', 'warning', 4000);
        speak('Aucun diamant disponible sur l\'île.');
    }
}

function closeCabineRegieResultPopup() {
    const modal = document.getElementById('cabine-regie-result-popup');
    if (modal) {
        modal.remove();
        hideOverlay();
    }
}

/**
 * 🌤️ Station Météo : 3 prochains tours = Beau Temps
 */
function activateStationMeteo(player, lieu) {
    // Vérifier si déjà utilisée
    if (stationMeteoUsed) {
        showToast('⚠️ Station Météo déjà utilisée cette partie !', 'warning');
        speak('La station météo a déjà été utilisée.');
        closeLieuxInteractionPopup();
        return;
    }
    
    // Forcer les 3 prochaines météos à "Beau temps"
    const beauTemps = METEO_TYPES.find(m => m.name === 'Beau temps');
    nextWeathers = [beauTemps, beauTemps, beauTemps];
    
    // Marquer comme utilisée
    stationMeteoUsed = true;
    console.log('☀️ Station Météo activée - Plus utilisable pour le reste de la partie');
    
    player.recordAction('lieu_mystique', { lieu: 'station_meteo', tours: 3 });
    player.addXP(25, 'Station Météo');

    showToast(`${player.picto} ${lieu.icon} Station Météo : 3 tours de Beau Temps ! (1 seule fois par partie)`, 'info', 5000);
    speak('Station Météo activée ! Les 3 prochains tours seront ensoleillés ! Attention, elle ne peut être utilisée qu\'une seule fois.');
    
    closeLieuxInteractionPopup();
}

/**
 * 💧 Source Sacrée : Fatigue = 0
 */
function activateSourceSacree(player, lieu) {
    player.fatigue = 0;
    player.recordAction('lieu_mystique', { lieu: 'source_sacree', effect: 'reset_fatigue' });
    
    showToast(`${player.picto} ${lieu.icon} Source Sacrée : Fatigue remise à 0 !`, 'success', 4000);
    speak('Source Sacrée ! Fatigue remise à zéro !');
    
    updatePlayerDisplay();
    closeLieuxInteractionPopup();
}

/**
 * ⚰️ Tombe : 50% : 100 votes OU 2 Blessures
 */
function activateTombe(player, lieu) {
    const isLucky = Math.random() < 0.5;
    
    if (isLucky) {
        // 100 votes
        const votes = 100;
        player.addVotes(votes, 'Tombe (chance)');
        player.addXP(15, 'Tombe (chance)');
        player.recordAction('lieu_mystique', { lieu: 'tombe', result: 'votes', votes });
        
        showToast(`${player.picto} ${lieu.icon} Tombe : Chance ! +${votes} votes !`, 'success', 5000);
        speak(`Tombe ! Vous avez de la chance ! Plus ${votes} votes !`);
        
        updatePlayerDisplay();
    } else {
        // 2 Blessures
        player.blessure += 2;
        player.recordAction('lieu_mystique', { lieu: 'tombe', result: 'blessures', blessures: 2 });
        
        showToast(`${player.picto} ${lieu.icon} Tombe : Malchance ! +2 Blessures !`, 'danger', 5000);
        speak('Tombe ! Malchance ! Plus 2 blessures !');
        
        updatePlayerDisplay();
        
        // Vérifier évacuation
        if (player.blessure >= 8) {
            evacuatePlayer(player, '8 blessures (Tombe)');
        }

          // Vérifier évacuation
  if ((player.blessure >= 5) && (player.fatigue >= 5)) {
      evacuatePlayer(player, '5 blessures & 5 fatigues');
  }
    }
    
    closeLieuxInteractionPopup();
}

/**
 * Ferme la popup d'interaction des lieux
 */
function closeLieuxInteractionPopup() {
    const modal = document.getElementById('lieux-interaction-popup');
    if (modal) {
        modal.remove();
        hideOverlay();
    }
}

console.log('✅ Interactions lieux mystiques chargées');
