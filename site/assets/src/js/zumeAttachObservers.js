import { DataWatcher } from "./DataWatcher"

export const zumeAttachObservers = () => {

    const collapseElements = document.querySelectorAll('.collapse')

    collapseElements.forEach((collapse) => {
        new DataWatcher( collapse, 'open', onDataChanged )
    })
    function onDataChanged(openState, oldOpenState) {
        if (openState === oldOpenState) {
            return
        }

        const open = openState === ''

        const node = this.node

        const height = node.scrollHeight
        const transitionDuration = '200'

        if (open) {
            node.style.height = height + 'px'
            node.style.transitionDuration = transitionDuration + 'ms'
            node.dataset.state = 'opening'

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
            }, transitionDuration);
        }

    }
}
