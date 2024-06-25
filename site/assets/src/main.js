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
            const zumeLocale = result.value || 'en'

            let locale = zumeLocale
            if (zumeLocale.includes('_')) {
                /* DateTime locales should only have - not _ */
                locale = zumeLocale.replace('_', '-')
            } else if (zumeLocale.length === 4) {
                /* chinese locales should be e.g zh-cn not zhcn */
                locale = zumeLocale.slice(0,2) + '-' + zumeLocale.slice(2)
            }

            Settings.defaultLocale = locale
        })

        const videoPlayers = document.querySelectorAll('.video-player')
        videoPlayers.forEach((videoPlayer) => {
            const videoSrc = videoPlayer.getAttribute('data-video-src')
            const iframe = videoPlayer.querySelector('iframe')
            const videoTrigger = videoPlayer.querySelector('.video-trigger')

            if (!videoTrigger || !iframe || !videoSrc) {
                console.log('.video-player is missing something (.video-trigger || iframe || data-video-src)')
                return
            }

            videoTrigger.addEventListener('click', loadVideo)
            function loadVideo(event) {
                iframe.src = videoSrc
                videoTrigger.style.display = 'none'
            }
        })
})