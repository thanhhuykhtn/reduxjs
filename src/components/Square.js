
import React from 'react'


class Square extends React.Component {
    render() {
        return (this.props.winner) ?
            (<button className="square yellow" onClick={this.props.goTurn}>
                {this.props.value}
            </button>
            ) : (
                <button className="square" onClick={this.props.goTurn}>
                    {this.props.value}
                </button>
            );

    }
}

export default Square;

