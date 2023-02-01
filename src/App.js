import './App.css';
import { useState ,useEffect} from 'react';
import axios from 'axios';
import  { Formik, Field, Form } from 'formik';
import * as Yup from "yup";

function App() {

  const [main,setMain]=useState([{
    userId: 1,
    id: 1,
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  }])
  
  const deletehendler=(id)=>{
  axios.delete('https://jsonplaceholder.typicode.com/posts/'+id)
   .then(function (response) {
    console.log("delete");
   })
   .catch(function (error) {
    
    console.log(error);
  })
  }

 
  useEffect(()=>{

    axios.get("https://jsonplaceholder.typicode.com/posts")
  .then(function (response) {
   
    console.log(response.data);
    setMain(response.data)
    
  })
 
  .catch(function (error) {
    
    console.log(error);
  })
 
 },[])

const [num,setNum]=useState({
  userId: '',
    id: '',
    title: '',
    body: '',
  })
const [re,setRe]=useState(-1)

const edithendler=(card,index)=>{
  setNum(card)
  setRe(index)
}

const New = Yup.object().shape({
  userId: Yup.number().required('Required'),
  id: Yup.number().required('Required'),
  title:Yup.string().required('Requierd'),
  body:Yup.string().required('Requierd')
});
 
  return (
    <div className="App">
<br></br>
    <Formik
      initialValues={num}
      enableReinitialize
      validationSchema={New}
      onSubmit={async (values,{resetForm}) => {
      
      if(re>=0)
      {
        let copy=[...main]
        copy.splice(re,1,{userId:(values.userId),id:(values.id),title:(values.title),body:(values.body)})
        console.log(copy);
      }
      else{
        console.log(values);
      }
      resetForm()
      setNum({
          userid: '',
          id: '',
          title: '',
          body: '',
        })
        setRe(-1)
      }}
    >
      <Form>
        <label htmlFor="userId">user Id</label>
        <Field id="userId" name="userId" placeholder="USER ID" type="number"/>
        

        <label htmlFor="id">Id</label>
        <Field id="id" name="id" placeholder="ID" type="number"/>

        <label htmlFor="title">title</label>
        <Field id="title" name="title"placeholder="TITLE"type="text"/>

        <label htmlFor="body">body</label>
        <Field id="body" name="body"placeholder="BODY"type="text"/>

        

        <button type="submit">Submit</button>
      </Form>
    </Formik>

<br></br>
<br></br>

      <table border={1}>
      <tr>
        <td>userId</td>
        <td>id</td>
        <td>title</td>
        <td>body</td>
      </tr>
      
     {
        main.map((card,id,index)=>{
          return(
            
            <tr>
              <td>{card.userId}</td>
              <td>{card.id}</td>
              <td>{card.title}</td>
              <td>{card.body}</td>
              <td><button onClick={() => deletehendler(id)}>delete</button></td>
              <td><button onClick={() => edithendler(card,index)}>edit</button></td>
            </tr>
           
          )
        })
     }
     </table>
    </div>
  );
}

export default App;
