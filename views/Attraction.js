document.addEventListener("DOMContentLoaded", async () => {
    let TouristSpots = [...document.querySelectorAll(".TouristSpot")];
    let attractions = document.querySelectorAll(".AttractContainer");
    let Parks = [...document.querySelectorAll(".content > h3")];
    let spotAttraction = document.querySelector(".spot-attraction");
    let spotAddress = document.querySelector(".spot-address");
    let spotDetails = document.querySelector(".spot-details");
    let spot = document.querySelector(".spot")

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
            let [attraction, _address, _details] = [
                ...spots[index].children,
            ];
            park.textContent = attraction.textContent;
        });
        TouristSpots.forEach((touristSpot, index) => {
            let [attraction, _address, _details] = [
                ...spots[index].children,
            ];
            touristSpot.textContent = attraction.textContent;
        });
    }

    attractions.forEach((attraction, index) => {
        attraction.onmouseover = () => {
            UpdateDetails(index);
            showDetails();
        };
        attraction.onmouseout = () => {
            hideDetails();
        };
    });

    function hideDetails() {
        spot.classList.remove("show");
        spot.classList.add("hide");
    }

    function showDetails() {
        spot.classList.remove("hide");
        spot.classList.add("show");
    }
});

