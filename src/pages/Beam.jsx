import {useState} from 'react'
import BeamInput from '../Components/BeamInput';

export default function Beam() {
    const [beam, setBeam] = useState({
        length:5,
        width:200,
        height:450,
        density:25,
        loads:[]
    })
    const updateFloatValues = e => {
      const {name,value} = e.target;

      /* Updating the state using closure and spread operator */
      setBeam(prevBeam=>({
        ...prevBeam,
        [name]:parseFloat(value)||0
      }));
    };
    const handleSubmit = e => {
      e.preventDefault();
    }
    const addLoad = () => {
      /* Adding a default point load of magnitude 0 and at position zero */
      const newLoad = {
        id: Date.now(),
        type: 'point',
        magnitude: 0,
        position: 0,
      }
      setBeam(prev => ({
        ...prev,
        loads: [...prev.loads, newLoad]
      }))
    }
    /* Removing a specific load */
    const removeLoad = (id) => {
      setBeam(prev => ({
        ...prev,
        loads: prev.loads.filter(load => load.id !== id)
      }))
    }
    /* Updating loads */
    const updateLoad = (id,field,value) => {
      setBeam(prev => ({
        ...prev,
        loads: prev.loads.map(load => {
          /* Only edit the load of a corresponding ID */
          if(load.id === id){
            /* Resetting the specific fields when the user switches between 
              a point load and a UDL */
            if (field === 'type'){
              return load.type === 'point'
              ? { ...load, type: value, start: 0, end: prev.length} /* Switching to UDL */
              : { ...load, type: value, position: 0} /* Switching to point load */
            }
            let parsedValue = parseFloat(value) || 0
            let updatedLoad = {...load}

            /* Applying rules to never let the start be greater than the end and the end to
            never be greater than the beam length for the respective load types */
            if(field === 'position') {
              /* clamp point load position between 0 and the beam length */
              updatedLoad.position = Math.min(Math.max(0, parsedValue), prev.length)
            } else if (field === 'start') {
              updatedLoad.start = Math.min(Math.max(0,parsedValue),load.end)
            } else if (field === 'end') {
              updatedLoad.end = Math.min(Math.max(load.start ,parsedValue), prev.length)
            } else {
              /* for updating the other fields */
              updatedLoad[field] = parsedValue
            }

            /* Logic for returning the load with updated fields */
            return updatedLoad
          }
          /* Otherwise return the load unchanged */
          return load
        })
      }))
    }
  return (
    <>
        <div className="font-semibold text-xl">Beam data:</div>
        {/* Update the beam length value */}
        <form onSubmit={handleSubmit}>
          {'Span Length: '}
          <BeamInput
          name="length"
          value={beam.length}
          onChange={updateFloatValues}
           />
          <div>Section Properties:</div>
          {'Width: '}
          <BeamInput
          name="width"
          value={beam.width}
          onChange={updateFloatValues}
           />
          {'Height: '}
          <BeamInput
          name="height"
          value={beam.height}
          onChange={updateFloatValues}
          className="mb-4"
           />
           <div>{'Concrete Density (kN/m'}<sup>3</sup>{  '): '}</div>
          <BeamInput
          name="density"
          value={beam.density}
          onChange={updateFloatValues}
           />
           <div className='text-lg mt-4'>
            <h2>Applied Loads</h2>
            <button 
            type="button" 
            className="bg-blue-200 p-2 rounded hover:bg-blue-300"
            onClick={addLoad}
            >
              + Add load
            </button>
            <div>
              {beam.loads.length === 0 && (
                <p>
                  No loads added yet.
                </p>
              )}
              {/* Render the list of loads */}
              {beam.loads.map((load) => (
                <div
                key={load.id}
                className='flex flex-wrap items-end p-4 border rounded relative'>
                  {/* Load type dropdown */}
                  <div className="w-1/4 mx-2">
                    <label  className="block mb-1">
                      Type
                    </label>
                    <select 
                    value={load.type}
                    onChange={e => updateLoad(load.id,'type',e.target.value)}
                    className='w-full border rounded p-2'>
                      <option value="point">Point Load </option>
                      <option value="udl">Uniform Distributed Load (UDL)</option>
                    </select>
                  </div>
                  {/* Common input for load magnitude */}
                  <div className="w-1/5 mx-2">
                    <label 
                    className="block mb-1" >Magnitude {load.type === 'point' ? '(kN)' : '(kN/m)' }</label>
                    <BeamInput 
                    value={load.magnitude}
                    onChange={ e => updateLoad(load.id,'magnitude',e.target.value)}
                    className='w-full' />
                  </div>

                  {/* Conditional rendering for point load position */}
                  {load.type === 'point' && (
                      <div className="w-1/5 mx-2">
                        <label 
                        className="block mb-1" >Position (m)</label>
                        <BeamInput 
                        value={load.position}
                        onChange={e => updateLoad(load.id,'position', e.target.value)}
                        className='w-full' />
                      </div>
                  )}

                  {/* Conditional rendering for udl start and end inputs */}
                  {load.type === 'udl' && (
                    <>
                      <div className="w-1/8 mx-2">                    
                          <label 
                          className="block mb-1" >Start (m)</label>
                          <BeamInput 
                          value={load.start}
                          onChange={e => updateLoad(load.id,'start', e.target.value)}
                          className='w-full' />
                      </div>
                      <div className="w-1/8 mx-2">                    
                          <label 
                          className="block mb-1" >End (m)</label>
                          <BeamInput 
                          value={load.end}
                          onChange={e => updateLoad(load.id,'end', e.target.value)}
                          className='w-full' />
                      </div>
                    </>)}

                    {/* Remove button */}
                    <button 
                    type="button"
                    onClick={()=> removeLoad(load.id)}
                    className='p-2 rounded block text-red-600 hover:bg-red-600 hover:text-white transition-all ml-auto' >✕</button>

                </div>
              ))}
            </div>

              {/* Debugging to see state update live */}
              <pre className='mt-4 p-2 bg-gray-100 text-sm' >
                {JSON.stringify(beam.loads, null, 2)}
              </pre>

           </div>
        </form>
    </>
  )
}
