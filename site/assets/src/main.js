import './scss/styles.scss'

import './js/DataWatcher'
import './js/zumeAttachObservers'
import './js/zumeRequest'
import './js/ZumeStorage'

import './components/wizard/index'
import './components/dashboard/index'
import './components/presenter/index'
import './components/activities/index'

import './components/play-button'
import './components/share-links'
import './components/share-list'
import './components/public-trainings'
import './components/progress-circle'
import './components/host-progress-circle'
import './components/calendar-select'
import './components/calendar-list'
import './components/progress-slider'

import { Settings } from 'luxon'

jQuery(document).ready(() => {
    cookieStore.get('zume_language')
        .then((result) => {
            Settings.defaultLocale = result.value || 'en'
        })
})