
export default function BeamInput({name='',value,onChange,className, ...props}) {
  return (
    <>
        <input 
          type="number" 
          name={name}
          step={0.1}
          value={value} 
          onChange={onChange}
          className={"block bg-gray-100 rounded p-2 border border-gray-300 "+ className} 
          {...props} />
    </>
  )
}
