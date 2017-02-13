import * as React from 'react';
import './styles.css';

interface IListView{
    data : Array<any>;
}

export class ListView<T> extends React.Component<IListView,{}>{
    
    constructor(){
        super();
    }

    selectAll = () => {

    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        <div className="panel panel-default panel-table">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col col-xs-6">
                                        <h3 className="panel-title">Panel title</h3>
                                    </div>
                                    <div className="col col-xs-6 text-right">
                                        <div className="pull-right">
                                            <div className="btn-group" data-toggle="buttons">
                                                <label className="btn btn-success btn-filter active" data-target="completed">
                                                    <input type="radio" name="options" id="option1"  checked />
                                                    Completed
                                                </label>
                                                <label className="btn btn-warning btn-filter" data-target="pending">
                                                    <input type="radio" name="options" id="option2" /> Pending
                                                </label>
                                                <label className="btn btn-default btn-filter" data-target="all">
                                                    <input type="radio" name="options" id="option3" /> All
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-body">
                                <table id="mytable" className="table table-striped table-bordered table-list">
                                    <thead>
                                    <tr>
                                        <th className="col-check"><input type="checkbox" id="checkall" onClick={this.selectAll}/></th>
                                        <th className="col-tools"><span className="glyphicon glyphicon-wrench" aria-hidden="true"></span>
                                        </th>
                                        <th className="hidden-xs">ID</th>
                                        <th className="col-text">Name</th>
                                        <th className="col-text">Email</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr data-status="completed">
                                        <td ><input type="checkbox" className="checkthis"/></td>
                                        <td>
                                            <a className="btn btn-default"><span className="glyphicon glyphicon-pencil"
                                                                            aria-hidden="true"></span></a>
                                            <a className="btn btn-danger"><span className="glyphicon glyphicon-trash"
                                                                            aria-hidden="true"></span></a>
                                        </td>
                                        <td className="hidden-xs">1</td>
                                        <td>John Doe</td>
                                        <td>johndoe@example.com</td>
                                    </tr>
                                    <tr data-status="pending">
                                        <td align="center"><input type="checkbox" className="checkthis"/></td>
                                        <td align="center">
                                            <a className="btn btn-default"><span className="glyphicon glyphicon-pencil"
                                                                            aria-hidden="true"></span></a>
                                            <a className="btn btn-danger"><span className="glyphicon glyphicon-trash"
                                                                            aria-hidden="true"></span></a>
                                        </td>
                                        <td className="hidden-xs">2</td>
                                        <td>Jen Curtis</td>
                                        <td>jencurtis@example.com</td>
                                    </tr>
                                    </tbody>
                                </table>

                            </div>
                            <div className="panel-footer">
                                <div className="row">
                                    <div className="col col-xs-offset-3 col-xs-6">
                                        <nav aria-label="Page navigation" className="text-center">
                                            <ul className="pagination">
                                                <li>
                                                    <a href="#" aria-label="Previous">
                                                        <span aria-hidden="true">«</span>
                                                    </a>
                                                </li>
                                                <li className="active"><a href="#">1</a></li>
                                                <li><a href="#">2</a></li>
                                                <li><a href="#">3</a></li>
                                                <li><a href="#">4</a></li>
                                                <li><a href="#">5</a></li>
                                                <li>
                                                    <a href="#" aria-label="Next">
                                                        <span aria-hidden="true">»</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                    <div className="col col-xs-3">
                                        <div className="pull-right">
                                            <button type="button" className="btn btn-primary">
                                                <span className="glyphicon glyphicon-plus"
                                                    aria-hidden="true"></span>
                                                Add row
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}