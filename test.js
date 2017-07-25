const getf = require('./lib.js');

const data1 = {
  user: {
    posts: [
      { title: 'Foo', comments: [ 'abc', 'def' ] },
      { title: 'Bar', comments: ['Ok'] },
      { title: 'Buz', comments: null, description: 'Some data' },
    ]
  }
}

const data2 = {
  user: {
    posts: [
      { name: 'Foo', text: 'some text' },
      { name: 'Bar', },
      { name: 'Buz', description: 'Some data' },
    ]
  }
}

const data3 = {
  "a.b": {
    "-1-": [
      { "$foo": "bingo!" }
    ]
  }
}

//*
// bingo!
console.log( getf('a.b', '-1-', 0, '$foo')(data3) );

// [Ok]
console.log( getf('user', 'posts', 1, 'comments')(data1) );

// no comments
console.log( getf('user', 'posts', 1, 'comments1')(data1, 'default value') );

// foo
console.log( getf('user/posts/1/comments1', 'default value')(data1) );

// [ 'Noname', 'Bar' ]
console.log(
    [ data1, data2 ]
        .map(getf('user posts 1 name', 'default value'))
);

// Bar
console.log( getf `user.posts[1].title` (data1) );


const path = {
  user: {
    posts: {
      2: {
          title: !0
      }
    }
  }
}
// Buz
console.log( getf(path)(data1) );
// true
console.log( getf(path)(path) );

const data4 = {
  user: {
    posts: [
      { text: 'some text' }
    ]
  }
}
// some text
console.log( getf(data4)(data4) );

// user/posts/0/title
console.log( getf.path(data1) );

// Foo
console.log( getf(data1)(data1) );
//*/

//console.log( getf `user.posts[1].title` (data1) );
//console.log( getf `user.posts[1].${!0?'title':'foo'}` (data1) );

