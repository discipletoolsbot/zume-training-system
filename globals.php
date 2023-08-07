<?php

if ( !function_exists( 'zume_mirror_url' ) ) {
    function zume_mirror_url() {
        return 'https://storage.googleapis.com/zume-file-mirror/';
    }
}
if ( !function_exists( 'zume_landing_page_post_id' ) ) {
    function zume_landing_page_post_id( int $number ): int {
        /**
         * These are the root post ids for the english page, which is used to find the translation page in the
         * polylang system.
         */
        $list = array(
            1 => 20730, // God uses ordinary people
            2 => 20731, // teach them to obey
            3 => 20732, // spiritual breathing
            4 => 20733, // soaps bible reading
            5 => 20735, // accountability groups
            6 => 20737, // consumers vs producers
            7 => 20738, // prayer cycle
            8 => 20739, // list of 100
            9 => 20740, // kingdom economy
            10 => 20741, // the gospel
            11 => 20742, // baptism
            12 => 20743, // 3-minute testimony
            13 => 20744, // greatest blessing
            14 => 20745, // duckling discipleship
            15 => 20746, // seeing where God's kingdom isn't
            16 => 20747, // the lord's supper
            17 => 20748, // prayer walking
            18 => 20750, // person of peace
            19 => 20749, // bless prayer
            20 => 20751, // faithfulness
            21 => 20752, // 3/3 group pattern
            22 => 20753, // training cycle
            23 => 20755, // leadership cells
            24 => 20756, // non-sequential
            25 => 20757, // pace
            26 => 20758, // part of two churches
            27 => 19848, // 3-month plan
            28 => 20759, // coaching checklist
            29 => 20760, // leadership in networks
            30 => 20761, // peer mentoring groups
            31 => 20762, // four fields tool
            32 => 20763, // generation mapping
            20730 => 1, // God uses ordinary people
            20731 => 2, // teach them to obey
            20732 => 3, // spiritual breathing
            20733 => 4, // soaps bible reading
            20735 => 5, // accountability groups
            20737 => 6, // consumers vs producers
            20738 => 7, // prayer cycle
            20739 => 8, // list of 100
            20740 => 9, // kingdom economy
            20741 => 10, // the gospel
            20742 => 11, // baptism
            20743 => 12, // 3-minute testimony
            20744 => 13, // greatest blessing
            20745 => 14, // duckling discipleship
            20746 => 15, // seeing where God's kingdom isn't
            20747 => 16, // the lord's supper
            20748 => 17, // prayer walking
            20750 => 18, // person of peace
            20749 => 19, // bless prayer
            20751 => 20, // faithfulness
            20752 => 21, // 3/3 group pattern
            20753 => 22, // training cycle
            20755 => 23, // leadership cells
            20756 => 24, // non-sequential
            20757 => 25, // pace
            20758 => 26, // part of two churches
            19848 => 27, // 3-month plan
            20759 => 28, // coaching checklist
            20760 => 29, // leadership in networks
            20761 => 30, // peer mentoring groups
            20762 => 31, // four fields tool
            20763 => 32, // generation mapping

        );

        return $list[$number] ?? 0;
    }
}
if ( !function_exists( 'zume_languages' ) ) {
    function zume_languages() {
        global $zume_languages;
        $zume_languages = array(
            array(
                'enDisplayName' => 'English',
                'code' => 'en',
                'locale' => 'en',
                'nativeName' => 'English',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Arabic',
                'code' => 'ar',
                'locale' => 'ar_LB',
                'nativeName' => 'العربية',
                'rtl' => true
            ),
            array(
                'enDisplayName' => 'Arabic (JO)',
                'code' => 'ar_jo',
                'locale' => 'ar_JO',
                'nativeName' => 'العربية - الأردن',
                'rtl' => true
            ),
            array(
                'enDisplayName' => 'American Sign Language',
                'code' => 'asl',
                'locale' => 'asl',
                'nativeName' => 'Sign Language',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Bhojpuri',
                'code' => 'bho',
                'locale' => 'bho',
                'nativeName' => 'भोजपुरी',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Bengali (India)',
                'code' => 'bn',
                'locale' => 'bn_IN',
                'nativeName' => 'বাংলা',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Bosnian',
                'code' => 'bs',
                'locale' => 'bs_BA',
                'nativeName' => 'Bosanski',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Cantonese (Traditional)',
                'code' => 'zhhk',
                'locale' => 'zh_HK',
                'nativeName' => '粵語 (繁體)',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Chinese (Simplified)',
                'code' => 'zhcn',
                'locale' => 'zh_CN',
                'nativeName' => '国语（简体)',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Chinese (Traditional)',
                'code' => 'zhtw',
                'locale' => 'zh_TW',
                'nativeName' => '國語（繁體)',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Croatian',
                'code' => 'hr',
                'locale' => 'hr',
                'nativeName' => 'Hrvatski',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Farsi/Persian',
                'code' => 'fa',
                'locale' => 'fa_IR',
                'nativeName' => 'فارسی',
                'rtl' => true
            ),
            array(
                'enDisplayName' => 'French',
                'code' => 'fr',
                'locale' => 'fr_FR',
                'nativeName' => 'Français',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'German',
                'code' => 'de',
                'locale' => 'de_DE',
                'nativeName' => 'Deutsch',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Gujarati',
                'code' => 'gu',
                'locale' => 'gu',
                'nativeName' => 'ગુજરાતી',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Hausa',
                'code' => 'ha',
                'locale' => 'ha_NG',
                'nativeName' => 'Hausa',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Hindi',
                'code' => 'hi',
                'locale' => 'hi_IN',
                'nativeName' => 'हिन्दी',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Indonesian',
                'code' => 'id',
                'locale' => 'id_ID',
                'nativeName' => 'Bahasa Indonesia',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Italian',
                'code' => 'it',
                'locale' => 'it_IT',
                'nativeName' => 'Italiano',
                'rtl' => false
            ),

            array(
                'enDisplayName' => 'Kannada',
                'code' => 'kn',
                'locale' => 'kn',
                'nativeName' => 'ಕನ್ನಡ',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Korean',
                'code' => 'ko',
                'locale' => 'ko_KR',
                'nativeName' => '한국어',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Kurdish',
                'code' => 'ku',
                'locale' => 'ku',
                'nativeName' => 'کوردی',
                'rtl' => true
            ),
            array(
                'enDisplayName' => 'Lao',
                'code' => 'lo',
                'locale' => 'lo',
                'nativeName' => 'ພາສາລາວ',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Maithili',
                'code' => 'mai',
                'locale' => 'mai',
                'nativeName' => '𑒧𑒻𑒟𑒱𑒪𑒲',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Marathi',
                'code' => 'mr',
                'locale' => 'mr',
                'nativeName' => 'मराठी',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Malayalam',
                'code' => 'ml',
                'locale' => 'ml',
                'nativeName' => 'മലയാളം',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Nepali',
                'code' => 'ne',
                'locale' => 'ne_NP',
                'nativeName' => 'नेपाली',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Oriya',
                'code' => 'or',
                'locale' => 'or_IN',
                'nativeName' => 'ଓଡ଼ିଆ',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Punjabi',
                'code' => 'pa',
                'locale' => 'pa_IN',
                'nativeName' => 'ਪੰਜਾਬੀ',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Portuguese',
                'code' => 'pt',
                'locale' => 'pt_PT',
                'nativeName' => 'Português',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Russian',
                'code' => 'ru',
                'locale' => 'ru_RU',
                'nativeName' => 'Русский',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Romanian',
                'code' => 'ro',
                'locale' => 'ro_RO',
                'nativeName' => 'Română',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Slovenian',
                'code' => 'sl',
                'locale' => 'sl_Sl',
                'nativeName' => 'Slovenščina',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Spanish',
                'code' => 'es',
                'locale' => 'es',
                'nativeName' => 'Español',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Somali',
                'code' => 'so',
                'locale' => 'so',
                'nativeName' => 'Soomaali',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Swahili',
                'code' => 'swa',
                'locale' => 'swa',
                'nativeName' => 'Kiswahili',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Tamil',
                'code' => 'ta',
                'locale' => 'ta_IN',
                'nativeName' => 'தமிழ்',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Telugu',
                'code' => 'te',
                'locale' => 'te',
                'nativeName' => 'తెలుగు',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Thai',
                'code' => 'th',
                'locale' => 'th',
                'nativeName' => 'ไทย',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Turkish',
                'code' => 'tr',
                'locale' => 'tr_TR',
                'nativeName' => 'Türkçe',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Urdu',
                'code' => 'ur',
                'locale' => 'ur',
                'nativeName' => 'اردو',
                'rtl' => true
            ),
            array(
                'enDisplayName' => 'Vietnamese',
                'code' => 'vi',
                'locale' => 'vi',
                'nativeName' => 'Tiếng Việt',
                'rtl' => false
            ),
            array(
                'enDisplayName' => 'Yoruba',
                'code' => 'yo',
                'locale' => 'yo',
                'nativeName' => 'Yorùbá',
                'rtl' => false
            )
        );
    }
}
