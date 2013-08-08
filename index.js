var util = require('util'),
  stream = require('stream'),
  exec = require('child_process').exec;

util.inherits(Driver,stream);
util.inherits(Device,stream);

function Driver(opts,app) {
  var self = this;

  app.on('client::up',function(){
    self.emit('register', new Device(app));
  });

}

function Device(app) {
  var self = this;

  this._app = app;
  this.writeable = true;
  this.readable = false;
  this.V = 0;
  this.D = 320;
  this.G = 'LockScreen';
  this.name = 'Lock Screen - ' + require('os').hostname();
}

Device.prototype.write = function(data) {
  exec('/System/Library/CoreServices/Menu\\ Extras/User.menu/Contents/Resources/CGSession -suspend');
};

module.exports = Driver;
