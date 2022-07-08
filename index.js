document.querySelector('#button1').addEventListener('click', getFetch)
document.querySelector('#button1').addEventListener('click', removeHidden)
document.querySelector('#button2').addEventListener('click', errorStyle)
//getFetch() will run upon #button1 click

function removeHidden(){
    artistLogo.classList.remove('hidden');
    artistThumbnail.classList.remove('hidden');
    title.classList.add('hidden');
}

async function getFetch(){ 
    try {
        const choice = document.querySelector('input').value.toLowerCase().trim().replace(/ /g,"_");
        //artist name will replace space(s) with underscore(s)
        const url = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${choice}`
        const res = await fetch(url)
        const data = await res.json()

        //display artist name in DOM:
        document.querySelector(".name").innerText = `${data.artists[0].strArtist}`

        let artistImg = []
        artistImg.push(data.artists[0].strArtistThumb)
        document.querySelector(".artist-thumbnail").src = artistImg[0]

        let artistLogo = []
        artistLogo.push(data.artists[0].strArtistLogo)
        document.querySelector(".artist-logo").src = artistLogo[0]

        let artistLabel = []
        artistLabel.push(data.artists[0].strLabel)
        document.querySelector(".label").innerText = artistLabel[0]
        //If NO LABEL is present, the database would return null, 
        //and "null" would be displayed. However, let's use array method so that
        //nothing will be displayed since "[null]" will NOT display anything.
        //Let's do the same for year, genre, and mood in case those values
        //can also turn out to be "null":

        let artistYearFormed = []
        artistYearFormed.push(data.artists[0].intFormedYear)
        document.querySelector(".year-formed").innerText = artistYearFormed[0]

        let artistGenre = []
        artistGenre.push(data.artists[0].strGenre)
        document.querySelector(".genre").innerText = artistGenre[0]

        let artistMood = []
        artistMood.push(data.artists[0].strMood)
        document.querySelector(".mood").innerText = artistMood[0]

        let artistOrigin = []
        artistOrigin.push(data.artists[0].strCountry)
        document.querySelector(".origin").innerText = artistOrigin[0]

        let artistWebsite = []
        artistWebsite.push(data.artists[0].strWebsite)
        document.querySelector(".website").innerText = artistWebsite[0]
        document.querySelector(".website-link").href = `https://${artistWebsite[0]}`

        let artistBio = []
        artistBio.push(data.artists[0].strBiographyEN)
        document.querySelector(".bio").innerText = artistBio[0]
        document.querySelector("#myBtn").innerText = "Biography"

        console.log(data.artists[0])
    }catch (error){
        errorStyle()
        const choice = document.querySelector('input').value.trim();
        document.querySelector(".name").innerText = `Sorry, but "${choice}" is not in the database. Error 404.`
        console.log(`Error caught in getFetch() Catch - ${error}`)
    }
}

function errorStyle(){ //Resets the styling if error was caught in getFetch() 
    document.querySelector(".name").innerText = ``
    document.querySelector(".label").innerText = ``
    document.querySelector(".year-formed").innerText = ``
    document.querySelector(".genre").innerText = ``
    document.querySelector(".mood").innerText = ``
    document.querySelector(".origin").innerText = ``
    document.querySelector(".website").innerText = ``
    document.querySelector(".website-link").href = ``
    document.querySelector(".bio").innerText = ``
    document.querySelector("#myBtn").innerText = ``
    artistLogo.classList.add('hidden');
    artistThumbnail.classList.add('hidden');
    title.classList.remove('hidden')
}

//MODAL:
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}