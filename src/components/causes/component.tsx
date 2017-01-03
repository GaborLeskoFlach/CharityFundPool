import * as React from 'react';
import { Link } from 'react-router';
import { _firebaseApp } from '../firebaseAuth/component';
import { ICause, IConvertDataConstraint, DataFilter } from '../interfaces';
import * as CauseFields from './formFields';
import { CauseController } from './controller';
import { browserHistory } from 'react-router';
import { convertData } from '../../utils/utils';
import { CauseCreateComponent } from './addNewCause/component'

import { toJS } from 'mobx';
import {observer} from 'mobx-react';
import { map } from 'lodash';

let DataTable = require('react-data-components').DataTable;

interface IColumnData {
    title: string;
    prop: string;
    render?: (val, row) => void;
    className?: string;
}

@observer
export class CauseListComponent extends React.Component<{}, {}>{
    controller: CauseController;
    causeColumns: Array<IColumnData> = [];
    archivedCauseColumns: Array<IColumnData> = [];

    constructor(props) {
        super(props)

        this.controller = new CauseController();

        this.causeColumns = [
            { title: '', prop: 'ID', render: this.renderArchive, className: 'text-center' },
            { title: '', prop: 'ID', render: this.renderDonate, className: 'text-center' },
            { title: '', prop: 'ID', render: this.renderEdit, className: 'text-center' },
            { title: 'Created', prop: 'createDate' },
            { title: 'Title', prop: 'title' },
            { title: 'Description', prop: 'description' },
            { title: 'Estimate Value', prop: 'estimatedValue' },
            { title: 'Best price', prop: 'bestPrice' },
            { title: 'Donated', prop: 'ID', render: this.renderDonated, className: 'text-center' },
            { title: 'To go', prop: 'ID', render: this.renderToGo, className: 'text-center' },
        ];

        this.archivedCauseColumns = [
            { title: 'Archived', prop: 'archiveDate' },
            { title: 'Created', prop: 'createDate' },
            { title: 'Title', prop: 'title' },
            { title: 'Description', prop: 'description' },
            { title: 'Estimate Value', prop: 'estimatedValue' },
            { title: 'Best price', prop: 'bestPrice' },
            { title: 'Donated', prop: 'ID', render: this.renderDonated, className: 'text-center' },
            { title: 'To go', prop: 'ID', render: this.renderToGo, className: 'text-center' },            
        ];        
    }

    componentWillMount() {
        this.controller.isLoading = true;
        this.controller.getCauses().then(response => {
            this.controller.getArchivedCauses().then(response => {
                this.controller.isLoading = false;
            })            
        })
    }

    archiveCause = (id: string) => {
        event.preventDefault();
        this.controller.archiveCause(id).then(response => {
            console.log('Awesome');
        })
    }

    editCause = (id: string) => {
        event.preventDefault();
        console.log('Edit Cause => {0}', id);
    }

    goToDonate = (url: string) => {
        browserHistory.push(url);
    }

    renderDonated = (val: string, row: ICause) => {
        return (
            <div>
                55
            </div>
        )
    }

    renderToGo = (val: string, row: ICause) => {
        return (
            <div>
                66
            </div>
        )
    }

    renderArchive = (val: string, row: ICause) => {
        return (
            <button onClick={this.archiveCause.bind(this, row.ID) }>Archive</button>
        )
    }

    renderEdit = (val: string, row: ICause) => {
        return (
            <button onClick={this.editCause.bind(this, row.ID) }>Edit</button>
        )
    }

    renderDonate = (val: string, row: ICause) => {
        let donateUrl: string = '/donate/' + row.ID;
        return (
            <button onClick={this.goToDonate.bind(this, donateUrl) }>Donate</button>
        )
    }

    render() {

        if (this.controller.isLoading) {
            return (
                <div className="container">
                    <div className="section-title">
                        <h1>Loading...</h1>
                    </div>
                </div>
            )
        } else {
            return (         
                <div className="container">
                    <div className="section-title">
                        <h1>Needs</h1>
                    </div>
                    <div className="our-details-tab padding-bottom">
                        <div className="row">
                            <section className="content">
                                <div className="col-sm-12 tab-section">

                                    <ul className="nav nav-tabs nav-justified" role="tablist">
                                        <li className="active"><a href="#Needs" role="tab" data-toggle="tab">Needs</a></li>
                                        <li><a href="#ArchivedNeeds" role="tab" data-toggle="tab">Archived Needs</a></li>
                                    </ul>

                                    <div className="tab-content">
                                        <div className="tab-pane fade in active" id="Needs">
                                            <div className="table-responsive">
                                                <DataTable
                                                    keys="ID"
                                                    columns={this.causeColumns}
                                                    initialData={convertData(this.controller.causes, DataFilter.ActiveOnly) }
                                                    initialPageLength={5}
                                                    initialSortBy={{ prop: 'ID', order: 'descending' }}
                                                    />
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="ArchivedNeeds">
                                            <div className="table-responsive">
                                                <DataTable
                                                    keys="ID"
                                                    columns={this.archivedCauseColumns}
                                                    initialData={convertData(this.controller.archivedCauses, DataFilter.InActiveOnly) }
                                                    initialPageLength={5}
                                                    initialSortBy={{ prop: 'ID', order: 'descending' }}
                                                    />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div >
            )
        }
    }
}


