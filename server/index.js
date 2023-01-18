var api = require('./src/api.js').app;
const fs = require('fs');
const medicationFilepath = './src/medication.json';
var medication = getMedication();
api.get('/', function(request, response) {
    response.json('NodeJS REST API');
});

api.get('/medication', function(request, response) {
    response.json(medication);
});

api.get('/medication/:id', function(request, response) {
    let med = getMedById(request.params.id);
    if (med) return response.json(med);
    response.json('not found');
});

api.put('/medication', function(request, response) {
    let med = request.body;
    let medication = getMedication();
    for (let i = 0; i < medication.length; i++) {
        if (medication[i].id === med.id) {
            medication[i] = med;
        }
    }
    try {
        fs.writeFileSync(medicationFilepath, JSON.stringify(medication));
    } catch (err) {
        console.error(err);
    }
    if (med) return response.json(med);
    response.json('not found');

});

api.post('/medication', function(request, response) {
    let med = request.body;
    saveMed(med);
    response.json('Med was saved succesfully');
});


api.delete('/medication/:index', function(request, response) {

    medication.splice(request.params.index, 1);
    try {
        fs.writeFileSync(medicationFilepath, JSON.stringify(medication));
    } catch (err) {
        console.error(err);
    }

    response.json('Med with index ' + request.params.index + ' was deleted');
});

api.listen(3000, function() {
    console.log('Server running @ localhost:3000');
});

function getMedication() {
    let medication = [];
    try {
        medication = JSON.parse(fs.readFileSync(medicationFilepath, 'utf8'));
    } catch (err) {
        console.error(err);
        return false;
    }
    return medication;
}

function saveMed(med) {

    let maxId = getMaxId(medication);
    med.id = maxId + 1;
    medication.push(med);
    try {
        fs.writeFileSync(medicationFilepath, JSON.stringify(medication));
    } catch (err) {
        console.error(err);
    }
}


function getMaxId(medication) {
    let max = 0;
    for (var i = 0; i < medication.length; i++) {
        if (max < medication[i].id) {
            max = medication[i].id;
        }
    }
    return max;
}


function getMedById(id) {
    let selectedMed = null;
    for (var i = 0; i < medication.length; i++) {
        if (id == medication[i].id)
            selectedMed = medication[i];
    }
    return selectedMed;
}