// import myRootFile.js

let pendingTimers = [];
let pengingOSTasks = [];
let pendingOpertations = [];

// new timers, tasks and operations are recorded from running the file
myRootFile.run();

function shouldContinue() {
  // Check one: Any pending setTimeout, setInterval, setImmediate?
  // Check two: Any pending OS tasks? (Like listening to a server)
  // Check three: Any pending long running opertations (Like fs module checking HD)
  return (
    pendingTimer.length || pendingOpertations.length || pendingOSTasks.length
  );
}

// entire body executes in one 'tick'
while (shouldContinue()) {
  // 1) Node looks at any pendingTimers and sees if any fucntions are ready to be called.
  // setTimeout, setInterval
  // 2) Node looks at any pendingOSTasks and pendingOpertations and calls relevant allbacks
  // 3) Pause execution. Continue when...
  //  - a new pendingOSTasks is done
  //  - a new pendingOpertations is done
  //  - a timer is about to complete.
  // 4) Look at pendingTimers. Call any setImmediate
  // 5) Handle any 'close' events. ('Clean up code');
}

// exit back to terminal
