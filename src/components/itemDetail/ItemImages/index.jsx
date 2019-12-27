import React from 'react';

import '../styles.css';

export default class extends React.Component {

    state = {
        f_image: 0
    };

    getImages() {
        const {images, openImage} = this.props;
        if (images) {
            let firstImages = images.slice(this.state.f_image, this.state.f_image + 2);
            return firstImages.map(image => {
                return (
                    <div onClick={() => openImage(image.url)} className="item-image" key={image.id}>
                        <img className="col-12"
                             src={image.url}/>
                    </div>
                )
            })
        } else {
            return <h3 className="no-image-text">Изображения отсутствуют</h3>;
        }
    }

    nextSlide = event => {
        event.preventDefault();
        const {images} = this.props;
        this.state.f_image + 2 >= images.length ? this.setState({f_image: 0}) :
            this.setState({f_image: this.state.f_image + 2});
    };

    previewSlide = event => {
        event.preventDefault();
        let divideStock;
        const {images} = this.props;
        images.length % 2 === 0 ? divideStock = 2 : divideStock = images.length % 2;
        this.state.f_image === 0 ? this.setState({f_image: images.length - divideStock}) :
            this.setState({f_image: this.state.f_image - 2});
    };

    render() {
        return (
            <div className="item-images-container">
                <div className="arrow left" onClick={this.previewSlide} />
                <div className="images-container">{this.getImages()}</div>
                <div className="arrow right" onClick={this.nextSlide} />
            </div>
        )
    }
}