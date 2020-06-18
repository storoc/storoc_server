# storoc_server
Server-side application development for Web, API, and analytics

# Store Occupancy API

## Overview
This API service provides access to occupancy data from participating stores. 

The data may include current occupancy status as well as historical 
occupancy trends, depending on the settings the store manager configures.
 
## Authentication
No authentication is required to access the publicly available data.

The business facing user interface requires login and 
authentication. Certain levels of information can be configured by the 
store manager. For example, occupancy data can be abstracted to show: "Good time to 
shop", "Store near capacity", "Store at Capacity".

## Rate Limiting
Requests are limited 1 per second

## Responses 

- Responses will be formated as JSON files, structures are listed below.
- Successful requests will have a 2XX response code 

## Endpoints 

All API requests will be directed to the '/api' endpoint

## Queries

To access database content, an HTTP GET request is used with MIME type = JSON.

The URL request includes the fields for the request, using URL query string
formating. For example, to request information about a particular store, the
unique ID is sent to the server using the following format:

>http://URL/api?unique_id=place_id_from_google

To link our database with the Google API results, the unique_id for each store
is the same as the place_id provided by Google.

To update database information, only authenticated sensors located at participating
stores will be able to write this information.

##Database Documents and Collections

Below is a list of resources which will show participating consumer 
goods sectors, companies within each of the sectors, and individual stores of 
those various companies. For example, if a shopper wants to see which 
store has the least amount of occupants, but doesn't care about shopping with 
a particular company, they can compare all stores within that market sector. 

### business_sector

Following the classifications outlined below:
> https://en.wikipedia.org/wiki/Global_Industry_Classification_Standard

Fields:
> {
>	“sector”: [ “Food Retail”, “Hypermarkets & Super Centers”, 
“Department Stores”, “Computer & Electronics Retail”]
> {

Methods:

- addSector();
- updateSector();
- deleteCompany();


### company

Fields:
> {
>	“company”: [ “Kroger”, “Meijer”, “Plum Market” ]
> {

Methods:

- addCompany();
- updateCompany();
- deleteCompany();

### store

Fields:
>{
>	“company”: "type": "string",
>	"unique_id": "type": "integer",
>	"address": {
>		"street_address": { "type": "string" },
>		"city":           { "type": "string" },
>		"state":          { "type": "string" },
>	"current_occupancy": "type": "integer",
>}

Methods:

- addStore();
- updateStore();
- deleteStore();
