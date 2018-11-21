import InfiniteScroll from 'react-infinite-scroller';

class InfiniteScrollOverride extends InfiniteScroll {

    constructor(props) {
        super(props);
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