import React from 'react';
import {connect} from 'react-redux';

import Loader from '../../../components/Loader';
import HarpoonName from '../../../components/HarpoonName';
import HarpoonMaterials from './HarpoonMaterials';
import {priceFormat, harpoonStatuses, countFormat} from '../../../services/utils';
import {getHarpoon} from '../../../AC/harpoons';
import history from '../../../history';

class HarpoonDetail extends React.Component {
    urlId;
    harpoon;

    componentWillMount = () => {
        this.urlId = Number(this.props.match.params.harpoonId);
        this.props.getHarpoon(this.urlId);
    };

    handleEditHarpoon = () => history.push(`/harpoons/${this.urlId}/edit`);

    getFiles() {
        return this.harpoon.files.map(file => {
            const arr = file.file.split('/');
            const fileName = arr[arr.length - 1];
            return (
                <div key={file.id}>
                        <span><a href={file.file}
                                 target="_blank"
                                 download>{fileName}</a></span>
                </div>
            );
        });
    }

    getFilesInfo() {
        if (this.harpoon.files.length) {
            return (
                <div>
                    <h5>Файлы, прикрепленные к гарпуну</h5>
                    {this.getFiles()}
                </div>
            )
        }
    }

    getHarpoonTable() {
        return (
            <table className="table table-bordered">
                <thead className="thead-light">
                <tr>
                    <th scope="col">Название</th>
                    <th scope="col">Склад</th>
                    <th scope="col">Гарпунный товар</th>
                    <th scope="col">Количество гарпуна</th>
                    <th scope="col">Цена</th>
                    <th scope="col">Статус</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <HarpoonName harpoon={this.harpoon}/>
                    <td>{this.harpoon.name}</td>
                    <td>{this.harpoon.harpoon_product.name}</td>
                    <td>{countFormat(this.harpoon.harpoon_count)}</td>
                    <td>{priceFormat(this.harpoon.sum)}</td>
                    <td>{harpoonStatuses[this.harpoon.status]}</td>
                </tr>
                </tbody>
            </table>
        )
    }

    getComment() {
        if (this.harpoon.comment) {
            return (
                <div>
                    <h5>Комментарий к гарпуну:</h5>
                    <div>{this.harpoon.comment}</div>
                </div>
            )
        }
    }

    getEditButton() {
        if (this.harpoon.status === 0) {
            return (
                <button type="button"
                        onClick={this.handleEditHarpoon}
                        className="btn btn-primary btn-sm">Редактировать
                </button>
            )
        }
    }

    render() {
        const {harpoon} = this.props;
        this.harpoon = harpoon;
        if (harpoon.id !== this.urlId) {
            return (
                <div>
                    <Loader/>
                </div>
            );
        }
        return (
            <div className="col-12">
                <h5>Гарпун</h5>
                {this.getHarpoonTable()}
                <HarpoonMaterials harpoon={harpoon}/>
                {this.getFilesInfo()}
                {this.getComment()}
                <div className="col-12 text-right">
                    {this.getEditButton()}
                    <button type="button"
                            onClick={() => history.push(`/orders/${harpoon.order}`)}
                            className="btn btn-success btn-sm">Заказ
                    </button>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    harpoon: state.harpoons.harpoon,
}), {getHarpoon})(HarpoonDetail);