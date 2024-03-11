export async function horoscopeZodiac(birthday: Date) {
  const date = new Date(birthday);
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  let horoscope;
  switch (month) {
    case 0:
      horoscope = day >= 20 ? 'Aquarius' : 'Capricorn';
      break;
    case 1:
      horoscope = day >= 19 ? 'Pisces' : 'Aquarius';
      break;
    case 2:
      horoscope = day >= 21 ? 'Aries' : 'Pisces';
      break;
    case 3:
      horoscope = day >= 20 ? 'Taurus' : 'Aries';
      break;
    case 4:
      horoscope = day >= 21 ? 'Gemini' : 'Taurus';
      break;
    case 5:
      horoscope = day >= 22 ? 'Cancer' : 'Gemini';
      break;
    case 6:
      horoscope = day >= 23 ? 'Leo' : 'Cancer';
      break;
    case 7:
      horoscope = day >= 23 ? 'Virgo' : 'Leo';
      break;
    case 8:
      horoscope = day >= 23 ? 'Libra' : 'Virgo';
      break;
    case 9:
      horoscope = day >= 24 ? 'Scorpion' : 'Libra';
      break;
    case 10:
      horoscope = day >= 22 ? 'Sagittarius' : 'Scorpion';
      break;
    case 11:
      horoscope = day >= 22 ? 'Capricorn' : 'Sagittarius';
      break;
    default:
      horoscope = null;
      break;
  }

  let zodiac;
  switch (year) {
    case 2012:
      zodiac = month <= 1 ? 'Rabbit' : 'Dragon';
      break;
    case 2011:
      zodiac = month <= 1 ? 'Tiger' : 'Rabbit';
      break;
    case 2010:
      zodiac = month <= 1 ? 'Ox' : 'Tiger';
      break;
    case 2009:
      zodiac = month <= 1 ? 'Rat' : 'Ox';
      break;
    case 2008:
      zodiac = month <= 1 ? 'Pig' : 'Rat';
      break;
    case 2007:
      zodiac = month <= 1 ? 'Dog' : 'Pig';
      break;
    case 2006:
      zodiac = month <= 1 ? 'Rooster' : 'Dog';
      break;
    case 2005:
      zodiac = month <= 1 ? 'Monkey' : 'Rooster';
      break;
    case 2004:
      zodiac = month <= 1 ? 'Goat' : 'Monkey';
      break;
    case 2003:
      zodiac = month <= 1 ? 'Horse' : 'Goat';
      break;
    case 2002:
      zodiac = month <= 1 ? 'Snake' : 'Horse';
      break;
    case 2001:
      zodiac = month <= 1 ? 'Dragon' : 'Snake';
      break;
    case 2000:
      zodiac = month <= 1 ? 'Rabbit' : 'Dragon';
      break;
    case 1999:
      zodiac = month <= 1 ? 'Tiger' : 'Rabbit';
      break;
    case 1998:
      zodiac = month <= 1 ? 'Ox' : 'Tiger';
      break;
    case 1997:
      zodiac = month <= 1 ? 'Rat' : 'Ox';
      break;
    case 1996:
      zodiac = month <= 1 ? 'Pig' : 'Rat';
      break;
    case 1995:
      zodiac = month <= 1 ? 'Dog' : 'Pig';
      break;
    case 1994:
      zodiac = month <= 1 ? 'Rooster' : 'Dog';
      break;
    case 1993:
      zodiac = month <= 1 ? 'Monkey' : 'Rooster';
      break;
    case 1992:
      zodiac = month <= 1 ? 'Goat' : 'Monkey';
      break;
    case 1991:
      zodiac = month <= 1 ? 'Horse' : 'Goat';
      break;
    case 1990:
      zodiac = month <= 1 ? 'Snake' : 'Horse';
      break;
    case 1989:
      zodiac = month <= 1 ? 'Dragon' : 'Snake';
      break;
    case 1988:
      zodiac = month <= 1 ? 'Rabbit' : 'Dragon';
      break;
    case 1987:
      zodiac = month <= 1 ? 'Tiger' : 'Rabbit';
      break;
    case 1986:
      zodiac = month <= 1 ? 'Ox' : 'Tiger';
      break;
    case 1985:
      zodiac = month <= 1 ? 'Rat' : 'Ox';
      break;
    case 1984:
      zodiac = month <= 1 ? 'Pig' : 'Rat';
      break;
    case 1983:
      zodiac = month <= 1 ? 'Dog' : 'Pig';
      break;
    case 1982:
      zodiac = month <= 1 ? 'Rooster' : 'Dog';
      break;
    case 1981:
      zodiac = month <= 1 ? 'Monkey' : 'Rooster';
      break;
    case 1980:
      zodiac = month <= 1 ? 'Goat' : 'Monkey';
      break;
    case 1979:
      zodiac = month <= 1 ? 'Horse' : 'Goat';
      break;
    case 1978:
      zodiac = month <= 1 ? 'Snake' : 'Horse';
      break;
    case 1977:
      zodiac = month <= 1 ? 'Dragon' : 'Snake';
      break;
    case 1976:
      zodiac = month <= 1 ? 'Rabbit' : 'Dragon';
      break;
    case 1975:
      zodiac = month <= 1 ? 'Tiger' : 'Rabbit';
      break;
    case 1974:
      zodiac = month <= 1 ? 'Ox' : 'Tiger';
      break;
    case 1973:
      zodiac = month <= 1 ? 'Rat' : 'Ox';
      break;
    case 1972:
      zodiac = month <= 1 ? 'Pig' : 'Rat';
      break;
    case 1971:
      zodiac = month <= 1 ? 'Dog' : 'Pig';
      break;
    case 1970:
      zodiac = month <= 1 ? 'Rooster' : 'Dog';
      break;
    case 1969:
      zodiac = month <= 1 ? 'Monkey' : 'Rooster';
      break;
    case 1968:
      zodiac = month <= 1 ? 'Goat' : 'Monkey';
      break;
    case 1967:
      zodiac = month <= 1 ? 'Horse' : 'Goat';
      break;
    case 1966:
      zodiac = month <= 1 ? 'Snake' : 'Horse';
      break;
    case 1965:
      zodiac = month <= 1 ? 'Dragon' : 'Snake';
      break;
    default:
      zodiac = null;
      break;
  }

  const birthdate = date.toISOString();

  return { horoscope, zodiac, birthdate };
}
