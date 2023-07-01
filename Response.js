import React from 'react'


class Response extends React.Component {
    constructor(props) {
        super(props);

        this.state = {item:props.re};
    }

    render() {
        console.log(this.state.item)

        return (       
        <div className="Response">
        <h2>하이 </h2>
    </div>
    );
        }
    }
export default Response;
