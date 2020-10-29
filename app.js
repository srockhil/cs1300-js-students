
var corsApiUrl = "https://cors-anywhere.herokuapp.com/";

var apiToken = "?token=1FClclFeo95S938GKdPNXw5Cw1TtcDWDQ-RxbUDFRIk";


// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    
    resolve(request);
  });


corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
      const jsonified = JSON.parse(request.response);
      const plants = jsonified.data
      
      handleResponse(plants)
     
    })
);

let familyDict = []
let all_plants;

const handleResponse = (plants) => {

  console.log(plants)
  all_plants = plants;
  
  let btn = document.createElement("button")
  btn.classList.add("btn", "btn-success")
  btn.innerHTML = "All plants"
  btn.addEventListener("click", function (){
    plants.map(turnOn)
  })
  document.getElementById("btn-div").appendChild(btn)
  plants.map(makePlantDiv)
  plants.map(addFamily)
};

const makePlantDiv = (data) => {
  let div = document.createElement("div");
    let col = makeRowandCol()
    col.classList.add("text-center")
    div.classList.add("card", "plant-div", "mx-auto", "my-4","text-center")
    col.appendChild(div)
    addData(data, div)


}

const makeRowandCol = () => {
  let row = document.createElement("div");
  row.classList.add("row");
  let col = document.createElement("div")
  col.classList.add("col")
  row.appendChild(col)
  document.getElementById("container").appendChild(row)
  return col
}

const addData = (data, div) => {
  let title = document.createElement("p")
  title.classList.add("title")
  div.appendChild(title)
  title.innerHTML = data.common_name
  div.id = data.id
  let img = document.createElement("img")
  img.classList.add("img-fluid")
  
  img.src = data.image_url
  div.appendChild(img)
  



}

const addFamily = (plant) => {
  if (!familyDict.includes(plant.family)){
      familyDict.push(plant.family)
      let btn = document.createElement("button")
      btn.classList.add("btn", "btn-primary")
      btn.innerHTML = plant.family
      document.getElementById("btn-div").append(btn)
      btn.addEventListener("click", function () {
        let family = all_plants.filter((plnt) => {
          return plnt.family === plant.family
        })
        family.map(turnOn)
        let nonfamily = all_plants.filter((plnt) => {
          return plnt.family !== plant.family
        })
        nonfamily.map(turnOff)



      })
  }

}

const turnOn = (plant) =>{
  document.getElementById(plant.id).classList.remove("d-none")

}

const turnOff = (plant) =>{
  document.getElementById(plant.id).classList.add("d-none")

}


