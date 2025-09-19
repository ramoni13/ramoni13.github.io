let currentPage = 0; // Page actuelle
let html5QrCode; // Variable pour stocker l'instance de Html5Qrcode
let participantCount = 0; // Nombre de participants
let valeurDesJoueurs = []; // Tableau pour stocker les dés des participants
let currentParticipantIndex = 0; // Index du participant actuel
let miseJoueur = []; // Tableau pour stocker les mises des participants
let etapeScan = 0;
let message = "";
let action = "";
let joueur1=-1;
let joueur2=-1;
let nbMise = 0;
let listeActionsDefaut = [0, 0, 0, 0, 0, 0, 0, 0]; // 8 actions
let listeActionsChoisies = [0, 0, 0, 0, 0, 0, 0, 0]; // 8 actions
let listeActionsJoueurs = []; // Tableau pour stocker les actions dispnibles
let nbChoixActionsRestant = 0;
let bonusMise = 1;
let score = [0,0,0,0,0,0];


		if (bonusMise === 0) {
			document.getElementById('infoBonus1').style.display = "none";
			document.getElementById('infoBonus2').style.display = "none";
		} else {
			document.getElementById('infoBonus1').style.display = "block";
			document.getElementById('infoBonus2').style.display = "block";
		}

function choixBtn(idBtn) {
	var numBtn = parseInt(idBtn.substr(3,1));
	if (listeActionsChoisies[numBtn] === 0) {
		if (nbChoixActionsRestant > 0) {
			document.getElementById(idBtn).style.background='green';
			listeActionsChoisies[numBtn] = 1;
			nbChoixActionsRestant--;
			document.getElementById("nbChoixActionsRestant").innerText = nbChoixActionsRestant;
			if (nbChoixActionsRestant === 0) {
				document.getElementById('suite').style.background='green';
			}
		}
	} else {
		if (document.getElementById(idBtn).style.background === 'green') {
			document.getElementById('suite').style.background='#555';
			document.getElementById(idBtn).style.background='#555';
			listeActionsChoisies[numBtn] = 0;
			nbChoixActionsRestant++;
			document.getElementById("nbChoixActionsRestant").innerText = nbChoixActionsRestant;
		}
	}
}

function suite() {
	if (nbChoixActionsRestant === 0) {
		let nomBtn = "";
		for (let i = 0; i < participantCount; i++) {
			listeActionsJoueurs.push([...listeActionsChoisies]);
		}
		for (let i = 0; i < 8; i++) {
			nomBtn = 'btnA'+i;
			if (listeActionsChoisies[i] === 0) {
  				document.getElementById(nomBtn).style.display = "none";
			} else {
  				document.getElementById(nomBtn).style.display = "block";
			}
		}
		changerDIV(5);
	}
}

function changerDIV(pageNum) {
    const pages = document.querySelectorAll('.page');
    const buttons = document.querySelectorAll('nav button'); // Sélectionne tous les boutons du menu

    // Retrait de la classe active de la page actuelle
    pages[currentPage].classList.remove('active');
    pages[currentPage].classList.add('exit'); // Ajout de classe pour la sortie

     // Retirer la classe active de tous les boutons
    //buttons[currentPage].classList.remove('active-button'); // Retire la classe d'activation

    // Attendre que l'animation de sortie soit terminée avant de changer de page
    setTimeout(() => {
        // Mise à jour de la page actuelle
        currentPage = pageNum;

        // Retirer la classe exit pour la page actuelle
        pages[currentPage].classList.remove('exit');
        
        // Ajout de la classe active à la nouvelle page
        pages[currentPage].classList.add('active');

        // Ajouter la classe active au bouton correspondant
        //buttons[currentPage].classList.add('active-button');

	if ((currentPage === 5) && (nbMise === participantCount)) {
	    calculVainqueur();
            changerDIV(10);
	}
	
	if (currentPage === 5) {
		let sortie = false;
		let n=0;
		while (!sortie) {
			n++;
		  	// le joueur a déjà misé on passe au joueur suivant
			if (miseJoueur[currentParticipantIndex] !== undefined) {
				currentParticipantIndex++;
				if (currentParticipantIndex === participantCount) {
					currentParticipantIndex = 0;
				}
				renderJoueurInput();
			} else {
				sortie=true;
			}
			if (n>6) {
				sortie=true;
			}
		}
	}

        // Si la page "Tarifs" est activée, démarrer le scanner QR
        if (currentPage === 7) {
            startQRCodeScanner();
        } else {
            stopQRCodeScanner();
        }
    }, 500); // Doit correspondre à la durée de l'animation (0.5s)
}

function calculVainqueur() {
	message = "";
	let valeurUnique = HighUniqe();
	if (valeurUnique === -1) {
		message = "Personne - DOUBLONS";
	} else {
		miseJoueur.forEach((item, index) => {
			if ((item-1) === valeurUnique) {
				message = message + "\n\rJoueur " + (index+1);
			}
		});
	}
	document.getElementById("resultatVainqueur").innerText = "[Vainqueurs]" + message;
}

function HighUniqe() {
	// Créer un tableau de valeurs uniques
    const uniqueValues = [...new Set(valeurDesJoueurs)];

    // Trier les valeurs uniques en ordre décroissant
    uniqueValues.sort((a, b) => b - a);

    // Trouver la plus haute valeur qui n'a pas de doublon
    for (let value of uniqueValues) {
        if (valeurDesJoueurs.indexOf(value) === valeurDesJoueurs.lastIndexOf(value)) {
            // Retourner l'index de cette valeur dans le tableau d'origine
            return valeurDesJoueurs.indexOf(value);
        }
    }
    return -1; // Retourne -1 si aucune valeur unique n'est trouvée
}

// nombre de joueurs
function nbJoueurs(nbJ) {
	participantCount = nbJ;
	nbChoixActionsRestant = nbJ-1;
	document.getElementById("nbChoixActionsRestant").innerText = nbChoixActionsRestant;
	//valeurDesJoueurs = new Array(participantCount); // Initialiser le tableau
        miseJoueur = new Array(participantCount); // Initialiser le tableau
	renderParticipantInput();
	changerDIV(4);
}

// Initialiser la première page comme active
document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    pages[currentPage].classList.add('active');
});

// Fonction pour afficher le champ de saisie pour le nom du participant actuel
function renderParticipantInput() {
    const participantTitle = document.getElementById("participantTitle");
    participantTitle.innerText = `Joueur ${currentParticipantIndex + 1}`; // Définit le titre
}

// Fonction pour afficher le champ de saisie pour le nom du participant actuel
function renderJoueurInput() {
    const joueurTitle = document.getElementById("joueurTitle");
    joueurTitle.innerText = `Joueur ${currentParticipantIndex + 1} - Score ${score[currentParticipantIndex]}`; // Définit le titre de la div principale
    const joueurTitleA = document.getElementById("joueurTitleAction");
    joueurTitleA.innerText = `Joueur ${currentParticipantIndex + 1} - Score ${score[currentParticipantIndex]}`; // Définit le titre de la div Choix des actions
}

// Fonction pour afficher ou pas les boutons actions disponibles
function EnableButtonsJoueurActif() {
	for (let i = 0; i < 8; i++) {
			nomBtn = 'btnA'+i;
			if (listeActionsChoisies[i] === 1) {
				if (listeActionsJoueurs[currentParticipantIndex][i]===1) {
  					document.getElementById(nomBtn).style.display = "block";
				} else {
  					document.getElementById(nomBtn).style.display = "none";
				}
			}
		}
    
}


// Fonction pour afficher le champ de saisie pour le nom du participant actuel
function titreScan(texte) {
    const title = document.getElementById("scanTitle");
    title.innerText = texte; // Définit le titre
}


// Fonction pour le choix du menu
function choix(valeur) {
	action = valeur;
	listeActionsJoueurs[currentParticipantIndex][action]=0;
    if (action !== -1) {
		if (action === 7) {
			calculResult();
			changerDIV(9);
		} else {
			etapeScan=0;
			message = "";
			joueur1=-1;
			joueur2=-1;
			titreScan("SCAN CARTE JOUEUR");
			changerDIV(7);
		}
	} else {
		if (bonusMise === 0) {
			document.getElementById('infoBonus1').style.display = "none";
			document.getElementById('infoBonus2').style.display = "none";
		} else {
			document.getElementById('infoBonus1').style.display = "block";
			document.getElementById('infoBonus2').style.display = "block";
		}
		changerDIV(6);	
	}
}


// Fonction pour enregister la mise du joueur
function validerMise(numJ) {
    if (bonusMise === 1) {
		score[currentParticipantIndex]++;
		bonusMise = 0;
		document.getElementById('infoBonus1').style.display = "none";
		document.getElementById('infoBonus2').style.display = "none";

	}
    miseJoueur[currentParticipantIndex] = numJ;
    nbMise++;
    currentParticipantIndex++;
    if (currentParticipantIndex < participantCount) {
		renderJoueurInput();
	    	changerDIV(14);
	} else {
		currentParticipantIndex = 0;
	    	renderJoueurInput();
            	changerDIV(14); // Retour à la page d'accueil ou une autre page
	}	
}

// Fonction pour enregistrer le nom du participant actuel
function saveValeur(saveValeur) {
   
	valeurDesJoueurs.push(saveValeur); // Sauvegarder la valeur avec push
        
        currentParticipantIndex++; // Passer au participant suivant

        if (currentParticipantIndex < participantCount) {
            renderParticipantInput(); // Afficher le champ pour le prochain participant
	    changerDIV(12);
        } else {
            //alert("Tous les participants ont été enregistrés !");
	    currentParticipantIndex = 0;
	    renderJoueurInput();
            //changerDIV(5); // Retour à la page d'accueil ou une autre page
	    changerDIV(13); // Choix des actions
        }
}

function suiteMenu() {
	currentParticipantIndex++; // Passer au participant suivant

        if (currentParticipantIndex < participantCount) {
	    EnableButtonsJoueurActif();
            renderJoueurInput(); // Afficher le champ pour le prochain participant
	    changerDIV(5); // Retour à la page d'accueil ou une autre page
        } else {
            //alert("Tous les participants ont été enregistrés !");
	    currentParticipantIndex = 0;
	    EnableButtonsJoueurActif();
	    renderJoueurInput();
            changerDIV(5); // Retour à la page d'accueil ou une autre page
        }
}

// Fonction pour démarrer le scanner QR Code
function startQRCodeScanner() {
	document.getElementById("qr-reader-results").innerText = ""
    if (!html5QrCode) { // Vérifiez si l'instance n'est pas déjà créée
        html5QrCode = new Html5Qrcode("qr-reader");
    }

    // Utilisez la caméra avant
    html5QrCode.start(
        { facingMode: "user" }, // utiliser la caméra avant
        {
            fps: 10,
            qrbox: { width: 250, height: 250 }
        },
        (decodedText, decodedResult) => {
            // Code QR décodé ici
			if (((decodedText-1) === currentParticipantIndex) && (action !== -1)) {
				message = "Vous-même INTERDIT !";
				document.getElementById("qr-reader-results").innerText = "[" + message + "]";
			} else {
			if (etapeScan === 0) {
				if (decodedText.length ===1 ) {
					joueur1=decodedText;
					if ((action !== 3) && (action !== 6)) {
						stopQRCodeScanner();
						calculResult();
						changerDIV(9);
					} else {
						stopQRCodeScanner();
						etapeScan++;
						titreScan("SCAN JOUEUR 2");
						// le startQR est dans changerDIV(7)
						changerDIV(7);
					}
					//message = "Joueur " + decodedText;
					//document.getElementById("qr-reader-results").innerText = "[" + message + "]";
				}
			} else {
				if (joueur1 !== decodedText) {
					joueur2=decodedText;
					calculResult();
					stopQRCodeScanner();
					changerDIV(9);
					//message = "Joueur " + decodedText;
					//document.getElementById("qr-reader-results").innerText = "[" + message + "]";
				}
			}
			}
        },
        (errorMessage) => {
            // Erreur de lecture de QR Code
            console.warn(`Erreur de lecture du QR Code: ${errorMessage}`);
        })
        .catch(err => {
            console.error(`Erreur lors du démarrage du scanner QR Code: ${err}`);
        });
}

function calculResult() {
document.getElementById("resultatTitle").innerText = "";
let valeurJ1 = parseInt(joueur1);
let valeurJ2 = parseInt(joueur2);
	switch (action) {
  	case 0:
		if (valeurDesJoueurs[valeurJ1-1]%2 == 0) {
			message="[Pair] OUI";
		} else {
			message="[Pair] NON";
		}
    		break;
  	case 1:
		if ((valeurDesJoueurs[valeurJ1-1]>1) && (valeurDesJoueurs[valeurJ1-1]<5)) {
			message="[2/3/4] OUI";
		} else {
			message="[2/3/4] NON";
		}
    		break;
  	case 2:
		// Utilisez Math.min pour trouver le plus petit élément du tableau
		let smallest = Math.min(...valeurDesJoueurs);
		if (valeurDesJoueurs[valeurJ1-1] === smallest) {
			message="[+ Petit] OUI";
		} else {
			message="[+ Petit] NON";
		}
    		break;
	case 4:
		// Compte le nombre d'occurrences de l'élément dans le tableau
		let count = valeurDesJoueurs.filter(item => item === valeurDesJoueurs[valeurJ1-1]).length;
		if (count === 1) {
			message="[Valeur Unique] OUI";
		} else {
			message="[Valeur Unique] NON";
		}
    		break;
  	case 5:
		if (valeurDesJoueurs[valeurJ1-1] === 6) {
			message="[6] OUI";
		} else {
			message="[6] NON";
		}
    		break;
  	case 6:
		if (valeurDesJoueurs[valeurJ1-1] > valeurDesJoueurs[valeurJ2-1]) {
			message="[A Supérieur B] OUI";
		} else {
			message="[A Supérieur B] NON";
		}
    		break;
	case 3:
		let somme = valeurDesJoueurs[valeurJ1-1] + valeurDesJoueurs[valeurJ2-1];
		message="[Somme] = " + somme;
    		break;
  	case 7:
		message="[Regarde]";
    		break;
  	default:
   		console.log(`Sorry, we are out of ${expr}.`);
	}
	document.getElementById("resultatTitle").innerText = message;
}

// Fonction pour arrêter le scanner QR Code
function stopQRCodeScanner() {
    if (html5QrCode) {
        html5QrCode.stop()
            .then(ignore => {
                console.log("Scanner QR Code arrêté.");
                html5QrCode = null; // Réinitialiser l'instance
            })
            .catch(err => {
                console.error(`Erreur lors de l'arrêt du scanner: ${err}`);
            });
    }
}
