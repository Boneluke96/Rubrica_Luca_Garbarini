let contactWrapper = document.querySelector("#contactWrapper")
//buttons
let showContactsBtn = document.querySelector("#showContactsBtn")
let addContactBtn = document.querySelector("#addContactBtn")
let searchbtn = document.querySelector('#searchBtn')
// input rubrica
let nomeInput = document.querySelector('#nomeInput')
let numberInput = document.querySelector('#numberInput')
let searchInput = document.querySelector('#searchInput')

let check = false;


// array di oggetti
let rubrica = {
    lista_contatti : [
        {contact_name : 'Thor', number :333333333},
        {contact_name : 'Hulk', number :333311111},
        {contact_name : 'Vedova', number :333222222},
        {contact_name : 'Falcon', number :333444444},
        {contact_name : 'Spider-man', number :333555555}
    ],


    // 1 creo il div
    // 2 lo rendo una card 
    // 3 lo riempio con i dati 
    // 4 lo appendo al wrapper 
    showContacts : function() {
        contactWrapper.innerHTML = '';
        this.lista_contatti.forEach((contatto)=>{
            let div = document.createElement("div");
            div.classList.add("card-custom", "d-flex", "justify-content-around", "align-items-center", "my-2");
            div.innerHTML = `
            <p class="lead">${contatto.contact_name}</p>
            <p>${contatto.number}</p>
            <i id="icons" class="fa-solid fa-trash"></i>
            `
            contactWrapper.appendChild(div);
        });
        // evento per eliminare contatto
        let icons = document.querySelectorAll("#icons");
        icons.forEach((icona, i)=>{
            icona.addEventListener('click', ()=>{
                this.lista_contatti.splice(i, 1)
        // con this showcontacts richiamo la funzione per creare nuove card vuote e quindi rimuoverle dai contatti
                this.showContacts();
            })
        })
    },

    // creo metodo per aggiungere nuovi contatti, lo pusho nella lista
    addContact : function(newName, newNumber) {
        if(newName && newNumber){
            this.lista_contatti.push({contact_name : newName, number : newNumber})
            rubrica.showContacts(); 
            if(check == false){
                check = true;
                showContactsBtn.innerHTML = 'Nascondi Contatti'
            }
        }else{
            alert('Devi inserire sia il nome che il numero per aggiungere un contatto')
        }
    },

    // creo un metodo che cancelli il contatto
    removeContact : function(removeName) {
        let names = this.lista_contatti.map((contatto) => contatto.contact_name)
        let index = names.indexOf(removeName)
        this.lista_contatti.splice(index, 1)
    },

    searchContacts : function(searchTerm) {
        let filteredContacts = this.lista_contatti.filter((contatto) => {
            return contatto.contact_name.toLowerCase().includes(searchTerm) || contatto.number.toString().includes(searchTerm);
        });

        contactWrapper.innerHTML = '';

        if (filteredContacts.length === 0) {
            contactWrapper.innerHTML = '<p class="text-center">Nessun risultato trovato</p>'
        }else {
            filteredContacts.forEach((contatto) => {
                let div = document.createElement('div');
                div.classList.add("card-custom", "d-flex", "justify-content-around", "align-items-center", "my-2");
                div.innerHTML = `
                <p class="lead">${contatto.contact_name}</p>
                <p>${contatto.number}</p>
                <i id="icons" class="fa-solid fa-trash"></i>
                `
                contactWrapper.appendChild(div);

                let icons = div.querySelectorAll('#icons');
                icons.forEach((icona, i) => {
                    icona.addEventListener('click', () => {
                        this.lista_contatti.splice(this.lista_contatti.indexOf(contatto), 1);
                        this.showContacts();
                    })
                })
            })
        }
    }
}

// evento che mostra e nasconde i contatti al click
showContactsBtn.addEventListener('click', ()=>{
    if(check == false){
        rubrica.showContacts();
        check = true;
        showContactsBtn.innerHTML = 'Nascondi Contatti'
    }else{
        contactWrapper.innerHTML = "";
        check = false;
        showContactsBtn.innerHTML = 'Mostra Contatti'
    }
    
})

// evento aggiungi contatti
addContactBtn.addEventListener('click', ()=>{
    rubrica.addContact(nomeInput.value, numberInput.value)
    nomeInput.value = "";
    numberInput.value = "";
})


//evento ricerca contatto
searchbtn.addEventListener('click', () => {
    let searchTerm = searchInput.value.toLowerCase();
    rubrica.searchContacts(searchTerm)
})