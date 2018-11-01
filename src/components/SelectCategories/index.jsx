import React from 'react';

export default class extends React.Component {
    category;
    categories = [];
    defaultSubcategory;

    constructor(props) {
        super(props);
        const {categories, defaultCategory, defaultSubcategory} = this.props;
        this.categories = categories;
        this.category = categories[0].id;
        if (defaultCategory) this.category = defaultCategory;
        if (defaultSubcategory) this.defaultSubcategory = defaultSubcategory;
    }

    selectCategory = event => {
        this.category = event.target.value;
        this.props.selectCategory(this.category);
    };

    selectSubcategory = event => this.props.selectSubcategory(event.target.value);

    render() {
        const {subcategories} = this.props;
        let subs = null;
        if (subcategories.length && Number(this.category) !== -1) {
            subs = (
                <div>
                    <label>Подкатегория</label>
                    <select className="form-control"
                            onChange={this.selectSubcategory}
                            defaultValue={this.defaultSubcategory || subcategories[0].id}>
                        {subcategories.map(subcategory => (
                            <option value={subcategory.id}
                                    key={subcategory.id}>{subcategory.name}</option>
                        ))}
                    </select>
                </div>
            )
        }
        return (
            <div className="row">
                <div className="col-md-6 mb-3 form-group">
                    <label>Категория</label>
                    <select className="form-control"
                            onChange={this.selectCategory}
                            defaultValue={this.category}>
                        {this.categories.map(category => (
                            <option value={category.id}
                                    key={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-6 mb-3 form-group">
                    {subs}
                </div>
            </div>
        )
    }
}