/*  SMALL ILLUSTRATION FOR GETTING CURRENT LATITUDE AN LONGITUDE
async function getwthr(){
    let APIKEY="0719dd8e010e778a98dece82a68cc870"
    let city="goa"
    try{
        let data=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`)
        let newData=await data.json()
        console.log(data)
        let para=document.createElement('p')
        !giving temperature
        para.textContent=newData?.main?.temp.toFixed(2)+" K"
        !retrieving temp_min
        para.textContent=newData?.main?.temp_min.toFixed(2)+" K"
        !retrieving pressure
        para.textContent=newData?.main?.pressure.toFixed(2)+" bar"
        
        document.body.appendChild(para)
        console.log(newData)
    }
    catch(err){
        console.log(err)
    }
}
*/
//tabs
let tab1 = document.querySelector('.tab1')
let tab2 = document.querySelector('.tab2')
//grant
let grnt_btn = document.querySelector('.grant_button')
let access_c = document.querySelector('.access_container')
//search_bar and your_weather_container used for switch
let search_bar = document.querySelector('.Search_bar')
let weather_container = document.querySelector('.weather_info_display')
//search button and value
let search_value = document.querySelector('.city_srch')
let search_btn = document.querySelector('.search_btn')
//loading gif
let load_cont = document.querySelector('.loading_container')
let load_gif = document.querySelector('.load_gif')
//weather container
let wthr_disp = document.querySelector('.weather_info_display')
let city_disp = document.querySelector('.city')
let flag_disp = document.querySelector('.city_flag')
let situation = document.querySelector('.Situation')
let situation_img = document.querySelector('.Data_IMG')
let temp_data = document.querySelector('.temperature_data')
let value_wind = document.querySelector('.wind_speed_value')
let value_humid = document.querySelector('.humidity')
let value_cloud = document.querySelector('.cloud_value')
let API_KEY = "0719dd8e010e778a98dece82a68cc870"
let error = document.querySelector('.error')
let current_Tab = tab1
// class lists 

weather_container.classList.add('invisible')
current_Tab.classList.add('current_tab')
search_bar.classList.add('invisible')
load_gif.classList.add('invisible')
error.classList.add('invisible')
//Called because it checks if latitude and longitude coords arre availaible or not
getCurrentWeather()
//event listeners
tab1.addEventListener('click', () => {
    switchTab(tab1)
})
tab2.addEventListener('click', () => {
    switchTab(tab2)
})

//switch tab function
function switchTab(clickedTab) {
    if (clickedTab != current_Tab) {
        weather_container.classList.add('invisible')
        error.classList.add('invisible')
        search_value.value = ""
        current_Tab.classList.remove('current_tab')
        current_Tab = clickedTab
        current_Tab.classList.add('current_tab')
        if (current_Tab.textContent == 'Your weather') {
            document.querySelector('.spanner').classList.add('invisible')
            // weather_container.classList.remove('invisible')
            search_bar.classList.add('invisible')
            getCurrentWeather() //uses session storage
        }
        else {
            document.querySelector('.spanner').classList.remove('invisible')
            weather_container.classList.add('invisible')
            search_bar.classList.remove('invisible')
            access_c.classList.add('invisible')
        }


    }
}

//session data
function getCurrentWeather() {
    let coords = sessionStorage.getItem('coords')
    if (!coords) {
        access_c.classList.remove('invisible')
    }
    else {
        access_c.classList.add('invisible')
        weather_container.classList.remove('invisible')
        let coordinates = JSON.parse(coords) //it automatically derives the value in the objects
        fecthClientWthrInfo(coordinates)

    }
}

// Fn to get client weather info
async function fecthClientWthrInfo(coordinates) {
    // Retreiving the latitiude and longitude using coordinates 
    weather_container.classList.add('invisible')
    let { lat, lon } = coordinates
    //removing access bar
    access_c.classList.add('invisible')
    //adding the loading bar
    load_gif.classList.remove('invisible')
    //fetching the API
    try {
        let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lon=${lon}&lat=${lat}&appid=${API_KEY}`)
        console.log(data)
        let newData = await data.json()
        load_gif.classList.add('invisible')
        //as we got the data so we need to render the data
        renderwthrdata(newData)
        weather_container.classList.remove('invisible')

    }                                                                     
    catch (err) {              
        weather_container.classList.add('invisible')
        load_gif.classList.add('invisible')
        error.classList.remove('invisible')
    }
}
//read Optional_operator.js for good information //!The main function
function renderwthrdata(JSON_DATA) {
    load_gif.classList.remove('invisible')
    weather_container.classList.add('invisible')
    city_disp.textContent = `${JSON_DATA?.name}`
    // flag_disp.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase().png}`
    situation.textContent = JSON_DATA?.weather?.[0]?.description
    temp_data.textContent = JSON_DATA?.main?.temp + 'K'
    value_wind.textContent = JSON_DATA?.wind?.speed + 'm/s'
    value_humid.textContent = JSON_DATA?.main?.humidity + '%'
    value_cloud.textContent = JSON_DATA?.clouds?.all + '%'
    load_gif.classList.add('invisible')
    weather_container.classList.remove('invisible')
    if (JSON_DATA?.name == undefined) {
        weather_container.classList.add('invisible')
        error.classList.remove('invisible')
    }
}
//grant access
grnt_btn.addEventListener('click', async () => {
    if (navigator.geolocation) {
        weather_container.classList.add('animater')
        navigator.geolocation.getCurrentPosition((position) => {
            const coords = {
                lat: position.coords.latitude,
                lon: position.coords.longitude
            }
            sessionStorage.setItem("coords", JSON.stringify(coords))
            fecthClientWthrInfo(coords)



        })
    }
    else {
        console.log('Not a valid location')
    }
    weather_container.classList.remove('animater')
})

//search_listener

search_btn.addEventListener('click', (event) => {
    weather_container.classList.add('invisible')
    load_gif.classList.remove('invisible')
    event.preventDefault()
    let city_name = search_value.value
    if (city_name == "") {
        return
    }
    else {
        GiveTheSearchResult(city_name)
    }
    search_value.value = ""
})
async function GiveTheSearchResult(city_name) {
    try {
        error.classList.add('invisible')
        let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`)
        let jsoned_data = await data.json()
        renderwthrdata(jsoned_data)
        load_gif.classList.add('invisible')
        if (jsoned_data?.name != undefined) {
            weather_container.classList.remove('invisible')
        }
    }
    catch (err) {
        weather_container.classList.add('invisible')
        access_c.classList.add('invisible')
        load_gif.classList.add('invisible')
        error.classList.remove('invisible')
    }
}

t1=gsap.timeline()
t1.from(".container",{
    y:-150,
    duration:1,
    opacity:0,
})
t1.from("h1",{
    y:400,
    opacity:0,
})




//PARSE , STRINGIFY , DATA.JSON() 














































//! SMALL NOTE FOR ACCESING DATA FROM JSON FORMAT USING OPTIONAL OPERATOR


// //let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lon=${lon}&lat=${lat}&appid=${API_KEY}`)
// async function get(){
//     let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lon=17.66&lat=14.33&appid=0719dd8e010e778a98dece82a68cc870`)
//     let x = await data.json() //Here the OPTIONAL OPERATOR can only access the data in json format not in Stringified data
//     let n=JSON.stringify(x)
//     console.log(n)
// }
// // https://api.openweathermap.org/data/2.5/weather?lon=17.6868&lat=83.2185&appid=0719dd8e010e778a98dece82a68cc870

// get() 