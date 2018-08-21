const getf = require('./lib.js');

/**
 * Simple Unit Test function
 */
var testNumber = 0; const test = (val, res) => {
	var ret,
  		asrt = val === res;
	++testNumber;  
  if (Array.isArray(val) && Array.isArray(res))
  	asrt = val.toString() == res.toString();
	console.assert(asrt, `Test ${testNumber}, expected: ${JSON.stringify(val)}, result: ${JSON.stringify(res)}`);
  asrt && console.info(`Test ${testNumber} passed`);
};

// Test data
const data1 = {
  user: {
    posts: [
      { title: 'Foo', comments: [ 'abc', 'def' ] },
      { title: 'Bar', comments: ['Ok'] },
      { title: 'Buz', comments: null, description: 'Some data' },
    ]
  }
};
const data2 = {
  user: {
    posts: [
      { name: 'Foo', text: 'some text' },
      { name: 'Bar', },
      { name: 'Buz', description: 'Some data' },
    ]
  }
};
const data3 = {
  "a.b": {
    "-1-": [
      { "$foo": "bingo!" }
    ]
  }
};
const data4 = {
  user: {
    posts: [
      { text: 'some text' }
    ]
  }
}
const pathObject = {
  user: {
    posts: {
      2: {
          title: !0
      }
    }
  }
};

// 1
test('bingo!', getf('a.b', '-1-', 0, '$foo')(data3) );
// 2
test('default value', getf('user/posts/1/comments1', 'default value')(data1));
// 3
test('Bar', getf `user.posts[1].title` (data1) );
// 4
test('Buz', getf(pathObject)(data1) );
// 5
test(true, getf(pathObject)(pathObject) );
// 6
test('some text', getf(data4)(data4) );
// 7
test('user/posts/0/title', getf.path(data1) );
// 8
test('Foo', getf(data1)(data1) );
// 9
test('default value', getf('user', 'posts', 1, 'comments1')(data1, 'default value') );
// 10
test(['Ok'],   getf('user', 'posts', 1, 'comments')(data1) );
// 11
test(
	["default value", "Bar"],
  [ data1, data2 ].map( getf('user.posts[1].name', 'default value') )
);


//console.log( getf `user.posts[1].title` (data1) );
//console.log( getf `user.posts[1].${!0?'title':'foo'}` (data1) );
