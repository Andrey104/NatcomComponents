import React from 'react';
import {connect} from 'react-redux';

import Loader from '../../../components/Loader';
import MembraneDescription from './MembraneDescription';
import MainImage from '../../../components/itemDetail/MainImage';
import ItemStocks from '../../../components/itemDetail/ItemStocks';
import ItemImages from '../../../components/itemDetail/ItemImages';
import {getMembrane} from '../../../AC/membranes';

class MembraneDetail extends React.Component {
    urlId;

    componentWillMount = () => {
        this.urlId = this.props.match.params.membraneId;
        this.props.getMembrane(this.urlId);
    };


    render() {
        const {membrane} = this.props;
        if (membrane.id !== Number(this.urlId)) {
            return (
                <div className="pre-loader-container">
                    <Loader/>
                </div>
            );
        }
        return (
            <div className="col-12">
                <div className="row">
                    <div className="col-8">
                        <MembraneDescription membrane={membrane}/>
                    </div>
                    <div className="col-4">
                        <MainImage mainImage={membrane.main_image}/>
                    </div>
                </div>
                <div className="row">
                    <ItemStocks stocks={membrane.stocks}/>
                </div>
                <div className="row">
                    <ItemImages images={membrane.images}/>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    membrane: state.membranes.membrane,
}), {getMembrane})(MembraneDetail);