import { useState } from "react";
import SearchBar from "../components/SearchBar";
import CountryCard from "../components/CountryCard";
import Loader from "../components/Loader";
import useCountries from "../hooks/useCountries";

function Home() {
  const [query, setQuery] = useState("");
  const { countries, loading, error } = useCountries();
  const trimmedQuery = query.trim().toLowerCase();
  const filteredCountries = trimmedQuery
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(trimmedQuery)
      )
    : [];

  return (
    <div className="home">
      <SearchBar query={query} onQueryChange={setQuery} />

      {loading && <Loader />}

      {error && <p className="home__message">{error}</p>}

      {!loading && !error && !trimmedQuery && (
        <p className="home__placeholder">Start searching to explore countries.</p>
      )}

      {!loading && !error && trimmedQuery && filteredCountries.length === 0 && (
        <p className="home__message">No countries found for "{query}".</p>
      )}

      {!loading && !error && filteredCountries.length > 0 && (
        <section className="country-grid" aria-label="Country search results">
          {filteredCountries.map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
        </section>
      )}
    </div>
  );
}

export default Home;
