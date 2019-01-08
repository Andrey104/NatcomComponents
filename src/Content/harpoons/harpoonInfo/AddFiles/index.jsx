import React from 'react';

import FileField from '../../../../components/FileField/index';
import {BaseApi} from '../../../../services/base';

export default class extends React.Component {
    baseApi = new BaseApi();
    files;

    constructor(props) {
        super(props);
        const {files} = this.props;
        this.files = files.length ? files : [];
    }

    submitFile = file => {
        let formData = new FormData();
        formData.append('file', file.target.files[0]);
        this.baseApi
            .post(`harpoons/files/`, formData)
            .then(response => {
                const resFile = response.data;
                const arr = resFile.file.split('/');
                resFile.file = arr[arr.length - 1];
                this.files.push(resFile);
                this.props.addFiles(this.files);
            });
    };

    handleClickDelete = fileId => () => {
        this.baseApi
            .deleteRequest(`harpoons/files/${fileId}/`)
            .then(() => {
                this.files = this.files.filter(file => file.id !== fileId);
                this.props.addFiles(this.files);
            })
    };

    getFiles() {
        if (this.files.length > 0) {
            return this.files.map(file => (
                <div key={file.id}>
                    <span>{file.file} </span>
                    <button type="button"
                            onClick={this.handleClickDelete(file.id)}
                            className="btn btn-danger btn-sm">Удалить
                    </button>
                </div>
            ))
        }
    }

    render() {
        return (
            <div className="row">
                <FileField labelName={'файл'}
                           changeField={this.submitFile}/>
                <div className="col-12">
                    {this.getFiles()}
                </div>
            </div>
        )
    }
}