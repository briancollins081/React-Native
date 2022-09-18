import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { fetchPlaces } from "../util/database";

const AllPlaces = () => {
    const [loadedPlaces, setLoadedPlaces] = useState([]);
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            const loadDBPlaces = async () => {
                const places =  await fetchPlaces();
                setLoadedPlaces(places)
            }
            loadDBPlaces()
        }
    }, [isFocused])
    return <PlacesList places={loadedPlaces} />
}

export default AllPlaces;
