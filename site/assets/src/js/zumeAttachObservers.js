import { DataWatcher } from "./DataWatcher"

const dataWatchers = {}

export const zumeDetachObservers = (id) => {
    delete dataWatchers[id]
}

export const zumeAttachObservers = (element, id) => {
    const collapseElements = element.querySelectorAll('.zume-collapse')

    if (!Object.prototype.hasOwnProperty.call(dataWatchers, id) || dataWatchers[id].length === 0) {
        dataWatchers[id] = []
        collapseElements.forEach((collapse) => {
            const expandWatcher = new DataWatcher( collapse, 'expand', onDataChanged )
            dataWatchers[id].push(expandWatcher)
        })
    }
    function onDataChanged(openState, oldOpenState) {
        if (openState === oldOpenState) {
            return
        }

        const open = openState === ''

        const node = this.node

        const height = node.scrollHeight
        const transitionDuration = '200'

        if (open) {
            node.style.display = 'block'
            node.style.transitionDuration = transitionDuration + 'ms'
            node.dataset.state = 'opening'

            setTimeout(() => {
                node.style.height = node.scrollHeight + 'px'
            }, 10)

            setTimeout(() => {
                node.style.height = 'auto'
                node.dataset.state = 'open'
            }, transitionDuration);
        } else {
            /* Add back the height so we can transition back to 0 */
            node.style.height = height + 'px'
            node.dataset.state = 'closing'

            /* Set the height to 0 after this function has finished so that we key the transition correctly */
            setTimeout(() => {
                node.style.height = '0'
            }, 10)
            setTimeout(() => {
                node.dataset.state = 'closed'
                node.style.display = 'none'
            }, transitionDuration);
        }

    }
}
