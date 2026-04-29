import { useEffect, useState } from "react";

function useCountries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCountries() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Countries could not be loaded.");
        }

        const data = await response.json();
        const sortedCountries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );

        setCountries(sortedCountries);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchCountries();

    return () => controller.abort();
  }, []);

  return { countries, loading, error };
}

export default useCountries;
