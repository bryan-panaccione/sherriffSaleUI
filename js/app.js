const propertyArray = [
    {
        address: '1234 Bryan Pan Drive, Newark, DE 19711',
        coords: [39.74048995376448, -75.60620386940748],
        type: 'Tax',
        attorney: 'Moore & Rutt, P.A.',
        plaintiff: 'New Castle County',
        defendant: 'Person that couldnt pay taxes',
        caseNum: '22-000200N221-3kJ',
        status: 'Scheduled',
        principal: '$92,095'
    },
    {
        address: '41 BigCat Rd, Newark, DE 19711',
        coords: [39.75703875045563, -75.66739396240109],
        type: 'Tax',
        attorney: 'Moore & Rutt, P.A.',
        plaintiff: 'New Castle County',
        defendant: 'Person that couldnt pay taxes',
        caseNum: '22-000200N221-3kJ',
        status: 'Scheduled',
        principal: '$52,099'
    },
    {
        address: 'address 3, Newark, DE 19711',
        coords: [39.779698940545664, -75.60314430328405],
        type: 'MTG',
        attorney: 'Bryan Bryan Bryan & associates, P.A.',
        plaintiff: 'Chase',
        defendant: 'Person that couldnt pay mortgage',
        caseNum: '22-0002kJ',
        status: 'Scheduled',
        principal: '$38,084'
    },
    {
        address: '5202 Fake house, Wilmington, DE 19704',
        coords: [39.814588351221694, -75.52646835206559],
        type: 'Tax',
        attorney: 'Boss Baby',
        plaintiff: 'Rocket Mortgage',
        defendant: 'steve',
        caseNum: '22-000343521-3kJ',
        status: 'Scheduled',
        principal: '$89,099'
    },
    {
        address: 'Run Down House, Wilmington, DE 19712',
        coords: [39.751795945982145, -75.74413497719256],
        type: 'Tax',
        attorney: 'reagan quinn JD.',
        plaintiff: 'rich guy',
        defendant: 'poor guy',
        caseNum: '7489032hu9ih98f98n',
        status: 'Pending',
        principal: '$145,783'
    },
    {
        address: 'BLDG 9408, 20th Street, Newark, DE 19711',
        coords: [39.65829286738313, -75.66860397162799],
        type: 'MTG',
        attorney: 'Bryan Bryan Bryan & associates, P.A.',
        plaintiff: 'Chase',
        defendant: 'Joe',
        caseNum: '11B-P4',
        status: 'Scheduled',
        principal: '$38,084'
    },
    {
        address: '9999 Nine Drive, Newark, DE 19711',
        coords: [39.74048995376448, -75.60620386940748],
        type: 'MTG',
        attorney: 'Moore & Rutt, P.A.',
        plaintiff: 'BOA',
        defendant: 'eleanor',
        caseNum: '22-003254322',
        status: 'Scheduled',
        principal: '$40,007'
    },
    {
        address: '45 bald eagle way, Newark, DE 19711',
        coords: [39.80984134887835, -75.48320968524224],
        type: 'Tax',
        attorney: 'Moore & Rutt, P.A.',
        plaintiff: 'Rocket Mortgage',
        defendant: 'pedro',
        caseNum: '22-000200N221-3kJ',
        status: 'Scheduled',
        principal: '$52,099'
    },
    {
        address: '333 three street, Bear, DE 19744',
        coords: [39.81300605353191, -75.60955245818661],
        type: 'MTG',
        attorney: 'Bryan Bryan Bryan & associates, P.A.',
        plaintiff: 'Chase',
        defendant: 'connor',
        caseNum: '22-0324354002kJ',
        status: 'Scheduled',
        principal: '$554,084'
    }
]


let shownResults = 0
var map = L.map('map').setView([39.736235517093455, -75.62615770500472], 11)

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYnBhbmFjY2lvbmUiLCJhIjoiY2t6b213OThpMDJpOTJwb2E1OHF2djFoOCJ9.QXYx350LrWVwo8KMk0KcVA'
}).addTo(map);


var myHouse = L.marker([39.682932271199476, -75.76450423358189]).addTo(map);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("first Marker Test House at " + e.latlng.toString())
        .openOn(map);
}

myHouse.on('click', onMapClick);

var marker;

function mapProperties() {
    //var popup2 = L.popup();
    clearProperties();
    setResultNum(propertyArray.length)
    for (var i = 0; i < propertyArray.length; i++) {
        marker = new L.marker(propertyArray[i]['coords']).bindPopup('Hello').addTo(map);
        //map.addLayer(marker)
    } propertyTable()
}

function clearProperties() {
    //console.log(map)
    setResultNum(0)
    $('.fixed_header').remove()

    Object.keys(map['_layers']).forEach(key => {
        if (key !== '26' && key !== '35') {
            console.log('yea')
            map['_layers'][key].remove()
        }
    })
}

function propertyTable() {
    $tableOuter = $('<table class="fixed_header"></table>');
    $tableOuter.html('<col style="width: 100px"><col>')
    $tableHead = $('<thead></thead>');
    $tableHeadRow = $('<tr></tr>')
    Object.keys(propertyArray[0]).forEach(key => { $tableHeadRow.append(`<th>${key.toLocaleUpperCase()}</th>`) })
    $tableHead.html($tableHeadRow)
    $tbody = $('<tbody></tbody>')
    for (var i = 0; i < propertyArray.length; i++) {
        let $tableRow = $('<tr></tr>')
        Object.keys(propertyArray[i]).forEach(key => { $tableRow.append(`<td>${propertyArray[i][key]}</td>`) })
        $tbody.append($tableRow)
    }
    $tableOuter.append($tableHead)
    $tableOuter.append($tbody)
    $('.table-wrapper').append($tableOuter)
}

function setResultNum(num) {
    $('#resultLen').text(`Results: ${num}`)
}


$('.clear').on('click', clearProperties)
$('.populate').on('click', mapProperties)
