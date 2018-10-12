import React from 'react';

import '../styles.css';

export default class extends React.Component {
    render() {
        const {mainImage} = this.props;
        if (mainImage) {
            return (
                <img className="col-12"
                     src={mainImage.url}/>
            );
        } else {
            return <h3 className="no-image-text">Нет главного изображения</h3>
        }
    }
}