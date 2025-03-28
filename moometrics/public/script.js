// 
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