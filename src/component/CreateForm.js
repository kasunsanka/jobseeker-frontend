import React, { useState } from "react";
import { Modal, Form, Input, Radio, Select, DatePicker, Upload,Button, message  } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import axios from "axios";

const CreateForm = (props) => {
  const { visible, setVisible, onCreate } = props;
  const [form] = Form.useForm();
  const [date1, setDate] = useState();


  const handleCreate = async () => {
    try {
      // Validate the form fields
      const values = await form.validateFields();
  
      // Extract the necessary data from the form values
      const { name,email,nic,mobile,address,time,role } = values;
      const formObj = {
    name: name,
    email:email,
    role:role,
    nic: nic,
    mobile: mobile,
    username: address,
    date: date1,
    time: time,
    status: 0,
    
      };
  
      // Make the POST request using Axios
      const response = await axios.post(
        'http://localhost:8887/jobseekers/',
        formObj
      );
  
      // Handle the success response from the API
      message.success('Appointment created successfully');
      form.resetFields();
      onCreate(values);
    } catch (error) {
      // Handle API request error
      message.error('Failed to create appointment. Please try again.');
      console.error('Error creating appointment:', error);
    }
  };
  

  const filecv = {
    name: "file",
     action: "C:/Users/Kasun/Desktop/1",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Modal
      open={visible}
      title="Create an appointment"
      okText="Ok"
      onCancel={() => {
        setVisible(false);
      }}
      onOk={handleCreate}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Excepted job" name="role">
          <Select
            defaultValue="softengineer"
            //   onChange={handleChange}
            options={[
              {
                value: "softengineer",
                label: "Soft Engineer",
              },
              {
                value: "qa",
                label: "QA",
              },
              {
                value: "ba",
                label: "Bussiness Analyst",
              },
            ]}
          />
        </Form.Item>

       
       
        <Form.Item label="Full Name" name="name" >
          <Input />
        </Form.Item>
        
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>

        <Form.Item label="Nic" name="nic">
          <Input />
        </Form.Item>

        <Form.Item label="Contact" name="mobile">
          <Input />
          </Form.Item>

        <Form.Item label="Address" name="usename">
          <Input />
          </Form.Item>
       
          <Form.Item label="Schedule Date" name="date">
          <DatePicker  format={"YYYY-MM-DD"}
                        onChange={(d, dString) => {
                          setDate(dString);
                        }}
          />
        </Form.Item>
        
        <Form.Item label="Time" name="time">
          <Select
           
            //   onChange={handleChange}
            options={[
              {
                value: "morning",
                label: "Morning",
              },
              {
                value: "evening",
                label: "Evening",
              },
              {
                value: "afternoon",
                label: "Afternoon",
              },
            ]}
          />
        </Form.Item>

       
        
        

      </Form>
    </Modal>
  );
};

export default CreateForm;
