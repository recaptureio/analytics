var path = require('path');
var s3 = require('s3');
var semver = require('./package').version;
var stableVersion = semver.split('.')[0];

var sdkFile = path.join(__dirname, 'dist/ra.min.js');
var sdkKey = 'analytics/v' + stableVersion + '/' + 'ra.min.js';
var loaderFile = path.join(__dirname, 'dist/loader.min.js');
var loaderKey = 'analytics/loader.min.js';

function upload(localFile, key) {
  var options = require('./aws');
  var params = {
    localFile: localFile,
    s3Params: {
      Bucket: options.bucket,
      Key: key,
      ACL: 'public-read'
    }
  };

  var client = s3.createClient({
    s3Options: {
      accessKeyId: options.key,
      secretAccessKey: options.secret
    }
  });

  var uploader = client.uploadFile(params);

  uploader.on('error', function(err) {
    console.error('unable to upload:', err.stack);
  });

  uploader.on('progress', function() {
    console.log('progress', uploader.progressMd5Amount, uploader.progressAmount, uploader.progressTotal);
  });

  uploader.on('end', function() {
    console.log('done uploading');
  });
}

upload(sdkFile, sdkKey);
upload(loaderFile, loaderKey);
