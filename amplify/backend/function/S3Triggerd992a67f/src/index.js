const Storage = require('aws-amplify');
const Sharp = require('sharp');

// const bucket = process.env.bucket;
// const URL = process.env.URL;

// eslint-disable-next-line
exports.handler = function(event, context) {
  console.log('Received S3 event:', JSON.stringify(event, null, 2));
  // Get the object from the event and show its content type
  const bucket = event.Records[0].s3.bucket.name; //eslint-disable-line
  const key = event.Records[0].s3.object.key; //eslint-disable-line
  console.log(`Bucket: ${bucket}`, `Key: ${key}`);

  const name = event.queryStringParameters.name;
  const quality = event.queryStringParameters.quality;
  const ext = name.split('.').reverse()[0];

  Storage.get(key, {download: true})
    .promise()
    .then((data) => {
      const image = Sharp(data.Body);
      switch (ext) {
        case 'jpg':
        case 'jpeg':
        case 'JPG':
        case 'JPEG':
          return image.jpeg({
            quality: quality || 75,
          });
        case 'png':
        case 'PNG':
          return image.png({
            quality: 75,
            compressionLevel: quality,
            adaptiveFiltering: true,
            force: true,
          });
      }
    })
    .then((buffer) =>
      Storage.put({
        Body: buffer,
        Bucket: bucket,
        ContentType: `image/${ext.toLowerCase()}`,
        Key: key,
      }).promise(),
    )
    .catch((err) => console.log(err));

  context.done(null, 'Successfully processed S3 event'); // SUCCESS with message
};
