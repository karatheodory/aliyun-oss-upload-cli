const oss = require('ali-oss');
const fs = require('fs');
const argv = require('optimist').argv;
const co = require('co');
const _ = require('lodash');

const filePath = argv.path;
const keyName = argv.bucketKey;
const bucket = argv.bucket;
const accessKeyId = argv.key;
const accessKeySecret = argv.secret;
const region = argv.region;

if (_.some([filePath, bucket, accessKeyId, accessKeySecret, region, keyName], (item) => !item)) {
    console.log('Usage: --path path/to/file --bucket OssBucketName --bucketKey keyName --key accessKeyId '
        + ' --secret accessKeySecret --region regionName');
    process.exit(1);
}

const ossStore = oss({
    bucket,
    accessKeyId,
    accessKeySecret,
    region
});

co(function*() {
    return yield ossStore.put(
        keyName,
        filePath,
        null
    )
}).then(() => {
    console.log('Upload completed');
}).catch((error) => {
    console.log('Upload error.')
});
