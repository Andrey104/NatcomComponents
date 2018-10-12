import React from 'react';

import '../styles.css';

export default class extends React.Component {

    getImages() {
        const {images} = this.props;
        if (images.length) {
            return images.map(image => {
                return (
                    <div className="col-4"
                         key={image.id}>
                        <img className="col-12"
                             src={image.url}/>
                    </div>
                )
            })
        } else {
            return <h3 className="no-image-text">Изображения отсутствуют</h3>;
        }
    }

    render() {
        return (
            <div className="col-12">
                <div className="row">
                    {this.getImages()}
                </div>
            </div>
        )
    }
}