import React from "react";
import { Modal, Form, Input, Radio, Select, DatePicker, Upload,Button, message  } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import axios from "axios";

const CreateForm = (props) => {
  const { visible, setVisible, onCreate } = props;
  const [form] = Form.useForm();


  const handleCreate = async () => {
    try {
      // Validate the form fields
      const values = await form.validateFields();
      console.log(values, "FFFFFFFFFFFFFFFF");
  
      // Extract the necessary data from the form values
      const { name,nic,address,mobile,email,jbcategory,country,exceptedsalary,remark,date,time,file } = values;
      const formObj = {
    firstname: name,
    nic: nic,
    address: address,
    mobile: mobile,
    email:email,
    occupation:jbcategory,
    exceptedcountry: country,
    exceptedsalary: exceptedsalary,
    remark:remark,
    date: date,
    time: time,
    status: 0,
    file: file
      };
  
      // Make the POST request using Axios
      const response = await axios.post(
        'http://localhost:8887/seeker/detail/add',
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
        <Form.Item label="Job Category" name="jbcategory">
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

        <Form.Item label="Upload a CV" name="cv">
          <Upload {...filecv}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
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
        <Form.Item label="Address" name="address">
          <Input />
          </Form.Item>
        <Form.Item label="Contact" name="mobile">
          <Input />
        </Form.Item>
        <Form.Item label="Excepted Salary" name="exceptedsalary">
          <Input />
        </Form.Item>
        <Form.Item label="Excepted Country" name="country">
          <Select
            defaultValue="uk"
            //   onChange={handleChange}
            options={[
              {
                value: "uk",
                label: "United Kingdom",
              },
              {
                value: "newzealand",
                label: "New Zealand",
              },
              {
                value: "australia",
                label: "Australia",
              },
            ]}
          />
        </Form.Item>

        <Form.Item label="Remark" name="remark">
          <Input />
        </Form.Item>
        
        <Form.Item label="Schedule Date" name="date">
          <DatePicker  format="YYYY-MM-DD HH:ss"
          //   onChange={onChange}
          />
        </Form.Item>
        
        <Form.Item label="Time" name="time">
          <Select
            defaultValue="morning"
            //   onChange={handleChange}
            options={[
              {
                value: "morning",
                label: "Morning",
              },
              {
                value: "afternoon",
                label: "Afternoon",
              },
              {
                value: "evening",
                label: "Evening",
              },
            ]}
          />
        </Form.Item>
        {/* <Form.Item name="time" label="Time">
          <Radio.Group>
            <Radio value="morning">Morning</Radio>
            <Radio value="afternoon">Afternoon</Radio>
            <Radio value="evening">Evening</Radio>
          </Radio.Group>
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default CreateForm;
