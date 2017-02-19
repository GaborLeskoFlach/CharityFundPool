import * as React from 'react';
import './styles.css';
import { ICause } from '../interfaces';

interface INeedCard{
    need : ICause;
    onClickArchive : (need : ICause, e : React.FormEvent) => void;
    onClickDonate : (need : ICause, e : React.FormEvent) => void;
    onClickEdit : (need : ICause, e : React.FormEvent) => void;
}

export class NeedCard extends React.Component<INeedCard, {}>{

    constructor(props) {
        super(props);
    }

    render() {

        const need = this.props.need;

        return (
            <div className="well well-sm need-card">
                <div className="row">
                    <div className="col-sm-12">
                        <h4>{need.title}</h4>
                        <small>
                            <i className="glyphicon glyphicon-map-marker"></i><cite title="San Francisco, USA">San Francisco, USA </cite>
                        </small>
                        <p>Created: {need.createDate}</p>
                        <p>Estimated Value: {need.estimatedValue} $</p>
                        <p>Best price: {need.bestPrice} $</p>
                        <p>Donated: {!need.donated ? 0 : need.donated} $</p>
                        <p>To go: {!need.toGo ? 0 : need.toGo} $</p>

                        { need.active &&                        
                            <div className="btn-group btn-group-sm">
                                <button className="btn btn-danger" onClick={this.props.onClickArchive.bind(this,need)} >
                                    <span className="glyphicon glyphicon-remove"></span> Archive
                                </button>
                                <button className="btn btn-default" onClick={this.props.onClickEdit.bind(this,need)}>
                                    <span className="glyphicon glyphicon-edit"></span> Edit
                                </button>
                                <button className="btn btn-default" onClick={this.props.onClickDonate.bind(this,need)}> 
                                    <span className="glyphicon glyphicon-gift"></span> Donate
                                </button>                        
                            </div>                        
                        }
                    </div>
                </div>
            </div>
        )
    }
}