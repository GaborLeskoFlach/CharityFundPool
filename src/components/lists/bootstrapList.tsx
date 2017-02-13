import * as React from 'react';
let BootstrapTable = require('react-bootstrap-table').BootstrapTable;
let TableHeaderColumn = require('react-bootstrap-table').TableHeaderColumn;

var products = [{
      id: 1,
      name: "Item name 1",
      price: 100
  },{
      id: 2,
      name: "Item name 2",
      price: 100
  }];

export class BootstrapList extends React.Component<{},{}>{
    
    constructor(){
        super();
    }

    priceFormatter = (cell, row) => {
        return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
    }

    render(){
        return(
                <div className="container">
                    <div className="section-title">
                        <h1>Bootstrap Table</h1>				
                    </div>
                    <div className="our-details-tab padding-bottom">
                        <div className="row">
                            <section className="content">
                                <div className="col-sm-12 tab-section">
                                    <BootstrapTable data={products} striped={true} hover={true}>
                                        <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>Product ID</TableHeaderColumn>
                                        <TableHeaderColumn dataField="name" dataSort={true}>Product Name</TableHeaderColumn>
                                        <TableHeaderColumn dataField="price" dataFormat={this.priceFormatter}>Product Price</TableHeaderColumn>
                                    </BootstrapTable>                                    
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
        )
    }
}