import React,{useRef} from 'react'


export default function Input({setInput,placeholder,value,onValidate}){
  const inputRef =useRef(null)
  const handleChange =(e)=>{
    let val =e.target.value
    setInput(val)
    if(onValidate){
      onValidate(val)
    }
  }

  return (
     <div className='pt-2 w-full relative'>
      <input
        ref={inputRef}
        className='w-full border-2 border-black rounded-md p-3 pt-4 pb-2 focus:outline-none peer'
        required
        onChange={handleChange}
        value={value || ''}
        type="text"
      />
      <label className='absolute pl-1 pr-1 left-2.5 top-0 bg-white text-sm peer-focus:top-0 peer-focus:text-sm transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-5' htmlFor="">
        {placeholder}
      </label>
    </div>
  )
}


// function Input(props) {
//   const {setInput,placeholder} =props
    
//   return (
//     <div className='pt-2 w-full relative'>
//         <input className='w-full border-2 border-black rounded-md p-3 pt-4 pb-2 focus:outline-none peer ' required onChange={(event)=>setInput(event.target.value)} type="text" />
//         <label className='absolute pl-1 pr-1 left-2.5 top-0 bg-white text-sm peer-focus:top-0 peer-focus:text-sm transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-5' htmlFor="">{placeholder}</label>
//     </div>
//   )
// }

// export default Input
