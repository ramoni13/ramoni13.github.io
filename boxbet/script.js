let currentPage = 0; // Page actuelle
let html5QrCode; // Variable pour stocker l'instance de Html5Qrcode

function changerDIV(pageNum) {
    const pages = document.querySelectorAll('.page');

    // Retrait de la classe active de la page actuelle
    pages[currentPage].classList.remove('active');
    pages[currentPage].classList.add('exit'); // Ajout de classe pour la sortie

    // Attendre que l'animation de sortie soit terminée avant de changer de page
    setTimeout(() => {
        // Mise à jour de la page actuelle
        currentPage = pageNum;

        // Retirer la classe exit pour la page actuelle
        pages[currentPage].classList.remove('exit');
        
        // Ajout de la classe active à la nouvelle page
        pages[currentPage].classList.add('active');

        // Si la page "Tarifs" est activée, démarrer le scanner QR
        if (currentPage === 1) {
            startQRCodeScanner();
        } else {
            stopQRCodeScanner();
        }
    }, 500); // Doit correspondre à la durée de l'animation (0.5s)
}

// Initialiser la première page comme active
document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    pages[currentPage].classList.add('active');
});

// Fonction pour démarrer le scanner QR Code
function startQRCodeScanner() {
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
            document.getElementById("qr-reader-results").innerText = "QR Code: " + decodedText;
        },
        (errorMessage) => {
            // Erreur de lecture de QR Code
            console.warn(`Erreur de lecture du QR Code: ${errorMessage}`);
        })
        .catch(err => {
            console.error(`Erreur lors du démarrage du scanner QR Code: ${err}`);
        });
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
