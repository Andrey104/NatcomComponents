import React from 'react';
import classNames from 'classnames/bind';

import FileField from '../../FileField/index';
import {BaseApi} from '../../../services/base';
import styles from './styles.scss';

let cx = classNames.bind(styles);

export default class extends React.Component {
    baseApi = new BaseApi();
    imagesUrls = [];
    productImages = [];

    componentWillMount(){
        this.imagesUrls = this.props.images;
        //this.productImages = this.props.images;
    }

    handleChangeProductImage = event => {
        let f = event.target.files[0];
        let fr = new FileReader();
        fr.onload = ev => {
            this.imagesUrls.push(ev.target.result);
            this.addImageOnServer(f);
        };
        fr.readAsDataURL(f);
    };

    addImageOnServer(file) {
        let formData = new FormData();
        formData.append('url', file);
        this.baseApi
            .post(`items/images/`, formData)
            .then(response => {
                // this.productImages.push({id: response.data.id, main: false});
                this.props.handleItemImages(this.productImages);
            });
    }

    addMainImage = (event, index) => {
        this.productImages = this.productImages.map(productImage => {
           if (this.productImages[index].image === productImage.image) {
               productImage.main = event.target.checked;
               return productImage;
           }
           productImage.main = false;
           return productImage;
        });
        this.props.handleItemImages(this.productImages);
    };

    deleteImage = index => {
        const deleteImgId = this.productImages[index].image;
        this.baseApi
            .deleteRequest(`items/images/${deleteImgId}/`)
            .then(() => {
                this.productImages = this.productImages.filter(image => (
                    image.image !== deleteImgId
                ));
                this.imagesUrls.splice(index, 1);
                console.log(this.productImages);
                console.log(this.imagesUrls);
                this.props.handleItemImages(this.productImages);
            });
    };

    getImages() {
        if (this.imagesUrls.length) {
            return this.imagesUrls.map((imageUrl, index) => {
                const uniqueKey = String(this.productImages[index]) + String(this.productImages[index]);
                return(
                    <div key={uniqueKey}
                         className="col-4">
                        <img className="col-12"
                             src={imageUrl}/>
                        <div className="form-group form-check">
                            <input type="checkbox"
                                   className="form-check-input"
                                   checked={this.productImages[index]}
                                   onChange={e => this.addMainImage(e, index)}
                                   id={imageUrl}/>
                            <label className="form-check-label"
                                   htmlFor={imageUrl}>Главная картинка</label>
                        </div>
                        <button type="button"
                                onClick={() => this.deleteImage(index)}
                                className="btn btn-danger btn-sm">Удалить
                        </button>
                    </div>
                )
            })
        }
    }

    render() {
        const images = this.getImages();
        return (
            <div className="row">
                <div className="col-10">
                    <FileField labelName={'изображение'}
                               changeField={this.handleChangeProductImage}/>
                </div>
                <div className={cx('col-12', 'img-container')}>
                    <div className="row">
                        {images}
                    </div>
                </div>
            </div>
        )
    }
}