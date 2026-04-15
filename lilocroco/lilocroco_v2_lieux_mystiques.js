/**
 * LILOCROCO TV SHOW V2 - LIEUX MYSTIQUES QUOTIDIENS
 * Gestion des lieux mystiques avec persistance Firebase
 */

/**
 * Charge ou génère les lieux mystiques du jour
 */
async function loadDailyLieuxMystiques() {
    console.log('🗺️ Chargement des lieux mystiques du jour...');
    
    if (!isFirebaseConnected) {
        console.warn('⚠️ Firebase non connecté, génération locale');
        return generateDailyLieuxMystiques();
    }
    
    try {
        const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        const endDate = tomorrow.toISOString();
        
        // Référence pour les lieux mystiques quotidiens
        const lieuxRef = database.ref('lieuxMystiquesQuotidiens');
        
        // Chercher les lieux mystiques du jour
        // Utiliser une requête simple sans index pour éviter les warnings
        const lieuxSnapshot = await lieuxRef.once('value');
        
        let foundLieux = null;
        lieuxSnapshot.forEach((child) => {
            const data = child.val();
            if (data.date === today) {
                foundLieux = { key: child.key, data };
            }
        });
        
        let lieuxMystiquesData = null;
        
        if (foundLieux) {
            // Récupérer les lieux existants
            lieuxMystiquesData = foundLieux.data;
            console.log('✅ Lieux mystiques du jour chargés depuis Firebase');
            console.log(`📅 Date: ${lieuxMystiquesData.date}`);
            console.log(`⏰ Valides jusqu'à: ${new Date(lieuxMystiquesData.dateFin).toLocaleString('fr-FR')}`);
            
            // Incrémenter le compteur de parties jouées
            lieuxMystiquesData.nbPartiesJouees = (lieuxMystiquesData.nbPartiesJouees || 0) + 1;
            await database.ref(`lieuxMystiquesQuotidiens/${foundLieux.key}/nbPartiesJouees`)
                .set(lieuxMystiquesData.nbPartiesJouees);
        } else {
            // Tirer 4 lieux mystiques au sort
            console.log('🎲 Aucun lieu trouvé pour aujourd\'hui, tirage de 4 nouveaux lieux...');
            const selectedLieux = generateDailyLieuxMystiques();
            
            lieuxMystiquesData = {
                date: today,
                dateDebut: new Date().toISOString(),
                dateFin: endDate,
                lieux: selectedLieux,
                nbPartiesJouees: 0
            };
            
            // Sauvegarder dans Firebase (sans écraser les anciens)
            const newLieuxRef = await lieuxRef.push(lieuxMystiquesData);
            console.log('✅ Nouveaux lieux mystiques sauvegardés avec ID:', newLieuxRef.key);
            console.log(`📅 Valides du ${today} jusqu'à minuit`);
        }
        

        
        return lieuxMystiquesData.lieux;
        
    } catch (error) {
        console.error('❌ Erreur chargement lieux mystiques:', error);
        return generateDailyLieuxMystiques();
    }
}

/**
 * Tire 4 lieux mystiques au sort pour la journée
 */
function generateDailyLieuxMystiques() {
    const positions = {};
    const availablePositions = [];
    
    // Générer toutes les positions valides (hors mer, volcan, camps, arbres)
    for (let x = 1; x < GRID_WIDTH - 1; x++) {
        for (let y = 1; y < GRID_HEIGHT - 1; y++) {
            const pos = {x, y};
            
            // Exclure mer, volcan, camps
            if (isInZone(pos, ZONES.MER)) continue;
            if (isInZone(pos, ZONES.VOLCAN)) continue;
            
            let isInCamp = false;
            for (let color in CAMPS) {
                if (isInZone(pos, CAMPS[color].zone)) {
                    isInCamp = true;
                    break;
                }
            }
            if (isInCamp) continue;
            
            // Exclure les positions des arbres
            const hasTree = trees.some(tree => tree.x === x && tree.y === y);
            if (hasTree) continue;
            
            availablePositions.push(pos);
        }
    }
    
    // Tirer 4 lieux au sort
    const shuffledLieux = shuffle([...LIEUX_MYSTIQUES]);
    const selectedLieux = shuffledLieux.slice(0, 4);
    
    // Mélanger les positions
    const shuffledPositions = shuffle(availablePositions);
    
    // Attribuer les positions
    selectedLieux.forEach((lieu, index) => {
        if (shuffledPositions[index]) {
            positions[lieu.name] = shuffledPositions[index];
        }
    });
    
    console.log('✅ 4 Lieux mystiques tirés au sort:');
    for (let lieuName in positions) {
        const lieu = LIEUX_MYSTIQUES.find(l => l.name === lieuName);
        if (lieu && positions[lieuName]) {
            console.log(`  ${lieu.icon} ${lieuName} : ${posToCoord(positions[lieuName].x, positions[lieuName].y)}`);
        }
    }
    
    return positions;
}

/**
 * Récupère les statistiques des lieux mystiques
 */
async function getLieuxMystiquesStats(nbJours = 7) {
    if (!isFirebaseConnected) {
        console.warn('⚠️ Firebase non connecté, statistiques non disponibles');
        return null;
    }
    
    try {
        const lieuxRef = database.ref('lieuxMystiquesQuotidiens');
        const snapshot = await lieuxRef
            .orderByChild('date')
            .limitToLast(nbJours)
            .once('value');
        
        const stats = {
            totalJours: 0,
            totalParties: 0,
            lieuxUtilises: {},
            moyennePartiesParJour: 0
        };
        
        snapshot.forEach((child) => {
            const data = child.val();
            stats.totalJours++;
            stats.totalParties += data.nbPartiesJouees || 0;
            
            // Compter les lieux utilisés
            for (let lieuName in data.lieux) {
                if (!stats.lieuxUtilises[lieuName]) {
                    stats.lieuxUtilises[lieuName] = 0;
                }
                stats.lieuxUtilises[lieuName]++;
            }
        });
        
        stats.moyennePartiesParJour = stats.totalJours > 0 
            ? (stats.totalParties / stats.totalJours).toFixed(1) 
            : 0;
        
        console.log('📊 Statistiques lieux mystiques (', nbJours, 'derniers jours):');
        console.log('  Total jours:', stats.totalJours);
        console.log('  Total parties:', stats.totalParties);
        console.log('  Moyenne parties/jour:', stats.moyennePartiesParJour);
        console.log('  Lieux les plus utilisés:');
        
        const sorted = Object.entries(stats.lieuxUtilises)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        
        sorted.forEach(([lieuName, count]) => {
            const lieu = LIEUX_MYSTIQUES.find(l => l.name === lieuName);
            if (lieu) {
                console.log(`    ${lieu.icon} ${lieuName}: ${count} fois`);
            }
        });
        
        return stats;
        
    } catch (error) {
        console.error('❌ Erreur récupération stats:', error);
        return null;
    }
}

/**
 * Nettoie les anciens lieux mystiques (> 30 jours)
 */
async function cleanOldLieuxMystiques() {
    if (!isFirebaseConnected) return;
    
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const cutoffDate = thirtyDaysAgo.toISOString().split('T')[0];
        
        const lieuxRef = database.ref('lieuxMystiquesQuotidiens');
        const snapshot = await lieuxRef
            .orderByChild('date')
            .endAt(cutoffDate)
            .once('value');
        
        let deletedCount = 0;
        const updates = {};
        
        snapshot.forEach((child) => {
            updates[child.key] = null; // Marquer pour suppression
            deletedCount++;
        });
        
        if (deletedCount > 0) {
            await lieuxRef.update(updates);
            console.log(`🗑️ ${deletedCount} anciens lieux mystiques supprimés (> 30 jours)`);
        } else {
            console.log('✅ Aucun ancien lieu mystique à supprimer');
        }
        
    } catch (error) {
        console.error('❌ Erreur nettoyage lieux mystiques:', error);
    }
}

/**
 * Nettoie les anciens lieux mystiques de global/{date}
 */
async function cleanOldLieuxMystiquesFromGlobal() {
    if (!isFirebaseConnected) return;
    
    try {
        const today = new Date().toISOString().split('T')[0];
        const globalRef = database.ref(`global/${today}`);
        
        // Supprimer lieuxMystiques de global/{date} s'il existe
        const snapshot = await globalRef.child('lieuxMystiques').once('value');
        if (snapshot.exists()) {
            await globalRef.child('lieuxMystiques').remove();
            console.log('🧹 Anciens lieux mystiques supprimés de global/' + today);
        }
    } catch (error) {
        console.error('❌ Erreur nettoyage anciens lieux:', error);
    }
}

console.log('✅ Lieux mystiques quotidiens chargés');
