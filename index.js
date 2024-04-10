// Serveur Web - démonstration de la PFI
// par Alain Pilon
// création: 20 mars 2024

const http = require('http');
const { URLSearchParams } = require('url');
const PORT = process.env.PORT || 8000;

/**
 * description blablabla
 * @param {*} monData : données provenant du formulaire dans le format searchparams
 * @param {*} reponse : à compléter
 */
function traiterData(monData, reponse) {
        reponse.writeHead(401, { 'Content-Type': 'text/html'});
        reponse.write(`<h1>Page non autoris&eacute;e - suite</h1>`);
        reponse.end();
}

/**
 * description de la fonction...
 * @param {*} requete : à compléter
 * @param {*} reponse : à compléter
 */
function traiterFormulaire(requete, reponse) {
    // console.log('la methode est:', requete.method);
    let mesParams;
    let monPostData = "";
    if (requete.method === 'GET') {
        mesParams = new URLSearchParams(requete.url.substring(requete.url.indexOf('?')));
        traiterData(mesParams, reponse);
    } else {
        requete.on('data', (donnees)=>{
            monPostData = monPostData + donnees;
        });
        requete.on('end', ()=>{
            mesParams = new URLSearchParams(monPostData);
            traiterData(mesParams, reponse);
        });
    }
}

http.createServer((requete, reponse)=>{
    if (requete.url.substring(1,11) === 'acces.html') {
        traiterFormulaire(requete, reponse);
    } else {

        reponse.writeHead(401, { 'Content-Type': 'text/html'});
        reponse.write(`<h1>Page non autoris&eacute;e A|P</h1>`);
        reponse.end();  
    }
}).listen(PORT, ()=>console.log(`Service http démarré sur le port: ${PORT}`));