import { ForwardedRef, forwardRef, MutableRefObject, useImperativeHandle, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export interface ConfirmationModalRef {
  setShow: (show: boolean) => void;
  handleShow: (index: number) => void;
}

const ConfirmationModal = forwardRef((
  {deleteHandler, indexRef}: {deleteHandler: () => void, indexRef: MutableRefObject<number>},
  ref: ForwardedRef<ConfirmationModalRef>
) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  useImperativeHandle(ref, () => ({
    setShow,

    handleShow (index: number) {
      setShow(true);
      console.log(index);
      indexRef.current = index;
    }
  }))

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deleting category</Modal.Title>
        </Modal.Header>
        <Modal.Body>You are about to delete a category! Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => deleteHandler()}>
            Yes, delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
})

export default ConfirmationModal
