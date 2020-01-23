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

    constructor(props) {
        super(props);
        this.state = {
            imagesUrls: [],
            productImages: []
        };
    }

    updateState() {
        this.setState({
            imagesUrls: this.imagesUrls,
            productImages: this.productImages
        });
    }

    componentWillMount(){
        if (this.props.images){
            this.imagesUrls = this.props.images.map(img => {
                return img.url;
            });
            this.productImages = this.props.images;
            this.updateState();
        }
    }

    handleChangeProductImage = event => {
        let f = event.target.files[0];
        let fr = new FileReader();
        fr.onload = ev => {
            this.imagesUrls.push(ev.target.result);
            this.updateState();
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
                this.productImages.push({id: response.data.id, main: false, url: response.data.url});
                this.updateState();
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
        this.updateState();
        this.props.handleItemImages(this.productImages);
    };

    deleteImage = index => {
        const deleteImgId = this.productImages[index].id;
        this.baseApi
            .deleteRequest(`items/images/${deleteImgId}/`)
            .then(() => {
                this.productImages = this.productImages.filter(image => (
                    image.id !== deleteImgId
                ));
                this.imagesUrls.splice(index, 1);
                this.updateState();
                this.props.handleItemImages(this.productImages);
            });
    };

    getImages() {
        //console.log('getImages productImages', this.productImages);
        if (this.state.productImages.length) {
            return this.state.productImages.map((img, index) => {
                const uniqueKey = String(img.id) + String(img.url);
                return(
                    <div key={uniqueKey}
                         className="col-4">
                        <img className="col-12"
                             src={img.url}/>
                        <div className="form-group form-check">
                            <input type="radio"
                                   className="form-check-input"
                                   // checked={this.state.productImages[index]}
                                   value={uniqueKey}
                                   onChange={e => this.addMainImage(e, index)}
                                   id={img}/>
                            <label className="form-check-label"
                                   htmlFor={img}>Главная картинка</label>
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