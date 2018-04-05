export default function ({ store, redirect }, next) {
  if (store.state.authUser === null) {
    console.log('!!!!!! store.state.authUser : ' + store.state.authUser)
    redirect('/login')
  }

  // next
  next()
}
