/*
 * Function: highlightMatching
 * Description: Returns a new string with the matched portions of the search term
 *              wrapped in <strong> tags.
 * @param str {string} The input string to search through.
 * @param searchTerm {string} The search term to highlight in the input string.
 * @returns {string} A new string with the matched portions of the search term
 *                   wrapped in <strong> tags.
 */
export function highlightMatching(str: string, searchTerm: string): string {
  // Clean up the search term by removing extra spaces, escaping special characters,
  // and joining the resulting strings with a regex OR operator.
  const regexStr = searchTerm
    .replace(/\s+/, ' ') // Replace one or more spaces with a single space
    .split(' ') // Split the string into an array of individual words
    .map((s) => s.replace(/([^a-zA-Z0-9-_])/gi, '\\$1')) // Escape any special characters in each word
    .join('|'); // Join the array of words with the regex OR operator

  // Create a new regex pattern using the escaped search term and the gi flags
  try {
    const regex = new RegExp(`(${regexStr})`, 'gi');

    // Remove HTML tags and replace any matches with the matched text wrapped in <strong> tags
    return removeHtmlTags(str).replace(regex, '<strong>$1</strong>');
  } catch (e) {
    console.error(e);
  }

  // Return an empty string if an error occurred
  return '';
}

/*
 * Function: removeHtmlTags
 * Description: Returns a new string with all HTML tags removed.
 * @param str {string} The input string to remove HTML tags from.
 * @returns {string} A new string with all HTML tags removed.
 */
export function removeHtmlTags(str: string): string {
  // Create a new DOMParser object
  const parser = new DOMParser();

  // Parse the input string into a new HTML document
  const doc = parser.parseFromString(str, 'text/html');

  // Return the text content of the body element of the parsed HTML document
  // This will remove all HTML tags and return only the text content
  return doc.body.textContent || '';
}

/*
 * Function: fetchLocationData
 * Description: Fetches location data from the Nominatim API and returns an array of strings
 *              containing the display names of the matching locations.
 * @param q {string} The search query to send to the Nominatim API.
 * @returns {Promise<string[]>} A Promise that resolves to an array of strings containing
 *                              the display names of the matching locations.
 */
export async function fetchLocationData(q: string): Promise<string[]> {
  // Send a GET request to the Nominatim API with the provided search query
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${q}&format=json`,
  );

  // Parse the response as JSON
  let data = await response.json();

  // If the response is an array, map each item to its display_name property
  if (Array.isArray(data)) {
    data = data.map((item) => item.display_name);
  }

  // Return the data as an array of strings
  return data as string[];
}

/**
 * Function: match
 * Returns a boolean indicating whether a given string matches a search term.
 * @param str - The string to check for a match
 * @param searchTerm - The search term to match against
 * @returns A boolean indicating whether a match was found
 */
export function match(str: string, searchTerm: string): boolean {
  const regexStr = searchTerm
    .replace(/\s+/, ' ') // Replace one or more spaces with a single space
    .split(' ') // Split the string into an array of individual words
    .map((s) => s.replace(/([^a-zA-Z0-9-_])/gi, '\\$1')) // Escape any special characters in each word
    .join('|'); // Join the array of words with the regex OR operator

  try {
    const regex = new RegExp(`(${regexStr})`, 'gi');

    return str.match(regex) ? true : false;
  } catch (e) {
    console.error(e);
  }
  return false;
}

/**
 * Function: fetchCurrenciesData
 * Fetches an array of currencies that include the given query string.
 * @param {string} q The query string to filter the currencies by.
 * @returns {Promise<string[]>} A promise that resolves to an array of currencies.
 */
export async function fetchCurrenciesData(
  q: string,
): Promise<string[]> {
  const data: string[] = [
    '(AED) Arabic dirham',
    '(AFN) afghani',
    '(ALL) lek',
    '(AMD) dram',
    '(ANG) Netherlands Antillean guilder',
    '(AOA) kwanza',
    '(ARS) Argentine peso',
    '(AUD) Australian dollar',
    '(AWG) guilder',
    '(AZN) manat',
    '(BAM) Convertible mark',
    '(BBD) Barbadian dollar',
    '(BDT) taka',
    '(BGN) Bulgarian lev',
    '(BHD) Bahrain dinar',
    '(BIF) Burundi franc',
    '(BMD) Bermudian dollar',
    '(BND) Brunei dollar',
    '(BOB) boliviano',
    '(BRL) Brazilian real',
    '(BSD) Bahamian dollar',
    '(BTN) ngultrum',
    '(BWP) pula',
    '(BYR) Belarus rubel',
    '(BZD) Belize dollar',
    '(CAD) Canadian dollar',
    '(CDF) Congolais franc',
    '(CHF) Swiss franc',
    '(CKD) Cook dollar',
    '(CLP) Chilean peso',
    '(CNY) Renminbi yuan',
    '(COP) Colombian peso',
    '(CRC) colón',
    '(CUP) Cuban peso',
    '(CVE) Cape Verdean escudo',
    '(CZK) Czech krone',
    '(DJF) Djibouti franc',
    '(DKK) Danish krone',
    '(DOP) Dominican peso',
    '(DZD) Algerian dinar',
    '(EGP) Egypt pound',
    '(ERN) nakfa',
    '(ETB) birr',
    '(FJD) Fiji dollar',
    '(FKP) Falklands pound',
    '(FOK) Faroese krona',
    '(GBP) Sterling pound',
    '(GEL) Georgian lari',
    '(GGP) Guernsey pound',
    '(GHS) Ghana cedi',
    '(GIP) Gibraltar pound',
    '(GMD) dalasi',
    '(GNF) Guinea franc',
    '(GTQ) quetzal',
    '(GYD) Guyana dollar',
    '(HKD) Hong Kong dollar',
    '(HNL) lempira',
    '(HTG) gourde',
    '(HUF) Hungarian forint',
    '(IDR) Indonesian rupiah',
    '(ILS) New Israeli sheqel',
    '(IMP) Manx pound',
    '(INR) Indian rupee',
    '(IQD) Iraqi dinar',
    '(IRR) Iranian rial',
    '(ISK) Icelandic krone',
    '(JEP) Jersey Sterling pound',
    '(JMD) Jamaica dollar',
    '(JOD) Jordanian dinar',
    '(JPY) Japanese yen',
    '(KES) Kenian schilling',
    '(KGS) som',
    '(KHR) Cambodian riel',
    '(KID) Kiribati dollar',
    '(KMF) Comorian franc',
    '(KPW) North Korean won',
    '(KRW) South Korean won',
    '(KWD) Kuwaiti dinar',
    '(KYD) Cayman dollar',
    '(KZT) tenge',
    '(LAK) kip',
    '(LBP) Lebanese pound',
    '(LKR) Sri Lanka rupee',
    '(LRD) Liberian dollar',
    '(LSL) Lesotho loti',
    '(LYD) Libyan dinar',
    '(MAD) Moroccan dirham',
    '(MDL) Moldovan leu',
    '(MGA) Malagasy ariary',
    '(MKD) denar',
    '(MMK) kyat',
    '(MNT) tugrik',
    '(MOP) Macanese pataca',
    '(MRO) Mauritanian ouguiya',
    '(MUR) Mauritian rupee',
    '(MVR) Maldivian rufiyaa',
    '(MWK) Malawian kwacha',
    '(MXN) Mexican peso',
    '(MYR) ringgit',
    '(MZN) metical',
    '(NAD) Namibian dollar',
    '(NGN) naira',
    '(NIO) Córdoba oro',
    '(NOK) Norwegian krone',
    '(NPR) Nepalese rupee',
    '(NZD) New Zealand dollar',
    '(OMR) Omani rial',
    '(PAB) Panamanian balboa',
    '(PEN) Nuevo sol',
    '(PGK) kina',
    '(PHP) Philippine peso',
    '(PKR) Pakistanian rupee',
    '(PLN) zloty',
    '(PYG) guaraní',
    '(QAR) Qatari rial',
    '(RON) Romanian leu',
    '(RSD) Serbian dinar',
    '(RUB) Russian rubel',
    '(RWF) Rwandan franc',
    '(SAR) Saudi rial',
    '(SBD) Salomon dollar',
    '(SCR) Seychelles rupee',
    '(SDG) Sudanese pound',
    '(SEK) Swedish krone',
    '(SGD) Singapore dollar',
    '(SHP) St.-Helena pound',
    '(SLL) leone',
    '(SOS) Somalian shilling',
    '(SRD) Surinam dollar',
    '(SSP) South Sudanese pound',
    '(STD) dobra',
    '(SYP) Syrian pound',
    '(SZL) Swazi lilangeni',
    '(THB) Thai baht',
    '(TJS) somoni',
    '(TMT) Turkmen manat',
    '(TND) Tunesian dinar',
    "(TOP) pa'anga",
    '(TRY) Turkish lira',
    '(TTD) Trinidad and Tobago dollar',
    '(TVD) Tuvaluan dollar',
    '(TWD) New Taiwan dollar',
    '(TZS) Tansanian shilling',
    '(UAH) hrywnja',
    '(UGX) Ugandan schilling',
    '(USD) US dollar',
    '(UYU) Uruguay peso',
    '(UZS) Uzbekistan sum',
    '(VND) dong',
    '(VUV) vatu',
    '(WST) tala',
    '(XAF) Central African franc',
    '(XCD) East Caribbean dollar',
    '(XOF) West African franc',
    '(XPF) Pacific franc',
    '(YER) Jemen rial',
    '(ZAR) South African rand',
    '(ZMW) Zambian kwacha',
    '(ZWL) Zimbabwe dollar',
  ];
  return data.filter((item: string) => match(item, q)).slice(0, 10);
}
