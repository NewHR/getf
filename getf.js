/**
 * Get string path by input object
 */
const path = (p = {}, k) =>
    (
        (k = Object.getOwnPropertyNames(p)[0]),
            ('object' == typeof p[k] && p[k])
                ? `${k}/${path(p[k])}`
                : k
    );
/**
 * Get property from object by filed name or string path
 */
const getf = (...data) =>
    (
        (getf.$def$ = void null)
        ,
        (data[0].raw != void 0) && (data[0] = '' + data[0])
        ,
        ('object' == typeof data[0]) && (data[0] = path(data[0]))
        ,
        getf.$data$ =
            (typeof data[0] == 'string') && (0 < data.length && data.length < 3)
               ? (
                  (data.length == 2 && 'string' == typeof data[1])
                   && (getf.$def$ = data[1])
                   ,
                   getf.$data$ = data[0].trim().split(/[\s\W]+/g)
                 )
              : data
            ,
            (obj = {}, def = void null) =>
                getf.$data$.reduce((a, b) =>
                   a != void Object && void NaN != a[b]
                     ? a[b]
                     : (def ? def : getf.$def$)
                   ,
                   obj
            )
    );

getf.path = path;

module.exports = getf;
