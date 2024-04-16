<?php

require_once('translator-magic-url.php');
if ( dt_is_rest() ) {
    require_once('translator-api.php');
}



/*

$global_languages_list = [
    'en' => [ 'label' => 'English', 'native_name' => 'English', 'flag' => '🇺🇸', 'rtl' => false ],
    'am' => [ 'label' => 'Amharic', 'native_name' => 'አማርኛ (AmarəÑña)', 'flag' => '🇪🇹', 'rtl' => false ],
    'ar' => [ 'label' => 'Arabic', 'native_name' => 'العربية', 'flag' => '🇦🇪', 'rtl' => true ],
    'ar_jo' => [ 'label' => 'Arabic (Jordan)', 'native_name' => 'اللهجة الأردنية', 'flag' => '🇯🇴', 'rtl' => true ],
    'ar_tn' => [ 'label' => 'Arabic (Tunisian)', 'native_name' => 'اللهجة الأردنية', 'flag' => '🇯🇴', 'rtl' => true ],
    'ar_ma' => [ 'label' => 'Arabic (Moroccan)', 'native_name' => 'اللهجة الأردنية', 'flag' => '🇯🇴', 'rtl' => true ],
    'hy' => [ 'label' => 'Armenian', 'native_name' => 'Հայերեն', 'flag' => '🇦🇲', 'rtl' => false ],
    'az' => [ 'label' => 'Azerbaijani', 'native_name' => 'Azərbaycanca', 'flag' => '🇦🇿', 'rtl' => false ],
    'asl' => [ 'label' => 'American Sign Language', 'native_name' => 'American Sign Language', 'flag' => '🇺🇸', 'rtl' => false ],
    'bn' => [ 'label' => 'Bengali', 'native_name' => 'বাংলা', 'flag' => '🇮🇳', 'rtl' => false ],
    'bho' => [ 'label' => 'Bhojpuri', 'native_name' => 'भोजपुरी', 'flag' => '🇮🇳', 'rtl' => false ],
    'bs' => [ 'label' => 'Bosnian', 'native_name' => 'Bosanski', 'flag' => '🇧🇦', 'rtl' => false ],
    'bg' => [ 'label' => 'Bulgarian', 'native_name' => 'Български', 'flag' => '🇧🇬', 'rtl' => false ],
    'my' => [ 'label' => 'Burmese', 'native_name' => 'မြန်မာ', 'flag' => '🇲🇲', 'rtl' => false ],
    'zhhk' => [ 'label' => 'Cantonese (Traditional)', 'native_name' => '粵語 (繁體))', 'flag' => '🇨🇳', 'rtl' => false ],
    'zhcn' => [ 'label' => 'Chinese (Simplified)', 'native_name' => '中文简体 (简化的汉，中国)', 'flag' => '🇨🇳', 'rtl' => false ],
    'zhtw' => [ 'label' => 'Chinese (Traditional)', 'native_name' => '國語（繁體)', 'flag' => '🇨🇳', 'rtl' => false ],
    'hr' => [ 'label' => 'Croatian', 'native_name' => 'Hrvatski', 'flag' => '🇭🇷', 'rtl' => false ],
    'fo' => [ 'label' => 'Faroese', 'native_name' => 'Føroyskt', 'flag' => '🇫🇴', 'rtl' => false ],
    'fr' => [ 'label' => 'French', 'native_name' => 'Français', 'flag' => '🇫🇷', 'rtl' => false ],
    'de' => [ 'label' => 'German', 'native_name' => 'Deutsch', 'flag' => '🇩🇪', 'rtl' => false ],
    'gu' => [ 'label' => 'Gujarati', 'native_name' => 'ગુજરાતી', 'flag' => '🇮🇳', 'rtl' => false ],
    'ha' => [ 'label' => 'Hausa', 'native_name' => 'هَرْشَن هَوْسَ', 'flag' => '🇳🇬', 'rtl' => true ],
    'hi' => [ 'label' => 'Hindi', 'native_name' => 'हिन्दी', 'flag' => '🇮🇳', 'rtl' => false ],
    'id' => [ 'label' => 'Indonesian', 'native_name' => 'Bahasa Indonesia', 'flag' => '🇮🇩', 'rtl' => false ],
    'it' => [ 'label' => 'Italian', 'native_name' => 'Italiano', 'flag' => '🇮🇹', 'rtl' => false ],
    'ja' => [ 'label' => 'Japanese', 'native_name' => '日本語', 'flag' => '🇯🇵', 'rtl' => false ],
    'kn' => [ 'label' => 'Kannada', 'native_name' => 'ಕನ್ನಡ', 'flag' => '🇮🇳', 'rtl' => false ],
    'ko' => [ 'label' => 'Korean', 'native_name' => '한국어', 'flag' => '🇰🇷', 'rtl' => false ],
    'ku' => [ 'label' => 'Kurdish', 'native_name' => 'کورمانجی', 'flag' => '🏳️', 'rtl' => true, ],
    'lo' => [ 'label' => 'Lao', 'native_name' => 'ภาษาไทย', 'flag' => '🇹🇭', 'rtl' => false ],
    'lv' => [ 'label' => 'Latvian', 'native_name' => 'Latviešu', 'flag' => '🇱🇻', 'rtl' => false ],
    'mai' => [ 'label' => 'Maithili', 'native_name' => '𑒧𑒻𑒟𑒱𑒪𑒲', 'flag' => '🇹🇭', 'rtl' => false ],
    'ml' => [ 'label' => 'Malayalam', 'native_name' => 'മലയാളം', 'flag' => '🇮🇳', 'rtl' => false ],
    'mr' => [ 'label' => 'Marathi', 'native_name' => 'मराठी', 'flag' => '🇮🇳', 'rtl' => false ],
    'mn' => [ 'label' => 'Mongolian', 'native_name' => 'Монгол хэл', 'flag' => '🇲🇳', 'rtl' => false ],
    'ne' => [ 'label' => 'Nepali', 'native_name' => 'नेपाली', 'flag' => '🇳🇵', 'rtl' => false ],
    'or' => [ 'label' => 'Oriya', 'native_name' => 'ଓଡ଼ିଆ', 'flag' => '🇮🇳', 'rtl' => false ],
    'fa' => [ 'label' => 'Persian', 'native_name' => 'فارسی (Fārsi)', 'flag' => '🇮🇷', 'rtl' => true ],
    'pl' => [ 'label' => 'Polish', 'native_name' => 'Polski', 'flag' => '🇵🇱', 'rtl' => false ],
    'pt' => [ 'label' => 'Portuguese', 'native_name' => 'Português', 'flag' => '🇧🇷', 'rtl' => false ],
    'pa' => [ 'label' => 'Punjabi', 'native_name' => 'ਪੰਜਾਬੀ', 'flag' => '🇮🇳', 'rtl' => true ],
    'pa_pk' => [ 'label' => 'Punjabi (Pakistan)', 'native_name' => 'پنجابی', 'flag' => '🇵🇰', 'rtl' => true ],
    'ro' => [ 'label' => 'Romanian', 'native_name' => 'Română', 'flag' => '🇷🇴', 'rtl' => false ],
    'ru' => [ 'label' => 'Russian', 'native_name' => 'Русский Язык', 'flag' => '🇷🇺', 'rtl' => false ],
    'sl' => [ 'label' => 'Slovenian', 'native_name' => 'Slovenščina', 'flag' => '🇸🇮', 'rtl' => false ],
    'so' => [ 'label' => 'Somali', 'native_name' => 'Af Soomaali', 'flag' => '🇸🇴', 'rtl' => false ],
    'es' => [ 'label' => 'Spanish', 'native_name' => 'Español', 'flag' => '🇪🇸', 'rtl' => false ],
    'es_es' => [ 'label' => 'Spanish (Spain)', 'native_name' => 'Español (Español)', 'flag' => '🇪🇸', 'rtl' => false ],
    'swa' => [ 'label' => 'Swahili', 'native_name' => '𐒖wahili', 'flag' => '🇪🇹', 'rtl' => false ],
    'ta' => [ 'label' => 'Tamil', 'native_name' => 'தமிழ்', 'flag' => '🇮🇳', 'rtl' => false ],
    'te' => [ 'label' => 'Telugu', 'native_name' => 'తెలుగు', 'flag' => '🇮🇳', 'rtl' => false ],
    'th' => [ 'label' => 'Thai', 'native_name' => 'ภาษาไทย', 'flag' => '🇹🇭', 'rtl' => false ],
    'tr' => [ 'label' => 'Turkish', 'native_name' => 'Türkçe', 'flag' => '🇹🇷', 'rtl' => false ],
    'uk' => [ 'label' => 'Ukrainian', 'native_name' => 'Українська', 'flag' => '🇺🇦', 'rtl' => false ],
    'ur' => [ 'label' => 'Urdu', 'native_name' => 'اُردُو', 'flag' => '🇵🇰', 'rtl' => true ],
    'vi' => [ 'label' => 'Vietlabelse', 'native_name' => 'OʻZbekcha, OʻZbek Tili,', 'flag' => '🇻🇳', 'rtl' => false ],
    'yo' => [ 'label' => 'Yoruba', 'native_name' => 'Èdè Yorùbá', 'flag' => '🇳🇬', 'rtl' => false ],
];
update_option( 'dt_working_languages', $global_languages_list, false );
dt_write_log( 'Global languages list updated' );

*/

