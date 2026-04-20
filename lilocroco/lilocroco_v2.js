/**
 * ========================================
 * LILOCROCO TV SHOW - VERSION 2
 * ========================================
 * Jeu de survie et stratégie sur une île
 * Système hybride : plateau physique + application
 */

console.log('🎮 Chargement de Lilocroco TV Show V2...');

// ========================================
// PARTIE 1 : CONFIGURATION ET CONSTANTES
// ========================================

/**
 * Configuration Firebase
 */
const firebaseConfig = {
    apiKey: "AIzaSyBmoFwx1ezeXVnTbb4C9Ea142GHzIuzG30",
    authDomain: "lilocroco-b4bd5.firebaseapp.com",
    databaseURL: "https://lilocroco-b4bd5-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "lilocroco-b4bd5",
    storageBucket: "lilocroco-b4bd5.firebasestorage.app",
    messagingSenderId: "10726496046",
    appId: "1:107264960465:web:710524e1336fbf95b2a2f0",
    measurementId: "G-9L8FBHX54F"
};

// Initialisation Firebase
let firebaseApp = null;
let database = null;
let isFirebaseConnected = false;

try {
    firebaseApp = firebase.initializeApp(firebaseConfig);
    database = firebase.database();
    
    // Vérifier la connexion
    database.ref('.info/connected').on('value', (snap) => {
        if (snap.val() === true) {
            console.log('✅ Firebase connecté');
            isFirebaseConnected = true;
        } else {
            console.warn('⚠️ Firebase déconnecté');
            isFirebaseConnected = false;
        }
    });
    
    // Timeout de sécurité
    setTimeout(() => {
        if (!isFirebaseConnected) {
            console.warn('⚠️ Firebase : timeout de connexion, passage en mode local');
        }
    }, 5000);
    
    console.log('✅ Firebase initialisé');
    isFirebaseConnected = true; // Optimiste, sera mis à jour par le listener
} catch (error) {
    console.error('❌ Firebase non disponible:', error.message);
    isFirebaseConnected = false;
}

/**
 * Dimensions de l'île
 */
const GRID_WIDTH = 18;  // Colonnes 0-17
const GRID_HEIGHT = 14; // Lignes A-N
const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];

/**
 * Positions des camps de base
 */
const CAMPS = {
    ROUGE: { zone: [{x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 2}, {x: 2, y: 2}], start: {x: 1, y: 1}, color: '#e74c3c', picto: '🔴' },
    VERT: { zone: [{x: 14, y: 1}, {x: 15, y: 1}, {x: 16, y: 1}, {x: 14, y: 2}, {x: 15, y: 2}, {x: 16, y: 2}], start: {x: 16, y: 1}, color: '#2ecc71', picto: '🟢' },
    BLEU: { zone: [{x: 1, y: 11}, {x: 2, y: 11}, {x: 1, y: 12}, {x: 2, y: 12}], start: {x: 1, y: 12}, color: '#3498db', picto: '🔵' },
    JAUNE: { zone: [{x: 15, y: 11}, {x: 16, y: 11}, {x: 15, y: 12}, {x: 16, y: 12}], start: {x: 16, y: 12}, color: '#f1c40f', picto: '🟡' }
};

/**
 * Zones de l'île
 */
const ZONES = {
    MER: [], // Cases de mer (bordures)
    VOLCAN: [], // Zone volcanique centrale (F7 à I10)
    VOLCAN_DANGER: [], // Cases autour du volcan (éruption)
    GROTTE_ENTREES: [{x: 6, y: 7}, {x: 11, y: 6}] // H6 et G11
};

// Initialiser les zones
function initZones() {
    // Mer : bordures (colonnes 0 et 17, lignes A et N)
    for (let x = 0; x < GRID_WIDTH; x++) {
        ZONES.MER.push({x, y: 0}); // Ligne A
        ZONES.MER.push({x, y: 13}); // Ligne N
    }
    for (let y = 1; y < GRID_HEIGHT - 1; y++) {
        ZONES.MER.push({x: 0, y}); // Colonne 0
        ZONES.MER.push({x: 17, y}); // Colonne 17
    }
    
    // Volcan : F7 à I10 (colonnes 5-8, lignes 6-9)
    for (let x = 7; x <= 10; x++) {
        for (let y = 5; y <= 8; y++) {
            ZONES.VOLCAN.push({x, y});
        }
    }
    
    // Zone de danger autour du volcan
    for (let x = 6; x <= 11; x++) {
        for (let y = 4; y <= 9; y++) {
            if (!isInZone({x, y}, ZONES.VOLCAN)) {
                ZONES.VOLCAN_DANGER.push({x, y});
            }
        }
    }
    console.log('🌋 ZONES.VOLCAN =', ZONES.VOLCAN);
    console.log('⚠️ ZONES.VOLCAN_DANGER =', ZONES.VOLCAN_DANGER);
}

/**
 * Items du jeu
 */
const ITEMS = [
    { name: 'totem', icon: '🗿', durability: 1, slot: 'sac', description: 'Scanner la zone' },
    { name: 'pioche', icon: '⛏️', durability: 4, slot: 'main', description: 'Fouille automatique' },
    { name: 'arc', icon: '🏹', durability: 3, slot: 'main', description: 'Chasser les oiseaux' },
    { name: 'torche', icon: '🔥', durability: 4, slot: 'main', description: 'Protection contre morsures' },
    { name: 'gourde', icon: '🥤', durability: 2, slot: 'sac', description: 'Protection canicule' },
    { name: 'trousse', icon: '🩹', durability: 1, slot: 'sac', description: '-2 Blessures, -1 Fatigue' },
    { name: 'canne', icon: '🎣', durability: 3, slot: 'main', description: 'Pêcher les poissons' },
    { name: 'bottes', icon: '🥾', durability: 2, slot: 'sac', description: 'Protection orage (6 cases)' },
    { name: 'machette', icon: '🔪', durability: 4, slot: 'main', description: 'Arbres = 1 déplacement' },
    { name: 'banane', icon: '🍌', durability: 1, slot: 'sac', description: '-1 Fatigue' },
    { name: 'coco', icon: '🥥', durability: 1, slot: 'sac', description: '-1 Blessure' },
    { name: 'mangue', icon: '🥭', durability: 1, slot: 'sac', description: 'Offrande à l\'autel' },
    { name: 'diamant', icon: '💎', durability: 1, slot: 'sac', description: 'Votes bonus' },
    { name: 'camera', icon: '🎥', durability: 1, slot: 'sac', description: 'Face Cam' }
];

/**
 * Items rares (uniques mondialement)
 */
const RARE_ITEMS = [
    { name: 'totem_dore', icon: '🏆', baseVotes: 250, description: 'Compteur votes mondial', isPossessable: false },
    { name: 'bracelet_immunite', icon: '💫', description: 'Immunité morsures', isPossessable: true },
    { name: 'lunettes_soleil', icon: '🕶️', description: 'Missions Flash x2', isPossessable: true }
];

/**
 * Lieux mystiques (positions quotidiennes)
 */
const LIEUX_MYSTIQUES = [
    { name: 'temple', icon: '🛕', effect: 'Fatigue + Blessure = 0 (avec totem)' },
    { name: 'photo_booth', icon: '📸', effect: '+20 votes par photo' },
    { name: 'antenne_radio', icon: '📻', effect: 'Piocher 2 cartes Face Cam' },
    { name: 'autel_offrandes', icon: '⛩️', effect: 'Poser 1 mangue = +50 votes + 1 carte Face Cam' },
    { name: 'cabine_regie', icon: '🎬', effect: 'Indique position d\'un diamant' },
    { name: 'station_meteo', icon: '🌤️', effect: '3 prochains tours = Beau Temps' },
    { name: 'source_sacree', icon: '💧', effect: 'Fatigue = 0' },
    { name: 'tombe', icon: '⚰️', effect: '50% : 100 votes OU 2 Blessures' }
];

/**
 * Missions Flash
 */
const MISSIONS_TEMPORAIRES = [
    { id: 1, libelle: 'Aller sur votre camp de base', notFirstTurn: true, forceBeauTemps: true },
    { id: 2, libelle: 'Aller sur le volcan', notFirstTurn: true },
    { id: 3, libelle: 'Manger 1 mangue', notFirstTurn: true },
    { id: 4, libelle: 'Avoir 0 Blessure', notFirstTurn: true },
    { id: 5, libelle: 'Avoir 0 Fatigue', notFirstTurn: true },
    { id: 6, libelle: 'Sprintez en ligne droite (6 cases)' },
    { id: 7, libelle: 'Restez sur place (0 case)' },
    { id: 8, libelle: 'Courez en ligne droite (4 cases)' },
    { id: 9, libelle: 'Marchez en ligne droite (2 cases)' },
    { id: 10, libelle: 'Ramassez 1 banane' },
    { id: 11, libelle: 'Ramassez 1 noix de coco' },
    { id: 12, libelle: 'Faites vous mordre par un croco' }
];

/**
 * Types de météo
 */
const METEO_TYPES = [
    { name: 'Beau temps', icon: '☀️', effect: 'RAS', class: 'weather-sunny' },
    { name: 'Canicule', icon: '🌡️', effect: 'Fatigue +1, Cocotiers +1', class: 'weather-canicule' },
    { name: 'Pluie fine', icon: '🌧️', effect: 'Bananiers +1', class: 'weather-pluie' },
    { name: 'Orage', icon: '⛈️', effect: 'Déplacement max 4', class: 'weather-orage' },
    { name: 'Tempête', icon: '🌪️', effect: 'Perte items main', class: 'weather-tempete', rare: true }
];

/**
 * Cartes de décodage pour chaque joueur
 */
const carteROUGE = [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'], // L1
    ['C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'A', 'B'], // L2
    ['E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'A', 'B', 'C', 'D'], // L3
    ['G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'A', 'B', 'C', 'D', 'E', 'F'], // L4
    ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']  // L5
];

const carteVERT = [
    ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'A'],
    ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'A', 'B', 'C'],
    ['F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'A', 'B', 'C', 'D', 'E'],
    ['H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'A', 'B', 'C', 'D', 'E', 'F', 'G'],
    ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
];

const carteBLEU = [
    ['C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'A', 'B'],
    ['E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'A', 'B', 'C', 'D'],
    ['G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'A', 'B', 'C', 'D', 'E', 'F'],
    ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
];

const carteJAUNE = [
    ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'A', 'B', 'C'],
    ['F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'A', 'B', 'C', 'D', 'E'],
    ['H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'A', 'B', 'C', 'D', 'E', 'F', 'G'],
    ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
    ['L', 'M', 'N', 'O', 'P', 'Q', 'R', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']
];

// ========================================
// PARTIE 2 : VARIABLES GLOBALES DU JEU
// ========================================

// Configuration de la partie
let maxTurns = 25;
let currentTurn = 1;
let currentPlayerIndex = 0;

// Joueurs
let players = [];
let playerColors = ['ROUGE', 'VERT', 'BLEU', 'JAUNE'];
let currentPlayerSelectionIndex = 0;

// État du jeu
let gameStarted = false;
let gameEnded = false;

// Météo
let currentWeather = null;
let nextWeathers = [];

// Mission Flash
let currentTemporaryMission = null;
let drawnMissions = []; // Missions déjà tirées

// Station Météo
let stationMeteoUsed = false; // Une seule utilisation par partie

// Données mondiales (Firebase)
let globalData = {
    lieuxMystiques: {},
    itemsRares: {},
    marcheVotes: {
        orange: 100,
        noir: 200,
        marron: 300,
        blanc: 400
    },
    jaugeVolcan: 0,
    jaugeCroco: 0,
    nbJoueurs: 0,
    totemDoreVotes: 250 // Valeur mondiale du totem doré
};

// Items sur l'île (position cachée)
let itemsOnIsland = [];

// Arbres (cocotiers et bananiers)
let trees = [];

// Animaux
let crocodiles = [];
let oiseaux = [];
let poissons = [];

// Synthèse vocale
let isMuted = false;
let speechSynthesis = window.speechSynthesis;

// Scanner QR
let html5QrCode = null;

// ========================================
// PARTIE 3 : FONCTIONS UTILITAIRES
// ========================================

/**
 * Vérifie si une position est dans une zone
 */
function isInZone(pos, zone) {
    return zone.some(z => z.x === pos.x && z.y === pos.y);
}

/**
 * Vérifie si une position est valide (dans la grille)
 */
function isValidPosition(x, y) {
    return x >= 0 && x < GRID_WIDTH && y >= 0 && y < GRID_HEIGHT;
}

/**
 * Convertit une position en coordonnées lisibles (ex: "B-3")
 */
function posToCoord(x, y) {
    if (!isValidPosition(x, y)) return 'Hors grille';
    return `${ALPHABET[y]}-${x}`;
}

/**
 * Convertit des coordonnées en position (ex: "B-3" -> {x: 3, y: 1})
 */
function coordToPos(coord) {
    const parts = coord.split('-');
    if (parts.length !== 2) return null;
    
    const y = ALPHABET.indexOf(parts[0]);
    const x = parseInt(parts[1]);
    
    if (y === -1 || !isValidPosition(x, y)) return null;
    return {x, y};
}

/**
 * Calcule la distance Manhattan entre deux positions
 */
function distance(pos1, pos2) {
    return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
}

/**
 * Génère un nombre aléatoire entre min et max (inclus)
 */
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Mélange un tableau (Fisher-Yates)
 */
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Encode les coordonnées avec la carte de décodage du joueur
 */
function encodeCoordinates(player, x, y) {
    // Récupérer la carte du joueur
    let playerCard;
    if (player.color === 'BLEU') playerCard = carteBLEU;
    else if (player.color === 'ROUGE') playerCard = carteROUGE;
    else if (player.color === 'JAUNE') playerCard = carteJAUNE;
    else if (player.color === 'VERT') playerCard = carteVERT;
    
    if (!playerCard) return 'Erreur';
    
    // Tirer une ligne au hasard (0-4 pour L1-L5)
    let randomLine = Math.floor(Math.random() * 5);
    
    // Récupérer la lettre correspondant à X dans cette ligne
    let letterX = playerCard[randomLine][x];
    
    // Récupérer la lettre Y (A-N)
    let letterY = ALPHABET[y];
    
    // Format : L3 : B-C
    return `L${randomLine + 1} : ${letterY}-${letterX}`;
}

/**
 * Affiche une notification toast
 */
function showToast(message, type = 'info', duration = 3000) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.className = `toast toast-${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

/**
 * Synthèse vocale
 */
function speak(text) {
    if (isMuted || !speechSynthesis) return;
    
    // Annuler les messages en cours
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-CA';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    speechSynthesis.speak(utterance);
}

/**
 * Toggle mute
 */
function toggleMute() {
    isMuted = !isMuted;
    const btn = document.getElementById('mute-btn');
    if (btn) {
        btn.textContent = isMuted ? '🔇' : '🔊';
        btn.classList.toggle('muted', isMuted);
    }
    
    if (isMuted) {
        speechSynthesis.cancel();
        showToast('Voix désactivée', 'info');
    } else {
        showToast('Voix activée', 'success');
        speak('Voix activée');
    }
}

/**
 * Affiche/masque l'overlay
 */
function showOverlay() {
    const overlay = document.getElementById('overlay');
    if (overlay) overlay.style.display = 'block';
}

function hideOverlay() {
    const overlay = document.getElementById('overlay');
    if (overlay) overlay.style.display = 'none';
}

/**
 * Affiche une modale
 */
function showModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'block';
        showOverlay();
    }
}

function hideModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'none';
        hideOverlay();
    }
}

console.log('✅ Partie 1 chargée : Configuration et utilitaires');

// ========================================
// PARTIE 4 : FIREBASE ET DONNÉES MONDIALES
// ========================================

/**
 * Initialise les données mondiales pour la journée
 */
async function initGlobalData() {
    console.log('🌍 Initialisation des données mondiales...');
    
    if (!isFirebaseConnected) {
        console.warn('⚠️ Firebase non connecté, utilisation de données locales');
        initLocalGlobalData();
        return;
    }
    
    try {
        const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
        const globalRef = database.ref(`global/${today}`);
        const worldRef = database.ref('world'); // Référence mondiale pour les jauges
        
        // Charger les données mondiales (partagées entre toutes les parties)
        const worldSnapshot = await worldRef.once('value');
        if (worldSnapshot.exists()) {
            const worldData = worldSnapshot.val();
            globalData.jaugeVolcan = worldData.jaugeVolcan || 0;
            globalData.jaugeCroco = worldData.jaugeCroco || 0;
            
            // Charger le totem doré mondial
            if (worldData.totemDore) {
                globalData.totemDoreVotes = worldData.totemDore.baseVotes || 250;
            } else {
                globalData.totemDoreVotes = 250;
            }
            
            console.log('✅ Données mondiales chargées:', {
                volcan: globalData.jaugeVolcan,
                croco: globalData.jaugeCroco,
                totemDore: globalData.totemDoreVotes
            });
        } else {
            // Créer les données mondiales si elles n'existent pas
            globalData.jaugeVolcan = 0;
            globalData.jaugeCroco = 0;
            globalData.totemDoreVotes = 250;
            await worldRef.set({
                jaugeVolcan: 0,
                jaugeCroco: 0,
                totemDore: {
                    baseVotes: 250
                }
            });
            console.log('🆕 Données mondiales créées');
        }
        
        // Écouter les changements des données mondiales en temps réel
        worldRef.on('value', (snapshot) => {
            if (snapshot.exists()) {
                const worldData = snapshot.val();
                globalData.jaugeVolcan = worldData.jaugeVolcan || 0;
                globalData.jaugeCroco = worldData.jaugeCroco || 0;
                
                // Mettre à jour le totem doré
                if (worldData.totemDore) {
                    globalData.totemDoreVotes = worldData.totemDore.baseVotes || 250;
                }
                
                updateGlobalDataDisplay();
            }
        });
        
        // Vérifier si les données du jour existent déjà
        const snapshot = await globalRef.once('value');
        console.log('snapshot = ', snapshot);
        
        if (snapshot.exists()) {
            // Charger les données existantes (SAUF lieuxMystiques qui sont gérés séparément)
            const data = snapshot.val();
            globalData.itemsRares = data.itemsRares || {};
            globalData.marcheVotes = data.marcheVotes || {
                orange: 100,
                noir: 200,
                marron: 300,
                blanc: 400,
                scans: { orange: 0, noir: 0, marron: 0, blanc: 0 }
            };
            globalData.nbJoueurs = data.nbJoueurs || 0;
            // Ne PAS charger lieuxMystiques depuis ici
            console.log('✅ Données mondiales chargées depuis Firebase (hors lieux mystiques)');
        } else {
            // Créer les données pour aujourd'hui
            console.log('🆕 Création des données mondiales pour aujourd\'hui...');
            
            // Générer les positions des lieux mystiques
            globalData.lieuxMystiques = generateLieuxMystiquesPositions();
            
            // Générer les positions des items rares
            globalData.itemsRares = generateRareItemsPositions();
            
            // Initialiser le marché
            globalData.marcheVotes = {
                orange: 100,
                noir: 200,
                marron: 300,
                blanc: 400,
                scans: { orange: 0, noir: 0, marron: 0, blanc: 0 }
            };
            
            globalData.nbJoueurs = 0;
            
            // Sauvegarder dans Firebase (SANS les jauges qui sont dans world/)
            await globalRef.set({
                itemsRares: globalData.itemsRares,
                marcheVotes: globalData.marcheVotes,
                nbJoueurs: globalData.nbJoueurs
            });
            console.log('✅ Données mondiales créées et sauvegardées');
        }
        
        // Incrémenter le nombre de joueurs
        globalData.nbJoueurs = (globalData.nbJoueurs || 0) + players.length;
        await globalRef.child('nbJoueurs').set(globalData.nbJoueurs);
        
        // Écouter les changements en temps réel (données du jour)
        globalRef.on('value', (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                // Mettre à jour SANS écraser lieuxMystiques (gérés séparément)
                const savedLieux = globalData.lieuxMystiques;
                globalData.itemsRares = data.itemsRares || globalData.itemsRares;
                globalData.marcheVotes = data.marcheVotes || globalData.marcheVotes;
                globalData.nbJoueurs = data.nbJoueurs || globalData.nbJoueurs;
                // Restaurer lieuxMystiques
                globalData.lieuxMystiques = savedLieux;
                updateGlobalDataDisplay();
            }
        });
        
    } catch (error) {
        console.error('❌ Erreur Firebase:', error);
        initLocalGlobalData();
    }
}

/**
 * Initialise les données mondiales en local (sans Firebase)
 */
function initLocalGlobalData() {
    console.log('💾 Initialisation des données locales...');
    
    globalData.lieuxMystiques = generateLieuxMystiquesPositions();
    globalData.itemsRares = generateRareItemsPositions();
    globalData.marcheVotes = {
        orange: 100,
        noir: 200,
        marron: 300,
        blanc: 400,
        scans: { orange: 0, noir: 0, marron: 0, blanc: 0 }
    };
    globalData.jaugeVolcan = 0;
    globalData.jaugeCroco = 0;
    globalData.nbJoueurs = players.length;
    
    updateGlobalDataDisplay();
}

/**
 * Génère les positions aléatoires des lieux mystiques
 */
function generateLieuxMystiquesPositions() {
    const positions = {};
    const availablePositions = [];
    
    // Générer toutes les positions valides (hors mer, volcan, camps)
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
            
            availablePositions.push(pos);
        }
    }
    
    // Mélanger et attribuer
    const shuffled = shuffle(availablePositions);
    LIEUX_MYSTIQUES.forEach((lieu, index) => {
        if (shuffled[index]) {
            positions[lieu.name] = shuffled[index];
        }
    });
    
    console.log('✅ Lieux mystiques générés:');
    for (let lieuName in positions) {
        const lieu = LIEUX_MYSTIQUES.find(l => l.name === lieuName);
        if (lieu && positions[lieuName]) {
            console.log(`  ${lieu.icon} ${lieuName} : ${posToCoord(positions[lieuName].x, positions[lieuName].y)}`);
        }
    }
    return positions;
}

/**
 * Génère les positions aléatoires des items rares
 */
function generateRareItemsPositions() {
    const positions = {};
    const availablePositions = [];
    
    // Générer toutes les positions valides
    for (let x = 1; x < GRID_WIDTH - 1; x++) {
        for (let y = 1; y < GRID_HEIGHT - 1; y++) {
            const pos = {x, y};
            if (isInZone(pos, ZONES.MER)) continue;
            availablePositions.push(pos);
        }
    }
    
    // Mélanger et attribuer
    const shuffled = shuffle(availablePositions);
    RARE_ITEMS.forEach((item, index) => {
        if (shuffled[index]) {
            if (item.name === 'totem_dore') {
                // Totem doré : item à trouver avec valeur mondiale
                positions[item.name] = {
                    position: shuffled[index],
                    baseVotes: globalData.totemDoreVotes || 250, // Utiliser la valeur mondiale
                    isPossessable: false // Pas possédable mais trouvable
                };
            } else {
                // Items possédables
                positions[item.name] = {
                    position: shuffled[index],
                    possessedBy: null,
                    possessedByPicto: null,
                    possessionStartTime: null,
                    isPossessable: true
                };
            }
        }
    });
    
    console.log('✅ Items rares générés:');
    for (let itemName in positions) {
        const item = RARE_ITEMS.find(i => i.name === itemName);
        if (item && positions[itemName] && positions[itemName].position) {
            console.log(`  ${item.icon} ${itemName} : ${posToCoord(positions[itemName].position.x, positions[itemName].position.y)}`);
        }
    }
    return positions;
}

/**
 * Met à jour l'affichage des données mondiales
 */
function updateGlobalDataDisplay() {
    // Jauge volcan (seuil fixe mondial : 100)
    const volcanoGauge = document.getElementById('volcano-gauge');
    if (volcanoGauge) {
        const maxVolcano = 100;
        const percentage = Math.min(100, Math.round((globalData.jaugeVolcan / maxVolcano) * 100));
        volcanoGauge.textContent = `${globalData.jaugeVolcan}/${maxVolcano}`;
        volcanoGauge.style.color = percentage >= 80 ? '#e74c3c' : percentage >= 50 ? '#f39c12' : '#2ecc71';
    }
    
    // Jauge crocodiles (seuil fixe mondial : 200)
    const crocoGauge = document.getElementById('croco-gauge');
    if (crocoGauge) {
        const maxCroco = 200;
        const level = globalData.jaugeCroco;
        const percentage = Math.round((level / maxCroco) * 100);
        
        let text = 'Normal';
        let color = '#2ecc71';
        
        if (level >= maxCroco * 0.75) {
            text = 'Furie';
            color = '#e74c3c';
        } else if (level >= maxCroco * 0.5) {
            text = 'Énervé';
            color = '#f39c12';
        }
        
        crocoGauge.textContent = `${text} (${level}/${maxCroco})`;
        crocoGauge.style.color = color;
    }
    
    // Marché des votes
    if (globalData.marcheVotes) {
        const marketOrange = document.getElementById('market-orange');
        const marketBlack = document.getElementById('market-black');
        const marketBrown = document.getElementById('market-brown');
        const marketWhite = document.getElementById('market-white');
        
        if (marketOrange) marketOrange.textContent = globalData.marcheVotes.orange;
        if (marketBlack) marketBlack.textContent = globalData.marcheVotes.noir;
        if (marketBrown) marketBrown.textContent = globalData.marcheVotes.marron;
        if (marketWhite) marketWhite.textContent = globalData.marcheVotes.blanc;
    }
    
    // Items rares
    const rareItemsBanner = document.getElementById('rare-items-banner');
    const rareItemsContent = document.getElementById('rare-items-content');
    
    if (rareItemsBanner && rareItemsContent && globalData.itemsRares) {
        let html = '';
        let hasItems = false;
        
        for (let itemName in globalData.itemsRares) {
            const itemData = globalData.itemsRares[itemName];
            const item = RARE_ITEMS.find(i => i.name === itemName);
            
            if (item) {
                hasItems = true;
                const displayNameTmp = item.name.replace('_', ' ').toUpperCase().split(' ');
                const displayName = displayNameTmp[0];
                if (itemName === 'totem_dore') {
                    // Totem doré : afficher la valeur mondiale
                    const votes = globalData.totemDoreVotes || 250;
                    html += `<div class="info-item">`;
                    html += `<span>${item.icon}</span>`;
                    html += `<span style="font-size: 0.7rem;">${displayName}<br><span style="color: var(--gold); font-weight: bold;">${votes} votes</span></span>`;
                    html += `</div>`;
                } else if (itemData.possessedBy) {
                    // Item possédé
                    const picto = itemData.possessedByPicto || '👤';
                    const owner = itemData.possessedBy || 'Inconnu';
                    html += `<div class="info-item" style="opacity: 0.6;">`;
                    html += `<span>${item.icon}</span>`;
                    html += `<span style="font-size: 0.7rem;">${displayName}<br><span style="color: #e74c3c;">✖ ${picto} ${owner}</span></span>`;
                    html += `</div>`;
                } else {
                    // Item disponible
                    html += `<div class="info-item">`;
                    html += `<span>${item.icon}</span>`;
                    html += `<span style="font-size: 0.7rem;">${displayName}<br><span style="color: #2ecc71;">✔ Dispo</span></span>`;
                    html += `</div>`;
                }
            }
        }
        
        if (hasItems) {
            rareItemsContent.innerHTML = html;
            rareItemsBanner.style.display = 'flex';
        } else {
            rareItemsBanner.style.display = 'none';
        }
    }
}

/**
 * Met à jour la jauge du volcan
 */
async function updateVolcanoGauge(increment) {
    globalData.jaugeVolcan += increment;
    
    if (isFirebaseConnected) {
        try {
            // Sauvegarder dans world/ (mondial) au lieu de global/{date}/
            await database.ref('world/jaugeVolcan').set(globalData.jaugeVolcan);
            console.log(`🌋 Jauge volcan mise à jour : ${globalData.jaugeVolcan} (+${increment})`);
        } catch (error) {
            console.error('❌ Erreur mise à jour jauge volcan:', error);
        }
    }
    
    updateGlobalDataDisplay();
    
    // Vérifier éruption (seuil fixe mondial : 100)
    const maxVolcano = 100;
    if (globalData.jaugeVolcan >= maxVolcano) {
        triggerVolcanoEruption();
    }
}

/**
 * Met à jour la jauge des crocodiles
 */
async function updateCrocoGauge(increment) {
    globalData.jaugeCroco += increment;
    
    if (isFirebaseConnected) {
        try {
            // Sauvegarder dans world/ (mondial) au lieu de global/{date}/
            await database.ref('world/jaugeCroco').set(globalData.jaugeCroco);
            console.log(`🐊 Jauge croco mise à jour : ${globalData.jaugeCroco} (+${increment})`);
        } catch (error) {
            console.error('❌ Erreur mise à jour jauge croco:', error);
        }
    }
    
    updateGlobalDataDisplay();
}

/**
 * Vérifie si les crocodiles sont en mode Furie
 */
function isCrocoFurie() {
    const maxCroco = 200; // Seuil fixe mondial
    const level = globalData.jaugeCroco;
    
    return level >= maxCroco * 0.75; // >= 1500
}

/**
 * Vérifie si les crocodiles sont en mode Énervé
 */
function isEnerve() {
    const maxCroco = 200; // Seuil fixe mondial
    const level = globalData.jaugeCroco;
    
    return level >= maxCroco * 0.5; // >= 1000
}

/**
 * Déclenche une éruption volcanique
 */
async function triggerVolcanoEruption() {
    console.log('🌋 ÉRUPTION VOLCANIQUE !');
    speak('Attention ! Éruption volcanique ! Tous les aventuriers sur le volcan et autour sont évacués !');
    
    // Vérifier chaque joueur
    players.forEach(player => {
        const pos = player.position;
        if (isInZone(pos, ZONES.VOLCAN) || isInZone(pos, ZONES.VOLCAN_DANGER)) {
            // Évacuation
            evacuatePlayer(player, 'Éruption volcanique');
        }
    });
    
    // Réinitialiser la jauge mondiale
    globalData.jaugeVolcan = 0;
    
    if (isFirebaseConnected) {
        try {
            await database.ref('world/jaugeVolcan').set(0);
            console.log('🌋 Jauge volcan réinitialisée après éruption');
        } catch (error) {
            console.error('❌ Erreur réinitialisation jauge volcan:', error);
        }
    }
    
    updateGlobalDataDisplay();
}

/**
 * Met à jour le marché des votes
 */
async function updateMarketVotes(missionColor) {
    if (!globalData.marcheVotes.scans) {
        globalData.marcheVotes.scans = { orange: 0, noir: 0, marron: 0, blanc: 0 };
    }
    
    globalData.marcheVotes.scans[missionColor]++;
    
    const nbJoueurs = globalData.nbJoueurs || 1;
    
    // Calculer les seuils PAR VALEUR (pas par couleur)
    const seuils = {
        400: Math.max(1, Math.round(nbJoueurs * 0.3)),  // Blanc initial
        300: Math.max(1, Math.round(nbJoueurs * 0.5)),  // Marron initial
        200: Math.max(1, Math.round(nbJoueurs * 0.7)),  // Noir initial
        100: Math.max(1, Math.round(nbJoueurs * 1.2))   // Orange initial
    };
    
    console.log('📊 Seuils par valeur:', seuils);
    console.log('📊 Scans actuels:', globalData.marcheVotes.scans);
    
    // Vérifier les changements : on vérifie si UNE couleur a atteint son seuil
    let changed = false;
    
    // Pour chaque couleur, vérifier si elle a atteint le seuil de SA valeur actuelle
    for (let color in globalData.marcheVotes.scans) {
        const valeur = globalData.marcheVotes[color];
        const seuil = seuils[valeur];
        
        if (seuil && globalData.marcheVotes.scans[color] >= seuil) {
            console.log(`✅ ${color} (valeur ${valeur}) a atteint son seuil : ${globalData.marcheVotes.scans[color]} >= ${seuil}`);
            changed = true;
            globalData.marcheVotes.scans[color] = 0;
        }
    }
    
    if (changed) {
        console.log('📊 CHANGEMENT DU MARCHÉ DES VOTES');
        console.log('   Avant:', JSON.stringify(globalData.marcheVotes));
        
        // 1) DUEL DES EXTRÊM ES : Le groupe 400 passe à 100 et inversement
        // Trouver quelle couleur a 400 et quelle couleur a 100
        let color400 = null;
        let color100 = null;
        
        for (let color in globalData.marcheVotes) {
            if (color === 'scans') continue;
            if (globalData.marcheVotes[color] === 400) color400 = color;
            if (globalData.marcheVotes[color] === 100) color100 = color;
        }
        
        if (color400 && color100) {
            globalData.marcheVotes[color400] = 100;
            globalData.marcheVotes[color100] = 400;
            console.log(`   Duel des extrêmes : ${color400} (400→100) <-> ${color100} (100→400)`);
        }
        
        // 2) L'ESCALIER TOURNANT : Pour les groupes 300 et 200 uniquement
        // Si l'un des 2 atteint son seuil, il fait monter d'un niveau les groupes d'en dessous
        // Lui-même passe à 100
        
        // Trouver quelle couleur a 300 et quelle couleur a 200
        let color300 = null;
        let color200 = null;
        
        for (let color in globalData.marcheVotes) {
            if (color === 'scans') continue;
            if (globalData.marcheVotes[color] === 300) color300 = color;
            if (globalData.marcheVotes[color] === 200) color200 = color;
        }
        
        // Si le groupe 300 atteint son seuil (vérifier avec le seuil de la valeur 300)
        if (color300 && globalData.marcheVotes.scans[color300] >= seuils[300]) {
            console.log(`   Escalier : ${color300} (300) atteint son seuil ${seuils[300]}`);
            // Les groupes en dessous (200 et 100) montent de 100
            for (let color in globalData.marcheVotes) {
                if (color === 'scans') continue;
                if (globalData.marcheVotes[color] === 200) {
                    globalData.marcheVotes[color] = 300;
                    console.log(`     ${color} : 200 → 300`);
                }
                if (globalData.marcheVotes[color] === 100) {
                    globalData.marcheVotes[color] = 200;
                    console.log(`     ${color} : 100 → 200`);
                }
            }
            // Lui-même passe à 100
            globalData.marcheVotes[color300] = 100;
            console.log(`     ${color300} : 300 → 100`);
        }
        
        // Si le groupe 200 atteint son seuil (vérifier avec le seuil de la valeur 200)
        if (color200 && globalData.marcheVotes.scans[color200] >= seuils[200]) {
            console.log(`   Escalier : ${color200} (200) atteint son seuil ${seuils[200]}`);
            // Le groupe en dessous (100) monte de 100
            for (let color in globalData.marcheVotes) {
                if (color === 'scans') continue;
                if (globalData.marcheVotes[color] === 100) {
                    globalData.marcheVotes[color] = 200;
                    console.log(`     ${color} : 100 → 200`);
                }
            }
            // Lui-même passe à 100
            globalData.marcheVotes[color200] = 100;
            console.log(`     ${color200} : 200 → 100`);
        }
        
        console.log('   Après:', JSON.stringify(globalData.marcheVotes));
        
        showToast('📊 Le marché des votes a changé !', 'info', 4000);
        speak('Le marché des votes a changé !');
    }
    
    if (isFirebaseConnected) {
        try {
            const today = new Date().toISOString().split('T')[0];
            await database.ref(`global/${today}/marcheVotes`).set(globalData.marcheVotes);
        } catch (error) {
            console.error('❌ Erreur mise à jour marché:', error);
        }
    }
    
    updateGlobalDataDisplay();
}

console.log('✅ Partie 2 chargée : Firebase et données mondiales');

// ========================================
// PARTIE 5 : GESTION DES JOUEURS
// ========================================

/**
 * Classe Joueur
 */
class Player {
    constructor(color, name = null, isPersonal = false, qrData = null) {
        this.color = color;
        this.name = name || `JOUEUR ${color}`;
        this.isPersonal = isPersonal;
        this.qrData = qrData;
        
        // ID unique du joueur
        if (isPersonal && qrData && qrData.id) {
            // Joueur personnel : utiliser l'ID de la base de données
            this.playerId = qrData.id;
        } else {
            // Joueur générique : créer un ID avec timestamp + couleur
            this.playerId = `generic_${color.toLowerCase()}_${Date.now()}`;
        }
        
        console.log(`🆔 Joueur créé : ${this.name} (ID: ${this.playerId})`);
        
        // Position
        this.position = {...CAMPS[color].start};
        
        // Statistiques
        this.votes = 0;
        this.fatigue = 0;
        this.blessure = 0;
        this.xp = 0;
        
        // Inventaire
        this.leftHand = null;
        this.rightHand = null;
        this.backpack = [null, null, null];
        
        // Missions
        this.secretMission = null;
        this.completedTemporaryMissions = [];
        
        // Cartes Action
        this.actionCards = [];
        
        // Historique des actions
        this.actions = [];
        
        // État
        this.evacuated = false;
        this.evacuationReason = null;
        
        // Apparence
        this.picto = CAMPS[color].picto;
        this.colorHex = CAMPS[color].color;
        
        // Stats persistantes (si joueur personnel)
        if (isPersonal && qrData) {
            this.totalGames = qrData.totalGames || 0;
            this.totalVictories = qrData.totalVictories || 0;
            this.totalEvacuations = qrData.totalEvacuations || 0;
            this.totalXP = qrData.totalXP || 0;
            this.records = qrData.records || { turns10: 0, turns25: 0, turns50: 0 };
        }
    }
    
    /**
     * Ajoute un item à l'inventaire
     */
    addItem(item, slot = null) {
        // Si slot spécifié
        if (slot) {
            if (slot === 'left') {
                if (this.leftHand) return false;
                this.leftHand = item;
                return true;
            } else if (slot === 'right') {
                if (this.rightHand) return false;
                this.rightHand = item;
                return true;
            } else if (slot.startsWith('back')) {
                const index = parseInt(slot.replace('back', ''));
                if (this.backpack[index]) return false;
                this.backpack[index] = item;
                return true;
            }
        }
        
        // Sinon, chercher un emplacement libre selon le type d'item
        if (item.slot === 'main') {
            if (!this.leftHand) {
                this.leftHand = item;
                return true;
            } else if (!this.rightHand) {
                this.rightHand = item;
                return true;
            }
        } else if (item.slot === 'sac') {
            for (let i = 0; i < 3; i++) {
                if (!this.backpack[i]) {
                    this.backpack[i] = item;
                    return true;
                }
            }
        }
        
        return false; // Inventaire plein
    }
    
    /**
     * Retire un item de l'inventaire
     */
    removeItem(slot) {
        if (slot === 'left') {
            const item = this.leftHand;
            this.leftHand = null;
            return item;
        } else if (slot === 'right') {
            const item = this.rightHand;
            this.rightHand = null;
            return item;
        } else if (slot.startsWith('back')) {
            const index = parseInt(slot.replace('back', ''));
            const item = this.backpack[index];
            this.backpack[index] = null;
            return item;
        }
        return null;
    }
    
    /**
     * Vérifie si le joueur possède un item
     */
    hasItem(itemName) {
        if (this.leftHand && this.leftHand.name === itemName) return true;
        if (this.rightHand && this.rightHand.name === itemName) return true;
        return this.backpack.some(item => item && item.name === itemName);
    }
    
    /**
     * Compte le nombre d'items dans l'inventaire
     */
    countItems() {
        let count = 0;
        if (this.leftHand) count++;
        if (this.rightHand) count++;
        count += this.backpack.filter(item => item !== null).length;
        return count;
    }
    
    /**
     * Ajoute des votes
     */
    addVotes(amount, reason = '') {
        this.votes += amount;
        console.log(`${this.picto} ${this.name} : +${amount} votes (${reason})`);
        showToast(`${this.picto} +${amount} votes : ${reason}`, 'success');
    }
    
    /**
     * Ajoute de l'XP
     */
    addXP(amount, reason = '') {
        this.xp += amount;
        if (this.isPersonal) {
            this.totalXP += amount;
        }
        console.log(`${this.picto} ${this.name} : +${amount} XP (${reason})`);
    }
    
    /**
     * Enregistre une action
     */
    recordAction(type, data = {}) {
        this.actions.push({
            type,
            turn: currentTurn,
            ...data
        });
    }
}

/**
 * Affiche l'écran de sélection des joueurs
 */
function showPlayerSelection() {
    // Récupérer la durée sélectionnée
    const selected = document.querySelector('input[name="gameDuration"]:checked');
    if (selected) {
        maxTurns = parseInt(selected.value);
        console.log('🎯 Durée de partie:', maxTurns, 'tours');
    }
    
    // Masquer l'écran de démarrage
    const startOverlay = document.getElementById('start-overlay');
    if (startOverlay) startOverlay.style.display = 'none';
    
    // Afficher l'écran de sélection
    const selectionOverlay = document.getElementById('player-selection-overlay');
    if (selectionOverlay) {
        selectionOverlay.style.display = 'flex';
        updatePlayerSelectionScreen();
    }
}

/**
 * Met à jour l'écran de sélection du joueur actuel
 */
function updatePlayerSelectionScreen() {
    const color = playerColors[currentPlayerSelectionIndex];
    const camp = CAMPS[color];
    
    const subtitle = document.getElementById('player-selection-subtitle');
    if (subtitle) {
        subtitle.textContent = `${camp.picto} JOUEUR ${color}`;
        subtitle.style.color = camp.color;
    }
    
    const buttonsContainer = document.getElementById('player-selection-buttons');
    if (buttonsContainer) {
        buttonsContainer.innerHTML = `
            <button class="player-btn player-btn-generic" style="border-color: ${camp.color};" onclick="selectGenericPlayer()">
                ${camp.picto} JOUEUR ${color}
            </button>
            <button class="player-btn player-btn-scan" onclick="scanPersonalPlayer()">
                📷 SCAN PERSO ${color}
            </button>
        `;
    }
}

/**
 * Sélectionne un joueur générique
 */
function selectGenericPlayer() {
    const color = playerColors[currentPlayerSelectionIndex];
    const player = new Player(color);
    players.push(player);
    
    console.log(`✅ Joueur générique ajouté : ${player.name} (ID: ${player.playerId})`);
    
    nextPlayerSelection();
}

/**
     * Crée un joueur à partir des données Firebase
     */
    function createPlayerFromData(playerId, playerData) {
        // Déterminer la couleur selon l'index
        const color = playerColors[currentPlayerSelectionIndex];
        
        // Créer les données QR pour le joueur personnel
        const qrData = {
            id: playerId,
            name: playerData.name,
            totalGames: playerData.totalGames || 0,
            totalVictories: playerData.totalVictories || 0,
            totalEvacuations: playerData.totalEvacuations || 0,
            totalXP: playerData.totalXP || playerData.xp || 0,
            records: playerData.records || { turns10: 0, turns25: 0, turns50: 0 }
        };
        
        // Créer le joueur avec la classe Player
        const player = new Player(color, playerData.name, true, qrData);
        
        // Restaurer les données de la partie en cours (si applicable)
        if (playerData.votes) player.votes = playerData.votes;
        if (playerData.fatigue) player.fatigue = playerData.fatigue;
        if (playerData.blessure) player.blessure = playerData.blessure;
        if (playerData.xp) player.xp = playerData.xp;
        if (playerData.leftHand) player.leftHand = playerData.leftHand;
        if (playerData.rightHand) player.rightHand = playerData.rightHand;
        if (playerData.backpack) player.backpack = playerData.backpack;
        if (playerData.actions) player.actions = playerData.actions;
        
        players.push(player);
        console.log(`✅ Joueur personnel ajouté : ${player.name} (ID: ${player.playerId})`);
        
        // Passer à l'étape suivante
        nextPlayerSelection();
    }

/**
 * Ouvre le scanner QR pour un joueur personnel
 */
function scanPersonalPlayer() {
    const qrModal = document.getElementById('qr-scanner-modal');
    if (qrModal) {
        qrModal.style.display = 'block';
        startQRScanner();
    }
}

/**
 * Démarre le scanner QR
 */
function startQRScanner() {
    if (html5QrCode) {
        html5QrCode.clear();
    }
    
    html5QrCode = new Html5Qrcode('qr-reader');
    
    html5QrCode.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 250 },
        onPlayerQRCodeScanned,
        onPlayerQRCodeError,
        (decodedText) => {
            console.log('📷 QR Code scanné:', decodedText);
            handleQRCode(decodedText);
        },
        (error) => {
            // Ignorer les erreurs de scan
        }
    ).then(() => {
            isPlayerScanning = true;
        }).catch(err => {
        console.error('❌ Erreur scanner QR:', err);
        showToast('Erreur d\'accès à la caméra', 'error');
    });
}

/**
     * Callback pour les erreurs de scan (silencieux)
     */
    function onPlayerQRCodeError(errorMessage) {
        // Ne rien faire, c'est normal pendant le scan
    }

/**
 * Callback quand un QR Code aventurier est scanné
 */
function onPlayerQRCodeScanned(decodedText, decodedResult) {
    console.log('QR Code aventurier scanné:', decodedText);
    
    // Vérifier le format: doit commencer par "lilo" et finir par "croco"
    if (!decodedText.startsWith('lilo') || !decodedText.endsWith('croco')) {
        document.getElementById('player-qr-status').innerText = 'QR Code invalide ! (doit commencer par "lilo" et finir par "croco")';
        speak('QR Code invalide !');
        return;
    }
    
    // Extraire l'identifiant unique
    let playerId = decodedText.substring(4, decodedText.length - 5); // Enlever "lilo" et "croco"
    
    if (!playerId || playerId.length === 0) {
        document.getElementById('player-qr-status').innerText = 'QR Code invalide ! (identifiant vide)';
        speak('QR Code invalide !');
        return;
    }
    
    console.log('Identifiant unique extrait:', playerId);
    
    // Fermer le scanner
    closePlayerQRScanner();
    
    // Vérifier si le profil existe dans Firebase
    checkPlayerProfile(playerId);
}

/**
     * Vérifie si le profil aventurier existe dans Firebase
     */
    function checkPlayerProfile(playerId) {
        if (!database) {
            console.warn('Firebase non disponible, création profil local');
            // Créer un profil local sans Firebase
            const color = playerColors[currentPlayerSelectionIndex];
            const player = new Player(color, `Joueur ${playerId.substring(0, 8)}`, true, { id: playerId });
            players.push(player);
            console.log(`✅ Joueur personnel ajouté (mode local) : ${player.name}`);
            nextPlayerSelection();
            return;
        }
        
        const playerRef = database.ref('players/' + playerId);
        
        // Ajouter un timeout pour éviter les blocages
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), 5000)
        );
        
        Promise.race([
            playerRef.once('value'),
            timeoutPromise
        ]).then((snapshot) => {
            if (snapshot.exists()) {
                // Le profil existe, récupérer les données
                let playerData = snapshot.val();
                console.log('Profil existant récupéré:', playerData);
                
                // Créer le joueur avec les données récupérées
                createPlayerFromData(playerId, playerData);
                
                speak(`Bienvenue ${playerData.name} !`);
            } else {
                // Le profil n'existe pas, demander le nom
                console.log('Nouveau profil, demande du nom');
                pendingPlayerId = playerId;
                showNameInputPopup();
            }
        }).catch((error) => {
            console.error('Erreur Firebase:', error);
            // En cas d'erreur, créer un profil local
            console.log('Création profil local (mode hors ligne)');
            pendingPlayerId = playerId;
            showNameInputPopup();
        });
    }



/**
 * Ferme le scanner QR
 */
function closeQRScanner() {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            html5QrCode.clear();
            html5QrCode = null;
        }).catch(err => {
            console.error('❌ Erreur fermeture scanner:', err);
        });
    }
    
    const qrModal = document.getElementById('qr-scanner-modal');
    if (qrModal) qrModal.style.display = 'none';
}

/**
 * Traite un QR Code scanné
 */
function handleQRCode(qrData) {
    try {
        const data = JSON.parse(qrData);
        
        if (data.type === 'player') {
            // QR Code d'un joueur personnel
            const color = playerColors[currentPlayerSelectionIndex];
            const player = new Player(color, data.name, true, data);
            players.push(player);
            
            console.log('✅ Joueur personnel ajouté:', player.name);
            showToast(`Bienvenue ${data.name} !`, 'success');
            
            closeQRScanner();
            nextPlayerSelection();
        } else {
            showToast('QR Code invalide', 'error');
        }
    } catch (error) {
        console.error('❌ Erreur parsing QR:', error);
        showToast('QR Code invalide', 'error');
    }
}

let isPlayerScanning = false;   // Indicateur de scan en cours

/**
     * Ferme le scanner QR aventurier
     */
    function closePlayerQRScanner() {
        if (html5QrCode && isPlayerScanning) {
            html5QrCode.stop().then(() => {
                isPlayerScanning = false;
                html5QrCode.clear();
                document.getElementById('qr-scanner-modal').style.display = 'none';
            }).catch(err => {
                console.error('Erreur arrêt caméra:', err);
            });
        } else {
            document.getElementById('qr-scanner-modal').style.display = 'none';
        }
    }

/**
 * Passe au joueur suivant ou démarre la partie
 */
function nextPlayerSelection() {
    currentPlayerSelectionIndex++;
    
    if (currentPlayerSelectionIndex >= 4) {
        // Tous les joueurs sont sélectionnés, demander si on veut en ajouter d'autres
        askAddMorePlayers();
    } else {
        // Demander si on veut ajouter un autre joueur
        askAddAnotherPlayer();
    }
}

/**
 * Demande si on veut ajouter un autre joueur
 */
function askAddAnotherPlayer() {
    if (players.length >= 2) {
        // Au moins 2 joueurs, on peut commencer
        const confirmed = confirm(`${players.length} joueur(s) ajouté(s). Ajouter un autre joueur ?`);
        if (confirmed) {
            updatePlayerSelectionScreen();
        } else {
            startGame();
        }
    } else {
        // Moins de 2 joueurs, continuer
        updatePlayerSelectionScreen();
    }
}

/**
 * Demande si on veut ajouter plus de joueurs (après 4)
 */
function askAddMorePlayers() {
    const confirmed = confirm(`4 joueurs ajoutés. Commencer la partie ?`);
    if (confirmed) {
        startGame();
    }
}

/**
 * Met à jour l'affichage du joueur actif
 */
function updatePlayerDisplay() {
    const player = players[currentPlayerIndex];
    if (!player) return;
    
    // Header
    const header = document.getElementById('player-header');
    if (header) {
        header.className = `player-header color-${player.color.toLowerCase()}`;
    }
    
    // Nom
    const nameEl = document.getElementById('player-name');
    if (nameEl) {
        nameEl.textContent = `${player.picto} ${player.name}`;
    }
    
    // Stats
    const fatigueEl = document.getElementById('player-fatigue');
    const woundEl = document.getElementById('player-wound');
    const xpEl = document.getElementById('player-xp');
    const votesEl = document.getElementById('player-votes');
    
    console.log(`   updatePlayerDisplay() - Votes du joueur : ${player.votes}`);
    
    if (fatigueEl) fatigueEl.textContent = player.fatigue;
    if (woundEl) woundEl.textContent = player.blessure;
    if (xpEl) xpEl.textContent = player.xp;
    if (votesEl) {
        votesEl.textContent = player.votes;
        console.log(`   ✅ Élément player-votes mis à jour : ${player.votes}`);
    } else {
        console.error(`   ❌ Élément player-votes introuvable !`);
    }
    
    // Couleur des stats selon le niveau
    if (fatigueEl) {
        fatigueEl.style.color = player.fatigue >= 5 ? '#e74c3c' : player.fatigue >= 3 ? '#f39c12' : '#2ecc71';
    }
    if (woundEl) {
        woundEl.style.color = player.blessure >= 5 ? '#e74c3c' : player.blessure >= 3 ? '#f39c12' : '#2ecc71';
    }
    
    // Rafraîchir le bandeau des autres joueurs
    if (typeof updateOtherPlayersDisplay === 'function') {
        updateOtherPlayersDisplay();
    }
}

console.log('✅ Partie 3 chargée : Gestion des joueurs');

// ========================================
// PARTIE 6 : INITIALISATION DU JEU
// ========================================

/**
 * Démarre la partie
 */
async function startGame() {
    console.log('🎮 Démarrage de la partie...');
    
    // Masquer l'écran de sélection
    const selectionOverlay = document.getElementById('player-selection-overlay');
    if (selectionOverlay) selectionOverlay.style.display = 'none';
    
    // Afficher le container principal
    const appContainer = document.getElementById('app-container');
    if (appContainer) appContainer.style.display = 'flex';
    
    // Initialiser les zones
    initZones();
    
    // Initialiser les données mondiales
    await initGlobalData();
    
    // Nettoyer les anciens lieux mystiques de global/{date}
    if (typeof cleanOldLieuxMystiquesFromGlobal === 'function') {
        await cleanOldLieuxMystiquesFromGlobal();
    }
    
    // Charger les lieux mystiques du jour (après initGlobalData pour avoir les arbres)
    if (typeof loadDailyLieuxMystiques === 'function') {
        globalData.lieuxMystiques = await loadDailyLieuxMystiques();
    } else {
        console.warn('⚠️ loadDailyLieuxMystiques non disponible, utilisation de la méthode par défaut');
        globalData.lieuxMystiques = generateLieuxMystiquesPositions();
    }
    
    // Générer les items sur l'île
    generateIslandItems();
    
    // Générer les arbres
    generateTrees();
    
    // Tirer la première météo
    drawWeather();
    
    // Tirer la première mission Flash
    drawTemporaryMission();
    
    // Afficher les lieux mystiques
    showLieuxMystiquesPopup();
    
    // Démarrer le premier tour
    gameStarted = true;
    currentTurn = 1;
    currentPlayerIndex = 0;
    
    updatePlayerDisplay();
    updateWeatherDisplay();
    updateOtherPlayersDisplay();
    
    speak(`Bienvenue dans Lilocroco TV Show ! Partie de ${maxTurns} tours. C'est au tour de ${players[0].name}.`);
    showToast(`🎬 Début de la partie - ${maxTurns} tours`, 'success', 4000);
    
    // Récapitulatif complet dans la console
    console.log('\n========================================');
    console.log('🎮 RÉCAPITULATIF DE LA PARTIE');
    console.log('========================================');
    console.log(`🎯 Durée : ${maxTurns} tours`);
    console.log(`👥 Joueurs : ${players.length}`);
    players.forEach(p => {
        console.log(`  ${p.picto} ${p.name} - Camp : ${posToCoord(p.position.x, p.position.y)}`);
    });
    console.log(`\n🌤️ Météo : ${currentWeather.name}`);
    console.log(`\n📊 Données mondiales :`);
    console.log(`  🌋 Jauge volcan : ${globalData.jaugeVolcan}`);
    console.log(`  🐊 Jauge crocodiles : ${globalData.jaugeCroco}`);
    console.log(`  👥 Nombre de joueurs total : ${globalData.nbJoueurs}`);
    console.log('========================================\n');
}

/**
 * Génère les items cachés sur l'île
 */
function generateIslandItems() {
    console.log("🎲 Génération des items sur l'île...");
    
    itemsOnIsland = [];
    
    // Diviser l'île en 4 quarts
    const quarters = [
        { xMin: 1, xMax: 8, yMin: 1, yMax: 7 },   // Quart 1 (haut-gauche)
        { xMin: 9, xMax: 16, yMin: 1, yMax: 7 },  // Quart 2 (haut-droite)
        { xMin: 1, xMax: 8, yMin: 8, yMax: 12 },  // Quart 3 (bas-gauche)
        { xMin: 9, xMax: 16, yMin: 8, yMax: 12 }  // Quart 4 (bas-droite)
    ];
    
    // Pour chaque type d'item (sauf consommables et caméras)
    const itemsToPlace = ITEMS.filter(item => 
        !['banane', 'coco', 'mangue', 'diamant', 'camera'].includes(item.name)
    );
    
    itemsToPlace.forEach(itemTemplate => {
        // Placer 2 items de ce type par quart (8 au total)
        quarters.forEach(quarter => {
            for (let i = 0; i < 2; i++) {
                let pos = null;
                let attempts = 0;
                
                while (!pos && attempts < 100) {
                    const x = random(quarter.xMin, quarter.xMax);
                    const y = random(quarter.yMin, quarter.yMax);
                    const testPos = {x, y};
                    
                    // Vérifier que la position est valide
                    if (isInZone(testPos, ZONES.MER)) { attempts++; continue; }
                    if (isInZone(testPos, ZONES.VOLCAN)) { attempts++; continue; }
                    
                    // Vérifier qu'il n'y a pas déjà un item ici
                    const hasItem = itemsOnIsland.some(item => item.x === x && item.y === y);
                    if (hasItem) { attempts++; continue; }
                    
                    pos = testPos;
                }
                
                if (pos) {
                    itemsOnIsland.push({
                        ...itemTemplate,
                        x: pos.x,
                        y: pos.y,
                        found: false
                    });
                }
            }
        });
    });
    
    // Ajouter les caméras (4 par ligne = 48 total)
    for (let y = 1; y < GRID_HEIGHT - 1; y++) {
        for (let i = 0; i < 4; i++) {
            let pos = null;
            let attempts = 0;
            
            while (!pos && attempts < 100) {
                const x = random(1, GRID_WIDTH - 2);
                const testPos = {x, y};
                
                if (isInZone(testPos, ZONES.MER)) { attempts++; continue; }
                
                // Exclure les camps
                let isInCamp = false;
                for (let color in CAMPS) {
                    if (isInZone(testPos, CAMPS[color].zone)) {
                        isInCamp = true;
                        break;
                    }
                }
                if (isInCamp) { attempts++; continue; }
                
                const hasItem = itemsOnIsland.some(item => item.x === x && item.y === y && item.name === 'camera');
                if (hasItem) { attempts++; continue; }
                
                pos = testPos;
            }
            
            if (pos) {
                itemsOnIsland.push({
                    name: 'camera',
                    icon: '🎥',
                    durability: 1,
                    slot: 'sac',
                    x: pos.x,
                    y: pos.y,
                    found: false
                });
            }
        }
    }
    
    // Ajouter 4 diamants dans la zone du volcan
    console.log('💎 Génération des diamants dans le volcan...');
    for (let i = 0; i < 4; i++) {
        let pos = null;
        let attempts = 0;
        
        while (!pos && attempts < 100) {
            // Choisir une position aléatoire dans le volcan
            const volcanoPos = ZONES.VOLCAN[random(0, ZONES.VOLCAN.length - 1)];
            const testPos = {x: volcanoPos.x, y: volcanoPos.y};
            
            // Vérifier qu'il n'y a pas déjà un item ici
            const hasItem = itemsOnIsland.some(item => item.x === testPos.x && item.y === testPos.y);
            if (hasItem) { attempts++; continue; }
            
            pos = testPos;
        }
        
        if (pos) {
            itemsOnIsland.push({
                name: 'diamant',
                icon: '💎',
                durability: 1,
                slot: 'sac',
                description: 'Votes bonus',
                x: pos.x,
                y: pos.y,
                found: false
            });
            console.log(`  💎 Diamant ${i + 1} placé en ${posToCoord(pos.x, pos.y)}`);
        }
    }
    
    console.log(`✅ ${itemsOnIsland.length} items générés sur l'île`);
    
    // Afficher le détail des items par type
    const itemsByType = {};
    itemsOnIsland.forEach(item => {
        if (!itemsByType[item.name]) {
            itemsByType[item.name] = [];
        }
        itemsByType[item.name].push(posToCoord(item.x, item.y));
    });
    
    console.log('\n📍 Détail des items générés :');
    for (let itemName in itemsByType) {
        const item = ITEMS.find(i => i.name === itemName);
        const positions = itemsByType[itemName];
        console.log(`  ${item.icon} ${itemName} (${positions.length}) : ${positions.join(', ')}`);
    }
    console.log('');
}

/**
 * Génère les arbres (cocotiers et bananiers) à positions fixes
 */
function generateTrees() {
    console.log('🌴 Génération des arbres à positions fixes...');
    
    trees = [];
    
    // Cocotiers (positions fixes)
    const cocotiers = [
        {x: 1, y: 7}, {x: 2, y: 7}, {x: 4, y: 2}, {x: 4, y: 5},
        {x: 6, y: 11}, {x: 7, y: 4}, {x: 7, y: 11}, {x: 8, y: 2},
        {x: 9, y: 11}, {x: 10, y: 1}, {x: 10, y: 3}, {x: 10, y: 10},
        {x: 10, y: 12}, {x: 11, y: 2}, {x: 12, y: 1}
    ];
    
    cocotiers.forEach(pos => {
        trees.push({
            type: 'cocotier',
            icon: '🌴',
            x: pos.x,
            y: pos.y,
            stock: 1,
            fruit: '🥥'
        });
        console.log(`  🌴 Cocotier en ${posToCoord(pos.x, pos.y)}`);
    });
    
    // Bananiers (positions fixes)
    const bananiers = [
        {x: 2, y: 4}, {x: 1, y: 6}, {x: 3, y: 8}, {x: 4, y: 11},
        {x: 5, y: 8}, {x: 5, y: 10}, {x: 6, y: 2}, {x: 8, y: 1},
        {x: 12, y: 11}, {x: 13, y: 5}, {x: 13, y: 10}, {x: 14, y: 5},
        {x: 14, y: 8}, {x: 15, y: 5}, {x: 15, y: 9}, {x: 16, y: 4}
    ];
    
    bananiers.forEach(pos => {
        trees.push({
            type: 'bananier',
            icon: '🌿',
            x: pos.x,
            y: pos.y,
            stock: 1,
            fruit: '🍌'
        });
        console.log(`  🌿 Bananier en ${posToCoord(pos.x, pos.y)}`);
    });
    
    console.log(`✅ ${trees.length} arbres générés (${cocotiers.length} cocotiers + ${bananiers.length} bananiers)`);
}

/**
 * Affiche la popup des lieux mystiques
 */
function showLieuxMystiquesPopup() {
    if (!globalData.lieuxMystiques || Object.keys(globalData.lieuxMystiques).length === 0) {
        return;
    }
    
    let html = '<h3 style="color: var(--gold); margin-top: 0;">🗺️ LIEUX MYSTIQUES</h3>';
    html += '<p style="font-size: 0.9rem; color: #666;">Positions pour aujourd\'hui :</p>';
    html += '<div style="text-align: left; margin: 20px 0;">';
    
    for (let lieuName in globalData.lieuxMystiques) {
        const pos = globalData.lieuxMystiques[lieuName];
        const lieu = LIEUX_MYSTIQUES.find(l => l.name === lieuName);
        
        if (lieu && pos) {
            const coord = posToCoord(pos.x, pos.y);
            html += `<div style="margin: 10px 0; padding: 10px; background: #f5f5f5; border-radius: 8px;">`;
            html += `<div style="font-weight: bold; color: #000;">${lieu.icon} ${lieu.name.replace('_', ' ').toUpperCase()}</div>`;
            html += `<div style="font-size: 0.85rem; color: #666; margin-top: 5px;">${coord} - ${lieu.effect}</div>`;
            html += `</div>`;
        }
    }
    
    html += '</div>';
    html += '<button onclick="closeLieuxMystiquesPopup();  showWeatherPopup();" class="btn btn-primary" style="width: 100%; margin-top: 10px;">OK</button>';
    
    // Créer et afficher la popup
    const modal = document.createElement('div');
    modal.id = 'lieux-mystiques-popup';
    modal.className = 'modal';
    modal.innerHTML = html;
    modal.style.display = 'block';
    
    document.body.appendChild(modal);
    showOverlay();
    
    speak('Voici les lieux mystiques pour aujourd\'hui. Notez bien leurs positions !');
}

function closeLieuxMystiquesPopup() {
    const modal = document.getElementById('lieux-mystiques-popup');
    if (modal) {
        modal.remove();
        hideOverlay();
    }
}

// ========================================
// PARTIE 7 : MÉTÉO
// ========================================

/**
 * Tire une nouvelle météo
 */
function drawWeather() {
    // Tirer 3 météos pour les 3 prochains tours
    nextWeathers = [];
    
    for (let i = 0; i < 3; i++) {
        // 90% de chance de météo normale, 10% de tempête
        const isRare = Math.random() < 0.1;
        
        let availableWeathers = METEO_TYPES.filter(m => 
            isRare ? m.rare : !m.rare
        );
        
        if (availableWeathers.length === 0) {
            availableWeathers = METEO_TYPES.filter(m => !m.rare);
        }
        
        const weather = availableWeathers[random(0, availableWeathers.length - 1)];
        nextWeathers.push(weather);
    }
    
    // Appliquer la première météo
    currentWeather = nextWeathers[0];
    
    console.log('🌤️ Météo tirée:', currentWeather.name);
    updateWeatherDisplay();
}

/**
 * Met à jour l'affichage de la météo
 */
function updateWeatherDisplay() {
    const banner = document.getElementById('weather-banner');
    const text = document.getElementById('weather-text');
    
    console.log('   updateWeatherDisplay() - Météo:', currentWeather ? currentWeather.name : 'aucune');
    console.log('   updateWeatherDisplay() - Tour:', currentTurn);
    // if (!banner || !text || !currentWeather) {
    if (!text || !currentWeather) {
        console.error('   ❌ Éléments manquants:', {banner: !!banner, text: !!text, weather: !!currentWeather});
        return;
    }
    
    // Texte
    // let weatherText = `${currentWeather.icon} ${currentWeather.name.toUpperCase()} - ${currentWeather.effect}`;
    let weatherText = `${currentWeather.icon} ${currentWeather.name.toUpperCase()}`;
    weatherText += ` <span style="color: var(--gold); font-weight: bold; margin-left: 20px;">Tour ${currentTurn}/${maxTurns}</span>`;
    
    text.innerHTML = weatherText;
    
    // Classe CSS
    //banner.className = `weather-banner ${currentWeather.class}`;
    
    // Appliquer les effets de la météo
    applyWeatherEffects();
}

/**
 * Applique les effets de la météo
 */
function applyWeatherEffects() {
    if (!currentWeather) return;
    
    if (currentWeather.name === 'Canicule') {
        // Cocotiers +1 stock
        trees.forEach(tree => {
            if (tree.type === 'cocotier') {
                tree.stock = Math.min(3, tree.stock + 1);
            }
        });
        console.log('🥥 Cocotiers +1 stock');
    } else if (currentWeather.name === 'Pluie fine') {
        // Bananiers +1 stock
        trees.forEach(tree => {
            if (tree.type === 'bananier') {
                tree.stock = Math.min(3, tree.stock + 1);
            }
        });
        console.log('🍌 Bananiers +1 stock');
    } else if (currentWeather.name === 'Tempête') {
        // Perte des items en main pour tous les joueurs
        players.forEach(player => {
            if (player.leftHand) {
                console.log(`${player.picto} ${player.name} perd ${player.leftHand.icon}`);
                player.leftHand = null;
            }
            if (player.rightHand) {
                console.log(`${player.picto} ${player.name} perd ${player.rightHand.icon}`);
                player.rightHand = null;
            }
        });
        showToast('🌪️ Tempête ! Tous les items en main sont perdus !', 'danger', 5000);
        speak('Attention ! Tempête ! Tous les aventuriers perdent leurs items en main !');
    }
}

/**
 * Change la météo au début d'un nouveau tour
 */
function changeWeather() {
    console.log('   changeWeather() - Météo actuelle:', currentWeather ? currentWeather.name : 'aucune');
    
    // Vérifier si la mission Flash a forcé le beau temps
    if (currentTemporaryMission && currentTemporaryMission.forceBeauTemps) {
        console.log('   ☀️ Mission force le beau temps, pas de changement de météo');
        // La météo a déjà été forcée par drawTemporaryMission()
        updateWeatherDisplay();
        speak(`Météo : ${currentWeather.name}. ${currentWeather.effect}`);
        return;
    }
    
    // Décaler les météos
    nextWeathers.shift();
    
    // Si moins de 3 météos, en tirer de nouvelles
    while (nextWeathers.length < 3) {
        const isRare = Math.random() < 0.1;
        let availableWeathers = METEO_TYPES.filter(m => 
            isRare ? m.rare : !m.rare
        );
        
        if (availableWeathers.length === 0) {
            availableWeathers = METEO_TYPES.filter(m => !m.rare);
        }
        
        const weather = availableWeathers[random(0, availableWeathers.length - 1)];
        nextWeathers.push(weather);
    }
    
    currentWeather = nextWeathers[0];
    console.log('   🌤️ Nouvelle météo:', currentWeather.name);
    
    updateWeatherDisplay();
    speak(`Nouvelle météo : ${currentWeather.name}. ${currentWeather.effect}`);
}

// ========================================
// PARTIE 8 : MISSIONS Flash
// ========================================

/**
 * Tire une nouvelle mission Flash
 */
function drawTemporaryMission() {
    console.log('\n--- DÉBUT drawTemporaryMission() ---');
    console.log('🎯 Tirage d\'une nouvelle mission Flash...');
    console.log(`   Tour actuel : ${currentTurn}`);
    console.log(`   Missions déjà tirées : [${drawnMissions.join(', ')}]`);
    
    let availableMissions = [...MISSIONS_TEMPORAIRES];
    console.log(`   Total missions : ${availableMissions.length}`);
    
    // Au premier tour, exclure les missions 1 à 5
    if (currentTurn === 1) {
        availableMissions = availableMissions.filter(m => !m.notFirstTurn);
        console.log(`🚫 Premier tour : missions 1-5 exclues, reste ${availableMissions.length} missions`);
    }
    
    // Exclure les missions déjà tirées
    const beforeFilter = availableMissions.length;
    availableMissions = availableMissions.filter(m => !drawnMissions.includes(m.id));
    console.log(`   Après exclusion missions tirées : ${beforeFilter} -> ${availableMissions.length}`);
    
    // Si toutes les missions ont été tirées, réinitialiser
    if (availableMissions.length === 0) {
        console.log('♻️ Toutes les missions ont été tirées, réinitialisation...');
        drawnMissions = [];
        availableMissions = [...MISSIONS_TEMPORAIRES];
        
        // Réappliquer le filtre du premier tour si nécessaire
        if (currentTurn === 1) {
            availableMissions = availableMissions.filter(m => !m.notFirstTurn);
        }
        console.log(`   Missions disponibles après reset : ${availableMissions.length}`);
    }
    
    // Tirer une mission au hasard
    const randomIndex = random(0, availableMissions.length - 1);
    const mission = availableMissions[randomIndex];
    console.log(`   Index tiré : ${randomIndex} / ${availableMissions.length - 1}`);
    console.log(`   Mission tirée :`, mission);
    
    currentTemporaryMission = mission;
    console.log(`   currentTemporaryMission assigné :`, currentTemporaryMission);
    
    // Ajouter la mission aux missions tirées
    drawnMissions.push(mission.id);
    console.log(`   Missions tirées maintenant : [${drawnMissions.join(', ')}]`);
    
    console.log(`🎯 Mission Flash #${mission.id} : ${mission.libelle}`);
    console.log(`   Missions restantes : ${availableMissions.length - 1}`);
    
    // Si la mission force le beau temps
    if (mission.forceBeauTemps) {
        const beauTemps = METEO_TYPES.find(m => m.name === 'Beau temps');
        if (beauTemps) {
            currentWeather = beauTemps;
            console.log('☀️ Mission force le Beau temps');
        }
    }
    
    console.log('   Appel updateTemporaryMissionDisplay()...');
    updateTemporaryMissionDisplay();
    console.log('--- FIN drawTemporaryMission() ---\n');
}

/**
 * Met à jour l'affichage de la mission Flash
 */
function updateTemporaryMissionDisplay() {
    const missionText = document.getElementById('mission-text');
    
    if (!missionText) {
        console.error('❌ Élément mission-text introuvable !');
        return;
    }
    
    if (currentTemporaryMission) {
        const html = `<strong>#${currentTemporaryMission.id}</strong> - ${currentTemporaryMission.libelle} <span style="color: var(--gold); font-weight: bold;">(+25 votes)</span>`;
        missionText.innerHTML = html;
        console.log(`✅ Affichage mission mis à jour : #${currentTemporaryMission.id}`);
    } else {
        missionText.textContent = 'Aucune mission en cours';
        console.log('⚠️ Aucune mission en cours');
    }
}

/**
 * Vérifie si un joueur a accompli la mission temporaire
 */
function checkTemporaryMission(player, missionId) {
    if (!currentTemporaryMission || currentTemporaryMission.id !== missionId) {
        return false;
    }
    
    // Attribuer les votes
    const votes = 25;
    player.addVotes(votes, `Mission Flash #${missionId}`);
    player.addXP(10, 'Mission Flash');
    
    // Enregistrer
    player.recordAction('mission_temporaire', {
        missionId: currentTemporaryMission.id,
        libelle: currentTemporaryMission.libelle,
        votes
    });
    
    showToast(`${player.picto} 🎯 Mission Flash accomplie ! +${votes} votes`, 'success', 5000);
    speak(`Mission Flash accomplie ! Plus ${votes} votes !`);
    
    updatePlayerDisplay();
    if (typeof updateOtherPlayersDisplay === 'function') {
        updateOtherPlayersDisplay();
    }
    
    return true;
}

// ========================================
// PARTIE 9 : ÉVACUATION
// ========================================

/**
 * Affiche la popup d'évacuation
 */
function showEvacuationPopup() {
    const modal = document.getElementById('evacuation-modal');
    const playersList = document.getElementById('evacuation-players-list');
    
    if (!modal || !playersList) return;
    
    // Vider complètement la liste pour recréer les boutons à chaque ouverture
    playersList.innerHTML = '';
    
    // Ajouter un bouton pour chaque joueur
    players.forEach((player, index) => {
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.style.width = '100%';
        btn.style.padding = '15px';
        btn.style.fontSize = '1rem';
        btn.id = `evac-btn-${index}`;
        
        // Vérifier l'état actuel du joueur (pas l'état du bouton)
        if (player.evacuated) {
            btn.style.background = '#95a5a6';
            btn.style.color = 'white';
            btn.style.opacity = '0.5';
            btn.disabled = true;
            btn.innerHTML = `${player.picto} ${player.name} <span style="color: #e74c3c;">✖ ÉVACUÉ</span>`;
        } else {
            btn.style.background = player.colorHex;
            btn.style.color = player.color === 'JAUNE' ? 'black' : 'white';
            btn.innerHTML = `${player.picto} ${player.name}`;
            btn.onclick = () => evacuatePlayerFromPopup(index);
        }
        
        playersList.appendChild(btn);
    });
    
    // Afficher la modale
    modal.style.display = 'block';
    showOverlay();
}

/**
 * Ferme la popup d'évacuation
 */
function closeEvacuationPopup() {
    const modal = document.getElementById('evacuation-modal');
    if (modal) {
        modal.style.display = 'none';
        hideOverlay();
    }
}

/**
 * Évacue un joueur depuis la popup
 */
function evacuatePlayerFromPopup(playerIndex) {
    const player = players[playerIndex];
    if (!player) return;
    
    // Évacuer le joueur directement sans demander confirmation ni raison
    evacuatePlayer(player, 'Évacuation');
    
    // Mettre à jour l'affichage
    updatePlayerDisplay();
    if (typeof updateOtherPlayersDisplay === 'function') {
        updateOtherPlayersDisplay();
    }
}

/**
 * Évacue un joueur
 */
function evacuatePlayer(player, reason = 'Évacuation') {
    console.log(`🚁 ÉVACUATION : ${player.name} - Raison : ${reason}`);
    
    // Calculer la perte de votes (moitié)
    const lostVotes = Math.floor(player.votes / 2);
    player.votes = player.votes - lostVotes;
    
    // Réinitialiser fatigue et blessure
    player.fatigue = 0;
    player.blessure = 0;
    
    // Vider l'inventaire
    player.leftHand = null;
    player.rightHand = null;
    player.backpack = [null, null, null];
    
    // Retour au camp
    player.position = {...CAMPS[player.color].start};
    
    // Enregistrer l'action
    player.recordAction('evacuation', {
        reason: reason,
        turn: currentTurn,
        position: {...player.position},
        lostVotes: lostVotes
    });
    
    // Mettre à jour les stats persistantes si joueur personnel
    if (player.isPersonal) {
        player.totalEvacuations = (player.totalEvacuations || 0) + 1;
    }
    
    // Notification
    showToast(`🚁 ${player.picto} ${player.name} évacué ! -${lostVotes} votes`, 'danger', 5000);
    speak(`${player.name} est évacué ! Moins ${lostVotes} votes. Retour au camp. Tout l'équipement est perdu.`);
}

console.log('✅ Partie 4 chargée : Initialisation et météo');
console.log('✅ Partie 9 chargée : Évacuation');
