import React from "react";
import { Modal, Row, Col, Card } from "antd";

const UserDetailsModal = ({ userData, visible, onCancel }) => {
  const {
    aadhaar_number,
    address,
    annual_income,
    care_taker_name,
    care_taker_number,
    care_taker_relation,
    contact_number,
    district,
    dob,
    email,
    first_name,
    last_name,
    learning_device,
    pincode,
    state,
    whatsapp_number,
    applicant_academies,
    applicant_marks,
  } = userData;

  return (
    <Modal open={visible} onCancel={onCancel} width={1000} footer={null} centered>
      <Card
        title={`${first_name.charAt(0).toUpperCase()}${first_name.slice(
          1
        )} ${last_name.charAt(0).toUpperCase()}${last_name.slice(1)}`}
        bordered={false}
      >
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <strong>First Name:</strong>{" "}
            {`${first_name.charAt(0).toUpperCase()}${first_name.slice(1)}`}
          </Col>
          <Col span={8}>
            <strong>Last Name:</strong>{" "}
            {`${last_name.charAt(0).toUpperCase()}${last_name.slice(1)}`}
          </Col>
          <Col span={8}>
            <strong>Email:</strong> {email}
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <strong>DOB Name:</strong> {dob}
          </Col>
          <Col span={8}>
            <strong>Aadhaar Number:</strong> {aadhaar_number}
          </Col>
          <Col span={8}>
            <strong>Contect Number:</strong> {contact_number}
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <strong>WhatsApp Number:</strong> {whatsapp_number}
          </Col>
          <Col span={8}>
            <strong>Address:</strong> {address}
          </Col>

          <Col span={8}>
            <strong>District:</strong> {district}
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={8}>
            <strong>State:</strong> {state}
          </Col>
          <Col span={8}>
            <strong>Pincode:</strong> {pincode}
          </Col>
          <Col span={8}>
            <strong>Learning Device:</strong> {learning_device}
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <strong>Care Taker Name:</strong> {care_taker_name}
          </Col>
          <Col span={8}>
            <strong>Care Taker Number:</strong> {care_taker_number}
          </Col>
          <Col span={8}>
            <strong>Care Taker Relation:</strong> {care_taker_relation}
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={8}>
            <strong>Annual Income:</strong> {annual_income}
          </Col>
          <Col span={8}>
            <strong>Applicant Academic:</strong> {applicant_academies}
          </Col>
          <Col span={8}>
            <strong>Applicant Marks:</strong>{applicant_marks}
          </Col>
        </Row>

      </Card>
    </Modal>
  );
};

export default UserDetailsModal;
