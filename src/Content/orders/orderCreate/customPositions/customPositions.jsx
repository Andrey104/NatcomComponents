import React from 'react';
import CustomPositionsList from './CustomPositionsList';
import EditCustomPositionModal from './EditCustomPositionModal';
import PropTypes from 'prop-types';


/**
 * Free Positions in create order Component
 * **/
class CustomPositions extends React.Component {

    static propTypes = {
        customPositions: PropTypes.object,
        update: PropTypes.func
    };

    resultPrice = 0;

    componentDidMount() {
        this.getResultPrice();
    }


    getResultPrice() {
        this.resultPrice = 0;
        if (this.props.customPositions) {
            for(const position of this.props.customPositions) {
                this.resultPrice += position.price * position.count;
            }
        }
    };


    handleChangePrice = (event, index) => {
        let customPositions = this.props.customPositions;
        var inputValue = (event.target.value);
        inputValue.replace(',', '.');
        customPositions[index].price = Number(inputValue);
        this.props.update(customPositions);
        this.getResultPrice();
    };

    handleChangeCount = (event, index) => {
        let customPositions = this.props.customPositions;
        var inputValue = (event.target.value);
        inputValue.replace(',', '.');
        customPositions[index].count = Number(inputValue);
        this.props.update(customPositions);
        this.getResultPrice();
    };

    handleChangeUnit = (event, index) => {
        let customPositions = this.props.customPositions;
        var inputValue = (event.target.value);
        inputValue.replace(',', '.');
        customPositions[index].unit = Number(inputValue);
        this.props.update(customPositions);
        this.getResultPrice();
    };

    editCustomPosition = (event, index) => {
        let customPositions = this.props.customPositions;
        customPositions[index].name = (event.target.value);
        this.props.update(customPositions);
    };


    removeCustomPositionFromList = (customPosition, index_list) => {
        let customPositions = this.props.customPositions;
        customPositions = customPositions.filter((position, index) =>
            !((position.name === customPosition.name)&&(index === index_list)));
        this.props.update(customPositions);
    };



    createCustomPosition = () => {
        let freePositions = this.props.customPositions;
        freePositions.push({
            name: "",
            price: 0,
            count: 0,
            unit: 0
        });
        this.props.update(freePositions);
    };


    getCustomPositionsList() {
        const {customPositions} = this.props;
            return (
                <div>
                    <CustomPositionsList positions={customPositions}
                                         positionsResultPrice={this.resultPrice}
                                         removePositionFromList={this.removeCustomPositionFromList}
                                         editPosition={this.editCustomPosition}
                                         changePositionPrice={this.handleChangePrice}
                                         changePositionCount={this.handleChangeCount}
                                         changePositionUnit={this.handleChangeUnit}/>
                    <div className="">
                        <button type="button"
                                onClick={this.createCustomPosition}
                                className="btn btn-primary btn-sm">Добавить позицию
                        </button>
                    </div>
                </div>
            );
    }

    render() {
        return (
            <div className="col-12">
                {this.getCustomPositionsList()}
            </div>
        )
    }

}

export default CustomPositions;