// J'importe la variable user du fichier user.js
import {user} from "./user.js";

// Je récupère dans l'HTML le 'firstname' & 'name' dont leur valeur sera égale au 'firstname' & 'name' du fichier user.js
document.querySelector("#firstname").textContent = user.firstname;
document.querySelector("#name").textContent = user.name;

// Je déclare mes variables
let solde = 0;
let operator = "";
let devise = "€";

let totalCredit = document.querySelector("#totalCredit");
let totalDebit = document.querySelector("#totalDebit");
let totalSolde = document.querySelector("#total");

let calculTotalCredit = 0;
let calculTotalDebit = 0;
let percent = 0;
let totalPercent = 0;

// Je stocke toutes les opérations de compte dans un array[]
let operationsCompte = [];

function calculPercent(operateur) {
    let getPercent = document.querySelector(".percentDebit");
    let getMontant = document.querySelector(".montantDebit")
    if (operateur === '+') {
        for (let i = 0; i < getPercent.length; i++) {
            let percentDebit = (parseInt(getMontant[i].textContent) / parseInt(totalCredit.textContent)) * 100;
            getPercent[i].textContent = percentDebit.toFixed(2) + "%";
        }
    }
}

// Je créer une fonction firstUpperCase qui permet de mettre la première lettre d'une chaine de caractère en majuscule
function firstUpperCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function calcul(operateur, libelle, montant) {
    // Je créer plusieurs éléments dont un 'li' et des 'span'
    let newLi = document.createElement("li");
    let newSpanIntitule = document.createElement("span");
    let newSpanMontant = document.createElement("span");
    let newSpanPercent = document.createElement("span");

    //J'ajoute un "enfant" qui est un span dans le "parent" 'li'
    newLi.appendChild(newSpanIntitule);
    newLi.appendChild(newSpanMontant);

    // SI l'operateur (le choix entre '+' & '-') est égale à '+'
    if (operateur === '+') {
        // Je récupère le 'ul' de la section Credit
        let ulCredit = document.querySelector("#detailsCredit");

        // J'applique un attribut a mes span 'Intitule' & 'Montant'
        newSpanIntitule.setAttribute("class", "intitule");
        newSpanMontant.setAttribute("class", "montant txt-color-gazoil");
        calculTotalCredit += montant;
        solde += montant;

        newSpanMontant.textContent = montant + devise;
        newSpanIntitule.textContent = libelle;
        // J'ajoute un "enfant" qui est le 'li' que j'ai crée plus haut dans le "parent" 'ul' du Crédit de mon HTML
        ulCredit.appendChild(newLi);

    }
    // SINON SI l'operateur (le choix entre '+' & '-') est égale à '-
    else if (operateur === '-') {
        // Je récupère le 'ul' de la section Débit
        let ulDebit = document.querySelector("#detailsDebit");

        //J'ajoute un "enfant" qui est le span du % dans le "parent" 'li' que j'ai crée plus haut
        newLi.appendChild(newSpanPercent);

        // J'applique un attribut a mes span 'Intitule' , 'Montant' & 'Percent'
        newSpanIntitule.setAttribute("class", "intitule");
        newSpanMontant.setAttribute("class", "montant montantDebit txt-color-red");
        newSpanPercent.setAttribute("class", "percent percentDebit txt-color-red");
        calculTotalDebit += montant;
        solde -= montant;
        percent = (montant / calculTotalCredit) * 100;

        // Le contenu de mon span % est fixé à 2 décimal après la virgule
        newSpanPercent.textContent = percent.toFixed(2) + "%";

        newSpanMontant.textContent = montant + devise;
        newSpanIntitule.textContent = libelle;
        // J'ajoute un "enfant" qui est le 'li' que j'ai crée plus haut dans le "parent" 'ul' du Débit de mon HTML
        ulDebit.appendChild(newLi);
    }

    // Je récupère l'emplacement du total des % de mon Débit
    let totalDebitPourcent = document.querySelector("#totalDebitPercent");

    totalPercent = (calculTotalDebit / calculTotalCredit) * 100;
    totalDebitPourcent.textContent = totalPercent.toFixed(2) + "%";

    totalCredit.textContent = calculTotalCredit + devise;
    totalDebit.textContent = calculTotalDebit + devise;
    totalSolde.textContent = solde.toFixed(2) + devise;

}

// J'insère des valeurs de base qui seront au chargement de la page
calcul("+", "Salaire", 1520);
calcul("-", "Achat PS4", 499.99);
calcul("-", "Achat TV", 599);

// Je récupère le formulaire et dans une fonction je lui ajoute un event : A chaque 'envoi'
const formulaire = document.getElementById("ajoutOperation");
formulaire.addEventListener("submit", function (e) {
    e.preventDefault();

    // Je récupère les valeurs des champs du formulaire
    let operateur = document.querySelector("#operation").value;
    let intitule = document.querySelector("#intitule").value;
    let intituleMaj = firstUpperCase(intitule);
    let number = document.querySelector("#montant").value;

    // Je stocke ces valeurs dans un array[]
    let values = [operateur, intituleMaj, number]

    // J'ajoute cet array dans notre array global operationsCompte
    operationsCompte.push(values);

    // J'execute la fonction pour actualiser
    calcul(operateur, intituleMaj, parseInt(number));
    calculPercent(operateur);

    // SI le solde est inférieur à 0
        // ALORS j'ajoute au totalSolde une couleur rouge & une fontSize plus grande
    if (solde < 0){
        totalSolde.style.color = "red";
        totalSolde.style.fontSize = "2.7rem";
    } 
    // SINON le totalSolde reste avec ses valeurs de base
    else {
        totalSolde.style.color = "white";
        totalSolde.style.fontSize = "2.5rem";
    }

    // Je reset le formulaire
    formulaire.reset();
});