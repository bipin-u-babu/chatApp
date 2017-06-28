
import React from 'react';
import { expect } from 'chai';
import TestUtils from 'react-addons-test-utils'

import TextMessage from '../src/js/components/TextMessage';

describe('TextMessage compoenent test', function () {

    var message = { "msg": "test", "user": "testUser" }
    var currentUser = "testUser";

    //---shallow rendering
    var renderer = TestUtils.createRenderer();
    function renderTextMessage() {
        renderer.render(<TextMessage
            message={message}
            currentUser={currentUser} />);
        return renderer.getRenderOutput()
    }

    var result = renderTextMessage();

    it('should render textMessage component layout correctly', function () {

        expect(result.type).to.eql('div');
        expect(result.props.children.props.className).to.eql('msg macro');
        expect(result.props.children.props.children.props.className).to.eql('text text-l');
        expect(result.props.children.props.children.props.children[0].type).to.eql('p');
    })

    it('should return props from parent components', function () {
        // Testing objectData 
        expect(result.props.children.props.children.props.children[0].props.children[1]).to.eql(message.msg);

    });


});