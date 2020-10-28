class ExecutionQueue {
  constructor(initialAction) {
    this.actions = [initialAction]
  }ExecutionQueue

  after(action) {
    this.actions.push(action)
    return this
  }

  before(action) {
    this.actions = [action, ...this.actions]
    return this
  }

  exec() {
    return this.actions
      .reduce(async (promise, action) => {
        await promise
        return promise.then(action)
      }, Promise.resolve())
      .then(() => (this.actions = []))
  }
}

const navigationIn = new ExecutionQueue(() => console.log('Navigated in.'))
const navigationOut = new ExecutionQueue(() => console.log('Navigated Out.'))


const interpolateIn = ({ navigationIn }) => {
  navigationIn.after(async () => {
    console.log('Navigation Completed. Interpolating from 0 to 1.')
  })
}

const interpolateOut = ({ navigationOut }) => {
  navigationOut.before(async () => {
    console.log('Navigation Completed. Interpolating from 1 to 0.')
  })
}

interpolateIn({ navigationIn })
interpolateOut({ navigationOut })

navigationIn.exec().then(() =>
  setTimeout(() => {
    navigationOut.exec()
  }, 2500)
)
