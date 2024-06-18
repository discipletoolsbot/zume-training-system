export class DataWatcher {
    constructor(node, dataName, changedCallback) {
        this.node = node
        this.dataName = dataName
        this.changedCallback = changedCallback
        this.observer = null
        this.lastDataState = node.classList.contains(this.dataName)

        this.init()
    }

    init() {
        this.observer = new MutationObserver(this.mutationCallback)
        this.observe()
    }

    observe() {
        this.observer.observe(this.node, { attributes: true })
    }

    disconnect() {
        this.observer.disconnect()
    }

    mutationCallback = mutationsList => {
        for(let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-'+this.dataName) {
                let currentDataState = mutation.target.dataset[this.dataName]
                this.changedCallback(currentDataState, this.lastDataState)
                this.lastDataState = currentDataState
            }
        }
    }
}