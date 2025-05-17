// components/PreviewModal.jsx
import React from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter
} from 'mdb-react-ui-kit';

const PreviewModal = ({ book, onClose }) => {
  return (
    <MDBModal show={true} tabIndex="-1" setShow={onClose} centered>
      <MDBModalHeader>
        Preview: {book.title}
        <MDBBtn className="btn-close" color="none" onClick={onClose}></MDBBtn>
      </MDBModalHeader>
      <MDBModalBody>
        <p>📄 (PDF Preview of first page will go here...)</p>
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color="secondary" onClick={onClose}>
          Close
        </MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  );
};

export default PreviewModal;
