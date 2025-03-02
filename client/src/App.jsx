
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import PostCreate from '../components/PostCreate.jsx'
import PostList from '../components/PostList.jsx'
function App() {
  

  return (
    <div className='container'>
      <h1>Create Post</h1>
      <PostCreate />
      <hr />
      <h1>Posts</h1>
      <PostList />
    </div>
  )
}

export default App
