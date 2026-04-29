function CountryCard({ country }) {
  const capital = country.capital?.[0] ?? "No capital listed";

  return (
    <article className="country-card">
      <img
        className="country-card__flag"
        src={country.flags.svg}
        alt={country.flags.alt ?? `Flag of ${country.name.common}`}
      />

      <div className="country-card__body">
        <h2 className="country-card__name">{country.name.common}</h2>
        <p>
          <span>Capital:</span> {capital}
        </p>
        <p>
          <span>Region:</span> {country.region}
        </p>
        <p>
          <span>Population:</span> {country.population.toLocaleString()}
        </p>
      </div>
    </article>
  );
}

export default CountryCard;
