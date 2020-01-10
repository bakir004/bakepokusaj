import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function MaxWidthDialog(props) {
    const handleClose = () => {
        props.closeModal()
    };
    const handleCloseWithDelete = () => {
        props.closeModal()
        props.handleDelete(props.mediaKey)
    };

    return (
        <React.Fragment>
            <Dialog
                fullWidth="true"
                maxWidth="sm"
                open={props.open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">Confirm Media Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete <strong>{props.media}</strong>?
                    </DialogContentText>
                </DialogContent>
                <DialogContent style={{ marginBottom: "10px" }}>
                    <div className="row">
                        <div className="col-sm-6">
                            <Button variant="contained" fullWidth disableElevation onClick={handleClose} style={{ backgroundColor: "#ffaa00", color: "white" }}>
                                <strong>Close</strong>
                            </Button>
                        </div>
                        <div className="col-sm-6">
                            <Button variant="contained" fullWidth disableElevation onClick={handleCloseWithDelete} style={{ backgroundColor: "#ff7066", color: "white" }}>
                                <strong>Delete</strong>
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </React.Fragment >
    );
}
