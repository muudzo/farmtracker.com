 function initializeEventListeners() {
    document.querySelector('.tabs').addEventListener('click', function (e) {
        if (e.target.classList.contains('tab')) {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

            e.target.classList.add('active');
            const tabContentId = e.target.getAttribute('data-tab');
            document.getElementById(tabContentId).classList.add('active');
        }
    });

    document.getElementById('animal-form').addEventListener('submit', handleFormSubmission);
    document.getElementById('financial-form').addEventListener('submit', handleFormSubmission);
    document.getElementById('vaccine-form').addEventListener('submit', handleFormSubmission);
}

function handleFormSubmission(event) {
    event.preventDefault();
    const form = event.target;

    if (form.id === 'animal-form') {
        const name = form.name.value.trim();
        const species = form.species.value.trim();
        const birthdate = form.birthdate.value || 'Unknown';
        const breed = form.breed.value || 'Unknown';

        if (name && species) {
            addAnimalRecord(name, species, birthdate, breed);
            form.reset();
        }
    } else if (form.id === 'financial-form') {
        const transactionName = form.transaction.value.trim();
        const amount = parseFloat(form.amount.value);

        if (transactionName && !isNaN(amount)) {
            addTransactionRecord(transactionName, amount);
            removeAnimalRecord(transactionName);
            form.reset();
        }
    }else if (form.id === 'vaccine-form') {
        const vaccineName = form.vaccine.value.trim();
        const date = form.date.value;

        if (vaccineName && date) {
            addVaccineRecord(vaccineName, date);
            form.reset();
        }
    }
}

function addAnimalRecord(name, species, birthdate = 'Unknown', breed = 'Unknown') {
    const recordItem = document.createElement('div');
    recordItem.classList.add('record-item');
    recordItem.dataset.name = name.toLowerCase();
    recordItem.dataset.species = species;
    recordItem.dataset.birthdate = birthdate;
    recordItem.dataset.breed = breed;
    recordItem.dataset.status = 'Healthy';
    recordItem.textContent = `${name} - ${species}`;

    recordItem.addEventListener('click', function () {
        toggleAnimalDetails(recordItem.dataset);
    });
    document.getElementById('animal-list').appendChild(recordItem);
}



   
function toggleAnimalDetails(data) {
    const detailsSection = document.getElementById('animal-details');
    const isVisible = detailsSection.style.display === 'block';

    if (!isVisible || detailsSection.dataset.currentName !== data.name) {
        detailsSection.style.display = 'block';
        detailsSection.dataset.currentName = data.name;
        detailsSection.innerHTML = `
            <h3>Animal Details</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Species:</strong> ${data.species}</p>
            <p><strong>Birthdate:</strong> ${data.birthdate}</p>
            <p><strong>Breed:</strong> ${data.breed}</p>
        `;
    } else {
        detailsSection.style.display = 'none';
        detailsSection.dataset.currentName = '';
    }
}
function removeAnimalRecord(animalName) {
const animalList = document.getElementById('animal-list');
const animalItems = animalList.querySelectorAll('.record-item');

animalItems.forEach(item => {
if (item.dataset.name === animalName.toLowerCase()) {
    animalList.removeChild(item);
}
});
}


function addTransactionRecord(name, amount) {
    const recordItem = document.createElement('div');
    recordItem.classList.add('record-item');
    recordItem.textContent = `${name} - $${amount.toFixed(2)}`;
    document.getElementById('financial-list').appendChild(recordItem);
}
function addVaccineRecord(vaccineName, date) {
    const recordItem = document.createElement('div');
    recordItem.classList.add('record-item');
    recordItem.textContent = `${vaccineName} - ${date}`;
    document.getElementById('vaccine-list').appendChild(recordItem);
}

initializeEventListeners();

function addAnimalRecord(name, species, birthdate = null, breed = null) {
    fetch('/api/animals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({ name, species, birthdate, breed })
    })
    .then(response => response.json())
    .then(data => {
        const recordItem = document.createElement('div');
        recordItem.classList.add('record-item');
        recordItem.dataset.name = name.toLowerCase();
        recordItem.dataset.species = species;
        recordItem.dataset.birthdate = birthdate || 'Unknown';
        recordItem.dataset.breed = breed || 'Unknown';
        recordItem.dataset.status = 'Healthy';
        recordItem.textContent = `${name} - ${species}`;

        recordItem.addEventListener('click', function () {
            toggleAnimalDetails(recordItem.dataset);
        });

        document.getElementById('animal-list').appendChild(recordItem);
    })
    .catch(error => console.error('Error:', error));
}

function addTransactionRecord(transaction, amount) {
    fetch('/api/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({ transaction, amount })
    })
    .then(response => response.json())
    .then(data => {
        const recordItem = document.createElement('div');
        recordItem.classList.add('record-item');
        recordItem.textContent = `${transaction} - $${amount.toFixed(2)}`;
        document.getElementById('financial-list').appendChild(recordItem);
    })
    .catch(error => console.error('Error:', error));
}

function addVaccineRecord(vaccine, date) {
    fetch('/api/vaccines', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({ vaccine, date })
    })
    .then(response => response.json())
    .then(data => {
        const recordItem = document.createElement('div');
        recordItem.classList.add('record-item');
        recordItem.textContent = `${vaccine} - ${date}`;
        document.getElementById('vaccine-list').appendChild(recordItem);
    })
    .catch(error => console.error('Error:', error));
}

// Add a function to load existing records on page load
function loadRecords() {
    // Fetch animals
    fetch('/api/animals')
        .then(response => response.json())
        .then(animals => {
            animals.forEach(animal => {
                addAnimalRecord(animal.name, animal.species, animal.birthdate, animal.breed);
            });
        });

    // Fetch transactions
    fetch('/api/transactions')
        .then(response => response.json())
        .then(transactions => {
            transactions.forEach(transaction => {
                addTransactionRecord(transaction.transaction, transaction.amount);
            });
        });

    // Fetch vaccines
    fetch('/api/vaccines')
        .then(response => response.json())
        .then(vaccines => {
            vaccines.forEach(vaccine => {
                addVaccineRecord(vaccine.vaccine, vaccine.date);
            });
        });
}

// Call loadRecords when the page loads
document.addEventListener('DOMContentLoaded', loadRecords);