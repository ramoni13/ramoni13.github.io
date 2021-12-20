const svgLetter = document.querySelectorAll('path');
const svgRect = document.querySelector('rect');
// const reader = document.querySelector('.reader');
const scanplayButton = document.querySelector('.scanplay-button');
const scanButton = document.querySelector('.scan-button');
const solButton = document.querySelector('.solbug-button');
const easyMode = document.querySelector('.easyMode');

// const testBtn = document.querySelector('.testBtn')
// testBtn.addEventListener('click', () => {
//     console.log('test OK')
// })

document.getElementById("disc").style.display = 'none';
var playlist = [];
var playlistStart = [];
var solutionTab = [];
var arrayOrigine = [];
var idTrackScan = 0;
var idPlaylist = 0;
var idTrackEnCours = 0;
var firstEcoute = true;
var firstPlay = false;
var tableauGif = [];
var modeSolution = false;
var tempschoisi = 5;
var onachangedemusik = false;
var modeSaccade = false;
var muteOn = false;
var modeBug = false;
var idTrackBug = 0;
var positionChanson = 0;
const musicHeyDJ = new Audio('JingleHeyDj.mp3');
const musicLaser = new Audio('LASER.mp3');
const musicScratch = new Audio('scratch.mp3');
const musicScratchOut = new Audio('scratchout.mp3');
//var myTimeout = setTimeout(myGreating, 1000);
var cpt=0
var valeurleft=-130;
var config = { fps: 10, qrbox: 250 };
/// MANIP SVG

window.setTimeout(changeColorSvg, 1000)
window.setTimeout(disapRect, 1000)
// window.onerror = function (msg, url, noLigne, noColonne, erreur) {
//     var chaine = msg.toLowerCase();
//     var souschaine = "script error";
//     if (chaine.indexOf(souschaine) > -1){
//         alert('Script Error : voir la Console du Navigateur pour les Détails');
//     } else {
//         var message = [
//             'Message : ' + msg,
//             'URL : ' + url,
//             'Ligne : ' + noLigne,
//             'Colonne : ' + noColonne,
//             'Objet Error : ' + JSON.stringify(erreur)
//         ].join(' - ');

//         alert(message);
//     }

//     return false;
// };

function myGreating() {
    var nomInput = "input_" + (7-cpt);
    var nomCommand = "command" + (7-cpt);
    if (cpt>0) {
        var nomCommandprec = "command" + (8-cpt);
        document.getElementById(nomCommandprec).style.display = 'none';
    }
    
    document.getElementById(nomCommand).style.display = 'block';

    // document.getElementById(nomCommand).style = "left:" + valeurleft + "px;"
    //document.getElementById(nomCommand).style = "position: absolute;left:46%;"
    document.getElementById(nomInput).checked = true; 
    cpt++;
    switch (cpt) {
        case 4:
            valeurleft = valeurleft + 33 + cpt;
            break;
        case 5:
            valeurleft = valeurleft + 33 + cpt;
            break;
        case 6:
            valeurleft = valeurleft + 30 + cpt;
            break;
        case 7:
            valeurleft = valeurleft + 33 + cpt;
            break;
        default:
            valeurleft = valeurleft + 35 + cpt;
            break;
    }
}

function changeColorSvg() {
    svgLetter.forEach(x => {
        x.setAttribute('fill', '#FFF')
    })
}

function disapRect() {
    svgRect.setAttribute('stroke', 'null')
}

/// SCAN 

var html5QrCode = new Html5Qrcode("reader");
scanplayButton.addEventListener('click', () => {
    validerPlaylist(17);
})

scanButton.addEventListener('click', () => {
    console.log('OK');
    document.getElementById("scan-button").style.display = 'none';
    musicHeyDJ.play();
    createPlaylist();
    html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);
})

const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    console.log("decodedText=" + decodedText);
    console.log("decodedResult=" + decodedResult);

    if (decodedText.length < 12) {
        var dejaTrouve = false;
        for (j = 0; j < playlist.length; j++) {
            if (playlist[j] == decodedText) {
                dejaTrouve = true;
            }
        }
        if (!dejaTrouve) {
            playlist.push(decodedText);
            musicLaser.play();
            //if (playlist.length == 1)  {
            //    document.getElementById("playlistDiv").style.display = 'block';
            //}
            document.getElementById("nbMorceaux").style.display = 'block';
            document.getElementById("nbMorceaux").innerHTML = "Scan " + playlist.length + "/9"; // + "<BR>" + playlist.join() ;
        }
    }

    if (playlist.length > 2) {
        html5QrCode.stop().then((ignore) => {
            // QR Code scanning is stopped.
            console.log("retour stop ignore=" + ignore);
            document.getElementById("qr-shaded-region").style.display = 'none';
            document.getElementById("scan-button").style.display = 'none';
            document.getElementById("playlistDiv").style.display = 'block';
            document.getElementById("scanplay").style.display = 'block';
            document.getElementById("bugbutton").classList.remove("moveButton");
            document.getElementById("scanplay").classList.remove("moveButtonOut");
            document.getElementById("scanplay").classList.remove("moveButton80");
            document.getElementById("scanplay").classList.add("moveButton");
            document.getElementById("scanplay").innerHTML = "First PLAY";
            document.getElementById("nbMorceaux").style.display = 'none';
            //document.getElementById("nbMorceaux").style.display = 'none';
        }).catch((err) => {
            // Stop failed, handle it.
            console.log("retour stop erreur=" + err);
        });
    }
};



///


/* 
    function readTrack() {
		document.getElementById("reader").style.display = 'none';
		document.getElementById("playerDeezer").style.display = 'block';
		var divdeez2 = document.getElementById("deezer-player");
		var srcdeez2 = divdeez2.getAttribute("src");
		srcdeez2= srcdeez2 + "&type=tracks&id=" + idTrackScan;
		divdeez2.setAttribute("src", srcdeez2);
	}
    */

    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    function shuffleArray(array) {
        arrayOrigine = array.slice();
        var info = document.getElementById('playerDeezer');
            
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            playlistStart[i] = Math.floor(Math.random() * 75)+5;
            //playlistStart[i] = 5;
        }
        playlistStart[0] = Math.floor(Math.random() * 75)+5;
        //playlistStart[0] = 80;
        solutionTab = [];
        for (var i = 0; i < arrayOrigine.length; i++) {
            positionChanson = arrayOrigine.indexOf(array[i])+1;
            solutionTab[i] = (positionChanson) ;
        }
        console.log("arrayOrigine : " + arrayOrigine);
        console.log("playlist : " + playlist);
        console.log("playlistStart : " + playlistStart);
        console.log("solutionTab : " + solutionTab);
        //for (var i = 0; i < array.length; i++) {
        //    info.innerHTML = info.innerHTML + "<BR>--> " + i + " - idTrack = " + array[i] + " - Start = " + playlistStart[i];
        //}
    }

    function createPlaylist() {
		playlist = [];
		document.getElementById("playerDeezer").style.display = 'none';
        var info = document.getElementById('playerDeezer');
        info.innerHTML = "";
		// document.getElementById("menu").style.display = 'none';
        document.getElementById("nbMorceaux").innerHTML = "Scan " + playlist.length + "/9";
        document.getElementById("nbMorceaux").style.display = 'block';
	}


    function validerPlaylist(choix) {
        document.getElementById("logo").style.display = 'none';
        document.getElementById("disc").style.display = 'block';
        tempschoisi = choix; // 5 ou 3 sec
        //if (choix == 10) {modeSaccade = true;} else { modeSaccade = false;}
        if (firstEcoute) {
            shuffleArray(playlist);
            firstEcoute = false;
            // document.getElementById("GifImg").innerHTML = "<img style=\"width:800px\" src=\""+ tableauGif[rndGif] + "\">";
        }
        idPlaylist = 0;
        document.getElementById("reader").style.display = 'none';
		//document.getElementById("playerDeezer").style.display = 'block';
        idTrackEnCours = playlist[0];
        var tableauD = [idTrackEnCours];
        musicScratch.play();
        //document.getElementById("scanplay").classList.remove("moveButton");
		if (!firstPlay) {
            document.getElementById("scanplay").classList.add("moveButtonOut");
            document.getElementById("barinfo").style.display = 'block';
            for (var i=0; i<8;i++) {
                var nomCommandprec = "command" + (i);
                    document.getElementById(nomCommandprec).style.display = 'none';
            }
            document.getElementById("bugbutton").style.display = 'block';
            document.getElementById("bugbutton").classList.add("moveButton");
        } else {
            document.getElementById("scanplay").classList.add("moveButtonOut");
            document.getElementById("solbutton").classList.add("moveButtonOut");
        }
        myGreating();
        DZ.player.playTracks(tableauD);
        //document.getElementById("nbMorceaux").innerHTML = "Track " + (idPlaylist+1) + "/" + playlist.length;
        //DZ.player.seek(playlistStart[0]);
    }

    function solution() {
        modeSolution = true;
        //var info = document.getElementById('playerDeezer');
        //info.innerHTML = "Chanson Interdite N° " + solutionTab[8] + "<BR><BR>" + "Solution : " + solutionTab + "<BR><BR>" + info.innerHTML;
        //info.innerHTML = solutionTab + "<BR><BR>" + info.innerHTML;
        document.getElementById("bugbutton").classList.remove("moveButtonOut");
        document.getElementById("scanplay").classList.remove("moveButton80");
        document.getElementById("solbutton").classList.remove("moveButton");
        
        document.getElementById("scanplay").classList.add("moveButtonOut");
        //----------document.getElementById("scanplay").style.display = 'none';
        document.getElementById("solbutton").classList.add("moveButtonOut");
        document.getElementById("command0").innerHTML = solutionTab[0] + "-" + solutionTab[1] + "-" + solutionTab[2] + "-" + solutionTab[3] ;
        document.getElementById("command0").innerHTML = document.getElementById("command0").innerHTML + "<BR>" + solutionTab[4] + "-" + solutionTab[5] + "-" + solutionTab[6] + "-" + solutionTab[7] ;
        document.getElementById("command0").style.display = 'block';
        document.getElementById("nextbutton").style.display = 'block';
        document.getElementById("nextbutton").classList.add("moveButton");
        if (modeBug) {
            document.getElementById("nbMorceaux").style.display = 'block';
            document.getElementById("nbMorceaux").innerHTML = "Veuillez écarter la carte N°" + solutionTab[8];
        }
        // if (!modeBug) {
        //     idTrackEnCours = playlist[playlist.length-1];
        //     var tableauD = [idTrackEnCours];
        //     DZ.player.playTracks(tableauD);
        //     document.getElementById("playerDeezer").style.display = 'block';
            
        // } else {
        //     // gerer la chanson interdite
        //     document.getElementById("nbMorceaux").innerHTML = "1 carte bugue.<BR>Veuillez écarter la carte<BR>N°" + solutionTab[8];
        //     document.getElementById("playerDeezer").style.display = 'block';
        // }
    }

    function next(){
        document.getElementById("nbMorceaux").style.display = 'none';
        document.getElementById("command0").innerHTML = "8";
        document.getElementById("command0").style.display = 'none';
        document.getElementById("barinfo").style.display = 'none';
        document.getElementById("qr-shaded-region").style.display = 'block';
        playlist = [];
        playlistStart = [];
        solutionTab = [];
        arrayOrigine = [];
        idTrackScan = 0;
        idPlaylist = 0;
        idTrackEnCours = 0;
        firstEcoute = true;
        firstPlay = false;
        tableauGif = [];
        modeSolution = false;
        tempschoisi = 5;
        onachangedemusik = false;
        modeSaccade = false;
        muteOn = false;
        modeBug = false;
        idTrackBug = 0;
        positionChanson = 0;
        cpt=0;
        document.getElementById("scanplay").classList.remove("moveButtonOut");
        document.getElementById("solbutton").classList.remove("moveButtonOut");
        document.getElementById("nextbutton").classList.remove("moveButton");
        document.getElementById("nextbutton").classList.add("moveButtonOut");
        musicHeyDJ.play();
        createPlaylist();
        document.getElementById("reader").style.display = 'block';
        html5QrCode = new Html5Qrcode("reader");
        config = { fps: 10, qrbox: 250 };
        html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);
    }

    function bug() {
        if (!modeBug) {
            modeBug = true;
            
            idTrackBug = idPlaylist; // index du tableau solution
            playlist.splice(idPlaylist,1);
            playlist.push(idTrackEnCours);

            var soluceBug = solutionTab[idPlaylist];
            solutionTab.splice(idPlaylist,1);
            // putting the idTrackEnCours string back in the array:
            solutionTab.push(soluceBug);
            idTrackEnCours = playlist[idPlaylist];
            var tableauD = [idTrackEnCours];
            DZ.player.playTracks(tableauD);
            //document.getElementById("nbTrackPlaying").innerHTML = "Track " + (idPlaylist+1) + "/" + playlist.length;
        } else {
            // afficher les 2 cartes à écarter
            document.getElementById("nbMorceaux").innerHTML = "2 cartes buguent.<BR>Veuillez écarter les cartes<BR>N°" + solutionTab[8] + " et N°" + solutionTab[idPlaylist] + "<BR>Puis recommencez la manche.<BR>Merci !";
        }
    }


    /// DEEZER


    function onPlayerLoaded() {
		$("#controlers input").attr('disabled', false);
        //DZ.player.setBlindTestMode(true, {title:'InTheMix', artist:'InTheMix', cover:'img/InTheMix.png'})
		event_listener_append('player_loaded');
		DZ.Event.subscribe('current_track', function(arg){
			event_listener_append('current_track', arg.index, arg.track.title, arg.track.album.title);
            var info = document.getElementById('playerDeezer');
            // if (!modeSolution) {
            //     info.innerHTML += "<BR>--> " + (idPlaylist+1) + " -- " + arg.track.title + " -- " + arg.track.artist.name;
            // } else {
            //     info.innerHTML = "Chanson Interdite N° " + positionChanson + "<BR>" + arg.track.title + "<BR>" + arg.track.artist.name + "<BR><BR>" + "Solution : " + solutionTab + "<BR><BR>" + info.innerHTML;
            // }
            
		});
		DZ.Event.subscribe('player_position', function(arg){
			tps= arg[1];
			tpsencours = arg[0]; 
			event_listener_append('position', arg[0], arg[1]);
			//$("#slider_seek").find('.bar').css('width', (100*arg[0]/arg[1]) + '%');
		});
	}
	
	DZ.init({
		appId  : '8',
		channelUrl : 'http://developers.deezer.com/examples/channel.php',
		player : {
			container : 'player',
			cover : true,
			playlist : true,
			width : 650,
			height : 100,
			onload : onPlayerLoaded
		}
	});
    /*
    $(document).ready(function(){
		$("#controlers input").attr('disabled', true);
		$("#slider_seek").click(function(evt,arg){
			var left = evt.offsetX;
			DZ.player.seek((evt.offsetX/$(this).width()) * 100);
		});
	});
    */

	function event_listener_append() {
		/*
        var pre = document.getElementById('timer');
		var minutes = Math.floor(arguments[1] / 60);
		var seconds = arguments[1] - minutes * 60;
		seconds = Math.round(seconds * 100) / 100;
		pre.innerHTML = minutes + ":" + ("0" + Math.round(seconds)).slice(-2);
        */
       //console.log("arguments[0] =" + arguments[0]);
       //console.log("arguments[1] =" + arguments[1]);
       if (arguments[1]<0.5){
            DZ.player.seek(playlistStart[idPlaylist]);
            onachangedemusik = false;
       } else {
       if (((parseInt(arguments[1])/30)*100)>=(playlistStart[idPlaylist]+parseInt(tempschoisi))
            && !onachangedemusik) {
				DZ.player.pause();
                onachangedemusik = true;
                console.log("stop superieur ou egal à 5 (préécoute)");
                console.log("idPlaylist:" + idPlaylist);
                console.log("arguments[1] = " + arguments[1]);
                console.log("((parseInt(arguments[1])/30)*100) = " + ((parseInt(arguments[1])/30)*100));
				console.log("playlistStart[idPlaylist] = " + playlistStart[idPlaylist]);
                console.log("(playlistStart[idPlaylist]+parseInt(tempschoisi)) = " + (playlistStart[idPlaylist]+parseInt(tempschoisi)));
                if (idPlaylist < (playlist.length-2)) {
                    idPlaylist++;
                    document.getElementById("nbMorceaux").innerHTML = "Track " + (idPlaylist+1) + "/" + playlist.length;
                    idTrackEnCours = playlist[idPlaylist];
                    var tableauD = [idTrackEnCours];
                    musicScratch.play();
                    myGreating();
		            DZ.player.playTracks(tableauD);
                } else {
                    musicScratchOut.play();
                    document.getElementById("logo").style.display = 'block';
                    document.getElementById("disc").style.display = 'none';
                    if (!firstPlay) {
                        document.getElementById("scanplay").classList.remove("moveButtonOut");
                        document.getElementById("solbutton").classList.remove("moveButtonOut");
                        document.getElementById("bugbutton").classList.remove("moveButton");
                        document.getElementById("command0").style.display = 'none';
                        document.getElementById("scanplay").innerHTML = "Last PLAY";
                        document.getElementById("bugbutton").classList.add("moveButtonOut");
                        document.getElementById("scanplay").classList.add("moveButton80");
                        document.getElementById("solbutton").style.display = 'block';
                        document.getElementById("solbutton").classList.add("moveButton");
                        firstPlay = true;
                        cpt=0;
                    } else {
                        document.getElementById("command0").style.display = 'none';
                        document.getElementById("scanplay").classList.remove("moveButtonOut");
                        document.getElementById("solbutton").classList.remove("moveButtonOut");
                        document.getElementById("solbutton").classList.remove("moveButtonOut");
                        document.getElementById("solbutton").classList.add("moveButton");
                    // fin
                    //var info = document.getElementById('playerDeezer');
                    //info.innerHTML += "<BR>--> Chanson Interdite -- " + arg.track.title + " -- " + arg.track.artist.name;
                    }
                }
			}
            //  else {
            //     if (modeSaccade) {
            //         if (muteOn) {
            //             DZ.player.setVolume(100);
            //             muteOn = false;
            //         } else {
            //             DZ.player.setMute();
            //             muteOn = true;
            //         }
            //     }
            // }
        }
    }
