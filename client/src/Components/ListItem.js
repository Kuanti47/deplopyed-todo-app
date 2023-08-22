import { useState } from 'react'
import TickIcon from './TickIcon'
import ProgressBar from './ProgressBar'
import Modal from './Modal'

const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false)

  const deleteItem = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, { method: 'DELETE' })
      if (response.status === 200) {
        getData()
        console.log('this is the new data:', getData) // Fetch updated data after deletion
      }
    } catch (err) {
      console.log(err)
    }
  }


  return (
      <li className="list-item">

        <div className="info-container">
          <TickIcon/>
          <p className="task-title">{task.title}</p>
          <ProgressBar progress={task.progress}/>
        </div>

        <div className="button-container">
          <button className="edit" onClick={() => setShowModal(true)}>EDIT</button>
          <button className="delete" onClick={deleteItem}>DELETE</button>
        </div>
        {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task} />}
      </li>
    )
  }
  
  export default ListItem