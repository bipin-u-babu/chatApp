var chai = require('chai'),
    mocha = require('mocha'),
    should = chai.should();

var io = require('socket.io-client');

describe("Server socket.io test", function () {
    var server,
        options = {
            transports: ['websocket'],
            'force new connection': true
        };

    beforeEach(function (done) {
        // start the server
        server = require('../server').server;
        done();
    });
    it("should be able to send and recieve message", function (done) {
        var client = io.connect("http://localhost:3000", options);
        client.once("connect", function () {
            client.once("receive-message", function (message) {
                message.should.equal("message1");
                client.disconnect();
                done();
            });
            client.emit("new-message", "message1");
        });
    });

});