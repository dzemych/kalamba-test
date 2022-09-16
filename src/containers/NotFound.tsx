import {FC} from "react";

const NotFound: FC = () => {
   return (
      <>
         <h1 style={{
            textAlign: "center"
         }}>
            This page does not exist
         </h1>

         <h1 style={{
            color: '#e44545',
            fontWeight: 'bold',
            textAlign: 'center'
         }}>
            404
         </h1>
      </>
   )
}

export default NotFound