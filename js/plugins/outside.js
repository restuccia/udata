export function install(Vue) {

    // handler(e) {
    //
    // }

    /**
     * Handle click outside current component
     */
    Vue.directive('outside', {
        acceptStatement: true,
        /**
         * Attach a global click handler
         * and prevent bubbling click event
         */
        bind(el, binding) {
            console.log(el, binding);
            this.handler = this.handleClickOutside.bind(this);
            document.addEventListener('click', this.handler);
            this.el.addEventListener('click', this.prevent);
        },
        /**
         * Store the callback given as parameter
         */
        update(func) {
            this.callback = func;
        },
        /**
         * Remove event listeners
         */
        unbind(el, binding) {
            document.removeEventListener('click', this.handler);
            this.el.removeEventListener('click', this.prevent);
        },
        /**
         * Pass click event to callback
         */
        handleClickOutside(e) {
            this.callback(e);
        },
        /**
         * Stop event propagation
         */
        prevent(e) {
            e.stopPropagation();
        }
    });
}
