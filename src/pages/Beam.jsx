import {useState} from 'react'

export default function Beam() {
    const [beam, setBeam] = useState({
        length:5,
        width:200,
        height:450,
        density:25,
    })
  return (
    <>
        <div>Beam data:</div>
        <div>Span length: {beam.length}</div>
    </>
  )
}
