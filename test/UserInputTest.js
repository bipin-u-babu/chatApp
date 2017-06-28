
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import should from 'should'
import UserInput from '../src/js/components/UserInput';

function cb(a) {
    return a;
}

function setup(props) {
    const enzymeWrapper = shallow(<UserInput {...props} />)
    return {
        props, enzymeWrapper
    }
}

describe('UserInput compoenent test', function () {

    it('UserInput component has rendered correctly with all fields when currentUser is null', function () {
        const props = {
            registerUser: cb,
            sendMessage: cb,
            currentUser: null
        }

        const { enzymeWrapper } = setup(props);
        var userNameNode = enzymeWrapper.find('#msgText');
        var userRegButton = enzymeWrapper.find('#regUser');
        should.exist(userNameNode);
        should.exist(userRegButton);
    });

    it('UserInput component has rendered correctly with all fields when currentUser is not null', function () {
        const props = {
            registerUser: cb,
            sendMessage: cb,
            currentUser: 'testUser'
        }
        const { enzymeWrapper } = setup(props);
        expect(enzymeWrapper.find('input')).to.have.length(1)
        expect(enzymeWrapper.find('Button')).to.have.length(1)
    });


    it('should return props from parent components', function () {
        const props = {
            registerUser: cb,
            sendMessage: cb,
            currentUser: null
        }
        const { enzymeWrapper } = setup(props);
        expect(enzymeWrapper.instance().props.currentUser).to.eql(props.currentUser);
        expect(enzymeWrapper.instance().props.registerUser).to.exist;
        expect(enzymeWrapper.instance().props.sendMessage).to.exist;

    });

});
