const axios = require('axios');
const url =
  "https://api.apify.com/v2/datasets/58a4VXwBBF0HtxuQa/items?format=json&clean=1";

async function getData() {
  const response = await axios.get(url);
  console.log("got response");
  const data = response.data;
  const jsonString = JSON.stringify(data);
  console.log("writing file");
  await fs.writeFile("./latestData.json", jsonString, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
  console.log("writing file done");
  return true;
}
function daysInMonth (month, year) {
  return 
}
function DataToSent(month, year, covidData){


  var totalCases =0;
  var totalDeaths = 0;
  var totalRecovered = 0;
  var deathNew  = 0;
  var recoveredNew = 0
  var casesNew = 0;
  var prevMonth = Number(month!= 1)? month -1: 12;
  var prevYear = Number(month== 1)? year - 1: year;
 



  var prevmaxDays= new Date(prevYear, prevMonth, 0).getDate();
  var maxDays= new Date(year, month, 0).getDate();

  
  console.log(prevMonth);
  console.log(prevYear);
  console.log(prevmaxDays);
  console.log(maxDays);  

  const d = new Date();
  if(d.getMonth() +1 == Number(month) && d.getFullYear() == Number(year)){
    maxDays = d.getDate();
  }
  console.log("new maxdays"  + maxDays);

  for(const x of covidData){
     const timestamp = new Date(x["lastUpdatedAtApify"]);
     const dd = timestamp.getDate();
     const mm = timestamp.getMonth()+1;
     const yy = timestamp.getFullYear();
     const time = timestamp.getTime(); 
    //  console.log(dd + " " + mm + " "+yy);
      
     if(mm == Number(prevMonth) && yy == Number(prevYear) && dd == Number(prevmaxDays))
     { 
        totalCases = x["totalCases"];
        totalDeaths = x["deaths"];
        totalRecovered = x["recovered"];
     }
     if(mm == Number(month) && yy == Number(year) && dd == Number(maxDays))
     { 
        casesNew  = x["totalCases"] - totalCases;
        deathNew = x["deaths"] - totalDeaths;
        recoveredNew = x["recovered"] - totalRecovered;

        totalCases = x["totalCases"];
        totalDeaths = x["deaths"];
        totalRecovered = x["recovered"];
     }
  }
  console.log("done");
  console.log({
   totalCases :totalCases,
   totalDeaths : totalDeaths,
   totalRecovered : totalRecovered,
   deathNew  :deathNew,
   recoveredNew : recoveredNew,
   casesNew : casesNew

  });
  return{
   totalCases :totalCases,
   totalDeaths : totalDeaths,
   totalRecovered : totalRecovered,
   deathNew  :deathNew,
   recoveredNew : recoveredNew,
   casesNew : casesNew

  }
}

module.exports = getData;
module.exports = DataToSent;