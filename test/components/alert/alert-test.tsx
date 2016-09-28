/*
import * as React from "react";
import * as chai from 'chai'
import * as chaiEnzyme from 'chai-enzyme'
import {shallow} from 'enzyme'
chai.use(chaiEnzyme()) 
let {expect} = chai


import {Alert} from '../../../src/components/alert/alertComponent'
import {DWAlerts, DWAlertModle, AlertLevel, SlideAction} from '../../../src/components/alert/modle'

describe("<Alert/>", () => {


    beforeEach(() => {

    });

    it("should render a marquee when very long", () => {
        let dwAlert = new DWAlertModle("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ", AlertLevel.High);
        const alert = shallow(<Alert alert={dwAlert}  slideAction={SlideAction.none} onReset={() => { } } />)
        expect(alert).to.have.className("marquee");
    });

    it("should render no maquee when short", () => {
        let dwAlert = new DWAlertModle("Lorem ipsum dolor sit amet", AlertLevel.High);
        const alert = shallow(<Alert alert={dwAlert}  slideAction={SlideAction.none} onReset={() => { } } />)
        console.log(alert.text());
        expect(alert.find('div')).to.not.have.className("marquee");
    });
}) 
*/