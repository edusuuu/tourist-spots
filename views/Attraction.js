document.addEventListener("DOMContentLoaded", async () => {
    let TouristSpots = [...document.querySelectorAll(".TouristSpot")];
    let attractions = document.querySelectorAll(".AttractContainer");
    let Parks = [...document.querySelectorAll(".content > h3")];
    let Municipalities = [...document.querySelectorAll(".info")];
    let spotMunicipality = document.querySelector(".spot-municipality");
    let spotAttraction = document.querySelector(".spot-attraction");
    let spotAddress = document.querySelector(".spot-address");
    let spotDetails = document.querySelector(".spot-details");
    const SPOT_WRAPPER = document.querySelector(".details > .spot");

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
        let [attraction, municipality, address, details] = [
            ...spots[index].children,
        ];

        spotAttraction.textContent = attraction.textContent;
        spotMunicipality.textContent = municipality.textContent;
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
        Municipalities.forEach((Municipality, index) => {
            let [_attraction, municipality, _address, _details] = [
                ...spots[index].children,
            ];
            Municipality.textContent = `Municipality: ${municipality.textContent}`;
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
        attraction.onclick = () => {
            SPOT_WRAPPER.classList.remove("hide");
            SPOT_WRAPPER.classList.add("show");
            UpdateDetails(index);
        };
    });
});
