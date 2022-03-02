// PART 1: CALCULATING LST // 

/*
Author: Sofia Ermida (sofia.ermida@ipma.pt; @ermida_sofia)
This code is free and open. 
By using this code and any data derived with it, 
you agree to cite the following reference 
in any publications derived from them:
Ermida, S.L., Soares, P., Mantas, V., Göttsche, F.-M., Trigo, I.F., 2020. 
    Google Earth Engine open-source code for Land Surface Temperature estimation from the Landsat series.
    Remote Sensing, 12 (9), 1471; https://doi.org/10.3390/rs12091471
Example 1:
  This example shows how to compute Landsat LST from Landsat-8 over Coimbra
  This corresponds to the example images shown in Ermida et al. (2020)
    
*/

// link to the code that computes the Landsat LST
var LandsatLST = require('users/icrichmond/cross-city-es:SofiaErmidaModules/Landsat_LST')

// select region of interest, date range, and landsat satellite
var geometry = cities;
var satellite = 'L8';
var date_start = '2016-05-01';
var date_end = '2016-08-30';
var use_ndvi = true;

// get landsat collection with added variables: NDVI, FVC, TPW, EM, LST
// clip image collection to city bounds
var LST = LandsatLST.collection(satellite, date_start, date_end, geometry, use_ndvi).map(function(image){return image.clip(cities)});

// convert to Celsius for easier analysis 
var LSTc = LST.select('LST').map(function(image) {
  return image
    .subtract(273.15)
});

// PART 2: EXTRACTING LST // 
// want to extract LST values at various scales in each city
// all assets were cleaned and produced in R - check github.com/icrichmond/cross-city-es for code 

// 1. City Scale 
// extract mean LST value at each image in the image collection for each city 
var CityLST = LSTc.map(function(image){
  return image.select('LST').reduceRegions({
  'reducer': ee.Reducer.mean(),
  'scale': 30,
  'collection': cities
  })
}).flatten();
print(CityLST.limit(10))

// filter instances where mean temperature is NULL 
CityLST = CityLST.filter(ee.Filter.neq('mean', null))
print(CityLST.limit(10))

// Explicitly select output variables in the export (redundant with filter lines 56-57)
Export.table.toDrive({
  collection: CityLST,
  selectors: ['city', 'mean', 'system:index']
})


// 2. Neighbourhood Scale 
// extract LST value at each date in the image collection for each neighbourhood
var HoodLST = LSTc.map(function(image){
  return image.select('LST').reduceRegions({
  'reducer': ee.Reducer.mean(),
  'scale': 30,
  'collection': hoods
  })
}).flatten();
print(HoodLST.limit(15))
// save
HoodLST = HoodLST.filter(ee.Filter.neq('mean', null))
Export.table.toDrive({
  collection: HoodLST,
  selectors: ['city', 'hood', 'mean', 'system:index']
})

// 3. Street Scale 
// calculate average LST value for each street in each city
var StreetLST = LSTc.map(function(image){
  return image.select('LST').reduceRegions({
  'reducer': ee.Reducer.mean(),
  'scale': 30,
  'collection': roads
  })
}).flatten();
print(StreetLST.limit(15))
// save
StreetLST = StreetLST.filter(ee.Filter.neq('mean', null))
Export.table.toDrive({
  collection: StreetLST,
  selectors: ['bound', 'streetid', 'mean', 'system:index']
})

// PART 3: VISUALIZING LST // 
// palettes
var cmap1 = ['blue', 'cyan', 'green', 'yellow', 'red'];
var cmap2 = ['F2F2F2','EFC2B3','ECB176','E9BD3A','E6E600','63C600','00A600']; 

// visualize LST
Map.addLayer(LSTc.select('LST'), {min:0, max:50, opacity:0.49, palette:cmap1},'LST')
// visualize city boundaries
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: roads,
  color: 1,
  width: 3
});
Map.addLayer(outline, {colour: 'black'}, 'LST')
