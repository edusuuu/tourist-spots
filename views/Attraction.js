document.addEventListener("DOMContentLoaded", async () => {
    let TouristSpots = [...document.querySelectorAll(".TouristSpot")];
    let attractions = document.querySelectorAll(".AttractContainer");
    let Parks = [...document.querySelectorAll(".content > h3")];
    let spotAttraction = document.querySelector(".spot-attraction");
    let spotAddress = document.querySelector(".spot-address");
    let spotDetails = document.querySelector(".spot-details");
    const detail = document.querySelector(".details");
    const detSpot = document.querySelector(".details .spot");
    const attSec = document.querySelector(".AttractSec");
    const attCon = document.querySelector(".AttractContainer");

    let spots = await fetchSpots();
    PopulateAttractions(spots);

    async function fetchSpots() {
        let result = await fetch("./Spots.xml")
            .then((res) => res.text())
            .then((data) => {
                let parser = new DOMParser();
                let xml = parser.parseFromString(data, "text/xml");
                let spots = [...xml.getElementsByTagName("spot")];
                return spots;
            })
            .catch((error) => console.log(error.message));
        return result;
    }

    function UpdateDetails(index) {
        let [attraction, address, details] = [
            ...spots[index].children,
        ];

        spotAttraction.textContent = attraction.textContent;
        spotAddress.textContent = address.textContent;
        spotDetails.textContent = details.textContent;
    }

    function PopulateAttractions(spots) {
        Parks.forEach((park, index) => {
            let [attraction, _municipality, _address, _details] = [
                ...spots[index].children,
            ];
            park.textContent = attraction.textContent;
        });
        TouristSpots.forEach((touristSpot, index) => {
            let [attraction, _municipality, _address, _details] = [
                ...spots[index].children,
            ];
            touristSpot.textContent = attraction.textContent;
        });
    }

    attractions.forEach((attraction, index) => {
        console.log(attraction);
        attraction.onmouseover = () => {
            UpdateDetails(index);

            void detail.offsetWidth;
            detail.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.9)";
            detail.style.color = "black";
            detail.style.maxWidth = "1300px";
            detail.style.transform = "scale(1.1)";
            detail.style.height = "fit-content"
            detail.style.marginBottom = "40px";
            detail.style.transition = "box-shadow 0.5s ease-in-out, color 0.5s ease, max-width 0.5s ease, transform 0.5s ease, height 0.5s ease, margin-bottom 0.5s ease";
            detSpot.style.borderColor = "black";
            detSpot.style.transition = "border-color 0.5s ease";

            attCon.style.marginBottom = "10px";
            attCon.style.transition= "margin-bottom 0.5s ease";
        };
        attraction.onmouseout = () => {
            detail.style.color = "white";
            detail.style.transition = "none";
            detail.style.boxShadow = "none";
            detail.style.transform = "scale(0.7)";
            detail.style.fontSize = "0";
            detail.style.transition = "box-shadow 0.5s ease-in-out, color 0.5s ease, max-width 0.5s ease, transform 0.5s ease, font-size 0.5s ease";
            detSpot.style.borderColor = "white";
            detSpot.style.transition = "border-color 0.5s ease";

            attCon.style.marginBottom = "0";
            attCon.style.transition= "margin-bottom 0.5s ease";
        };
    });
});
