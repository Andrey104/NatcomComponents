import InfiniteScroll from 'react-infinite-scroller';

class InfiniteScrollOverride extends InfiniteScroll {

    constructor() {
        super();
        this.element = document.getElementById('mainContent')
    }

    getParentElement(el) {
        const {isDialog} = this.props;
        if (this.element && !isDialog) {
            return this.element;
        }
        return super.getParentElement(el);
    }

    render() {
        return super.render();
    }
}

export default InfiniteScrollOverride;