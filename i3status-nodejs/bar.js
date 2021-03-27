const i3wm = require('i3wm')

i3wm.Client.connect().then(client => {
    console.log('Conneceted')
    client.subscribe('window', 'workspace')
    client.on('workspace', msg => {
        if (msg.change === 'focus') {
            console.log(msg.current.name + '<-')
        } else {
            console.log(msg);
        }
    })
})



// const i3 = require('i3').createClient();

// var test = function() {
//     console.log('ARGS: ', arguments);
//     console.log('NEW: ', arguments[0].current.num);
//     if (arguments[0].change == 'focus') {
//         console.log('OLD: ', arguments[0].old.num);
//     } else {
//         console.log('OLD: ', 0);
//     }
// };
// // i3.on('window', test);
// debugger
// i3.on('workspace', test);
// // i3.on('output', test);

// //process.exit();