
import './Tablet.css'
import CesiumMap from './CesiumMap'

function Tablet({ onLocationSelect }) {
  return (
    <div className="tablet">
      <div className="tablet-screen">
        <CesiumMap onLocationSelect={onLocationSelect} />
      </div>
    </div>
  )
}

export default Tablet
