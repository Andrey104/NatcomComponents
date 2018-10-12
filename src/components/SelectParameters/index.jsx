import React from 'react';

export default class extends React.Component {
    colors = [];
    textures = [];
    defaultColor;
    defaultTexture;

    constructor(props) {
        super(props);
        const {colors, textures, defaultColor, defaultTexture} = this.props;
        this.colors = colors;
        this.textures = textures;
        this.colors.push({id: -1, description: 'Не выбран'});
        this.textures.push({id: -1, description: 'Не выбрана'});
        this.defaultColor = defaultColor
            ? defaultColor
            : this.colors[this.colors.length - 1].id;
        this.defaultTexture = defaultTexture
            ? defaultTexture
            : this.textures[this.textures.length - 1].id;
    }

    selectColor = event => this.props.selectColor(Number(event.target.value));

    selectTexture = event => this.props.selectTexture(Number(event.target.value));

    render() {
        return (
            <div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Цвет</label>
                    <div className="col-sm-10">
                        <select className="form-control"
                                onChange={this.selectColor}
                                defaultValue={this.defaultColor}>
                            {this.colors.map(color => (
                                <option value={color.id}
                                        key={color.id}>{color.description}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Фактура</label>
                    <div className="col-sm-10">
                        <select className="form-control"
                                onChange={this.selectTexture}
                                defaultValue={this.defaultTexture}>
                            {this.textures.map(texture => (
                                <option value={texture.id}
                                        key={texture.id}>{texture.description}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}