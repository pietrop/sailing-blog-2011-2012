const fs = require('fs');
const parser = require('xml2json');
const tumblrPostsXMl = fs.readFileSync('./tumblr-sailing/posts/posts.xml').toString();
console.log('tumblrPostsXMl', tumblrPostsXMl);
var json = parser.toJson(tumblrPostsXMl);
console.log('to json -> %s', JSON.stringify(json, null, 2));
const data = JSON.parse(json).tumblr.posts.post.reverse();
console.log(data.length);
fs.writeFileSync('./src/data.json', JSON.stringify(data, null, 2));
