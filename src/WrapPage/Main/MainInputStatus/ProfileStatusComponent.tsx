import React, {ChangeEvent} from 'react';


interface Props {
    status: string,
    updateStatus: (status: string)=> void
}





class ProfileStatusComponent extends React.Component<Props> {

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>) {
        if (prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
            })
        }

    }

    state = {
        editMode: false,
        status: this.props.status

    }

    activatedEditMode =() =>{
        this.setState({
            editMode: true
        })
    }
    deActivatedEditMode =() => {
        this.setState({
            editMode: false
        })

        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: event.currentTarget.value
        })
    }

    render() {
        return (<div>

            {!this.state.editMode ?
                <div>
                    <span onClick={this.activatedEditMode}>{this.state.status || 'No Status'}</span>
                </div>
                :
                <div>
                    <input onChange = {this.onStatusChange}
                        autoFocus={true} onBlur={this.deActivatedEditMode} value={this.state.status}/>
                </div>
            }


        </div>)
    }
}

export default ProfileStatusComponent;

