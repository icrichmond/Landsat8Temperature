## Land Surface Temperature Calculation and Extraction Using Landsat 8 Satellites

### Modules  
All modules found in this repository were forked from Sofia Ermida's [repository](https://github.com/sofiaermida/Landsat_SMW_LST). Their paper can be found at:   

Ermida, S.L., Soares, P., Mantas, V., Göttsche, F.-M., Trigo, I.F., 2020. 
    Google Earth Engine open-source code for Land Surface Temperature estimation from the Landsat series.
    Remote Sensing, 12 (9), 1471; https://doi.org/10.3390/rs12091471


### Cross-City Derivations
I have used the modules above to calculate land surface temperature for part of the first chapter of my PhD work, as a part of the Cross-City Ecosystem Services project. All work was done in google earth engine, where the modules were imported. Assets 'cities', 'hoods', and 'roads' were also imported. Details: 

- [cross-city_LST.js](https://github.com/icrichmond/Landsat_SMW_LST/blob/master/cross-city_LST.js) is document modified to implement Sofia Ermida's code to my [cross-city ecosystem services project](https://github.com/zule-lab/CrossCityES) 
- module found on L19 of this code 'users/icrichmond/cross-city-es:SofiaErmidaModules/Landsat_LST' are the same modules in `modules/` [folder](https://github.com/icrichmond/Landsat_SMW_LST/tree/master/modules) in this repo 
- code to produce assets can all be found in my cross-city ES repository: [MunicipalBoundariesCleaned](https://github.com/zule-lab/CrossCityES/blob/main/scripts/2b-RoadsCleanup.R) , [AllNeighbourhoodsCleaned](https://github.com/zule-lab/CrossCityES/blob/main/scripts/2a-NeighbourhoodsCleanup.R), and [RoadsCleaned](https://github.com/zule-lab/CrossCityES/blob/main/scripts/2b-RoadsCleanup.R)
