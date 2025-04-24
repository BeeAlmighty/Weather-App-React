import React, {useContext} from 'react';
import { myContext } from '../App';

export const Details = ({description, value, image}) => {
  const { isDark } = useContext(myContext);
  return (
    <div className={`p-[1.5rem] rounded-md flex flex-col gap-[1rem] ${isDark ? 'bg-black/75 text-white' : 'bg-gray-300 text-black'}`}>
      <p className={`text-[1.4rem] ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
        {description}
      </p>
      <div className='flex items-center justify-between'>
        <p className='text-2xl '>{value}</p>
        {image}
      </div>
    </div>
  )
}
