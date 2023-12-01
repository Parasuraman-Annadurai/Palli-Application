import React from 'react'

const BacthList = ({batchesList,handleEditClick}) => {

    return ( 
       <>
          {batchesList.map((batch, index) => (
            <div key={index} className="added-batches">
              <div>
                <a href={`/batch/${batch.id}/applications`}>
                  <p>{batch.batch_name}</p>
                  <p>{batch.start_date}</p>

                  <p>{batch.end_date}</p>
                </a>
              </div>

              <span
                onClick={() => handleEditClick(batch)}
                className="material-symbols-outlined"
              >
                edit
              </span>
            </div>
          ))}
       </>
     );
}
 
export default BacthList;

