/**
 * @private
 */
export var CharacterRangeType;
(function (CharacterRangeType) {
    CharacterRangeType[CharacterRangeType["LeftToRight"] = 0] = "LeftToRight";
    CharacterRangeType[CharacterRangeType["RightToLeft"] = 1] = "RightToLeft";
    CharacterRangeType[CharacterRangeType["WordSplit"] = 2] = "WordSplit";
    CharacterRangeType[CharacterRangeType["Number"] = 4] = "Number";
    CharacterRangeType[CharacterRangeType["Tab"] = 6] = "Tab";
})(CharacterRangeType || (CharacterRangeType = {}));
/**
 * @private
 */
export var FontScriptType;
(function (FontScriptType) {
    FontScriptType[FontScriptType["English"] = 0] = "English";
    FontScriptType[FontScriptType["Hindi"] = 1] = "Hindi";
    FontScriptType[FontScriptType["Korean"] = 2] = "Korean";
    //To-Do : Should split the chinese script as "Simplified" and "Traditional".
    FontScriptType[FontScriptType["Chinese"] = 3] = "Chinese";
    FontScriptType[FontScriptType["Arabic"] = 4] = "Arabic";
    FontScriptType[FontScriptType["Hebrew"] = 5] = "Hebrew";
    FontScriptType[FontScriptType["Japanese"] = 6] = "Japanese";
    FontScriptType[FontScriptType["Thai"] = 7] = "Thai";
    FontScriptType[FontScriptType["SpecialCharacter"] = 8] = "SpecialCharacter";
    //To-Do : Should add a enum field for other known scripts. Such as Tamil, Malayalam, Telugu, etc.
})(FontScriptType || (FontScriptType = {}));
/**
 * @private
 */
export var LocaleId;
(function (LocaleId) {
    /**
     * African.
     */
    LocaleId[LocaleId["af_ZA"] = 1078] = "af_ZA";
    /**
     * Albanian.
     */
    LocaleId[LocaleId["sq_AL"] = 1052] = "sq_AL";
    /**
     * Amharic.
     */
    LocaleId[LocaleId["am_ET"] = 1118] = "am_ET";
    /**
     * Alsatian.
     */
    LocaleId[LocaleId["gsw_FR"] = 1156] = "gsw_FR";
    /**
     * Arabic Algerian.
     */
    LocaleId[LocaleId["ar_DZ"] = 5121] = "ar_DZ";
    // /**
    //  * Arabic Bahraini.
    //  */
    LocaleId[LocaleId["ar_BH"] = 15361] = "ar_BH";
    /**
     * Arabic Egyptian.
     */
    LocaleId[LocaleId["ar_EG"] = 3073] = "ar_EG";
    /**
     * Arabic Iraqi.
     */
    LocaleId[LocaleId["ar_IQ"] = 2049] = "ar_IQ";
    /**
     * Arabic Jordanian.
     */
    LocaleId[LocaleId["ar_JO"] = 11265] = "ar_JO";
    /**
     * Arabic Kuwaiti.
     */
    LocaleId[LocaleId["ar_KW"] = 13313] = "ar_KW";
    /**
     * Arabic Lebanese.
     */
    LocaleId[LocaleId["ar_LB"] = 12289] = "ar_LB";
    /**
     * Arabic Libyan.
     */
    LocaleId[LocaleId["ar_LY"] = 4097] = "ar_LY";
    /**
     * Arabic Moroccan.
     */
    LocaleId[LocaleId["ar_MA"] = 6145] = "ar_MA";
    // /**
    //  * Arabic Omani.
    //  */
    LocaleId[LocaleId["ar_OM"] = 8193] = "ar_OM";
    // /**
    //  * Arabic Qatari.
    //  */
    LocaleId[LocaleId["ar_QA"] = 16385] = "ar_QA";
    /**
     * Arabic Saudi.
     */
    LocaleId[LocaleId["ar_SA"] = 1025] = "ar_SA";
    /**
     * Arabic Syrian.
     */
    LocaleId[LocaleId["ar_SY"] = 10241] = "ar_SY";
    /**
     * Arabic Tunisian.
     */
    LocaleId[LocaleId["ar_TN"] = 7169] = "ar_TN";
    /**
     * Arabic United Arab Emirates.
     */
    LocaleId[LocaleId["ar_AE"] = 14337] = "ar_AE";
    /**
     * Arabic Yemeni.
     */
    LocaleId[LocaleId["ar_YE"] = 9217] = "ar_YE";
    /**
     * Armenian.
     */
    LocaleId[LocaleId["hy_AM"] = 1067] = "hy_AM";
    /**
     * Assamese.
     */
    LocaleId[LocaleId["as_IN"] = 1101] = "as_IN";
    // /**
    //  * Azeri Cyrillic.
    //  */
    LocaleId[LocaleId["az_Cyrl_AZ"] = 2092] = "az_Cyrl_AZ";
    // /**
    //  * Azeri Latin.
    //  */
    LocaleId[LocaleId["az_Latn_AZ"] = 1068] = "az_Latn_AZ";
    // /**
    //  * Bashkir.
    //  */
    LocaleId[LocaleId["ba_RU"] = 1133] = "ba_RU";
    /**
     * Basque.
     */
    LocaleId[LocaleId["eu_ES"] = 1069] = "eu_ES";
    // /**
    //  * Belarusian.
    //  */
    LocaleId[LocaleId["be_BY"] = 1059] = "be_BY";
    /**
     * Bengali (Bangladesh).
     */
    LocaleId[LocaleId["bn_BD"] = 2117] = "bn_BD";
    /**
     * Bengali (India).
     */
    LocaleId[LocaleId["bn_IN"] = 1093] = "bn_IN";
    /**
     * Bosnian (Cyrillic, Bosnia and Herzegovina).
     */
    LocaleId[LocaleId["bs_Cyrl_BA"] = 8218] = "bs_Cyrl_BA";
    /**
     * Bosnian (Bosnia/Herzegovina).
     */
    LocaleId[LocaleId["bs_Latn_BA"] = 5146] = "bs_Latn_BA";
    /**
     * Bulgarian.
     */
    LocaleId[LocaleId["bg_BG"] = 1026] = "bg_BG";
    /**
     * Breton.
     */
    LocaleId[LocaleId["br_FR"] = 1150] = "br_FR";
    /**
     * Burmese.
     */
    LocaleId[LocaleId["my_MM"] = 1109] = "my_MM";
    /**
     * Catalan.
     */
    LocaleId[LocaleId["ca_ES"] = 1027] = "ca_ES";
    /**
     * Cherokee - United States.
     */
    LocaleId[LocaleId["chr_US"] = 1116] = "chr_US";
    // /**
    //  * Chinese - Hong Kong SAR.
    //  */
    LocaleId[LocaleId["zh_HK"] = 3076] = "zh_HK";
    // /**
    //  * Chinese - Macao SAR.
    //  */
    LocaleId[LocaleId["zh_MO"] = 5124] = "zh_MO";
    /**
     * Chinese - People's Republic of China.
     */
    LocaleId[LocaleId["zh_CN"] = 2052] = "zh_CN";
    /**
     * Chinese - Singapore.
     */
    LocaleId[LocaleId["zh_SG"] = 4100] = "zh_SG";
    /**
     * Chinese - Taiwan.
     */
    LocaleId[LocaleId["zh_TW"] = 1028] = "zh_TW";
    /**
     * Corsican.
     */
    LocaleId[LocaleId["co_FR"] = 1155] = "co_FR";
    /**
     * Croatian (Bosnia/Herzegovina).
     */
    LocaleId[LocaleId["hr_BA"] = 4122] = "hr_BA";
    /**
     * Croatian.
     */
    LocaleId[LocaleId["hr_HR"] = 1050] = "hr_HR";
    /**
     * Czech.
     */
    LocaleId[LocaleId["cs_CZ"] = 1029] = "cs_CZ";
    /**
     * Danish.
     */
    LocaleId[LocaleId["da_DK"] = 1030] = "da_DK";
    /**
     * Dari.
     */
    LocaleId[LocaleId["prs_AF"] = 1164] = "prs_AF";
    // /**
    //  * Divehi.
    //  */
    LocaleId[LocaleId["dv_MV"] = 1125] = "dv_MV";
    /**
     * Dutch - Belgium.
     */
    LocaleId[LocaleId["nl_BE"] = 2067] = "nl_BE";
    /**
     * Dutch - Netherlands.
     */
    LocaleId[LocaleId["nl_NL"] = 1043] = "nl_NL";
    // /**
    //  * Edo.
    //  */
    LocaleId[LocaleId["bin_NG"] = 1126] = "bin_NG";
    /**
     * Estonian.
     */
    LocaleId[LocaleId["et_EE"] = 1061] = "et_EE";
    /**
     * English - Australia.
     */
    LocaleId[LocaleId["en_AU"] = 3081] = "en_AU";
    /**
     * English - Belize.
     */
    LocaleId[LocaleId["en_BZ"] = 10249] = "en_BZ";
    /**
     * English - Canada.
     */
    LocaleId[LocaleId["en_CA"] = 4105] = "en_CA";
    /**
     * English - Caribbean.
     */
    LocaleId[LocaleId["en_029"] = 9225] = "en_029";
    // /**
    //  * English - Hong Kong SAR.
    //  */
    LocaleId[LocaleId["en_HK"] = 15369] = "en_HK";
    /**
     * English - India.
     */
    LocaleId[LocaleId["en_IN"] = 16393] = "en_IN";
    /**
     * English - Indonesia.
     */
    LocaleId[LocaleId["en_ID"] = 14345] = "en_ID";
    /**
     * English - Ireland.
     */
    LocaleId[LocaleId["en_IE"] = 6153] = "en_IE";
    /**
     * English - Jamaica.
     */
    LocaleId[LocaleId["en_JM"] = 8201] = "en_JM";
    /**
     * English - Malaysia.
     */
    LocaleId[LocaleId["en_MY"] = 17417] = "en_MY";
    /**
     * English - New Zealand.
     */
    LocaleId[LocaleId["en_NZ"] = 5129] = "en_NZ";
    /**
     * English - Philippines.
     */
    LocaleId[LocaleId["en_PH"] = 13321] = "en_PH";
    /**
     * English - Singapore.
     */
    LocaleId[LocaleId["en_SG"] = 18441] = "en_SG";
    /**
     * English - South Africa.
     */
    LocaleId[LocaleId["en_ZA"] = 7177] = "en_ZA";
    /**
     * English - Trinidad.
     */
    LocaleId[LocaleId["en_TT"] = 11273] = "en_TT";
    /**
     * English - United Kingdom.
     */
    LocaleId[LocaleId["en_GB"] = 2057] = "en_GB";
    /**
     * English - United States.
     */
    LocaleId[LocaleId["en_US"] = 1033] = "en_US";
    /**
     * English - Zimbabwe.
     */
    LocaleId[LocaleId["en_ZW"] = 12297] = "en_ZW";
    // /**
    //  * Faroese.
    //  */
    LocaleId[LocaleId["fo_FO"] = 1080] = "fo_FO";
    /**
     * Filipino.
     */
    LocaleId[LocaleId["fil_PH"] = 1124] = "fil_PH";
    /**
     * Finnish.
     */
    LocaleId[LocaleId["fi_FI"] = 1035] = "fi_FI";
    /**
     * French - Belgium.
     */
    LocaleId[LocaleId["fr_BE"] = 2060] = "fr_BE";
    /**
     * French - Cameroon.
     */
    LocaleId[LocaleId["fr_CM"] = 11276] = "fr_CM";
    /**
     * French - Canada.
     */
    LocaleId[LocaleId["fr_CA"] = 3084] = "fr_CA";
    /**
     * French - Democratic Rep. of Congo.
     */
    LocaleId[LocaleId["fr_CD"] = 9228] = "fr_CD";
    // /**
    //  * French - Cote d'Ivoire.
    //  */
    LocaleId[LocaleId["fr_CI"] = 12300] = "fr_CI";
    /**
     * French - France.
     */
    LocaleId[LocaleId["fr_FR"] = 1036] = "fr_FR";
    /**
     * French - Haiti.
     */
    LocaleId[LocaleId["fr_HT"] = 15372] = "fr_HT";
    /**
     * French - Luxembourg.
     */
    LocaleId[LocaleId["fr_LU"] = 5132] = "fr_LU";
    /**
     * French - Mali.
     */
    LocaleId[LocaleId["fr_ML"] = 13324] = "fr_ML";
    /**
     * French - Monaco.
     */
    LocaleId[LocaleId["fr_MC"] = 6156] = "fr_MC";
    /**
     * French - Morocco.
     */
    LocaleId[LocaleId["fr_MA"] = 14348] = "fr_MA";
    /**
     * French - Reunion.
     */
    LocaleId[LocaleId["fr_RE"] = 8204] = "fr_RE";
    /**
     * French - Senegal.
     */
    LocaleId[LocaleId["fr_SN"] = 10252] = "fr_SN";
    /**
     * French - Switzerland.
     */
    LocaleId[LocaleId["fr_CH"] = 4108] = "fr_CH";
    /**
     * French - West Indies.
     */
    //fr_fr_WINDIES = 7180,
    /**
     * Frisian - Netherlands.
     */
    LocaleId[LocaleId["fy_NL"] = 1122] = "fy_NL";
    // /**
    //  * Fulfulde - Nigeria.
    //  */
    LocaleId[LocaleId["ff_NG"] = 1127] = "ff_NG";
    /**
     * Scottish Gaelic.
     */
    LocaleId[LocaleId["gd_GB"] = 1084] = "gd_GB";
    // /**
    //  * Galician.
    //  */
    LocaleId[LocaleId["gl_ES"] = 1110] = "gl_ES";
    /**
     * Georgian.
     */
    LocaleId[LocaleId["ka_GE"] = 1079] = "ka_GE";
    /**
     * German - Austria.
     */
    LocaleId[LocaleId["de_AT"] = 3079] = "de_AT";
    /**
     * German - Germany.
     */
    LocaleId[LocaleId["de_DE"] = 1031] = "de_DE";
    /**
     * German - Liechtenstein.
     */
    LocaleId[LocaleId["de_LI"] = 5127] = "de_LI";
    /**
     * German - Luxembourg.
     */
    LocaleId[LocaleId["de_LU"] = 4103] = "de_LU";
    /**
     * German - Switzerland.
     */
    LocaleId[LocaleId["de_CH"] = 2055] = "de_CH";
    /**
     * Greek.
     */
    LocaleId[LocaleId["el_GR"] = 1032] = "el_GR";
    /**
     * Guarani - Paraguay.
     */
    LocaleId[LocaleId["gn_PY"] = 1140] = "gn_PY";
    /**
     * Gujarati.
     */
    LocaleId[LocaleId["gu_IN"] = 1095] = "gu_IN";
    // /**
    //  * Greenlandic.
    //  */
    LocaleId[LocaleId["kl_GL"] = 1135] = "kl_GL";
    /**
     * Hausa - Nigeria.
     */
    LocaleId[LocaleId["ha_Latn_NG"] = 1128] = "ha_Latn_NG";
    /**
     * Hawaiian - United States.
     */
    LocaleId[LocaleId["haw_US"] = 1141] = "haw_US";
    /**
     * Hebrew.
     */
    LocaleId[LocaleId["he_IL"] = 1037] = "he_IL";
    /**
     * Hindi.
     */
    LocaleId[LocaleId["hi_IN"] = 1081] = "hi_IN";
    /**
     * Hungarian.
     */
    LocaleId[LocaleId["hu_HU"] = 1038] = "hu_HU";
    // /**
    //  * Ibibio - Nigeria.
    //  */
    LocaleId[LocaleId["ibb_NG"] = 1129] = "ibb_NG";
    /**
     * Icelandic.
     */
    LocaleId[LocaleId["is_IS"] = 1039] = "is_IS";
    // /**
    //  * Igbo - Nigeria.
    //  */
    LocaleId[LocaleId["ig_NG"] = 1136] = "ig_NG";
    /**
     * Indonesian.
     */
    LocaleId[LocaleId["id_ID"] = 1057] = "id_ID";
    // /**
    //  * Inuktitut (Latin, Canada).
    //  */
    LocaleId[LocaleId["iu_Latn_CA"] = 2141] = "iu_Latn_CA";
    // /**
    //  * Inuktitut.
    //  */
    LocaleId[LocaleId["iu_Cans_CA"] = 1117] = "iu_Cans_CA";
    /**
     * Italian - Italy.
     */
    LocaleId[LocaleId["it_IT"] = 1040] = "it_IT";
    /**
     * Italian - Switzerland.
     */
    LocaleId[LocaleId["it_CH"] = 2064] = "it_CH";
    /**
     * Irish.
     */
    LocaleId[LocaleId["ga_IE"] = 2108] = "ga_IE";
    /**
     * Xhosa.
     */
    LocaleId[LocaleId["xh_ZA"] = 1076] = "xh_ZA";
    /**
     * Zulu.
     */
    LocaleId[LocaleId["zu_ZA"] = 1077] = "zu_ZA";
    /**
     * Kannada (India).
     */
    LocaleId[LocaleId["kn_IN"] = 1099] = "kn_IN";
    // /**
    //  * Kanuri - Nigeria.
    //  */
    LocaleId[LocaleId["kr_NG"] = 1137] = "kr_NG";
    // /**
    //  * Kashmiri.
    //  */
    LocaleId[LocaleId["ks_Deva"] = 2144] = "ks_Deva";
    // /**
    //  * Kashmiri (Arabic).
    //  */
    LocaleId[LocaleId["ks_Arab"] = 1120] = "ks_Arab";
    /**
     * Kazakh.
     */
    LocaleId[LocaleId["kk_KZ"] = 1087] = "kk_KZ";
    /**
     * Khmer.
     */
    LocaleId[LocaleId["km_KH"] = 1107] = "km_KH";
    // /**
    //  * Konkani.
    //  */
    LocaleId[LocaleId["kok_IN"] = 1111] = "kok_IN";
    /**
     * Korean.
     */
    LocaleId[LocaleId["ko_KR"] = 1042] = "ko_KR";
    // /**
    //  * Kyrgyz (Cyrillic).
    //  */
    LocaleId[LocaleId["ky_KG"] = 1088] = "ky_KG";
    // /**
    //  * K'iche.
    //  */
    LocaleId[LocaleId["qut_GT"] = 1158] = "qut_GT";
    // /**
    //  * Kinyarwanda.
    //  */
    LocaleId[LocaleId["rw_RW"] = 1159] = "rw_RW";
    /**
     * Lao.
     */
    LocaleId[LocaleId["lo_LA"] = 1108] = "lo_LA";
    /**
     * Latin.
     */
    LocaleId[LocaleId["la_Latn"] = 1142] = "la_Latn";
    /**
     * Latvian.
     */
    LocaleId[LocaleId["lv_LV"] = 1062] = "lv_LV";
    /**
     * Lithuanian.
     */
    LocaleId[LocaleId["lt_LT"] = 1063] = "lt_LT";
    // /**
    //  * Lower Sorbian (Germany).
    //  */
    LocaleId[LocaleId["dsb_DE"] = 2094] = "dsb_DE";
    // /**
    //  * Luxembourgish.
    //  */
    LocaleId[LocaleId["lb_LU"] = 1134] = "lb_LU";
    // /**
    //  * FYRO Macedonian.
    //  */
    LocaleId[LocaleId["mk_MK"] = 1071] = "mk_MK";
    // /**
    //  * Malay - Brunei Darussalam.
    //  */
    LocaleId[LocaleId["ms_BN"] = 2110] = "ms_BN";
    /**
     * Malay - Malaysia.
     */
    LocaleId[LocaleId["ms_MY"] = 1086] = "ms_MY";
    /**
     * Malayalam.
     */
    LocaleId[LocaleId["ml_IN"] = 1100] = "ml_IN";
    /**
     * Maltese.
     */
    LocaleId[LocaleId["mt_MT"] = 1082] = "mt_MT";
    // /**
    //  * Manipuri.
    //  */
    LocaleId[LocaleId["mni_IN"] = 1112] = "mni_IN";
    /**
     * Maori - New Zealand.
     */
    LocaleId[LocaleId["mi_NZ"] = 1153] = "mi_NZ";
    /**
     * Marathi.
     */
    LocaleId[LocaleId["mr_IN"] = 1102] = "mr_IN";
    // /**
    //  * Mapudungun.
    //  */
    LocaleId[LocaleId["arn_CL"] = 1146] = "arn_CL";
    /**
     * Mongolian (Cyrillic).
     */
    LocaleId[LocaleId["mn_MN"] = 1104] = "mn_MN";
    /**
     * Mongolian (Mongolian).
     */
    LocaleId[LocaleId["mn_Mong_CN"] = 2128] = "mn_Mong_CN";
    /**
     * Nepali.
     */
    LocaleId[LocaleId["ne_NP"] = 1121] = "ne_NP";
    /**
     * Nepali - India.
     */
    LocaleId[LocaleId["ne_IN"] = 2145] = "ne_IN";
    // /**
    //  * Norwegian (Bokml).
    //  */
    LocaleId[LocaleId["nb_NO"] = 1044] = "nb_NO";
    // /**
    //  * Norwegian (Nynorsk).
    //  */
    LocaleId[LocaleId["nn_NO"] = 2068] = "nn_NO";
    // /**
    //  * Occitan.
    //  */
    LocaleId[LocaleId["oc_FR"] = 1154] = "oc_FR";
    /**
     * Oriya.
     */
    LocaleId[LocaleId["or_IN"] = 1096] = "or_IN";
    // /**
    //  * Oromo.
    //  */
    LocaleId[LocaleId["om_Ethi_ET"] = 1138] = "om_Ethi_ET";
    // /**
    //  * Papiamentu.
    //  */
    LocaleId[LocaleId["pap_AN"] = 1145] = "pap_AN";
    // /**
    //  * Pashto.
    //  */
    LocaleId[LocaleId["ps_AF"] = 1123] = "ps_AF";
    // /**
    //  * Farsi.
    //  */
    LocaleId[LocaleId["fa_IR"] = 1065] = "fa_IR";
    /**
     * Polish.
     */
    LocaleId[LocaleId["pl_PL"] = 1045] = "pl_PL";
    /**
     * Portuguese - Brazil.
     */
    LocaleId[LocaleId["pt_BR"] = 1046] = "pt_BR";
    /**
     * Portuguese - Portugal.
     */
    LocaleId[LocaleId["pt_PT"] = 2070] = "pt_PT";
    /**
     * Punjabi (India).
     */
    LocaleId[LocaleId["pa_IN"] = 1094] = "pa_IN";
    /**
     * Punjabi (Pakistan).
     */
    LocaleId[LocaleId["pa_PK"] = 2118] = "pa_PK";
    // /**
    //  * Quecha - Bolivia.
    //  */
    LocaleId[LocaleId["quz_BO"] = 1131] = "quz_BO";
    // /**
    //  * Quecha - Ecuador.
    //  */
    LocaleId[LocaleId["guz_EC"] = 2155] = "guz_EC";
    // /**
    //  * Quecha - Peru.
    //  */
    LocaleId[LocaleId["guz_PE"] = 3179] = "guz_PE";
    /**
     * Romanian.
     */
    LocaleId[LocaleId["ro_RO"] = 1048] = "ro_RO";
    // /**
    //  * Romanian - Moldava.
    //  */
    LocaleId[LocaleId["ro_MO"] = 2072] = "ro_MO";
    // /**
    //  * Rhaeto-Romanic.
    //  */
    LocaleId[LocaleId["rm_CH"] = 1047] = "rm_CH";
    /**
     * Russian.
     */
    LocaleId[LocaleId["ru_RU"] = 1049] = "ru_RU";
    // /**
    //  * Russian - Moldava.
    //  */
    LocaleId[LocaleId["ru_MO"] = 2073] = "ru_MO";
    // /**
    //  * Sami, Inari (Finland).
    //  */
    LocaleId[LocaleId["smn_FI"] = 9275] = "smn_FI";
    // /**
    //  * Sami, Lule (Norway).
    //  */
    LocaleId[LocaleId["smj_NO"] = 4155] = "smj_NO";
    // /**
    //  * Sami, Lule (Sweden).
    //  */
    LocaleId[LocaleId["smj_SE"] = 5179] = "smj_SE";
    // /**
    //  * Sami, Northern (Finland).
    //  */
    LocaleId[LocaleId["se_FI"] = 3131] = "se_FI";
    // /**
    //  * Sami (Lappish).
    //  */
    LocaleId[LocaleId["se_NO"] = 1083] = "se_NO";
    // /**
    //  * Sami, Northern (Sweden).
    //  */
    LocaleId[LocaleId["se_SE"] = 2107] = "se_SE";
    // /**
    //  * Sami, Skolt (Finland).
    //  */
    LocaleId[LocaleId["sms_FI"] = 8251] = "sms_FI";
    // /**
    //  * Sami, Southern (Norway).
    //  */
    LocaleId[LocaleId["sma_NO"] = 6203] = "sma_NO";
    // /**
    //  * Sami, Southern (Sweden).
    //  */
    LocaleId[LocaleId["sma_SE"] = 7227] = "sma_SE";
    /**
     * Sanskrit - India.
     */
    LocaleId[LocaleId["sa_IN"] = 1103] = "sa_IN";
    /**
     * Serbian (Cyrillic, Bosnia and Herzegovina).
     */
    LocaleId[LocaleId["sr_Cyrl_BA"] = 7194] = "sr_Cyrl_BA";
    /**
     * Serbian (Cyrillic).
     */
    LocaleId[LocaleId["sr_Cyrl_CS"] = 3098] = "sr_Cyrl_CS";
    /**
     * Serbian (Latin, Bosnia and Herzegovina).
     */
    LocaleId[LocaleId["sr_Latn_BA"] = 6170] = "sr_Latn_BA";
    /**
     * Serbian (Latin, Serbia and Montenegro (Former)).
     */
    LocaleId[LocaleId["sr_Latn_CS"] = 2074] = "sr_Latn_CS";
    /**
     * Serbian (Latin).
     */
    LocaleId[LocaleId["nso_ZA"] = 1132] = "nso_ZA";
    /**
     * Tswana.
     */
    LocaleId[LocaleId["tn_ZA"] = 1074] = "tn_ZA";
    /**
     * Sindhi - Pakistan.
     */
    LocaleId[LocaleId["sd_Arab_PK"] = 2137] = "sd_Arab_PK";
    /**
     * Sindhi - India.
     */
    LocaleId[LocaleId["sd_Deva_IN"] = 1113] = "sd_Deva_IN";
    // /**
    //  * Sinhalese - Sri Lanka.
    //  */
    LocaleId[LocaleId["si_LK"] = 1115] = "si_LK";
    /**
     * Slovak.
     */
    LocaleId[LocaleId["sk_SK"] = 1051] = "sk_SK";
    /**
     * Slovenian.
     */
    LocaleId[LocaleId["sl_SI"] = 1060] = "sl_SI";
    /**
     * Somali.
     */
    LocaleId[LocaleId["so_SO"] = 1143] = "so_SO";
    /**
     * Spanish - Argentina.
     */
    LocaleId[LocaleId["es_AR"] = 11274] = "es_AR";
    /**
     * Spanish - Bolivia.
     */
    LocaleId[LocaleId["es_BO"] = 16394] = "es_BO";
    /**
     * Spanish - Chile.
     */
    LocaleId[LocaleId["es_CL"] = 13322] = "es_CL";
    /**
     * Spanish - Colombia.
     */
    LocaleId[LocaleId["es_CO"] = 9226] = "es_CO";
    /**
     * Spanish - Costa Rica.
     */
    LocaleId[LocaleId["es_CR"] = 5130] = "es_CR";
    /**
     * Spanish - Dominican Republic.
     */
    LocaleId[LocaleId["es_DO"] = 7178] = "es_DO";
    /**
     * Spanish - Ecuador.
     */
    LocaleId[LocaleId["es_EC"] = 12298] = "es_EC";
    /**
     * Spanish - El Salvador.
     */
    LocaleId[LocaleId["es_SV"] = 17418] = "es_SV";
    /**
     * Spanish - Guatemala.
     */
    LocaleId[LocaleId["es_GT"] = 4106] = "es_GT";
    /**
     * Spanish - Honduras.
     */
    LocaleId[LocaleId["es_HN"] = 18442] = "es_HN";
    /**
     * Spanish - Mexico.
     */
    LocaleId[LocaleId["es_MX"] = 2058] = "es_MX";
    /**
     * Spanish - Nicaragua.
     */
    LocaleId[LocaleId["es_NI"] = 19466] = "es_NI";
    /**
     * Spanish - Panama.
     */
    LocaleId[LocaleId["es_PA"] = 6154] = "es_PA";
    /**
     * Spanish - Paraguay.
     */
    LocaleId[LocaleId["es_PY"] = 15370] = "es_PY";
    /**
     * Spanish - Peru.
     */
    LocaleId[LocaleId["es_PE"] = 10250] = "es_PE";
    /**
     * Spanish - Puerto Rico.
     */
    LocaleId[LocaleId["es_PR"] = 20490] = "es_PR";
    /**
     * Spanish - International Sort.
     */
    LocaleId[LocaleId["es_ES"] = 3082] = "es_ES";
    /**
     * Spanish - Spain (Traditional Sort).
     */
    LocaleId[LocaleId["es_ES_tradnl"] = 1034] = "es_ES_tradnl";
    /**
     * Spanish - United States.
     */
    LocaleId[LocaleId["es_US"] = 21514] = "es_US";
    /**
     * Spanish - Uruguay.
     */
    LocaleId[LocaleId["es_UY"] = 14346] = "es_UY";
    /**
     * Spanish - Venezuela.
     */
    LocaleId[LocaleId["es_VE"] = 8202] = "es_VE";
    // /**
    //  * Sutu.
    //  */
    LocaleId[LocaleId["st_ZA"] = 1072] = "st_ZA";
    /**
     * Swahili.
     */
    LocaleId[LocaleId["sw_KE"] = 1089] = "sw_KE";
    /**
     * Swedish - Finland.
     */
    LocaleId[LocaleId["sv_FI"] = 2077] = "sv_FI";
    /**
     * Swedish.
     */
    LocaleId[LocaleId["sv_SE"] = 1053] = "sv_SE";
    /**
     * Syriac.
     */
    LocaleId[LocaleId["syr_SY"] = 1114] = "syr_SY";
    // /**
    //  * Tajik.
    //  */
    LocaleId[LocaleId["tg_Cyrl_TJ"] = 1064] = "tg_Cyrl_TJ";
    // /**
    //  * Tamazight.
    //  */
    LocaleId[LocaleId["tzm_Arab_MA"] = 1119] = "tzm_Arab_MA";
    // /**
    //  * Tamazight (Latin).
    //  */
    LocaleId[LocaleId["tzm_Latn_DZ"] = 2143] = "tzm_Latn_DZ";
    /**
     * Tamil.
     */
    LocaleId[LocaleId["ta_IN"] = 1097] = "ta_IN";
    /**
     * Tatar.
     */
    LocaleId[LocaleId["tt_RU"] = 1092] = "tt_RU";
    /**
     * Telugu.
     */
    LocaleId[LocaleId["te_IN"] = 1098] = "te_IN";
    /**
     * Thai.
     */
    LocaleId[LocaleId["th_TH"] = 1054] = "th_TH";
    /**
     * Tibetan (PRC).
     */
    LocaleId[LocaleId["bo_CN"] = 1105] = "bo_CN";
    // /**
    //  * Tigrigna (Eritrea).
    //  */
    LocaleId[LocaleId["ti_ER"] = 2163] = "ti_ER";
    // /**
    //  * Tigrigna (Ethiopia).
    //  */
    LocaleId[LocaleId["ti_ET"] = 1139] = "ti_ET";
    // /**
    //  * Tsonga.
    //  */
    LocaleId[LocaleId["ts_ZA"] = 1073] = "ts_ZA";
    /**
     * Turkish.
     */
    LocaleId[LocaleId["tr_TR"] = 1055] = "tr_TR";
    // /**
    //  * Turkmen.
    //  */
    LocaleId[LocaleId["tk_TM"] = 1090] = "tk_TM";
    /**
     * Uighur - China.
     */
    LocaleId[LocaleId["ug_CN"] = 1152] = "ug_CN";
    /**
     * Ukrainian.
     */
    LocaleId[LocaleId["uk_UA"] = 1058] = "uk_UA";
    // /**
    //  * Sorbian.
    //  */
    LocaleId[LocaleId["hsb_DE"] = 1070] = "hsb_DE";
    /**
     * Urdu.
     */
    LocaleId[LocaleId["ur_PK"] = 1056] = "ur_PK";
    /**
     * Uzbek (Cyrillic).
     */
    LocaleId[LocaleId["uz_Cyrl_UZ"] = 2115] = "uz_Cyrl_UZ";
    /**
     * Uzbek (Latin).
     */
    LocaleId[LocaleId["uz_Latn_UZ"] = 1091] = "uz_Latn_UZ";
    // /**
    //  * Venda.
    //  */
    LocaleId[LocaleId["ve_ZA"] = 1075] = "ve_ZA";
    /**
     * Vietnamese.
     */
    LocaleId[LocaleId["vi_VN"] = 1066] = "vi_VN";
    /**
     * Welsh.
     */
    LocaleId[LocaleId["cy_GB"] = 1106] = "cy_GB";
    // /**
    //  * Wolof.
    //  */
    LocaleId[LocaleId["wo_SN"] = 1160] = "wo_SN";
    /**
     * Yakut.
     */
    LocaleId[LocaleId["sah_RU"] = 1157] = "sah_RU";
    /**
     * Yi.
     */
    LocaleId[LocaleId["ii_CN"] = 1144] = "ii_CN";
    /**
     * Yiddish.
     */
    LocaleId[LocaleId["yi_Hebr"] = 1085] = "yi_Hebr";
    /**
     * Yoruba.
     */
    LocaleId[LocaleId["yo_NG"] = 1130] = "yo_NG";
    /**
     * Japanese.
     */
    LocaleId[LocaleId["ja_JP"] = 1041] = "ja_JP";
})(LocaleId || (LocaleId = {}));
/**
 * Specifies the type of the Section break.
 */
export var SectionBreakType;
(function (SectionBreakType) {
    /**
     * Section break with the new section beginning on the next even-numbered page.
     */
    SectionBreakType["EvenPage"] = "EvenPage";
    /**
     * Section break with the new section beginning on the next page.
     */
    SectionBreakType["NewPage"] = "NewPage";
    /**
     * Section break with the new section beginning on the next line of the same page.
     */
    SectionBreakType["Continuous"] = "NoBreak";
    /**
     * Section break with the new section beginning on the next odd-numbered page.
     */
    SectionBreakType["OddPage"] = "OddPage";
})(SectionBreakType || (SectionBreakType = {}));
/**
 * For internal use only.
 *
 * @private
 */
export var CONTROL_CHARACTERS = {
    'Tab': '\t',
    'Paragraph': '\n',
    'LineBreak': '\v',
    'PageBreak': '\f',
    'ColumnBreak': '\u000e',
    'Image': '\u0011',
    'Table': '\u0012',
    'Row': '\u0013',
    'Cell': '\u0014',
    'Marker_Start': '\u0015',
    'Marker_End': '\u0016',
    'Field_Separator': '\u0017',
    'Section_Break': '\u0018'
};
