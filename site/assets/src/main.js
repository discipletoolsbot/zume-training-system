import './scss/styles.scss'

import './js/Base64'
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
    const cookies = document.cookie ? Object.fromEntries(document.cookie.split(';').map((cookie) => cookie.trim().split('='))) : {}
    const zumeLocale = cookies.zume_language || 'en'

    let locale = zumeLocale
    if (zumeLocale.includes('_')) {
        /* DateTime locales should only have - not _ */
        locale = zumeLocale.replace('_', '-')
    } else if (zumeLocale.length === 4) {
        /* chinese locales should be e.g zh-cn not zhcn */
        locale = zumeLocale.slice(0,2) + '-' + zumeLocale.slice(2)
    }

    Settings.defaultLocale = locale

    const videoPlayers = document.querySelectorAll('.video-player')
    videoPlayers.forEach((videoPlayer) => {
        const videoSrc = videoPlayer.getAttribute('data-video-src')
        const iframe = videoPlayer.querySelector('iframe')
        const videoTrigger = videoPlayer.querySelector('.video-trigger')

        if (!videoTrigger || !iframe || !videoSrc) {
            console.log('.video-player is missing something (.video-trigger || iframe || data-video-src)')
            return
        }

        /* Refresh the iframe so it doesn't interfere with the history of the page once the src is added */
        const refreshedIframe = iframe.cloneNode()
        iframe.parentNode.insertBefore(refreshedIframe, iframe)
        iframe.remove()

        videoTrigger.addEventListener('click', loadVideo)
        function loadVideo(event) {
            console.log(event, videoSrc)
            refreshedIframe.src = videoSrc
            videoTrigger.style.display = 'none'
        }
    })
})


/**
* Lodash escape all string values in a simple key, value object.
*
* @param obj Must be a simple map of key, value pairs. E.g. a translation mapping.
*/
export function escapeObject(obj) {
    return Object.fromEntries(
        Object.entries(obj)
            .map(([key, value]) => {
                return [key, escapeHTML(value)]
            })
    )
}
export function escapeHTML(str) {
    if (typeof str === 'undefined') {
        return ''
    }
    if (typeof str !== 'string') {
        return str
    }
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
}
export function setCookie(cname, cvalue, path = '', exdays = 0) {
    let cookie = `${cname}=${cvalue};`;
    if (Number.isInteger(exdays) && exdays > 0) {
        var d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        cookie += 'expires=' + d.toUTCString() + ';';
    }
    if (path) {
        let newPath = window.location.pathname.split(path)[0] + path;
        newPath = newPath.replace(/^\/?([^\/]+(?:\/[^\/]+)*)\/?$/, '/$1'); // add leading and remove trailing slashes
        cookie += 'path=' + newPath + ';';
    }
    document.cookie = cookie;
}

window.zumeApiShare.escapeObject = escapeObject
window.zumeApiShare.escapeHTML = escapeHTML
window.zumeApiShare.setCookie = setCookie
