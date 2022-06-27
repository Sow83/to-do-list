//Sélection des éléments
var form = document.querySelector("form");
var input = document.getElementById("task");
var btnAddTask = document.getElementById("btn-add-task");
var btnAllDelete = document.getElementById("btn-all-delete");
var taskList = document.getElementById("task-list");
var dateElt = document.getElementById("date");
var hourElt = document.getElementById("hour");

// Chargement de la date et de l'heure, du curseur de l'input et du stockage des
// données lors du chargement de la page
window.addEventListener("DOMContentLoaded", function () {
    time();
    input.focus(); // met le curseur dans l'input dès le chargement de la page 
    getValues();
});


//Gestion et afficahge de l'heure et de la date
/* 1. Retourne un entier correspondant au jour de la semaine (0 correspondant à dimanche, 1
 * à lundi, 2 à mardi et ainsi de suite) de la date indiquée selon l'heure locale
 */
function time() {
    var day = new Date().getDay(); /*[1]*/
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1; //Le premier mois de l'année correspond au mois zéro(0) 
    var year = new Date().getFullYear();
    var days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    dateElt.textContent = `${days[day]} ${checkTime(date)} / ${checkTime(month)} / ${year}`;
    var h = new Date().getHours();
    var m = new Date().getMinutes();
    hourElt.textContent = `${h}:${checkTime(m)}`;
    // setInterval(time, 500); cette méthode crée un bug 
    window.requestAnimationFrame(time); /* Elle a été créée en réponse aux problèmes perçus avec les fonctions asynchrones antérieures comme setInterval()
    La méthode Window.requestAnimationFrame() demandera que la fonction d'animation soit appelée avant que le navigateur n'effectue le prochain repaint.
    Le nombre de rappels est généralement de 60 fois par seconde, mais correspond généralement au taux de rafraîchissement de l'affichage dans la plupart
    des navigateurs Web.  Source MDN: https://developer.mozilla.org/fr/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals 
    https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame*/
}

function checkTime(i) {
    if (i<10){i = "0" + i}  // ajoute un zéro devant,  si le chiffre est inférieur à 10
    return i;
}
//Active et désacticve le bouton ajouter(btnAddTask) selon que l'input est remplie ou pas
form.addEventListener("input", function () {
    let valeurEntrer = input.value; //recuperation de la valeur saisie par l'utilisateur
    if (valeurEntrer !== null) { //si l'utilisateur  saisit une valeur
        btnAddTask.classList.add("active"); //active le bouton ajouter
    } else {
        btnAddTask.classList.remove("active"); //si non désactive le bouton ajouter
    }
});


//Ajoute une tache, enregistre la modification dans le local storage, vide l'input et désactive 
// le bouton ajouter(btnAddTask) 
function add() {
    taskList.innerHTML += `<li>${input.value}<img onclick="deleteTask(this.parentNode)" src="images/icon-poubelle.svg" alt=""></li>`;
    storage();
    input.value = "";
    btnAddTask.classList.remove("active"); 
}
//Appelle la fonction ajouter()(ajouter une tache) lors d'un clic sur le bouton "btnAddTask"
// (input de type image) ou quand on tape sur la touche "Entrez" du clavier
form.addEventListener("submit", function (e) {
    e.preventDefault(); //permet de ne pas envoyer le formulaire pour voir les données
    add();
});


/* Supprime une tache et enregistre la modification dans le local storage dès que l'on clic sur
 * l'image de la poubelle de la fonction ajouter (<img onclick="deleteTask(this.parentNode)" 
 * src="images/icon-poubelle.svg" alt="">)
 * */
function deleteTask(list) {
    list.remove();
    storage();
}


//  Demande une confirmation de suppression et enregistre la modification dans le local storage
function deleteAllListeElt() {
    var res = confirm("Êtes-vous sûr de vouloir tout supprimer?");// confirme la suppression avant de tout supprimer
    if (res) { // si c'est true, cad si on clique pour confirmer la suppression
        return document.getElementById("task-list").innerHTML = "";//logique de suppression
    }
    storage();
}
//Appelle le fonction  deleteAllListeElt() et enregistre la modification dans le local storage
btnAllDelete.addEventListener("click", function () {
    deleteAllListeElt();
    storage();
});


// Stock les données dans le local storage
function storage() {
    localStorage.toDolist = taskList.innerHTML;
    /*window.localStorage.setItem("toDolist", taskList.innerHTML); cette ligne est la meme chose
     *que celle qui est au dessus avec une écriture différente
     */
}
/* Crée une liste de 3 taches lors du chargement de la page si aucune donnée n'est stockée dans
 * le local storage, si non elle stock les données préenregistrées par l'utilisateur 
 */
function getValues() {
    let storageContent = localStorage.toDolist;
    if (!storageContent) {
        taskList.innerHTML += `<li>Pour créer une tache écrivez sur l'espace réservée et cliquez sur le bouton + ci-dessus ou tapez la touche Entrez du clavier <img onclick="deleteTask(this.parentNode)" src="images/icon-poubelle.svg" alt=""></li>`;
        taskList.innerHTML += `<li>Pour supprimer une tache mettez la souris au dessus de celle-ci et cliquez sur le panier <img onclick="deleteTask(this.parentNode)" src="images/icon-poubelle.svg" alt=""></li>`;
        taskList.innerHTML += `<li>Pour tout supprimer vous savez ce que vous devez faire 😋 <img onclick="deleteTask(this.parentNode)" src="images/icon-poubelle.svg" alt=""></li>`;
    } else {
        taskList.innerHTML = storageContent;
    }
}


