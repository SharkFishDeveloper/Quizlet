import axios from 'axios';
import  { useEffect, useState } from 'react'
import {Quiz} from '../../interfaces/FullTest';

const Test = () => {
    const [test, setTest] = useState<Quiz | null>(null);
 
    useEffect(() => {
        const fetchData = async () => {
            // TODO: METHOD should be post with id as parameter
            const response = await axios.get("https://api.jsonbin.io/v3/b/67a61fccacd3cb34a8d9fbd5");
            if(response.data.record){
                setTest(response.data.record);
            }
        }
        fetchData();
    },[])
  return (
  <div>
      {test?.questions.map((question,index) => (
        <p>{index+1}{question.description}</p>
      ))}
  </div>
  )
}

export default Test