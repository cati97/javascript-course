///////////////////////////////////////
// String Methods Practice

const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const flightStrings = flights.split("+");

const getAirportShortcut = (airport) => {
  return airport.slice(0, 3).toUpperCase();
};

const fixedStrLen = 44;

for (const flight of flightStrings) {
  const [landingType, startAirport, endAirport, time] = flight.split(";");
  const delayedSplit = landingType.split("_").slice(1);
  console.log(
    `${delayedSplit.includes("Delayed") ? "🔴" : ""} ${delayedSplit.join(" ")} from ${getAirportShortcut(
      startAirport
    )} to ${getAirportShortcut(endAirport)} (${time.replace(":", "h")})`.padStart(44, " ")
  );
}
