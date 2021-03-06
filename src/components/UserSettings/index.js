import React, { Component } from "react";
import { Textarea, Modal, Button } from "react-materialize";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { UserAPI } from '../../utils/API';
import "./style.css";
import { Tooltip } from "antd";



class UserSetting extends Component {
    constructor(props) {
    super(props);

	this.state = {
        location:"",
        phone:"",
        userId: props.userId
	   }
    }

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
    }
    
    updateUser = () => {
    let info = {
        location: this.state.location,
        phone: this.state.phone
    }
    UserAPI.editUser(this.state.userId,info).then(res=> {
        console.log("We update user");
        this.props.handleUserList();
        this.props.handleBookmarkList();
    })
    }

	render() {
		return (			
                <Modal header="User Setting" className="modal-user" fixedFooter trigger={<Tooltip placement="bottomLeft" title="User Settings" arrowPointAtCenter>
                <AccountCircleIcon className="userSetting">
                    </AccountCircleIcon> 
                    </Tooltip>}
                    actions={<Button modal="close" className="saveChanges" onClick={this.updateUser}>Save Changes</Button>}>
                        <Textarea placeholder="Location" value={this.state.location} name="location" onChange={this.handleChange}/>
                        <Textarea placeholder="Phone" value={this.state.phone} name="phone" onChange={this.handleChange}/>
                    </Modal>
		)
	}
}

export default UserSetting;