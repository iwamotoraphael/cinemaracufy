let searchbar = document.getElementById("barradebusca")

searchbar.addEventListener("keypress", (function (e) {
    if (e.key === 'Enter') {
        window.location.replace(`https://cinemaracufy.herokuapp.com/busca/?text=`+searchbar.value)
    }
}))