import { spy } from "sinon";
import { mount } from "enzyme";
import { expect } from 'chai';
import React from 'react';
import should from "should"
import ChatBox from '../src/js/components/ChatBox';
require('./jsdom-utils')


function setup() {
    const enzymeWrapper = mount(<ChatBox />)
    return {
        enzymeWrapper
    }
}

describe("ChatBox component test", function () {

    it("Chatbox component has called componentDidMount", function () {
        spy(ChatBox.prototype, 'componentDidMount');
        setup();
        expect(ChatBox.prototype.componentDidMount.calledOnce).to.equal(true);
    })


    it("Chatbox registerUser method has called ", function () {
        const { enzymeWrapper } = setup();
        enzymeWrapper.instance().registerUser("test")
        expect(global.sessionStorage.getItem('user')).to.eql("test")
    })


    it("Should show <TextMessage> component", function () {

        const { enzymeWrapper } = setup();
        var textMessageNode = enzymeWrapper.find('TextMessage');
        should.exist(textMessageNode);

    })

    it("Should show <UserInput> component", function () {

        const { enzymeWrapper } = setup();
        var userInputNode = enzymeWrapper.find('UserInput');
        should.exist(userInputNode);

    })


})