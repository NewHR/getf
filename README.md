# getf
Safely access to fields in nested objects. Alternative for optional chaining, who can work now without transpilers.

## Overview and motivation
When looking for a property value deeply in a tree structure, one has often to check whether intermediate nodes exist:

```javascript
var street = user.address && user.address.street;
```

Also, many API return either an object or null/undefined, and one may want to extract a property from the result only when it is not null:

```javascript
var fooInput = myForm.querySelector('input[name=foo]')
var fooValue = fooInput ? fooInput.value : undefined
```

The Optional Chaining Operator allows a developer to handle many of those cases without repeating themselves and/or assigning intermediate results in temporary variables:

```javascript
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

const path = {
  user: {
    posts: {
      2: {
          title: !0
      }
    }
  }
}

const data4 = {
  user: {
    posts: [
      { text: 'some text' }
    ]
  }
}
```

## Usage
```javascript
const getf = require('./lib.js');

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

// Buz
console.log( getf(path)(data1) );
// true
console.log( getf(path)(path) );

// some text
console.log( getf(data4)(data4) );

// user/posts/0/title
console.log( getf.path(data1) );

// Foo
console.log( getf(data1)(data1) );
//*/

//console.log( getf `user.posts[1].title` (data1) );
//console.log( getf `user.posts[1].${!0?'title':'foo'}` (data1) );
```

