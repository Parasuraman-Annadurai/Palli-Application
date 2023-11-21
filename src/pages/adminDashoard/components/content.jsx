// Content.js
import React, { useState } from 'react';


import TableComponent from './tableView';
import ApplicationHeader from './pageeader';
import { Breadcrumb,Table ,Pagination} from 'antd';

const Content = () => {

  const breadcrumbTab = [
    {
      title: 'Home',
    },
    {
      title: <a href="">Applicants</a>,
    }
  ]

//real-data

//   const data =  {
//     "id": 1,
//     "updated_by": 0,
//     "created_by": 0,
//     "created_at": "2023-11-18T06:23:22.086239Z",
//     "updated_at": "2023-11-18T06:23:22.086232Z",
//     "deleted_at": null,
//     "is_deleted": false,
//     "first_name": "parasuraman",
//     "last_name": "annadurai",
//     "email": "parasuapt02@gmail.com",
//     "dob": "2020-12-14",
//     "address": "269 arunthathiyar street",
//     "whatsapp_number": "8189948383",
//     "contact_number": "8189948383",
//     "aadhaar_number": "599933333333",
//     "learning_device": "mobile",
//     "care_taker_name": "annadurai",
//     "care_taker_relation": "father",
//     "care_taker_number": "8189948383",
//     "annual_income": 100000,
//     "batch": 1
// }
 
  // const [applicants,setapplicants] = useState(data);
  // const [filters, setFilters] = useState({
  //   status: 'all',
  //   search: '',
  // });

  // const filterData = applicants.filter((applicants)=>{
  //   const statusFilter = filters.status === "all" || applicants.status.toLowerCase() === filters.status;
  //   const searchFilter = applicants.name.toLowerCase().includes(filters.search.toLowerCase());
  //    return statusFilter && searchFilter;
  // })
 
  // const handleStatus = (status)=>{
  //   setFilters({...filters,status:status})
  // }
  // const handleSearch = (e)=>{
  //   const {value} = e.target;
  //   setFilters({...filters,search:value})
  // }
 
  const data = [
    {
      key: '1',
      first_name: 'parasuraman',
      last_name: 'annadurai',
      email: 'parasuapt02@gmail.com',
      dob: '2020-12-14',
      address: '269 arunthathiyar street',
      invite: true, // Add invite property
    },
    {
      key: '2',
      first_name: 'parasuraman',
      last_name: 'annadurai',
      email: 'parasuapt02@gmail.com',
      dob: '2020-12-14',
      address: '269 arunthathiyar street',
      invite: true, // Add invite property
    },
    {
      key: '3',
      first_name: 'parasuraman',
      last_name: 'annadurai',
      email: 'parasuapt02@gmail.com',
      dob: '2020-12-14',
      address: '269 arunthathiyar street',
      invite: true, // Add invite property
    },
    {
      key: '4',
      first_name: 'parasuraman',
      last_name: 'annadurai',
      email: 'parasuapt02@gmail.com',
      dob: '2020-12-14',
      address: '269 arunthathiyar street',
      invite: true, // Add invite property
    },
    {
      key: '5',
      first_name: 'parasuraman',
      last_name: 'annadurai',
      email: 'parasuapt02@gmail.com',
      dob: '2020-12-14',
      address: '269 arunthathiyar street',
      invite: true, // Add invite property
    },
  ];

  const [application,setApplicants] = useState(data);
  const [search,setSeacrh]=  useState("");
  const handleSearch =(e)=>{
    const {value} = e.target;
      setSeacrh(value);
  }

  const filter = application.filter((applicant)=> applicant.first_name.toLowerCase().includes(search.toLowerCase()))

 
  return (

    
    <div className="content">
      <div className="bread-crumb">
      <Breadcrumb items={breadcrumbTab}/>
      </div>
      <ApplicationHeader handleSearch={handleSearch} totalRecord={filter.length} />
      <div className="filter">
        ____________________________________
      </div>
      {/* <Table columns={columns} dataSource={data} pagination={false} /> */}
      <TableComponent data={filter}/>
      <div className='pagiation__container'>
      <Pagination
        current={1}
        pageSize={5}
        total={filter.length}
        showSizeChanger={false}
        showQuickJumper={false}
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      />
      </div>
    </div>
  );
};

export default Content;
