import { useEffect } from "react";
import { useAppContext } from "../context/AppContext"; // Adjust the path as needed

function usePersistedResponses() {
  const { responses, setResponses } = useAppContext();

  useEffect(() => {
    const savedResponses = JSON.parse(localStorage.getItem("responses"));
    if (savedResponses) {
      setResponses(savedResponses);
    }
  }, [setResponses]);

  useEffect(() => {
    localStorage.setItem("responses", JSON.stringify(responses));
  }, [responses]);
}

export default usePersistedResponses;
